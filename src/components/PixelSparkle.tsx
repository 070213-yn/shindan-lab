"use client";

/**
 * PixelSparkle - ピクセルアートのキラキラパーティクルアニメーション
 *
 * Canvas APIでスプライトシートを動的生成し、複数のパーティクルを
 * ランダム配置＆ランダムタイミングで再生する。
 * 全診断ページで共通利用可能。
 *
 * Props:
 *   count: パーティクル数（デフォルト12）
 *   color: ベースカラー（デフォルト "#fff"）
 *   size: 1パーティクルの表示サイズ（デフォルト 24px）
 *   speed: アニメーション速度（デフォルト 120ms/フレーム）
 *   area: 配置範囲（"full" | "top" | "center"）
 *   style: コンテナに追加するスタイル
 */

import { useEffect, useRef, useCallback, memo } from "react";

// --- スプライトシート定義（4x4 = 16フレーム） ---
// 各フレームは 16x16 ピクセルのドット絵
// 4角星が出現 → 拡大 → 最大輝度 → 縮小＆消滅 のサイクル

// 1ピクセル = 1 の座標系で星を描画するデータ
// [x, y, alpha] の配列。中心は (8, 8)
const STAR_FRAMES: number[][][] = [
  // フレーム0: 中心に1ドット出現
  [[8,8,0.4]],

  // フレーム1: 十字の種
  [[8,8,0.7],[8,7,0.3],[8,9,0.3],[7,8,0.3],[9,8,0.3]],

  // フレーム2: 十字が伸びる
  [[8,8,1],[8,7,0.6],[8,9,0.6],[7,8,0.6],[9,8,0.6],[8,6,0.3],[8,10,0.3],[6,8,0.3],[10,8,0.3]],

  // フレーム3: 十字＋斜めヒント
  [[8,8,1],[8,7,0.8],[8,9,0.8],[7,8,0.8],[9,8,0.8],[8,6,0.5],[8,10,0.5],[6,8,0.5],[10,8,0.5],[7,7,0.2],[9,7,0.2],[7,9,0.2],[9,9,0.2]],

  // フレーム4: 4角星が形成
  [[8,8,1],[8,7,1],[8,9,1],[7,8,1],[9,8,1],[8,6,0.7],[8,10,0.7],[6,8,0.7],[10,8,0.7],[8,5,0.4],[8,11,0.4],[5,8,0.4],[11,8,0.4],[7,7,0.3],[9,7,0.3],[7,9,0.3],[9,9,0.3]],

  // フレーム5: 星が大きくなる
  [[8,8,1],[8,7,1],[8,9,1],[7,8,1],[9,8,1],[8,6,0.9],[8,10,0.9],[6,8,0.9],[10,8,0.9],[8,5,0.6],[8,11,0.6],[5,8,0.6],[11,8,0.6],[8,4,0.3],[8,12,0.3],[4,8,0.3],[12,8,0.3],[7,7,0.4],[9,7,0.4],[7,9,0.4],[9,9,0.4]],

  // フレーム6: 最大サイズ直前
  [[8,8,1],[8,7,1],[8,9,1],[7,8,1],[9,8,1],[8,6,1],[8,10,1],[6,8,1],[10,8,1],[8,5,0.8],[8,11,0.8],[5,8,0.8],[11,8,0.8],[8,4,0.5],[8,12,0.5],[4,8,0.5],[12,8,0.5],[8,3,0.2],[8,13,0.2],[3,8,0.2],[13,8,0.2],[7,7,0.5],[9,7,0.5],[7,9,0.5],[9,9,0.5],[6,6,0.2],[10,6,0.2],[6,10,0.2],[10,10,0.2]],

  // フレーム7: 最大輝度（フラッシュ）
  [[8,8,1],[8,7,1],[8,9,1],[7,8,1],[9,8,1],[8,6,1],[8,10,1],[6,8,1],[10,8,1],[8,5,1],[8,11,1],[5,8,1],[11,8,1],[8,4,0.7],[8,12,0.7],[4,8,0.7],[12,8,0.7],[8,3,0.4],[8,13,0.4],[3,8,0.4],[13,8,0.4],[7,7,0.7],[9,7,0.7],[7,9,0.7],[9,9,0.7],[6,6,0.4],[10,6,0.4],[6,10,0.4],[10,10,0.4],[5,5,0.15],[11,5,0.15],[5,11,0.15],[11,11,0.15]],

  // フレーム8: フラッシュ後（少し縮小）
  [[8,8,1],[8,7,1],[8,9,1],[7,8,1],[9,8,1],[8,6,0.9],[8,10,0.9],[6,8,0.9],[10,8,0.9],[8,5,0.7],[8,11,0.7],[5,8,0.7],[11,8,0.7],[8,4,0.4],[8,12,0.4],[4,8,0.4],[12,8,0.4],[7,7,0.5],[9,7,0.5],[7,9,0.5],[9,9,0.5],[6,6,0.2],[10,6,0.2],[6,10,0.2],[10,10,0.2]],

  // フレーム9: 縮小中
  [[8,8,1],[8,7,0.9],[8,9,0.9],[7,8,0.9],[9,8,0.9],[8,6,0.7],[8,10,0.7],[6,8,0.7],[10,8,0.7],[8,5,0.4],[8,11,0.4],[5,8,0.4],[11,8,0.4],[7,7,0.3],[9,7,0.3],[7,9,0.3],[9,9,0.3]],

  // フレーム10: さらに縮小
  [[8,8,0.9],[8,7,0.7],[8,9,0.7],[7,8,0.7],[9,8,0.7],[8,6,0.5],[8,10,0.5],[6,8,0.5],[10,8,0.5],[8,5,0.2],[8,11,0.2],[5,8,0.2],[11,8,0.2]],

  // フレーム11: 小さい十字
  [[8,8,0.8],[8,7,0.5],[8,9,0.5],[7,8,0.5],[9,8,0.5],[8,6,0.3],[8,10,0.3],[6,8,0.3],[10,8,0.3]],

  // フレーム12: 十字が縮む
  [[8,8,0.6],[8,7,0.3],[8,9,0.3],[7,8,0.3],[9,8,0.3]],

  // フレーム13: 小さなドット
  [[8,8,0.4],[7,8,0.15],[9,8,0.15],[8,7,0.15],[8,9,0.15]],

  // フレーム14: 消えかけ
  [[8,8,0.2]],

  // フレーム15: 完全消滅（空フレーム）
  [],
];

