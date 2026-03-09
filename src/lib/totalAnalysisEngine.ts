/**
 * 統合パーソナリティ分析エンジン
 *
 * 全診断結果を横断的にクロスリファレンスし、心理学的フレームワークに基づいた
 * 超具体的な人格分析を生成する。
 *
 * 使用する心理学理論:
 * 1. Big Five (OCEAN モデル) - Costa & McCrae (1992)
 * 2. 自己決定理論 (SDT) - Deci & Ryan (2000)
 * 3. VIA性格強み - Peterson & Seligman (2004)
 * 4. キャリアアンカー理論 - Schein (1990)
 * 5. 愛着理論 - Bowlby (1969), Hazan & Shaver (1987)
 * 6. エリクソンの心理社会的発達段階 - Erikson (1950)
 */

import type { DiagnosisResult, GlobalProfile } from '@/store/personaStore';

// ==========================================================
// 型定義
// ==========================================================

export interface TotalAnalysis {
  /** 信頼度（診断数に基づく、0-100） */
  confidence: number;
  /** 信頼度ラベル */
  confidenceLabel: string;
  /** 完了した診断数 */
  completedCount: number;

  /**
   * Big Five プロファイル
   * 出典: Costa & McCrae (1992) - NEO Personality Inventory
   */
  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
    interpretation: string;
  };

  /**
   * 自己決定理論に基づく基本心理欲求
   * 出典: Deci & Ryan (2000) - Self-Determination Theory
   */
  selfDetermination: {
    autonomy: number;
    competence: number;
    relatedness: number;
    advice: string;
  };

  /**
   * VIA性格強み トップ5
   * 出典: Peterson & Seligman (2004) - Character Strengths and Virtues
   */
  characterStrengths: {
    name: string;
    score: number;
    description: string;
  }[];

  /**
   * 対人スタイル（愛着理論ベース）
   * 出典: Bowlby (1969), Hazan & Shaver (1987)
   */
  attachmentStyle: {
    type: string;
    description: string;
    advice: string;
  };

  /**
   * キャリアアンカー
   * 出典: Schein (1990) - Career Anchors
   */
  careerAnchor: {
    primary: string;
    secondary: string;
    description: string;
  };

  /**
   * 発達段階アドバイス（年齢考慮）
   * 出典: Erikson (1950) - Psychosocial Development
   */
  developmentalAdvice: string;

  /** 総合人格プロファイル（300-500文字の超具体的説明） */
  personalityProfile: string;

  /** 人生のアドバイス（3-5個） */
  lifeAdvice: {
    category: string;
    emoji: string;
    title: string;
    content: string;
    reference: string;
  }[];

  /** クロスリファレンス発見 */
  crossInsights: {
    relatedDiagnoses: string[];
    insight: string;
    significance: 'high' | 'medium' | 'low';
  }[];
}

// ==========================================================
// Big Five マッピングキーワード
// Costa & McCrae (1992) の5因子をdimensionLabelsからマッピング
// ==========================================================

/** 開放性に寄与するキーワード */
const OPENNESS_KEYWORDS = [
  '論理', '分析', '知', '研究', '知恵', '知略', '情報', '創造', '芸術',
  '想像', '好奇', '探求', '閃き', '直感', '発想', '独創', '美的', '革新',
  '言語', '空間', '音楽', '学習', '思考', '抽象', '哲学', '洞察', '知的',
];

/** 誠実性に寄与するキーワード */
const CONSCIENTIOUSNESS_KEYWORDS = [
  '忍耐', '計画', '責任', '規律', '集中', '努力', '自制', '慎重', '堅実',
  '管理', '組織', '継続', '誠実', '几帳面', '目標', '効率', '勤勉', '実行',
  '安定', '秩序', '冷静', '合理', '論理的思考', '現実',
];

/** 外向性に寄与するキーワード */
const EXTRAVERSION_KEYWORDS = [
  '対人', '共感', 'コミュ', '友情', '社会', '影響', 'リーダー', '社交',
  '情熱', '行動', '決断', '冒険', '勇気', '挑戦', '表現', '積極', '外向',
  '発信', '主導', 'カリスマ', '場', '明るさ', '活発', '会話', '雄弁',
];

/** 協調性に寄与するキーワード */
const AGREEABLENESS_KEYWORDS = [
  '共感', '協調', '奉仕', '優しさ', '思いやり', '親切', '献身', '信頼',
  '受容', '調和', '配慮', '寛容', '理解', '支援', 'サポート', '癒し',
  '傾聴', '包容', '温かさ', '繊細', '感受性', '利他', '共生', '絆',
];

/** 神経症傾向に寄与するキーワード（スコアの逆数がNeuroticism） */
const NEUROTICISM_REVERSE_KEYWORDS = [
  'ストレス耐性', '回復', 'メンタル', '精神力', '安定', '防御', '調整',
  '楽観', 'ポジティブ', '自信', '平常心', 'レジリエンス', '強靭', '安心',
];

// ==========================================================
// 自己決定理論（SDT）マッピングキーワード
// Deci & Ryan (2000)
// ==========================================================

