/**
 * ペルソナエンジン
 *
 * 全診断結果を統合して、その人だけのユニークなペルソナカードを生成する。
 * 診断の組み合わせによって称号・特性・レアリティが全て変わる。
 */

import type { DiagnosisResult } from '@/store/personaStore';

// --- ペルソナ称号生成システム ---

/** 修飾語（前半）：各診断タイプの特徴から選出 */
const ADJECTIVES: Record<string, string[]> = {
  // 恋愛系
  EROS: ['情熱の', '炎の'], STORGE: ['温もりの', '信頼の'], PRAGMA: ['賢明な', '堅実な'],
  AGAPE: ['慈愛の', '献身の'], MANIA: ['激情の', '嵐の'], LUDUS: ['自由な', '風の'],
  GROWTH: ['成長する', '進化の'], AVOIDANT: ['孤高の', '独立の'],
  COMPLEMENT: ['調和の', '共鳴の'], IDEALIST: ['理想の', '夢見る'],
  SECURE: ['安らぎの', '守護の'], INTELLECTUAL: ['知の', '深淵の'],

  // 才能系 - 代表的なキーワード
  LINGUIST: ['言霊の', '物語る'], LOGICIAN: ['論理の', '解析する'],
  SPATIAL: ['空間を操る', '次元の'], KINESTHETIC: ['躍動する', '肉体の'],
  MUSICAL: ['旋律の', '響きわたる'], INTERPERSONAL: ['心を繋ぐ', '共感の'],
  INTRAPERSONAL: ['内省する', '瞑想の'],

  // 守護精霊系
  PHOENIX: ['蒼炎の', '不死鳥の'], UNICORN: ['月光の', '聖なる'],
  DRAGON: ['深森の', '太古の'], WHALE: ['星海の', '悠久の'],
  WOLF: ['銀月の', '群れ率いる'], OWL: ['夜明けの', '全知の'],

  // 異世界系
  HERO: ['覚醒した', '聖剣の'], MAGE: ['禁書の', '大魔道の'],
  ASSASSIN: ['影の', '闇を纏う'], PALADIN: ['光輝の', '正義の'],
  ALCHEMIST: ['万能の', '錬成の'], HEALER: ['癒しの', '白き'],

  // メンタル系
  DIAMOND: ['ダイヤの', '不壊の'], FLEXIBLE: ['しなやかな', '柔の'],
  IRON: ['鉄の', '不屈の'], SUNSHINE: ['陽だまりの', '暖かき'],
  STILLWATER: ['静水の', '凪の'], LIGHTHOUSE: ['灯台の', '導く'],

  // コミュ力系
  MOOD_MAKER: ['場を照らす', '笑顔の'], CHARISMA: ['カリスマの', '統率する'],
  LISTENER: ['癒す', '寄り添う'], TSUKKOMI: ['切り返す', '鋭い'],

  // 推し活系
  EVANGELIST: ['布教する', '伝道の'], HARDCORE: ['極めし', '究極の'],
  ANALYST: ['考察する', '洞察の'], COLLECTOR: ['蒐集する', '宝の'],

  // 裏キャラ系
  SMILE_RULER: ['微笑む', '支配する'], ANGEL_SCHEMER: ['天使の', '策略の'],
  DARK_HERO: ['闇の', '孤高の'], POISON_TONGUE: ['毒舌の', '辛辣な'],

  // SNS系
  BUZZ_GENIUS: ['バズる', '話題の'], ROM_OBSERVER: ['静観する', '見通す'],
  STORY_ARTIST: ['映える', '彩る'],

  // 前世系
  PRIEST: ['神秘の', '古代の'], KNIGHT: ['騎士道の', '中世の'],
  POET: ['歌詠む', '風雅の'], PIRATE: ['海原の', '冒険の'],
  PHILOSOPHER: ['哲学する', '思索の'], PAINTER: ['描き出す', '芸術の'],
  NINJA: ['忍ぶ', '影走る'],
};

/** 称号名詞（後半）：組み合わせの本質を表す */
const NOUNS: string[] = [
  '策略家', '革命家', '詩人', '探求者', '守護者', '創造主',
  '冒険者', '預言者', '錬金術師', '夢想家', '征服者', '調停者',
  '賢者', '戦士', '芸術家', '導き手', '異端児', '求道者',
  '覚醒者', '統率者', '隠者', '解放者', '観測者', '変革者',
  '魔法使い', '守り人', '旅人', '司令官', '織り手', '架け橋',
];

