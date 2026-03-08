/**
 * 汎用診断エンジン 共通型定義
 *
 * 全ての診断（恋愛以外）がこのインターフェースに従ってデータを定義する。
 * 診断エンジンはこの型を元にプロフィール入力→質問→結果表示を自動生成する。
 */

// --- プロフィール入力フィールド ---

export interface ProfileFieldOption {
  value: string;
  label: string;
  emoji?: string;
}

export interface ProfileFieldConfig {
  id: string;
  label: string;
  type: 'select' | 'slider';
  options?: ProfileFieldOption[];
  min?: number;
  max?: number;
  defaultValue?: number;
  unit?: string;
}

// --- スコアリング次元 ---

export interface DimensionConfig {
  key: string;
  label: string;
  color: string;
}

// --- 質問 ---

export interface DiagQuestion {
  sid: number;         // セクションID
  sectionName: string; // セクション名
  emoji: string;
  text: string;
  source: string;      // 参考文献
  weights: number[];   // 次元数分の重み配列
}

// --- 結果タイプ ---

export interface DiagResultType {
  id: string;
  emoji: string;
  name: string;
  tag: string;
  color: string;
  description: string;
  advice: string;
  traits: string[];
  /** 各次元に対する重みベクトル（タイプスコア計算用） */
  scoreWeights: number[];
}

// --- 診断設定（1つの診断全体の定義） ---

export interface DiagnosisConfig {
  id: string;
  title: string;
  subtitle: string;
  catchphrase: string;
  description: string;
  emoji: string;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;

  // プロフィール入力
  profileFields: ProfileFieldConfig[];

  // スコアリング次元
  dimensions: DimensionConfig[];

  // セクション名マップ
  sections: Record<number, string>;

  // 質問データ
  questions: DiagQuestion[];

  // 結果タイプ
  resultTypes: DiagResultType[];

  // メタ情報
  questionCount: number;
  estimatedMinutes: number;
  hashtags: string[];
  references: string[];
}

// --- 汎用ストア型 ---

export interface DiagnosticState {
  // プロフィール
  profileData: Record<string, string | number | null>;
  setProfileField: (key: string, value: string | number | null) => void;

  // 回答・スコア
  answers: (number | null)[];
  scores: number[];
  setAnswer: (index: number, value: number, weights: number[]) => void;

  // 画面遷移
  currentStep: 'landing' | 'profile' | 'quiz' | 'loading' | 'result';
  profileStep: number;
  setCurrentStep: (step: DiagnosticState['currentStep']) => void;
  setProfileStep: (step: number) => void;

  // リセット
  reset: (questionCount: number, dimensionCount: number) => void;
}

// --- スコアリングユーティリティ ---

/**
 * rawスコアを0-100に正規化する
 */
export function normalizeScoresGeneric(
  scores: number[],
  questions: DiagQuestion[]
): number[] {
  const dimCount = scores.length;
  const maxP = new Array(dimCount).fill(0);
  const minP = new Array(dimCount).fill(0);

  questions.forEach((q) => {
    q.weights.forEach((w, i) => {
      if (w > 0) maxP[i] += w * 5;
      if (w < 0) minP[i] += w * 5;
    });
  });

  return scores.map((s, i) => {
    const range = maxP[i] - minP[i];
    if (range === 0) return 50;
    return Math.max(0, Math.min(100, Math.round(((s - minP[i]) / range) * 100)));
  });
}

/**
 * 正規化スコアから最適なタイプを判定する
 */
export function findBestTypeGeneric(
  norm: number[],
  resultTypes: DiagResultType[]
): DiagResultType {
  let bestType = resultTypes[0];
  let bestScore = -Infinity;

  resultTypes.forEach((type) => {
    const score = type.scoreWeights.reduce((sum, w, i) => sum + w * (norm[i] || 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestType = type;
    }
  });

  return bestType;
}

/**
 * プロフィール情報に基づいてスコアを補正する（汎用版）
 * 性別・年齢による微調整
 */
export function applyProfileModifiersGeneric(
  norm: number[],
  profileData: Record<string, string | number | null>,
  dimensions: DimensionConfig[]
): number[] {
  const result = [...norm];
  const gender = profileData['gender'] as string | null;
  const age = profileData['age'] as number | null;

  // 年齢による微調整（若年層は感性系が高く、年齢が上がると理性系が高い）
  if (age !== null) {
    const ageRatio = Math.min(1, Math.max(0, (age - 10) / 40)); // 10歳→0, 50歳→1
    // 各次元を±5%の範囲で微調整
    result.forEach((val, i) => {
      const adjustment = (i % 2 === 0 ? -1 : 1) * ageRatio * 5;
      result[i] = Math.max(0, Math.min(100, Math.round(val + adjustment)));
    });
  }

  return result;
}