/** 自律性に関連するキーワード */
const AUTONOMY_KEYWORDS = [
  '自由', '独立', '自律', '主体', 'マイペース', '自発', '選択', '裁量',
  '自己決定', '独創', '個性', '独自', '自立',
];

/** 有能感に関連するキーワード */
const COMPETENCE_KEYWORDS = [
  '能力', 'スキル', '成長', '達成', '上達', '習得', '専門', '熟達',
  '効率', '実績', '成果', '挑戦', '克服', '向上', '学習', '分析',
];

/** 関係性に関連するキーワード */
const RELATEDNESS_KEYWORDS = [
  '絆', 'つながり', '友情', '信頼', '協力', '仲間', '共感', '対人',
  '社交', 'コミュ', '支援', '共有', '所属', '一体感', 'チーム', '親密',
];

// ==========================================================
// VIA性格強み（24の強みから代表的なものを使用）
// Peterson & Seligman (2004)
// ==========================================================

interface VIAStrength {
  name: string;
  keywords: string[];
  description: string;
}

const VIA_STRENGTHS: VIAStrength[] = [
  { name: '創造性', keywords: ['創造', '発想', '独創', '芸術', '想像', '閃き', '表現', 'クリエイティブ'], description: '新しいアイデアを生み出し、独自の方法で問題を解決する力' },
  { name: '好奇心', keywords: ['好奇', '探求', '学習', '研究', '知識', '発見', '興味', '知的'], description: '世界のあらゆることに対する飽くなき興味と学ぶ意欲' },
  { name: '判断力', keywords: ['分析', '論理', '批判的思考', '判断', '冷静', '合理', '客観', '洞察'], description: '物事を多角的に考え、適切な判断を下す能力' },
  { name: '向学心', keywords: ['学習', '向上', '成長', '知恵', '習得', '読書', '勉強', '教養'], description: '新しい知識やスキルを積極的に学び続ける姿勢' },
  { name: '大局観', keywords: ['俯瞰', '大局', '全体', '長期', '戦略', '洞察', '本質', '哲学'], description: '物事の全体像を捉え、本質的な意味を見出す力' },
  { name: '勇敢さ', keywords: ['勇気', '挑戦', '決断', '冒険', '行動', '覚悟', '突破', '度胸'], description: '困難や恐怖に立ち向かい、信念を貫く強さ' },
  { name: '忍耐力', keywords: ['忍耐', '粘り', '継続', '持続', '根気', '不屈', '努力', '我慢'], description: '困難があっても諦めず、最後まで取り組み続ける力' },
  { name: '誠実さ', keywords: ['誠実', '正直', '責任', '信頼', '真面目', '約束', '倫理', '正義'], description: '嘘をつかず、自分の行動に責任を持つ姿勢' },
  { name: '活力', keywords: ['活発', '情熱', 'エネルギー', '活力', '元気', '積極', '前向き', '明るさ'], description: '何事にもエネルギッシュに取り組む生命力' },
  { name: '愛情', keywords: ['愛', '絆', '親密', '愛着', '献身', '温もり', '深い関係', '家族'], description: '深い人間関係を築き、愛情を惜しみなく注ぐ能力' },
  { name: '親切心', keywords: ['親切', '思いやり', '奉仕', '優しさ', '利他', '慈悲', 'ボランティア', '配慮'], description: '他者の幸福を願い、見返りを求めず行動する心' },
  { name: '社会的知性', keywords: ['空気', '対人', '社交', 'コミュ', '人間関係', '場の空気', '調和', '察する'], description: '人の感情や場の雰囲気を読み取り、適切に対応する能力' },
  { name: 'チームワーク', keywords: ['協力', 'チーム', '協調', '仲間', 'グループ', '団結', '連携', '役割'], description: 'チームの一員として責任を果たし、仲間と協力する力' },
  { name: '公平さ', keywords: ['公平', '平等', '正義', '公正', 'フェア', '差別', '均等', '中立'], description: '全ての人を公平に扱い、不正を許さない倫理観' },
  { name: 'リーダーシップ', keywords: ['リーダー', '統率', '主導', '指導', '影響', 'カリスマ', '導く', '率いる'], description: 'グループを効果的にまとめ、共通の目標に向かって導く力' },
  { name: '寛容さ', keywords: ['寛容', '許し', '受容', '包容', '器', '柔軟', '理解', '多様性'], description: '他者の過ちを許し、多様な価値観を受け入れる度量' },
  { name: '謙虚さ', keywords: ['謙虚', '控えめ', '素直', '謙遜', '学ぶ姿勢', '低姿勢', '聞く耳'], description: '自分の限界を知り、他者から学ぶ姿勢を持つ' },
  { name: '慎重さ', keywords: ['慎重', '慎重', '用心', 'リスク管理', '安全', '確認', '石橋', '計画'], description: 'リスクを適切に評価し、慎重に行動する知恵' },
  { name: '自律性', keywords: ['自制', 'セルフコントロール', '節制', '自律', '規律', '抑制', 'コントロール'], description: '感情や衝動を適切にコントロールし、自分を律する力' },
  { name: '審美眼', keywords: ['美', '芸術', '自然', '感動', '美的', '繊細', '芸術的', '感受性'], description: '美しいものや素晴らしいものに深く感動する感性' },
  { name: '感謝', keywords: ['感謝', 'ありがたい', '恵み', '幸せ', '日常', '当たり前', '感謝の心'], description: '日々の恵みに気づき、感謝の気持ちを持ち続ける姿勢' },
  { name: '希望', keywords: ['希望', '楽観', 'ポジティブ', '未来', '夢', '目標', '明るい', '前向き'], description: '未来に希望を持ち、前向きに進み続ける精神力' },
  { name: 'ユーモア', keywords: ['ユーモア', '笑い', '面白い', 'ジョーク', '遊び', '楽しさ', 'お笑い', 'ツッコミ'], description: '物事の面白い面を見つけ、笑いで人を癒す才能' },
  { name: '精神性', keywords: ['精神', '信仰', '意味', '使命', '魂', '神秘', 'スピリチュアル', '内省'], description: '人生の深い意味を追求し、精神的な充実を大切にする' },
];

