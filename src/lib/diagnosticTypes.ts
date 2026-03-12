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

/** 取扱説明書診断用の追加フィールド */
export interface TorisetsuFields {
  /** 落ち込んでいるとき */
  whenDown: string;
  /** 遊びを断るとき */
  whenDecline: string;
  /** 喜ばせる方法 */
  howToPlease: string;
  /** 怒らせるNGワード */
  ngWord: string;
  /** 恋愛モード */
  loveMode: string;
  /** 充電方法 */
  rechargeMethod: string;
  /** 取扱注意事項 */
  cautionNote: string;
  /** 相性のいい人 */
  bestMatch: string;
}

// --- 取扱説明書パターンマッチング用の型 ---

/** スコアの高低を判定するルール（dim: 次元インデックス0-7, level: high>65/mid:35-65/low<35） */
export interface TorisetsuPatternRule {
  dim: number;
  level: 'high' | 'mid' | 'low';
}

/** 各取説項目に対するパターン定義 */
export interface TorisetsuPattern {
  rules: TorisetsuPatternRule[];
  text: string;
}

/**
 * スコアレベルを判定するユーティリティ
 * high: >65, mid: 35-65, low: <35
 */
export function getScoreLevel(score: number): 'high' | 'mid' | 'low' {
  if (score > 65) return 'high';
  if (score < 35) return 'low';
  return 'mid';
}

/**
 * パターンのルールがスコアにマッチするか判定し、マッチ度を返す
 * 全ルールがマッチすればルール数をスコアとして返し、マッチしなければ-1を返す
 */
export function matchPatternScore(pattern: TorisetsuPattern, normalizedScores: number[]): number {
  for (const rule of pattern.rules) {
    const actual = getScoreLevel(normalizedScores[rule.dim]);
    if (actual !== rule.level) return -1;
  }
  // ルール数が多いほど具体的なマッチ = 優先度が高い
  return pattern.rules.length;
}

/**
 * パターン配列から最もマッチするテキストを選択する
 * マッチするものがなければデフォルトテキストを返す
 */
export function selectTorisetsuText(
  patterns: TorisetsuPattern[],
  normalizedScores: number[],
  defaultText: string = ''
): string {
  let bestScore = -1;
  let bestText = defaultText;

  for (const pattern of patterns) {
    const score = matchPatternScore(pattern, normalizedScores);
    if (score > bestScore) {
      bestScore = score;
      bestText = pattern.text;
    }
  }

  return bestText;
}

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
  /** 取扱説明書診断専用の追加項目（他の診断では省略可） */
  torisetsuFields?: TorisetsuFields;
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
 *
 * 科学的根拠:
 * - Eriksonの心理社会的発達理論: 各ライフステージで異なる発達課題がある
 *   (少年期=勤勉性, 青年期=アイデンティティ, 壮年期=生殖性, 熟年期=統合性)
 * - Cattellの流動性知能(Gf)/結晶性知能(Gc)理論:
 *   流動性知能(創造力・適応力)は青年期にピーク、結晶性知能(経験・知恵)は加齢で上昇
 * - Costa & McCrae (1992) Big Five年齢変化研究:
 *   外向性・開放性は加齢で微減、協調性・誠実性は加齢で微増、神経症傾向は微減
 * - Helson & Soto (2005) 性格発達研究:
 *   性別差は存在するが個人差に比べ小さく、年齢とともに縮小する傾向がある
 *
 * 補正幅: 最大±8（元のスコアを大きく歪めない程度）
 * 年齢範囲: 10歳〜70歳（範囲外はクランプ）
 */
