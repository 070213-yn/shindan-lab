/**
 * マネーセンス診断
 *
 * 理論基盤:
 *   - Furnham, A. (1984) マネー信念尺度 (MBS) — お金に対する信念・態度の多次元測定
 *   - Klontz, B. et al. (2011) マネースクリプト理論 — 無意識のお金の脚本が行動を決める
 *   - Yamauchi, K.T. & Templer, D.I. (1982) マネー態度尺度 (MAS) — 金銭態度の心理構造
 *
 * 6次元: 貯蓄志向, 消費志向, 投資志向, 社会的使用, リスク許容度, 金銭管理力
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const moneyDiagnosis: DiagnosisConfig = {
  id: 'money',
  title: 'マネーセンス診断',
  subtitle: 'あなたのお金の性格を診断！',
  catchphrase: 'お金との付き合い方で、あなたの本性がバレる——',
  description:
    '心理学のマネースクリプト理論をベースに、あなたのお金に対する無意識の性格パターンを解析。お小遣いの使い方から将来の金銭感覚まで、12タイプで診断します！',
  emoji: '💰',
  themeColor: '#059669',
  gradientFrom: '#059669',
  gradientTo: '#047857',

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

  // --- スコアリング次元（6次元） ---
  dimensions: [
    { key: 'saving', label: '貯蓄志向', color: '#2563EB' },
    { key: 'spending', label: '消費志向', color: '#DC2626' },
    { key: 'investing', label: '投資志向', color: '#7C3AED' },
    { key: 'social', label: '社会的使用', color: '#F59E0B' },
    { key: 'risk', label: 'リスク許容度', color: '#EF4444' },
    { key: 'management', label: '金銭管理力', color: '#059669' },
  ],

  // --- セクション定義 ---
  sections: {
    1: 'お小遣いの使い方',
    2: '欲しいものへの対処',
    3: '友達とのお金関係',
    4: '将来のお金観',
    5: '貯金の仕方',
  },

  // --- 質問データ（25問） ---
  // weights: [貯蓄志向, 消費志向, 投資志向, 社会的使用, リスク許容度, 金銭管理力]
  questions: [
    // === セクション1: お小遣いの使い方 (5問) ===
    {
      sid: 1,
      sectionName: 'お小遣いの使い方',
      emoji: '👛',
      text: 'お小遣いをもらったら、まず「いくら貯金するか」を考える',
      source: 'Yamauchi, K.T. & Templer, D.I. (1982). MAS 貯蓄傾向尺度',
      weights: [3, -1, 0, 0, -1, 2],
    },
    {
      sid: 1,
      sectionName: 'お小遣いの使い方',
      emoji: '🛍️',
      text: 'お金があると使い切るまで安心できない（持ってるともったいない気がする）',
      source: 'Klontz, B. et al. (2011). マネースクリプト「お金は使うためにある」パターン',
      weights: [-2, 3, 0, 0, 1, -2],
    },
    {
      sid: 1,
      sectionName: 'お小遣いの使い方',
      emoji: '📊',
      text: '何にいくら使ったか、メモやアプリで記録している',
      source: 'Furnham, A. (1984). MBS 金銭管理行動の測定',
      weights: [1, 0, 1, 0, 0, 3],
    },
    {
      sid: 1,
      sectionName: 'お小遣いの使い方',
      emoji: '🎁',
      text: '自分のためより、友達へのプレゼントやおごりにお金を使いたい',
      source: 'Furnham, A. (1984). MBS 金銭的寛大さ尺度',
      weights: [-1, 0, 0, 3, 0, 0],
    },
    {
      sid: 1,
      sectionName: 'お小遣いの使い方',
      emoji: '💡',
      text: 'お金を使う時、「これは将来役に立つか」を無意識に考えている',
      source: 'Klontz, B. et al. (2011). マネースクリプト「将来志向」パターン',
      weights: [1, -1, 2, 0, 0, 2],
    },

    // === セクション2: 欲しいものへの対処 (5問) ===
    {
      sid: 2,
      sectionName: '欲しいものへの対処',
      emoji: '🔥',
      text: '欲しいものを見つけたら、我慢できずにすぐ買ってしまう',
      source: 'Yamauchi, K.T. & Templer, D.I. (1982). MAS 衝動性尺度',
      weights: [-2, 3, 0, 0, 2, -2],
    },
    {
      sid: 2,
      sectionName: '欲しいものへの対処',
      emoji: '🔍',
      text: '買い物の前に必ず他の店やネットで値段を比較する',
      source: 'Furnham, A. (1984). MBS 価格意識と合理的消費行動',
      weights: [1, 0, 1, 0, -1, 3],
    },
    {
      sid: 2,
      sectionName: '欲しいものへの対処',
      emoji: '🎯',
      text: '「限定品」「残りわずか」と言われると、つい欲しくなってしまう',
      source: 'Klontz, B. et al. (2011). マネースクリプトと希少性バイアス',
      weights: [-1, 2, 0, 0, 2, -1],
    },
    {
      sid: 2,
      sectionName: '欲しいものへの対処',
      emoji: '⏰',
      text: '高いものが欲しい時は、目標金額まで計画的にお金を貯められる',
      source: 'Yamauchi, K.T. & Templer, D.I. (1982). MAS 計画的行動尺度',
      weights: [3, -1, 0, 0, 0, 3],
    },
    {
      sid: 2,
      sectionName: '欲しいものへの対処',
      emoji: '💸',
      text: '推しのグッズやコンテンツには、惜しみなくお金を使える',
      source: 'Furnham, A. (1984). MBS 情熱的消費と価値観の関係',
      weights: [-1, 3, 0, 0, 1, 0],
    },

    // === セクション3: 友達とのお金関係 (5問) ===
    {
      sid: 3,
      sectionName: '友達とのお金関係',
      emoji: '🍕',
      text: '友達と遊ぶ時、割り勘の計算は1円単位できっちりやりたい',
      source: 'Furnham, A. (1984). MBS 公平性と金銭的正確さ',
      weights: [1, 0, 0, -1, -1, 3],
    },
    {
      sid: 3,
      sectionName: '友達とのお金関係',
      emoji: '🤑',
      text: '友達におごってあげると、いい気分になる',
      source: 'Klontz, B. et al. (2011). マネースクリプト「お金は人間関係を円滑にする」',
      weights: [0, 1, 0, 3, 0, 0],
    },
    {
      sid: 3,
      sectionName: '友達とのお金関係',
      emoji: '😰',
      text: '友達にお金を貸すのは、正直あまり気が進まない',
      source: 'Yamauchi, K.T. & Templer, D.I. (1982). MAS 金銭的警戒心',
      weights: [2, 0, 0, -1, -1, 1],
    },
    {
      sid: 3,
      sectionName: '友達とのお金関係',
      emoji: '🏪',
      text: '友達が持っている高いものを見ると、自分も欲しくなる',
      source: 'Furnham, A. (1984). MBS 社会的比較と金銭的野心',
      weights: [0, 2, 0, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: '友達とのお金関係',
      emoji: '🤝',
      text: 'みんなでお金を出し合って何かを買う・やるのが好き',
      source: 'Klontz, B. et al. (2011). マネースクリプトと社会的協力行動',
      weights: [0, 0, 0, 2, 0, 1],
    },

    // === セクション4: 将来のお金観 (5問) ===
    {
      sid: 4,
      sectionName: '将来のお金観',
      emoji: '📈',
      text: '将来は投資や株でお金を増やしたいと思っている',
      source: 'Klontz, B. et al. (2011). マネースクリプト「お金は増やすもの」パターン',
      weights: [0, 0, 3, 0, 2, 1],
    },
    {
      sid: 4,
      sectionName: '将来のお金観',
      emoji: '🏠',
      text: '大人になったら、安定した収入のある仕事に就きたい',
      source: 'Yamauchi, K.T. & Templer, D.I. (1982). MAS 金銭的安全志向',
      weights: [2, 0, 0, 0, -2, 2],
    },
    {
      sid: 4,
      sectionName: '将来のお金観',
      emoji: '🎰',
      text: 'リスクがあっても大きなリターンが期待できるなら挑戦したい',
      source: 'Furnham, A. (1984). MBS リスク許容度尺度',
      weights: [-1, 0, 2, 0, 3, 0],
    },
    {
      sid: 4,
      sectionName: '将来のお金観',
      emoji: '💎',
      text: 'お金持ちになることは、人生の成功の重要な指標だと思う',
      source: 'Klontz, B. et al. (2011). マネースクリプト「お金＝成功」の信念',
      weights: [0, 1, 2, 0, 1, 0],
    },
    {
      sid: 4,
      sectionName: '将来のお金観',
      emoji: '🌍',
      text: 'お金を稼いだら、困っている人や社会のために使いたい',
      source: 'Furnham, A. (1984). MBS 社会的責任と金銭的利他主義',
      weights: [0, 0, 0, 3, 0, 0],
    },

    // === セクション5: 貯金の仕方 (5問) ===
    {
      sid: 5,
      sectionName: '貯金の仕方',
      emoji: '🐷',
      text: '貯金箱や口座の残高が増えていくのを見るのが好き',
      source: 'Yamauchi, K.T. & Templer, D.I. (1982). MAS 貯蓄快感尺度',
      weights: [3, -1, 0, 0, 0, 1],
    },
    {
      sid: 5,
      sectionName: '貯金の仕方',
      emoji: '🎮',
      text: 'ポイントカードやクーポンを集めるのが得意で楽しい',
      source: 'Furnham, A. (1984). MBS 節約行動とゲーミフィケーション',
      weights: [1, 0, 0, 0, 0, 2],
    },
    {
      sid: 5,
      sectionName: '貯金の仕方',
      emoji: '💰',
      text: 'お年玉やお祝いのお金は、すぐに使わずしっかり貯めておく',
      source: 'Yamauchi, K.T. & Templer, D.I. (1982). MAS 長期的貯蓄行動',
      weights: [3, -2, 1, 0, -1, 2],
    },
    {
      sid: 5,
      sectionName: '貯金の仕方',
      emoji: '🔄',
      text: '使わなくなったものをフリマアプリで売るのは当然だと思う',
      source: 'Klontz, B. et al. (2011). マネースクリプトと経済的合理性',
      weights: [0, 0, 2, 0, 1, 2],
    },
    {
      sid: 5,
      sectionName: '貯金の仕方',
      emoji: '📱',
      text: '貯金の目標額を決めても、途中で挫折することが多い',
      source: 'Furnham, A. (1984). MBS 自己制御と金銭的規律',
      weights: [-2, 1, 0, 0, 0, -3],
    },
  ],

  // --- 結果タイプ（12種類） ---
  resultTypes: [
    {
      id: 'saving_master',
      emoji: '🏦',
      name: '堅実貯金マスター',
      tag: '#通帳の数字が生きがい',
      color: '#1D4ED8',
      description:
        'あなたは「堅実貯金マスター」。お金をコツコツ貯めることに喜びを感じる、生まれながらの貯蓄の達人。通帳の残高が増えるたびにニヤニヤしちゃうタイプ。将来の安心感を最も大切にしています。',
      advice:
        '堅実さは素晴らしい武器！でも「貯めるだけ」で体験を逃すのはもったいないよ。月のお小遣いの20%は「自分へのご褒美枠」として使う練習をしてみて。お金は使ってこそ価値が生まれるものでもあるよ。',
      traits: ['コツコツ型', '将来志向', '自制心が強い', '安心感重視'],
      scoreWeights: [3, -2, 0, 0, -2, 2],
    },
    {
      id: 'oshi_spender',
      emoji: '🎤',
      name: '推し活全振り散財王',
      tag: '#推しのためならATMになれる',
      color: '#EC4899',
      description:
        'あなたは「推し活全振り散財王」。好きなもの・推しのためならお金を惜しまない情熱の人。グッズ、ライブ、コラボカフェ…推しへの愛が経済を回している自覚あり。生きがいへの投資は最高の使い方！',
      advice:
        '推しへの愛は素敵！でも「推し活予算」を月初に決めておくのがおすすめ。予算内で最大限楽しむ工夫をすると、達成感もプラスされて二倍楽しいよ。推し活と貯金の両立を目指そう。',
      traits: ['情熱的消費', '推し愛', '体験重視', '感情で動く'],
      scoreWeights: [-1, 3, 0, 0, 1, -1],
    },
    {
      id: 'investor_mind',
      emoji: '📊',
      name: '投資家マインドの策士',
      tag: '#10代にして経済を語る',
      color: '#7C3AED',
      description:
        'あなたは「投資家マインドの策士」。お金を「使う」より「増やす」ことに興味がある、生まれながらの投資家マインドの持ち主。ニュースや経済の話に自然と耳が傾く、将来の億万長者候補です。',
      advice:
        '投資マインドは将来必ず役立つ！今のうちから経済ニュースを読む習慣をつけよう。ただし「お金を増やす」ことだけが人生じゃない。友達との体験や自己投資にもバランスよくお金を使おうね。',
      traits: ['分析的思考', '長期視点', '経済センス', '戦略家'],
      scoreWeights: [0, -1, 3, 0, 2, 1],
    },
    {
      id: 'generous_boss',
      emoji: '🫅',
      name: 'おごり魔の太っ腹',
      tag: '#おごらせてくれ、それが俺の喜び',
      color: '#D97706',
      description:
        'あなたは「おごり魔の太っ腹」。人にお金を使うことで幸せを感じる、生粋の太っ腹タイプ。友達におごったり、プレゼントを贈ったりすることが最高の喜び。人望の厚さはクラスNo.1です。',
      advice:
        '人のために使えるのは本当に素敵な才能。でも「おごり=好かれる」とは限らないよ。お金じゃなくて気持ちを大切にしよう。自分のためにもちゃんとお金を残してね。',
      traits: ['寛大さ', '人間関係重視', '承認欲求', 'おもてなし精神'],
      scoreWeights: [0, 1, 0, 3, 0, 0],
    },
    {
      id: 'point_hunter',
      emoji: '🎯',
      name: 'ポイ活の鬼',
      tag: '#1ポイントも逃さない執念',
      color: '#059669',
      description:
        'あなたは「ポイ活の鬼」。ポイントカード、クーポン、キャンペーン情報を完璧に把握する、お得情報の達人。同じ商品でも最安値で手に入れる方法を知っている。その情報収集力は将来きっと役立ちます。',
      advice:
        'お得を追求する能力は立派なスキル！でも「安いから買う」と「必要だから買う」は違うよ。本当に必要なものを見極める目も磨こう。ポイ活の知識を友達にシェアすると、みんなからも喜ばれるよ。',
      traits: ['情報収集力', 'お得感覚', '効率重視', '粘り強さ'],
      scoreWeights: [2, 0, 0, 0, 0, 3],
    },
    {
      id: 'impulse_child',
      emoji: '🎪',
      name: '衝動買いの申し子',
      tag: '#見た瞬間が運命の出会い',
      color: '#EF4444',
      description:
        'あなたは「衝動買いの申し子」。ビビッときたら即購入！その瞬間の直感を信じて行動する、感性豊かなタイプ。「限定」「ラスト1点」に弱いのも愛嬌。人生を楽しむ天才でもあります。',
      advice:
        '直感力は才能だけど、「3日ルール」を試してみて。欲しいものが見つかったら3日待ってまだ欲しかったら買う。本当に欲しいものだけが残るから、買い物の満足度もアップするよ。',
      traits: ['直感型', '行動力', '感性豊か', '後先考えない'],
      scoreWeights: [-2, 3, 0, 0, 2, -2],
    },
    {
      id: 'minimalist',
      emoji: '🍃',
      name: 'ミニマリスト節約家',
      tag: '#モノより経験、量より質',
      color: '#6B7280',
      description:
        'あなたは「ミニマリスト節約家」。本当に必要なものだけを厳選して持つ、質にこだわるタイプ。無駄遣いとは無縁で、少ないお金でも豊かに暮らせる知恵がある。シンプルイズベストの体現者です。',
      advice:
        '必要なものを見極める力は素晴らしい。ただし「ケチ」と「節約」は違うよ。大切な人との体験や、自分の成長のための投資には思い切ってお金を使ってみて。人生の幅が広がるよ。',
      traits: ['質重視', 'シンプル志向', '自制心', '本質を見抜く'],
      scoreWeights: [2, -2, 0, 0, -2, 1],
    },
    {
      id: 'planned_buyer',
      emoji: '📋',
      name: '計画的買い物の達人',
      tag: '#買い物リストは人生の設計図',
      color: '#2563EB',
      description:
        'あなたは「計画的買い物の達人」。欲しいものリストを作り、優先順位をつけて計画的に購入する超合理派。セール時期まで待てる忍耐力と、最高のタイミングで買う判断力を兼ね備えた買い物の天才です。',
      advice:
        '計画性は最強の武器！でも計画にないものとの「偶然の出会い」も楽しんでみて。月に1回だけ「計画外の予算」を設けると、思わぬ発見があるかも。柔軟さも大切だよ。',
      traits: ['計画的', '合理的', '忍耐力', '情報分析力'],
      scoreWeights: [2, -1, 1, 0, -1, 3],
    },
    {
      id: 'gift_genius',
      emoji: '🎀',
      name: 'プレゼント選びの天才',
      tag: '#もらう側の心を読む魔法使い',
      color: '#F472B6',
      description:
        'あなたは「プレゼント選びの天才」。相手が喜ぶものを選ぶセンスが抜群で、お金の使い方が人間関係を豊かにするタイプ。予算内で最高のプレゼントを見つける能力は、もはやギフトの魔法使いです。',
      advice:
        '人を喜ばせる才能は最高の財産！でも、自分へのプレゼントも忘れないでね。頑張った自分にもご褒美をあげよう。あなたの幸せが、周りの幸せにもつながるよ。',
      traits: ['観察力', 'センスの良さ', '思いやり', '人を喜ばせる力'],
      scoreWeights: [0, 0, 0, 3, 0, 2],
    },
    {
      id: 'otoshidama_investor',
      emoji: '🧧',
      name: 'お年玉長期運用型',
      tag: '#お年玉は投資の種銭',
      color: '#9333EA',
      description:
        'あなたは「お年玉長期運用型」。もらったお金をすぐに使わず、将来のために温存できる長期思考の持ち主。お年玉を何年も貯め続けて大きな買い物をした経験があるかも。忍耐力と計画性の化身です。',
      advice:
        '長期的な視点は大人になってからめちゃくちゃ役立つよ。今のうちから「お金の勉強」を始めると、将来大きな差がつく。でも「今しかできない体験」にも投資することを忘れないでね。',
      traits: ['長期思考', '忍耐力', '将来志向', '自制心の王者'],
      scoreWeights: [3, -2, 2, 0, -1, 2],
    },
    {
      id: 'flea_market_biz',
      emoji: '🏷️',
      name: 'フリマ転売ビジネスマン',
      tag: '#全てのモノに市場価値を見出す',
      color: '#EA580C',
      description:
        'あなたは「フリマ転売ビジネスマン」。不要なものを売る・安く買って高く売るなど、お金を「回す」センスが抜群のビジネスマインドの持ち主。モノの価値を見極める目は、将来の起業家候補です。',
      advice:
        'ビジネスセンスは素晴らしい才能！ただし信頼は何より大切。フェアな取引を心がけて、友達との信頼関係は絶対に壊さないようにしよう。信用こそが最大の資産だよ。',
      traits: ['ビジネスセンス', '価値を見極める目', '行動力', '交渉力'],
      scoreWeights: [0, 0, 3, 0, 2, 1],
    },
    {
      id: 'split_perfectionist',
      emoji: '🧮',
      name: '割り勘きっちり型',
      tag: '#1円の誤差も見逃さない',
      color: '#475569',
      description:
        'あなたは「割り勘きっちり型」。お金のやり取りは1円単位で正確にしたい、公平さを大切にするタイプ。「だいたいでいいよ」が苦手で、きっちり精算しないと気持ち悪い。その几帳面さは経理の天才かも。',
      advice:
        '公平さを大切にするのは立派な価値観。でも「10円の差」で友情にヒビが入らないように注意。時には「おごるよ」と言える余裕も大切。お金の管理力を活かして、グループの会計係を買って出よう！',
      traits: ['公平さ重視', '几帳面', '正確さ', '数字に強い'],
      scoreWeights: [1, 0, 0, -1, -2, 3],
    },
  ],

  // --- メタ情報 ---
  questionCount: 25,
  estimatedMinutes: 5,
  hashtags: ['#マネーセンス診断', '#お金の性格', '#金銭感覚', '#貯金タイプ', '#お小遣い'],
  references: [
    'Furnham, A. (1984). Many sides of the coin: The psychology of money usage. Personality and Individual Differences, 5(5), 501-509.',
    'Klontz, B., Britt, S.L., Mentzer, J. & Klontz, T. (2011). Money Beliefs and Financial Behaviors: Development of the Klontz Money Script Inventory. Journal of Financial Therapy, 2(1), 1-22.',
    'Yamauchi, K.T. & Templer, D.I. (1982). The development of a money attitude scale. Journal of Personality Assessment, 46(5), 522-528.',
  ],
};