// ==========================================================
// キャリアアンカー定義
// Schein (1990) - Career Anchors: Discovering Your Real Values
// ==========================================================

interface CareerAnchorDef {
  name: string;
  keywords: string[];
  description: string;
}

const CAREER_ANCHORS: CareerAnchorDef[] = [
  { name: '専門・職能別能力', keywords: ['専門', 'スキル', '技術', '熟達', '職人', '極める', '研究'], description: '特定の分野で専門性を極めることに価値を感じる' },
  { name: '経営管理能力', keywords: ['リーダー', '管理', '統率', '組織', '経営', '戦略', 'マネジメント'], description: '組織を率い、成果を最大化することにやりがいを感じる' },
  { name: '自律・独立', keywords: ['自由', '独立', '自律', 'マイペース', '自分の裁量', '束縛', '自立'], description: '自分のやり方・ペースで仕事を進めることを重視する' },
  { name: '安定・保障', keywords: ['安定', '安心', '保障', '確実', '堅実', 'リスク回避', '継続'], description: '経済的安定と生活の安定を最も大切にする' },
  { name: '起業家的創造性', keywords: ['創造', '起業', '新しい', '革新', 'チャレンジ', '発明', 'イノベーション'], description: '新しい事業やプロジェクトを立ち上げることに情熱を燃やす' },
  { name: '奉仕・社会貢献', keywords: ['奉仕', '社会貢献', '助ける', '支援', '利他', 'ボランティア', '教育'], description: '他者や社会のために役立つことに使命感を持つ' },
  { name: '純粋な挑戦', keywords: ['挑戦', '困難', '克服', '限界', '競争', '不可能', '突破'], description: '困難な課題を克服すること自体にやりがいを見出す' },
  { name: '生活様式', keywords: ['バランス', '生活', 'ワークライフ', '趣味', '家族', '調和', 'ゆとり'], description: '仕事と私生活のバランスを何より大切にする' },
];

// ==========================================================
// ユーティリティ関数
// ==========================================================

/**
 * キーワードマッチングスコアを計算する
 * dimensionLabels と traits からキーワードに合致する度合いを集計
 */
function calculateKeywordScore(
  results: Record<string, DiagnosisResult>,
  keywords: string[],
  invert: boolean = false
): number {
  let totalScore = 0;
  let totalWeight = 0;

  Object.values(results).forEach((r) => {
    // dimensionLabels とスコアから計算
    r.dimensionLabels.forEach((label, idx) => {
      const score = r.scores[idx] ?? 50;
      const match = keywords.some((kw) => label.includes(kw));
      if (match) {
        totalScore += invert ? (100 - score) : score;
        totalWeight += 1;
      }
    });

    // traits からも補助的にスコアを加算（traits はブール的なので固定値70を使用）
    r.typeTraits.forEach((trait) => {
      const match = keywords.some((kw) => trait.includes(kw));
      if (match) {
        totalScore += invert ? 30 : 70;
        totalWeight += 0.5;
      }
    });
  });

  if (totalWeight === 0) return 50; // データなしの場合は中央値
  return Math.max(0, Math.min(100, Math.round(totalScore / totalWeight)));
}

// ==========================================================
// メイン分析関数
// ==========================================================

/**
 * 信頼度を計算する
 * 診断を受ければ受けるほど精度が上がる仕組み
 */
export function calculateConfidence(completedCount: number, totalDiagnoses: number): number {
  // 最大22診断を想定（恋愛1 + 汎用20 + mbti128）
  if (completedCount <= 0) return 0;
  if (completedCount <= 3) return Math.round(20 + (completedCount / 3) * 15); // 20-35%
  if (completedCount <= 7) return Math.round(40 + ((completedCount - 4) / 4) * 15); // 40-55%
  if (completedCount <= 12) return Math.round(60 + ((completedCount - 8) / 5) * 15); // 60-75%
  if (completedCount <= 18) return Math.round(80 + ((completedCount - 13) / 6) * 10); // 80-90%
  return Math.round(91 + ((completedCount - 19) / 3) * 8); // 91-99%
}

