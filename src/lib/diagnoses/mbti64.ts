/**
 * MBTI-64 人格進化診断
 *
 * 理論基盤:
 *   - Jung, C.G. (1921) Psychological Types
 *   - Myers, I.B. & Myers, P.B. (1995) Gifts Differing
 *   - Nardi, D. (2011) Neuroscience of Personality
 *   - Costa, P.T. & McCrae, R.R. (1992) NEO-PI-R
 *   - DeYoung, C.G. (2015) Cybernetic Big Five Theory
 *   - John, O.P. & Srivastava, S. (1999) Big Five Taxonomy
 *   - Grant, A.M. (2013) Rethinking the Extraverted Sales Ideal
 *   - Cain, S. (2012) Quiet: The Power of Introverts
 *
 * 8次元: 外向性-内向性(E/I), 感覚-直感(S/N), 思考-感情(T/F), 判断-知覚(J/P),
 *         果断-慎重(A/O), 熱意-クール(H/C), 自己主張度, 適応柔軟性
 *
 * 64問（8セクション x 8問）で64の精密タイプを判定する。
 */

import type { DiagnosisConfig } from '../diagnosticTypes';
import { MBTI64_TYPES_PART1 } from './mbti64-types';
import { MBTI64_TYPES_PART2 } from './mbti64-types2';

const allTypes = [...MBTI64_TYPES_PART1, ...MBTI64_TYPES_PART2];

