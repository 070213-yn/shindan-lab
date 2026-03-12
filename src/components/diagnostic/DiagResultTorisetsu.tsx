"use client";

/**
 * わたしの取扱説明書 専用結果表示コンポーネント
 *
 * 処方箋風の特別なカードUIで結果を表示し、
 * Canvas APIでSNSシェア用画像（1080x1350）を生成する。
 * パステルカラーの可愛いデザインでバズを狙う。
 */

import { useMemo, useEffect, useRef, useState, useCallback } from "react";
import type { DiagnosisConfig, TorisetsuFields } from "@/lib/diagnosticTypes";
import { normalizeScoresGeneric, findBestTypeGeneric, applyProfileModifiersGeneric, selectTorisetsuText } from "@/lib/diagnosticTypes";
import { TORISETSU_PATTERNS } from "@/lib/diagnoses/torisetsu";
import type { GenericDiagState } from "@/store/createDiagnosticStore";
import type { DiagnosticTheme } from "@/lib/diagnosticThemes";
import { usePersonaStore } from "@/store/personaStore";
import AdPlacement from "@/components/AdPlacement";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
  theme: DiagnosticTheme;
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

/** テキストの折り返し描画ヘルパー */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
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
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineHeight);
  });
  return lines.length;
}

/** 取説項目の定義（ラベルとキー） */
const TORISETSU_SECTIONS: { key: keyof TorisetsuFields; label: string; icon: string }[] = [
  { key: 'whenDown', label: '落ち込んでいるとき', icon: '\u{1F4A7}' },
  { key: 'whenDecline', label: '遊びを断るとき', icon: '\u{1F44B}' },
  { key: 'howToPlease', label: '喜ばせる方法', icon: '\u{1F381}' },
  { key: 'ngWord', label: '怒らせるNGワード', icon: '\u26A0\uFE0F' },
  { key: 'loveMode', label: '恋愛モード', icon: '\u{1F495}' },
  { key: 'rechargeMethod', label: '充電方法', icon: '\u{1F50B}' },
  { key: 'cautionNote', label: '取扱注意事項', icon: '\u{1F6A8}' },
  { key: 'bestMatch', label: '相性のいい人', icon: '\u{1F91D}' },
];

/** セクションの背景色（パステルカラー、交互） */
const SECTION_COLORS = [
  { bg: '#FFF0F5', border: '#F9A8D420' },
  { bg: '#F0F8FF', border: '#93C5FD20' },
  { bg: '#FFF8F0', border: '#FBBF2420' },
  { bg: '#F5F0FF', border: '#C4B5FD20' },
  { bg: '#FFF0F5', border: '#F9A8D420' },
  { bg: '#F0FFF4', border: '#6EE7B720' },
  { bg: '#FFF5F5', border: '#FCA5A520' },
  { bg: '#F0F8FF', border: '#93C5FD20' },
];

