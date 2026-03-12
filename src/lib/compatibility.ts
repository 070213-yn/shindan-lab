/**
 * MBTI-128 9次元相性エンジン (Compatibility Engine)
 *
 * 128タイプの scoreWeights（9次元）を使い、5つの相性ドメインで
 * 2人のケミストリーを多角的に評価する。
 *
 * 従来の4軸MBTI（E/I, S/N, T/F, J/P）だけでなく、
 * 追加5軸（A/O, H/C, R/S, assert, flex）を組み込むことで、
 * 「表面上は合わないはずなのに惹かれ合う理由」や
 * 「同じMBTIなのに相性が違う理由」を可視化する。
 *
 * 5ドメイン:
 *   1. 恋愛ケミストリー (Romance)
 *   2. 友情ケミストリー (Friendship)
 *   3. 仕事ケミストリー (Work)
 *   4. コミュケミストリー (Communication)
 *   5. 成長ポテンシャル (Growth)
 */

// ============================================================
// 次元ラベル定義（日本語）
// ============================================================

/** 各次元のメタ情報 */
export interface DimensionLabel {
  key: string;
  positive: string;
  negative: string;
  name: string;
  /** 従来MBTIに含まれない追加軸かどうか */
  isExtended: boolean;
}

export const DIM_LABELS: DimensionLabel[] = [
  { key: 'ei',     positive: '外向的',   negative: '内向的',   name: 'エネルギーの方向', isExtended: false },
  { key: 'sn',     positive: '現実派',   negative: '直感派',   name: '情報の取り方',     isExtended: false },
  { key: 'tf',     positive: '論理派',   negative: '感情派',   name: '判断の仕方',       isExtended: false },
  { key: 'jp',     positive: '計画的',   negative: '柔軟',     name: '外界への態度',     isExtended: false },
  { key: 'ao',     positive: '果断',     negative: '慎重',     name: '決断スタイル',     isExtended: true },
  { key: 'hc',     positive: '熱意的',   negative: 'クール',   name: '感情表現',         isExtended: true },
  { key: 'rs',     positive: '安定型',   negative: '反応型',   name: '情緒安定性',       isExtended: true },
  { key: 'assert', positive: '高主張',   negative: '控えめ',   name: '自己主張度',       isExtended: true },
  { key: 'flex',   positive: '適応的',   negative: '一貫的',   name: '適応柔軟性',       isExtended: true },
];

// ============================================================
// 各次元のスコアレンジ定義
// ============================================================

/**
 * scoreWeights の各次元の理論上の最小値・最大値
 * normalizeWeights でこれを使い 0-100 に線形変換する
 */
const DIM_RANGES: { min: number; max: number }[] = [
  { min: -3,   max: 3 },    // [0] E/I
  { min: -3,   max: 3 },    // [1] S/N
  { min: -3,   max: 3 },    // [2] T/F
  { min: -3,   max: 3 },    // [3] J/P
  { min: -2,   max: 2 },    // [4] A/O
  { min: -2,   max: 2 },    // [5] H/C
  { min: -2,   max: 2 },    // [6] R/S
  { min: -2,   max: 2 },    // [7] assert
  { min: -1.5, max: 1.5 },  // [8] flex
];

// ============================================================
// ドメイン設定
// ============================================================

/**
 * 各ドメイン内の次元ごとの設定
 *
 * weight: その次元の重み（ドメイン内で合計1.0）
 * preferSimilar: 類似性を好む度合い（1.0=完全に類似重視、0.0=完全に補完重視、0.5=中立）
 */
interface DimensionWeight {
  weight: number;
  preferSimilar: number;
}

/** ドメインの完全定義 */
interface DomainConfig {
  key: string;
  label: string;
  emoji: string;
  /** 9次元分の重み・類似/補完設定 */
  dimensions: DimensionWeight[];
}

/**
 * 5つの相性ドメイン定義
 * 各ドメインの dimensions 配列は DIM_LABELS と同じ順序（9要素）
 */
