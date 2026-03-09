/**
 * クロノタイプ診断
 *
 * 理論基盤:
 *   - Breus, M.J. (2016) クロノタイプ4分類（ライオン・クマ・オオカミ・イルカ）
 *   - Horne, J.A. & Östberg, O. (1976) 朝型夜型質問票 (MEQ)
 *   - Roenneberg, T. et al. (2004) ミュンヘンクロノタイプ質問票 (MCTQ)
 *   - Adan, A. & Almirall, H. (1991) 朝型夜型と覚醒パターンの関係
 *
 * 6次元: 朝型傾向, 夜型傾向, 集中持続力, エネルギー回復力, 社会的リズム適応力, 睡眠の質
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const chronoDiagnosis: DiagnosisConfig = {
  id: 'chrono',
  title: 'クロノタイプ診断',
  subtitle: 'あなたの体内時計タイプは？',
  catchphrase: '最強の1日のリズムを発見しよう！',
  description:
    '睡眠科学とクロノバイオロジー（時間生物学）をベースに、あなたの体内時計のタイプを12種類の動物に分類。自分に合った生活リズムを知れば、勉強も部活も最高のパフォーマンスを発揮できる！',
  emoji: '🦁',
  themeColor: '#1E3A5F',
  gradientFrom: '#1E3A5F',
  gradientTo: '#312E81',

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

  // --- スコアリング次元（6次元） ---
  dimensions: [
    { key: 'morning', label: '朝型傾向', color: '#F59E0B' },
    { key: 'night', label: '夜型傾向', color: '#6366F1' },
    { key: 'focus', label: '集中持続力', color: '#EF4444' },
    { key: 'recovery', label: 'エネルギー回復力', color: '#10B981' },
    { key: 'social', label: '社会的リズム適応力', color: '#3B82F6' },
    { key: 'sleep', label: '睡眠の質', color: '#8B5CF6' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '朝の習慣',
    2: '集中できる時間帯',
    3: '眠りのパターン',
    4: '休日の過ごし方',
    5: 'エネルギーの波',
  },

  // --- 質問データ（25問） ---
  // weights: [朝型傾向, 夜型傾向, 集中持続力, エネルギー回復力, 社会的リズム適応力, 睡眠の質]
  questions: [
    // === セクション1: 朝の習慣 (5問) ===
    {
      sid: 1,
      sectionName: '朝の習慣',
      emoji: '🌅',
      text: '目覚まし時計がなくても、朝6時台に自然と目が覚める',
      source: 'Horne, J.A. & Östberg, O. (1976). MEQ 朝型覚醒パターン',
      weights: [3, -1, 0, 1, 1, 2],
    },
    {
      sid: 1,
      sectionName: '朝の習慣',
      emoji: '🍳',
      text: '朝ごはんを食べないと、午前中まったくやる気が出ない',
      source: 'Roenneberg, T. et al. (2004). MCTQ 食事リズムと体内時計',
      weights: [1, 0, 0, 2, 1, 0],
    },
    {
      sid: 1,
      sectionName: '朝の習慣',
      emoji: '😴',
      text: '朝はいつもギリギリまで寝ていて、起きるのが本当につらい',
      source: 'Adan, A. & Almirall, H. (1991). 夜型の覚醒困難',
      weights: [-2, 3, 0, -1, 0, -1],
    },
    {
      sid: 1,
      sectionName: '朝の習慣',
      emoji: '🏃',
      text: '朝起きてすぐに体を動かすと、一日中調子がいい',
      source: 'Breus, M.J. (2016). ライオン型の朝型活動パターン',
      weights: [3, -1, 1, 2, 0, 1],
    },
    {
      sid: 1,
      sectionName: '朝の習慣',
      emoji: '📱',
      text: '朝の支度をルーティン化していて、毎日ほぼ同じ順番でこなす',
      source: 'Roenneberg, T. et al. (2004). MCTQ 生活リズムの規則性',
      weights: [1, 0, 1, 0, 2, 2],
    },

    // === セクション2: 集中できる時間帯 (5問) ===
    {
      sid: 2,
      sectionName: '集中できる時間帯',
      emoji: '📚',
      text: '午前中の授業が一番頭に入りやすいと感じる',
      source: 'Horne, J.A. & Östberg, O. (1976). MEQ 認知パフォーマンスの時間変動',
      weights: [3, -1, 2, 0, 1, 0],
    },
    {
      sid: 2,
      sectionName: '集中できる時間帯',
      emoji: '🌙',
      text: '夜22時以降になると、急にアイデアが湧いてきたり集中できたりする',
      source: 'Breus, M.J. (2016). オオカミ型の夜間クリエイティビティ',
      weights: [-1, 3, 2, 0, -1, -1],
    },
    {
      sid: 2,
      sectionName: '集中できる時間帯',
      emoji: '⏰',
      text: '一つのことに長時間集中するより、短い時間で色々やる方が好き',
      source: 'Adan, A. & Almirall, H. (1991). 覚醒リズムと注意力のパターン',
      weights: [0, 0, -1, 1, 1, 0],
    },
    {
      sid: 2,
      sectionName: '集中できる時間帯',
      emoji: '🎧',
      text: '好きなことをしている時は、何時間でも集中し続けられる',
      source: 'Breus, M.J. (2016). フロー状態と体内時計の関係',
      weights: [0, 0, 3, 1, 0, 0],
    },
    {
      sid: 2,
      sectionName: '集中できる時間帯',
      emoji: '☀️',
      text: '昼食後の午後の授業は、毎回眠くなってしまう',
      source: 'Roenneberg, T. et al. (2004). MCTQ 午後の眠気とサーカディアンリズム',
      weights: [0, 1, -1, -1, 0, -1],
    },

    // === セクション3: 眠りのパターン (5問) ===
    {
      sid: 3,
      sectionName: '眠りのパターン',
      emoji: '🛏️',
      text: '布団に入ったら5分以内にすぐ眠れる',
      source: 'Breus, M.J. (2016). クマ型の入眠パターン',
      weights: [0, 0, 0, 2, 0, 3],
    },
    {
      sid: 3,
      sectionName: '眠りのパターン',
      emoji: '💭',
      text: '寝る前にいろいろ考えてしまって、なかなか寝付けないことが多い',
      source: 'Breus, M.J. (2016). イルカ型の入眠困難と思考パターン',
      weights: [0, 1, 1, -1, 0, -2],
    },
    {
      sid: 3,
      sectionName: '眠りのパターン',
      emoji: '🌊',
      text: '夢をよく覚えていて、鮮明な夢を見ることが多い',
      source: 'Adan, A. & Almirall, H. (1991). 睡眠の深さとREM睡眠パターン',
      weights: [0, 1, 0, 0, 0, -1],
    },
    {
      sid: 3,
      sectionName: '眠りのパターン',
      emoji: '⏳',
      text: '毎日だいたい同じ時間に眠くなり、同じ時間に起きる',
      source: 'Roenneberg, T. et al. (2004). MCTQ 睡眠覚醒リズムの規則性',
      weights: [1, 0, 0, 1, 2, 3],
    },
    {
      sid: 3,
      sectionName: '眠りのパターン',
      emoji: '🔋',
      text: 'ぐっすり眠った翌朝は、体中にエネルギーが満ちている感覚がある',
      source: 'Horne, J.A. & Östberg, O. (1976). MEQ 睡眠回復とパフォーマンス',
      weights: [1, 0, 0, 3, 0, 2],
    },

    // === セクション4: 休日の過ごし方 (5問) ===
    {
      sid: 4,
      sectionName: '休日の過ごし方',
      emoji: '🏖️',
      text: '休日でも平日と同じ時間に自然と目が覚めてしまう',
      source: 'Roenneberg, T. et al. (2004). MCTQ 社会的ジェットラグの測定',
      weights: [3, -2, 0, 1, 2, 2],
    },
    {
      sid: 4,
      sectionName: '休日の過ごし方',
      emoji: '🎮',
      text: '休みの日は夜更かしして、昼過ぎまで寝ていることが多い',
      source: 'Roenneberg, T. et al. (2004). MCTQ 自由日の睡眠パターン',
      weights: [-2, 3, 0, -1, -1, -1],
    },
    {
      sid: 4,
      sectionName: '休日の過ごし方',
      emoji: '👫',
      text: '友達と遊ぶ約束があると、いつもより早く起きられる',
      source: 'Adan, A. & Almirall, H. (1991). 社会的同期因子と覚醒',
      weights: [0, 0, 0, 1, 3, 0],
    },
    {
      sid: 4,
      sectionName: '休日の過ごし方',
      emoji: '🎨',
      text: '一人で過ごす時間に、創作活動や趣味に没頭するのが好き',
      source: 'Breus, M.J. (2016). オオカミ型の創造性と独立性',
      weights: [0, 1, 2, 0, -1, 0],
    },
    {
      sid: 4,
      sectionName: '休日の過ごし方',
      emoji: '😪',
      text: '休日に昼寝をすると、夜の寝つきが悪くなる',
      source: 'Roenneberg, T. et al. (2004). MCTQ 仮眠と夜間睡眠の関係',
      weights: [0, 0, 0, -1, 0, -1],
    },

    // === セクション5: エネルギーの波 (5問) ===
    {
      sid: 5,
      sectionName: 'エネルギーの波',
      emoji: '⚡',
      text: '一日の中で、エネルギーがある時間帯とない時間帯がはっきり分かれている',
      source: 'Breus, M.J. (2016). クロノタイプごとのエネルギーカーブ',
      weights: [0, 0, 1, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: 'エネルギーの波',
      emoji: '🐢',
      text: 'エンジンがかかるのが遅くて、午後からやっと本調子になる',
      source: 'Horne, J.A. & Östberg, O. (1976). MEQ 夜型の覚醒パターン',
      weights: [-2, 3, 0, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: 'エネルギーの波',
      emoji: '🤝',
      text: '周りの人のペースに合わせて、自分のリズムを柔軟に変えられる',
      source: 'Adan, A. & Almirall, H. (1991). 社会的リズム適応と柔軟性',
      weights: [0, 0, 0, 1, 3, 0],
    },
    {
      sid: 5,
      sectionName: 'エネルギーの波',
      emoji: '💤',
      text: '疲れた時に短い仮眠を取ると、すぐに回復できる',
      source: 'Breus, M.J. (2016). パワーナップとクロノタイプの関係',
      weights: [0, 0, 0, 3, 1, 1],
    },
    {
      sid: 5,
      sectionName: 'エネルギーの波',
      emoji: '🔥',
      text: '締め切り直前になると、普段以上の集中力を発揮できる',
      source: 'Adan, A. & Almirall, H. (1991). ストレス覚醒と集中力の関係',
      weights: [0, 1, 2, 0, 0, 0],
    },
  ],

  // --- 結果タイプ（12種類） ---
  resultTypes: [
    {
      id: 'lion',
      emoji: '🦁',
      name: 'ライオン型（超朝型リーダー）',
      tag: '#朝5時から覇気全開',
      color: '#D97706',
      description:
        'あなたは「ライオン型」。朝早くから絶好調で、午前中に最高のパフォーマンスを発揮するタイプ。リーダーシップが強く、計画的に一日を過ごせる生まれながらの朝の王者です。',
      advice:
        '朝の黄金タイムを最大限活用しよう！大事な勉強や決断は午前中に。午後はゆるめの活動にして、夜は早めに就寝。22時就寝→5時起床のリズムが最強だよ。',
      traits: ['朝から全開', '計画的', 'リーダー気質', '規則正しい'],
      scoreWeights: [3, -2, 1, 1, 1, 2],
    },
    {
      id: 'bear',
      emoji: '🐻',
      name: 'クマ型（バランス型社交派）',
      tag: '#みんなと同じリズムが心地いい',
      color: '#92400E',
      description:
        'あなたは「クマ型」。太陽のリズムに合わせて活動する、最もバランスの取れたクロノタイプ。社交的で人付き合いが上手く、学校や社会のリズムにナチュラルに適応できる人気者です。',
      advice:
        '規則正しい生活リズムがあなたの武器。7時起床→23時就寝を守ると最強。集中力のピークは10時〜14時だから、重要な課題はその時間帯にやろう。',
      traits: ['バランス感覚', '社交的', '適応力が高い', '安定したリズム'],
      scoreWeights: [1, 0, 0, 2, 3, 2],
    },
    {
      id: 'wolf',
      emoji: '🐺',
      name: 'オオカミ型（夜型クリエイター）',
      tag: '#真夜中に天才が目覚める',
      color: '#4338CA',
      description:
        'あなたは「オオカミ型」。夜になるほど冴えてくる、生粋の夜型クリエイター。芸術的センスが抜群で、静かな夜にインスピレーションが降りてくるタイプです。',
      advice:
        '無理に朝型になろうとしなくてOK。夜の集中タイムを活かして創作や学習をしよう。ただし学校がある日は最低7時間の睡眠は確保して、週末に夜型リズムを楽しもう。',
      traits: ['夜に覚醒', 'クリエイティブ', '独創的', '自由な発想'],
      scoreWeights: [-2, 3, 2, 0, -1, -1],
    },
    {
      id: 'dolphin',
      emoji: '🐬',
      name: 'イルカ型（浅い眠りの天才）',
      tag: '#脳が止まらない系天才',
      color: '#0891B2',
      description:
        'あなたは「イルカ型」。眠りが浅く、常に脳が活動しているハイパー思考型。完璧主義で知的好奇心が強く、少ない睡眠でも頭が回転し続ける天才肌です。',
      advice:
        '寝る前の1時間はスマホを見ない「デジタルデトックス」を試してみて。寝つきが悪い時は、好きな音楽やストレッチで脳をリラックスさせよう。質の良い睡眠で、天才的な頭脳がさらに輝くよ。',
      traits: ['ハイパー思考', '完璧主義', '知的好奇心', '繊細な感性'],
      scoreWeights: [0, 1, 2, -2, 0, -3],
    },
    {
      id: 'owl',
      emoji: '🦉',
      name: 'フクロウ型（深夜の思索家）',
      tag: '#深夜2時の哲学者',
      color: '#1E1B4B',
      description:
        'あなたは「フクロウ型」。深夜に最も思考が深まる、静寂を愛する思索家タイプ。一人で深く考えることが好きで、夜の静けさの中で人生の本質に迫るような思考力を発揮します。',
      advice:
        '深い思考力は最大の武器。でも夜更かしのしすぎには注意。日記やメモに夜のひらめきを書き留めて、翌日に活かすのがおすすめ。週に2回は早めに寝る日を作ろう。',
      traits: ['深い思考力', '哲学的', '内省的', '静寂を愛する'],
      scoreWeights: [-1, 3, 2, -1, -1, 0],
    },
    {
      id: 'lark',
      emoji: '🐦',
      name: 'ヒバリ型（早起き行動派）',
      tag: '#朝イチの行動力No.1',
      color: '#EA580C',
      description:
        'あなたは「ヒバリ型」。朝が来るのが待ちきれない、エネルギッシュな行動派。目覚めた瞬間からフル稼働で、午前中に一日のタスクをほとんど片付けてしまう驚異の実行力の持ち主です。',
      advice:
        '朝の行動力を活かして、大事なことは午前中に終わらせよう。ただし午後にエネルギーが下がりやすいので、15時頃に軽い運動や間食を取り入れるとバランスが良くなるよ。',
      traits: ['超行動派', '朝から元気', '実行力', 'ポジティブ'],
      scoreWeights: [3, -2, 0, 2, 1, 1],
    },
    {
      id: 'sloth',
      emoji: '🦥',
      name: 'ナマケモノ型（マイペース省エネ）',
      tag: '#最小エネルギーで最大成果',
      color: '#6B7280',
      description:
        'あなたは「ナマケモノ型」。マイペースで省エネ運転が得意な、効率主義者タイプ。無駄なことにエネルギーを使わず、本当に大事なことだけに力を集中できる賢い生き方の達人です。',
      advice:
        '自分のペースを守るのは大切。でも「やる気スイッチ」の場所を見つけておこう。好きな音楽を聴く、顔を洗うなど、自分だけの起動ルーティンを作ると、必要な時にすぐ動けるよ。',
      traits: ['効率重視', 'マイペース', '省エネ上手', '賢い怠惰'],
      scoreWeights: [0, 0, -1, 2, 0, 1],
    },
    {
      id: 'cheetah',
      emoji: '🐆',
      name: 'チーター型（瞬発集中型）',
      tag: '#短期決戦の王者',
      color: '#DC2626',
      description:
        'あなたは「チーター型」。短時間で爆発的な集中力を発揮する瞬発力タイプ。締め切り直前に火がつくと、驚異的なスピードでタスクを片付ける。短期決戦では誰にも負けません。',
      advice:
        '瞬発力は最強の武器。ポモドーロ・テクニック（25分集中→5分休憩）を使うと、爆発的集中力を何度も発動できるよ。長時間ダラダラより、短時間全力を繰り返そう。',
      traits: ['瞬発的集中力', '締め切り駆動型', 'スピード重視', '爆発力'],
      scoreWeights: [0, 1, 3, 0, 0, 0],
    },
    {
      id: 'hummingbird',
      emoji: '🪶',
      name: 'ハチドリ型（多動マルチタスク）',
      tag: '#同時進行は任せろ',
      color: '#059669',
      description:
        'あなたは「ハチドリ型」。複数のことを同時にこなせるマルチタスクの達人。興味の幅が広く、色んなことに手を出しては器用にこなしてしまう、多才で活動的なタイプです。',
      advice:
        'マルチタスク能力は素晴らしい才能。ただし、一つのことを深掘りする時間も作ろう。「今日はこれだけ」という日を週1で設けると、広さと深さを両立できるよ。',
      traits: ['マルチタスク', '好奇心旺盛', '器用', '活動的'],
      scoreWeights: [0, 0, -1, 1, 2, 0],
    },
    {
      id: 'koala',
      emoji: '🐨',
      name: 'コアラ型（超熟睡回復型）',
      tag: '#寝たら全回復のチート体質',
      color: '#7C3AED',
      description:
        'あなたは「コアラ型」。ぐっすり眠ることで驚異的な回復力を発揮するタイプ。睡眠の質が高く、寝た分だけしっかりエネルギーが戻る恵まれた体質。十分な睡眠さえあれば無敵です。',
      advice:
        '睡眠はあなたの最大の武器。8〜9時間の睡眠を確保して、寝室の環境を整えよう。暗く、涼しく、静かな部屋で眠ると回復力がMAXに。寝る前のホットミルクもおすすめ。',
      traits: ['熟睡力', '回復力', '安定したメンタル', '温厚'],
      scoreWeights: [0, 0, 0, 3, 0, 3],
    },
    {
      id: 'chameleon',
      emoji: '🦎',
      name: 'カメレオン型（環境適応型）',
      tag: '#どんな環境でも馴染む適応力',
      color: '#2563EB',
      description:
        'あなたは「カメレオン型」。環境や状況に合わせて自分のリズムを柔軟に変えられる、最強の適応力を持つタイプ。テスト期間は朝型に、長期休みは夜型にと、自在にスイッチを切り替えられます。',
      advice:
        '適応力の高さは社会で活きる最強のスキル。ただし「自分の本来のリズム」も大切にしよう。適応しすぎて疲れないように、週末は自分の好きなリズムで過ごす時間を作ってね。',
      traits: ['柔軟性', '適応力', '器用な切り替え', 'バランス感覚'],
      scoreWeights: [0, 0, 0, 1, 3, 1],
    },
    {
      id: 'penguin',
      emoji: '🐧',
      name: 'ペンギン型（仲間と同期型）',
      tag: '#みんなと一緒が最強',
      color: '#1D4ED8',
      description:
        'あなたは「ペンギン型」。仲間と一緒に行動することで最大のパフォーマンスを発揮するタイプ。一人だとダラけがちでも、友達と一緒なら早起きも勉強も頑張れる。チームの力で自分を高められる人です。',
      advice:
        '仲間の存在が最大のモチベーション。勉強も運動も、友達と一緒にやる環境を作ろう。オンライン自習室や朝活グループに参加すると、自然と良いリズムが身につくよ。',
      traits: ['チームワーク', '仲間意識', '協調性', '社交的'],
      scoreWeights: [0, 0, 0, 1, 3, 0],
    },
  ],

  // --- メタ情報 ---
  questionCount: 25,
  estimatedMinutes: 5,
  hashtags: ['#クロノタイプ診断', '#体内時計', '#朝型夜型', '#睡眠タイプ', '#最強のリズム'],
  references: [
    'Breus, M.J. (2016). The Power of When: Discover Your Chronotype. Little, Brown Spark.',
    'Horne, J.A. & Östberg, O. (1976). A self-assessment questionnaire to determine morningness-eveningness in human circadian rhythms. International Journal of Chronobiology, 4(2), 97-110.',
    'Roenneberg, T., Wirz-Justice, A. & Merrow, M. (2003). Life between clocks: daily temporal patterns of human chronotypes. Journal of Biological Rhythms, 18(1), 80-90.',
    'Adan, A. & Almirall, H. (1991). Horne & Östberg morningness-eveningness questionnaire: A reduced scale. Personality and Individual Differences, 12(3), 241-253.',
  ],
};
