"use client";

/**
 * 診断結果表示コンポーネント
 *
 * 8次元スコアからタイプ判定した結果を表示する。
 * - タイプヒーロー、8次元バーグラフ、相性TOP5、
 *   恋愛アドバイス、応援メッセージ、Canvas画像、シェアボタンを含む。
 */

import { useMemo, useEffect, useRef } from "react";
import { useQuizStore } from "@/store/quizStore";
import { normalizeScores, findBestType } from "@/lib/scoring";
import { applyProfileModifiers } from "@/lib/profileModifiers";
import { DIM_LABELS, DIM_COLORS, TYPES } from "@/lib/types";
import { usePersonaStore } from "@/store/personaStore";

/** Canvas画像上に角丸四角形を描画するヘルパー */
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
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

export default function ResultView() {
  const { scores, profile, crushName, setCurrentStep, reset } = useQuizStore();
  const { saveResult } = usePersonaStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- スコア計算・タイプ判定 ---
  const result = useMemo(() => {
    const rawNorm = normalizeScores(scores);
    const norm = applyProfileModifiers(rawNorm, profile);
    const bestType = findBestType(norm);
    return { norm, bestType };
  }, [scores, profile]);

  const { norm, bestType } = result;
  const displayName = crushName || "あの人";

  // --- ペルソナストアに恋愛診断結果を保存 ---
  useEffect(() => {
    saveResult({
      diagnosisId: 'love',
      diagnosisTitle: '恋愛性格診断',
      typeId: bestType.id,
      typeName: bestType.name,
      typeEmoji: bestType.emoji,
      typeColor: bestType.color || '#FF6BE8',
      typeTag: bestType.tag,
      typeDescription: bestType.desc,
      typeTraits: [bestType.cheerm],
      scores: norm,
      dimensionLabels: DIM_LABELS,
      dimensionColors: DIM_COLORS,
      completedAt: Date.now(),
    });
  }, [bestType.id]);

  // --- 相性TOP5を算出 ---
  const compatTop5 = useMemo(() => {
    const entries = Object.entries(bestType.compat)
      .map(([id, score]) => ({
        id,
        score,
        type: TYPES.find((t) => t.id === id)!,
      }))
      .filter((e) => e.type && e.id !== bestType.id)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    return entries;
  }, [bestType]);

  // --- Canvas描画（シェア画像） ---
  useEffect(() => {
    drawCanvas();
  }, [result]);

  /** Canvasにシェア用画像を描画する */
  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 800;
    const H = 460;
    canvas.width = W;
    canvas.height = H;

    // 背景グラデーション
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, "#0D0118");
    bgGrad.addColorStop(0.5, "#1A0230");
    bgGrad.addColorStop(1, "#0D0118");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 星80個
    for (let i = 0; i < 80; i++) {
      const sx = Math.random() * W;
      const sy = Math.random() * H;
      const sr = Math.random() * 1.5 + 0.3;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.6 + 0.2})`;
      ctx.fill();
    }

    // 枠線
    roundedRect(ctx, 8, 8, W - 16, H - 16, 16);
    ctx.strokeStyle = "rgba(255,107,232,.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ロゴテキスト
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "rgba(255,107,232,.7)";
    ctx.textAlign = "center";
    ctx.fillText("ときめきラボ ── 12タイプ恋愛性格診断", W / 2, 36);

    // --- 左半分: タイプ情報 ---
    const leftX = 60;

    // タイプemoji
    ctx.font = "52px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(bestType.emoji, leftX, 110);

    // タイプ名
    ctx.font = "bold 26px sans-serif";
    ctx.fillStyle = "#FF6BE8";
    ctx.fillText(bestType.name, leftX, 150);

    // タグ
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(212,184,245,.8)";
    ctx.fillText(bestType.tag, leftX, 172);

    // 説明文（折り返し描画）
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.7)";
    const descLines = wrapText(ctx, bestType.desc, 300);
    descLines.forEach((line, i) => {
      ctx.fillText(line, leftX, 200 + i * 18);
    });

    // --- 右半分: 8次元バーグラフ ---
    const barX = 440;
    const barW = 280;
    const barStartY = 70;

    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.5)";
    ctx.textAlign = "left";
    ctx.fillText("8次元スコア", barX, barStartY - 8);

    norm.forEach((val, i) => {
      const y = barStartY + i * 36;
      // ラベル
      ctx.font = "11px sans-serif";
      ctx.fillStyle = DIM_COLORS[i];
      ctx.textAlign = "left";
      ctx.fillText(DIM_LABELS[i], barX, y + 12);

      // バー背景
      roundedRect(ctx, barX, y + 18, barW, 6, 3);
      ctx.fillStyle = "rgba(255,255,255,.08)";
      ctx.fill();

      // バー実値
      const fillW = (val / 100) * barW;
      if (fillW > 0) {
        roundedRect(ctx, barX, y + 18, fillW, 6, 3);
        ctx.fillStyle = DIM_COLORS[i];
        ctx.fill();
      }

      // 数値
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,.7)";
      ctx.textAlign = "right";
      ctx.fillText(`${val}`, barX + barW + 24, y + 24);
    });

    // --- 下部: 相性情報 ---
    const bottomY = H - 50;
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.6)";
    ctx.textAlign = "center";

    // 相性トップのタイプ
    const topCompat = compatTop5[0];
    if (topCompat) {
      ctx.fillText(
        `${displayName}との相性タイプ: ${topCompat.type.emoji} ${topCompat.type.name}`,
        W / 2,
        bottomY
      );
    }

    // ハッシュタグ
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255,107,232,.5)";
    ctx.fillText("#ときめきラボ #12タイプ恋愛診断", W / 2, bottomY + 22);
  }

  /** テキスト折り返しヘルパー（Canvas描画用） */
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] {
    const lines: string[] = [];
    let current = "";
    for (const char of text) {
      const test = current + char;
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(current);
        current = char;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  /** Canvas画像を保存するハンドラ */
  function handleSaveImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "tokimeki-lab-result.png";
    a.click();
  }

  /** シェアテキスト */
  const shareText = `ときめきラボで恋愛タイプ診断したら「${bestType.emoji}${bestType.name}」だった！ #ときめきラボ #12タイプ恋愛診断`;
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
      {/* ===== 1. タイプヒーロー: border控えめ、background少し明るく ===== */}
      <div
        style={{
          textAlign: "center",
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 20,
          padding: "32px 24px",
          marginBottom: 16,
        }}
      >
        {/* タイプemoji */}
        <div style={{ fontSize: 70, marginBottom: 8 }}>{bestType.emoji}</div>

        {/* タイプ名 */}
        <h2
          className="font-stick"
          style={{ fontSize: 28, color: "#FF6BE8", marginBottom: 8 }}
        >
          {bestType.name}
        </h2>

        {/* タグバッジ */}
        <span
          style={{
            display: "inline-block",
            background: "rgba(255,107,232,.12)",
            color: "#D4B8F5",
            fontSize: 11,
            padding: "4px 12px",
            borderRadius: 20,
            marginBottom: 16,
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
          }}
        >
          {bestType.desc}
        </p>
      </div>

      {/* ===== 2. 8次元バーグラフ: gap拡大、バー背景調整 ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {norm.map((val, i) => (
          <div key={i}>
            {/* ラベル + 数値: コントラスト改善 */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 3,
              }}
            >
              <span style={{ fontSize: 9.5, color: DIM_COLORS[i] }}>
                {DIM_LABELS[i]}
              </span>
              <span
                style={{ fontSize: 9.5, color: "rgba(255,255,255,.55)" }}
              >
                {val}
              </span>
            </div>
            {/* バー: 背景を少し暗く */}
            <div
              style={{
                height: 5,
                background: "rgba(255,255,255,.06)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${val}%`,
                  height: "100%",
                  background: DIM_COLORS[i],
                  borderRadius: 3,
                  transition: "width 1s ease-out 1.4s",
                }}
                /* 初期値0%→実値へアニメーションさせるためCSSで制御 */
                ref={(el) => {
                  if (el) {
                    // マウント直後はwidth:0にして、次フレームで実値に
                    el.style.width = "0%";
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        el.style.width = `${val}%`;
                      });
                    });
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ===== 3. 相性TOP5: border控えめに ===== */}
      <div
        style={{
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 16,
          padding: "20px 18px",
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontSize: 14,
            color: "#FF6BE8",
            marginBottom: 14,
            fontWeight: 700,
          }}
        >
          あなたと相性の良いタイプ TOP5
        </h3>

        {compatTop5.map((entry, i) => (
          <div
            key={entry.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            {/* 順位 */}
            <span
              style={{
                fontSize: 12,
                color: i === 0 ? "#FF6BE8" : "rgba(255,255,255,.5)",
                fontWeight: 700,
                width: 24,
                flexShrink: 0,
              }}
            >
              #{i + 1}
            </span>

            {/* emoji */}
            <span style={{ fontSize: 18, flexShrink: 0 }}>
              {entry.type.emoji}
            </span>

            {/* タイプ名 */}
            <span
              style={{
                fontSize: 12,
                color: "#fff",
                width: 80,
                flexShrink: 0,
              }}
            >
              {entry.type.name}
            </span>

            {/* バー: 色はそのまま（各タイプの色で機能的） */}
            <div
              style={{
                flex: 1,
                height: 5,
                background: "rgba(255,255,255,.08)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${entry.score}%`,
                  height: "100%",
                  background: entry.type.color,
                  borderRadius: 3,
                }}
              />
            </div>

            {/* パーセント */}
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,.6)",
                width: 32,
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {entry.score}%
            </span>
          </div>
        ))}
      </div>

      {/* ===== 4. 恋愛アドバイスカード: borderなし、テキスト色調整 ===== */}
      <div
        style={{
          background: "rgba(255,255,255,.04)",
          border: "none",
          borderRadius: 16,
          padding: "20px 18px",
          marginBottom: 16,
        }}
      >
        <p
          style={{
            fontSize: 9.5,
            color: "#A0C0FF",
            marginBottom: 8,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          恋愛アドバイス
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

      {/* ===== 5. 応援メッセージ: border控えめ、グラデーションbgはそのまま ===== */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255,107,232,.08), rgba(196,90,255,.08))",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 16,
          padding: "24px 20px",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 30, marginBottom: 10 }}>{bestType.cheer}</div>
        <p
          className="font-zen"
          style={{
            fontSize: 17,
            color: "#fff",
            lineHeight: 1.8,
            marginBottom: 8,
          }}
        >
          {bestType.cheerm}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,.6)",
            lineHeight: 1.7,
          }}
        >
          {bestType.cheers}
        </p>
      </div>

      {/* ===== 6. シェア画像（Canvas）: そのまま ===== */}
      <div style={{ marginBottom: 16 }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 12,
            display: "block",
          }}
        />
        <button
          onClick={handleSaveImage}
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            padding: "12px 0",
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,107,232,.25)",
            borderRadius: 12,
            color: "#FF6BE8",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          画像を保存
        </button>
      </div>

      {/* ===== 7. 注記 ===== */}
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

      {/* ===== 8. シェアボタン行: border-radius統一、やり直すはghost style ===== */}
      <div
        style={{
          display: "flex",
          gap: 7,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* TikTok */}
        <a
          href={`https://www.tiktok.com/`}
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

        {/* X (Twitter) */}
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

        {/* やり直すボタン: ghost style */}
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
            border: "1px solid rgba(255,255,255,.15)",
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
    </div>
  );
}
