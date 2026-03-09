/**
 * 裏キャラ診断
 *
 * 理論基盤:
 *   - Carl Jung (1959) シャドウ理論 — 意識に統合されていない「影」の人格
 *   - Costa & McCrae (1992) Big Five性格特性のダークサイド面
 *   - Paulhus & Williams (2002) Dark Triad（マキャベリアニズム・ナルシシズム・サイコパシー）
 *
 * 7次元: 腹黒度, ドS度, 嫉妬深さ, 自己愛度, サイコパス度(冷静さ), 反骨精神, 二面性
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const shadowDiagnosis: DiagnosisConfig = {
  id: 'shadow',
  title: '裏キャラ診断',
  subtitle: 'あなたの隠された裏の顔を暴く！',
  catchphrase: '本当のあなたは、もっとダークでカッコいい——',
  description:
    'ユング心理学の「シャドウ」理論をベースに、あなたが普段隠している裏の性格を暴き出します。自分でも気づいていない「もう一人の自分」に出会おう！',
  emoji: '🎭',
  themeColor: '#8B0000',
  gradientFrom: '#8B0000',
  gradientTo: '#DC143C',

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

  // --- スコアリング次元（7次元） ---
  dimensions: [
    { key: 'cunning', label: '腹黒度', color: '#2C3E50' },
    { key: 'sadistic', label: 'ドS度', color: '#C0392B' },
    { key: 'jealousy', label: '嫉妬深さ', color: '#27AE60' },
    { key: 'narcissism', label: '自己愛度', color: '#F39C12' },
    { key: 'psychopathy', label: 'サイコパス度', color: '#8E44AD' },
    { key: 'rebel', label: '反骨精神', color: '#E74C3C' },
    { key: 'duality', label: '二面性', color: '#3498DB' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '人間関係の裏側',
    2: 'SNSでの本音',
    3: '嫉妬・競争心',
    4: '自分だけの秘密',
    5: 'コントロール欲',
    6: '本当の野心',
  },

  // --- 質問データ（28問） ---
  // weights: [腹黒度, ドS度, 嫉妬深さ, 自己愛度, サイコパス度, 反骨精神, 二面性]
  questions: [
    // === セクション1: 人間関係の裏側 (5問) ===
    {
      sid: 1,
      sectionName: '人間関係の裏側',
      emoji: '🎭',
      text: '友達が失敗した時、心のどこかで「ちょっと安心する」自分がいる',
      source: 'Paulhus, D.L. & Williams, K.M. (2002). The Dark Triad of personality. シャーデンフロイデと競争心理',
      weights: [2, 1, 2, 0, 1, 0, 1],
    },
    {
      sid: 1,
      sectionName: '人間関係の裏側',
      emoji: '😇',
      text: '人前では優しく振る舞うけど、裏では結構キツいことを考えている',
      source: 'Jung, C.G. (1959). Aion: Researches into the Phenomenology of the Self. ペルソナとシャドウの乖離',
      weights: [2, 1, 0, 0, 0, 0, 3],
    },
    {
      sid: 1,
      sectionName: '人間関係の裏側',
      emoji: '🤫',
      text: '相手が何を言ってほしいか分かるから、上手に言葉を選んで操れる自信がある',
      source: 'Christie, R. & Geis, F.L. (1970). Studies in Machiavellianism. 対人操作能力',
      weights: [3, 0, 0, 1, 2, 0, 1],
    },
    {
      sid: 1,
      sectionName: '人間関係の裏側',
      emoji: '💔',
      text: '仲良しグループの中で、誰がトップかを常に観察している',
      source: 'Paulhus, D.L. & Williams, K.M. (2002). The Dark Triad. 社会的ヒエラルキー認知',
      weights: [2, 0, 1, 1, 1, 0, 1],
    },
    {
      sid: 1,
      sectionName: '人間関係の裏側',
      emoji: '🐺',
      text: '信頼してた人に裏切られても、泣いたりせず冷静に対処できる',
      source: 'Jung, C.G. (1959). Aion. シャドウの統合と感情制御',
      weights: [0, 0, 0, 0, 3, 1, 1],
    },

    // === セクション2: SNSでの本音 (5問) ===
    {
      sid: 2,
      sectionName: 'SNSでの本音',
      emoji: '📱',
      text: 'SNSでは「理想の自分」を演じていて、本当の自分とは結構違う',
      source: 'Jung, C.G. (1959). Aion. ペルソナ（仮面）理論',
      weights: [1, 0, 0, 2, 0, 0, 3],
    },
    {
      sid: 2,
      sectionName: 'SNSでの本音',
      emoji: '👀',
      text: '知り合いの投稿を見て「大したことないのに」と思うことがある',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 協調性の低スコア面',
      weights: [1, 1, 3, 1, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: 'SNSでの本音',
      emoji: '🔥',
      text: '炎上している投稿を見ると、つい長時間見てしまう（楽しんでいる自分がいる）',
      source: 'Paulhus, D.L. & Williams, K.M. (2002). The Dark Triad. 日常的サディズム傾向',
      weights: [0, 3, 0, 0, 1, 1, 0],
    },
    {
      sid: 2,
      sectionName: 'SNSでの本音',
      emoji: '💅',
      text: '自分の投稿への「いいね」の数をかなり気にしてしまう',
      source: 'Raskin, R. & Terry, H. (1988). Narcissistic Personality Inventory. 承認欲求指標',
      weights: [0, 0, 1, 3, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: 'SNSでの本音',
      emoji: '🕵️',
      text: '気になる人のSNSを何ヶ月分も遡ってチェックしたことがある',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 神経症傾向・執着性',
      weights: [1, 0, 3, 1, 0, 0, 1],
    },

    // === セクション3: 嫉妬・競争心 (5問) ===
    {
      sid: 3,
      sectionName: '嫉妬・競争心',
      emoji: '😤',
      text: '自分より成績がいい人を見ると、悔しさより「何か弱点はないか」と探してしまう',
      source: 'Paulhus, D.L. & Williams, K.M. (2002). The Dark Triad. 競争的攻撃性',
      weights: [2, 1, 2, 0, 1, 1, 0],
    },
    {
      sid: 3,
      sectionName: '嫉妬・競争心',
      emoji: '🏃',
      text: '負けず嫌いで、勝負事では手段を選ばないところがある',
      source: 'Christie, R. & Geis, F.L. (1970). Studies in Machiavellianism. 結果主義的行動',
      weights: [2, 0, 1, 1, 1, 2, 0],
    },
    {
      sid: 3,
      sectionName: '嫉妬・競争心',
      emoji: '💚',
      text: '仲のいい友達が他の子と楽しそうにしていると、モヤモヤする',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 神経症傾向と嫉妬',
      weights: [0, 0, 3, 0, 0, 0, 1],
    },
    {
      sid: 3,
      sectionName: '嫉妬・競争心',
      emoji: '🎯',
      text: 'テストの点数が友達に負けると、こっそり次は絶対勝つと燃える',
      source: 'Schein, E.H. (1978). Career Dynamics. 競争的動機づけ',
      weights: [0, 0, 2, 1, 0, 2, 0],
    },
    {
      sid: 3,
      sectionName: '嫉妬・競争心',
      emoji: '🎪',
      text: '自分が注目されないと、なんとなくつまらないと感じる',
      source: 'Raskin, R. & Terry, H. (1988). Narcissistic Personality Inventory. 顕示的自己愛',
      weights: [0, 0, 1, 3, 0, 0, 1],
    },

    // === セクション4: 自分だけの秘密 (5問) ===
    {
      sid: 4,
      sectionName: '自分だけの秘密',
      emoji: '🌙',
      text: '夜、寝る前に「もし自分がもっとすごい存在だったら」と妄想することがある',
      source: 'Jung, C.G. (1959). Aion. 自我膨張と内的幻想',
      weights: [0, 0, 0, 3, 0, 1, 1],
    },
    {
      sid: 4,
      sectionName: '自分だけの秘密',
      emoji: '🃏',
      text: '本当は、周りの人が思っているほど「いい子」じゃないと自覚している',
      source: 'Jung, C.G. (1959). Aion. シャドウの自己認知',
      weights: [1, 1, 0, 0, 0, 1, 3],
    },
    {
      sid: 4,
      sectionName: '自分だけの秘密',
      emoji: '🗝️',
      text: '誰にも見せない自分だけのノートや日記、秘密のアカウントがある',
      source: 'Jung, C.G. (1959). Aion. ペルソナの裏面としてのシャドウ',
      weights: [0, 0, 0, 1, 0, 1, 3],
    },
    {
      sid: 4,
      sectionName: '自分だけの秘密',
      emoji: '😈',
      text: '悪役やダークヒーローに共感したり、カッコいいと思うことが多い',
      source: 'Jung, C.G. (1959). Aion. シャドウへの投影と同一化',
      weights: [0, 2, 0, 0, 1, 3, 0],
    },
    {
      sid: 4,
      sectionName: '自分だけの秘密',
      emoji: '🔮',
      text: '人の嘘やお世辞を見抜くのが得意で、だいたい当たる',
      source: 'Christie, R. & Geis, F.L. (1970). Studies in Machiavellianism. 社会的知性',
      weights: [2, 0, 0, 0, 2, 0, 1],
    },

    // === セクション5: コントロール欲 (4問) ===
    {
      sid: 5,
      sectionName: 'コントロール欲',
      emoji: '👑',
      text: '周りの人間関係を自分の思い通りに動かせたら気持ちいいと思う',
      source: 'Paulhus, D.L. & Williams, K.M. (2002). The Dark Triad. 支配性・権力動機',
      weights: [3, 2, 0, 1, 1, 0, 0],
    },
    {
      sid: 5,
      sectionName: 'コントロール欲',
      emoji: '🎲',
      text: '相手をからかったり、ちょっと困らせるのが楽しいと感じる時がある',
      source: 'Paulhus, D.L. & Williams, K.M. (2002). The Dark Triad. 日常的サディズム',
      weights: [0, 3, 0, 0, 1, 1, 0],
    },
    {
      sid: 5,
      sectionName: 'コントロール欲',
      emoji: '🧊',
      text: '感情的になっている人を見ると、冷めた目で見てしまうことがある',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 低協調性と情緒的距離',
      weights: [0, 1, 0, 0, 3, 0, 1],
    },
    {
      sid: 5,
      sectionName: 'コントロール欲',
      emoji: '📏',
      text: 'ルールに縛られるのが嫌いで、自分のやり方で突き進みたい',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 低協調性と反体制傾向',
      weights: [0, 0, 0, 1, 0, 3, 0],
    },

    // === セクション6: 本当の野心 (4問) ===
    {
      sid: 6,
      sectionName: '本当の野心',
      emoji: '🦅',
      text: '実は、かなり大きな野心を胸に秘めている',
      source: 'Raskin, R. & Terry, H. (1988). NPI. 野心的自己愛',
      weights: [1, 0, 0, 2, 0, 2, 1],
    },
    {
      sid: 6,
      sectionName: '本当の野心',
      emoji: '🐍',
      text: '表では「なんでもいいよ」と言いつつ、裏ではしっかり自分に有利なように誘導している',
      source: 'Christie, R. & Geis, F.L. (1970). Studies in Machiavellianism. 間接的操作行動',
      weights: [3, 0, 0, 0, 1, 0, 3],
    },
    {
      sid: 6,
      sectionName: '本当の野心',
      emoji: '⚡',
      text: '「普通」で終わるくらいなら、リスクを冒してでも突き抜けたい',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R. 開放性と反骨性',
      weights: [0, 0, 0, 1, 1, 3, 0],
    },
    {
      sid: 6,
      sectionName: '本当の野心',
      emoji: '🖤',
      text: '自分の「ダークな部分」も含めて、全部ひっくるめて自分が好き',
      source: 'Jung, C.G. (1959). Aion. シャドウの統合と自己受容',
      weights: [0, 0, 0, 2, 1, 1, 2],
    },
  ],

  // --- 結果タイプ（14種類） ---
  resultTypes: [
    {
      id: 'smiling_ruler',
      emoji: '😊👑',
      name: '微笑みの支配者',
      tag: '#笑顔の裏に帝王学',
      color: '#2C3E50',
      description:
        'あなたの裏の顔は「微笑みの支配者」。いつもニコニコしているけど、その笑顔の裏では全てを見透かし、人間関係を巧みにコントロールしている。誰よりも人の心理を読む天才です。',
      advice:
        'その観察力と社交術は素晴らしい武器。でも、たまには計算なしで人と接してみて。意外な発見があるかも。素の自分を見せることも、本当の強さだよ。',
      traits: ['戦略的思考', '完璧な社交術', '観察力の鬼', '感情コントロール'],
      scoreWeights: [3, 0, 0, 1, 2, 0, 2],
    },
    {
      id: 'angelic_strategist',
      emoji: '😇🗡️',
      name: '天使の皮を被った策士',
      tag: '#清楚な見た目に猛毒',
      color: '#9B59B6',
      description:
        'あなたの裏の顔は「天使の皮を被った策士」。見た目は天使のように無害だけど、頭の中では常に二手三手先を読んでいる。ギャップが最大の武器です。',
      advice:
        '頭の良さを活かすのは素晴らしいこと。ただ、策略だけじゃなく真心で動く時、あなたの魅力は最大値になるよ。信頼できる人には本音を見せてみて。',
      traits: ['天使の笑顔', '鋭い知性', '完璧な演技力', 'ギャップの達人'],
      scoreWeights: [3, 0, 0, 0, 1, 0, 3],
    },
    {
      id: 'quiet_ambition',
      emoji: '🤫🔥',
      name: '静かなる野心家',
      tag: '#沈黙は金で覇権も金',
      color: '#34495E',
      description:
        'あなたの裏の顔は「静かなる野心家」。口数は少ないけど、胸の奥には誰よりも激しい炎が燃えている。表には出さないが、密かに世界を取ることを考えています。',
      advice:
        '秘めた野心は大きな原動力。でも、時には信頼できる仲間と夢を共有してみて。一人で抱え込むより、味方がいた方が野心は叶いやすいよ。',
      traits: ['秘めた情熱', '忍耐力', '戦略的沈黙', '爆発的な行動力'],
      scoreWeights: [1, 0, 0, 1, 1, 2, 2],
    },
    {
      id: 'sharp_tongue_noble',
      emoji: '👸💬',
      name: '毒舌の貴公子/お姫様',
      tag: '#的確すぎる毒は薬になる',
      color: '#C0392B',
      description:
        'あなたの裏の顔は「毒舌の貴公子/お姫様」。普段は上品に振る舞うけど、心の中のツッコミが止まらない。でもその毒舌は的確すぎて、むしろ才能です。',
      advice:
        '鋭い観察眼は貴重な能力。毒舌を「的確なフィードバック」に変換できたら、みんなから頼られる存在になれるよ。ユーモアのスパイスとして活かそう。',
      traits: ['鋭い観察眼', '的確な毒舌', '上品さ', 'ユーモアセンス'],
      scoreWeights: [1, 3, 0, 1, 0, 1, 1],
    },
    {
      id: 'dark_hero',
      emoji: '🦇✨',
      name: '孤高のダークヒーロー',
      tag: '#闇を纏う正義の味方',
      color: '#1A1A2E',
      description:
        'あなたの裏の顔は「孤高のダークヒーロー」。群れることを嫌い、自分だけのルールで生きている。冷たく見えるけど、実は誰よりも正義感が強い一匹狼です。',
      advice:
        '独自の美学を持つのは素敵なこと。でも、孤高を貫きすぎると大切な人を遠ざけてしまうかも。たまには壁を壊して、誰かの味方になってあげて。',
      traits: ['孤高の美学', '揺るぎない信念', '冷静な判断力', '隠れた優しさ'],
      scoreWeights: [0, 0, 0, 0, 3, 3, 1],
    },
    {
      id: 'smiling_boss',
      emoji: '😄🎩',
      name: '笑顔の裏ボス',
      tag: '#みんなの人気者の正体',
      color: '#D35400',
      description:
        'あなたの裏の顔は「笑顔の裏ボス」。クラスの人気者で誰からも好かれているけど、実は全ての人間関係を把握し、裏で糸を引いている黒幕です。',
      advice:
        'リーダーシップとカリスマ性は天性のもの。その力を「みんなのため」に使えば、本当に愛される存在になれるよ。裏で動くより堂々とリードしよう。',
      traits: ['カリスマ性', '情報収集力', '裏のリーダーシップ', '人心掌握術'],
      scoreWeights: [3, 1, 0, 2, 1, 0, 2],
    },
    {
      id: 'sweet_dictator',
      emoji: '🍭👊',
      name: '甘えん坊の独裁者',
      tag: '#かわいい顔して絶対王政',
      color: '#E91E63',
      description:
        'あなたの裏の顔は「甘えん坊の独裁者」。甘えん坊で可愛らしいけど、実は自分の思い通りにならないと気が済まない。かわいさで相手をコントロールする天才です。',
      advice:
        '人に可愛がってもらえるのは才能。でも、相手の気持ちも大切にしよう。「ありがとう」を意識的に増やすと、もっと深い信頼関係が築けるよ。',
      traits: ['天然の可愛さ', 'したたかさ', '甘え上手', '頑固さ'],
      scoreWeights: [2, 2, 1, 2, 0, 0, 1],
    },
    {
      id: 'unconscious_devil',
      emoji: '😘✨',
      name: '無自覚小悪魔',
      tag: '#天然の魔性は罪深い',
      color: '#FF6F61',
      description:
        'あなたの裏の顔は「無自覚小悪魔」。本人にはまったく自覚がないのに、なぜか周囲を振り回してしまう天然の魔性の持ち主。無邪気さが最強の武器です。',
      advice:
        '天然の魅力は磨かなくても光るもの。でも、自分の行動が相手にどう影響するか、少しだけ意識してみて。自覚することで、もっと素敵な人間関係が築けるよ。',
      traits: ['天然の魅力', '無邪気さ', '無自覚な影響力', '素直さ'],
      scoreWeights: [0, 1, 0, 2, 0, 0, 3],
    },
    {
      id: 'perfectionist_darkness',
      emoji: '🖤📐',
      name: '完璧主義の闇',
      tag: '#1ミリのズレも許さない',
      color: '#607D8B',
      description:
        'あなたの裏の顔は「完璧主義の闇」。表向きは穏やかだけど、心の中では全てに厳しいジャッジを下している。自分にも他人にも完璧を求めてしまう、影のパーフェクショニストです。',
      advice:
        '高い基準を持つのは素晴らしいこと。でも、完璧じゃなくても十分素敵なんだよ。80点の自分も認めてあげると、心がずっと楽になるはず。',
      traits: ['厳格な目', '高い理想', '内なる批判者', '妥協なき魂'],
      scoreWeights: [1, 1, 1, 1, 2, 0, 2],
    },
    {
      id: 'jealousy_flame',
      emoji: '💚🔥',
      name: '嫉妬の炎',
      tag: '#燃え盛る情熱の裏返し',
      color: '#2E7D32',
      description:
        'あなたの裏の顔は「嫉妬の炎」。人一倍感情が豊かで、好きな人や大切な人への想いが強すぎるあまり、嫉妬の炎が燃え上がることがある。それは愛情深さの証です。',
      advice:
        '嫉妬心は「自分も頑張りたい」という向上心の裏返し。その炎を自分磨きのエネルギーに変換しよう。ライバルは敵じゃなくて、成長のきっかけをくれる存在だよ。',
      traits: ['情熱的', '独占欲', '感受性の強さ', '執着力'],
      scoreWeights: [0, 0, 3, 1, 0, 1, 1],
    },
    {
      id: 'weapon_of_indifference',
      emoji: '🧊💀',
      name: '無関心という名の武器',
      tag: '#興味ないフリが最強の盾',
      color: '#455A64',
      description:
        'あなたの裏の顔は「無関心という名の武器」。何事にも動じない鋼のメンタルを持ち、興味がないフリで周囲を翻弄する。でもその無関心の裏には、傷つきたくないという繊細さが隠れています。',
      advice:
        '自分を守る術としての「無関心」は理解できる。でも、感情を出すのは弱さじゃないよ。信頼できる人には本音を見せてみて。きっと楽になれるはず。',
      traits: ['鉄壁のポーカーフェイス', '冷静沈着', '自己防衛の達人', '隠れた繊細さ'],
      scoreWeights: [0, 0, 0, 0, 3, 1, 2],
    },
    {
      id: 'chaos_creator',
      emoji: '🌪️😈',
      name: 'カオスクリエイター',
      tag: '#退屈な日常をぶち壊す',
      color: '#FF5722',
      description:
        'あなたの裏の顔は「カオスクリエイター」。平和な日常に物足りなさを感じ、ちょっとした波乱を起こして楽しむ生粋のトラブルメーカー。でもそのエネルギーは、退屈な世界を変える力でもあります。',
      advice:
        'そのエネルギーと破壊力は、正しい方向に使えば革命を起こせる。「壊す」だけじゃなく「創る」方に力を向けてみて。あなたは世界を変えるポテンシャルを持っているよ。',
      traits: ['破壊と創造', '退屈嫌い', 'カリスマ的混沌', '型破り'],
      scoreWeights: [0, 2, 0, 0, 1, 3, 0],
    },
    {
      id: 'mirror_phantom',
      emoji: '🪞👻',
      name: '鏡のファントム',
      tag: '#千の顔を持つ七変化',
      color: '#5C6BC0',
      description:
        'あなたの裏の顔は「鏡のファントム」。相手によって全く違う顔を見せる、カメレオンのような適応力の持ち主。本当の自分がどれなのか、自分でも分からなくなることがある。',
      advice:
        '適応力の高さは社会で生きる大きな武器。でも「本当の自分」を見失わないで。一人の時間を大切にして、自分の本音と向き合ってみよう。日記を書くのもおすすめだよ。',
      traits: ['変幻自在', '適応力', '多面的人格', 'アイデンティティの探求'],
      scoreWeights: [1, 0, 0, 0, 0, 0, 3],
    },
    {
      id: 'narcissus_prince',
      emoji: '🌹👤',
      name: 'ナルシスの貴族',
      tag: '#世界で一番美しい自分',
      color: '#FFD700',
      description:
        'あなたの裏の顔は「ナルシスの貴族」。自分のことが大好きで、内なる自信と自己愛に満ちている。でもそれは弱さではなく、自己肯定感の高さの表れです。',
      advice:
        '自分を好きでいられるのは素晴らしい才能。その自己愛を「自分だけ」から「周りの人も」に広げていけば、あなたは本物のカリスマになれるよ。',
      traits: ['自己肯定感', '自信', '自己演出力', '承認欲求'],
      scoreWeights: [0, 0, 0, 3, 0, 1, 1],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#裏キャラ診断', '#シャドウ', '#本当の自分', '#ダークサイド'],
  references: [
    'Jung, C.G. (1959). Aion: Researches into the Phenomenology of the Self. Collected Works, Vol. 9, Part II. Princeton University Press.',
    'Costa, P.T. & McCrae, R.R. (1992). Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI) Professional Manual. Psychological Assessment Resources.',
    'Paulhus, D.L. & Williams, K.M. (2002). The Dark Triad of personality: Narcissism, Machiavellianism, and psychopathy. Journal of Research in Personality, 36(6), 556-563.',
    'Christie, R. & Geis, F.L. (1970). Studies in Machiavellianism. Academic Press.',
    'Raskin, R. & Terry, H. (1988). A principal-components analysis of the Narcissistic Personality Inventory and further evidence of its construct validity. Journal of Personality and Social Psychology, 54(5), 890-902.',
  ],
};