export function applyProfileModifiersGeneric(
  norm: number[],
  profileData: Record<string, string | number | null>,
  dimensions: DimensionConfig[]
): number[] {
  const result = [...norm];
  const gender = profileData['gender'] as string | null;
  const age = profileData['age'] as number | null;

  // --- ライフステージ別キーワードマッチング補正 ---
  if (age !== null) {
    // 年齢を10〜70にクランプ
    const clampedAge = Math.min(70, Math.max(10, age));

    // 各次元のlabelに含まれるキーワードで補正値を決定する
    // キーワードカテゴリ定義（label部分一致で判定）
    const keywordCategories: Record<string, string[]> = {
      // 感性・直感・創造性系
      sensitivity: ['感性', '感受性', '直感', '創造', 'クリエイティブ', '想像', '芸術', '美的', 'インスピレーション', '好奇心', '遊び'],
      // 論理・分析・管理系
      logic: ['論理', '分析', '管理', '計画', '戦略', '体系', '秩序', '効率', '組織', 'マネジメント'],
      // 冒険・挑戦・行動系
      adventure: ['冒険', '挑戦', '行動', '大胆', '積極', 'チャレンジ', '開拓', '衝動', '情熱', 'エネルギー'],
      // 社交・コミュニケーション系
      social: ['社交', 'コミュニケーション', '外向', '対人', '協調', '共感', '人間関係', 'チームワーク', '交流'],
      // 安定・堅実・忍耐系
      stability: ['安定', '堅実', '忍耐', '持続', '継続', '慎重', '保守', '着実', '粘り強', '責任'],
      // リーダーシップ・実行力系
      leadership: ['リーダー', '実行', '決断', '主導', '統率', '推進', '意志', '自信', '影響力'],
      // 知恵・内省・精神性系
      wisdom: ['知恵', '内省', '精神', '哲学', '洞察', '悟り', '深み', '成熟', '思慮', '俯瞰', '包容'],
      // 体力・活力・スピード系
      physical: ['体力', '活力', 'スピード', '瞬発', '反射', '運動', '身体', 'パワー', 'スタミナ'],
    };

    /**
     * ライフステージごとの各カテゴリ補正値（最大±8）
     * 正の値 = そのステージでその特性が高まる
     * 負の値 = そのステージでその特性が低め
     */
    interface StageModifiers {
      sensitivity: number;
      logic: number;
      adventure: number;
      social: number;
      stability: number;
      leadership: number;
      wisdom: number;
      physical: number;
    }

    // 各ライフステージの補正テーブル
    const stageTable: { minAge: number; maxAge: number; modifiers: StageModifiers }[] = [
      {
        // 少年期(10-15): Eriksonの「勤勉性vs劣等感」、Cattellの流動性知能が伸び盛り
        minAge: 10, maxAge: 15,
        modifiers: {
          sensitivity: 7, logic: -4, adventure: 4, social: 2,
          stability: -5, leadership: -3, wisdom: -3, physical: 5,
        },
      },
      {
        // 青年期(16-25): Eriksonの「アイデンティティ確立」、外向性・開放性がピーク
        minAge: 16, maxAge: 25,
        modifiers: {
          sensitivity: 4, logic: 0, adventure: 8, social: 6,
          stability: -4, leadership: 2, wisdom: -2, physical: 6,
        },
      },
      {
        // 壮年期(26-40): Eriksonの「親密性→生殖性」、Big Fiveの誠実性が上昇
        minAge: 26, maxAge: 40,
        modifiers: {
          sensitivity: 0, logic: 4, adventure: 2, social: 3,
          stability: 3, leadership: 6, wisdom: 2, physical: 2,
        },
      },
      {
        // 中年期(41-55): 結晶性知能が高く、Costa & McCraeの協調性・誠実性が高い
        minAge: 41, maxAge: 55,
        modifiers: {
          sensitivity: -2, logic: 5, adventure: -4, social: 0,
          stability: 7, leadership: 4, wisdom: 5, physical: -3,
        },
      },
      {
        // 熟年期(56-70): Eriksonの「統合性」、結晶性知能の蓄積、内省的
        minAge: 56, maxAge: 70,
        modifiers: {
          sensitivity: 2, logic: 3, adventure: -6, social: -2,
          stability: 5, leadership: 0, wisdom: 8, physical: -6,
        },
      },
    ];

    // 現在のライフステージを特定（境界付近はブレンド）
    const getStageModifier = (ageVal: number): StageModifiers => {
      // 完全にステージ内にいる場合
      for (const stage of stageTable) {
        if (ageVal >= stage.minAge && ageVal <= stage.maxAge) {
          // ステージ境界3歳以内ならブレンド（滑らかな遷移）
          const nextStageIdx = stageTable.indexOf(stage) + 1;
          if (nextStageIdx < stageTable.length) {
            const nextStage = stageTable[nextStageIdx];
            const transitionStart = stage.maxAge - 2; // 境界の2歳前からブレンド開始
            if (ageVal >= transitionStart) {
              const blend = (ageVal - transitionStart) / (stage.maxAge - transitionStart + 1);
              const blended = {} as StageModifiers;
              for (const key of Object.keys(stage.modifiers) as (keyof StageModifiers)[]) {
                blended[key] = stage.modifiers[key] * (1 - blend) + nextStage.modifiers[key] * blend;
              }
              return blended;
            }
          }
          return { ...stage.modifiers };
        }
      }
      // フォールバック（到達しないはず）
      return { sensitivity: 0, logic: 0, adventure: 0, social: 0, stability: 0, leadership: 0, wisdom: 0, physical: 0 };
    };

    const stageMods = getStageModifier(clampedAge);

    // 各次元のlabelをキーワードカテゴリにマッチさせて補正を適用
    dimensions.forEach((dim, i) => {
      const label = dim.label;
      let totalAdjustment = 0;
      let matchCount = 0;

      for (const [category, keywords] of Object.entries(keywordCategories)) {
        const matched = keywords.some((kw) => label.includes(kw));
        if (matched) {
          totalAdjustment += stageMods[category as keyof StageModifiers];
          matchCount++;
        }
      }

      // 複数カテゴリにマッチした場合は平均を取る（過剰補正を防ぐ）
      if (matchCount > 0) {
        const adjustment = totalAdjustment / matchCount;
        result[i] = Math.max(0, Math.min(100, Math.round(result[i] + adjustment)));
      }
    });
  }

  // --- 性別による微調整 ---
  // Costa & McCrae (2001): 女性は協調性・神経症傾向がやや高い、男性は外向性の主張面がやや高い
  // Helson & Soto (2005): 性差は個人差に比べ小さい → 補正幅は最大±3に抑える
  if (gender) {
    const genderKeywordMap: Record<string, { keywords: string[]; maleAdj: number; femaleAdj: number }[]> = {
      // 共感・感受性: 女性がやや高い傾向（Baron-Cohen共感化-体系化理論、ただし差は小さい）
      empathy: [
        { keywords: ['共感', '感受性', '感性', '思いやり', '包容'], maleAdj: -2, femaleAdj: 2 },
      ],
      // 体系化・論理: 男性がやや高い傾向（ただしこれも平均差であり個人差が大きい）
      systemizing: [
        { keywords: ['論理', '分析', '体系', '戦略'], maleAdj: 2, femaleAdj: -1 },
      ],
      // 協調性: 女性がやや高い（Costa & McCrae, 2001）
      agreeableness: [
        { keywords: ['協調', 'チームワーク', '調和', '対人'], maleAdj: -1, femaleAdj: 2 },
      ],
      // 主張・競争: 男性がやや高い（ただし僅差）
      assertiveness: [
        { keywords: ['主導', '競争', '大胆', '挑戦', '決断'], maleAdj: 2, femaleAdj: -1 },
      ],
      // 内省・精神性: 女性がやや高い傾向
      introspection: [
        { keywords: ['内省', '精神', '直感', '洞察'], maleAdj: -1, femaleAdj: 1 },
      ],
    };

    const isMale = gender === 'male' || gender === '男性';
    const isFemale = gender === 'female' || gender === '女性';

    if (isMale || isFemale) {
      dimensions.forEach((dim, i) => {
        const label = dim.label;
        for (const entries of Object.values(genderKeywordMap)) {
          for (const entry of entries) {
            if (entry.keywords.some((kw) => label.includes(kw))) {
              const adj = isMale ? entry.maleAdj : entry.femaleAdj;
              result[i] = Math.max(0, Math.min(100, Math.round(result[i] + adj)));
            }
          }
        }
      });
    }
  }

  return result;
}
