"use client";

/**
 * Liquid Glass コンポーネント
 *
 * archisvaze/liquid-glass のSVGフィルター技術をReactに移植。
 * Canvas上でディスプレイスメントマップとスペキュラーマップを生成し、
 * SVGフィルター経由で backdrop-filter に適用することで
 * 本物のガラス屈折・光沢を再現する。
 *
 * 注意: SVG backdrop-filter は Chrome/Chromium系のみ対応。
 * 非対応ブラウザでは CSS のフォールバック（blur + 半透明）で表示。
 */

import { useEffect, useRef, useId, useState, type CSSProperties, type ReactNode } from "react";

/** Liquid Glass の設定パラメータ */
interface LiquidGlassConfig {
  /** ガラスの厚さ（屈折の強さ） デフォルト: 40 */
  glassThickness?: number;
  /** ベゼル幅（端の屈折領域の幅） デフォルト: 30 */
  bezelWidth?: number;
  /** 屈折率（1.0〜3.0） デフォルト: 2.0 */
  ior?: number;
  /** ぼかし量 デフォルト: 0.4 */
  blur?: number;
  /** スペキュラー（光沢）の不透明度 デフォルト: 0.35 */
  specularOpacity?: number;
  /** 彩度倍率 デフォルト: 3 */
  saturation?: number;
  /** 角丸半径 デフォルト: 20 */
  borderRadius?: number;
  /** ティント色（RGB文字列） デフォルト: "255,255,255" */
  tintColor?: string;
  /** ティント不透明度 デフォルト: 0.08 */
  tintOpacity?: number;
  /** 内側シャドウのぼかし デフォルト: 16 */
  innerShadowBlur?: number;
  /** 内側シャドウのスプレッド デフォルト: -4 */
  innerShadowSpread?: number;
  /** 外側シャドウのぼかし デフォルト: 20 */
  outerShadowBlur?: number;
}

interface LiquidGlassProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  config?: LiquidGlassConfig;
}

/** 凸面スクワークル（Apple風の角丸） */
function convexSquircle(x: number): number {
  return Math.pow(1 - Math.pow(1 - x, 4), 0.25);
}

/** 屈折プロファイルを計算 */
function calculateRefractionProfile(
  glassThickness: number,
  bezelWidth: number,
  ior: number,
  samples = 128
): Float64Array {
  const eta = 1 / ior;
  const profile = new Float64Array(samples);

  for (let i = 0; i < samples; i++) {
    const x = i / samples;
    const y = convexSquircle(x);
    const dx = x < 1 ? 0.0001 : -0.0001;
    const y2 = convexSquircle(x + dx);
    const deriv = (y2 - y) / dx;
    const mag = Math.sqrt(deriv * deriv + 1);

    const nx = -deriv / mag;
    const ny = -1 / mag;
    const dot = ny;
    const k = 1 - eta * eta * (1 - dot * dot);

    if (k < 0) {
      profile[i] = 0;
      continue;
    }
    const sq = Math.sqrt(k);
    const refX = -(eta * dot + sq) * nx;
    const refY = eta - (eta * dot + sq) * ny;
    profile[i] = refX * ((y * bezelWidth + glassThickness) / refY);
  }
  return profile;
}

/** ディスプレイスメントマップをCanvas上に生成 → DataURL */
function generateDisplacementMap(
  w: number, h: number, radius: number, bezelWidth: number,
  profile: Float64Array, maxDisp: number
): string {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;

  // 中間値（128）で初期化 = 変位なし
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 128; d[i + 1] = 128; d[i + 2] = 0; d[i + 3] = 255;
  }

  const r = radius;
  const rSq = r * r;
  const r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2;
  const hB = h - r * 2;
  const S = profile.length;

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist;
      const sin = y / dist;
      const bi = Math.min(((fromSide / bezelWidth) * S) | 0, S - 1);
      const disp = profile[bi] || 0;
      const dX = (-cos * disp) / maxDisp;
      const dY = (-sin * disp) / maxDisp;
      const idx = (y1 * w + x1) * 4;
      d[idx] = (128 + dX * 127 * op + 0.5) | 0;
      d[idx + 1] = (128 + dY * 127 * op + 0.5) | 0;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

/** スペキュラーマップ（光の反射）をCanvas上に生成 → DataURL */
function generateSpecularMap(
  w: number, h: number, radius: number, bezelWidth: number, angle = Math.PI / 3
): string {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  d.fill(0);

  const r = radius;
  const rSq = r * r;
  const r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2;
  const hB = h - r * 2;
  const sv = [Math.cos(angle), Math.sin(angle)];

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist;
      const sin = -y / dist;
      const dot = Math.abs(cos * sv[0] + sin * sv[1]);
      const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2));
      const coeff = dot * edge;
      const col = (255 * coeff) | 0;
      const alpha = (col * coeff * op) | 0;
      const idx = (y1 * w + x1) * 4;
      d[idx] = col; d[idx + 1] = col; d[idx + 2] = col; d[idx + 3] = alpha;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

