/**
 * MBTI-128 超精密人格診断
 *
 * 理論基盤:
 *   - Jung, C.G. (1921) Psychological Types
 *   - Myers, I.B. & Myers, P.B. (1995) Gifts Differing
 *   - Nardi, D. (2011) Neuroscience of Personality
 *   - Costa, P.T. & McCrae, R.R. (1992) NEO-PI-R
 *   - DeYoung, C.G. (2015) Cybernetic Big Five Theory
 *   - John, O.P. & Srivastava, S. (1999) Big Five Taxonomy
 *   - Cain, S. (2012) Quiet: The Power of Introverts
 *   - Eysenck, H.J. (1967) The Biological Basis of Personality
 *   - Barlow, D.H. (2014) Clinical Handbook of Psychological Disorders
 *
 * 9次元: 外向性-内向性(E/I), 感覚-直感(S/N), 思考-感情(T/F), 判断-知覚(J/P),
 *         果断-慎重(A/O), 熱意-クール(H/C), 安定-反応(R/S), 自己主張度, 適応柔軟性
 *
 * 72問（9セクション x 8問）で128の精密タイプを判定する。
 */

import type { DiagnosisConfig } from '../diagnosticTypes';
import { MBTI128_TYPES_1 } from './mbti128-types1';
import { MBTI128_TYPES_2 } from './mbti128-types2';
import { MBTI128_TYPES_3 } from './mbti128-types3';
import { MBTI128_TYPES_4 } from './mbti128-types4';

// 4ファイルに分割された128タイプを統合
const allTypes = [...MBTI128_TYPES_1, ...MBTI128_TYPES_2, ...MBTI128_TYPES_3, ...MBTI128_TYPES_4];