export default function DiagResultTorisetsu({ config, store, theme }: Props) {
  const { scores, profileData, reset, setCurrentStep } = store;
  const { saveResult } = usePersonaStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // タイプ発表演出の状態
  const [revealed, setRevealed] = useState(false);

  // スコア正規化 -> タイプ判定 -> 取説テキスト動的選択
  const result = useMemo(() => {
    const rawNorm = normalizeScoresGeneric(scores, config.questions);
    const norm = applyProfileModifiersGeneric(rawNorm, profileData, config.dimensions);
    const bestType = findBestTypeGeneric(norm, config.resultTypes);

    // 各取説項目をスコアの組み合わせで動的に選択する
    // フォールバックとしてresultTypeに定義されたテキストを使う
    const fallback = bestType.torisetsuFields;
    const dynamicTorisetsu: TorisetsuFields = {
      whenDown: selectTorisetsuText(TORISETSU_PATTERNS.whenDown || [], norm, fallback?.whenDown || ''),
      whenDecline: selectTorisetsuText(TORISETSU_PATTERNS.whenDecline || [], norm, fallback?.whenDecline || ''),
      howToPlease: selectTorisetsuText(TORISETSU_PATTERNS.howToPlease || [], norm, fallback?.howToPlease || ''),
      ngWord: selectTorisetsuText(TORISETSU_PATTERNS.ngWord || [], norm, fallback?.ngWord || ''),
      loveMode: selectTorisetsuText(TORISETSU_PATTERNS.loveMode || [], norm, fallback?.loveMode || ''),
      rechargeMethod: selectTorisetsuText(TORISETSU_PATTERNS.rechargeMethod || [], norm, fallback?.rechargeMethod || ''),
      cautionNote: selectTorisetsuText(TORISETSU_PATTERNS.cautionNote || [], norm, fallback?.cautionNote || ''),
      bestMatch: selectTorisetsuText(TORISETSU_PATTERNS.bestMatch || [], norm, fallback?.bestMatch || ''),
    };

    return { norm, bestType, dynamicTorisetsu };
  }, [scores, profileData, config]);

  const { norm, bestType, dynamicTorisetsu } = result;
  // 動的に選択されたテキストを使う
  const torisetsu = dynamicTorisetsu;

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

  // Canvas描画（処方箋風シェア画像 1080x1350）
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !torisetsu) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    const themeRgb = hexToRgb(config.themeColor);

    // --- 背景: パステルピンクのグラデーション ---
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#FFF5F8');
    bgGrad.addColorStop(0.3, '#FFFBFE');
    bgGrad.addColorStop(0.7, '#FFF0F5');
    bgGrad.addColorStop(1, '#FFF5F8');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // --- 装飾: ドットパターン ---
    ctx.fillStyle = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.04)`;
    for (let x = 0; x < W; x += 24) {
      for (let y = 0; y < H; y += 24) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- 外枠（処方箋風の二重枠） ---
    // 外枠
    ctx.strokeStyle = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.3)`;
    ctx.lineWidth = 3;
    roundedRect(ctx, 30, 30, W - 60, H - 60, 24);
    ctx.stroke();
    // 内枠
    ctx.strokeStyle = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.15)`;
    ctx.lineWidth = 1;
    roundedRect(ctx, 42, 42, W - 84, H - 84, 20);
    ctx.stroke();

    // --- ヘッダー部分 ---
    let currentY = 80;

    // タイトル「わたしの取扱説明書」
    ctx.font = "bold 42px 'Hiragino Sans', 'Yu Gothic', sans-serif";
    ctx.fillStyle = config.themeColor;
    ctx.textAlign = "center";
    ctx.fillText('\u{1F4CB} わたしの取扱説明書', W / 2, currentY + 40);
    currentY += 60;

    // 区切り線
    ctx.beginPath();
    ctx.setLineDash([6, 4]);
    ctx.moveTo(80, currentY + 10);
    ctx.lineTo(W - 80, currentY + 10);
    ctx.strokeStyle = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.25)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
    currentY += 30;

    // タイプ名エリア（中央揃え）
    ctx.font = "52px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(bestType.emoji, W / 2, currentY + 50);
    currentY += 65;

    ctx.font = "bold 36px 'Hiragino Sans', 'Yu Gothic', sans-serif";
    ctx.fillStyle = config.themeColor;
    ctx.fillText(bestType.name, W / 2, currentY + 30);
    currentY += 40;

    ctx.font = "18px 'Hiragino Sans', 'Yu Gothic', sans-serif";
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText(bestType.tag, W / 2, currentY + 15);
    currentY += 30;

    // 特徴タグ
    const tagWidth = bestType.traits.reduce((sum, t) => {
      ctx.font = "16px 'Hiragino Sans', 'Yu Gothic', sans-serif";
      return sum + ctx.measureText(t).width + 32;
    }, 0);
    let tagX = (W - tagWidth) / 2;
    bestType.traits.forEach((trait) => {
      ctx.font = "16px 'Hiragino Sans', 'Yu Gothic', sans-serif";
      const tw = ctx.measureText(trait).width + 24;
      roundedRect(ctx, tagX, currentY, tw, 28, 14);
      ctx.fillStyle = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.08)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.2)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = config.themeColor;
      ctx.textAlign = "center";
      ctx.fillText(trait, tagX + tw / 2, currentY + 19);
      tagX += tw + 8;
    });
    currentY += 50;

    // 区切り線
    ctx.beginPath();
    ctx.setLineDash([6, 4]);
    ctx.moveTo(80, currentY);
    ctx.lineTo(W - 80, currentY);
    ctx.strokeStyle = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.2)`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
    currentY += 20;

    // --- 取説項目を2列で描画 ---
    const colWidth = (W - 160) / 2;
    const itemPadding = 12;
    const sectionColors = [
      '#FFF0F5', '#F0F8FF', '#FFF8F0', '#F5F0FF',
      '#FFF0F5', '#F0FFF4', '#FFF5F5', '#F0F8FF',
    ];
    const sectionBorderColors = [
      `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.15)`,
      'rgba(147, 197, 253, 0.2)',
      'rgba(251, 191, 36, 0.2)',
      'rgba(196, 181, 253, 0.2)',
      `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.15)`,
      'rgba(110, 231, 183, 0.2)',
      'rgba(252, 165, 165, 0.2)',
      'rgba(147, 197, 253, 0.2)',
    ];

    // 各項目の描画データを計算
    const items = TORISETSU_SECTIONS.map((section, idx) => ({
      ...section,
      text: torisetsu[section.key],
      bgColor: sectionColors[idx],
      borderColor: sectionBorderColors[idx],
    }));

    // 左列と右列に分ける
    const leftItems = items.filter((_, i) => i % 2 === 0);
    const rightItems = items.filter((_, i) => i % 2 === 1);

    const drawColumn = (columnItems: typeof items, startX: number, startY: number) => {
      let y = startY;
      columnItems.forEach((item) => {
        // セクション背景
        const boxH = 110;
        roundedRect(ctx, startX, y, colWidth, boxH, 12);
        ctx.fillStyle = item.bgColor;
        ctx.fill();
        ctx.strokeStyle = item.borderColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // アイコンとラベル
        ctx.font = "bold 15px 'Hiragino Sans', 'Yu Gothic', sans-serif";
        ctx.fillStyle = '#6B7280';
        ctx.textAlign = "left";
        ctx.fillText(`${item.icon} ${item.label}`, startX + itemPadding, y + 24);

        // テキスト内容
        ctx.font = "14px 'Hiragino Sans', 'Yu Gothic', sans-serif";
        ctx.fillStyle = '#374151';
        wrapText(ctx, item.text, startX + itemPadding, y + 48, colWidth - itemPadding * 2, 20);

        y += boxH + 10;
      });
    };

    drawColumn(leftItems, 70, currentY);
    drawColumn(rightItems, 70 + colWidth + 20, currentY);

    // 左列の最後のY位置を取得（4項目 * 120px）
    currentY += 4 * 120 + 10;

    // --- フッター ---
    // ハッシュタグ
    ctx.font = "bold 18px 'Hiragino Sans', 'Yu Gothic', sans-serif";
    ctx.fillStyle = `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.5)`;
    ctx.textAlign = "center";
    ctx.fillText('#\u308F\u305F\u3057\u306E\u53D6\u8AAC  #\u3068\u304D\u3081\u304D\u30E9\u30DC', W / 2, currentY + 10);

    // サイト名
    ctx.font = "14px 'Hiragino Sans', 'Yu Gothic', sans-serif";
    ctx.fillStyle = '#D1D5DB';
    ctx.fillText('shindan-lab.net', W / 2, currentY + 35);

  }, [result, config, torisetsu]);

  // Canvas描画
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  function handleSaveImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `watashi-no-torisetsu-${bestType.id}.png`;
    a.click();
  }

  // シェアテキスト
  const shareText = `\u{1F4CB} \u308F\u305F\u3057\u306E\u53D6\u6271\u8AAC\u660E\u66F8\u306F\u300C${bestType.emoji}${bestType.name}\u300D\u3067\u3057\u305F\uFF01\n\n${bestType.tag}\n\n#\u308F\u305F\u3057\u306E\u53D6\u8AAC #\u3068\u304D\u3081\u304D\u30E9\u30DC`;
  const shareUrl = "https://shindan-lab.net/shindan/torisetsu";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 16px 60px",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      {/* 広告枠（結果表示前） */}
      <AdPlacement slot="result-interstitial" themeColor={config.themeColor} />

      {/* ===== 処方箋風メインカード ===== */}
      <div
        style={{
          background: "linear-gradient(180deg, #FFFBFE, #FFF5F8)",
          border: "2px solid #F9A8D430",
          borderRadius: 24,
          padding: "28px 20px 24px",
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(244, 114, 182, 0.08)",
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) both",
        }}
      >
        {/* 装飾ドットパターン */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: "radial-gradient(#F472B6 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* タイトルヘッダー */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
            position: "relative",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: "#D1A3B8",
              marginBottom: 4,
              fontWeight: 600,
            }}
          >
            PRESCRIPTION
          </p>
          <h1
            className="font-stick"
            style={{
              fontSize: 22,
              color: config.themeColor,
              margin: 0,
              letterSpacing: 1,
            }}
          >
            わたしの取扱説明書
          </h1>
        </div>

        {/* 区切り線（破線） */}
        <div
          style={{
            borderTop: `1.5px dashed ${config.themeColor}30`,
            margin: "0 -8px 20px",
          }}
        />

        {/* タイプ発表エリア */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {/* 絵文字（ぼかし演出） */}
          <div
            style={{
              fontSize: 64,
              marginBottom: 6,
              position: "relative",
              filter: revealed ? "blur(0px)" : "blur(12px)",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "scale(1)" : "scale(0.8)",
              transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {bestType.emoji}
          </div>

          {/* タイプ名 */}
          <h2
            className="font-stick"
            style={{
              fontSize: 26,
              color: config.themeColor,
              marginBottom: 6,
              position: "relative",
              filter: revealed ? "blur(0px)" : "blur(16px)",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.2s",
            }}
          >
            {bestType.name}
          </h2>

          {/* タグ */}
          <span
            style={{
              display: "inline-block",
              background: `${config.themeColor}12`,
              color: config.themeColor,
              fontSize: 11,
              padding: "3px 12px",
              borderRadius: 20,
              opacity: revealed ? 1 : 0,
              transition: "opacity 0.6s 0.5s",
            }}
          >
            {bestType.tag}
          </span>

          {/* 特徴タグ */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              justifyContent: "center",
              marginTop: 12,
              opacity: revealed ? 1 : 0,
              transition: "opacity 0.6s 0.7s",
            }}
          >
            {bestType.traits.map((trait) => (
              <span
                key={trait}
                style={{
                  fontSize: 10,
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: `${config.themeColor}08`,
                  color: config.themeColor,
                  border: `1px solid ${config.themeColor}20`,
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* 区切り線 */}
        <div
          style={{
            borderTop: `1.5px dashed ${config.themeColor}20`,
            margin: "0 -8px 16px",
          }}
        />

        {/* ===== 取説項目セクション ===== */}
        {torisetsu && TORISETSU_SECTIONS.map((section, idx) => (
          <div
            key={section.key}
            style={{
              background: SECTION_COLORS[idx].bg,
              border: `1px solid ${SECTION_COLORS[idx].border}`,
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 10,
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(12px)",
              transition: `all 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${0.8 + idx * 0.08}s`,
            }}
          >
            {/* セクションラベル */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 14 }}>{section.icon}</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#7C8594",
                  letterSpacing: 0.5,
                }}
              >
                {section.label}
              </span>
            </div>
            {/* 内容 */}
            <p
              style={{
                fontSize: 13,
                color: "#374151",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {torisetsu[section.key]}
            </p>
          </div>
        ))}
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
                <span style={{ fontSize: 9.5, color: "#4a6572" }}>{val}</span>
              </div>
              <div
                style={{
                  height: 5,
                  background: "rgba(0,0,0,.06)",
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
          background: `linear-gradient(135deg, rgba(255,255,255,0.5), ${config.themeColor}08)`,
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
            color: "#2d4a57",
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
        <p className="font-zen" style={{ fontSize: 14, fontWeight: 700, color: "#0f1f2b", marginBottom: 8 }}>
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

      {/* シェア画像（Canvas / 処方箋風） */}
      <div
        style={{
          marginBottom: 16,
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.55s both",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: config.themeColor,
            fontWeight: 700,
            marginBottom: 8,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          SNSシェア用画像
        </p>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 16,
            display: "block",
            boxShadow: "0 4px 20px rgba(244, 114, 182, 0.1)",
          }}
        />
        <button
          onClick={handleSaveImage}
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            padding: "14px 0",
            background: "linear-gradient(135deg, #F472B6, #FB923C)",
            border: "none",
            borderRadius: 14,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            boxShadow: "0 4px 16px rgba(244, 114, 182, 0.2)",
          }}
        >
          画像を保存する
        </button>
      </div>

      {/* 注記 */}
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "#4a657280",
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
            color: config.themeColor,
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
