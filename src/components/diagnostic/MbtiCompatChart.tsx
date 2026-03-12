"use client";

import { useState, useMemo } from "react";

/**
 * MBTI 16タイプ相性相関図（改良版）
 *
 * 4x4グリッドに16タイプを配置し、
 * 隣接（横・縦）＋斜め（ゴールデンペア）の相性を表示。
 * タイプをクリックすると全15タイプとの相性詳細を表示。
 */

// === 型定義 ===
interface MbtiType {
  code: string;
  name: string;
  emoji: string;
  color: string;
}

// === 4x4グリッド配置 ===
const GRID: MbtiType[][] = [
  [
    { code: "ENTP", name: "討論者", emoji: "\u{1F3AD}", color: "#D97706" },
    { code: "ISFP", name: "冒険家", emoji: "\u{1F3A8}", color: "#9333EA" },
    { code: "ISTP", name: "巨匠", emoji: "\u{1F527}", color: "#64748B" },
    { code: "ENFP", name: "広報運動家", emoji: "\u{1F31F}", color: "#EA580C" },
  ],
  [
    { code: "ESFJ", name: "領事", emoji: "\u{1F91D}", color: "#0284C7" },
    { code: "INTJ", name: "建築家", emoji: "\u{1F3DB}", color: "#4F46E5" },
    { code: "INFJ", name: "提唱者", emoji: "\u{1F52E}", color: "#059669" },
    { code: "ESTJ", name: "幹部", emoji: "\u{1F4CB}", color: "#DC2626" },
  ],
  [
    { code: "INTP", name: "論理学者", emoji: "\u{1F9EA}", color: "#7C3AED" },
    { code: "ESFP", name: "エンターテイナー", emoji: "\u{1F3A4}", color: "#DB2777" },
    { code: "ESTP", name: "起業家", emoji: "\u{1F680}", color: "#EF4444" },
    { code: "INFP", name: "仲介者", emoji: "\u{1F33F}", color: "#10B981" },
  ],
  [
    { code: "ISFJ", name: "擁護者", emoji: "\u{1F6E1}", color: "#047857" },
    { code: "ENTJ", name: "指揮官", emoji: "\u{1F451}", color: "#B91C1C" },
    { code: "ENFJ", name: "主人公", emoji: "\u2728", color: "#0D9488" },
    { code: "ISTJ", name: "管理者", emoji: "\u{1F4CA}", color: "#1E3A5F" },
  ],
];

// タイプコードからタイプ情報を取得
const TYPE_MAP: Record<string, MbtiType> = {};
GRID.flat().forEach((t) => {
  TYPE_MAP[t.code] = t;
});

// === 認知機能スタック（主機能・補助・第三・劣等）===
const STACKS: Record<string, [string, string, string, string]> = {
  ENTP: ["Ne", "Ti", "Fe", "Si"],
  INTP: ["Ti", "Ne", "Si", "Fe"],
  ENTJ: ["Te", "Ni", "Se", "Fi"],
  INTJ: ["Ni", "Te", "Fi", "Se"],
  ENFP: ["Ne", "Fi", "Te", "Si"],
  INFP: ["Fi", "Ne", "Si", "Te"],
  ENFJ: ["Fe", "Ni", "Se", "Ti"],
  INFJ: ["Ni", "Fe", "Ti", "Se"],
  ESTP: ["Se", "Ti", "Fe", "Ni"],
  ISTP: ["Ti", "Se", "Ni", "Fe"],
  ESTJ: ["Te", "Si", "Ne", "Fi"],
  ISTJ: ["Si", "Te", "Fi", "Ne"],
  ESFP: ["Se", "Fi", "Te", "Ni"],
  ISFP: ["Fi", "Se", "Ni", "Te"],
  ESFJ: ["Fe", "Si", "Ne", "Ti"],
  ISFJ: ["Si", "Fe", "Ti", "Ne"],
};

// === ゴールデンペア（認知機能の補助・第三が一致、E/I補完）===
// 根拠: 認知機能理論に基づく。互いの補助機能が相手の第三機能と一致し、
// 主機能が異なる知覚/判断軸で補完し合うペア。
const GOLDEN_PAIR_SET = new Set([
  "ENTP-INFJ", "ENFP-INTJ", "ESTP-ISFJ", "ESFP-ISTJ",
  "INTP-ENFJ", "INFP-ESTJ", "ISTP-ESFJ", "ISFP-ENTJ",
]);