/**
 * 信頼度ラベルを返す
 */
function getConfidenceLabel(confidence: number): string {
  if (confidence <= 35) return '初期段階';
  if (confidence <= 55) return '発展中';
  if (confidence <= 75) return '充実';
  if (confidence <= 90) return '高精度';
  return '超精密';
}

/**
 * Big Five プロファイルを計算する
 * Costa & McCrae (1992) - NEO-PI-R に基づく5因子モデル
 */
function calculateBigFive(results: Record<string, DiagnosisResult>): TotalAnalysis['bigFive'] {
  const openness = calculateKeywordScore(results, OPENNESS_KEYWORDS);
  const conscientiousness = calculateKeywordScore(results, CONSCIENTIOUSNESS_KEYWORDS);
  const extraversion = calculateKeywordScore(results, EXTRAVERSION_KEYWORDS);
  const agreeableness = calculateKeywordScore(results, AGREEABLENESS_KEYWORDS);
  const neuroticism = calculateKeywordScore(results, NEUROTICISM_REVERSE_KEYWORDS, true);

  // 解釈文を生成
  const traits: string[] = [];
  if (openness >= 65) traits.push('新しい体験や知的探求に対して非常にオープン');
  else if (openness <= 35) traits.push('現実的で実践的なアプローチを好む');

  if (conscientiousness >= 65) traits.push('計画的で責任感が強く自己管理能力が高い');
  else if (conscientiousness <= 35) traits.push('柔軟で臨機応変な対応が得意');

  if (extraversion >= 65) traits.push('社交的でエネルギッシュ、人との関わりからパワーを得る');
  else if (extraversion <= 35) traits.push('内省的で独りの時間を大切にする');

  if (agreeableness >= 65) traits.push('思いやりが深く、他者との協調を重視する');
  else if (agreeableness <= 35) traits.push('独立心が強く、自分の意見を貫く力がある');

  if (neuroticism >= 65) traits.push('感受性が豊かで、繊細な心の持ち主');
  else if (neuroticism <= 35) traits.push('情緒が安定していて、ストレスに強い');

  const interpretation = traits.length > 0
    ? `あなたは${traits.join('タイプです。また、')}タイプです。`
    : 'バランスの取れた性格特性を持っています。各特性が中程度で、状況に応じて柔軟に対応できる適応力があります。';

  return { openness, conscientiousness, extraversion, agreeableness, neuroticism, interpretation };
}

/**
 * 自己決定理論に基づく基本欲求を計算する
 * Deci & Ryan (2000)
 */
function calculateSDT(results: Record<string, DiagnosisResult>): TotalAnalysis['selfDetermination'] {
  const autonomy = calculateKeywordScore(results, AUTONOMY_KEYWORDS);
  const competence = calculateKeywordScore(results, COMPETENCE_KEYWORDS);
  const relatedness = calculateKeywordScore(results, RELATEDNESS_KEYWORDS);

  // 最も高い欲求に基づくアドバイス
  const max = Math.max(autonomy, competence, relatedness);
  let advice: string;

  if (max === autonomy) {
    advice = '自律性が高いあなたは、自分で選択し行動することで最も力を発揮します。縛られない環境を選ぶことが、あなたの幸福感の鍵です。ただし、周囲との連携も意識すると、自律性がさらに活きてきます。';
  } else if (max === competence) {
    advice = '有能感を重視するあなたは、スキルアップや達成感が原動力です。適度な挑戦を自分に与え続けることで、モチベーションが持続します。完璧を求めすぎず、成長の過程自体を楽しみましょう。';
  } else {
    advice = '関係性を重視するあなたは、信頼できる仲間との絆が幸福の源です。深い人間関係を築くことに時間を投資しましょう。ただし、自分の意見や欲求も大切にすることで、より健全な関係が育まれます。';
  }

  return { autonomy, competence, relatedness, advice };
}

/**
 * VIA性格強みトップ5を計算する
 * Peterson & Seligman (2004)
 */
function calculateCharacterStrengths(results: Record<string, DiagnosisResult>): TotalAnalysis['characterStrengths'] {
  const scored = VIA_STRENGTHS.map((strength) => ({
    name: strength.name,
    score: calculateKeywordScore(results, strength.keywords),
    description: strength.description,
  }));

  // スコア降順でソートしてトップ5を返す
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5);
}

/**
 * 愛着スタイルを推定する
 * Bowlby (1969), Hazan & Shaver (1987) の愛着理論に基づく
 */