export const mbti64Diagnosis: DiagnosisConfig = {
  id: 'mbti64',
  title: 'MBTI-64 人格進化診断',
  subtitle: '16タイプを超えた、64の人格ティアであなたの本質を解き明かす',
  catchphrase: '64問の質問が導く、あなただけの人格の座標',
  description:
    'Carl Jung原典の心理機能理論、Myers-Briggsの類型論、Dario Nardiの脳神経科学研究、Big Five（NEO-PI-R）との対応研究を統合した最先端の人格分析です。従来の16タイプに「果断/慎重」「熱意/クール」の2軸を加え、64の精密タイプであなたの人格を特定します。各質問は実証研究に基づいて設計されており、10歳から70歳まで幅広い年齢層が回答できる普遍的な内容です。',
  emoji: '🧬',
  themeColor: '#8B5CF6',
  gradientFrom: '#8B5CF6',
  gradientTo: '#EC4899',

  // --- プロフィール入力 ---
  profileFields: [
    {
      id: 'gender',
      label: '性別',
      type: 'select',
      options: [
        { value: 'male', label: '男性', emoji: '👦' },
        { value: 'female', label: '女性', emoji: '👧' },
        { value: 'other', label: 'その他', emoji: '🌈' },
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

  // --- スコアリング次元（8次元） ---
  // 正の値 = E, S, T, J, A(果断), H(熱意), 高主張, 高柔軟
  // 負の値 = I, N, F, P, O(慎重), C(クール), 低主張, 低柔軟
  dimensions: [
    { key: 'ei',     label: '外向性 ↔ 内向性', color: '#F59E0B' },
    { key: 'sn',     label: '感覚 ↔ 直感',     color: '#10B981' },
    { key: 'tf',     label: '思考 ↔ 感情',     color: '#3B82F6' },
    { key: 'jp',     label: '判断 ↔ 知覚',     color: '#EF4444' },
    { key: 'ao',     label: '果断 ↔ 慎重',     color: '#8B5CF6' },
    { key: 'hc',     label: '熱意 ↔ クール',   color: '#EC4899' },
    { key: 'assert', label: '自己主張度',       color: '#F97316' },
    { key: 'flex',   label: '適応柔軟性',       color: '#06B6D4' },
  ],

  // --- セクション定義（8セクション） ---
  sections: {
    1: 'エネルギーの方向',
    2: '情報の取り方',
    3: '判断の仕方',
    4: '外界への態度',
    5: '決断スタイル',
    6: '感情表現',
    7: '社会的態度',
    8: '変化への対応',
  },

  // --- 質問データ（64問） ---
  // weights: [ei, sn, tf, jp, ao, hc, assert, flex]
  questions: [

    // ========================================
    // セクション1: エネルギーの方向（8問） - E/I軸メイン
    // ========================================
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '⚡',
      text: '大人数の集まりに行くと、むしろ元気になる',
      source: 'Jung, C.G. (1921). Psychological Types. 外向的態度の定義',
      weights: [3, 0, 0, 0, 1, 1, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🌙',
      text: '一人の時間がないと、本当に疲れてしまう',
      source: 'Cain, S. (2012). Quiet: The Power of Introverts. 内向性と回復',
      weights: [-3, 0, 0, 0, 0, 0, -1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🗣️',
      text: '初めて会う人と話すのが得意だと思う',
      source: 'Grant, A.M. (2013). Rethinking the Extraverted Sales Ideal. 社交性尺度',
      weights: [2, 0, 0, 0, 1, 1, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '💭',
      text: '自分の内面の世界は、外の世界よりもずっと豊かだと感じる',
      source: 'Jung, C.G. (1921). Psychological Types. 内向的直感',
      weights: [-2, 0, 0, -1, 0, 0, 0, 1],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🎉',
      text: '賑やかな場所にいると、自分らしくいられる気がする',
      source: 'Nardi, D. (2011). Neuroscience of Personality. 外向型の脳活動パターン',
      weights: [3, 0, 0, 0, 0, 1, 0, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '📖',
      text: '休日は一人で読書や趣味に没頭する方がリフレッシュできる',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 内向性ファセット',
      weights: [-3, 0, 0, 0, -1, -1, 0, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🤗',
      text: '友達の輪が広いほうで、いろんなグループに顔を出す',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 外向性（社交性）',
      weights: [2, 0, 0, 0, 1, 1, 1, 1],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🧘',
      text: '静かな環境の方が集中できるし、考えもまとまりやすい',
      source: 'Cain, S. (2012). Quiet. 刺激に対する最適レベル理論',
      weights: [-2, 0, 0, 1, 0, -1, 0, 0],
    },

    // ========================================
    // セクション2: 情報の取り方（8問） - S/N軸メイン
    // ========================================
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '📊',
      text: '具体的な事実やデータを見て判断する方が安心する',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 感覚型の情報処理',
      weights: [0, 3, 1, 1, 0, 0, 0, -1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🔮',
      text: '未来の可能性やまだ誰も考えていないアイデアにワクワクする',
      source: 'Jung, C.G. (1921). Psychological Types. 直感機能',
      weights: [0, -3, 0, -1, 0, 1, 0, 1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🔧',
      text: '理論より実際にやってみて覚えるタイプだ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Se型の脳パターン',
      weights: [1, 2, 0, 0, 1, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🌌',
      text: '物事の裏に隠されたパターンや意味を見つけるのが好きだ',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. 開放性と直感',
      weights: [0, -3, 0, 0, 0, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '📐',
      text: '細かい数字や手順を正確に覚えるのが苦にならない',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 誠実性ファセット',
      weights: [0, 2, 1, 1, 0, -1, 0, -1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🎨',
      text: '比喩やたとえ話を使って考えるのが自然にできる',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 直感型の表現',
      weights: [0, -2, 0, 0, 0, 1, 0, 1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '👁️',
      text: '「今ここ」の現実に集中するのが得意だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Se機能の神経基盤',
      weights: [0, 3, 0, 0, 1, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🧩',
      text: 'いろいろな情報をつなげて、大きなビジョンを描くのが楽しい',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. 知性/想像力の次元',
      weights: [0, -2, 0, -1, 0, 1, 1, 1],
    },

    // ========================================
    // セクション3: 判断の仕方（8問） - T/F軸メイン
    // ========================================
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '⚖️',
      text: '論理的に正しいことは、相手の気持ちより優先すべきだと思う',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 思考型の判断基準',
      weights: [0, 0, 3, 0, 1, -1, 1, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '💗',
      text: '人の気持ちに自然と寄り添うことができる方だ',
      source: 'Jung, C.G. (1921). Psychological Types. 感情機能',
      weights: [0, 0, -3, 0, 0, 1, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🧪',
      text: '感情を抜きにして、冷静に原因と結果を分析したい',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 協調性（逆）',
      weights: [0, 0, 3, 0, 1, -2, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🤝',
      text: '人間関係の調和が、物事を円滑に進める最も大切な要素だと思う',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 協調性',
      weights: [0, 0, -2, 0, 0, 1, -1, 1],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🎯',
      text: '効率や成果を重視して、無駄をなくしたいと思う',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Te機能',
      weights: [0, 0, 2, 1, 1, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🌺',
      text: '自分の大切にしている価値観に反することには従えない',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. Fi機能',
      weights: [0, 0, -2, 0, 0, 0, 1, -1],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '📏',
      text: '批判されても、事実に基づいた指摘なら受け入れられる',
      source: 'Grant, A.M. (2013). Rethinking the Extraverted Sales Ideal. フィードバック受容',
      weights: [0, 0, 2, 0, 1, -1, 0, 1],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🕊️',
      text: '誰かが困っていたら、自分のことを後回しにしても助けたい',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 利他性ファセット',
      weights: [0, 0, -3, 0, 0, 2, 0, 0],
    },

    // ========================================
    // セクション4: 外界への態度（8問） - J/P軸メイン
    // ========================================
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '📅',
      text: '計画を立ててから行動に移す方が安心する',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 判断型の生活態度',
      weights: [0, 0, 0, 3, 1, 0, 0, -1],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🌊',
      text: '流れに身を任せて、臨機応変に対応するのが得意だ',
      source: 'Jung, C.G. (1921). Psychological Types. 知覚型の態度',
      weights: [0, 0, 0, -3, 0, 0, 0, 2],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '✅',
      text: 'やることリストを作って、一つずつ消していくのが好き',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 誠実性（秩序）',
      weights: [0, 0, 0, 3, 0, 0, 0, -1],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🎲',
      text: '予定を決めすぎると窮屈に感じる',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Ne/Se型の柔軟性',
      weights: [0, 0, 0, -2, 0, 0, 0, 2],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '⏰',
      text: '締め切りは余裕を持って、早めに片付けたい',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 誠実性',
      weights: [0, 0, 0, 2, 1, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🦋',
      text: 'やりたいことが次々に出てきて、一つに絞るのが難しい',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. 開放性と知覚型の関係',
      weights: [0, -1, 0, -3, 0, 1, 0, 1],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🗂️',
      text: '部屋やデスクは常に整理整頓されている方だ',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 誠実性（整頓）',
      weights: [0, 0, 0, 2, 0, 0, 0, -1],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🚀',
      text: 'まず動いてみて、問題が出たらその時に考えればいいと思う',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 知覚型の行動パターン',
      weights: [1, 0, 0, -2, 1, 0, 1, 2],
    },

    // ========================================
    // セクション5: 決断スタイル（8問） - A/O軸（果断/慎重）メイン
    // ========================================
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '⚔️',
      text: '自分の判断に自信を持てることが多い',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. アサーティブネスの次元',
      weights: [0, 0, 0, 0, 3, 0, 2, 0],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🔎',
      text: '大事な決断をする前に、何度も調べて確認したい',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 神経症傾向（慎重性）',
      weights: [0, 0, 0, 0, -3, 0, -1, 0],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '💪',
      text: '間違っていたとしても、決めたことはやり遂げたい',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 誠実性（自己規律）',
      weights: [0, 0, 0, 1, 2, 0, 1, -1],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🤔',
      text: '正解がわからないとき、なかなか一歩が踏み出せない',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 神経症傾向（不安）',
      weights: [0, 0, 0, 0, -3, 0, -1, -1],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🏃',
      text: 'チャンスだと思ったら、リスクがあっても迷わず飛び込む',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. 外向性（大胆さ）',
      weights: [1, 0, 0, 0, 3, 1, 2, 0],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🛡️',
      text: '石橋を叩いて渡るタイプだと言われる',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 慎重型の意思決定',
      weights: [0, 1, 0, 1, -2, -1, -1, 0],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🎯',
      text: '一度決めたら迷わない、「ブレない自分」でいたい',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Ni/Te型の決断パターン',
      weights: [0, 0, 1, 1, 3, 0, 1, -1],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🌿',
      text: 'あらゆる選択肢を検討してからでないと安心できない',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（熟慮）',
      weights: [0, 0, 0, 0, -2, 0, 0, 1],
    },

    // ========================================
    // セクション6: 感情表現（8問） - H/C軸（熱意/クール）メイン
    // ========================================
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '😢',
      text: '感動する場面では、自然と涙が出てくるタイプだ',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 感情の豊かさ',
      weights: [0, 0, -1, 0, 0, 3, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🧊',
      text: '感情に流されず、冷静に状況を分析できる方だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Ti型の感情処理',
      weights: [0, 0, 1, 0, 1, -3, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🎭',
      text: '嬉しいときは全身で喜びを表現する',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 外向性（活動性）',
      weights: [1, 0, 0, 0, 0, 3, 1, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🎩',
      text: '感情を表に出すより、落ち着いた態度を保ちたい',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 思考型の感情管理',
      weights: [-1, 0, 1, 0, 0, -3, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🔥',
      text: '好きなことに夢中になると、時間を忘れて没頭してしまう',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. 開放性（没入体験）',
      weights: [0, 0, 0, 0, 0, 2, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🏔️',
      text: 'どんな状況でも動揺しない冷静さを持っていたい',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 神経症傾向（逆転・情緒安定）',
      weights: [0, 0, 1, 0, 1, -2, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '💐',
      text: '人の喜びや悲しみを、自分のことのように感じてしまう',
      source: 'Jung, C.G. (1921). Psychological Types. 外向的感情機能(Fe)',
      weights: [0, 0, -2, 0, 0, 3, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🌑',
      text: '自分の本当の気持ちは、あまり人に見せたくない',
      source: 'Cain, S. (2012). Quiet. 内向性と感情表出の抑制',
      weights: [-1, 0, 0, 0, 0, -2, -1, 0],
    },

    // ========================================
    // セクション7: 社会的態度（8問） - 自己主張度メイン
    // ========================================
    {
      sid: 7,
      sectionName: '社会的態度',
      emoji: '📢',
      text: '自分の意見をはっきりと言葉にするのが得意だ',
      source: 'Grant, A.M. (2013). Rethinking the Extraverted Sales Ideal. 主張性の研究',
      weights: [1, 0, 0, 0, 1, 0, 3, 0],
    },
    {
      sid: 7,
      sectionName: '社会的態度',
      emoji: '🌾',
      text: '場の空気を読んで、自分を合わせることが多い',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 協調性',
      weights: [0, 0, -1, 0, -1, 0, -3, 1],
    },
    {
      sid: 7,
      sectionName: '社会的態度',
      emoji: '🦁',
      text: 'グループの中では自然とリーダー的な役割を引き受ける',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. アサーティブネスと外向性',
      weights: [2, 0, 0, 1, 1, 0, 3, 0],
    },
    {
      sid: 7,
      sectionName: '社会的態度',
      emoji: '🐑',
      text: '対立するくらいなら、自分が引いた方がいいと思う',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 協調性（従順性）',
      weights: [0, 0, -1, 0, -1, 0, -3, 0],
    },
    {
      sid: 7,
      sectionName: '社会的態度',
      emoji: '🗡️',
      text: '間違っていると感じたら、相手が誰でも指摘できる',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. Te型の率直さ',
      weights: [0, 0, 1, 0, 2, -1, 3, 0],
    },
    {
      sid: 7,
      sectionName: '社会的態度',
      emoji: '🕊️',
      text: '人の話を最後まで聞いてから、自分の考えを伝えるようにしている',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Fi/Fe型の傾聴パターン',
      weights: [0, 0, -1, 0, 0, 0, -1, 1],
    },
    {
      sid: 7,
      sectionName: '社会的態度',
      emoji: '🏆',
      text: '競争の場では「絶対に勝ちたい」という気持ちが強くなる',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. 外向性（支配性）',
      weights: [1, 0, 1, 0, 2, 1, 2, 0],
    },
    {
      sid: 7,
      sectionName: '社会的態度',
      emoji: '🌸',
      text: '目立つより、縁の下の力持ちとして貢献するのが好きだ',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 協調性（謙虚さ）',
      weights: [-1, 0, 0, 0, -1, 0, -2, 0],
    },

    // ========================================
    // セクション8: 変化への対応（8問） - 適応柔軟性メイン
    // ========================================
    {
      sid: 8,
      sectionName: '変化への対応',
      emoji: '🌪️',
      text: '急な予定変更にもすぐ対応できる方だ',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（柔軟性）',
      weights: [0, 0, 0, -1, 0, 0, 0, 3],
    },
    {
      sid: 8,
      sectionName: '変化への対応',
      emoji: '🏠',
      text: '毎日のルーティンがあると安心する',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 誠実性（習慣性）',
      weights: [0, 1, 0, 1, 0, 0, 0, -3],
    },
    {
      sid: 8,
      sectionName: '変化への対応',
      emoji: '🌍',
      text: '知らない場所や文化に触れるのが楽しい',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. 開放性（経験への開放）',
      weights: [1, -1, 0, 0, 0, 1, 0, 3],
    },
    {
      sid: 8,
      sectionName: '変化への対応',
      emoji: '🔁',
      text: '慣れたやり方を変えるのには少し抵抗がある',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（逆転・保守性）',
      weights: [0, 1, 0, 1, 0, 0, 0, -3],
    },
    {
      sid: 8,
      sectionName: '変化への対応',
      emoji: '🌱',
      text: '新しいことを学ぶのが苦にならず、むしろ楽しい',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five. 知性/好奇心の次元',
      weights: [0, -1, 0, 0, 0, 1, 0, 2],
    },
    {
      sid: 8,
      sectionName: '変化への対応',
      emoji: '⚓',
      text: '安定した環境で、じっくり力を発揮したい',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 神経症傾向（安定志向）',
      weights: [-1, 1, 0, 1, 0, 0, 0, -2],
    },
    {
      sid: 8,
      sectionName: '変化への対応',
      emoji: '🎪',
      text: '予想外のハプニングを、むしろ楽しめるタイプだ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Ne型のサプライズ受容',
      weights: [1, -1, 0, -1, 1, 1, 0, 3],
    },
    {
      sid: 8,
      sectionName: '変化への対応',
      emoji: '🛤️',
      text: '長期的な目標に向かって、コツコツ積み上げるのが自分に合っている',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 誠実性（達成努力）',
      weights: [0, 0, 0, 2, 0, 0, 1, -2],
    },
  ],

  // --- 結果タイプ（64タイプ: 別ファイルからインポート） ---
  resultTypes: allTypes,

  // --- メタ情報 ---
  questionCount: 64,
  estimatedMinutes: 15,
  hashtags: ['#MBTI64', '#人格進化診断', '#64タイプ', '#ときめきラボ', '#性格診断'],
  references: [
    'Jung, C.G. (1921). Psychological Types. Princeton University Press.',
    'Myers, I.B. & Myers, P.B. (1995). Gifts Differing: Understanding Personality Type. Davies-Black Publishing.',
    'Nardi, D. (2011). Neuroscience of Personality: Brain Savvy Insights for All Types of People. Radiance House.',
    'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual. Psychological Assessment Resources.',
    'DeYoung, C.G. (2015). Cybernetic Big Five Theory. Journal of Research in Personality, 56, 33-58.',
    'John, O.P. & Srivastava, S. (1999). The Big Five Trait Taxonomy. In L.A. Pervin & O.P. John (Eds.), Handbook of Personality.',
    'Grant, A.M. (2013). Rethinking the Extraverted Sales Ideal. Psychological Science, 24(6), 1024-1030.',
    'Cain, S. (2012). Quiet: The Power of Introverts in a World That Can\'t Stop Talking. Crown Publishers.',
  ],
};