function isGoldenPair(a: string, b: string): boolean {
  const key = [a, b].sort().join("-");
  return GOLDEN_PAIR_SET.has(key);
}

// === レイアウト定数 ===
const CW = 155;
const CH = 118;
const GAP = 30;
const OX = 45;
const OY = 15;
const VW = 800;
const VH = 650;

const cellX = (c: number) => OX + c * (CW + GAP);
const cellY = (r: number) => OY + r * (CH + GAP);
const centerX = (c: number) => cellX(c) + CW / 2;
const centerY = (r: number) => cellY(r) + CH / 2;

// === 相性レベル ===
type Level = "best" | "better" | "good" | "bad";

const LV: Record<Level, { color: string; symbol: string; label: string }> = {
  best: { color: "#FF2255", symbol: "\u2605", label: "Best" },
  better: { color: "#FF69B4", symbol: "\u25C6", label: "Better" },
  good: { color: "#22C55E", symbol: "\u25CF", label: "Good" },
  bad: { color: "#9CA3AF", symbol: "\u00D7", label: "Bad" },
};

// === 隣接接続（修正版）===
// 横: P型行(0,2)=全てBetter、J型行(1,3)=外側Good・中央Better
// 縦: 外側列(0,3)=Bad（影の関係）、内側列(1,2)=Good
const ADJ_CONNS: [number, number, number, number, Level][] = [
  // 横方向
  [0, 0, 0, 1, "better"], [0, 1, 0, 2, "better"], [0, 2, 0, 3, "better"],
  [1, 0, 1, 1, "good"],   [1, 1, 1, 2, "better"], [1, 2, 1, 3, "good"],
  [2, 0, 2, 1, "better"], [2, 1, 2, 2, "better"], [2, 2, 2, 3, "better"],
  [3, 0, 3, 1, "good"],   [3, 1, 3, 2, "better"], [3, 2, 3, 3, "good"],
  // 縦方向
  [0, 0, 1, 0, "bad"],  [1, 0, 2, 0, "bad"],  [2, 0, 3, 0, "bad"],
  [0, 1, 1, 1, "good"], [1, 1, 2, 1, "good"], [2, 1, 3, 1, "good"],
  [0, 2, 1, 2, "good"], [1, 2, 2, 2, "good"], [2, 2, 3, 2, "good"],
  [0, 3, 1, 3, "bad"],  [1, 3, 2, 3, "bad"],  [2, 3, 3, 3, "bad"],
];

// === 斜め接続（ゴールデンペア）===
// [行1, 列1, 行2, 列2] — 全てBest
// t: シンボルの配置位置（0〜1、線に沿った割合）
const DIAG_CONNS: { r1: number; c1: number; r2: number; c2: number; t: number }[] = [
  // 上半分（行0↔1）
  { r1: 0, c1: 0, r2: 1, c2: 2, t: 0.3 }, // ENTP↔INFJ
  { r1: 0, c1: 2, r2: 1, c2: 0, t: 0.3 }, // ISTP↔ESFJ
  { r1: 0, c1: 1, r2: 1, c2: 3, t: 0.3 }, // ISFP↔ESTJ
  { r1: 0, c1: 3, r2: 1, c2: 1, t: 0.3 }, // ENFP↔INTJ
  // 下半分（行2↔3）
  { r1: 2, c1: 0, r2: 3, c2: 2, t: 0.3 }, // INTP↔ENFJ
  { r1: 2, c1: 2, r2: 3, c2: 0, t: 0.3 }, // ESTP↔ISFJ
  { r1: 2, c1: 1, r2: 3, c2: 3, t: 0.3 }, // ESFP↔ISTJ
  { r1: 2, c1: 3, r2: 3, c2: 1, t: 0.3 }, // INFP↔ENTJ
];

