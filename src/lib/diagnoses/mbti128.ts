/**
 * MBTI-128 超精密人格診断
 *
 * 理論基盤:
 *   【古典理論】
 *   - Jung, C.G. (1921) Psychological Types
 *   - Myers, I.B. & Myers, P.B. (1995) Gifts Differing
 *   - Nardi, D. (2011) Neuroscience of Personality
 *   - Costa, P.T. & McCrae, R.R. (1992) NEO-PI-R
 *   - DeYoung, C.G. (2015) Cybernetic Big Five Theory
 *   - Eysenck, H.J. (1967) The Biological Basis of Personality
 *
 *   【デジタル世代研究（2020-2025）】
 *   - Montag et al. (2021) Psychology of TikTok Use — Frontiers in Public Health
 *   - Luo & Hancock (2020) Extraversion and social media use
 *   - Hou et al. (2024) Personality and information sharing on social media — PLOS ONE
 *   - Mahalingham et al. (2020) Alone and Online — Psychology of Popular Media
 *   - Rozgonjuk et al. (2023) Personality, FoMO and problematic social media use
 *   - Roberts et al. (2025) FoMO and university students — Frontiers in Psychology
 *   - Wacks & Weinstein (2025) Mental health by smartphone and Instagram use
 *   - Teng et al. (2025) Self-disclosure and self-presentation on social media
 *   - Liu et al. (2021) Online Identity Reconstruction — Frontiers in Psychology
 *   - Li & Chen (2022) Personality and online self-disclosure
 *   - Nesi et al. (2023) Social media use, upward comparisons and well-being — Nature
 *   - Hedlund et al. (2025) Social media restriction and well-being
 *   - Carvalho & Pianowski (2024) Five-factor traits and social media — Current Psychology
 *   - Nygren et al. (2023) Personality and Social Media Usage in Sweden
 *   - Kumar et al. (2025) Predicting MBTI of YouTube users — Scientific Reports
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
  title: 'MBTI-512 超精密人格診断',
  subtitle: '512の人格パターンであなたの本質を完全解析',
  catchphrase: '72問が導く、世界に一つだけの人格座標',
  description:
    '従来の心理学理論に加え、SNS行動・デジタルコミュニケーション・FOMO研究など2020年代の最新知見を統合した超精密人格分析。従来のMBTI 4軸に「果断/慎重」「熱意/クール」「安定/反応」「自己主張度」「適応柔軟性」の5軸を追加した9次元（2⁹ = 512パターン）システムで、スマホ世代のリアルな性格を完全特定。面接対策・自己PR作成・相性分析にも活用できます。',
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
      text: 'グループ通話やオンライン飲み会に参加するとエネルギーが湧いてくる',
      source: 'Luo & Hancock (2020). Extraversion and social media use. デジタル外向性',
      weights: [3, 0, 0, 0, 0, 1, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🌙',
      text: '一人の時間がないと疲れを感じる',
      source: 'Cain, S. (2012). Quiet: The Power of Introverts. 内向性と回復',
      weights: [-3, 0, 0, 0, 0, 0, 0, -1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🗣️',
      text: 'SNSで知り合った人とも、すぐ直接会いたくなる',
      source: 'Hou et al. (2024). Personality and information sharing on social media. 外向性と対面志向',
      weights: [2, 0, 0, 0, 0, 0, 0, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '💭',
      text: 'イヤホンをして自分だけの世界に入っている時間が心地よい',
      source: 'Mahalingham et al. (2020). Alone and Online. 高機能内向者のデバイス使用',
      weights: [-2, 0, 0, -1, 0, 0, 0, 0, 1],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🎉',
      text: 'グループLINEやDiscordで自然と会話の中心になっている',
      source: 'Montag et al. (2021). Psychology of TikTok Use. SNSでの社交行動と外向性',
      weights: [3, 0, 0, 0, 0, 0, 0, 1, 0],
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
      text: '新しいコミュニティやオンラインサークルに参加するのはワクワクする',
      source: 'Nygren et al. (2023). Personality Traits and Social Media Usage. SNS参加と外向性',
      weights: [2, 0, 0, 0, 0, 1, 0, 0, 0],
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
      text: 'レビューや口コミを調べてから買い物や行動を決める',
      source: 'Hou et al. (2024). Personality and information sharing. 感覚型のデジタル情報処理',
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
      text: '使い慣れたアプリややり方を変えるのに抵抗がある',
      source: 'Nygren et al. (2023). Personality and Social Media. 開放性（逆転・デジタル保守性）',
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
      text: 'まだ世の中にないサービスや仕組みを空想することがある',
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
      text: '既存の常識を覆すようなアイデアやコンテンツに惹かれる',
      source: 'Kumar et al. (2025). MBTI and YouTube. 直感型のコンテンツ嗜好',
      weights: [0, -3, 0, 0, 1, 1, 0, 1, 1],
    },

    // ========================================
    // セクション3: 判断の仕方（8問） - T/F軸メイン
    // ========================================
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '⚖️',
      text: 'ネットの議論では、正論を言うことが相手の気持ちより大事だ',
      source: 'Li & Chen (2022). Personality and online self-disclosure. 思考型のデジタル議論スタイル',
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
      text: 'チャットやSNSで意見が合わないとき、自分の考えをしっかり主張する',
      source: 'Teng et al. (2025). Self-disclosure and self-presentation on social media. デジタル自己主張',
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
      text: 'グループLINEの雰囲気を壊さないように気を遣う',
      source: 'Teng et al. (2025). Self-presentation on social media. デジタル協調性',
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
      text: '友達が困っていたら、自分のことを後回しにしてでも助けたい',
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
      text: 'スマホのカレンダーやアプリで予定をしっかり管理している',
      source: 'Carvalho & Pianowski (2024). Five-factor and social media use. デジタル誠実性',
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
      text: '課題やレポートは締め切りよりも早めに終わらせたい',
      source: 'Carvalho & Pianowski (2024). Five-factor traits. 誠実性（自己規律）',
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
      text: 'ToDoアプリやメモで、やることを可視化して管理している',
      source: 'Nygren et al. (2023). Personality and Social Media. デジタル誠実性（秩序）',
      weights: [0, 0, 0, 2, 1, -1, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '外界への態度',
      emoji: '🦋',
      text: '校則や職場のルールに疑問を感じることが多い',
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
      text: '何かを決めるとき、ギリギリまで他の選択肢を探し続けてしまう',
      source: 'Rozgonjuk et al. (2023). Personality, FoMO and social media. 知覚型の意思決定遅延',
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
      text: '買い物やプラン選びで、何度も比較サイトやレビューを見てしまう',
      source: 'Rozgonjuk et al. (2023). Personality and FoMO. デジタル慎重性',
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
      text: '新しいことを始める前に、ネットで徹底リサーチするタイプだ',
      source: 'Rozgonjuk et al. (2023). Personality and FoMO. デジタル慎重性と情報収集',
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
      text: '考えるより先に、とりあえずやってみる派だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Te/Se型の行動パターン',
      weights: [0, 0, 0, 0, 3, 1, 0, 1, 1],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🤔',
      text: '失敗するリスクがあると、なかなか一歩を踏み出せない',
      source: 'Roberts et al. (2025). FoMO and university students. 回避行動と慎重性',
      weights: [0, 0, 0, 0, -3, -1, 0, -1, -1],
    },

    // ========================================
    // セクション6: 感情表現（8問） - H/C軸メイン
    // ========================================
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '😢',
      text: '推しの活動や好きな作品に感情を揺さぶられやすい',
      source: 'Montag et al. (2021). Psychology of TikTok Use. コンテンツ消費と感情反応性',
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
      text: 'ハマったコンテンツやゲームは時間を忘れて没頭してしまう',
      source: 'Montag et al. (2021). Psychology of TikTok Use. デジタル没入体験',
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
      text: '嬉しいことや腹が立つことをSNSやチャットですぐ発信する',
      source: 'Teng et al. (2025). Self-disclosure on social media. デジタル感情表出',
      weights: [1, 0, 0, 0, 1, 2, 0, 1, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🏔️',
      text: '内心イラッとしても、表情やメッセージには出さない',
      source: 'Liu et al. (2021). Online Identity Reconstruction. オンラインでの感情抑制',
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
      text: '自分の本音をSNSやチャットで発信するのは抵抗がある',
      source: 'Li & Chen (2022). Personality and online self-disclosure. デジタル感情抑制',
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
      text: 'SNSのコメントやリアクションで気分が左右されることがある',
      source: 'Wacks & Weinstein (2025). Mental health by smartphone and Instagram use. デジタル情動反応性',
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
      text: '嫌なことがあった日は、寝る前にスマホを見ながらずっと考えてしまう',
      source: 'Hedlund et al. (2025). Social media restriction and well-being. デジタル反芻思考',
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
      text: 'クラス替えやバイト先が変わっても、すぐに馴染める',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 安定性メタ特性',
      weights: [0, 0, 0, 0, 0, 0, 2, 0, 2],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '🎢',
      text: 'テンションが高い時と落ち込む時の差が大きいと思う',
      source: 'Luo et al. (2025). Self-esteem responses to social media feedback loops. 情動調節',
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
      text: '自分の意見があっても、場の空気を読んで合わせてしまう',
      source: 'Teng et al. (2025). Self-presentation on social media. デジタル時代の協調性',
      weights: [0, 0, -1, 0, -1, 0, 0, -3, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🦁',
      text: 'グループワークや文化祭では、自然とまとめ役を引き受ける',
      source: 'Hou et al. (2024). Personality and social media. リーダーシップのデジタル表出',
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
      text: '友達に誘われたら、気が乗らなくても断れない',
      source: 'Rozgonjuk et al. (2023). Personality and FoMO. FOMO関連の同調行動',
      weights: [0, 0, -1, 0, -1, 0, -1, -2, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🏆',
      text: '相手を説得して自分の提案を通すのが得意だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Te/Fe型の対人影響力',
      weights: [1, 0, 0, 0, 1, 1, 0, 2, 1],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🌸',
      text: 'SNSやプレゼンで自分をアピールするのが苦手だ',
      source: 'Liu et al. (2021). Online Identity Reconstruction. デジタル自己呈示の回避',
      weights: [-1, 0, 0, 0, -1, -1, -1, -3, 0],
    },

    // ========================================
    // セクション9: 変化への対応（8問） - 適応柔軟性メイン
    // ========================================
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🌪️',
      text: 'ドタキャンや急な予定変更にもすぐ切り替えられる',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（柔軟性）',
      weights: [0, 0, 0, 0, 0, 0, 0, 0, 3],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🏠',
      text: '朝の支度や寝る前の習慣など、毎日のルーティンを崩したくない',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 誠実性（習慣性）',
      weights: [0, 0, 0, 0, 0, 0, 0, 0, -3],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🌍',
      text: '新しいバイト先や学校でも、すぐに打ち解けられる',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 開放性（経験への開放）',
      weights: [1, 0, 0, 0, 1, 0, 1, 0, 2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🔁',
      text: '変化が多いと疲れる',
      source: 'Eysenck, H.J. (1967). The Biological Basis of Personality. 覚醒水準と刺激耐性',
      weights: [0, 0, 0, 0, 0, 0, 0, 0, -2],
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
      weights: [0, 0, 0, 0, 0, 0, 0, 0, -2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🌈',
      text: '異なる価値観を受け入れられる',
      source: 'John, O.P. & Srivastava, S. (1999). Big Five Taxonomy. 開放性（価値観）',
      weights: [0, 0, 0, 0, 0, 0, 0, 0, 3],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🛤️',
      text: '昔からのやり方やルールは、簡単に変えるべきではないと思う',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性（逆転・保守性）',
      weights: [0, 0, 0, 0, 0, 0, 0, 0, -3],
    },
  ],

  // --- 結果タイプ（128タイプ: 別ファイルからインポート） ---
  resultTypes: allTypes,

  // --- メタ情報 ---
  questionCount: 72,
  estimatedMinutes: 18,
  hashtags: ['#MBTI512', '#超精密人格診断', '#512タイプ', '#診断研究所', '#性格診断', '#人格進化'],
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
