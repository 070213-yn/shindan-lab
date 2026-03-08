import type { DiagnosisConfig } from '../diagnosticTypes';

/**
 * 才能タイプ診断
 *
 * 理論基盤: Howard Gardner (1983) 多重知能理論 (Multiple Intelligences)
 * 補助理論: Sternberg (1985) 三頭理論, Dweck (2006) マインドセット理論
 *
 * 7次元: 言語知能、論理数学知能、空間知能、身体運動知能、音楽知能、対人知能、内省知能
 */
export const talentDiagnosis: DiagnosisConfig = {
  id: 'talent',
  title: '才能タイプ診断',
  subtitle: 'あなたの隠れた才能を発見しよう！',
  catchphrase: 'きみの中に眠る「天才のタネ」を見つけ出す',
  description:
    'ハーバード大学のガードナー教授が提唱した「多重知能理論」をベースに、あなたが生まれ持った才能の傾向を7つの知能から分析します。日常のちょっとした行動パターンから、自分でも気づいていない才能が見つかるかも？',
  emoji: '✨',
  themeColor: '#FFD700',
  gradientFrom: '#FFD700',
  gradientTo: '#FFA500',

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
      min: 8,
      max: 18,
      defaultValue: 13,
      unit: '歳',
    },
  ],

  // --- 7つのスコアリング次元 ---
  dimensions: [
    { key: 'linguistic',    label: '言語知能',     color: '#FF6B6B' },
    { key: 'logical',       label: '論理数学知能', color: '#4ECDC4' },
    { key: 'spatial',       label: '空間知能',     color: '#45B7D1' },
    { key: 'kinesthetic',   label: '身体運動知能', color: '#96CEB4' },
    { key: 'musical',       label: '音楽知能',     color: '#DDA0DD' },
    { key: 'interpersonal', label: '対人知能',     color: '#FFB347' },
    { key: 'intrapersonal', label: '内省知能',     color: '#87CEEB' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '学校生活',
    2: '趣味・好きなこと',
    3: '友達・人間関係',
    4: '問題解決スタイル',
    5: '表現・創造',
    6: '日常のクセ',
  },

  // --- 質問データ（28問） ---
  // weights配列: [言語, 論理数学, 空間, 身体運動, 音楽, 対人, 内省]
  questions: [
    // ===== セクション1: 学校生活 =====
    {
      sid: 1,
      sectionName: '学校生活',
      emoji: '🏫',
      text: '授業中、先生の話を聞いているとき、一番頭に残りやすいのは？',
      source: 'Gardner, H. (1983). Frames of Mind: The Theory of Multiple Intelligences.',
      weights: [2, 0, 1, 0, 0, 0, 1],
    },
    {
      sid: 1,
      sectionName: '学校生活',
      emoji: '📝',
      text: '作文や感想文を書くのは、正直どう感じる？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [3, 0, 0, 0, 0, 0, 1],
    },
    {
      sid: 1,
      sectionName: '学校生活',
      emoji: '🔬',
      text: '理科の実験で「なぜこうなるんだろう？」と自分から考えるほう？',
      source: 'Sternberg, R.J. (1985). Beyond IQ: A Triarchic Theory of Human Intelligence.',
      weights: [0, 3, 0, 1, 0, 0, 1],
    },
    {
      sid: 1,
      sectionName: '学校生活',
      emoji: '🗺️',
      text: '地図や図形の問題は得意？苦手？',
      source: 'Gardner, H. (1999). Intelligence Reframed.',
      weights: [0, 1, 3, 0, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '学校生活',
      emoji: '🏃',
      text: '体育の時間が近づくと、気持ちはどうなる？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [0, 0, 0, 3, 0, 1, 0],
    },

    // ===== セクション2: 趣味・好きなこと =====
    {
      sid: 2,
      sectionName: '趣味・好きなこと',
      emoji: '🎮',
      text: '休みの日にやりたいことを1つ選ぶなら？',
      source: 'Gardner, H. (1999). Intelligence Reframed.',
      weights: [1, 1, 1, 1, 1, 1, 1],
    },
    {
      sid: 2,
      sectionName: '趣味・好きなこと',
      emoji: '📚',
      text: '本を読むとき、物語の中の世界を頭の中で映像化する？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [2, 0, 2, 0, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '趣味・好きなこと',
      emoji: '🎵',
      text: '音楽を聴いているとき、自然にリズムを取ったり口ずさんだりする？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [0, 0, 0, 1, 3, 0, 0],
    },
    {
      sid: 2,
      sectionName: '趣味・好きなこと',
      emoji: '🧩',
      text: 'パズルやなぞなぞが出されたら、つい解きたくなる？',
      source: 'Sternberg, R.J. (1985). Beyond IQ.',
      weights: [0, 3, 1, 0, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '趣味・好きなこと',
      emoji: '🎨',
      text: '絵を描いたり、何かをデザインしたりするのは好き？',
      source: 'Gardner, H. (1999). Intelligence Reframed.',
      weights: [0, 0, 3, 1, 0, 0, 1],
    },

    // ===== セクション3: 友達・人間関係 =====
    {
      sid: 3,
      sectionName: '友達・人間関係',
      emoji: '👥',
      text: 'グループで何かするとき、自然とどんな役割になる？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [1, 0, 0, 0, 0, 3, 1],
    },
    {
      sid: 3,
      sectionName: '友達・人間関係',
      emoji: '💬',
      text: '友達が悩んでいるとき、あなたはどうする？',
      source: 'Goleman, D. (1995). Emotional Intelligence.',
      weights: [1, 0, 0, 0, 0, 3, 2],
    },
    {
      sid: 3,
      sectionName: '友達・人間関係',
      emoji: '🤝',
      text: '初めて会う人と話すのは得意？',
      source: 'Gardner, H. (1999). Intelligence Reframed.',
      weights: [1, 0, 0, 0, 0, 3, 0],
    },
    {
      sid: 3,
      sectionName: '友達・人間関係',
      emoji: '🎭',
      text: '相手の気持ちを読み取るのは得意だと思う？',
      source: 'Goleman, D. (1995). Emotional Intelligence.',
      weights: [0, 0, 0, 0, 0, 2, 3],
    },
    {
      sid: 3,
      sectionName: '友達・人間関係',
      emoji: '📱',
      text: 'SNSやチャットで自分の考えを文章で伝えるのは得意？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [3, 0, 0, 0, 0, 2, 1],
    },

    // ===== セクション4: 問題解決スタイル =====
    {
      sid: 4,
      sectionName: '問題解決スタイル',
      emoji: '🤔',
      text: '難しい問題に直面したとき、最初にすることは？',
      source: 'Sternberg, R.J. (1985). Beyond IQ.',
      weights: [1, 2, 1, 0, 0, 1, 2],
    },
    {
      sid: 4,
      sectionName: '問題解決スタイル',
      emoji: '🔧',
      text: '何かが壊れたとき、自分で直そうとする？',
      source: 'Dweck, C.S. (2006). Mindset: The New Psychology of Success.',
      weights: [0, 2, 2, 2, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '問題解決スタイル',
      emoji: '💡',
      text: 'アイデアが浮かぶのはどんなとき？',
      source: 'Sternberg, R.J. (1985). Beyond IQ.',
      weights: [1, 1, 2, 0, 1, 0, 2],
    },
    {
      sid: 4,
      sectionName: '問題解決スタイル',
      emoji: '📊',
      text: '計画を立てるとき、数字やデータを使って考えるほう？',
      source: 'Gardner, H. (1999). Intelligence Reframed.',
      weights: [0, 3, 0, 0, 0, 0, 1],
    },
    {
      sid: 4,
      sectionName: '問題解決スタイル',
      emoji: '🧠',
      text: '失敗したとき、「次はどうすればいいか」をじっくり考える？',
      source: 'Dweck, C.S. (2006). Mindset.',
      weights: [0, 1, 0, 0, 0, 0, 3],
    },

    // ===== セクション5: 表現・創造 =====
    {
      sid: 5,
      sectionName: '表現・創造',
      emoji: '✍️',
      text: '自分の気持ちを一番うまく伝えられるのはどの方法？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [2, 0, 2, 1, 2, 1, 0],
    },
    {
      sid: 5,
      sectionName: '表現・創造',
      emoji: '🎤',
      text: '人前で発表やスピーチをするのはどう感じる？',
      source: 'Gardner, H. (1999). Intelligence Reframed.',
      weights: [2, 0, 0, 1, 0, 2, 1],
    },
    {
      sid: 5,
      sectionName: '表現・創造',
      emoji: '🎹',
      text: '楽器を演奏したり歌を歌ったりするのは好き？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [0, 0, 0, 1, 3, 0, 0],
    },
    {
      sid: 5,
      sectionName: '表現・創造',
      emoji: '🏗️',
      text: 'ブロックやプラモデルなど、何かを組み立てるのは好き？',
      source: 'Gardner, H. (1999). Intelligence Reframed.',
      weights: [0, 1, 3, 2, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: '表現・創造',
      emoji: '💃',
      text: 'ダンスやスポーツで体を動かして表現するのは楽しい？',
      source: 'Gardner, H. (1983). Frames of Mind.',
      weights: [0, 0, 0, 3, 1, 0, 0],
    },

    // ===== セクション6: 日常のクセ =====
    {
      sid: 6,
      sectionName: '日常のクセ',
      emoji: '🌙',
      text: '寝る前に頭の中でよく考えていることは？',
      source: 'Gardner, H. (1999). Intelligence Reframed.',
      weights: [1, 1, 1, 0, 0, 1, 3],
    },
    {
      sid: 6,
      sectionName: '日常のクセ',
      emoji: '🚶',
      text: '道を歩いているとき、つい気になるのは？',
      source: 'Sternberg, R.J. (1985). Beyond IQ.',
      weights: [0, 1, 2, 1, 1, 1, 1],
    },
    {
      sid: 6,
      sectionName: '日常のクセ',
      emoji: '📖',
      text: '新しいことを覚えるとき、一番やりやすい方法は？',
      source: 'Dweck, C.S. (2006). Mindset.',
      weights: [2, 1, 2, 2, 1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '日常のクセ',
      emoji: '🌟',
      text: '自分のことを「すごい！」と思えるのはどんなとき？',
      source: 'Dweck, C.S. (2006). Mindset.',
      weights: [1, 1, 1, 1, 1, 1, 2],
    },
  ],

  // --- 結果タイプ（14種類） ---
  // scoreWeights: [言語, 論理数学, 空間, 身体運動, 音楽, 対人, 内省]
  resultTypes: [
    {
      id: 'word_wizard',
      emoji: '📖',
      name: '言葉の魔術師',
      tag: '#ストーリーテラー #言葉の天才',
      color: '#FF6B6B',
      description:
        'あなたは言葉を自在に操る天才！文章を書いたり、話したりすることで、人の心を動かす力を持っています。小説家、詩人、ジャーナリスト、YouTuberなど、言葉を武器にする分野で大きく輝ける才能があります。',
      advice:
        '日記やブログを書く習慣をつけてみよう。好きな本の感想を書いたり、短い物語を作ったりするだけでも、あなたの才能はどんどん伸びるよ！',
      traits: ['表現力が豊か', '語彙力が高い', '人を惹きつける話し方', '読書好き'],
      scoreWeights: [3, 0, 0, 0, 0, 1, 1],
    },
    {
      id: 'logic_master',
      emoji: '🧮',
      name: '天才ロジシャン',
      tag: '#論理の達人 #分析のプロ',
      color: '#4ECDC4',
      description:
        'あなたの頭脳は超高性能コンピューター！数字やパターンを見抜く力が飛び抜けています。プログラマー、科学者、数学者、データアナリストなど、論理的思考が求められる分野であなたの才能は最大限に発揮されます。',
      advice:
        'プログラミングに挑戦してみよう！Scratchから始めて、PythonやJavaScriptに進むと、あなたの論理力がどんどん開花するはず！',
      traits: ['分析力が高い', 'パターン認識が得意', '数字に強い', '合理的な判断力'],
      scoreWeights: [0, 3, 0, 0, 0, 0, 1],
    },
    {
      id: 'vision_architect',
      emoji: '🏛️',
      name: '天才建築家',
      tag: '#空間マスター #ビジュアルの王',
      color: '#45B7D1',
      description:
        'あなたは頭の中で3D映像を自在に操れる人！空間把握能力が抜群で、建築家、デザイナー、映像クリエイター、ゲームデザイナーなどの分野で大きな才能を発揮できます。',
      advice:
        '3Dモデリングソフトや建築シミュレーションゲームで遊んでみよう。Minecraftでの建築も、あなたの空間知能を伸ばす最高のトレーニング！',
      traits: ['空間把握力が高い', '方向感覚が鋭い', 'イメージ力豊か', '設計センスあり'],
      scoreWeights: [0, 1, 3, 0, 0, 0, 0],
    },
    {
      id: 'body_genius',
      emoji: '⚡',
      name: 'フィジカルの天才',
      tag: '#身体能力MAX #動きの達人',
      color: '#96CEB4',
      description:
        'あなたの体は最高の表現ツール！運動神経が抜群で、体を使って何かを成し遂げる才能があります。アスリート、ダンサー、外科医、俳優など、身体能力を活かせる分野で圧倒的な力を発揮します。',
      advice:
        'いろんなスポーツやダンスを試してみよう。1つに絞る必要はないよ。体を動かす経験すべてが、あなたの才能を磨いてくれる！',
      traits: ['運動神経抜群', '手先が器用', '体で覚えるのが得意', '反射神経が良い'],
      scoreWeights: [0, 0, 0, 3, 0, 0, 0],
    },
    {
      id: 'rhythm_prodigy',
      emoji: '🎵',
      name: 'リズムの申し子',
      tag: '#音楽の天才 #メロディマスター',
      color: '#DDA0DD',
      description:
        'あなたの耳と心は音楽と深くつながっています！リズム感、音感、メロディセンスが優れていて、音楽家、作曲家、サウンドエンジニア、DJなどの分野で素晴らしい才能を発揮できます。',
      advice:
        '楽器を1つ始めてみよう。ピアノでもギターでも、スマホの作曲アプリでもOK。音楽に触れる時間を増やすほど、あなたの才能は輝きを増すよ！',
      traits: ['リズム感が良い', '音の違いに敏感', 'メロディを覚えるのが早い', '音楽で感情表現'],
      scoreWeights: [0, 0, 0, 0, 3, 0, 0],
    },
    {
      id: 'people_connector',
      emoji: '🌟',
      name: '人心掌握マスター',
      tag: '#コミュ力MAX #リーダーの素質',
      color: '#FFB347',
      description:
        'あなたは人の心を読み、動かす天才！対人関係のセンスが抜群で、リーダー、カウンセラー、教師、営業、政治家など、人と関わる仕事で圧倒的な才能を発揮します。',
      advice:
        '生徒会やクラブ活動のリーダー役に挑戦してみよう。人をまとめる経験が、あなたの最大の才能をさらに伸ばしてくれるよ！',
      traits: ['共感力が高い', 'リーダーシップがある', '人を巻き込む力', 'チームワーク上手'],
      scoreWeights: [0, 0, 0, 0, 0, 3, 1],
    },
    {
      id: 'inner_sage',
      emoji: '🔮',
      name: '心の賢者',
      tag: '#自己理解の達人 #哲学者タイプ',
      color: '#87CEEB',
      description:
        'あなたは自分自身を深く理解する知恵を持った人。内省力が高く、哲学者、心理学者、作家、研究者など、深い思考と自己探求が求められる分野で輝きます。',
      advice:
        '日記を書いたり、瞑想を試してみよう。自分の感情や考えを言語化する習慣が、あなたの内省知能をさらに高めてくれるよ！',
      traits: ['自己理解が深い', '目標設定が上手', '感情コントロール力', '独自の価値観を持つ'],
      scoreWeights: [0, 0, 0, 0, 0, 0, 3],
    },
    {
      id: 'creative_alchemist',
      emoji: '🌈',
      name: 'クリエイティブ錬金術師',
      tag: '#発想力の鬼 #マルチクリエイター',
      color: '#FF69B4',
      description:
        'あなたは言葉と映像の両方を操るマルチクリエイター！言語知能と空間知能の組み合わせで、漫画家、映画監督、広告クリエイター、ゲームデザイナーなど、クリエイティブ業界で大活躍できる才能があります。',
      advice:
        '漫画を描いたり、動画を作ったりしてみよう。言葉とビジュアルの両方を使う表現が、あなたの才能を最大限に活かせるよ！',
      traits: ['発想力が豊か', '物語を映像化できる', 'マルチな才能', '独創的なアイデア'],
      scoreWeights: [2, 0, 2, 0, 1, 0, 1],
    },
    {
      id: 'strategy_commander',
      emoji: '♟️',
      name: '戦略の司令官',
      tag: '#頭脳戦の王 #戦略家',
      color: '#2C3E50',
      description:
        'あなたは論理と人間理解を組み合わせた戦略の天才！経営者、コンサルタント、プロデューサー、ゲーム開発者など、戦略的思考と人を動かす力の両方が必要な分野で大きな才能を発揮します。',
      advice:
        'ボードゲームやシミュレーションゲームを楽しんでみよう。チーム戦略を考える経験が、あなたの才能を磨いてくれる！',
      traits: ['戦略的思考', '先読みが得意', '人の動かし方を知っている', '冷静な判断力'],
      scoreWeights: [0, 2, 0, 0, 0, 2, 2],
    },
    {
      id: 'performance_star',
      emoji: '🌠',
      name: 'パフォーマンスの星',
      tag: '#表現者 #ステージの主役',
      color: '#E74C3C',
      description:
        'あなたは身体と音楽の才能を兼ね備えたパフォーマー！ダンサー、俳優、ミュージカルスター、アイドル、格闘家など、身体表現と音楽性の両方を活かせるステージで最高に輝ける才能があります。',
      advice:
        'ダンスや演劇に挑戦してみよう。体を動かしながら音楽を感じる経験が、あなたのパフォーマー魂に火をつけるよ！',
      traits: ['リズムに乗れる体', '表現力豊か', 'ステージ映えする', '感情を体で表現'],
      scoreWeights: [0, 0, 0, 2, 2, 1, 0],
    },
    {
      id: 'science_explorer',
      emoji: '🔭',
      name: 'サイエンス探検家',
      tag: '#科学の冒険者 #発見の天才',
      color: '#27AE60',
      description:
        'あなたは論理的思考と空間把握力を兼ね備えた科学探検家！研究者、エンジニア、宇宙飛行士、医師など、科学技術の最前線で活躍できる才能があります。',
      advice:
        '科学実験キットやプログラミングで遊んでみよう。「なぜ？」を追求する好奇心が、あなたを偉大な発見に導くはず！',
      traits: ['好奇心旺盛', '実験好き', '空間認識力が高い', '粘り強い探求心'],
      scoreWeights: [0, 2, 2, 1, 0, 0, 1],
    },
    {
      id: 'empathy_healer',
      emoji: '💚',
      name: '共感のヒーラー',
      tag: '#癒しの天才 #心の医者',
      color: '#1ABC9C',
      description:
        'あなたは対人知能と内省知能の両方が高い、心のスペシャリスト！カウンセラー、医師、看護師、社会福祉士、セラピストなど、人の心と体を癒す分野で大きな才能を発揮します。',
      advice:
        '友達の相談相手になったり、ボランティア活動に参加してみよう。人を助ける経験が、あなたの共感力をさらに磨いてくれるよ！',
      traits: ['深い共感力', '傾聴力が高い', '自己理解が深い', '人を癒す力'],
      scoreWeights: [1, 0, 0, 0, 0, 3, 2],
    },
    {
      id: 'renaissance_genius',
      emoji: '👑',
      name: 'ルネサンスの天才',
      tag: '#万能型 #何でもできる人',
      color: '#9B59B6',
      description:
        'あなたは複数の知能がバランスよく高い、まさにルネサンス型の天才！レオナルド・ダ・ヴィンチのように、いろんな分野に才能を発揮できるマルチタレントです。起業家やプロデューサーとして全体を見渡す力があります。',
      advice:
        '興味のあることには全部挑戦してみよう！「1つに絞らないといけない」なんてことはない。いろんな才能を組み合わせることが、あなただけの強みになるよ！',
      traits: ['バランス型の才能', '適応力が高い', '多趣味', '総合力で勝負'],
      scoreWeights: [1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'digital_creator',
      emoji: '💻',
      name: 'デジタルクリエイター',
      tag: '#テクノロジー×アート #未来の創造者',
      color: '#3498DB',
      description:
        'あなたは論理と空間知能を武器に、デジタルの世界で新しいものを生み出す才能があります！プログラマー、Webデザイナー、VRクリエイター、AIエンジニアなど、テクノロジーとクリエイティブが交差する分野で輝けます。',
      advice:
        'Webサイト作りやアプリ開発に挑戦してみよう。テクノロジーとデザインの両方を学ぶことで、あなたの才能は無限に広がるよ！',
      traits: ['テクノロジー好き', 'デザインセンス', '新しいもの好き', 'デジタルネイティブ'],
      scoreWeights: [1, 2, 2, 0, 0, 0, 1],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#才能診断', '#多重知能', '#隠れた才能', '#自分発見'],
  references: [
    'Gardner, H. (1983). Frames of Mind: The Theory of Multiple Intelligences. Basic Books.',
    'Gardner, H. (1999). Intelligence Reframed: Multiple Intelligences for the 21st Century. Basic Books.',
    'Sternberg, R.J. (1985). Beyond IQ: A Triarchic Theory of Human Intelligence. Cambridge University Press.',
    'Dweck, C.S. (2006). Mindset: The New Psychology of Success. Random House.',
    'Goleman, D. (1995). Emotional Intelligence: Why It Can Matter More Than IQ. Bantam Books.',
  ],
};