function calculateAttachmentStyle(results: Record<string, DiagnosisResult>): TotalAnalysis['attachmentStyle'] {
  // 不安スコア（愛着不安）: 感情的な依存、不安傾向
  const anxietyKeywords = ['不安', '心配', '依存', '嫉妬', '執着', '見捨て', '愛着', '感情的'];
  const anxietyScore = calculateKeywordScore(results, anxietyKeywords);

  // 回避スコア（愛着回避）: 親密さの回避、独立への過度な固執
  const avoidanceKeywords = ['回避', '独立', '距離', '自由', '束縛', '一人', '壁', 'クール'];
  const avoidanceScore = calculateKeywordScore(results, avoidanceKeywords);

  // 安全スコア: 安定した対人関係
  const secureKeywords = ['信頼', '安心', '安定', '絆', '温もり', '支え', '開放', '素直'];
  const secureScore = calculateKeywordScore(results, secureKeywords);

  // 愛着スタイルの判定
  if (secureScore >= 60 && anxietyScore < 55 && avoidanceScore < 55) {
    return {
      type: '安全型',
      description: '安定した信頼関係を築くことができる愛着スタイルです。自分と他者の両方を信頼し、親密さと適度な距離感のバランスが取れています。',
      advice: '安全型の対人スタイルは、健全な人間関係の基盤です。この強みを活かして、周囲の人にも安心感を与えてあげてください。新しい関係にも積極的に踏み出せるでしょう。',
    };
  } else if (anxietyScore >= 55 && avoidanceScore < 55) {
    return {
      type: '不安型',
      description: '愛情を強く求め、関係への不安を感じやすい傾向があります。相手の反応に敏感で、深い愛情を注ぐ一方で、見捨てられることへの恐れも抱きやすいタイプです。',
      advice: '不安な気持ちは「もっと繋がりたい」というサインです。まずは自分自身への信頼（自己肯定感）を高めることが大切です。マインドフルネスや自分の感情を言語化する習慣が効果的です。',
    };
  } else if (avoidanceScore >= 55 && anxietyScore < 55) {
    return {
      type: '回避型',
      description: '親密な関係に距離を置きがちで、自立性を重視するスタイルです。感情表現が控えめで、一人の時間を大切にします。深い関係に入ることへの抵抗感を持つことがあります。',
      advice: '独立心はあなたの強みですが、親しい人には少しずつ感情を開示してみてください。「弱さを見せること」は信頼の証です。小さなステップから始めれば、関係が深まる喜びを実感できるはずです。',
    };
  } else {
    return {
      type: '混合型',
      description: '不安と回避の両方の傾向を併せ持つスタイルです。深い関係を求めながらも、同時に距離を取りたくなるという矛盾した感情を経験しやすいタイプです。',
      advice: '矛盾した感情を抱えることは珍しくありません。自分の感情パターンに気づくことが第一歩です。安心できる相手との小さな信頼体験を積み重ねることで、少しずつ安定した対人スタイルに近づいていけます。',
    };
  }
}

/**
 * キャリアアンカーを推定する
 * Schein (1990)
 */
function calculateCareerAnchor(results: Record<string, DiagnosisResult>): TotalAnalysis['careerAnchor'] {
  const scored = CAREER_ANCHORS.map((anchor) => ({
    name: anchor.name,
    score: calculateKeywordScore(results, anchor.keywords),
    description: anchor.description,
  }));

  scored.sort((a, b) => b.score - a.score);

  return {
    primary: scored[0].name,
    secondary: scored[1].name,
    description: `あなたの主要なキャリアアンカーは「${scored[0].name}」です。${scored[0].description}。次いで「${scored[1].name}」も強く、${scored[1].description.replace(/。$/, '')}傾向もあります。この2つを満たせる環境で、最も充実感を得られるでしょう。`,
  };
}

/**
 * エリクソンの発達段階に基づくアドバイス
 * Erikson (1950) - Childhood and Society
 */
function calculateDevelopmentalAdvice(age: number | null, bigFive: TotalAnalysis['bigFive']): string {
  if (age === null) {
    return '年齢情報が設定されていないため、発達段階に基づくアドバイスを生成できません。プロフィール設定から年齢を入力すると、エリクソンの発達理論に基づいた、あなたの人生段階に合ったアドバイスを受けることができます。';
  }

  if (age < 13) {
    return `${age}歳のあなたは「勤勉性 vs 劣等感」の発達段階にあります（Erikson, 1950）。この時期は、学校や習い事などで「自分はできる！」という自信を育てることが大切です。失敗しても大丈夫。挑戦すること自体があなたの成長に繋がっています。周りの大人や友達との関わりの中で、自分の得意なことを見つけていきましょう。`;
  }
  if (age < 20) {
    return `${age}歳のあなたは「アイデンティティ vs 役割の混乱」の発達段階にあります（Erikson, 1950）。「自分は何者か？」「何がしたいのか？」と悩む時期ですが、それは健全な成長の証です。${bigFive.openness >= 60 ? 'あなたの高い好奇心を活かして、さまざまな経験を積んでみてください。' : '焦らず、自分のペースで自分探しを続けてください。'}多くの人と出会い、多くのことを試す中で、少しずつ「本当の自分」が見えてきます。`;
  }
  if (age < 40) {
    return `${age}歳のあなたは「親密性 vs 孤立」の発達段階にあります（Erikson, 1950）。仕事やパートナーシップなど、他者と深い関係を築くことが主要な課題です。${bigFive.extraversion >= 60 ? 'あなたの社交性は大きな強みですが、表面的な関係に終わらず、本当に信頼できる少数の人との深い絆を大切にしてください。' : '一人の時間を大切にしつつ、心を開ける相手を見つけることが、この時期の成長の鍵になります。'}自分のアイデンティティを保ちながら、他者と融合していく経験が、人生を豊かにしてくれます。`;
  }
  if (age < 65) {
    return `${age}歳のあなたは「生殖性（ジェネラティビティ） vs 停滞」の発達段階にあります（Erikson, 1950）。次世代に何かを残す・伝えることが心理的な充実に繋がる時期です。${bigFive.agreeableness >= 60 ? 'あなたの思いやりの深さを活かして、後輩の育成やメンタリングに力を入れてみてください。' : '自分のスキルや経験を誰かに伝える機会を意識的に作ると、新しいやりがいが見つかるかもしれません。'}自分だけの成功ではなく、「自分がいたからこそ誰かが成長できた」という実感が、この時期の幸福の源です。`;
  }
  return `${age}歳のあなたは「自我の統合 vs 絶望」の発達段階にあります（Erikson, 1950）。これまでの人生を振り返り、「良い人生だった」と感じられることが心理的な健康に繋がります。完璧な人生など存在しません。あなたが経験してきたすべてのこと、成功も失敗も、全てがあなたを形作った大切なピースです。その豊かな経験と知恵を、次の世代に伝えてください。`;
}

