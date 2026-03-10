"use client";

/**
 * ペルソナカードコンポーネント
 *
 * 全診断結果を統合した「自分だけの一枚」を生成。
 * Canvas描画によるシェア画像、レーダーチャート、レアリティ表示。
 * TikTokでバズるための9:16縦長フォーマット対応。
 */

import { useMemo, useEffect, useRef, useState } from "react";
import { usePersonaStore, type DiagnosisResult } from "@/store/personaStore";
import {
  generatePersonaTitle,
  generatePersonaSubtitle,
  extractPersonaKeywords,
  calculatePersonaStats,
  calculateRarity,
  generatePersonaColors,
  generatePersonaDescription,
} from "@/lib/personaEngine";

/** Hex色+アルファ値(0-1)をrgba文字列に変換するヘルパー */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
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

export default function PersonaCard() {
  const { results } = usePersonaStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const entries = Object.values(results).sort((a, b) =>
    a.diagnosisId.localeCompare(b.diagnosisId)
  );

  const persona = useMemo(() => {
    if (entries.length === 0) return null;
    return {
      title: generatePersonaTitle(results),
      subtitle: generatePersonaSubtitle(results),
      keywords: extractPersonaKeywords(results),
      stats: calculatePersonaStats(results),
      rarity: calculateRarity(results),
      colors: generatePersonaColors(results),
      description: generatePersonaDescription(results),
    };
  }, [results, entries.length]);

  // Canvas描画
  useEffect(() => {
    if (!persona || !canvasRef.current) return;
    drawPersonaCanvas();
  }, [persona]);

  function drawPersonaCanvas() {
    const canvas = canvasRef.current;
    if (!canvas || !persona) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 9:16比率（TikTok最適）
    const W = 720;
    const H = 1280;
    canvas.width = W;
    canvas.height = H;

    const { colors, stats, rarity, title, subtitle, keywords } = persona;

    // 背景グラデーション
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, "#F0FAFA");
    bgGrad.addColorStop(0.3, "#E8FFFE");
    bgGrad.addColorStop(0.7, "#F0FAFA");
    bgGrad.addColorStop(1, "#E0F7F7");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 星
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.5 + 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(45,212,191,${Math.random() * 0.3 + 0.1})`;
      ctx.fill();
    }

    // 装飾ブロブ
    const blobGrad1 = ctx.createRadialGradient(W * 0.2, H * 0.15, 0, W * 0.2, H * 0.15, 200);
    blobGrad1.addColorStop(0, hexToRgba(colors.primary, 0.19));
    blobGrad1.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = blobGrad1;
    ctx.fillRect(0, 0, W, H * 0.4);

    const blobGrad2 = ctx.createRadialGradient(W * 0.8, H * 0.7, 0, W * 0.8, H * 0.7, 180);
    blobGrad2.addColorStop(0, hexToRgba(colors.secondary, 0.13));
    blobGrad2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = blobGrad2;
    ctx.fillRect(0, H * 0.4, W, H * 0.6);

    // 外枠
    roundedRect(ctx, 12, 12, W - 24, H - 24, 24);
    ctx.strokeStyle = hexToRgba(colors.primary, 0.25);
    ctx.lineWidth = 2;
    ctx.stroke();

    // 内枠（装飾）
    roundedRect(ctx, 20, 20, W - 40, H - 40, 20);
    ctx.strokeStyle = hexToRgba(colors.primary, 0.08);
    ctx.lineWidth = 1;
    ctx.stroke();

    let y = 60;

    // ヘッダー: 診断研究所
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = hexToRgba(colors.primary, 0.69);
    ctx.textAlign = "center";
    ctx.fillText("診断研究所 PERSONA CARD", W / 2, y);
    y += 50;

    // メインエンブレム（円形）
    const cx = W / 2;
    const cy = y + 80;
    const emblemR = 70;

    // エンブレム外輪
    ctx.beginPath();
    ctx.arc(cx, cy, emblemR + 8, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(colors.primary, 0.31);
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, emblemR + 3, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(colors.secondary, 0.19);
    ctx.lineWidth = 1;
    ctx.stroke();

    // エンブレム内部（グラデーション）
    const emblemGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, emblemR);
    emblemGrad.addColorStop(0, hexToRgba(colors.primary, 0.25));
    emblemGrad.addColorStop(0.7, hexToRgba(colors.secondary, 0.13));
    emblemGrad.addColorStop(1, hexToRgba(colors.accent, 0.06));
    ctx.beginPath();
    ctx.arc(cx, cy, emblemR, 0, Math.PI * 2);
    ctx.fillStyle = emblemGrad;
    ctx.fill();

    // エンブレム内の診断結果emoji（最大6個を円形配置）
    const emojiList = entries.slice(0, 6).map((e) => e.typeEmoji);
    if (emojiList.length > 0) {
      ctx.font = "28px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (emojiList.length === 1) {
        ctx.font = "48px sans-serif";
        ctx.fillText(emojiList[0], cx, cy);
      } else {
        emojiList.forEach((emoji, i) => {
          const angle = (i / emojiList.length) * Math.PI * 2 - Math.PI / 2;
          const er = emblemR * 0.55;
          const ex = cx + Math.cos(angle) * er;
          const ey = cy + Math.sin(angle) * er;
          ctx.fillText(emoji, ex, ey);
        });
      }
    }
    ctx.textBaseline = "alphabetic";

    y = cy + emblemR + 30;

    // 称号
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#1a2e3b";
    ctx.textAlign = "center";
    ctx.fillText(title, W / 2, y);
    y += 30;

    // サブタイトル
    ctx.font = "14px sans-serif";
    ctx.fillStyle = hexToRgba(colors.primary, 0.565);
    ctx.fillText(subtitle, W / 2, y);
    y += 20;

    // レアリティ
    const rarityText = "★".repeat(rarity.stars) + "☆".repeat(Math.max(0, 6 - rarity.stars));
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#FFD700";
    ctx.fillText(rarityText, W / 2, y);
    y += 22;

    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255,215,0,.7)";
    ctx.fillText(`${rarity.label} ─ 全体の${rarity.percentage}`, W / 2, y);
    y += 35;

    // 区切り線
    const lineGrad = ctx.createLinearGradient(60, y, W - 60, y);
    lineGrad.addColorStop(0, "transparent");
    lineGrad.addColorStop(0.3, hexToRgba(colors.primary, 0.376));
    lineGrad.addColorStop(0.7, hexToRgba(colors.secondary, 0.376));
    lineGrad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(W - 60, y);
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1;
    ctx.stroke();
    y += 25;

    // 診断結果一覧
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "rgba(74,101,114,.6)";
    ctx.textAlign = "left";
    ctx.fillText("DIAGNOSIS RESULTS", 50, y);
    y += 18;

    const colW = (W - 100) / 2;
    entries.forEach((entry, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const rx = 50 + col * colW;
      const ry = y + row * 30;

      ctx.font = "11px sans-serif";
      ctx.fillStyle = entry.typeColor;
      ctx.textAlign = "left";
      ctx.fillText(`${entry.typeEmoji} ${entry.diagnosisTitle}`, rx, ry);

      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#1a2e3b";
      ctx.fillText(entry.typeName, rx + 4, ry + 14);
    });

    y += Math.ceil(entries.length / 2) * 30 + 20;

    // レーダーチャート
    if (y + 200 < H - 120) {
      const radarCx = W / 2;
      const radarCy = y + 100;
      const radarR = 80;

      // 軸ラベルと線
      stats.labels.forEach((label, i) => {
        const angle = (i / stats.labels.length) * Math.PI * 2 - Math.PI / 2;
        const lx = radarCx + Math.cos(angle) * (radarR + 20);
        const ly = radarCy + Math.sin(angle) * (radarR + 20);

        // 軸線
        ctx.beginPath();
        ctx.moveTo(radarCx, radarCy);
        ctx.lineTo(radarCx + Math.cos(angle) * radarR, radarCy + Math.sin(angle) * radarR);
        ctx.strokeStyle = "rgba(45,212,191,.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // ラベル
        ctx.font = "10px sans-serif";
        ctx.fillStyle = stats.colors[i];
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, lx, ly);
      });
      ctx.textBaseline = "alphabetic";

      // ガイド円
      [0.33, 0.66, 1].forEach((scale) => {
        ctx.beginPath();
        for (let i = 0; i <= stats.labels.length; i++) {
          const angle = (i / stats.labels.length) * Math.PI * 2 - Math.PI / 2;
          const px = radarCx + Math.cos(angle) * radarR * scale;
          const py = radarCy + Math.sin(angle) * radarR * scale;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(45,212,191,.1)";
        ctx.stroke();
      });

      // データ多角形
      ctx.beginPath();
      stats.values.forEach((val, i) => {
        const angle = (i / stats.labels.length) * Math.PI * 2 - Math.PI / 2;
        const r = (val / 100) * radarR;
        const px = radarCx + Math.cos(angle) * r;
        const py = radarCy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fillStyle = hexToRgba(colors.primary, 0.145);
      ctx.fill();
      ctx.strokeStyle = hexToRgba(colors.primary, 0.502);
      ctx.lineWidth = 2;
      ctx.stroke();

      // データ点
      stats.values.forEach((val, i) => {
        const angle = (i / stats.labels.length) * Math.PI * 2 - Math.PI / 2;
        const r = (val / 100) * radarR;
        const px = radarCx + Math.cos(angle) * r;
        const py = radarCy + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = stats.colors[i];
        ctx.fill();
      });

      y = radarCy + radarR + 40;
    }

    // キーワードタグ
    if (keywords.length > 0 && y + 60 < H - 60) {
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = hexToRgba(colors.primary, 0.502);
      const tagText = keywords.slice(0, 8).map((k) => `#${k}`).join("  ");
      ctx.fillText(tagText, W / 2, y);
      y += 20;
      if (keywords.length > 8) {
        const tagText2 = keywords.slice(8, 12).map((k) => `#${k}`).join("  ");
        ctx.fillText(tagText2, W / 2, y);
        y += 20;
      }
    }

    // フッター
    ctx.font = "11px sans-serif";
    ctx.fillStyle = hexToRgba(colors.primary, 0.314);
    ctx.textAlign = "center";
    ctx.fillText("#診断研究所 #ペルソナカード", W / 2, H - 40);
    ctx.font = "9px sans-serif";
    ctx.fillStyle = "rgba(74,101,114,.4)";
    ctx.fillText("tokimeki-lab.com", W / 2, H - 22);
  }

  function handleSaveImage() {
    // 保存前にCanvasを再描画（描画が消えている場合の対策）
    drawPersonaCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "shindan-lab-persona.png";
    a.click();
  }

  if (!mounted) return null;

  const shareText = persona
    ? `診断研究所でペルソナカード作ったら「${persona.title}」(${persona.rarity.label})だった！ #診断研究所 #ペルソナカード`
    : "";
  const shareUrl = "https://tokimeki-lab.com/persona";

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px" }}>
      {entries.length === 0 ? (
        /* 未診断時 */
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "rgba(255,255,255,0.7)",
            borderRadius: 20,
            border: "1px solid rgba(45,212,191,.15)",
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔮</div>
          <h3
            className="font-zen"
            style={{ fontSize: 18, fontWeight: 700, color: "#2dd4bf", marginBottom: 12 }}
          >
            まだ診断結果がありません
          </h3>
          <p style={{ fontSize: 13, color: "#4a6572", lineHeight: 1.8, marginBottom: 24 }}>
            診断を受けると、あなただけのペルソナカードが生成されます。
            <br />
            たくさんの診断を受けるほど、カードが豪華になります。
          </p>
          <a
            href="/"
            className="btn-gradient"
            style={{ padding: "14px 32px", textDecoration: "none", display: "inline-block", fontSize: 14 }}
          >
            診断を始める
          </a>
        </div>
      ) : (
        /* カード表示 */
        <>
          {/* ペルソナ情報（HTML版） */}
          <div
            style={{
              textAlign: "center",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(45,212,191,.15)",
              borderRadius: 20,
              padding: "32px 24px",
              marginBottom: 16,
              animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) both",
            }}
          >
            {/* エンブレム */}
            <div
              style={{
                width: 100,
                height: 100,
                margin: "0 auto 16px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${persona!.colors.primary}30, ${persona!.colors.secondary}20)`,
                border: `2px solid ${persona!.colors.primary}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                flexWrap: "wrap",
                gap: 2,
                padding: 8,
                animation: "float 4s ease-in-out infinite",
              }}
            >
              {entries.slice(0, 4).map((e, i) => (
                <span key={i} style={{ lineHeight: 1 }}>{e.typeEmoji}</span>
              ))}
            </div>

            {/* 称号 */}
            <h2
              className="font-stick"
              style={{ fontSize: 26, color: "#1a2e3b", marginBottom: 6 }}
            >
              {persona!.title}
            </h2>
            <p style={{ fontSize: 12, color: `${persona!.colors.primary}90`, marginBottom: 12 }}>
              {persona!.subtitle}
            </p>

            {/* レアリティ */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 18, color: "#FFD700", letterSpacing: 2 }}>
                {"★".repeat(persona!.rarity.stars)}
                {"☆".repeat(Math.max(0, 6 - persona!.rarity.stars))}
              </span>
              <p style={{ fontSize: 11, color: "rgba(255,215,0,.7)", marginTop: 4 }}>
                {persona!.rarity.label} -- 全体の{persona!.rarity.percentage}
              </p>
            </div>

            {/* 説明文 */}
            <p style={{ fontSize: 13, color: "#4a6572", lineHeight: 1.8 }}>
              {persona!.description}
            </p>
          </div>

          {/* 診断結果リスト */}
          <div
            style={{
              background: "rgba(255,255,255,0.7)",
              borderRadius: 16,
              padding: "20px 18px",
              marginBottom: 16,
              animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.1s both",
            }}
          >
            <h3 style={{ fontSize: 12, color: "#2dd4bf", marginBottom: 14, fontWeight: 700, letterSpacing: 1 }}>
              DIAGNOSIS RESULTS ({entries.length})
            </h3>
            {entries.map((entry) => (
              <div
                key={entry.diagnosisId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                  padding: "8px 10px",
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: 10,
                  border: `1px solid ${entry.typeColor}15`,
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{entry.typeEmoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: "rgba(74,101,114,.6)" }}>
                    {entry.diagnosisTitle}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: entry.typeColor }}>
                    {entry.typeName}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6軸ステータス */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              marginBottom: 16,
              animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.2s both",
            }}
          >
            {persona!.stats.labels.map((label, i) => (
              <div
                key={label}
                style={{
                  textAlign: "center",
                  padding: "12px 8px",
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: 12,
                  border: `1px solid ${persona!.stats.colors[i]}15`,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, color: persona!.stats.colors[i] }}>
                  {persona!.stats.values[i]}
                </div>
                <div style={{ fontSize: 9, color: "rgba(74,101,114,.6)", marginTop: 2 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* キーワード */}
          {persona!.keywords.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                justifyContent: "center",
                marginBottom: 16,
                animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.3s both",
              }}
            >
              {persona!.keywords.map((kw) => (
                <span
                  key={kw}
                  style={{
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 12,
                    background: `${persona!.colors.primary}12`,
                    color: persona!.colors.primary,
                    border: `1px solid ${persona!.colors.primary}25`,
                  }}
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}

          {/* Canvas画像 */}
          <div
            style={{
              marginBottom: 16,
              animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.4s both",
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
                padding: "14px 0",
                background: `linear-gradient(135deg, ${persona!.colors.primary}, ${persona!.colors.secondary})`,
                border: "none",
                borderRadius: 12,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ペルソナカードを保存
            </button>
          </div>

          {/* シェアボタン */}
          <div
            style={{
              display: "flex",
              gap: 7,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 24,
              animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.5s both",
            }}
          >
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 16px", background: "linear-gradient(135deg, #010101, #69C9D0)",
                borderRadius: 12, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}
            >
              TikTok
            </a>
            <a
              href={`https://line.me/R/share?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 16px", background: "#06C755",
                borderRadius: 12, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}
            >
              LINE
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 16px", background: "#1A1A1A",
                borderRadius: 12, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}
            >
              X
            </a>
          </div>

          {/* 他の診断への誘導 */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <p style={{ fontSize: 12, color: "#4a6572", marginBottom: 12 }}>
              もっと診断を受けるとカードがパワーアップ！
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(45,212,191,.3)",
                borderRadius: 25,
                color: "#2dd4bf",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              診断一覧へ
            </a>
          </div>
        </>
      )}
    </div>
  );
}
