"use client";

/**
 * MBTI 16タイプ相性相関図
 *
 * 4x4グリッドに16のMBTIタイプを配置し、
 * 隣接タイプ間の相性を4段階（Best/Better/Good/Bad）で表示する。
 * SVGで描画、レスポンシブ対応。
 */

// タイプ定義
interface MbtiType {
  code: string;
  name: string;
  emoji: string;
  color: string;
}

// 4x4グリッド配置（認知機能の補完関係で最適化された配置）
const GRID: MbtiType[][] = [
  [
    { code: "ENTP", name: "討論者", emoji: "🎭", color: "#D97706" },
    { code: "ISFP", name: "冒険家", emoji: "🎨", color: "#9333EA" },
    { code: "ISTP", name: "巨匠", emoji: "🔧", color: "#64748B" },
    { code: "ENFP", name: "広報運動家", emoji: "🌟", color: "#EA580C" },
  ],
  [
    { code: "ESFJ", name: "領事", emoji: "🤝", color: "#0284C7" },
    { code: "INTJ", name: "建築家", emoji: "🏛", color: "#4F46E5" },
    { code: "INFJ", name: "提唱者", emoji: "🔮", color: "#059669" },
    { code: "ESTJ", name: "幹部", emoji: "📋", color: "#DC2626" },
  ],
  [
    { code: "INTP", name: "論理学者", emoji: "🧪", color: "#7C3AED" },
    { code: "ESFP", name: "エンターテイナー", emoji: "🎤", color: "#DB2777" },
    { code: "ESTP", name: "起業家", emoji: "🚀", color: "#EF4444" },
    { code: "INFP", name: "仲介者", emoji: "🌿", color: "#10B981" },
  ],
  [
    { code: "ISFJ", name: "擁護者", emoji: "🛡", color: "#047857" },
    { code: "ENTJ", name: "指揮官", emoji: "👑", color: "#B91C1C" },
    { code: "ENFJ", name: "主人公", emoji: "✨", color: "#0D9488" },
    { code: "ISTJ", name: "管理者", emoji: "📊", color: "#1E3A5F" },
  ],
];

// レイアウト定数
const CW = 155;
const CH = 118;
const GAP = 30;
const OX = 45;
const OY = 15;
const VW = 800;
const VH = 650;

// セル位置ヘルパー
const cellX = (c: number) => OX + c * (CW + GAP);
const cellY = (r: number) => OY + r * (CH + GAP);
const centerX = (c: number) => cellX(c) + CW / 2;
const centerY = (r: number) => cellY(r) + CH / 2;

// 相性レベル
type Level = "best" | "better" | "good" | "bad";

const LV: Record<Level, { color: string; symbol: string; label: string }> = {
  best:   { color: "#FF2255", symbol: "★", label: "Best" },
  better: { color: "#FF69B4", symbol: "◆", label: "Better" },
  good:   { color: "#22C55E", symbol: "●", label: "Good" },
  bad:    { color: "#9CA3AF", symbol: "×", label: "Bad" },
};

// 隣接相性接続 [行1, 列1, 行2, 列2, レベル]
const CONNS: [number, number, number, number, Level][] = [
  // 横方向（中央2つはBest = 3文字共通ペア、外側はBetter）
  [0,0, 0,1, "better"], [0,1, 0,2, "best"],  [0,2, 0,3, "better"],
  [1,0, 1,1, "good"],   [1,1, 1,2, "best"],  [1,2, 1,3, "good"],
  [2,0, 2,1, "better"], [2,1, 2,2, "best"],  [2,2, 2,3, "better"],
  [3,0, 3,1, "good"],   [3,1, 3,2, "best"],  [3,2, 3,3, "good"],
  // 縦方向（外側列=Bad（影の関係）、内側列=Good（補完関係））
  [0,0, 1,0, "bad"],  [1,0, 2,0, "bad"],  [2,0, 3,0, "bad"],
  [0,1, 1,1, "good"], [1,1, 2,1, "good"], [2,1, 3,1, "good"],
  [0,2, 1,2, "good"], [1,2, 2,2, "good"], [2,2, 3,2, "good"],
  [0,3, 1,3, "bad"],  [1,3, 2,3, "bad"],  [2,3, 3,3, "bad"],
];

export default function MbtiCompatChart() {
  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: "100%", height: "auto", borderRadius: 20, overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 定義 */}
        <defs>
          {/* 背景パステルレインボー */}
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
        {/* 背景の微妙なグリッドパターン */}
        <rect width={VW} height={VH} rx={20} fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth={1} />

        {/* === 接続線 === */}
        {CONNS.map(([r1, c1, r2, c2, level], i) => {
          const lv = LV[level];
          const isH = r1 === r2;
          let x1: number, y1: number, x2: number, y2: number;

          if (isH) {
            // 横接続: カード右端→次カード左端
            x1 = cellX(c1) + CW;
            x2 = cellX(c2);
            y1 = y2 = centerY(r1);
          } else {
            // 縦接続: カード下端→次カード上端
            x1 = x2 = centerX(c1);
            y1 = cellY(r1) + CH;
            y2 = cellY(r2);
          }

          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;

          return (
            <g key={`conn-${i}`}>
              {/* 接続線 */}
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={lv.color}
                strokeWidth={level === "best" ? 2.5 : 1.8}
                strokeDasharray={level === "bad" ? "5,3" : undefined}
                opacity={level === "bad" ? 0.45 : 0.65}
              />
              {/* シンボル背景（白丸） */}
              <circle
                cx={mx} cy={my}
                r={level === "best" ? 10 : 8}
                fill="white"
                stroke={lv.color}
                strokeWidth={1}
                opacity={0.95}
              />
              {/* シンボル */}
              <text
                x={mx} y={my + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={level === "best" ? 14 : level === "bad" ? 12 : 10}
                fill={lv.color}
                fontWeight="bold"
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

          return (
            <g key={t.code} filter="url(#cs)">
              {/* カード本体 */}
              <rect
                x={x} y={y} width={CW} height={CH}
                rx={12} fill="white"
                stroke={t.color} strokeWidth={2.5}
              />
              {/* 上部カラーアクセント */}
              <rect
                x={x} y={y} width={CW} height={40}
                fill={t.color} opacity={0.1}
                clipPath={`url(#cp-${t.code})`}
              />
              {/* カラーアクセントの下部を角丸なし */}
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
                {t.name} 型
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

              {/* 下部のカラーライン */}
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
              {/* 凡例背景 */}
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
                    {/* シンボル */}
                    <text
                      x={lx + 20} y={ly}
                      textAnchor="middle" dominantBaseline="central"
                      fontSize={18} fill={cfg.color} fontWeight="bold"
                    >
                      {cfg.symbol}
                    </text>
                    {/* ラベル */}
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
      </svg>
    </div>
  );
}