const DOMAIN_CONFIGS: DomainConfig[] = [
  // -------------------------------------------------------
  // 恋愛ケミストリー: 感情表現(H/C)と情緒安定性(R/S)が鍵
  // -------------------------------------------------------
  {
    key: 'romance',
    label: '恋愛ケミストリー',
    emoji: '💕',
    dimensions: [
      { weight: 0.10, preferSimilar: 0.35 },  // E/I: やや補完（外向×内向は惹かれ合う）
      { weight: 0.12, preferSimilar: 0.75 },  // S/N: 類似（世界観の一致が大事）
      { weight: 0.10, preferSimilar: 0.30 },  // T/F: 補完（論理×感情は補い合う）
      { weight: 0.08, preferSimilar: 0.30 },  // J/P: 補完（計画×柔軟はバランス良い）
      { weight: 0.12, preferSimilar: 0.50 },  // A/O: 中立
      { weight: 0.18, preferSimilar: 0.25 },  // H/C: 補完重視（熱意×クールのバランス）
      { weight: 0.15, preferSimilar: 0.80 },  // R/S: 類似重視（両方安定が理想）
      { weight: 0.08, preferSimilar: 0.35 },  // assert: やや補完
      { weight: 0.07, preferSimilar: 0.50 },  // flex: 中立
    ],
  },

  // -------------------------------------------------------
  // 友情ケミストリー: エネルギーレベル(E/I)と感情表現(H/C)の一致が鍵
  // -------------------------------------------------------
  {
    key: 'friendship',
    label: '友情ケミストリー',
    emoji: '🤝',
    dimensions: [
      { weight: 0.15, preferSimilar: 0.85 },  // E/I: 類似（エネルギーの合致）
      { weight: 0.12, preferSimilar: 0.75 },  // S/N: 類似
      { weight: 0.08, preferSimilar: 0.50 },  // T/F: 中立
      { weight: 0.08, preferSimilar: 0.50 },  // J/P: 中立
      { weight: 0.10, preferSimilar: 0.60 },  // A/O: やや類似
      { weight: 0.15, preferSimilar: 0.80 },  // H/C: 類似（テンション合致）
      { weight: 0.10, preferSimilar: 0.75 },  // R/S: 類似
      { weight: 0.10, preferSimilar: 0.55 },  // assert: やや類似
      { weight: 0.12, preferSimilar: 0.75 },  // flex: 類似
    ],
  },

  // -------------------------------------------------------
  // 仕事ケミストリー: 計画性(J/P)と決断スタイル(A/O)の補完が鍵
  // -------------------------------------------------------
  {
    key: 'work',
    label: '仕事ケミストリー',
    emoji: '💼',
    dimensions: [
      { weight: 0.08, preferSimilar: 0.50 },  // E/I: 中立
      { weight: 0.10, preferSimilar: 0.30 },  // S/N: 補完（現実派+直感派でカバー）
      { weight: 0.12, preferSimilar: 0.50 },  // T/F: 中立
      { weight: 0.15, preferSimilar: 0.25 },  // J/P: 補完（計画+適応のコンビ）
      { weight: 0.15, preferSimilar: 0.35 },  // A/O: やや補完
      { weight: 0.08, preferSimilar: 0.50 },  // H/C: 中立
      { weight: 0.08, preferSimilar: 0.60 },  // R/S: やや類似
      { weight: 0.12, preferSimilar: 0.25 },  // assert: 補完（リーダー+サポーター）
      { weight: 0.12, preferSimilar: 0.50 },  // flex: 中立
    ],
  },

  // -------------------------------------------------------
  // コミュケミストリー: E/IとH/Cの一致/バランスが鍵
  // -------------------------------------------------------
  {
    key: 'communication',
    label: 'コミュケミストリー',
    emoji: '💬',
    dimensions: [
      { weight: 0.18, preferSimilar: 0.85 },  // E/I: 類似（テンポの一致）
      { weight: 0.12, preferSimilar: 0.75 },  // S/N: 類似（話の噛み合い）
      { weight: 0.15, preferSimilar: 0.50 },  // T/F: 中立
      { weight: 0.07, preferSimilar: 0.50 },  // J/P: 中立
      { weight: 0.05, preferSimilar: 0.50 },  // A/O: 中立
      { weight: 0.18, preferSimilar: 0.40 },  // H/C: やや補完（熱い話し手+クールな聞き手）
      { weight: 0.10, preferSimilar: 0.75 },  // R/S: 類似（感情の安定度が合う）
      { weight: 0.08, preferSimilar: 0.40 },  // assert: やや補完
      { weight: 0.07, preferSimilar: 0.60 },  // flex: やや類似
    ],
  },

  // -------------------------------------------------------
  // 成長ポテンシャル: 違いが大きいほど成長できる
  // -------------------------------------------------------
  {
    key: 'growth',
    label: '成長ポテンシャル',
    emoji: '🌱',
    dimensions: [
      { weight: 0.12, preferSimilar: 0.20 },  // E/I: 差異重視
      { weight: 0.15, preferSimilar: 0.15 },  // S/N: 差異重視
      { weight: 0.15, preferSimilar: 0.15 },  // T/F: 差異重視
      { weight: 0.12, preferSimilar: 0.20 },  // J/P: 差異重視
      { weight: 0.10, preferSimilar: 0.20 },  // A/O: 差異重視
      { weight: 0.10, preferSimilar: 0.20 },  // H/C: 差異重視
      { weight: 0.10, preferSimilar: 0.50 },  // R/S: 中立
      { weight: 0.08, preferSimilar: 0.20 },  // assert: 差異重視
      { weight: 0.08, preferSimilar: 0.20 },  // flex: 差異重視
    ],
  },
];

