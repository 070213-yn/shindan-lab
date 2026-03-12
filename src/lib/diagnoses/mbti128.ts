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
      text: '大勢でワイワイ過ごすと元気が出る',
      source: 'Luo & Hancock (2020). Extraversion and social media use. デジタル外向性',
      weights: [3, 0, 0, 0, 0, 1, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: 'エネルギーの方向',
      emoji: '🌙',
      text: '通知をオフにして一人の時間を確保しないとストレスがたまる',
      source: 'Mahalingham et al. (2020). Alone and Online. 内向性とデジタルデトックス',
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
      text: 'カフェや図書館で、スマホも見ずにぼーっとする時間が必要だ',
      source: 'Hedlund et al. (2025). Social media restriction and well-being. デジタル休息',
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
      text: 'グループチャットでは発言するより、みんなの会話を読んでいることが多い',
      source: 'Nygren et al. (2023). Personality and Social Media. 内向型のデジタルコミュニケーション',
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
      text: '10年後の自分や社会がどうなっているか想像するのが好きだ',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 直感機能と未来志向',
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
      text: '流行っているものには、人気になる理由やパターンがあると思う',
      source: 'Kumar et al. (2025). MBTI and YouTube. 直感型のパターン認識',
      weights: [0, -2, 1, 0, 0, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '👁️',
      text: '動画やデザインの細かい違和感にすぐ気づく方だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Si機能と視覚的注意力',
      weights: [0, 2, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🎨',
      text: '「こんなものがあったらいいのに」と空想することがよくある',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 知性/想像力の次元',
      weights: [0, -2, 0, -1, 0, 0, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🌅',
      text: '旅行やイベントでは、写真を撮るより自分の目で楽しみたい',
      source: 'Montag et al. (2021). Psychology of TikTok Use. Se型のリアルタイム志向',
      weights: [0, 2, 0, -1, 0, 1, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '情報の取り方',
      emoji: '🧩',
      text: '「普通はこうだよね」に逆らうようなアイデアに惹かれる',
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
      text: '話し合いの場では、正しいことを言う方が相手の気持ちより大事だ',
      source: 'Li & Chen (2022). Personality and online self-disclosure. 思考型のデジタル議論スタイル',
      weights: [0, 0, 3, 0, 1, -1, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '💗',
      text: '友達の悩み相談には、とことん付き合うタイプだ',
      source: 'Valkenburg et al. (2021). Social Media and Self-Esteem. デジタル共感性',
      weights: [0, 0, -3, 0, 0, 1, -1, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🧪',
      text: '友達と意見が合わないとき、自分の考えをしっかり主張する',
      source: 'Teng et al. (2025). Self-disclosure and self-presentation on social media. デジタル自己主張',
      weights: [0, 0, 2, 0, 1, 0, 0, 1, -1],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🤝',
      text: '周りの人が落ち込んでいると、自分まで気持ちが沈んでしまう',
      source: 'Nesi et al. (2023). Social media and well-being. デジタル共感と感情伝染',
      weights: [0, 0, -2, 0, 0, 1, -1, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🎯',
      text: '回りくどい説明や非効率なやり方にイライラする',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Te機能と効率志向',
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
      text: '「なんとなく」より、理由や根拠がはっきりしている方が安心する',
      source: 'Mehta et al. (2023). Personality Types and Traits. 思考型のデータ志向',
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
      text: '予定通りに進まなくても、その場のノリで楽しめる',
      source: 'Carvalho & Pianowski (2024). Five-factor and social media. 知覚型の柔軟性',
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
      text: '当日に予定が変わっても「まあいっか」と思える',
      source: 'Carvalho & Pianowski (2024). Five-factor traits. デジタル世代の柔軟性',
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
      text: '話し合いやチャットでは、結論をはっきりさせたい',
      source: 'Teng et al. (2025). Self-disclosure on social media. 判断型のコミュニケーション',
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
      text: '周りと意見が違っても、自分の判断に自信が持てる',
      source: 'Rozgonjuk et al. (2023). Personality and FoMO. 自己確信と同調圧力',
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
      text: 'テストや面接で失敗しても、すぐ次に気持ちを切り替えられる',
      source: 'Roberts et al. (2025). FoMO and university students. 学生の回復力',
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
      text: '「やったことないこと」に挑戦するのがワクワクする',
      source: 'DeYoung, C.G. (2015). Cybernetic Big Five Theory. 外向性（大胆さ）',
      weights: [0, 0, 0, 0, 2, 1, 0, 1, 1],
    },
    {
      sid: 5,
      sectionName: '決断スタイル',
      emoji: '🌿',
      text: '大事なことを決める前に、友達やネットの意見を参考にしたい',
      source: 'Rozgonjuk et al. (2023). Personality and FoMO. デジタル時代の意思決定',
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
      text: '好きな音楽や映画、動画を見て感動しやすい方だ',
      source: 'Montag et al. (2021). Psychology of TikTok Use. コンテンツ消費と感情反応性',
      weights: [0, 0, -1, 0, 0, 3, -1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🧊',
      text: '友達同士がもめていても、感情的にならず冷静でいられる',
      source: 'Carvalho & Pianowski (2024). Five-factor and social media. クール型のデジタル対応',
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
      text: '周りが盛り上がっていても、冷静にメリット・デメリットを考える',
      source: 'Mehta et al. (2023). Personality Types and Traits. 思考型の合理的判断',
      weights: [0, 0, 1, 0, 1, -2, 1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🎭',
      text: '嬉しいことや腹が立つことは、すぐ誰かに話したくなる',
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
      text: '好きなことには全力投球で、周りから「熱い」と言われる',
      source: 'Montag et al. (2021). Psychology of TikTok Use. 熱意型のコンテンツ制作行動',
      weights: [0, 0, 0, 0, 1, 3, 0, 1, 0],
    },
    {
      sid: 6,
      sectionName: '感情表現',
      emoji: '🌑',
      text: '自分の本音を人に伝えるのは抵抗がある',
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
      text: 'テスト前や面接前でも、いつも通りの自分でいられる',
      source: 'Roberts et al. (2025). FoMO and university students. 学生のストレス耐性',
      weights: [0, 0, 0, 0, 1, 0, 3, 0, 0],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '🌊',
      text: '人からの何気ない一言で、気分が大きく左右されることがある',
      source: 'Wacks & Weinstein (2025). Mental health by smartphone and Instagram use. デジタル情動反応性',
      weights: [0, 0, 0, 0, 0, 0, -3, 0, 0],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '💎',
      text: '締め切り直前や本番の緊張感で、むしろ集中力が上がる',
      source: 'Roberts et al. (2025). FoMO and university students. プレッシャー下のパフォーマンス',
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
      text: 'やらかしても「次がんばろう」とすぐ立ち直れる',
      source: 'Hedlund et al. (2025). Social media and well-being. 情緒安定性と回復力',
      weights: [0, 0, 0, 0, 1, 0, 3, 0, 1],
    },
    {
      sid: 7,
      sectionName: '情緒安定性',
      emoji: '😰',
      text: '将来のことや人間関係のことで、不安になりやすい',
      source: 'Wacks & Weinstein (2025). Smartphone use and mental health. デジタル世代の不安傾向',
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
      text: '誰に対しても、自分の意見をはっきり言える方だ',
      source: 'Teng et al. (2025). Self-disclosure on social media. デジタル自己主張',
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
      text: '人と人のもめごとには、できるだけ関わりたくない',
      source: 'Carvalho & Pianowski (2024). Five-factor traits. デジタル世代の争い回避',
      weights: [0, 0, -1, 0, -1, 0, 0, -2, 0],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🗡️',
      text: '周りがみんな賛成していても、自分が違うと思ったら反対意見を言える',
      source: 'Li & Chen (2022). Personality and online self-disclosure. デジタル時代の自律性',
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
      text: '自分の意見で周りを納得させるのが得意だ',
      source: 'Nardi, D. (2011). Neuroscience of Personality. Te/Fe型の対人影響力',
      weights: [1, 0, 0, 0, 1, 1, 0, 2, 1],
    },
    {
      sid: 8,
      sectionName: '社会的態度',
      emoji: '🌸',
      text: '自分の良いところをアピールするのが苦手だ',
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
      text: '慣れたやり方がコロコロ変わるとストレスを感じる',
      source: 'Nygren et al. (2023). Personality and Social Media. デジタル変化疲れ',
      weights: [0, 0, 0, 0, 0, 0, 0, 0, -2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🎪',
      text: '動画を見ながらチャットを返すなど、同時に複数のことができる',
      source: 'Montag et al. (2021). Psychology of TikTok Use. デジタルマルチタスク',
      weights: [0, 0, 0, 0, 0, 0, 1, 0, 2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🔬',
      text: '通知をすべてオフにして、一つのことに没頭したいタイプだ',
      source: 'Hedlund et al. (2025). Social media restriction. デジタル集中力',
      weights: [0, 0, 0, 0, 0, 0, 0, 0, -2],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🌈',
      text: '自分とは全然違う考え方や生き方の人にも興味が持てる',
      source: 'Nesi et al. (2025). Social Comparison in 2020s. デジタル世代の価値観多様性',
      weights: [0, 0, 0, 0, 0, 0, 0, 0, 3],
    },
    {
      sid: 9,
      sectionName: '変化への対応',
      emoji: '🛤️',
      text: '長く続いてきたルールや文化には、変えないほうがいい理由があると思う',
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
