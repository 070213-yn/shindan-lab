"use client";

/**
 * パーソナルフレンズコンポーネント
 *
 * 全診断結果のマスコットが集合写真のように並ぶシェア画像を生成。
 * Canvas APIで9:16（720x1280）のTikTok向け画像を描画。
 * HTML版のインタラクティブ表示も併設。
 */

import { useMemo, useEffect, useRef, useState, useCallback } from "react";
import { usePersonaStore, type DiagnosisResult } from "@/store/personaStore";
import { DIAGNOSIS_LIST } from "@/lib/diagnoses";
import {
  generatePersonaTitle,
  calculateRarity,
} from "@/lib/personaEngine";

/** 恋愛診断は別データなので定数として追加定義 */
const LOVE_DIAGNOSIS = { id: "love", title: "恋愛性格診断", emoji: "💕", themeColor: "#FF6B9D" };

/** 全22診断の定義リスト（DIAGNOSIS_LIST + love） */
const ALL_DIAGNOSES = [
  LOVE_DIAGNOSIS,
  ...DIAGNOSIS_LIST.map((d) => ({
    id: d.id,
    title: d.title,
    emoji: d.emoji,
    themeColor: d.themeColor,
  })),
];

/** 完了数に応じたタイトルメッセージ */
function getProgressTitle(count: number, total: number): string {
  if (count === 0) return "冒険を始めよう";
  if (count <= 5) return "仲間が増えてきた！";
  if (count <= 10) return "賑やかになってきた！";
  if (count <= 15) return "もう少しでコンプリート！";
  if (count < total) return "あと少し...！";
  return "コンプリート！全員集合！";
}

/** マスコットの列配置を計算 */
function calculateRows(total: number): number[][] {
  const indices = Array.from({ length: total }, (_, i) => i);
  if (total <= 7) {
    // 1列
    return [indices];
  } else if (total <= 14) {
    // 2列（前列5、後列残り）
    const frontCount = Math.min(5, Math.ceil(total / 2));
    return [indices.slice(frontCount), indices.slice(0, frontCount)];
  } else {
    // 3列（前7、中7、後8）
    const backCount = Math.min(8, Math.ceil(total / 3));
    const midCount = Math.min(7, Math.ceil((total - backCount) / 2));
    const frontCount = total - backCount - midCount;
    return [
      indices.slice(frontCount + midCount), // 後列
      indices.slice(frontCount, frontCount + midCount), // 中列
      indices.slice(0, frontCount), // 前列
    ];
  }
}