// ============================================================
// 結果型定義
// ============================================================

/** 1つのドメインの相性結果 */
export interface DomainResult {
  /** 相性スコア (0-100) */
  score: number;
  /** ドメイン名（日本語） */
  label: string;
  /** ドメイン絵文字 */
  emoji: string;
  /** 相性に最も寄与した次元（上位2つ、日本語テキスト） */
  topFactors: string[];
  /** 最も摩擦を生む次元（日本語テキスト、なければ null） */
  frictionPoint: string | null;
}

/** 総合相性結果 */
export interface ChemistryResult {
  /** 総合スコア (0-100) */
  overall: number;
  /** 5ドメインの詳細結果 */
  domains: {
    romance: DomainResult;
    friendship: DomainResult;
    work: DomainResult;
    communication: DomainResult;
    growth: DomainResult;
  };
  /** 主要インサイト（日本語、3-5個） */
  insights: string[];
  /** 従来のMBTIでは見えない隠れたケミストリー */
  hiddenChemistry: string;
}

// ============================================================
// 正規化関数
// ============================================================

/**
 * scoreWeights（各次元の生スコア）を 0-100 スケールに正規化する。
 *
 * 例: E/I が -3〜+3 のレンジの場合
 *   -3 → 0, 0 → 50, +3 → 100
 *
 * @param weights - 9次元の scoreWeights 配列
 * @returns 0-100 に正規化された 9次元配列
 */
export function normalizeWeights(weights: number[]): number[] {
  return weights.map((value, i) => {
    const { min, max } = DIM_RANGES[i];
    // レンジ内にクランプ
    const clamped = Math.max(min, Math.min(max, value));
    const range = max - min;
    if (range === 0) return 50;
    return ((clamped - min) / range) * 100;
  });
}

// ============================================================
// 次元ごとのスコア計算（内部関数）
// ============================================================

/**
 * 2つの正規化スコア間の次元スコアを計算する。
 *
 * 計算ロジック:
 *   similarity = 1 - |scoreA - scoreB| / 100
 *   dimScore = preferSimilar * similarity + (1 - preferSimilar) * (1 - similarity)
 *
 * preferSimilar=1.0 なら完全に「似ているほど高スコア」
 * preferSimilar=0.0 なら完全に「違うほど高スコア」
 * preferSimilar=0.5 なら類似度に関係なく常に0.5（中立）
 *
 * @param normA - タイプAの正規化スコア (0-100)
 * @param normB - タイプBの正規化スコア (0-100)
 * @param preferSimilar - 類似性選好度 (0.0-1.0)
 * @returns 次元スコア (0.0-1.0)
 */
