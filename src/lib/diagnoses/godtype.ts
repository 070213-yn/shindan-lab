/**
 * あなたが神なら何の神？診断
 *
 * 世界中の神話に登場する神々から、あなたがどの「神格」を持っているかを診断。
 * エンタメ寄り、神話ロマンたっぷりの診断。
 *
 * 理論基盤:
 *   - Jung, C.G. (1959) 元型理論 — 神話的元型と個人の性格特性の対応
 *   - Campbell, J. (1949) "The Hero with a Thousand Faces" — 英雄の千の顔
 *   - Eliade, M. (1957) "The Sacred and the Profane" — 聖と俗
 *   - 比較神話学 x パーソナリティ心理学 x エンターテインメント
 *
 * 8次元: 権威, 知恵, 創造, 破壊, 慈愛, 自然, 美, 運命
 * 35問（7セクション x 5問）、150+タイプ
 */

import type { DiagnosisConfig } from '../diagnosticTypes';
import { GODTYPE_GREEK } from './godtype-types-greek';
import { GODTYPE_NORSE } from './godtype-types-norse';
import { GODTYPE_JAPANESE } from './godtype-types-japanese';
import { GODTYPE_EGYPTIAN } from './godtype-types-egyptian';
import { GODTYPE_HINDU } from './godtype-types-hindu';
import { GODTYPE_CELTIC } from './godtype-types-celtic';
import { GODTYPE_OTHER } from './godtype-types-other';

// 7ファイルに分割された150+タイプを統合
const allTypes = [
  ...GODTYPE_GREEK,
  ...GODTYPE_NORSE,
  ...GODTYPE_JAPANESE,
  ...GODTYPE_EGYPTIAN,
  ...GODTYPE_HINDU,
  ...GODTYPE_CELTIC,
  ...GODTYPE_OTHER,
];

