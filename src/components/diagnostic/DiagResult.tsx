"use client";

/**
 * 汎用診断結果表示コンポーネント
 *
 * スコア計算 → タイプ判定 → 結果表示 → 広告 → シェアボタン
 * Google広告は結果表示の直前に配置（インタースティシャル風）。
 *
 * 改修内容:
 * - テーマカラーを全面に使用
 * - タイプ発表時の演出強化（ぼかし→フェードイン）
 * - シェア画像にもテーマカラーを反映
 */

import { useMemo, useEffect, useRef, useState } from "react";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import { normalizeScoresGeneric, findBestTypeGeneric, applyProfileModifiersGeneric } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";
import { usePersonaStore } from "@/store/personaStore";
import AdPlacement from "@/components/AdPlacement";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
}

/** Canvas角丸四角形ヘルパー */
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/** hex色からRGB抽出 */
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function DiagResult({ config, store }: Props) {
  const { scores, profileData, reset, setCurrentStep } = store;
  const { saveResult } = usePersonaStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // タイプ発表演出の状態
  const [revealed, setRevealed] = useState(false);

  // スコア正規化 → タイプ判定
  const result = useMemo(() => {
    const rawNorm = normalizeScoresGeneric(scores, config.questions);
    const norm = applyProfileModifiersGeneric(rawNorm, profileData, config.dimensions);
    const bestType = findBestTypeGeneric(norm, config.resultTypes);
    return { norm, bestType };
  }, [scores, profileData, config]);

  const { norm, bestType } = result;

  // タイプ発表演出: 少し遅れてから表示
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // ペルソナストアに結果を保存
  useEffect(() => {
    saveResult({
      diagnosisId: config.id,
      diagnosisTitle: config.title,
      typeId: bestType.id,
      typeName: bestType.name,
      typeEmoji: bestType.emoji,
      typeColor: bestType.color,
      typeTag: bestType.tag,
      typeDescription: bestType.description,
      typeTraits: bestType.traits,
      scores: norm,
      dimensionLabels: config.dimensions.map((d) => d.label),
      dimensionColors: config.dimensions.map((d) => d.color),
      completedAt: Date.now(),
    });
  }, [bestType.id]);

  // Canvas描画（シェア画像）
  useEffect(() => {
    drawCanvas();
  }, [result]);

  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 800;
    const H = 460;
    canvas.width = W;
    canvas.height = H;

    // テーマカラーからRGB取得
    const themeRgb = hexToRgb(config.themeColor);
    const gradToRgb = hexToRgb(config.gradientTo);

    // 背景: テーマカラーを反映した暗いグラデーション
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, `rgb(${Math.round(themeRgb.r * 0.05 + 10)}, ${Math.round(themeRgb.g * 0.03)}, ${Math.round(themeRgb.b * 0.06 + 18)})`);
    bgGrad.addColorStop(0.5, `rgb(${Math.round(themeRgb.r * 0.08 + 15)}, ${Math.round(themeRgb.g * 0.04 + 2)}, ${Math.round(themeRgb.b * 0.1 + 25)})`);
    bgGrad.addColorStop(1, `rgb(${Math.round(themeRgb.r * 0.05 + 10)}, ${Math.round(themeRgb.g * 0.03)}, ${Math.round(themeRgb.b * 0.06 + 18)})`);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 星
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.5 + 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.2})`;
      ctx.fill();
    }

    // テーマカラーのグロー
    const glow = ctx.createRadialGradient(W * 0.2, H * 0.3, 0, W * 0.2, H * 0.3, 200);
    glow.addColorStop(0, `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.08)`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // 枠線（テーマカラー）
    roundedRect(ctx, 8, 8, W - 16, H - 16, 16);
    ctx.strokeStyle = `${config.themeColor}50`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ロゴ
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = `${config.themeColor}B0`;
    ctx.textAlign = "center";
    ctx.fillText(`ときめきラボ ── ${config.title}`, W / 2, 36);

    // タイプemoji
    ctx.font = "52px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(bestType.emoji, 60, 110);

    // タイプ名
    ctx.font = "bold 26px sans-serif";
    ctx.fillStyle = config.themeColor;
    ctx.fillText(bestType.name, 60, 150);

    // タグ
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(212,184,245,.8)";
    ctx.fillText(bestType.tag, 60, 172);

    // 説明（折り返し）
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.7)";
    const descLines: string[] = [];
    let current = "";
    for (const char of bestType.description) {
      const test = current + char;
      if (ctx.measureText(test).width > 300) {
        descLines.push(current);
        current = char;
      } else {
        current = test;
      }
    }
    if (current) descLines.push(current);
    descLines.slice(0, 5).forEach((line, i) => {
      ctx.fillText(line, 60, 200 + i * 18);
    });

    // バーグラフ
    const barX = 440;
    const barW = 280;
    const barStartY = 70;

    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.5)";
    ctx.textAlign = "left";
    ctx.fillText(`${config.dimensions.length}次元スコア`, barX, barStartY - 8);

    const dimCount = Math.min(config.dimensions.length, 8);
    const barSpacing = Math.min(36, (H - barStartY - 80) / dimCount);

    norm.slice(0, dimCount).forEach((val, i) => {
      const dim = config.dimensions[i];
      const y = barStartY + i * barSpacing;

      ctx.font = "11px sans-serif";
      ctx.fillStyle = dim.color;
      ctx.textAlign = "left";
      ctx.fillText(dim.label, barX, y + 12);

      roundedRect(ctx, barX, y + 18, barW, 6, 3);
      ctx.fillStyle = "rgba(255,255,255,.08)";
      ctx.fill();

      const fillW = (val / 100) * barW;
      if (fillW > 0) {
        roundedRect(ctx, barX, y + 18, fillW, 6, 3);
        ctx.fillStyle = dim.color;
        ctx.fill();
      }

      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,.7)";
      ctx.textAlign = "right";
      ctx.fillText(`${val}`, barX + barW + 24, y + 24);
    });

    // ハッシュタグ
    ctx.font = "11px sans-serif";
    ctx.fillStyle = `${config.themeColor}80`;
    ctx.textAlign = "center";
    ctx.fillText(config.hashtags.map((h) => `#${h}`).join(" "), W / 2, H - 28);
  }

  function handleSaveImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `tokimeki-lab-${config.id}-result.png`;
    a.click();
  }

  // シェアテキスト
  const shareText = `ときめきラボの${config.title}やったら「${bestType.emoji}${bestType.name}」だった！ ${config.hashtags.map((h) => `#${h}`).join(" ")}`;
  const shareUrl = "https://tokimeki-lab.com";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 16px 60px",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      {/* 広告枠（結果表示前） */}
      <AdPlacement slot="result-interstitial" themeColor={config.themeColor} />

      {/* タイプヒーロー（演出強化版） */}
      <div
        style={{
          textAlign: "center",
          background: `linear-gradient(135deg, rgba(255,255,255,.06), ${config.themeColor}08)`,
          border: `1px solid ${config.themeColor}20`,
          borderRadius: 20,
          padding: "32px 24px",
          marginBottom: 16,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) both",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* テーマカラーのグロー背景 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${config.themeColor}12, transparent 70%)`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* 絵文字 */}
        <div
          style={{
            fontSize: 70,
            marginBottom: 8,
            position: "relative",
            filter: revealed ? "blur(0px)" : "blur(12px)",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(0.8)",
            transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {bestType.emoji}
        </div>

        {/* タイプ名（ぼかし→フェードイン演出） */}
        <h2
          className="font-stick"
          style={{
            fontSize: 28,
            color: config.themeColor,
            marginBottom: 8,
            position: "relative",
            filter: revealed ? "blur(0px)" : "blur(16px)",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.2s",
            textShadow: revealed ? `0 0 30px ${config.themeColor}30` : "none",
          }}
        >
          {bestType.name}
        </h2>

        {/* タグ */}
        <span
          style={{
            display: "inline-block",
            background: `${config.themeColor}18`,
            color: config.themeColor,
            fontSize: 11,
            padding: "4px 12px",
            borderRadius: 20,
            marginBottom: 16,
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.6s 0.5s",
          }}
        >
          {bestType.tag}
        </span>

        {/* 説明文 */}
        <p
          style={{
            color: "rgba(255,255,255,.75)",
            fontSize: 14,
            lineHeight: 1.8,
            position: "relative",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.6s 0.7s",
          }}
        >
          {bestType.description}
        </p>

        {/* 特徴タグ */}
        {bestType.traits.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              justifyContent: "center",
              marginTop: 14,
              opacity: revealed ? 1 : 0,
              transition: "opacity 0.6s 0.9s",
            }}
          >
            {bestType.traits.map((trait) => (
              <span
                key={trait}
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 12,
                  background: `${config.themeColor}12`,
                  color: config.themeColor,
                  border: `1px solid ${config.themeColor}30`,
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 多次元バーグラフ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.15s both",
        }}
      >
        {norm.map((val, i) => {
          const dim = config.dimensions[i];
          if (!dim) return null;
          return (
            <div key={dim.key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 3,
                }}
              >
                <span style={{ fontSize: 9.5, color: dim.color }}>{dim.label}</span>
                <span style={{ fontSize: 9.5, color: "rgba(255,255,255,.55)" }}>{val}</span>
              </div>
              <div
                style={{
                  height: 5,
                  background: "rgba(255,255,255,.06)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  ref={(el) => {
                    if (el) {
                      el.style.width = "0%";
                      requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                          el.style.width = `${val}%`;
                        });
                      });
                    }
                  }}
                  style={{
                    height: "100%",
                    background: dim.color,
                    borderRadius: 3,
                    transition: "width 1s ease-out 0.8s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* アドバイスカード */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,.04), ${config.themeColor}06)`,
          border: `1px solid ${config.themeColor}15`,
          borderRadius: 16,
          padding: "20px 18px",
          marginBottom: 16,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.3s both",
        }}
      >
        <p
          style={{
            fontSize: 9.5,
            color: config.themeColor,
            marginBottom: 8,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          ADVICE
        </p>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,.8)",
            lineHeight: 1.8,
          }}
        >
          {bestType.advice}
        </p>
      </div>

      {/* 他の診断への誘導 */}
      <div
        style={{
          background: `linear-gradient(135deg, ${config.themeColor}10, ${config.gradientTo}10)`,
          border: `1px solid ${config.themeColor}15`,
          borderRadius: 16,
          padding: "20px 18px",
          textAlign: "center",
          marginBottom: 16,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.45s both",
        }}
      >
        <p className="font-zen" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          他の診断もやってみよう！
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "10px 24px",
            background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            borderRadius: 25,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          診断一覧へ
        </a>
      </div>

      {/* シェア画像（Canvas） */}
      <div
        style={{
          marginBottom: 16,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.55s both",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }}
        />
        <button
          onClick={handleSaveImage}
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            padding: "12px 0",
            background: `linear-gradient(135deg, ${config.themeColor}10, ${config.gradientTo}10)`,
            border: `1px solid ${config.themeColor}40`,
            borderRadius: 12,
            color: config.themeColor,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          画像を保存
        </button>
      </div>

      {/* 注記 */}
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "rgba(255,255,255,.35)",
          marginBottom: 16,
        }}
      >
        診断結果は参考としてご活用ください。
      </p>

      {/* シェアボタン */}
      <div
        style={{
          display: "flex",
          gap: 7,
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.65s both",
        }}
      >
        {/* TikTok */}
        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 16px",
            background: "linear-gradient(135deg, #010101, #69C9D0)",
            borderRadius: 12,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          TikTok
        </a>

        {/* LINE */}
        <a
          href={`https://line.me/R/share?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 16px",
            background: "#06C755",
            borderRadius: 12,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          LINE
        </a>

        {/* X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 16px",
            background: "#1A1A1A",
            borderRadius: 12,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          X
        </a>

        {/* やり直す */}
        <button
          onClick={() => {
            reset();
            setCurrentStep("landing");
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 16px",
            background: "transparent",
            border: `1px solid ${config.themeColor}30`,
            borderRadius: 12,
            color: "rgba(255,255,255,.7)",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          やり直す
        </button>
      </div>

      {/* フッター広告 */}
      <div style={{ marginTop: 32 }}>
        <AdPlacement slot="banner-bottom" themeColor={config.themeColor} />
      </div>
    </div>
  );
}