function calcDimensionScore(
  normA: number,
  normB: number,
  preferSimilar: number
): number {
  const similarity = 1 - Math.abs(normA - normB) / 100;
  return preferSimilar * similarity + (1 - preferSimilar) * (1 - similarity);
}

// ============================================================
// ドメインスコア計算（内部関数）
// ============================================================

/**
 * 1つのドメインの相性スコアと各次元の寄与度を計算する。
 *
 * @returns ドメインスコア(0-100)と各次元の寄与度配列
 */
function calcDomainScore(
  normA: number[],
  normB: number[],
  config: DomainConfig
): { score: number; contributions: { dimIndex: number; contribution: number; dimScore: number }[] } {
  const contributions: { dimIndex: number; contribution: number; dimScore: number }[] = [];

  let totalScore = 0;

  for (let i = 0; i < 9; i++) {
    const { weight, preferSimilar } = config.dimensions[i];
    const dimScore = calcDimensionScore(normA[i], normB[i], preferSimilar);
    const contribution = weight * dimScore;
    totalScore += contribution;
    contributions.push({ dimIndex: i, contribution, dimScore });
  }

  // 0-1 を 0-100 に変換
  const score = Math.round(Math.max(0, Math.min(100, totalScore * 100)));

  return { score, contributions };
}

// ============================================================
// インサイト生成（内部関数）
// ============================================================

/**
 * 特定の次元の正規化スコアから、その人がどちら寄りかを日本語で返す
 */
function describeDimPosition(normScore: number, dimIndex: number): string {
  const dim = DIM_LABELS[dimIndex];
  if (normScore >= 65) return dim.positive;
  if (normScore <= 35) return dim.negative;
  return `${dim.name}がバランス型`;
}

/**
 * 2人の次元の差から、関係性テキストを生成する
 */
function describeDimRelation(
  normA: number,
  normB: number,
  dimIndex: number,
  preferSimilar: number
): string {
  const dim = DIM_LABELS[dimIndex];
  const diff = Math.abs(normA - normB);

  // 類似性が高い場合
  if (diff < 20) {
    return `${dim.name}が近く、自然な共鳴が生まれる`;
  }

  // 差異が大きい場合
  if (diff > 60) {
    if (preferSimilar < 0.4) {
      // 補完が好ましい次元
      return `${dim.name}の大きな違いが互いを引き付ける`;
    } else {
      // 類似が好ましい次元だが差異が大きい → 摩擦
      return `${dim.name}の差が摩擦を生みやすい`;
    }
  }

  // 中程度の差異
  if (preferSimilar < 0.4) {
    return `${dim.name}の程よい違いが新鮮さを生む`;
  }
  return `${dim.name}は概ね調和している`;
}

/**
 * ドメイン結果からトップ寄与次元とフリクション次元を特定する
 */
function buildDomainResult(
  normA: number[],
  normB: number[],
  config: DomainConfig,
  domainCalc: { score: number; contributions: { dimIndex: number; contribution: number; dimScore: number }[] }
): DomainResult {
  const { score, contributions } = domainCalc;

  // 寄与度の高い順にソート（スコアが高い = 良い相性に寄与）
  const sorted = [...contributions].sort((a, b) => b.contribution - a.contribution);

  // 上位2つをトップファクターとして取得
  const topFactors = sorted.slice(0, 2).map(c => {
    const dim = DIM_LABELS[c.dimIndex];
    const relation = describeDimRelation(
      normA[c.dimIndex],
      normB[c.dimIndex],
      c.dimIndex,
      config.dimensions[c.dimIndex].preferSimilar
    );
    return `【${dim.name}】${relation}`;
  });

  // 最下位1つをフリクションポイントとして取得
  // ただしスコアが0.4以上ならフリクションなし（十分良好）
  const worst = sorted[sorted.length - 1];
  let frictionPoint: string | null = null;
  if (worst.dimScore < 0.4) {
    const dim = DIM_LABELS[worst.dimIndex];
    const relation = describeDimRelation(
      normA[worst.dimIndex],
      normB[worst.dimIndex],
      worst.dimIndex,
      config.dimensions[worst.dimIndex].preferSimilar
    );
    frictionPoint = `【${dim.name}】${relation}`;
  }

  return {
    score,
    label: config.label,
    emoji: config.emoji,
    topFactors,
    frictionPoint,
  };
}

