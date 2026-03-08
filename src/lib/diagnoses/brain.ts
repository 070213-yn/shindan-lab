/**
 * 脳タイプ診断
 *
 * 理論基盤:
 *   - Herrmann (1996) 全脳モデル(HBDI) — 4象限の思考スタイル
 *   - Sperry (1981) 左右脳理論 — 左脳の論理性と右脳の創造性
 *   - Kahneman (2011) システム1/システム2 — 直感的思考と分析的思考
 *   - Sternberg (1985) 知能の三頭理論 — 分析的・創造的・実践的知能
 *
 * 8次元: 論理的思考, 構造的思考, 感情的思考, 直感的思考, 分析力, 統合力, 記憶力, 処理速度
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const brainDiagnosis: DiagnosisConfig = {
  id: 'brain',
  title: '脳タイプ診断',
  subtitle: 'あなたの脳はどっちが強い？',
  catchphrase: '思考のクセ、全部バレちゃいます——',
  description:
    'ヘルマンの全脳モデルやカーネマンのシステム1・2理論をベースに、あなたの脳の「得意分野」と「思考のクセ」を完全解析。自分の脳タイプを知れば、勉強も人間関係ももっとうまくいく！',
  emoji: '🧠',
  themeColor: '#2563EB',
  gradientFrom: '#2563EB',
  gradientTo: '#60A5FA',

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
      min: 8,
      max: 18,
      defaultValue: 14,
      unit: '歳',
    },
  ],

  // --- スコアリング次元（8次元） ---
  dimensions: [
    { key: 'logical', label: '論理的思考', color: '#2563EB' },
    { key: 'structural', label: '構造的思考', color: '#059669' },
    { key: 'emotional', label: '感情的思考', color: '#EC4899' },
    { key: 'intuitive', label: '直感的思考', color: '#F59E0B' },
    { key: 'analytical', label: '分析力', color: '#6366F1' },
    { key: 'integrative', label: '統合力', color: '#14B8A6' },
    { key: 'memory', label: '記憶力', color: '#8B5CF6' },
    { key: 'speed', label: '処理速度', color: '#EF4444' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '問題の解き方',
    2: '記憶の仕方',
    3: '判断の仕方',
    4: '得意な科目',
    5: '思考の癖',
    6: 'アイデアの出し方',
  },

  // --- 質問データ（28問） ---
  // weights: [論理的思考, 構造的思考, 感情的思考, 直感的思考, 分析力, 統合力, 記憶力, 処理速度]
  questions: [
    // === セクション1: 問題の解き方 (5問) ===
    {
      sid: 1,
      sectionName: '問題の解き方',
      emoji: '🔢',
      text: '数学の問題は順番に式を立てて解くのが好きだ',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 左上象限（論理的・分析的思考）',
      weights: [3, 2, 0, -1, 2, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '問題の解き方',
      emoji: '💡',
      text: '答えが先にパッと浮かんで、後から理由を考えることが多い',
      source: 'Kahneman, D. (2011). Thinking, Fast and Slow. システム1（高速・直感的処理）',
      weights: [0, -1, 1, 3, 0, 1, 0, 2],
    },
    {
      sid: 1,
      sectionName: '問題の解き方',
      emoji: '📊',
      text: '問題を解く時、まず全体像を把握してから細かい部分に取りかかる',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 右上象限（全体俯瞰・統合的思考）',
      weights: [0, 1, 0, 1, 1, 3, 0, 0],
    },
    {
      sid: 1,
      sectionName: '問題の解き方',
      emoji: '⏱️',
      text: 'テストでは時間が余ることが多い（解くのが早い方だ）',
      source: 'Sternberg, R.J. (1985). Beyond IQ. 処理速度と実践的知能',
      weights: [0, 0, 0, 1, 0, 0, 0, 3],
    },
    {
      sid: 1,
      sectionName: '問題の解き方',
      emoji: '🧩',
      text: '難しい問題は、小さなパーツに分解して考えるのが得意だ',
      source: 'Kahneman, D. (2011). Thinking, Fast and Slow. システム2（分析的・論理的処理）',
      weights: [2, 2, 0, 0, 3, 0, 0, 0],
    },

    // === セクション2: 記憶の仕方 (5問) ===
    {
      sid: 2,
      sectionName: '記憶の仕方',
      emoji: '🖼️',
      text: '暗記する時は、映像やイメージで覚える方が頭に入りやすい',
      source: 'Sperry, R.W. (1981). Some Effects of Disconnecting the Cerebral Hemispheres. 右脳の視覚・空間的記憶',
      weights: [0, 0, 1, 3, 0, 1, 2, 0],
    },
    {
      sid: 2,
      sectionName: '記憶の仕方',
      emoji: '📝',
      text: '何度も書いて覚えるタイプだ',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 左下象限（計画的・手順的記憶）',
      weights: [1, 3, 0, 0, 0, 0, 2, 0],
    },
    {
      sid: 2,
      sectionName: '記憶の仕方',
      emoji: '🎵',
      text: '歌やリズムに乗せると、不思議と覚えられる',
      source: 'Sperry, R.W. (1981). Some Effects of Disconnecting the Cerebral Hemispheres. 右脳の音楽的・パターン記憶',
      weights: [0, 0, 2, 2, 0, 1, 3, 0],
    },
    {
      sid: 2,
      sectionName: '記憶の仕方',
      emoji: '🗺️',
      text: '教科書のどのあたりに何が書いてあったか、ページの位置で覚えている',
      source: 'Sternberg, R.J. (1985). Beyond IQ. 空間的記憶と分析的知能',
      weights: [0, 1, 0, 1, 1, 0, 3, 0],
    },
    {
      sid: 2,
      sectionName: '記憶の仕方',
      emoji: '🔗',
      text: '覚える時は「これとこれはつながっている」と関連づけて記憶する',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 統合的思考と連想記憶',
      weights: [1, 0, 0, 1, 1, 3, 2, 0],
    },

    // === セクション3: 判断の仕方 (5問) ===
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🤔',
      text: '大事なことを決める時、メリットとデメリットをリストにして比較する',
      source: 'Kahneman, D. (2011). Thinking, Fast and Slow. システム2による意思決定',
      weights: [3, 2, 0, 0, 2, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '❤️',
      text: '結局、最後は「自分がどう感じるか」で決めることが多い',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 右下象限（感情的・共感的処理）',
      weights: [0, 0, 3, 2, 0, 0, 0, 1],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '⚡',
      text: '迷ったら直感を信じる。そしてだいたい当たる',
      source: 'Kahneman, D. (2011). Thinking, Fast and Slow. システム1のヒューリスティクス',
      weights: [0, 0, 0, 3, 0, 1, 0, 2],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '📋',
      text: '計画を立ててから行動する方が安心する',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 左下象限（堅実・計画的判断）',
      weights: [1, 3, 0, -1, 1, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: '判断の仕方',
      emoji: '🫂',
      text: '相手の気持ちを考えすぎて、自分の判断が遅くなることがある',
      source: 'Sternberg, R.J. (1985). Beyond IQ. 感情知性と意思決定の遅延',
      weights: [0, 0, 3, 0, 0, 1, 0, -1],
    },

    // === セクション4: 得意な科目 (5問) ===
    {
      sid: 4,
      sectionName: '得意な科目',
      emoji: '🔬',
      text: '理科の実験で「なぜそうなるか」を考えるのが楽しい',
      source: 'Sternberg, R.J. (1985). Beyond IQ. 分析的知能と科学的思考',
      weights: [2, 0, 0, 0, 3, 1, 0, 0],
    },
    {
      sid: 4,
      sectionName: '得意な科目',
      emoji: '🎨',
      text: '美術や音楽など、自分を表現する科目が好きだ',
      source: 'Sperry, R.W. (1981). Some Effects of Disconnecting. 右脳の芸術的・創造的処理',
      weights: [0, 0, 2, 3, 0, 1, 0, 0],
    },
    {
      sid: 4,
      sectionName: '得意な科目',
      emoji: '📖',
      text: '国語の読解問題で、登場人物の気持ちを読み取るのが得意だ',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 右下象限（感情理解・共感力）',
      weights: [0, 0, 3, 1, 1, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '得意な科目',
      emoji: '🗓️',
      text: '社会科は年表や出来事を順番に整理して覚えるのが好きだ',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 左下象限（時系列・構造化記憶）',
      weights: [0, 3, 0, 0, 0, 1, 2, 0],
    },
    {
      sid: 4,
      sectionName: '得意な科目',
      emoji: '🧮',
      text: '暗算や計算が速い方だと思う',
      source: 'Sternberg, R.J. (1985). Beyond IQ. 数的処理速度と分析的知能',
      weights: [2, 0, 0, 0, 1, 0, 0, 3],
    },

    // === セクション5: 思考の癖 (4問) ===
    {
      sid: 5,
      sectionName: '思考の癖',
      emoji: '🔄',
      text: '一つのことを考え始めると、関連するいろいろなことが次々に浮かぶ',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 右上象限（拡散的思考・連想）',
      weights: [0, 0, 0, 2, 0, 3, 0, 1],
    },
    {
      sid: 5,
      sectionName: '思考の癖',
      emoji: '🔍',
      text: '何かを見ると「なぜ？」「どうして？」と原因を探りたくなる',
      source: 'Kahneman, D. (2011). Thinking, Fast and Slow. システム2の因果推論',
      weights: [3, 0, 0, 0, 3, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: '思考の癖',
      emoji: '🌀',
      text: 'ぼーっとしている時に、突然すごいアイデアが浮かぶことがある',
      source: 'Sperry, R.W. (1981). Some Effects of Disconnecting. デフォルトモードネットワークと創造性',
      weights: [0, 0, 0, 3, 0, 2, 0, 0],
    },
    {
      sid: 5,
      sectionName: '思考の癖',
      emoji: '📦',
      text: '情報を整理するのが好きで、ノートや部屋をキレイに分類したい',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 左下象限（秩序・分類への欲求）',
      weights: [1, 3, 0, 0, 1, 0, 1, 0],
    },

    // === セクション6: アイデアの出し方 (4問) ===
    {
      sid: 6,
      sectionName: 'アイデアの出し方',
      emoji: '🚿',
      text: 'お風呂に入っている時や散歩中に、いいアイデアが浮かぶことが多い',
      source: 'Sperry, R.W. (1981). Some Effects of Disconnecting. リラックス時の右脳活性化',
      weights: [0, 0, 0, 3, 0, 2, 0, 0],
    },
    {
      sid: 6,
      sectionName: 'アイデアの出し方',
      emoji: '📚',
      text: 'まずデータや事実を集めてから、考えをまとめるタイプだ',
      source: 'Kahneman, D. (2011). Thinking, Fast and Slow. エビデンスベースのシステム2的思考',
      weights: [3, 1, 0, 0, 2, 0, 1, 0],
    },
    {
      sid: 6,
      sectionName: 'アイデアの出し方',
      emoji: '🤝',
      text: '人と話しているうちに、自分の考えがまとまっていくことが多い',
      source: 'Herrmann, N. (1996). The Whole Brain Business Book. 右下象限（対話的思考と共感的統合）',
      weights: [0, 0, 2, 1, 0, 2, 0, 1],
    },
    {
      sid: 6,
      sectionName: 'アイデアの出し方',
      emoji: '🎲',
      text: '全然関係ないものを組み合わせて、新しいものを作るのが好きだ',
      source: 'Sternberg, R.J. (1985). Beyond IQ. 創造的知能と遠隔連想',
      weights: [0, 0, 0, 2, 0, 3, 0, 1],
    },
  ],

  // --- 結果タイプ（14種類） ---
  resultTypes: [
    {
      id: 'left_master',
      emoji: '🧮🔥',
      name: '左脳マスター（論理の鬼）',
      tag: '#数字と理屈で世界を解く',
      color: '#2563EB',
      description:
        'あなたの脳は圧倒的に左脳優位。論理的で筋道立てた思考が得意で、数字やデータを扱うのが大好き。感情に流されず、冷静に物事を判断できる「論理の鬼」です。',
      advice:
        'その論理力はテストでも社会でも最強の武器。ただ、たまには感覚で動いてみて。ロジックだけじゃ見えない世界もあるよ。音楽やアートに触れると新しい自分が見つかるかも。',
      traits: ['論理的思考の達人', 'データ重視', '冷静な判断力', '数字に強い'],
      scoreWeights: [3, 2, -1, -1, 3, 0, 0, 1],
    },
    {
      id: 'right_master',
      emoji: '🎨✨',
      name: '右脳マスター（感覚の天才）',
      tag: '#感性で世界を彩る',
      color: '#EC4899',
      description:
        'あなたの脳は圧倒的に右脳優位。イメージやインスピレーションで物事を捉え、言葉にできない「なんとなく」の感覚が鋭い。芸術家肌の感覚の天才です。',
      advice:
        'その感性は唯一無二の才能。創作活動でどんどん発揮しよう。ただ、大事な場面では少し立ち止まって論理的に考える練習もすると、鬼に金棒だよ。',
      traits: ['豊かな感性', '直感力', 'イメージ思考', '芸術的センス'],
      scoreWeights: [-1, -1, 2, 3, 0, 2, 1, 0],
    },
    {
      id: 'whole_brain',
      emoji: '⚖️🧠',
      name: '全脳バランサー',
      tag: '#左右の脳を自在に操る',
      color: '#8B5CF6',
      description:
        'あなたは左脳も右脳もバランスよく使える珍しいタイプ。論理的に考えることも、感覚的にひらめくこともできる。どんな場面にも対応できる万能型の脳を持っています。',
      advice:
        'バランスの良さは最大の強み。でも「全部そこそこ」で終わらないように、特に好きな分野を一つ極めてみて。バランス型こそ、特化した時に最強になれるよ。',
      traits: ['左右脳のバランス', '柔軟な思考', '適応力', '多角的な視点'],
      scoreWeights: [1, 1, 1, 1, 1, 2, 1, 1],
    },
    {
      id: 'sherlock',
      emoji: '🔍🎯',
      name: '分析特化型シャーロック',
      tag: '#観察と推理で真実を暴く',
      color: '#1E40AF',
      description:
        'あなたの脳は分析に特化している。細かい違いに気づき、原因と結果を見抜く力が異常に高い。名探偵のような観察力と推理力の持ち主です。',
      advice:
        '分析力は問題解決の最強ツール。理科や社会の「なぜ？」を追求すると、あなたの才能はもっと輝くよ。ただ分析しすぎて行動が遅くなる時は「とりあえずやってみる」も大事。',
      traits: ['圧倒的分析力', '細部への気づき', '因果関係の理解', '問題解決能力'],
      scoreWeights: [2, 1, 0, 0, 3, 0, 1, 1],
    },
    {
      id: 'artist',
      emoji: '🎭🌈',
      name: '直感特化型アーティスト',
      tag: '#ひらめきで世界を変える',
      color: '#DB2777',
      description:
        'あなたの脳は直感に特化している。理屈よりも「なんとなくこうだ」という感覚を大切にし、それが驚くほど当たる。常識にとらわれない発想ができるアーティスト脳です。',
      advice:
        'その直感力は天性のもの。絵、音楽、文章など何でもいいから創作に挑戦してみて。直感を形にする力を磨けば、あなたにしか作れない作品が生まれるよ。',
      traits: ['鋭い直感', '芸術的発想', '常識を超える力', 'インスピレーション体質'],
      scoreWeights: [0, 0, 1, 3, 0, 2, 0, 0],
    },
    {
      id: 'memory_monster',
      emoji: '🗄️👾',
      name: '記憶力の怪物',
      tag: '#一度見たら忘れない',
      color: '#7C3AED',
      description:
        'あなたの脳は記憶力が突出している。一度見たこと・聞いたことを鮮明に覚えていて、テスト前の暗記は得意中の得意。まるで脳にハードディスクが入っているような記憶の怪物です。',
      advice:
        '記憶力は勉強の最強チート。でも「覚えるだけ」じゃなく「なぜそうなるか」まで考えると、もっと深い理解ができるよ。記憶力×思考力で敵なしになろう。',
      traits: ['驚異的記憶力', '細部の記憶', 'パターン記憶', '情報の保持力'],
      scoreWeights: [0, 1, 0, 0, 0, 0, 3, 0],
    },
    {
      id: 'speed_god',
      emoji: '⚡🏎️',
      name: '処理速度の神',
      tag: '#脳のクロック数が異常',
      color: '#EF4444',
      description:
        'あなたの脳は処理速度が異常に速い。問題を見た瞬間に解き方がわかるし、判断もスピーディー。頭の回転が速すぎて、周りがスローモーションに見えるタイプです。',
      advice:
        'スピードは最大の武器。でも速さだけに頼ると見落としも増えるよ。「急がば回れ」を意識して、大事な場面では丁寧に考える習慣もつけよう。速さ×丁寧さで無双できるよ。',
      traits: ['高速処理', '瞬時の判断', '回転の速さ', '即答力'],
      scoreWeights: [0, 0, 0, 1, 0, 0, 0, 3],
    },
    {
      id: 'philosopher',
      emoji: '🦉📜',
      name: '深い思考の哲学者',
      tag: '#考えることが好きすぎる',
      color: '#4338CA',
      description:
        'あなたの脳は深く考えることに特化している。表面的な答えでは満足せず、「なぜ？」「本当に？」と掘り下げる思考の深さを持つ。物事の本質を見抜く哲学者タイプです。',
      advice:
        '深い思考は知性の証。でも考えすぎて動けなくなることもあるから注意。「70%の確信で動く」を意識してみて。深く考えて素早く動ける人は、誰にも止められないよ。',
      traits: ['思考の深さ', '本質を見抜く力', '粘り強い探究心', '知的好奇心'],
      scoreWeights: [2, 0, 0, 0, 3, 1, 1, -1],
    },
    {
      id: 'pattern_master',
      emoji: '🧩🔮',
      name: 'パターン認識の達人',
      tag: '#法則を見つけ出す天才',
      color: '#0891B2',
      description:
        'あなたの脳はパターン認識が抜群。バラバラに見える情報から共通点や法則を見つけ出し、「次に何が起きるか」を予測できる力を持っています。データサイエンティスト的な脳です。',
      advice:
        'パターン認識力はAI時代に最も求められる能力の一つ。数学やプログラミングと相性抜群だよ。パズルゲームや数独で鍛え続けると、もっと伸びるよ。',
      traits: ['法則発見力', 'パターン認識', '予測能力', 'データ感覚'],
      scoreWeights: [1, 2, 0, 1, 2, 2, 1, 0],
    },
    {
      id: 'multitask',
      emoji: '🐙💨',
      name: 'マルチタスクの天才',
      tag: '#同時に何でもこなす',
      color: '#059669',
      description:
        'あなたの脳は複数のことを同時にこなすのが得意。音楽を聴きながら勉強したり、LINEしながらテレビを見たり。脳の並列処理能力が高い、マルチタスクの天才です。',
      advice:
        'マルチタスク力は現代社会で超有利。ただ、大事な場面ではシングルタスクで集中する方がミスが減るよ。「集中する時」と「並列する時」を使い分けられれば最強だよ。',
      traits: ['並列処理能力', '注意力の分散', '柔軟な切り替え', '効率重視'],
      scoreWeights: [0, 0, 1, 1, 0, 2, 0, 3],
    },
    {
      id: 'sniper',
      emoji: '🎯🔇',
      name: '集中特化型スナイパー',
      tag: '#一点突破の集中砲火',
      color: '#1F2937',
      description:
        'あなたの脳は一つのことへの集中力が異常。好きなことや興味があることに対しては、周りの声も聞こえなくなるほどの没頭力を持つ。深く掘り下げるスナイパータイプです。',
      advice:
        '集中力は最強の才能。好きな分野を見つけて極めれば、誰にも負けない専門家になれるよ。ただ集中しすぎて周りが見えなくなる時があるから、タイマーを使うのもアリだよ。',
      traits: ['圧倒的集中力', '没頭力', '一点突破', '深い探究'],
      scoreWeights: [1, 1, 0, 0, 2, 0, 1, 0],
    },
    {
      id: 'verbal_brain',
      emoji: '📝🗣️',
      name: '言語脳の持ち主',
      tag: '#言葉を操る魔術師',
      color: '#B45309',
      description:
        'あなたの脳は言語処理が得意。文章を書くのも、話すのも上手で、言葉で人の心を動かす力がある。頭の中で言葉がどんどん湧いてくる、言語の天才です。',
      advice:
        '言語力はどんな仕事でも役立つ最強スキル。ブログ、作文、スピーチなど、言葉を使う機会を増やしてみて。将来、言葉で世界を変えるかもしれないよ。',
      traits: ['言語処理の速さ', '表現力', '語彙力', '説得力'],
      scoreWeights: [1, 1, 1, 0, 1, 1, 2, 1],
    },
    {
      id: 'spatial_brain',
      emoji: '🗺️🏗️',
      name: '空間把握の超能力者',
      tag: '#3Dで世界を見ている',
      color: '#0D9488',
      description:
        'あなたの脳は空間認識が抜群。地図を読むのが得意だし、立体的なものをイメージするのもお手の物。頭の中で3Dモデルを回転させられる、空間把握の超能力者です。',
      advice:
        '空間把握力は建築、ゲーム制作、デザインなどで大活躍する力。レゴやマインクラフト、3Dモデリングに挑戦してみて。あなたの脳が一番輝く場所が見つかるよ。',
      traits: ['空間認識力', '立体イメージ力', '方向感覚', '設計能力'],
      scoreWeights: [0, 2, 0, 2, 0, 1, 1, 1],
    },
    {
      id: 'emotional_wizard',
      emoji: '💖🔮',
      name: '感情知性の魔法使い',
      tag: '#心を読む超能力',
      color: '#E11D48',
      description:
        'あなたの脳は感情の処理が極めて高い。人の気持ちを察するのが得意で、場の空気を読む力が抜群。相手が何を考えているか、表情や声のトーンだけで分かってしまう、感情知性の魔法使いです。',
      advice:
        '感情知性（EQ）はAIには真似できない人間だけの力。カウンセラー、先生、リーダーなど、人に関わる場面でその力は最大限発揮されるよ。自分の気持ちも大切にしてね。',
      traits: ['感情理解力', '共感力', '空気を読む力', '人の心に寄り添う力'],
      scoreWeights: [0, 0, 3, 1, 0, 1, 0, 0],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#脳タイプ診断', '#右脳左脳', '#思考スタイル', '#脳力テスト'],
  references: [
    'Herrmann, N. (1996). The Whole Brain Business Book: Unlocking the Power of Whole Brain Thinking in Organizations and Individuals. McGraw-Hill.',
    'Sperry, R.W. (1981). Some Effects of Disconnecting the Cerebral Hemispheres. Nobel Lecture, December 8, 1981.',
    'Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.',
    'Sternberg, R.J. (1985). Beyond IQ: A Triarchic Theory of Human Intelligence. Cambridge University Press.',
  ],
};
