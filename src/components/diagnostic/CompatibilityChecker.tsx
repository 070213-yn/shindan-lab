"use client";

import { useState, useMemo, useCallback } from "react";
import {
  calculateChemistry,
  normalizeWeights,
  type ChemistryResult,
  type DomainResult,
  DIM_LABELS,
} from "@/lib/compatibility";
import { MBTI128_TYPES_1 } from "@/lib/diagnoses/mbti128-types1";
import { MBTI128_TYPES_2 } from "@/lib/diagnoses/mbti128-types2";
import { MBTI128_TYPES_3 } from "@/lib/diagnoses/mbti128-types3";
import { MBTI128_TYPES_4 } from "@/lib/diagnoses/mbti128-types4";

// ============================================================
// 型定義
// ============================================================

interface CompatibilityCheckerProps {
  /** 自分の128タイプのscoreWeights（9次元） */
  myWeights: number[];
  /** 自分のタイプ名 */
  myTypeName: string;
  /** 自分のタイプカラー */
  myColor: string;
  /** テーマカラー（診断のthemeColor） */
  themeColor: string;
}

interface BaseType {
  code: string;
  name: string;
  emoji: string;
  color: string;
}

// ============================================================
// 定数データ
// ============================================================

/** 16ベースタイプ（4x4グリッド順） */
const BASE_TYPES: BaseType[] = [
  { code: "ENTP", name: "討論者", emoji: "\u{1F3AD}", color: "#D97706" },
  { code: "INTP", name: "論理学者", emoji: "\u{1F9EA}", color: "#7C3AED" },
  { code: "ENTJ", name: "指揮官", emoji: "\u{1F451}", color: "#B91C1C" },
  { code: "INTJ", name: "建築家", emoji: "\u{1F3DB}", color: "#4F46E5" },
  { code: "ENFP", name: "広報運動家", emoji: "\u{1F31F}", color: "#EA580C" },
  { code: "INFP", name: "仲介者", emoji: "\u{1F33F}", color: "#10B981" },
  { code: "ENFJ", name: "主人公", emoji: "\u2728", color: "#0D9488" },
  { code: "INFJ", name: "提唱者", emoji: "\u{1F52E}", color: "#059669" },
  { code: "ESTP", name: "起業家", emoji: "\u{1F680}", color: "#EF4444" },
  { code: "ISTP", name: "巨匠", emoji: "\u{1F527}", color: "#64748B" },
  { code: "ESTJ", name: "幹部", emoji: "\u{1F4CB}", color: "#DC2626" },
  { code: "ISTJ", name: "管理者", emoji: "\u{1F4CA}", color: "#1E3A5F" },
  { code: "ESFP", name: "エンターテイナー", emoji: "\u{1F3A4}", color: "#DB2777" },
  { code: "ISFP", name: "冒険家", emoji: "\u{1F3A8}", color: "#9333EA" },
  { code: "ESFJ", name: "領事", emoji: "\u{1F91D}", color: "#0284C7" },
  { code: "ISFJ", name: "擁護者", emoji: "\u{1F6E1}", color: "#047857" },
];

/** サブタイプの補助軸コード */
const SUBTYPE_AXES = [
  { a: "a", o: "o", labelA: "果断", labelO: "慎重", key: "ao" },
  { a: "h", o: "c", labelA: "熱意", labelO: "クール", key: "hc" },
  { a: "s", o: "r", labelA: "安定", labelO: "反応", key: "rs" },
] as const;

/** 8サブタイプの組み合わせ（A/O, H/C, S/R） */
const SUBTYPE_COMBOS = [
  { ao: "a", hc: "h", rs: "s", label: "果断・熱意・安定" },
  { ao: "a", hc: "h", rs: "r", label: "果断・熱意・反応" },
  { ao: "a", hc: "c", rs: "s", label: "果断・クール・安定" },
  { ao: "a", hc: "c", rs: "r", label: "果断・クール・反応" },
  { ao: "o", hc: "h", rs: "s", label: "慎重・熱意・安定" },
  { ao: "o", hc: "h", rs: "r", label: "慎重・熱意・反応" },
  { ao: "o", hc: "c", rs: "s", label: "慎重・クール・安定" },
  { ao: "o", hc: "c", rs: "r", label: "慎重・クール・反応" },
];