// ============================================================
// 隠れたケミストリー分析（従来MBTIでは見えないもの）
// ============================================================

/**
 * 拡張5軸（A/O, H/C, R/S, assert, flex）の中で
 * 最もケミストリーに影響を与えている次元を特定し、
 * 日本語テキストで返す
 */
function analyzeHiddenChemistry(
  normA: number[],
  normB: number[]
): string {
  // 拡張軸のインデックス: 4(A/O), 5(H/C), 6(R/S), 7(assert), 8(flex)
  const extendedIndices = [4, 5, 6, 7, 8];

  // 各拡張軸の差異を計算
  const extDiffs = extendedIndices.map(i => ({
    dimIndex: i,
    diff: Math.abs(normA[i] - normB[i]),
    avgPos: (normA[i] + normB[i]) / 2,
  }));

  // 差異が最大の軸（= 最も目立つ隠れた要因）
  const maxDiff = extDiffs.reduce((a, b) => a.diff > b.diff ? a : b);
  // 差異が最小の軸（= 最も共鳴している隠れた要因）
  const minDiff = extDiffs.reduce((a, b) => a.diff < b.diff ? a : b);

  const maxDim = DIM_LABELS[maxDiff.dimIndex];
  const minDim = DIM_LABELS[minDiff.dimIndex];

  // 従来MBTI(E/I, S/N, T/F, J/P)の差異合計
  const classicDiff = [0, 1, 2, 3].reduce(
    (sum, i) => sum + Math.abs(normA[i] - normB[i]), 0
  );
  // 拡張軸の差異合計
  const extTotalDiff = extDiffs.reduce((sum, d) => sum + d.diff, 0);

  // 従来MBTIの差異が小さいが拡張軸の差異が大きい → 隠れた不一致
  if (classicDiff < 100 && extTotalDiff > 150) {
    return `従来のMBTI4軸では「相性が良い」と出るが、` +
      `実は「${maxDim.name}」の違いが隠れた課題。` +
      `${describeDimPosition(normA[maxDiff.dimIndex], maxDiff.dimIndex)}と` +
      `${describeDimPosition(normB[maxDiff.dimIndex], maxDiff.dimIndex)}の差は、` +
      `日常のすれ違いの原因になりうる。ただし「${minDim.name}」が共鳴しているため、` +
      `そこが二人の隠れた絆になる`;
  }

  // 従来MBTIの差異が大きいが拡張軸の差異が小さい → 隠れた相性の良さ
  if (classicDiff > 200 && extTotalDiff < 100) {
    return `従来のMBTI4軸では「合わない」と出るが、` +
      `実は「${minDim.name}」をはじめ拡張5軸で深く共鳴している。` +
      `表面的な違い（情報の取り方や判断の仕方）の裏に、` +
      `感情のリズムや行動パターンの一致がある。これが「なぜか気が合う」の正体`;
  }

  // 拡張軸で最も差が大きい部分を指摘
  if (maxDiff.diff > 50) {
    return `4軸MBTIでは見えない「${maxDim.name}」が、二人の関係で最も大きな変数。` +
      `${describeDimPosition(normA[maxDiff.dimIndex], maxDiff.dimIndex)}と` +
      `${describeDimPosition(normB[maxDiff.dimIndex], maxDiff.dimIndex)}の組み合わせは、` +
      `刺激にもなれば摩擦にもなる。この違いを理解することが関係性の鍵`;
  }

  // 拡張軸で最も一致している部分を指摘
  return `4軸MBTIでは見えない「${minDim.name}」が、二人の隠れた共鳴ポイント。` +
    `ともに${describeDimPosition(normA[minDiff.dimIndex], minDiff.dimIndex)}傾向があり、` +
    `言葉にしなくても通じ合う部分がある。この無意識の一致が関係性の土台になっている`;
}