/**
 * 診断結果の組み合わせからユニークな称号を生成
 * ハッシュベースで同じ組み合わせなら同じ称号が出る
 */
export function generatePersonaTitle(results: Record<string, DiagnosisResult>): string {
  const typeIds = Object.values(results)
    .sort((a, b) => a.diagnosisId.localeCompare(b.diagnosisId))
    .map((r) => r.typeId);

  if (typeIds.length === 0) return '未知の旅人';

  // ハッシュ値を計算（組み合わせごとに一意）
  const hash = typeIds.join('|');
  let hashNum = 0;
  for (let i = 0; i < hash.length; i++) {
    hashNum = (hashNum * 31 + hash.charCodeAt(i)) & 0x7fffffff;
  }

  // 修飾語を選択（最初の診断結果のタイプIDから）
  const firstTypeId = typeIds[0];
  const adjList = ADJECTIVES[firstTypeId] || ['覚醒の', '未知の'];
  const adj = adjList[hashNum % adjList.length];

  // 名詞を選択（全タイプのハッシュから）
  const noun = NOUNS[(hashNum >> 8) % NOUNS.length];

  return `${adj}${noun}`;
}

/**
 * ペルソナの英語サブタイトルを生成
 */
export function generatePersonaSubtitle(results: Record<string, DiagnosisResult>): string {
  const count = Object.keys(results).length;
  if (count === 0) return 'Unknown Traveler';

  const typeIds = Object.values(results)
    .sort((a, b) => a.diagnosisId.localeCompare(b.diagnosisId))
    .map((r) => r.typeId);

  const hash = typeIds.join('|');
  let hashNum = 0;
  for (let i = 0; i < hash.length; i++) {
    hashNum = (hashNum * 31 + hash.charCodeAt(i)) & 0x7fffffff;
  }

  const subtitles = [
    'The Awakened One', 'Soul Architect', 'Dream Weaver', 'Chaos Conductor',
    'Silent Storm', 'Eternal Seeker', 'Light Bringer', 'Shadow Walker',
    'Star Gazer', 'Mind Sculptor', 'Heart Alchemist', 'Fate Reader',
    'Dimension Shifter', 'Crystal Soul', 'Flame Bearer', 'Void Dancer',
    'Thunder Spirit', 'Moon Child', 'Sun Warrior', 'Time Keeper',
  ];

  return subtitles[hashNum % subtitles.length];
}

/**
 * 全診断結果から統合キーワード（特性タグ）を抽出
 */
export function extractPersonaKeywords(results: Record<string, DiagnosisResult>): string[] {
  const allTraits: string[] = [];

  Object.values(results).forEach((r) => {
    allTraits.push(...r.typeTraits);
  });

  // 重複除去して最大12個
  const unique = [...new Set(allTraits)];
  return unique.slice(0, 12);
}

/**
 * 統合ステータス（6軸レーダーチャート用）を算出
 * 全診断のスコアを6つの基本軸に集約する
 */
export interface PersonaStats {
  labels: string[];
  values: number[];
  colors: string[];
}

const PERSONA_AXES = [
  { label: '知性', color: '#A0C8FF', keywords: ['論理', '知', '分析', '研究', '知恵', '知略', '情報'] },
  { label: '感性', color: '#FF6BE8', keywords: ['感情', '芸術', '創造', '音楽', '表現', '美', '神秘'] },
  { label: '行動力', color: '#FFD700', keywords: ['攻撃', '決断', '冒険', '行動', '勇気', '戦闘', '身体'] },
  { label: '社交性', color: '#2ECC71', keywords: ['対人', '共感', 'コミュ', '友情', '社会', '影響', 'リーダー'] },
  { label: '精神力', color: '#9B59B6', keywords: ['回復', '忍耐', '粘り', 'メンタル', '防御', '安定', '調整'] },
  { label: '直感力', color: '#FF6B35', keywords: ['直感', '運', '自由', '生命', '閃き', '第六感', '霊'] },
];