/** Canvas上にマスコットを描画 */
function drawMascot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  emoji: string,
  typeName: string,
  isCompleted: boolean
) {
  if (isCompleted) {
    // 丸い体（グラデーション）
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
    grad.addColorStop(0, color + "FF");
    grad.addColorStop(1, color + "88");
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // 光沢（ハイライト）
    ctx.beginPath();
    ctx.arc(x - size * 0.25, y - size * 0.25, size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fill();

    // 外縁の光彩
    ctx.beginPath();
    ctx.arc(x, y, size + 2, 0, Math.PI * 2);
    ctx.strokeStyle = color + "40";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 絵文字
    ctx.font = `${size}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, x, y);

    // タイプ名（小さく下に）
    ctx.font = `bold ${Math.max(size * 0.28, 10)}px 'Zen Maru Gothic', sans-serif`;
    ctx.fillStyle = "#1a2e3b";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(typeName, x, y + size + size * 0.35);
  } else {
    // 未完了: グレーのシルエット
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(45,212,191,0.1)";
    ctx.fill();
    ctx.strokeStyle = "rgba(45,212,191,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // ?マーク
    ctx.font = `${size}px sans-serif`;
    ctx.fillStyle = "rgba(74,101,114,0.3)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", x, y);
  }
}

export default function PersonalFriends() {
  const { results } = usePersonaStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /** 全診断にマッチした情報を構築 */
  const allDiagnosesWithStatus = useMemo(() => {
    return ALL_DIAGNOSES.map((d) => {
      const result = results[d.id];
      return {
        id: d.id,
        title: d.title,
        emoji: d.emoji,
        themeColor: d.themeColor,
        isCompleted: !!result,
        typeName: result?.typeName || "",
        typeColor: result?.typeColor || d.themeColor,
        typeEmoji: result?.typeEmoji || d.emoji,
      };
    });
  }, [results]);

  const completedCount = allDiagnosesWithStatus.filter((d) => d.isCompleted).length;
  const totalCount = ALL_DIAGNOSES.length;

  const personaTitle = useMemo(() => {
    if (Object.keys(results).length === 0) return "";
    return generatePersonaTitle(results);
  }, [results]);

  const rarity = useMemo(() => {
    return calculateRarity(results);
  }, [results]);

  const progressTitle = getProgressTitle(completedCount, totalCount);

  /** Canvas描画 */
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 720;
    const H = 1280;
    canvas.width = W;
    canvas.height = H;

    // 背景グラデーション
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, "#F0FAFA");
    bgGrad.addColorStop(0.5, "#E8FFFE");
    bgGrad.addColorStop(1, "#F0FAFA");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 星パーティクル
    for (let i = 0; i < 150; i++) {
      ctx.beginPath();
      const sx = Math.random() * W;
      const sy = Math.random() * H;
      const sr = Math.random() * 1.8 + 0.3;
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(45,212,191,${Math.random() * 0.3 + 0.1})`;
      ctx.fill();
    }

    // 装飾ブロブ
    const blob1 = ctx.createRadialGradient(W * 0.2, H * 0.12, 0, W * 0.2, H * 0.12, 220);
    blob1.addColorStop(0, "rgba(45,212,191,0.15)");
    blob1.addColorStop(1, "transparent");
    ctx.fillStyle = blob1;
    ctx.fillRect(0, 0, W, H * 0.35);

    const blob2 = ctx.createRadialGradient(W * 0.8, H * 0.85, 0, W * 0.8, H * 0.85, 200);
    blob2.addColorStop(0, "rgba(56,189,248,0.1)");
    blob2.addColorStop(1, "transparent");
    ctx.fillStyle = blob2;
    ctx.fillRect(0, H * 0.6, W, H * 0.4);

    // 外枠
    ctx.strokeStyle = "rgba(45,212,191,0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, W - 32, H - 32);

    let y = 60;

    // ヘッダー: ときめきラボ
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "rgba(45,212,191,0.8)";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("ときめきラボ", W / 2, y);
    y += 50;

    // タイトル: MY PERSONAL FRIENDS
    ctx.font = "bold 38px sans-serif";
    ctx.fillStyle = "#1a2e3b";
    ctx.fillText("MY PERSONAL", W / 2, y);
    y += 44;
    ctx.fillText("FRIENDS", W / 2, y);
    y += 30;

    // ユーザーの人格タイトル（結果がある場合）
    if (personaTitle) {
      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "rgba(45,212,191,0.9)";
      ctx.fillText(`「${personaTitle}」`, W / 2, y);
      y += 20;
    }
    y += 30;

    // マスコット集合エリアの描画
    const rows = calculateRows(totalCount);
    const mascotAreaTop = y;
    const mascotAreaHeight = H - mascotAreaTop - 220; // 下部情報のためのスペース確保
    const rowSpacing = mascotAreaHeight / (rows.length + 0.5);
    const mascotSize = Math.min(36, rowSpacing * 0.35, (W - 80) / (Math.max(...rows.map((r) => r.length)) * 2.5));

    rows.forEach((row, rowIdx) => {
      const rowY = mascotAreaTop + rowSpacing * (rowIdx + 0.6);
      const rowWidth = W - 100;
      const spacing = rowWidth / (row.length + 1);

      // 後列ほど小さく・暗くする（集合写真効果）
      const depthScale = 1 - rowIdx * 0.08;
      const currentSize = mascotSize * depthScale;

      row.forEach((diagIdx, posIdx) => {
        const d = allDiagnosesWithStatus[diagIdx];
        const mx = 50 + spacing * (posIdx + 1);

        drawMascot(
          ctx,
          mx,
          rowY,
          currentSize,
          d.typeColor,
          d.isCompleted ? d.typeEmoji : d.emoji,
          d.isCompleted ? d.typeName : "",
          d.isCompleted
        );
      });
    });

    // 下部情報エリア
    let footerY = H - 200;

    // 完了数カウント
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#1a2e3b";
    ctx.textAlign = "center";
    ctx.fillText(`${completedCount} / ${totalCount}`, W / 2, footerY);
    footerY += 24;

    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgba(74,101,114,0.6)";
    ctx.fillText("diagnoses completed", W / 2, footerY);
    footerY += 35;

    // レアリティ
    if (completedCount > 0) {
      const rarityStars = "★".repeat(rarity.stars) + "☆".repeat(Math.max(0, 6 - rarity.stars));
      ctx.font = "20px sans-serif";
      ctx.fillStyle = "#FFD700";
      ctx.fillText(rarityStars, W / 2, footerY);
      footerY += 22;

      ctx.font = "12px sans-serif";
      ctx.fillStyle = "rgba(255,215,0,0.7)";
      ctx.fillText(`${rarity.label} — 全体の${rarity.percentage}`, W / 2, footerY);
      footerY += 30;
    }

    // ハッシュタグ
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(45,212,191,0.6)";
    ctx.fillText("#ときめきラボ  #パーソナルフレンズ  #診断", W / 2, H - 45);

    // URL
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(74,101,114,0.4)";
    ctx.fillText("tokimeki-lab.com", W / 2, H - 24);
  }, [allDiagnosesWithStatus, completedCount, totalCount, personaTitle, rarity]);

  // Canvas描画の実行
  useEffect(() => {
    if (!mounted) return;
    drawCanvas();
  }, [mounted, drawCanvas]);

  /** 画像ダウンロード */
  function handleSaveImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "tokimeki-lab-personal-friends.png";
    a.click();
  }

  if (!mounted) return null;

  const shareText = completedCount > 0
    ? `ときめきラボで${completedCount}/${totalCount}体のパーソナルフレンズを集めたよ！${personaTitle ? `称号は「${personaTitle}」` : ""} #ときめきラボ #パーソナルフレンズ #診断`
    : "";
  const shareUrl = "https://tokimeki-lab.com/persona";

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px" }}>
      {/* セクションタイトル */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) both",
        }}
      >
        <h2
          className="font-stick"
          style={{ fontSize: "clamp(20px, 6vw, 28px)", color: "#2dd4bf", marginBottom: 6 }}
        >
          パーソナルフレンズ
        </h2>
        <p style={{ fontSize: 13, color: "#4a6572", lineHeight: 1.7 }}>
          診断で出会った仲間たちの集合写真
        </p>
      </div>

      {/* HTML版インタラクティブ表示 */}
      <div
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(45,212,191,0.15)",
          borderRadius: 20,
          padding: "28px 20px",
          marginBottom: 16,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.1s both",
        }}
      >
        {/* 進捗タイトル */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <p
            className="font-zen"
            style={{ fontSize: 16, fontWeight: 700, color: "#FFD700", marginBottom: 4 }}
          >
            {progressTitle}
          </p>
          <p style={{ fontSize: 12, color: "rgba(74,101,114,0.5)" }}>
            {completedCount} / {totalCount} 体
          </p>
          {/* プログレスバー */}
          <div
            style={{
              width: "80%",
              height: 6,
              background: "rgba(45,212,191,0.1)",
              borderRadius: 3,
              margin: "10px auto 0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(completedCount / totalCount) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #2dd4bf, #38bdf8, #06b6d4)",
                borderRadius: 3,
                transition: "width 0.5s ease-out",
              }}
            />
          </div>
        </div>

        {/* マスコットグリッド */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
            gap: 12,
            justifyItems: "center",
          }}
        >
          {allDiagnosesWithStatus.map((d, i) => (
            <div
              key={d.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                animation: `staggeredFadeUp 0.4s cubic-bezier(0.25,1,0.5,1) ${0.02 * i}s both`,
              }}
            >
              {/* マスコット本体 */}
              <div
                className={d.isCompleted ? "mascot-bounce" : ""}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: d.isCompleted ? 24 : 18,
                  background: d.isCompleted
                    ? `radial-gradient(circle at 35% 35%, ${d.typeColor}CC, ${d.typeColor}55)`
                    : "rgba(45,212,191,0.08)",
                  border: d.isCompleted
                    ? `2px solid ${d.typeColor}60`
                    : "2px solid rgba(45,212,191,0.15)",
                  boxShadow: d.isCompleted
                    ? `0 0 16px ${d.typeColor}30, inset 0 -4px 8px rgba(0,0,0,0.2)`
                    : "none",
                  cursor: d.isCompleted ? "default" : "pointer",
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
                  position: "relative",
                }}
                title={d.isCompleted ? `${d.title}: ${d.typeName}` : `${d.title}（未診断）`}
              >
                {d.isCompleted ? (
                  <>
                    {/* ハイライト */}
                    <div
                      style={{
                        position: "absolute",
                        top: 6,
                        left: 10,
                        width: 12,
                        height: 8,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.35)",
                        pointerEvents: "none",
                      }}
                    />
                    <span>{d.typeEmoji}</span>
                  </>
                ) : (
                  <span style={{ color: "rgba(74,101,114,0.3)" }}>?</span>
                )}
              </div>
              {/* タイプ名 or 診断名 */}
              <span
                style={{
                  fontSize: 9,
                  color: d.isCompleted ? "#4a6572" : "rgba(74,101,114,0.4)",
                  textAlign: "center",
                  lineHeight: 1.2,
                  maxWidth: 64,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {d.isCompleted ? d.typeName : d.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas画像（シェア用） */}
      <div
        style={{
          marginBottom: 16,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.2s both",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 12,
            display: "block",
          }}
        />

        {/* 画像保存ボタン */}
        <button
          onClick={handleSaveImage}
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            padding: "14px 0",
            background: "linear-gradient(135deg, #2dd4bf, #38bdf8)",
            border: "none",
            borderRadius: 12,
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          フレンズ画像を保存
        </button>
      </div>

      {/* シェアボタン */}
      {completedCount > 0 && (
        <div
          style={{
            display: "flex",
            gap: 7,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 24,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.3s both",
          }}
        >
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
        </div>
      )}
    </div>
  );
}