/** 全128タイプを統合 */
const ALL_TYPES = [
  ...MBTI128_TYPES_1,
  ...MBTI128_TYPES_2,
  ...MBTI128_TYPES_3,
  ...MBTI128_TYPES_4,
];

// ============================================================
// ユーティリティ関数
// ============================================================

/**
 * ベースタイプコードからそのベースの8サブタイプのIDリストを生成する
 * 例: "INTJ" → ["intj-a-h-s", "intj-a-h-r", "intj-a-c-s", ...]
 */
function getSubtypeIds(baseCode: string): string[] {
  const base = baseCode.toLowerCase();
  return SUBTYPE_COMBOS.map(
    (c) => `${base}-${c.ao}-${c.hc}-${c.rs}`
  );
}

/**
 * ベースタイプの平均scoreWeightsを計算する（8サブタイプの平均）
 */
function getAverageWeights(baseCode: string): number[] | null {
  const ids = getSubtypeIds(baseCode);
  const types = ids
    .map((id) => ALL_TYPES.find((t) => t.id === id))
    .filter((t): t is (typeof ALL_TYPES)[number] => t != null);

  if (types.length === 0) return null;

  const dimCount = types[0].scoreWeights.length;
  const avg = new Array(dimCount).fill(0);
  for (const t of types) {
    for (let i = 0; i < dimCount; i++) {
      avg[i] += t.scoreWeights[i];
    }
  }
  for (let i = 0; i < dimCount; i++) {
    avg[i] /= types.length;
  }
  return avg;
}

/**
 * サブタイプIDからscoreWeightsを取得する
 */
function getSubtypeWeights(subtypeId: string): number[] | null {
  const found = ALL_TYPES.find((t) => t.id === subtypeId);
  return found?.scoreWeights ?? null;
}

/**
 * 16進カラーをRGBAに変換
 */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================================
// 9次元レーダーチャート (SVG)
// ============================================================

/** レーダーチャートのプロパティ */
interface RadarChartProps {
  normA: number[];
  normB: number[];
  colorA: string;
  colorB: string;
  labelA: string;
  labelB: string;
}