export const mbti128Diagnosis: DiagnosisConfig = {
  id: 'mbti128',
  title: 'MBTI-128 超精密人格診断',
  subtitle: '128の人格ティアであなたの本質を完全解析',
  catchphrase: '72問が導く、世界に一つだけの人格座標',
  description:
    'Jung原典、Myers-Briggs、Nardi神経科学、Big Five対応研究、そして最新のR/S（情緒安定性）軸を加えた超精密人格分析。従来の16タイプに「果断/慎重」「熱意/クール」「安定/反応」の3軸を追加し、128の精密タイプであなたの人格を完全特定します。これは国内外の最新研究を統合した、他に類を見ない診断です。',
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

  // --- スコアリング次元（9次元） ---
  // weights配列: [ei, sn, tf, jp, ao, hc, rs, assert, flex]
  // 正の値 = E, S, T, J, A(果断), H(熱意), S(安定), 高主張, 高柔軟
  // 負の値 = I, N, F, P, O(慎重), C(クール), R(反応), 低主張, 低柔軟
  dimensions: [
    { key: 'ei',     label: '外向性 ↔ 内向性', color: '#F59E0B' },
    { key: 'sn',     label: '感覚 ↔ 直感',     color: '#10B981' },
    { key: 'tf',     label: '思考 ↔ 感情',     color: '#3B82F6' },
    { key: 'jp',     label: '判断 ↔ 知覚',     color: '#EF4444' },
    { key: 'ao',     label: '果断 ↔ 慎重',     color: '#8B5CF6' },
    { key: 'hc',     label: '熱意 ↔ クール',   color: '#EC4899' },
    { key: 'rs',     label: '安定 ↔ 反応',     color: '#14B8A6' },
    { key: 'assert', label: '自己主張度',       color: '#F97316' },
    { key: 'flex',   label: '適応柔軟性',       color: '#06B6D4' },
  ],

  // --- セクション定義（9セクション） ---
  sections: {
    1: 'エネルギーの方向',
    2: '情報の取り方',
    3: '判断の仕方',
    4: '外界への態度',
    5: '決断スタイル',
    6: '感情表現',
    7: '情緒安定性',
    8: '社会的態度',
    9: '変化への対応',
  },

  // --- 質問データ（72問） ---
  // weights: [ei, sn, tf, jp, ao, hc, rs, assert, flex]
  questions: [

    // ========================================
    // セクション1: エネルギーの方向（8問） - E/I軸メイン
    // ========================================
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '⚡',
      text: '大人数のパーティーに行くと、むしろ元気になる',
      source: 'Jung, C.G. (1921). Psychological Types. 外向的態度の定義',
      weights: [3, 0, 0, 0, 1, 1, 0, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🌙',
      text: '一人の時間がないと本当に疲れてしまう',
      source: 'Cain, S. (2012). Quiet: The Power of Introverts. 内向性と回復',
      weights: [-3, 0, 0, 0, 0, 0, 0, -1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🗣️',
      text: '初対面の人と話すのが得意だと思う',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 外向性（社交性）ファセット',
      weights: [2, 0, 0, 0, 1, 1, 0, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '💭',
      text: '自分の内面世界は、外の世界よりもずっと豊かだと感じる',
      source: 'Jung, C.G. (1921). Psychological Types. 内向的直感',
      weights: [-2, 0, 0, -1, 0, 0, 0, 0, 1],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🎉',
      text: 'グループの中心にいると自然に感じる',
      source: 'Nardi, D. (2011). Neuroscience of Personality. 外向型の脳活動パターン',
      weights: [3, 0, 0, 0, 1, 0, 0, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '📖',
      text: '考えを整理するには、一人で静かに過ごす必要がある',
      source: 'Cain, S. (2012). Quiet. 刺激に対する最適レベル理論',
      weights: [-2, 0, 0, 0, 0, -1, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🤗',
      text: '新しい人間関係を作るのは楽しい',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 外向性（温かさ）',
      weights: [2, 0, 0, 0, 0, 1, 0, 1, 1],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🧘',
      text: '自分の考えを話すより、聞き役でいることが多い',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 内向型のコミュニケーション',
      weights: [-2, 0, 0, 0, -1, 0, 0, -1, 0],
    },

    // ========================================
    // セクション2: 情報の取り方（8問） - S/N軸メイン
    // ========================================
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '📊',
      text: '具体的な事実やデータを重視する',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 感覚型の情報処理',
      weights: [0, 3, 1, 0, 0, 0, 0, 0, -1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🔮',
      text: '未来の可能性にワクワクする',
      source: 'Jung, C.G. (1921). Psychological Types. 直感機能',
      weights: [0, -3, 0, 0, 0, 1, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🔧',
      text: '経験したことのないことより、慣れたやり方が安心',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（逆転・保守性）',
      weights: [0, 2, 0, 1, 0, -1, 0, 0, -1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🌌',
      text: '物事の背後にあるパターンや法則を見つけるのが好き',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 開放性と直感',
      weights: [0, -2, 1, 0, 0, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '👁️',
      text: '細かいディテールに気がつく方だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Si機能の神経基盤',
      weights: [0, 2, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🎨',
      text: '抽象的なアイデアについて考えるのが楽しい',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 知性/想像力の次元',
      weights: [0, -2, 0, -1, 0, 0, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🌅',
      text: '今この瞬間を大事にしたい',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Se機能の脳パターン',
      weights: [0, 2, 0, -1, 0, 1, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🧩',
      text: 'まだ誰も考えたことのない発想に惹かれる',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 直感型の創造性',
      weights: [0, -3, 0, 0, 1, 1, 0, 1, 1],
    },

    // ========================================
    // セクション3: 判断の仕方（8問） - T/F軸メイン
    // ========================================
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '⚖️',
      text: '論理的に正しいことが、相手の気持ちより大事だと思う',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 思考型の判断基準',
      weights: [0, 0, 3, 0, 1, -1, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '💗',
      text: '人の感情に自然と寄り添える',
      source: 'Jung, C.G. (1921). Psychological Types. 感情機能',
      weights: [0, 0, -3, 0, 0, 1, -1, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🧪',
      text: '議論で意見が対立しても、論理で押し通す',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 協調性（逆転）',
      weights: [0, 0, 2, 0, 1, 0, 0, 1, -1],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🤝',
      text: '誰かが悲しんでいると、自分もつらくなる',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 協調性（共感性）',
      weights: [0, 0, -2, 0, 0, 1, -1, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🎯',
      text: '効率を最優先で物事を進めたい',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Te機能',
      weights: [0, 0, 2, 1, 1, -1, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🌺',
      text: '人間関係のハーモニーを大切にする',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 協調性',
      weights: [0, 0, -2, 0, -1, 0, 0, -1, 1],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '📏',
      text: '客観的な分析が得意だ',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 知性と思考型の関係',
      weights: [0, 0, 2, 0, 0, -1, 1, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🕊️',
      text: '人を助けることに生きがいを感じる',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. Fe機能の利他性',
      weights: [0, 0, -3, 0, 0, 1, 0, 0, 0],
    },

    // ========================================
    // セクション4: 外界への態度（8問） - J/P軸メイン
    // ========================================
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '📅',
      text: '計画を立てて行動するのが好き',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 判断型の生活態度',
      weights: [0, 0, 0, 3, 1, 0, 0, 0, -1],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🌊',
      text: '臨機応変に対応するのが得意',
      source: 'Jung, C.G. (1921). Psychological Types. 知覚型の態度',
      weights: [0, 0, 0, -3, 0, 0, 0, 0, 2],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '⏰',
      text: '締め切りは余裕を持って守りたい',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 誠実性（自己規律）',
      weights: [0, 0, 0, 2, 0, 0, 1, 0, -1],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🎲',
      text: '予定が変わっても動じない',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Ne/Se型の柔軟性',
      weights: [0, 0, 0, -2, 0, 0, 1, 0, 2],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '✅',
      text: 'やるべきことはリストにして管理する',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 誠実性（秩序）',
      weights: [0, 0, 0, 2, 1, -1, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🦋',
      text: 'ルールに縛られるのは息苦しい',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 開放性と知覚型の関係',
      weights: [0, 0, 0, -2, 0, 1, 0, 1, 1],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🗂️',
      text: '物事には結論を出したい',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 判断型の意思決定',
      weights: [0, 0, 1, 2, 1, 0, 0, 1, -1],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🚀',
      text: '選択肢はできるだけ多く残しておきたい',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（柔軟性）',
      weights: [0, 0, 0, -3, -1, 0, 0, 0, 2],
    },

    // ========================================
    // セクション5: 決断スタイル（8問） - A/O軸メイン
    // ========================================
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '⚔️',
      text: '自分の判断に自信を持てる',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. アサーティブネスの次元',
      weights: [0, 0, 0, 0, 3, 0, 1, 2, 0],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🔎',
      text: '決める前に何度も確認したくなる',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 神経症傾向（慎重性）',
      weights: [0, 0, 0, 0, -3, 0, -1, -1, 0],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '💪',
      text: '失敗してもすぐ次に切り替えられる',
      source: 'Eysenck, H.J. (1967). The Biological Basis of Personality. 情緒安定性と回復力',
      weights: [0, 0, 0, 0, 2, 0, 2, 0, 1],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🛡️',
      text: '石橋を叩いて渡るタイプだ',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 慎重型の意思決定',
      weights: [0, 0, 0, 0, -2, -1, 0, -1, 0],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🏃',
      text: 'リスクを取ることにワクワクする',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 外向性（大胆さ）',
      weights: [0, 0, 0, 0, 2, 1, 0, 1, 1],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🌿',
      text: '周りの意見を聞いてから決めたい',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 協調性（従順性）',
      weights: [0, 0, 0, 0, -2, 0, 0, -1, 0],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🎯',
      text: '間違っていても、まず行動してから修正する',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Te/Se型の行動パターン',
      weights: [0, 0, 0, 0, 3, 1, 0, 1, 1],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🤔',
      text: '正解がわかるまで動きたくない',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 神経症傾向（不安）',
      weights: [0, 0, 0, 0, -3, -1, 0, -1, -1],
    },

    // ========================================
    // セクション6: 感情表現（8問） - H/C軸メイン
    // ========================================
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '😢',
      text: '感動したら涙が出るタイプだ',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 感情の豊かさ',
      weights: [0, 0, -1, 0, 0, 3, -1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🧊',
      text: 'いつも冷静に状況を分析できる',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Ti型の感情処理',
      weights: [0, 0, 1, 0, 0, -3, 2, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🔥',
      text: '好きなことには夢中になりすぎてしまう',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 開放性（没入体験）',
      weights: [0, 0, 0, 0, 0, 2, -1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🎩',
      text: '感情に流されず、合理的に判断できる',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. 思考型の感情管理',
      weights: [0, 0, 1, 0, 1, -2, 1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🎭',
      text: '自分の気持ちをストレートに表現する',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 外向性（活動性）',
      weights: [1, 0, 0, 0, 1, 2, 0, 1, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🏔️',
      text: 'ポーカーフェイスが得意だ',
      source: 'Cain, S. (2012). Quiet. 内向性と感情表出の抑制',
      weights: [-1, 0, 0, 0, 0, -2, 1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '💐',
      text: '情熱的に物事に取り組む',
      source: 'Jung, C.G. (1921). Psychological Types. 外向的感情機能(Fe)',
      weights: [0, 0, 0, 0, 1, 3, 0, 1, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🌑',
      text: '感情を表に出すのは苦手だ',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 内向性と感情抑制',
      weights: [-1, 0, 0, 0, 0, -2, 0, -1, 0],
    },

    // ========================================
    // セクション7: 情緒安定性（8問） - R/S軸メイン（新セクション）
    // ========================================
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '🧘',
      text: 'ストレスがあっても平常心を保てる',
      source: 'Eysenck, H.J. (1967). The Biological Basis of Personality. 神経症傾向と情緒安定性',
      weights: [0, 0, 0, 0, 1, 0, 3, 0, 0],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '🌊',
      text: '些細なことで気分が大きく変わることがある',
      source: 'Barlow, D.H. (2014). Clinical Handbook of Psychological Disorders. 情動反応性',
      weights: [0, 0, 0, 0, 0, 0, -3, 0, 0],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '💎',
      text: 'プレッシャーがかかるほど力を発揮できる',
      source: 'Eysenck, H.J. (1967). The Biological Basis of Personality. 覚醒理論とパフォーマンス',
      weights: [0, 0, 0, 0, 1, 1, 2, 1, 0],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '🌧️',
      text: '嫌なことがあるとなかなか忘れられない',
      source: 'Barlow, D.H. (2014). Clinical Handbook of Psychological Disorders. 反芻思考',
      weights: [0, 0, 0, 0, -1, 0, -2, 0, 0],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '🏋️',
      text: '失敗しても引きずらない',
      source: 'Eysenck, H.J. (1967). The Biological Basis of Personality. 情緒安定性と回復力',
      weights: [0, 0, 0, 0, 1, 0, 3, 0, 1],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '😰',
      text: '不安や心配を感じやすい方だ',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 神経症傾向（不安）',
      weights: [0, 0, 0, 0, -1, 0, -3, -1, 0],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '🌿',
      text: '環境が変わっても、すぐに適応できる',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 安定性メタ特性',
      weights: [0, 0, 0, 0, 0, 0, 2, 0, 2],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '🎢',
      text: '感情の起伏が激しいと言われることがある',
      source: 'Barlow, D.H. (2014). Clinical Handbook of Psychological Disorders. 情動調節',
      weights: [0, 0, 0, 0, 0, 1, -3, 0, 0],
    },

    // ========================================
    // セクション8: 社会的態度（8問） - 自己主張度メイン
    // ========================================
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '📢',
      text: '自分の意見をはっきり言える',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. アサーティブネスと外向性',
      weights: [1, 0, 0, 0, 1, 0, 0, 3, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🌾',
      text: '周りの空気を読んで合わせることが多い',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 協調性',
      weights: [0, 0, -1, 0, -1, 0, 0, -3, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🦁',
      text: 'リーダー役を任されることが多い',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 外向性（リーダーシップ）',
      weights: [1, 0, 0, 0, 1, 1, 0, 2, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🕊️',
      text: '争いは避けたい',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 協調性（従順性）',
      weights: [0, 0, -1, 0, -1, 0, 0, -2, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🗡️',
      text: '自分が正しいと思ったら、多数派に反対できる',
      source: 'Myers, I.B. & Myers, P.B. (1995). Gifts Differing. Te型の率直さ',
      weights: [0, 0, 1, 0, 1, 0, 0, 3, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🐑',
      text: '人に頼まれると断れない',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 協調性（利他性）',
      weights: [0, 0, -1, 0, -1, 0, -1, -2, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🏆',
      text: '交渉や説得が得意だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Te/Fe型の対人影響力',
      weights: [1, 0, 0, 0, 1, 1, 0, 2, 1],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🌸',
      text: '自分をアピールするのが苦手',
      source: 'Cain, S. (2012). Quiet: The Power of Introverts. 内向性と自己呈示',
      weights: [-1, 0, 0, 0, -1, -1, -1, -3, 0],
    },

    // ========================================
    // セクション9: 変化への対応（8問） - 適応柔軟性メイン
    // ========================================
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🌪️',
      text: '予定変更にすぐ対応できる',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（柔軟性）',
      weights: [0, 0, 0, -1, 0, 0, 1, 0, 3],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🏠',
      text: 'ルーティンを大切にする',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 誠実性（習慣性）',
      weights: [0, 1, 0, 1, 0, 0, 0, 0, -3],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🌍',
      text: '新しい環境にすぐ馴染める',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 開放性（経験への開放）',
      weights: [1, 0, 0, 0, 1, 0, 1, 0, 2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🔁',
      text: '変化が多いと疲れる',
      source: 'Eysenck, H.J. (1967). The Biological Basis of Personality. 覚醒水準と刺激耐性',
      weights: [0, 0, 0, 1, 0, 0, -1, 0, -2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🎪',
      text: 'マルチタスクが得意だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Ne型の並列処理',
      weights: [0, 0, 0, 0, 0, 0, 1, 0, 2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🔬',
      text: '一つのことに集中して取り組みたい',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Ni型の集中パターン',
      weights: [-1, 0, 0, 1, 0, 0, 0, 0, -2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🌈',
      text: '異なる価値観を受け入れられる',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 開放性（価値観）',
      weights: [0, -1, -1, -1, 0, 0, 1, 0, 3],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🛤️',
      text: '伝統やしきたりを守ることは大切だ',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（逆転・保守性）',
      weights: [0, 1, 0, 1, 0, -1, 0, 0, -3],
    },
  ],

  // --- 結果タイプ（128タイプ: 別ファイルからインポート） ---
  resultTypes: allTypes,

  // --- メタ情報 ---
  questionCount: 72,
  estimatedMinutes: 18,
  hashtags: ['#MBTI128', '#超精密人格診断', '#128タイプ', '#ときめきラボ', '#性格診断', '#人格進化'],
  references: [
    'Jung, C.G. (1921). Psychological Types. Princeton University Press.',
    'Myers, I.B. & Myers, P.B. (1995). Gifts Differing: Understanding Personality Type. Davies-Black Publishing.',
    'Nardi, D. (2011). Neuroscience of Personality: Brain Savvy Insights for All Types of People. Radiance House.',
    'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual. Psychological Assessment Resources.',
    'DeYoung, C.G. (2015). Cybernetic Big Five Theory. Journal of Research in Personality, 56, 33-58.',
    'John, O.P. & Srivastava, S. (1999). The Big Five Trait Taxonomy. In L.A. Pervin & O.P. John (Eds.), Handbook of Personality.',
    'Cain, S. (2012). Quiet: The Power of Introverts in a World That Can\'t Stop Talking. Crown Publishers.',
    'Eysenck, H.J. (1967). The Biological Basis of Personality. Charles C Thomas Publisher.',
    'Barlow, D.H. (2014). Clinical Handbook of Psychological Disorders (5th ed.). Guilford Press.',
  ],
};