// ============================================================
// 総合インサイト生成（内部関数）
// ============================================================

/**
 * 全ドメインの結果から 3-5 個の総合インサイトを生成する
 */
function generateInsights(
  normA: number[],
  normB: number[],
  domainResults: Record<string, DomainResult>
): string[] {
  const insights: string[] = [];

  // --- インサイト1: 最も高いドメインと最も低いドメイン ---
  const domainEntries = Object.entries(domainResults) as [string, DomainResult][];
  const bestDomain = domainEntries.reduce((a, b) => a[1].score > b[1].score ? a : b);
  const worstDomain = domainEntries.reduce((a, b) => a[1].score < b[1].score ? a : b);

  insights.push(
    `二人の最大の強みは「${bestDomain[1].label}」（${bestDomain[1].score}点）。` +
    `一方で「${worstDomain[1].label}」（${worstDomain[1].score}点）には意識的なケアが必要`
  );

  // --- インサイト2: 拡張軸に基づくユニークな視点 ---
  // H/C（感情表現）の差
  const hcDiff = Math.abs(normA[5] - normB[5]);
  if (hcDiff > 50) {
    insights.push(
      `「感情表現」の大きな違い（${DIM_LABELS[5].name}軸）が関係にスパイスを与える。` +
      `熱意的な側が感情を引き出し、クールな側がバランスを保つ。この違いは従来MBTIでは測れない`
    );
  } else if (hcDiff < 15) {
    insights.push(
      `「感情表現」のスタイルが非常に近い。感情の温度感が一致しているため、` +
      `一緒にいて居心地が良い。これは従来MBTIでは見えない相性の要因`
    );
  }

  // --- インサイト3: R/S（情緒安定性）に基づく関係の安定度 ---
  const rsA = normA[6];
  const rsB = normB[6];
  const rsDiff = Math.abs(rsA - rsB);
  if (rsA > 65 && rsB > 65) {
    insights.push(
      `二人とも情緒が安定しており（R/S軸）、嵐のような衝突は少ない。` +
      `穏やかで長続きする関係を築ける土台がある`
    );
  } else if (rsA < 35 && rsB < 35) {
    insights.push(
      `二人とも感受性が高い（R/S軸で反応型）。共感し合える反面、` +
      `感情が増幅しやすいため、クールダウンの仕組みが大切`
    );
  } else if (rsDiff > 40) {
    insights.push(
      `情緒安定性（R/S軸）に差がある。安定型の側がアンカーになり、` +
      `反応型の側が関係に深みを加える。互いの違いを強みに変えよう`
    );
  }

  // --- インサイト4: assert（自己主張度）の相互作用 ---
  const assertA = normA[7];
  const assertB = normB[7];
  if (assertA > 65 && assertB > 65) {
    insights.push(
      `二人とも自己主張が強い。議論は活発だが、譲り合いを意識しないと衝突しやすい。` +
      `「勝ち負け」ではなく「合意形成」を目標にすると関係が深まる`
    );
  } else if (assertA < 35 && assertB < 35) {
    insights.push(
      `二人とも控えめな性格。穏やかな関係だが、本音を言えず不満が溜まりやすい。` +
      `定期的に気持ちを共有する時間を作ると、絆がさらに強くなる`
    );
  }

  // --- インサイト5: 成長ドメインが高い場合の特別メッセージ ---
  if (domainResults.growth && domainResults.growth.score >= 70) {
    insights.push(
      `成長ポテンシャルが高い組み合わせ。互いの「違い」が学びになり、` +
      `一緒にいることで視野が広がる。挑戦を恐れず、相手の世界に飛び込んでみよう`
    );
  }

  // 最大5個に制限
  return insights.slice(0, 5);
}

// ============================================================
// メイン計算関数
// ============================================================