// === 相性マトリックス（ソシオニクス + 認知機能理論ベース）===
// 根拠: ソシオニクスの14タイプ間関係（Dual/Mirror/Activity/Conflict等）、
// Jungの認知機能スタック分析、および複数の相性データベースを総合。
// ★=5(Best), ◆=4(Better), ●=3(Good), ×=1(Bad)
const COMPAT_MATRIX: Record<string, Record<string, number>> = {
  ENTP: {ENTP:3,ISFP:4,ISTP:3,ENFP:4,ESFJ:1,INTJ:4,INFJ:5,ESTJ:1,INTP:4,ESFP:4,ESTP:3,INFP:3,ISFJ:1,ENTJ:4,ENFJ:4,ISTJ:1},
  ISFP: {ENTP:4,ISFP:3,ISTP:3,ENFP:3,ESFJ:4,INTJ:1,INFJ:3,ESTJ:5,INTP:4,ESFP:4,ESTP:3,INFP:4,ISFJ:4,ENTJ:1,ENFJ:3,ISTJ:4},
  ISTP: {ENTP:3,ISFP:3,ISTP:3,ENFP:1,ESFJ:5,INTJ:3,INFJ:1,ESTJ:4,INTP:4,ESFP:3,ESTP:4,INFP:1,ISFJ:3,ENTJ:4,ENFJ:1,ISTJ:4},
  ENFP: {ENTP:4,ISFP:3,ISTP:1,ENFP:3,ESFJ:3,INTJ:5,INFJ:4,ESTJ:1,INTP:3,ESFP:3,ESTP:1,INFP:4,ISFJ:3,ENTJ:4,ENFJ:4,ISTJ:1},
  ESFJ: {ENTP:1,ISFP:4,ISTP:5,ENFP:3,ESFJ:3,INTJ:3,INFJ:3,ESTJ:4,INTP:1,ESFP:4,ESTP:3,INFP:3,ISFJ:4,ENTJ:3,ENFJ:4,ISTJ:3},
  INTJ: {ENTP:4,ISFP:1,ISTP:3,ENFP:5,ESFJ:3,INTJ:3,INFJ:4,ESTJ:3,INTP:4,ESFP:1,ESTP:3,INFP:4,ISFJ:3,ENTJ:4,ENFJ:3,ISTJ:3},
  INFJ: {ENTP:5,ISFP:3,ISTP:1,ENFP:4,ESFJ:3,INTJ:4,INFJ:3,ESTJ:3,INTP:4,ESFP:3,ESTP:1,INFP:4,ISFJ:3,ENTJ:3,ENFJ:4,ISTJ:3},
  ESTJ: {ENTP:1,ISFP:5,ISTP:4,ENFP:1,ESFJ:4,INTJ:3,INFJ:3,ESTJ:3,INTP:1,ESFP:3,ESTP:4,INFP:1,ISFJ:3,ENTJ:3,ENFJ:3,ISTJ:4},
  INTP: {ENTP:4,ISFP:4,ISTP:4,ENFP:3,ESFJ:1,INTJ:4,INFJ:4,ESTJ:1,INTP:3,ESFP:4,ESTP:3,INFP:3,ISFJ:1,ENTJ:4,ENFJ:5,ISTJ:1},
  ESFP: {ENTP:4,ISFP:4,ISTP:3,ENFP:3,ESFJ:4,INTJ:1,INFJ:3,ESTJ:3,INTP:4,ESFP:3,ESTP:3,INFP:3,ISFJ:4,ENTJ:1,ENFJ:3,ISTJ:5},
  ESTP: {ENTP:3,ISFP:3,ISTP:4,ENFP:1,ESFJ:3,INTJ:3,INFJ:1,ESTJ:4,INTP:3,ESFP:3,ESTP:3,INFP:1,ISFJ:5,ENTJ:4,ENFJ:1,ISTJ:4},
  INFP: {ENTP:3,ISFP:4,ISTP:1,ENFP:4,ESFJ:3,INTJ:4,INFJ:4,ESTJ:1,INTP:3,ESFP:3,ESTP:1,INFP:3,ISFJ:3,ENTJ:5,ENFJ:4,ISTJ:1},
  ISFJ: {ENTP:1,ISFP:4,ISTP:3,ENFP:3,ESFJ:4,INTJ:3,INFJ:3,ESTJ:3,INTP:1,ESFP:4,ESTP:5,INFP:3,ISFJ:3,ENTJ:3,ENFJ:4,ISTJ:4},
  ENTJ: {ENTP:4,ISFP:1,ISTP:4,ENFP:4,ESFJ:3,INTJ:4,INFJ:3,ESTJ:3,INTP:4,ESFP:1,ESTP:4,INFP:5,ISFJ:3,ENTJ:3,ENFJ:3,ISTJ:3},
  ENFJ: {ENTP:4,ISFP:3,ISTP:1,ENFP:4,ESFJ:4,INTJ:3,INFJ:4,ESTJ:3,INTP:5,ESFP:3,ESTP:1,INFP:4,ISFJ:4,ENTJ:3,ENFJ:3,ISTJ:3},
  ISTJ: {ENTP:1,ISFP:4,ISTP:4,ENFP:1,ESFJ:3,INTJ:3,INFJ:3,ESTJ:4,INTP:1,ESFP:5,ESTP:4,INFP:1,ISFJ:4,ENTJ:3,ENFJ:3,ISTJ:3},
};