/** SVGフィルターが backdrop-filter で使えるかチェック */
function checkSvgBackdropSupport(): boolean {
  if (typeof window === "undefined") return false;
  // Chrome/Chromium系のみサポート
  const ua = navigator.userAgent;
  return /Chrome/.test(ua) && !/Edge/.test(ua);
}

export default function LiquidGlass({ children, className, style, config }: LiquidGlassProps) {
  const filterId = useId().replace(/:/g, "_");
  const containerRef = useRef<HTMLDivElement>(null);
  const defsRef = useRef<SVGDefsElement>(null);
  const [supported, setSupported] = useState(false);

  const {
    glassThickness = 40,
    bezelWidth = 30,
    ior = 2.0,
    blur = 0.4,
    specularOpacity = 0.35,
    saturation = 3,
    borderRadius = 20,
    tintColor = "255,255,255",
    tintOpacity = 0.08,
    innerShadowBlur = 16,
    innerShadowSpread = -4,
    outerShadowBlur = 20,
  } = config || {};

  useEffect(() => {
    setSupported(checkSvgBackdropSupport());
  }, []);

  // フィルター構築
  useEffect(() => {
    if (!supported) return;
    const el = containerRef.current;
    const defs = defsRef.current;
    if (!el || !defs) return;

    const rebuild = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w < 2 || h < 2) return;

      const clampedBezel = Math.min(bezelWidth, borderRadius - 1, Math.min(w, h) / 2 - 1);
      const profile = calculateRefractionProfile(glassThickness, clampedBezel, ior, 128);
      const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
      const dispUrl = generateDisplacementMap(w, h, borderRadius, clampedBezel, profile, maxDisp);
      const specUrl = generateSpecularMap(w, h, borderRadius, clampedBezel * 2.5);
      const scale = maxDisp * 1.0;

      defs.innerHTML = `
        <filter id="${filterId}" x="0%" y="0%" width="100%" height="100%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${blur}" result="blurred_source" />
          <feImage href="${dispUrl}" x="0" y="0" width="${w}" height="${h}" result="disp_map" />
          <feDisplacementMap in="blurred_source" in2="disp_map"
            scale="${scale}" xChannelSelector="R" yChannelSelector="G"
            result="displaced" />
          <feColorMatrix in="displaced" type="saturate" values="${saturation}" result="displaced_sat" />
          <feImage href="${specUrl}" x="0" y="0" width="${w}" height="${h}" result="spec_layer" />
          <feComposite in="displaced_sat" in2="spec_layer" operator="in" result="spec_masked" />
          <feComponentTransfer in="spec_layer" result="spec_faded">
            <feFuncA type="linear" slope="${specularOpacity}" />
          </feComponentTransfer>
          <feBlend in="spec_masked" in2="displaced" mode="normal" result="with_sat" />
          <feBlend in="spec_faded" in2="with_sat" mode="normal" />
        </filter>
      `;
    };

    // 初回ビルド（レイアウト確定後）
    requestAnimationFrame(() => requestAnimationFrame(rebuild));

    // リサイズ対応
    const ro = new ResizeObserver(() => {
      rebuild();
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [supported, filterId, glassThickness, bezelWidth, ior, blur, specularOpacity, saturation, borderRadius]);

  const containerStyle: CSSProperties = {
    position: "relative",
    borderRadius,
    isolation: "isolate",
    ...style,
  };

  // フォールバックスタイル（非Chrome / SSR）
  const fallbackStyle: CSSProperties = {
    background: `rgba(${tintColor}, ${tintOpacity + 0.04})`,
    backdropFilter: `blur(16px) saturate(1.4)`,
    WebkitBackdropFilter: `blur(16px) saturate(1.4)`,
    boxShadow: `
      0px 4px ${outerShadowBlur}px rgba(0,0,0,0.10),
      inset 0 0 ${innerShadowBlur}px ${innerShadowSpread}px rgba(255,255,255,0.45),
      inset 0 1px 0 rgba(255,255,255,0.5)
    `,
  };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {/* SVGフィルター用の隠しSVG */}
      {supported && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0"
          height="0"
          style={{ position: "absolute", overflow: "hidden" }}
          colorInterpolationFilters="sRGB"
        >
          <defs ref={defsRef} />
        </svg>
      )}

      {/* ティント + 内側シャドウのオーバーレイ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: "inherit",
          boxShadow: `inset 0 0 ${innerShadowBlur}px ${innerShadowSpread}px rgba(255,255,255,0.45)`,
          backgroundColor: `rgba(${tintColor}, ${tintOpacity})`,
          pointerEvents: "none",
        }}
      />

      {/* backdrop-filter レイヤー */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          borderRadius: "inherit",
          ...(supported
            ? {
                backdropFilter: `url(#${filterId})`,
                WebkitBackdropFilter: `url(#${filterId})`,
              }
            : fallbackStyle),
          isolation: "isolate",
        }}
      />

      {/* 外側シャドウ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          borderRadius: "inherit",
          boxShadow: `0px 4px ${outerShadowBlur}px rgba(0,0,0,0.10)`,
          pointerEvents: "none",
        }}
      />

      {/* コンテンツ */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