/**
 * 2つのタイプの scoreWeights から5ドメインの相性を計算する。
 *
 * 使用例:
 * ```ts
 * const typeA = { scoreWeights: [-3, -2, 3, 2, 2, 2, 2, 2, -0.5] };  // INTJ-A-H-S
 * const typeB = { scoreWeights: [3, 2, -2, -1, -1, 1, -1, 0, 1] };   // ESFP系
 * const result = calculateChemistry(typeA.scoreWeights, typeB.scoreWeights);
 * console.log(result.overall);         // 総合スコア
 * console.log(result.domains.romance); // 恋愛ケミストリー詳細
 * console.log(result.hiddenChemistry); // 従来MBTIでは見えないインサイト
 * ```
 *
 * @param typeAWeights - タイプAの scoreWeights（9次元、生スコア）
 * @param typeBWeights - タイプBの scoreWeights（9次元、生スコア）
 * @returns 5ドメインの相性結果と総合インサイト
 */
export function calculateChemistry(
  typeAWeights: number[],
  typeBWeights: number[]
): ChemistryResult {
  // 1. 正規化 (0-100)
  const normA = normalizeWeights(typeAWeights);
  const normB = normalizeWeights(typeBWeights);

  // 2. 各ドメインのスコア計算
  const domainCalcs = DOMAIN_CONFIGS.map(config => ({
    config,
    calc: calcDomainScore(normA, normB, config),
  }));

  // 3. ドメイン結果オブジェクトを構築
  const domainResultMap: Record<string, DomainResult> = {};
  for (const { config, calc } of domainCalcs) {
    domainResultMap[config.key] = buildDomainResult(normA, normB, config, calc);
  }

  // 4. 総合スコア（5ドメインの加重平均）
  // 恋愛とコミュを少し重めにする
  const domainWeights: Record<string, number> = {
    romance: 0.25,
    friendship: 0.20,
    work: 0.15,
    communication: 0.25,
    growth: 0.15,
  };

  let overall = 0;
  for (const [key, dr] of Object.entries(domainResultMap)) {
    overall += dr.score * (domainWeights[key] ?? 0.2);
  }
  overall = Math.round(Math.max(0, Math.min(100, overall)));

  // 5. インサイト生成
  const insights = generateInsights(normA, normB, domainResultMap);
  const hiddenChemistry = analyzeHiddenChemistry(normA, normB);

  return {
    overall,
    domains: {
      romance: domainResultMap['romance'],
      friendship: domainResultMap['friendship'],
      work: domainResultMap['work'],
      communication: domainResultMap['communication'],
      growth: domainResultMap['growth'],
    },
    insights,
    hiddenChemistry,
  };
}

// ============================================================
// ユーティリティ関数
// ============================================================

/**
 * 相性スコアをテキストラベルに変換する
 *
 * @param score - 0-100 のスコア
 * @returns 日本語の相性ラベル
 */
export function getCompatibilityLabel(score: number): string {
  if (score >= 90) return '運命的な相性';
  if (score >= 80) return '最高の相性';
  if (score >= 70) return 'とても良い相性';
  if (score >= 60) return '良い相性';
  if (score >= 50) return 'まずまずの相性';
  if (score >= 40) return '普通の相性';
  if (score >= 30) return 'やや課題あり';
  return '要努力の相性';
}

/**
 * 相性スコアをグラデーションカラーに変換する
 *
 * @param score - 0-100 のスコア
 * @returns CSS カラーコード
 */
export function getCompatibilityColor(score: number): string {
  if (score >= 80) return '#10B981'; // 緑（素晴らしい）
  if (score >= 60) return '#3B82F6'; // 青（良い）
  if (score >= 40) return '#F59E0B'; // 黄（普通）
  return '#EF4444';                  // 赤（課題あり）
}

/**
 * 次元インデックスから DIM_LABELS のエントリを取得する
 */
export function getDimensionLabel(index: number): DimensionLabel {
  return DIM_LABELS[index];
}

/**
 * ドメイン設定を外部から参照できるようにエクスポート
 */
export function getDomainConfigs(): typeof DOMAIN_CONFIGS {
  return DOMAIN_CONFIGS;
}