/**
 * 総合人格プロファイルを生成する（300-500文字）
 */
function generatePersonalityProfile(
  bigFive: TotalAnalysis['bigFive'],
  sdt: TotalAnalysis['selfDetermination'],
  strengths: TotalAnalysis['characterStrengths'],
  attachment: TotalAnalysis['attachmentStyle'],
  results: Record<string, DiagnosisResult>
): string {
  const entries = Object.values(results);
  const allTraits = entries.flatMap((e) => e.typeTraits);
  const uniqueTraits = [...new Set(allTraits)].slice(0, 4);

  // 支配的なBig Five特性を特定
  const bf = bigFive;
  const bfScores = [
    { name: '開放性', val: bf.openness },
    { name: '誠実性', val: bf.conscientiousness },
    { name: '外向性', val: bf.extraversion },
    { name: '協調性', val: bf.agreeableness },
    { name: '感受性', val: bf.neuroticism },
  ];
  bfScores.sort((a, b) => b.val - a.val);

  const topBF = bfScores[0];
  const secondBF = bfScores[1];
  const lowBF = bfScores[bfScores.length - 1];

  // 支配的なSDT欲求を特定
  const sdtScores = [
    { name: '自律性', val: sdt.autonomy },
    { name: '有能感', val: sdt.competence },
    { name: '関係性', val: sdt.relatedness },
  ];
  sdtScores.sort((a, b) => b.val - a.val);

  let profile = '';

  // 冒頭: Big Five の最上位特性から
  profile += `あなたの人格を構成する最も際立った特徴は「${topBF.name}」の高さです。`;

  if (topBF.name === '開放性') {
    profile += '知的好奇心が旺盛で、新しいアイデアや経験に対して常にオープンな姿勢を持っています。';
  } else if (topBF.name === '誠実性') {
    profile += '責任感が強く、計画的に物事を進める堅実さがあなたの最大の武器です。';
  } else if (topBF.name === '外向性') {
    profile += '人との交流からエネルギーを得て、場を明るくする存在感があります。';
  } else if (topBF.name === '協調性') {
    profile += '他者への深い共感力と思いやりが、あなたの人間関係の質を高めています。';
  } else {
    profile += '繊細な感受性を持ち、他者が見過ごすような機微にも気づくことができます。';
  }

  // 中盤: SDT + 2番目のBig Five
  profile += `さらに「${secondBF.name}」も高水準で、この2つの組み合わせが独自の人格を形成しています。`;
  profile += `心理的欲求としては「${sdtScores[0].name}」が最も強く、`;

  if (sdtScores[0].name === '自律性') {
    profile += '自分の意志で選択し行動できる環境で最も力を発揮します。';
  } else if (sdtScores[0].name === '有能感') {
    profile += 'スキルの向上や目標の達成に大きな充実感を得ます。';
  } else {
    profile += '信頼できる仲間との深い絆が幸福の源になっています。';
  }

  // 強み
  const topStrengthNames = strengths.slice(0, 3).map((s) => s.name).join('・');
  profile += `性格の強みとしては「${topStrengthNames}」が特に顕著で、これらがあなたの行動や判断の基盤となっています。`;

  // 弱点（成長ポイント）
  profile += `一方で「${lowBF.name}」はやや控えめですが、これは弱点ではなく、あなたの個性の一部です。`;

  // 対人スタイル
  profile += `対人関係では${attachment.type}の傾向があり、`;
  if (attachment.type === '安全型') {
    profile += '安定した信頼関係を築く力があります。';
  } else if (attachment.type === '不安型') {
    profile += '深い愛情を注ぐ一方で相手の反応に敏感です。';
  } else if (attachment.type === '回避型') {
    profile += '自立を重視し適度な距離感を保つ傾向があります。';
  } else {
    profile += '状況に応じて異なる対人パターンを見せます。';
  }

  // 締め
  if (uniqueTraits.length > 0) {
    profile += `診断結果全体を通じて「${uniqueTraits.join('」「')}」といった特徴が一貫して現れており、これがあなただけの唯一無二の個性を形作っています。`;
  }

  return profile;
}