/** 9角形レーダーチャート */
function RadarChart({ normA, normB, colorA, colorB, labelA, labelB }: RadarChartProps) {
  const size = 350;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.36; // 最大半径
  const numAxes = 9;
  const angleStep = (2 * Math.PI) / numAxes;
  // 上方向（-90度）から開始
  const startAngle = -Math.PI / 2;

  // 軸の端点座標を取得
  const getPoint = (axisIndex: number, ratio: number) => {
    const angle = startAngle + axisIndex * angleStep;
    return {
      x: cx + Math.cos(angle) * maxR * ratio,
      y: cy + Math.sin(angle) * maxR * ratio,
    };
  };

  // ポリゴンのパスを生成
  const makePolygonPath = (values: number[]) => {
    return values
      .map((v, i) => {
        const ratio = Math.max(0, Math.min(1, v / 100));
        const pt = getPoint(i, ratio);
        return `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      })
      .join(" ") + " Z";
  };

  // グリッドレベル（25%, 50%, 75%, 100%）
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  // 9次元の短縮ラベル
  const axisLabels = DIM_LABELS.map((d) => d.name);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{
        width: "100%",
        maxWidth: 350,
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
    >
      {/* グリッド線（9角形） */}
      {gridLevels.map((level) => {
        const points = Array.from({ length: numAxes }, (_, i) => {
          const pt = getPoint(i, level);
          return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
        }).join(" ");
        return (
          <polygon
            key={`grid-${level}`}
            points={points}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={level === 1.0 ? 1.5 : 0.8}
            opacity={0.6}
          />
        );
      })}

      {/* 軸線 */}
      {Array.from({ length: numAxes }, (_, i) => {
        const pt = getPoint(i, 1.0);
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={pt.x}
            y2={pt.y}
            stroke="#D1D5DB"
            strokeWidth={0.8}
            opacity={0.5}
          />
        );
      })}

      {/* タイプAのエリア */}
      <path
        d={makePolygonPath(normA)}
        fill={hexToRgba(colorA, 0.2)}
        stroke={colorA}
        strokeWidth={2}
        opacity={0.8}
      />

      {/* タイプBのエリア */}
      <path
        d={makePolygonPath(normB)}
        fill={hexToRgba(colorB, 0.15)}
        stroke={colorB}
        strokeWidth={2}
        strokeDasharray="6,3"
        opacity={0.8}
      />

      {/* 各軸の値ドット（タイプA） */}
      {normA.map((v, i) => {
        const ratio = Math.max(0, Math.min(1, v / 100));
        const pt = getPoint(i, ratio);
        return (
          <circle
            key={`dot-a-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={3.5}
            fill={colorA}
            stroke="white"
            strokeWidth={1.5}
          />
        );
      })}

      {/* 各軸の値ドット（タイプB） */}
      {normB.map((v, i) => {
        const ratio = Math.max(0, Math.min(1, v / 100));
        const pt = getPoint(i, ratio);
        return (
          <circle
            key={`dot-b-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={3.5}
            fill={colorB}
            stroke="white"
            strokeWidth={1.5}
          />
        );
      })}

      {/* 軸ラベル */}
      {axisLabels.map((label, i) => {
        const pt = getPoint(i, 1.22);
        // ラベルの位置微調整
        const angle = startAngle + i * angleStep;
        const textAnchor =
          Math.abs(Math.cos(angle)) < 0.1
            ? "middle"
            : Math.cos(angle) > 0
              ? "start"
              : "end";
        const dy = Math.sin(angle) > 0.3 ? 4 : Math.sin(angle) < -0.3 ? -2 : 2;

        return (
          <text
            key={`label-${i}`}
            x={pt.x}
            y={pt.y + dy}
            textAnchor={textAnchor}
            dominantBaseline="central"
            fontSize={9.5}
            fill="#6B7280"
            fontFamily="'Zen Maru Gothic', sans-serif"
            fontWeight={DIM_LABELS[i]?.isExtended ? 700 : 500}
          >
            {label}
            {DIM_LABELS[i]?.isExtended && (
              <tspan fill={colorA} fontSize={7}> *</tspan>
            )}
          </text>
        );
      })}

      {/* 凡例 */}
      <g>
        {/* タイプA凡例 */}
        <rect x={cx - 80} y={size - 30} width={12} height={12} rx={2} fill={hexToRgba(colorA, 0.4)} stroke={colorA} strokeWidth={1} />
        <text x={cx - 64} y={size - 22} fontSize={10} fill="#6B7280" fontFamily="'Zen Maru Gothic', sans-serif" dominantBaseline="central">
          {labelA.length > 8 ? labelA.slice(0, 8) + "..." : labelA}
        </text>
        {/* タイプB凡例 */}
        <rect x={cx + 10} y={size - 30} width={12} height={12} rx={2} fill={hexToRgba(colorB, 0.3)} stroke={colorB} strokeWidth={1} strokeDasharray="3,2" />
        <text x={cx + 26} y={size - 22} fontSize={10} fill="#6B7280" fontFamily="'Zen Maru Gothic', sans-serif" dominantBaseline="central">
          {labelB.length > 8 ? labelB.slice(0, 8) + "..." : labelB}
        </text>
      </g>
    </svg>
  );
}

// ============================================================
// 円形パーセンテージ表示
// ============================================================

function CircularScore({ score, color }: { score: number; color: string }) {
  const size = 140;
  const strokeW = 10;
  const r = (size - strokeW) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* 背景の円 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={strokeW}
        />
        {/* スコアの円弧 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeW}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />
      </svg>
      <div
        style={{
          position: "relative",
          marginTop: -size + 10,
          width: size,
          height: size - 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: color,
            fontFamily: "'Stick', monospace",
            lineHeight: 1,
          }}
        >
          {score}
        </span>
        <span style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>/ 100</span>
      </div>
    </div>
  );
}

// ============================================================
// ドメインバー
// ============================================================

function DomainBar({ domain, themeColor }: { domain: DomainResult; themeColor: string }) {
  // スコアに応じた色
  const barColor =
    domain.score >= 75 ? "#10B981" :
    domain.score >= 55 ? themeColor :
    domain.score >= 40 ? "#F59E0B" :
    "#EF4444";

  return (
    <div style={{ marginBottom: 16 }}>
      {/* ラベル行 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: "#374151", fontFamily: "'Zen Maru Gothic', sans-serif" }}>
          {domain.emoji} {domain.label}
        </span>
        <span style={{ fontSize: 16, fontWeight: 800, color: barColor, fontFamily: "'Stick', monospace" }}>
          {domain.score}%
        </span>
      </div>

      {/* バー */}
      <div
        style={{
          width: "100%",
          height: 10,
          background: "#F3F4F6",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${domain.score}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${hexToRgba(barColor, 0.7)}, ${barColor})`,
            borderRadius: 5,
            transition: "width 0.8s ease-out",
          }}
        />
      </div>

      {/* トップ要因 */}
      {domain.topFactors.length > 0 && (
        <div
          style={{
            fontSize: 11,
            color: "#9CA3AF",
            marginTop: 4,
            lineHeight: 1.4,
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          {domain.topFactors[0]}
        </div>
      )}
    </div>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================

export default function CompatibilityChecker({
  myWeights,
  myTypeName,
  myColor,
  themeColor,
}: CompatibilityCheckerProps) {
  // --- 状態管理 ---
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);

  // --- 相手のscoreWeightsを取得 ---
  const partnerWeights = useMemo<number[] | null>(() => {
    if (selectedSubtype) {
      return getSubtypeWeights(selectedSubtype);
    }
    if (selectedBase) {
      return getAverageWeights(selectedBase);
    }
    return null;
  }, [selectedBase, selectedSubtype]);

  // --- 相手の表示名 ---
  const partnerDisplayName = useMemo(() => {
    if (selectedSubtype) {
      const found = ALL_TYPES.find((t) => t.id === selectedSubtype);
      return found?.name ?? selectedSubtype.toUpperCase();
    }
    if (selectedBase) {
      const bt = BASE_TYPES.find((t) => t.code === selectedBase);
      return bt ? `${bt.code} ${bt.name}（平均）` : selectedBase;
    }
    return "";
  }, [selectedBase, selectedSubtype]);

  // --- 相手のカラー ---
  const partnerColor = useMemo(() => {
    if (selectedSubtype) {
      const found = ALL_TYPES.find((t) => t.id === selectedSubtype);
      return found?.color ?? "#6B7280";
    }
    if (selectedBase) {
      const bt = BASE_TYPES.find((t) => t.code === selectedBase);
      return bt?.color ?? "#6B7280";
    }
    return "#6B7280";
  }, [selectedBase, selectedSubtype]);

  // --- 相性計算 ---
  const chemistryResult = useMemo<ChemistryResult | null>(() => {
    if (!partnerWeights) return null;
    return calculateChemistry(myWeights, partnerWeights);
  }, [myWeights, partnerWeights]);

  // --- 正規化スコア（レーダーチャート用） ---
  const normA = useMemo(() => normalizeWeights(myWeights), [myWeights]);
  const normB = useMemo(
    () => (partnerWeights ? normalizeWeights(partnerWeights) : null),
    [partnerWeights]
  );

  // --- イベントハンドラ ---
  const handleBaseSelect = useCallback((code: string) => {
    if (selectedBase === code) {
      // 同じベースをクリックしたら閉じる
      setSelectedBase(null);
      setSelectedSubtype(null);
    } else {
      setSelectedBase(code);
      setSelectedSubtype(null);
    }
  }, [selectedBase]);

  const handleSubtypeSelect = useCallback(
    (subtypeId: string) => {
      setSelectedSubtype((prev) => (prev === subtypeId ? null : subtypeId));
    },
    []
  );

  // --- ドメイン配列 ---
  const domainList = useMemo(() => {
    if (!chemistryResult) return [];
    const d = chemistryResult.domains;
    return [d.romance, d.friendship, d.work, d.communication, d.growth];
  }, [chemistryResult]);

  // ============================================================
  // レンダリング
  // ============================================================

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 720,
        margin: "0 auto",
        fontFamily: "'Zen Maru Gothic', sans-serif",
      }}
    >
      {/* ================================================ */}
      {/* ヘッダーセクション                                */}
      {/* ================================================ */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 28,
          padding: "24px 16px",
          background: `linear-gradient(135deg, ${hexToRgba(themeColor, 0.06)}, ${hexToRgba(themeColor, 0.02)})`,
          borderRadius: 16,
          border: `1px solid ${hexToRgba(themeColor, 0.12)}`,
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: themeColor,
            margin: "0 0 6px 0",
            letterSpacing: "0.04em",
          }}
        >
          9次元 相性ケミストリー
        </h2>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 14px 0", lineHeight: 1.5 }}>
          従来のMBTIでは見えない、5つの相性を可視化
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#9CA3AF",
            margin: 0,
            lineHeight: 1.7,
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          通常のMBTI診断は4つの軸で相性を判断しますが、この診断では果断性・熱意・情緒安定性・自己主張度・適応柔軟性の5つの追加軸を加えた9次元で、より精密な相性分析が可能です。
        </p>
      </div>

      {/* ================================================ */}
      {/* パートナータイプ選択                              */}
      {/* ================================================ */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "20px 16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: 20,
          border: "1px solid #F3F4F6",
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#374151",
            margin: "0 0 14px 0",
          }}
        >
          相手のタイプを選択
        </h3>

        {/* 4x4ベースタイプグリッド */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
          }}
        >
          {BASE_TYPES.map((bt) => {
            const isActive = selectedBase === bt.code;
            return (
              <div key={bt.code}>
                {/* ベースタイプカード */}
                <button
                  onClick={() => handleBaseSelect(bt.code)}
                  style={{
                    width: "100%",
                    padding: "10px 4px 8px",
                    background: isActive
                      ? hexToRgba(bt.color, 0.1)
                      : "#FAFAFA",
                    border: isActive
                      ? `2px solid ${bt.color}`
                      : "1.5px solid #E5E7EB",
                    borderRadius: 12,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                    boxShadow: isActive
                      ? `0 2px 8px ${hexToRgba(bt.color, 0.2)}`
                      : "none",
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 2 }}>{bt.emoji}</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: bt.color,
                      fontFamily: "'Stick', monospace",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {bt.code}
                  </div>
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 1 }}>
                    {bt.name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* サブタイプセレクター（ベースタイプ選択時に表示） */}
        {selectedBase && (
          <div
            style={{
              marginTop: 14,
              padding: "14px 12px",
              background: hexToRgba(
                BASE_TYPES.find((t) => t.code === selectedBase)?.color ?? themeColor,
                0.04
              ),
              borderRadius: 12,
              border: `1px solid ${hexToRgba(
                BASE_TYPES.find((t) => t.code === selectedBase)?.color ?? themeColor,
                0.15
              )}`,
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#6B7280",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontWeight: 700, color: BASE_TYPES.find((t) => t.code === selectedBase)?.color }}>
                {selectedBase}
              </span>
              のサブタイプを選択（任意）
            </div>

            {/* 8サブタイプチップ */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {SUBTYPE_COMBOS.map((combo) => {
                const subtypeId = `${selectedBase.toLowerCase()}-${combo.ao}-${combo.hc}-${combo.rs}`;
                const isSubActive = selectedSubtype === subtypeId;
                const baseColor =
                  BASE_TYPES.find((t) => t.code === selectedBase)?.color ?? themeColor;

                return (
                  <button
                    key={subtypeId}
                    onClick={() => handleSubtypeSelect(subtypeId)}
                    style={{
                      padding: "6px 10px",
                      fontSize: 11,
                      fontWeight: isSubActive ? 700 : 500,
                      color: isSubActive ? "white" : "#6B7280",
                      background: isSubActive ? baseColor : "white",
                      border: `1.5px solid ${isSubActive ? baseColor : "#D1D5DB"}`,
                      borderRadius: 20,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {combo.ao === "a" ? "A" : "O"}-{combo.hc === "h" ? "H" : "C"}-{combo.rs === "s" ? "S" : "R"}
                    <span style={{ marginLeft: 4, fontSize: 9, opacity: 0.7 }}>
                      {combo.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* サブタイプ未選択時の注釈 */}
            {!selectedSubtype && (
              <div
                style={{
                  fontSize: 10,
                  color: "#9CA3AF",
                  marginTop: 8,
                  lineHeight: 1.5,
                }}
              >
                ※ サブタイプを選択しない場合、{selectedBase}の8サブタイプの平均値で計算します
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================================================ */}
      {/* 結果セクション                                    */}
      {/* ================================================ */}
      {chemistryResult && normB && (
        <div
          style={{
            opacity: 1,
            transition: "opacity 0.5s ease",
          }}
        >
          {/* --- 総合スコア --- */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "24px 16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              marginBottom: 20,
              textAlign: "center",
              border: "1px solid #F3F4F6",
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#374151", margin: "0 0 4px 0" }}>
              総合相性スコア
            </h3>
            <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 16px 0" }}>
              {myTypeName} x {partnerDisplayName}
            </p>
            <CircularScore score={chemistryResult.overall} color={themeColor} />
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: themeColor,
                marginTop: 8,
              }}
            >
              {chemistryResult.overall >= 80
                ? "素晴らしいケミストリー！"
                : chemistryResult.overall >= 60
                  ? "良い相性です"
                  : chemistryResult.overall >= 45
                    ? "まずまずの相性"
                    : "成長し合える関係"}
            </p>
          </div>

          {/* --- 5ドメインバー --- */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "20px 16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              marginBottom: 20,
              border: "1px solid #F3F4F6",
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#374151", margin: "0 0 16px 0" }}>
              5つの相性ドメイン
            </h3>
            {domainList.map((domain, i) => (
              <DomainBar key={i} domain={domain} themeColor={themeColor} />
            ))}
          </div>

          {/* --- 9次元レーダーチャート --- */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "20px 16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              marginBottom: 20,
              border: "1px solid #F3F4F6",
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#374151", margin: "0 0 4px 0" }}>
              9次元プロフィール比較
            </h3>
            <p style={{ fontSize: 11, color: "#9CA3AF", margin: "0 0 16px 0" }}>
              * 印は従来MBTIにない追加次元
            </p>
            <RadarChart
              normA={normA}
              normB={normB}
              colorA={myColor}
              colorB={partnerColor}
              labelA="あなた"
              labelB={
                selectedSubtype
                  ? selectedSubtype.toUpperCase().replace(/-/g, " ")
                  : selectedBase ?? ""
              }
            />
          </div>

          {/* --- ケミストリーインサイト --- */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "20px 16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              marginBottom: 20,
              border: "1px solid #F3F4F6",
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#374151", margin: "0 0 16px 0" }}>
              ケミストリーインサイト
            </h3>

            {/* 隠れたケミストリー（特別バッジ） */}
            <div
              style={{
                padding: "14px 16px",
                background: `linear-gradient(135deg, ${hexToRgba(themeColor, 0.08)}, ${hexToRgba(themeColor, 0.03)})`,
                borderRadius: 12,
                border: `1.5px solid ${hexToRgba(themeColor, 0.2)}`,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  background: themeColor,
                  color: "white",
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 700,
                  marginBottom: 8,
                  letterSpacing: "0.03em",
                }}
              >
                従来のMBTIでは見えない相性ポイント
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#374151",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {chemistryResult.hiddenChemistry}
              </p>
            </div>

            {/* インサイトリスト */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {chemistryResult.insights.map((insight, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      minWidth: 22,
                      borderRadius: "50%",
                      background: hexToRgba(themeColor, 0.1),
                      color: themeColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      marginTop: 1,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "#4B5563",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 注釈 */}
          <div
            style={{
              padding: "12px 14px",
              background: "#F9FAFB",
              borderRadius: 12,
              fontSize: 11,
              color: "#9CA3AF",
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            ※ この相性分析はJungの認知機能理論（1921）、Costa &amp; McCraeのBig Five特性理論（1992）、およびEysenckの情緒安定性モデル（1967）に基づく9次元分析です。実際の人間関係は多くの要因に影響されるため、あくまで参考としてお楽しみください。
          </div>
        </div>
      )}
    </div>
  );
}