const SCORE_META: Record<number, { label: string; color: string; bg: string }> = {
  5: { label: "\u2605 \u30B4\u30FC\u30EB\u30C7\u30F3\u30DA\u30A2", color: "#FF2255", bg: "#FFF0F3" },
  4: { label: "\u25C6 \u76F8\u6027\u629C\u7FA4", color: "#FF69B4", bg: "#FFF5F9" },
  3: { label: "\u25CF \u76F8\u6027\u826F\u597D", color: "#22C55E", bg: "#F0FFF4" },
  2: { label: "\u25B2 \u666E\u901A", color: "#F59E0B", bg: "#FFFBEB" },
  1: { label: "\u00D7 \u8981\u52AA\u529B", color: "#9CA3AF", bg: "#F9FAFB" },
};

function getCompatScore(a: string, b: string): number {
  if (a === b) return 3;
  return COMPAT_MATRIX[a]?.[b] ?? 3;
}

// === コンポーネント ===
export default function MbtiCompatChart() {
  const [selected, setSelected] = useState<string | null>(null);

  // 選択タイプの相性リスト
  const compatList = useMemo(() => {
    if (!selected) return [];
    return GRID.flat()
      .filter((t) => t.code !== selected)
      .map((t) => ({
        ...t,
        score: getCompatScore(selected, t.code),
      }))
      .sort((a, b) => b.score - a.score);
  }, [selected]);

  const selectedInfo = selected ? TYPE_MAP[selected] : null;

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}>
      {/* === メインSVGチャート === */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: "100%", height: "auto", borderRadius: 20, overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 背景グラデーション */}
          <linearGradient id="compat-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF0F3" />
            <stop offset="25%" stopColor="#EEF0FF" />
            <stop offset="50%" stopColor="#EEFFF4" />
            <stop offset="75%" stopColor="#FFFFF0" />
            <stop offset="100%" stopColor="#FFF5F0" />
          </linearGradient>
          {/* カード影 */}
          <filter id="cs">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.08" />
          </filter>
          {/* 選択時のハイライト影 */}
          <filter id="cs-sel">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#FF2255" floodOpacity="0.25" />
          </filter>
          {/* タイプごとのクリップパス */}
          {GRID.flat().map((t, i) => {
            const r = Math.floor(i / 4);
            const c = i % 4;
            return (
              <clipPath key={t.code} id={`cp-${t.code}`}>
                <rect x={cellX(c)} y={cellY(r)} width={CW} height={CH} rx={12} />
              </clipPath>
            );
          })}
        </defs>

        {/* 背景 */}
        <rect width={VW} height={VH} rx={20} fill="url(#compat-bg)" />

        {/* === 斜め接続線（ゴールデンペア、カードの後ろに描画）=== */}
        {DIAG_CONNS.map((d, i) => {
          const x1 = centerX(d.c1);
          const y1 = centerY(d.r1);
          const x2 = centerX(d.c2);
          const y2 = centerY(d.r2);
          // シンボル位置（線に沿ったt地点）
          const sx = x1 + d.t * (x2 - x1);
          const sy = y1 + d.t * (y2 - y1);
          const lv = LV.best;

          return (
            <g key={`diag-${i}`}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={lv.color}
                strokeWidth={2.5}
                opacity={0.5}
                strokeLinecap="round"
              />
              {/* シンボル背景 */}
              <circle
                cx={sx} cy={sy} r={10}
                fill="white" stroke={lv.color} strokeWidth={1.5}
                opacity={0.95}
              />
              {/* シンボル */}
              <text
                x={sx} y={sy + 1}
                textAnchor="middle" dominantBaseline="central"
                fontSize={14} fill={lv.color} fontWeight="bold"
              >
                {lv.symbol}
              </text>
            </g>
          );
        })}

        {/* === 隣接接続線 === */}
        {ADJ_CONNS.map(([r1, c1, r2, c2, level], i) => {
          const lv = LV[level];
          const isH = r1 === r2;
          let x1: number, y1: number, x2: number, y2: number;

          if (isH) {
            x1 = cellX(c1) + CW;
            x2 = cellX(c2);
            y1 = y2 = centerY(r1);
          } else {
            x1 = x2 = centerX(c1);
            y1 = cellY(r1) + CH;
            y2 = cellY(r2);
          }

          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;

          return (
            <g key={`adj-${i}`}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={lv.color}
                strokeWidth={level === "best" ? 2.5 : 1.8}
                strokeDasharray={level === "bad" ? "5,3" : undefined}
                opacity={level === "bad" ? 0.45 : 0.65}
              />
              <circle
                cx={mx} cy={my}
                r={level === "best" ? 10 : 8}
                fill="white" stroke={lv.color} strokeWidth={1}
                opacity={0.95}
              />
              <text
                x={mx} y={my + 1}
                textAnchor="middle" dominantBaseline="central"
                fontSize={level === "best" ? 14 : level === "bad" ? 12 : 10}
                fill={lv.color} fontWeight="bold"
              >
                {lv.symbol}
              </text>
            </g>
          );
        })}

        {/* === タイプカード === */}
        {GRID.flat().map((t, i) => {
          const r = Math.floor(i / 4);
          const c = i % 4;
          const x = cellX(c);
          const y = cellY(r);
          const isSel = selected === t.code;

          return (
            <g
              key={t.code}
              filter={isSel ? "url(#cs-sel)" : "url(#cs)"}
              style={{ cursor: "pointer" }}
              onClick={() => setSelected((s) => (s === t.code ? null : t.code))}
            >
              {/* カード本体 */}
              <rect
                x={x} y={y} width={CW} height={CH}
                rx={12} fill="white"
                stroke={isSel ? "#FF2255" : t.color}
                strokeWidth={isSel ? 3.5 : 2.5}
              />
              {/* 上部カラーアクセント */}
              <rect
                x={x} y={y} width={CW} height={40}
                fill={t.color} opacity={0.1}
                clipPath={`url(#cp-${t.code})`}
              />
              <rect
                x={x} y={y + 28} width={CW} height={12}
                fill={t.color} opacity={0.1}
                clipPath={`url(#cp-${t.code})`}
              />

              {/* 絵文字 */}
              <text
                x={x + CW / 2} y={y + 22}
                textAnchor="middle" dominantBaseline="central"
                fontSize={22}
              >
                {t.emoji}
              </text>

              {/* 日本語名 + 型 */}
              <text
                x={x + CW / 2} y={y + 58}
                textAnchor="middle" dominantBaseline="central"
                fontSize={11} fill="#555" fontWeight={600}
                fontFamily="'Zen Maru Gothic', sans-serif"
              >
                {t.name} \u578B
              </text>

              {/* MBTIコード */}
              <text
                x={x + CW / 2} y={y + 88}
                textAnchor="middle" dominantBaseline="central"
                fontSize={24} fill={t.color} fontWeight={800}
                fontFamily="'Stick', monospace"
                letterSpacing="0.06em"
              >
                {t.code}
              </text>

              {/* 下部カラーライン */}
              <rect
                x={x + 20} y={y + CH - 6}
                width={CW - 40} height={2.5}
                rx={1.5} fill={t.color} opacity={0.25}
                clipPath={`url(#cp-${t.code})`}
              />
            </g>
          );
        })}

        {/* === 凡例 === */}
        {(() => {
          const ly = VH - 28;
          const items: Level[] = ["best", "better", "good", "bad"];
          const totalW = 500;
          const sx = (VW - totalW) / 2;
          const sp = totalW / items.length;

          return (
            <g>
              <rect
                x={sx - 20} y={ly - 16}
                width={totalW + 40} height={32}
                rx={16} fill="white" opacity={0.7}
              />
              {items.map((level, i) => {
                const cfg = LV[level];
                const lx = sx + sp * i;
                return (
                  <g key={level}>
                    <text
                      x={lx + 20} y={ly}
                      textAnchor="middle" dominantBaseline="central"
                      fontSize={18} fill={cfg.color} fontWeight="bold"
                    >
                      {cfg.symbol}
                    </text>
                    <text
                      x={lx + 38} y={ly}
                      textAnchor="start" dominantBaseline="central"
                      fontSize={14} fill="#666" fontWeight={700}
                      fontFamily="'Zen Maru Gothic', sans-serif"
                    >
                      {cfg.label}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })()}

        {/* タップ案内テキスト */}
        <text
          x={VW / 2} y={VH - 4}
          textAnchor="middle" dominantBaseline="central"
          fontSize={10} fill="#aaa"
          fontFamily="'Zen Maru Gothic', sans-serif"
        >
          {"\u30BF\u30A4\u30D7\u3092\u30BF\u30C3\u30D7\u3059\u308B\u3068\u8A73\u7D30\u76F8\u6027\u3092\u8868\u793A"}
        </text>
      </svg>

      {/* === 詳細パネル === */}
      {selected && selectedInfo && (
        <div
          style={{
            marginTop: 16,
            padding: "20px 16px",
            background: "white",
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            border: `2px solid ${selectedInfo.color}20`,
          }}
        >
          {/* ヘッダー */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28 }}>{selectedInfo.emoji}</span>
              <div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: selectedInfo.color,
                    fontFamily: "'Stick', monospace",
                    letterSpacing: "0.05em",
                  }}
                >
                  {selectedInfo.code}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#888",
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                  }}
                >
                  {selectedInfo.name}\u578B\u306E\u76F8\u6027\u4E00\u89A7
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: "none",
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: 13,
                color: "#888",
                fontFamily: "'Zen Maru Gothic', sans-serif",
              }}
            >
              {"\u9589\u3058\u308B"}
            </button>
          </div>

          {/* 相性カードグリッド */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 10,
            }}
          >
            {compatList.map((item) => {
              const meta = SCORE_META[item.score as keyof typeof SCORE_META];
              return (
                <div
                  key={item.code}
                  onClick={() => setSelected(item.code)}
                  style={{
                    padding: "12px 10px",
                    background: meta.bg,
                    borderRadius: 12,
                    border: `1.5px solid ${meta.color}30`,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{item.emoji}</div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: item.color,
                      fontFamily: "'Stick', monospace",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.code}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#888",
                      marginBottom: 6,
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: meta.color,
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                    }}
                  >
                    {meta.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 128タイプ補足 */}
          <div
            style={{
              marginTop: 14,
              padding: "10px 14px",
              background: "#F8FAFC",
              borderRadius: 10,
              fontSize: 11,
              color: "#999",
              lineHeight: 1.6,
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            {"\u203B \u3053\u306E\u76F8\u6027\u8868\u306F\u8A8D\u77E5\u6A5F\u80FD\u7406\u8AD6\uFF08Jung\u306E\u5FC3\u7406\u5B66\u7684\u30BF\u30A4\u30D7\u8AD6 + Socionics\u306E\u30BF\u30A4\u30D7\u9593\u95A2\u4FC2\u8AD6\uFF09\u306B\u57FA\u3065\u304F\u76F8\u6027\u8A55\u4FA1\u3067\u3059\u3002128\u30BF\u30A4\u30D7\u8A3A\u65AD\u3067\u306F\u3055\u3089\u306B5\u3064\u306E\u8FFD\u52A0\u6B21\u5143\uFF08\u679C\u65AD\u6027\u30FB\u611F\u60C5\u8868\u73FE\u30FB\u60C5\u7DD2\u5B89\u5B9A\u6027\u30FB\u81EA\u5DF1\u4E3B\u5F35\u5EA6\u30FB\u9069\u5FDC\u67D4\u8EDF\u6027\uFF09\u3092\u52A0\u5473\u3057\u305F\u3001\u3088\u308A\u7CBE\u5BC6\u306A\u76F8\u6027\u5206\u6790\u304C\u53EF\u80FD\u3067\u3059\u3002"}
          </div>
        </div>
      )}
    </div>
  );
}