/**
 * 人生のアドバイスを生成する（3-5個）
 */
function generateLifeAdvice(
  bigFive: TotalAnalysis['bigFive'],
  sdt: TotalAnalysis['selfDetermination'],
  strengths: TotalAnalysis['characterStrengths'],
  attachment: TotalAnalysis['attachmentStyle'],
  careerAnchor: TotalAnalysis['careerAnchor']
): TotalAnalysis['lifeAdvice'] {
  const advice: TotalAnalysis['lifeAdvice'] = [];

  // 人間関係アドバイス（愛着理論ベース）
  if (attachment.type === '安全型') {
    advice.push({
      category: '人間関係',
      emoji: '\u{1F91D}',
      title: 'あなたの安定感を周囲にも広げて',
      content: '安全型の対人スタイルを持つあなたは、周囲の人に安心感を与える存在です。この強みを意識的に活かして、不安を抱える人の心の拠り所になってあげてください。信頼関係の輪が自然と広がっていくでしょう。',
      reference: '愛着理論 - Bowlby (1969), Hazan & Shaver (1987)',
    });
  } else {
    advice.push({
      category: '人間関係',
      emoji: '\u{1F91D}',
      title: '安全な関係を意識的に育てよう',
      content: `${attachment.type}の傾向があるあなたは、まず自分自身への信頼を高めることが大切です。「この人なら大丈夫」と思える少数の人との関係を丁寧に育てていくことで、徐々に安定した対人パターンが身についていきます。`,
      reference: '愛着理論 - Bowlby (1969), Hazan & Shaver (1987)',
    });
  }

  // キャリアアドバイス
  advice.push({
    category: 'キャリア',
    emoji: '\u{1F3AF}',
    title: `「${careerAnchor.primary}」を軸にしたキャリア設計を`,
    content: `あなたのキャリアアンカーは「${careerAnchor.primary}」です。転職や異動を考える際は、この価値観が満たされるかどうかを最優先の判断基準にしてください。${careerAnchor.secondary}の要素も取り入れられると、より充実した仕事人生になります。`,
    reference: 'キャリアアンカー理論 - Schein (1990)',
  });

  // 自己成長アドバイス（Big Five + SDT）
  const growthFocus = bigFive.openness >= 60 ? '知的探求' : bigFive.conscientiousness >= 60 ? '計画的な実行' : '新しい体験';
  advice.push({
    category: '自己成長',
    emoji: '\u{1F331}',
    title: `${growthFocus}を通じた成長を続けよう`,
    content: `あなたの性格特性と基本心理欲求から見て、${growthFocus}が最も効率的な成長ルートです。${sdt.autonomy >= 60 ? '自分で目標を設定し、自分のペースで進めることで' : sdt.competence >= 60 ? '小さな達成を積み重ねることで' : '仲間と一緒に取り組むことで'}、持続的な成長が可能になります。`,
    reference: 'Big Five モデル - Costa & McCrae (1992) / 自己決定理論 - Deci & Ryan (2000)',
  });

  // メンタルヘルスアドバイス
  if (bigFive.neuroticism >= 55) {
    advice.push({
      category: 'メンタルヘルス',
      emoji: '\u{1F9D8}',
      title: '繊細さは才能、でもケアも忘れずに',
      content: '感受性が高いあなたは、他者の痛みに共感できる素晴らしい能力を持っています。ただし、自分のケアを後回しにしがちです。定期的な「心の充電時間」を設けて、マインドフルネスや深呼吸の習慣を取り入れてみてください。',
      reference: 'Big Five モデル - Costa & McCrae (1992)',
    });
  } else {
    advice.push({
      category: 'メンタルヘルス',
      emoji: '\u{1F9D8}',
      title: 'メンタルの安定を維持する習慣を',
      content: 'ストレスに強いあなたですが、無理が蓄積すると気づかないうちに限界を超えることも。定期的に自分の心身の状態を振り返る時間を持ちましょう。日記やセルフチェックが効果的です。',
      reference: 'Big Five モデル - Costa & McCrae (1992)',
    });
  }

  // 創造性アドバイス（上位強みに基づく）
  const topStrength = strengths[0];
  advice.push({
    category: '創造性',
    emoji: '\u{2728}',
    title: `「${topStrength.name}」を最大限に活かそう`,
    content: `あなたの最も際立った性格の強みは「${topStrength.name}」です。${topStrength.description}。この強みを日常生活や仕事で意識的に発揮することで、フロー状態（没頭・充実感）に入りやすくなり、幸福感が高まります。`,
    reference: 'VIA性格強み - Peterson & Seligman (2004)',
  });

  return advice;
}

/**
 * クロスリファレンス発見を生成する
 * 複数の診断結果の相関から洞察を抽出
 */