export function calculatePersonaStats(results: Record<string, DiagnosisResult>): PersonaStats {
  const values = PERSONA_AXES.map(() => 0);
  const counts = PERSONA_AXES.map(() => 0);

  Object.values(results).forEach((r) => {
    r.dimensionLabels.forEach((label, dimIdx) => {
      const score = r.scores[dimIdx] ?? 50;

      // 各ペルソナ軸との関連度をチェック
      PERSONA_AXES.forEach((axis, axisIdx) => {
        const relevance = axis.keywords.some((kw) => label.includes(kw)) ? 1 : 0.1;
        values[axisIdx] += score * relevance;
        counts[axisIdx] += relevance;
      });
    });
  });

  // 正規化（0-100）
  const normalized = values.map((v, i) => {
    if (counts[i] === 0) return 50;
    return Math.max(0, Math.min(100, Math.round(v / counts[i])));
  });

  return {
    labels: PERSONA_AXES.map((a) => a.label),
    values: normalized,
    colors: PERSONA_AXES.map((a) => a.color),
  };
}

/**
 * レアリティスコアを計算（完了診断数 + 組み合わせの希少性）
 */
export function calculateRarity(results: Record<string, DiagnosisResult>): {
  stars: number;
  label: string;
  percentage: string;
} {
  const count = Object.keys(results).length;

  if (count <= 2) return { stars: 1, label: 'コモン', percentage: '30.0%' };
  if (count <= 5) return { stars: 2, label: 'アンコモン', percentage: '12.5%' };
  if (count <= 8) return { stars: 3, label: 'レア', percentage: '4.2%' };
  if (count <= 12) return { stars: 4, label: 'エピック', percentage: '1.1%' };
  if (count <= 16) return { stars: 5, label: 'レジェンダリー', percentage: '0.3%' };
  return { stars: 6, label: 'ミシカル', percentage: '0.01%' };
}

/**
 * ペルソナのテーマカラーを組み合わせから生成
 */
export function generatePersonaColors(results: Record<string, DiagnosisResult>): {
  primary: string;
  secondary: string;
  accent: string;
} {
  const colors = Object.values(results).map((r) => r.typeColor);

  if (colors.length === 0) {
    return { primary: '#FF6BE8', secondary: '#C45AFF', accent: '#7B5CFF' };
  }

  // 最初の3色を使用（不足分はデフォルト）
  return {
    primary: colors[0] || '#FF6BE8',
    secondary: colors[1] || colors[0] || '#C45AFF',
    accent: colors[2] || colors[1] || '#7B5CFF',
  };
}

/**
 * ペルソナの性格解説文を生成（組み合わせごとに異なる）
 */
export function generatePersonaDescription(results: Record<string, DiagnosisResult>): string {
  const entries = Object.values(results).sort((a, b) =>
    a.diagnosisId.localeCompare(b.diagnosisId)
  );

  if (entries.length === 0) return 'まだ診断を受けていません。';
  if (entries.length === 1) {
    return `あなたは「${entries[0].typeName}」タイプ。もっと多くの診断を受けることで、より深い自己分析が可能になります。`;
  }

  // 複数の診断結果から総合的な性格文を生成
  const typeNames = entries.map((e) => e.typeName);
  const allTraits = entries.flatMap((e) => e.typeTraits);
  const uniqueTraits = [...new Set(allTraits)].slice(0, 6);

  const stats = calculatePersonaStats(results);
  const topStat = stats.labels[stats.values.indexOf(Math.max(...stats.values))];
  const lowStat = stats.labels[stats.values.indexOf(Math.min(...stats.values))];

  let desc = '';

  // 冒頭（トップの特徴に基づく）
  if (topStat === '知性') {
    desc += '鋭い知性と分析力を持つあなたは、物事の本質を見抜く力があります。';
  } else if (topStat === '感性') {
    desc += '豊かな感性と創造力を持つあなたは、世界を独自の視点で彩ります。';
  } else if (topStat === '行動力') {
    desc += '圧倒的な行動力を持つあなたは、決断と実行の速さで周囲を驚かせます。';
  } else if (topStat === '社交性') {
    desc += '人を惹きつける社交性を持つあなたは、どんな場でも中心にいます。';
  } else if (topStat === '精神力') {
    desc += '強靭な精神力を持つあなたは、どんな逆境でも折れない芯を持っています。';
  } else {
    desc += '鋭い直感力を持つあなたは、言葉にできない何かを感じ取る力があります。';
  }

  // 中盤（診断の組み合わせ）
  if (entries.length >= 3) {
    desc += ` ${entries.length}つの診断結果を総合すると、「${uniqueTraits.slice(0, 3).join('」「')}」という特徴が際立っています。`;
  }

  // 弱点
  desc += ` 一方で${lowStat}はやや控えめ。`;

  // 締め
  desc += `この独自の組み合わせは、あなただけの特別な個性です。`;

  return desc;
}