export const godtypeDiagnosis: DiagnosisConfig = {
  id: 'godtype',
  title: 'あなたが神なら何の神？',
  subtitle: '世界中の神話からあなたの神格を診断',
  catchphrase: 'もしあなたが神だったら？ 150柱の神々があなたの本質を映し出す',
  description:
    'もしあなたが神だったら？ ギリシャ、北欧、日本、エジプト…世界中の神話からあなたの神格を診断します。8つの神性次元と35の質問で、150を超える神々の中からあなたに最もふさわしい神格を特定。あなたの中に眠る「神の資質」を解き明かしましょう。',
  emoji: '⚡',
  themeColor: '#D4AF37',
  gradientFrom: '#D4AF37',
  gradientTo: '#8B6914',

  // --- プロフィール入力 ---
  profileFields: [
    {
      id: 'gender',
      label: '性別',
      type: 'select',
      options: [
        { value: 'male', label: '男性', emoji: '👦' },
        { value: 'female', label: '女性', emoji: '👧' },
        { value: 'other', label: 'その他・答えたくない', emoji: '🌈' },
      ],
    },
    {
      id: 'age',
      label: '年齢',
      type: 'slider',
      min: 10,
      max: 70,
      defaultValue: 25,
      unit: '歳',
    },
  ],

  // --- 8次元スコアリング ---
  // 0: 権威, 1: 知恵, 2: 創造, 3: 破壊, 4: 慈愛, 5: 自然, 6: 美, 7: 運命
  dimensions: [
    { key: 'authority',   label: '権威',   color: '#FFD700' },
    { key: 'wisdom',      label: '知恵',   color: '#4682B4' },
    { key: 'creation',    label: '創造',   color: '#DA70D6' },
    { key: 'destruction', label: '破壊',   color: '#DC143C' },
    { key: 'compassion',  label: '慈愛',   color: '#3CB371' },
    { key: 'nature',      label: '自然',   color: '#228B22' },
    { key: 'beauty',      label: '美',     color: '#FF69B4' },
    { key: 'fate',        label: '運命',   color: '#9370DB' },
  ],

  // --- セクション（7セクション）---
  sections: {
    1: '神の朝ごはん',
    2: '神の怒り方',
    3: '神のSNS',
    4: '神の推し活',
    5: '神の休日',
    6: '神の裁き',
    7: '神のラスボス戦',
  },

  // --- 質問データ（35問、7セクション x 5問） ---
  // weights: [権威, 知恵, 創造, 破壊, 慈愛, 自然, 美, 運命]
  questions: [
    // ===== セクション1: 神の朝ごはん（日常の選択） =====
    {
      sid: 1,
      sectionName: '神の朝ごはん',
      emoji: '🍳',
      text: '朝起きて一番にすることは？',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [2, 1, 1, 0, 1, 1, 1, 1],
    },
    {
      sid: 1,
      sectionName: '神の朝ごはん',
      emoji: '☕',
      text: '「今日の運勢最悪」と出たらどうする？',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [0, 1, 0, 1, 0, 0, 0, 3],
    },
    {
      sid: 1,
      sectionName: '神の朝ごはん',
      emoji: '🪞',
      text: '鏡に映った自分を見て「イケてる」と思う頻度は？',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [1, 0, 0, 0, 0, 0, 3, 1],
    },
    {
      sid: 1,
      sectionName: '神の朝ごはん',
      emoji: '🐦',
      text: '通勤・通学中に猫や鳥を見かけると、つい話しかけたくなる',
      source: 'Jung, C.G. (1964). Man and His Symbols.',
      weights: [0, 0, 1, 0, 2, 3, 0, 0],
    },
    {
      sid: 1,
      sectionName: '神の朝ごはん',
      emoji: '📱',
      text: '朝のニュースで世界の問題を見ると「自分がなんとかしたい」と思う',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [3, 1, 0, 0, 2, 0, 0, 1],
    },

    // ===== セクション2: 神の怒り方（感情・対立） =====
    {
      sid: 2,
      sectionName: '神の怒り方',
      emoji: '😤',
      text: '怒ったとき、周りの空気が変わると言われたことがある',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [3, 0, 0, 2, 0, 1, 0, 1],
    },
    {
      sid: 2,
      sectionName: '神の怒り方',
      emoji: '🌩️',
      text: '天気を操れるなら、嫌いな人の頭上だけ雨を降らせたい',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [1, 0, 1, 3, 0, 2, 0, 1],
    },
    {
      sid: 2,
      sectionName: '神の怒り方',
      emoji: '🧊',
      text: '怒りは爆発させるより、冷たく静かにキレるほうが自分らしい',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [2, 2, 0, 1, 0, 0, 0, 2],
    },
    {
      sid: 2,
      sectionName: '神の怒り方',
      emoji: '🤗',
      text: '相手が怒っているとき、自分まで怒るより「なだめたい」と思う',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [0, 0, 0, -1, 3, 0, 1, 0],
    },
    {
      sid: 2,
      sectionName: '神の怒り方',
      emoji: '💥',
      text: '理不尽なことをされたら、倍返しにしないと気が済まない',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [1, 0, 0, 4, 0, 0, 0, 1],
    },

    // ===== セクション3: 神のSNS（自己表現・承認欲求） =====
    {
      sid: 3,
      sectionName: '神のSNS',
      emoji: '📸',
      text: '自分の作品や成果を世界に発信したい欲求がある',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [1, 0, 3, 0, 0, 0, 2, 0],
    },
    {
      sid: 3,
      sectionName: '神のSNS',
      emoji: '👑',
      text: '「お前が神か！」と言われたら、正直ちょっと嬉しい',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [3, 0, 0, 0, 0, 0, 1, 2],
    },
    {
      sid: 3,
      sectionName: '神のSNS',
      emoji: '🎭',
      text: 'SNSの自分とリアルの自分は、けっこう違う',
      source: 'Jung, C.G. (1964). Man and His Symbols.',
      weights: [0, 1, 2, 0, 0, 0, 2, 2],
    },
    {
      sid: 3,
      sectionName: '神のSNS',
      emoji: '🔮',
      text: '誰にも理解されなくても、自分の信じる道を進む覚悟がある',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [2, 2, 1, 0, 0, 0, 0, 3],
    },
    {
      sid: 3,
      sectionName: '神のSNS',
      emoji: '✨',
      text: '美しいものを見ると、涙が出そうになることがある',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [0, 0, 2, 0, 1, 1, 3, 1],
    },

    // ===== セクション4: 神の推し活（情熱・こだわり） =====
    {
      sid: 4,
      sectionName: '神の推し活',
      emoji: '🔥',
      text: 'ハマったら寝食を忘れてのめり込むほうだ',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [0, 1, 3, 1, 0, 0, 0, 2],
    },
    {
      sid: 4,
      sectionName: '神の推し活',
      emoji: '📚',
      text: '一つのテーマについて深掘りするのが好き（Wikiの沼にハマるなど）',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [0, 3, 1, 0, 0, 0, 0, 2],
    },
    {
      sid: 4,
      sectionName: '神の推し活',
      emoji: '🎨',
      text: '「推し」のためならお金と時間を惜しまない',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [0, 0, 1, 1, 2, 0, 2, 0],
    },
    {
      sid: 4,
      sectionName: '神の推し活',
      emoji: '🌍',
      text: '異文化の神話や伝説に強い興味がある',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [0, 2, 2, 0, 0, 1, 1, 2],
    },
    {
      sid: 4,
      sectionName: '神の推し活',
      emoji: '⚡',
      text: '「これだけは譲れない」というこだわりポイントがある',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [2, 1, 2, 1, 0, 0, 1, 1],
    },

    // ===== セクション5: 神の休日（リラックス・価値観） =====
    {
      sid: 5,
      sectionName: '神の休日',
      emoji: '🏔️',
      text: '休みの日は自然の中で過ごしたい（山・海・森など）',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [0, 0, 0, 0, 1, 4, 1, 0],
    },
    {
      sid: 5,
      sectionName: '神の休日',
      emoji: '🎶',
      text: '音楽や芸術に触れているとき、「生きてる」と感じる',
      source: 'Jung, C.G. (1964). Man and His Symbols.',
      weights: [0, 0, 3, 0, 0, 0, 3, 1],
    },
    {
      sid: 5,
      sectionName: '神の休日',
      emoji: '🍕',
      text: '一人で過ごすより、誰かと一緒にいるほうが好き',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [1, 0, 0, 0, 2, 0, 1, 0],
    },
    {
      sid: 5,
      sectionName: '神の休日',
      emoji: '🧘',
      text: '瞑想やヨガなど、精神的な修行に興味がある',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [0, 3, 0, 0, 1, 1, 0, 3],
    },
    {
      sid: 5,
      sectionName: '神の休日',
      emoji: '🛋️',
      text: '「何もしない贅沢」を心の底から楽しめる',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [0, 0, 0, -1, 2, 2, 1, 0],
    },

    // ===== セクション6: 神の裁き（正義感・道徳） =====
    {
      sid: 6,
      sectionName: '神の裁き',
      emoji: '⚖️',
      text: 'ルールを破った人は、理由があっても罰するべきだ',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [3, 1, 0, 1, 0, 0, 0, 2],
    },
    {
      sid: 6,
      sectionName: '神の裁き',
      emoji: '🤝',
      text: '正義より「みんなが幸せになる方法」を考えたい',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [0, 1, 1, -1, 4, 0, 0, 0],
    },
    {
      sid: 6,
      sectionName: '神の裁き',
      emoji: '🦸',
      text: 'クラスで一番偉いのは？と聞かれたら内心「自分だな」と思う',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [4, 0, 0, 0, 0, 0, 0, 1],
    },
    {
      sid: 6,
      sectionName: '神の裁き',
      emoji: '🌙',
      text: '「運命」や「宿命」という言葉にロマンを感じる',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [0, 1, 1, 0, 0, 0, 2, 4],
    },
    {
      sid: 6,
      sectionName: '神の裁き',
      emoji: '💔',
      text: '弱い者いじめを見ると、黙っていられない',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [1, 0, 0, 2, 3, 0, 0, 0],
    },

    // ===== セクション7: 神のラスボス戦（困難への対処） =====
    {
      sid: 7,
      sectionName: '神のラスボス戦',
      emoji: '🗡️',
      text: '困難に直面したとき、真っ先に「自分でなんとかする」と思う',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [2, 0, 0, 2, 0, 0, 0, 1],
    },
    {
      sid: 7,
      sectionName: '神のラスボス戦',
      emoji: '🧠',
      text: 'ピンチのとき、力よりも知恵で切り抜けるほうが好き',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [0, 4, 1, 0, 0, 0, 0, 1],
    },
    {
      sid: 7,
      sectionName: '神のラスボス戦',
      emoji: '🤜',
      text: '「世界を変えたい」という野望を持っている',
      source: 'Eliade, M. (1957). The Sacred and the Profane.',
      weights: [2, 0, 2, 2, 0, 0, 0, 2],
    },
    {
      sid: 7,
      sectionName: '神のラスボス戦',
      emoji: '🌈',
      text: 'どんな絶望的な状況でも「まあなんとかなる」と思えるほうだ',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [0, 0, 1, 0, 2, 1, 0, 3],
    },
    {
      sid: 7,
      sectionName: '神のラスボス戦',
      emoji: '🏰',
      text: '仲間を守るためなら、自分が犠牲になっても構わない',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [0, 0, 0, 0, 4, 0, 0, 2],
    },
  ],

  // --- 結果タイプ（150+タイプ、7ファイルから統合） ---
  resultTypes: allTypes,

  // --- メタ情報 ---
  questionCount: 35,
  estimatedMinutes: 5,
  hashtags: ['#神格診断', '#あなたが神なら', '#何の神', '#神話', '#トキメキラボ'],
  references: [
    'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
    'Campbell, J. (1949). The Hero with a Thousand Faces.',
    'Eliade, M. (1957). The Sacred and the Profane.',
    '比較神話学 x パーソナリティ心理学 x エンターテインメント',
  ],
};