function generateCrossInsights(results: Record<string, DiagnosisResult>): TotalAnalysis['crossInsights'] {
  const insights: TotalAnalysis['crossInsights'] = [];
  const entries = Object.values(results);

  if (entries.length < 2) return insights;

  // 各診断結果のtraitsを比較して共通パターンを見つける
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const a = entries[i];
      const b = entries[j];

      // 共通するtraitsを探す
      const commonTraits = a.typeTraits.filter((trait) =>
        b.typeTraits.some((bt) => {
          // 部分一致でも許容（「創造」と「創造力が高い」など）
          const keywords = trait.split(/[がのをはにで、。]/);
          return keywords.some((kw) => kw.length >= 2 && bt.includes(kw));
        })
      );

      if (commonTraits.length >= 1) {
        const traitText = commonTraits.slice(0, 2).join('」「');
        insights.push({
          relatedDiagnoses: [a.diagnosisId, b.diagnosisId],
          insight: `${a.diagnosisTitle}と${b.diagnosisTitle}の両方で「${traitText}」に関連する特徴が確認されました。これは偶然ではなく、あなたの根源的な性格特性が異なる角度から一貫して表れていることを示しています。`,
          significance: commonTraits.length >= 2 ? 'high' : 'medium',
        });
      }
    }
  }

  // 高スコアの次元が複数の診断で一致するかチェック
  const highScoreDimensions: Record<string, string[]> = {};
  entries.forEach((entry) => {
    entry.dimensionLabels.forEach((label, idx) => {
      const score = entry.scores[idx] ?? 50;
      if (score >= 70) {
        if (!highScoreDimensions[label]) highScoreDimensions[label] = [];
        highScoreDimensions[label].push(entry.diagnosisId);
      }
    });
  });

  Object.entries(highScoreDimensions).forEach(([label, diagIds]) => {
    if (diagIds.length >= 2) {
      insights.push({
        relatedDiagnoses: diagIds,
        insight: `「${label}」の項目が${diagIds.length}つの診断で高スコアを記録しています。これはあなたの確固たる強みであり、この分野でのさらなる成長が期待できます。`,
        significance: diagIds.length >= 3 ? 'high' : 'medium',
      });
    }
  });

  // 低スコアの一致も確認（成長ポイントとして）
  const lowScoreDimensions: Record<string, string[]> = {};
  entries.forEach((entry) => {
    entry.dimensionLabels.forEach((label, idx) => {
      const score = entry.scores[idx] ?? 50;
      if (score <= 30) {
        if (!lowScoreDimensions[label]) lowScoreDimensions[label] = [];
        lowScoreDimensions[label].push(entry.diagnosisId);
      }
    });
  });

  Object.entries(lowScoreDimensions).forEach(([label, diagIds]) => {
    if (diagIds.length >= 2) {
      insights.push({
        relatedDiagnoses: diagIds,
        insight: `「${label}」が複数の診断で控えめな結果でした。これは弱点ではなく、あなたのエネルギーが他の強みに集中している証拠です。必要に応じて意識的に伸ばすことも可能です。`,
        significance: 'low',
      });
    }
  });

  // 重複を除去して最大8個に制限、significance順でソート
  const significanceOrder = { high: 0, medium: 1, low: 2 };
  insights.sort((a, b) => significanceOrder[a.significance] - significanceOrder[b.significance]);
  return insights.slice(0, 8);
}

// ==========================================================
// メインエクスポート関数
// ==========================================================

/**
 * 統合パーソナリティ分析を実行する
 *
 * 全診断結果を横断的にクロスリファレンスし、
 * 6つの心理学フレームワークに基づいた包括的な人格分析を生成する。
 */
export function generateTotalAnalysis(
  results: Record<string, DiagnosisResult>,
  profile: GlobalProfile
): TotalAnalysis {
  const completedCount = Object.keys(results).length;
  // 全診断数: 恋愛(1) + 汎用(11) + 新規2 = 合計14想定
  const totalDiagnoses = 14;
  const confidence = calculateConfidence(completedCount, totalDiagnoses);
  const confidenceLabel = getConfidenceLabel(confidence);

  // 各理論に基づく分析を実行
  const bigFive = calculateBigFive(results);
  const selfDetermination = calculateSDT(results);
  const characterStrengths = calculateCharacterStrengths(results);
  const attachmentStyle = calculateAttachmentStyle(results);
  const careerAnchor = calculateCareerAnchor(results);
  const developmentalAdvice = calculateDevelopmentalAdvice(profile.age, bigFive);
  const personalityProfile = generatePersonalityProfile(bigFive, selfDetermination, characterStrengths, attachmentStyle, results);
  const lifeAdvice = generateLifeAdvice(bigFive, selfDetermination, characterStrengths, attachmentStyle, careerAnchor);
  const crossInsights = generateCrossInsights(results);

  return {
    confidence,
    confidenceLabel,
    completedCount,
    bigFive,
    selfDetermination,
    characterStrengths,
    attachmentStyle,
    careerAnchor,
    developmentalAdvice,
    personalityProfile,
    lifeAdvice,
    crossInsights,
  };
}