const CELL = 16; // 1フレームのピクセルサイズ
const COLS = 4;
const ROWS = 4;
const SHEET_W = CELL * COLS; // 64px
const SHEET_H = CELL * ROWS; // 64px
const TOTAL_FRAMES = 16;

/** hex色 → {r,g,b} */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** スプライトシートをオフスクリーンCanvasに描画して返す */
function buildSpriteSheet(color: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = SHEET_W;
  canvas.height = SHEET_H;
  const ctx = canvas.getContext("2d")!;
  const { r, g, b } = hexToRgb(color);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const ox = col * CELL;
    const oy = row * CELL;
    const frame = STAR_FRAMES[i];
    for (const [x, y, a] of frame) {
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
      ctx.fillRect(ox + x, oy + y, 1, 1);
    }
  }
  return canvas;
}

interface Particle {
  x: number; // % 位置
  y: number;
  frame: number;
  delay: number; // 初期遅延フレーム数
  speed: number; // フレーム切り替え間隔(ms)
  elapsed: number;
  size: number; // 表示倍率
}

interface Props {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  area?: "full" | "top" | "center";
  style?: React.CSSProperties;
}

function PixelSparkleInner({
  count = 12,
  color = "#ffffff",
  size = 24,
  speed = 120,
  area = "full",
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sheetRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // パーティクル初期化
  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const yMin = area === "top" ? 0 : area === "center" ? 25 : 0;
      const yMax = area === "top" ? 50 : area === "center" ? 75 : 100;
      particles.push({
        x: Math.random() * 100,
        y: yMin + Math.random() * (yMax - yMin),
        frame: 0,
        delay: Math.floor(Math.random() * TOTAL_FRAMES), // ランダムなフレームから開始
        speed: speed + (Math.random() - 0.5) * 60, // 速度に揺らぎ
        elapsed: 0,
        size: 0.7 + Math.random() * 0.6, // サイズにばらつき
      });
    }
    particlesRef.current = particles;
  }, [count, speed, area]);

  // アニメーションループ
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const sheet = sheetRef.current;
    if (!canvas || !sheet) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dt = lastTimeRef.current ? time - lastTimeRef.current : 0;
    lastTimeRef.current = time;

    // ピクセルパーフェクトのためにリサイズ
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    // ピクセルアートのシャープさを維持
    ctx.imageSmoothingEnabled = false;

    for (const p of particlesRef.current) {
      // 遅延消化
      if (p.delay > 0) {
        p.elapsed += dt;
        if (p.elapsed >= p.speed) {
          p.delay--;
          p.elapsed = 0;
        }
        continue;
      }

      p.elapsed += dt;
      if (p.elapsed >= p.speed) {
        p.frame++;
        p.elapsed = 0;

        // ループ: 消滅後にランダム再配置
        if (p.frame >= TOTAL_FRAMES) {
          p.frame = 0;
          p.x = Math.random() * 100;
          const yMin = area === "top" ? 0 : area === "center" ? 25 : 0;
          const yMax = area === "top" ? 50 : area === "center" ? 75 : 100;
          p.y = yMin + Math.random() * (yMax - yMin);
          p.delay = Math.floor(Math.random() * 8); // 再出現に少し間を空ける
          p.size = 0.7 + Math.random() * 0.6;
        }
      }

      // 描画: スプライトシートから該当フレームを切り出し
      const col = p.frame % COLS;
      const row = Math.floor(p.frame / COLS);
      const sx = col * CELL;
      const sy = row * CELL;
      const drawSize = size * p.size;
      const dx = (p.x / 100) * rect.width - drawSize / 2;
      const dy = (p.y / 100) * rect.height - drawSize / 2;

      ctx.drawImage(sheet, sx, sy, CELL, CELL, dx, dy, drawSize, drawSize);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [size, area]);

  useEffect(() => {
    // スプライトシート生成
    sheetRef.current = buildSpriteSheet(color);
    initParticles();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color, initParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        imageRendering: "pixelated",
        ...style,
      }}
    />
  );
}

const PixelSparkle = memo(PixelSparkleInner);
export default PixelSparkle;
