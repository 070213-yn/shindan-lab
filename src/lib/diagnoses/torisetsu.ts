/**
 * わたしの取扱説明書 診断定義
 *
 * Big Five性格特性理論（Costa & McCrae, 1992）とHSP研究（Aron, 1996）をベースに、
 * あなたの「扱い方」を徹底分析する診断。
 * プロフィール帳風のビジュアルで取扱説明書カードとして画像出力される。
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const torisetsuDiagnosis: DiagnosisConfig = {
  id: 'torisetsu',
  title: 'わたしの取扱説明書',
  subtitle: 'あなたの"トリセツ"を完全作成',
  catchphrase: '友達に渡したい、自分の説明書——',
  description: 'Big Five性格特性理論（Costa & McCrae, 1992）とHSP研究（Aron, 1996）をベースに、あなたの「扱い方」を徹底分析。喜ばせ方、怒らせ方、地雷、甘やかし方、取り扱い注意事項まで——可愛い取扱説明書カードとして出力されます。友達やパートナーに見せたくなる、自分だけの一枚！',
  emoji: '\u{1F4CB}',
  themeColor: '#F472B6',
  gradientFrom: '#F472B6',
  gradientTo: '#FB923C',

  questionCount: 30,
  estimatedMinutes: 7,

  profileFields: [
    { id: 'gender', label: '性別', type: 'select', options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
    ]},
    { id: 'age', label: '年齢', type: 'slider', min: 10, max: 70, defaultValue: 16, unit: '歳' },
  ],

  // 8次元
  dimensions: [
    { key: 'sociability', label: '社交性', color: '#F472B6' },
    { key: 'sensitivity', label: '繊細さ', color: '#A78BFA' },
    { key: 'energy', label: 'テンション', color: '#FB923C' },
    { key: 'stubbornness', label: 'こだわり度', color: '#34D399' },
    { key: 'affection', label: '甘えん坊度', color: '#F87171' },
    { key: 'patience', label: '忍耐力', color: '#60A5FA' },
    { key: 'spontaneity', label: '気まぐれ度', color: '#FBBF24' },
    { key: 'independence', label: '自立度', color: '#6EE7B7' },
  ],

  // 質問: 30問
  // 形式: 5段階評価（1=全く当てはまらない〜5=とても当てはまる）
  // 参考: Big Five (Costa & McCrae, 1992), HSP (Aron, 1996),
  //       気質研究 (Thomas & Chess, 1977)
  sections: {
    1: '\u2600\uFE0F 日常の過ごし方',
    2: '\u{1F4AC} 人との関わり方',
    3: '\u{1F4AD} 感情の動き方',
    4: '\u2728 こだわりポイント',
    5: '\u{1F327}\uFE0F ストレス時の反応',
  },

  questions: [
    // セクション1: 日常の過ごし方
    { sid: 1, sectionName: '☀️ 日常の過ごし方', emoji: '☀️', text: '休日は予定を詰め込むより、のんびりしたい', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 1, -1, 0, 0, 0, 0, 1] },
    { sid: 1, sectionName: '☀️ 日常の過ごし方', emoji: '☀️', text: '朝起きたら、まず今日の予定を頭の中で整理する', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 0, 2, 0, 1, -1, 1] },
    { sid: 1, sectionName: '☀️ 日常の過ごし方', emoji: '☀️', text: 'BGMがないと作業に集中できない', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 1, 0, 0, 0, 1, 0] },
    { sid: 1, sectionName: '☀️ 日常の過ごし方', emoji: '☀️', text: '部屋の模様替えをよくする', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 1, 1, 0, 0, 2, 0] },
    { sid: 1, sectionName: '☀️ 日常の過ごし方', emoji: '☀️', text: '一人でカフェに行くのが好き', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 0, 0, 1, 0, 0, 0, 2] },
    { sid: 1, sectionName: '☀️ 日常の過ごし方', emoji: '☀️', text: '寝る前にその日あったことを振り返る', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 2, 0, 0, 0, 0, 0, 0] },

    // セクション2: 人との関わり方
    { sid: 2, sectionName: '💬 人との関わり方', emoji: '💬', text: '初対面の人とすぐ仲良くなれる方だ', source: 'Costa & McCrae (1992); Aron (1996)', weights: [2, -1, 1, 0, 0, 0, 0, -1] },
    { sid: 2, sectionName: '💬 人との関わり方', emoji: '💬', text: '友達の悩みを聞くのが得意', source: 'Costa & McCrae (1992); Aron (1996)', weights: [1, 1, 0, 0, 1, 1, 0, 0] },
    { sid: 2, sectionName: '💬 人との関わり方', emoji: '💬', text: 'グループのノリについていけない時がある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 2, -1, 0, 0, 0, 0, 1] },
    { sid: 2, sectionName: '💬 人との関わり方', emoji: '💬', text: 'LINEの返信は早い方だ', source: 'Costa & McCrae (1992); Aron (1996)', weights: [1, 0, 1, 0, 1, 0, 0, 0] },
    { sid: 2, sectionName: '💬 人との関わり方', emoji: '💬', text: '約束の時間には絶対遅れたくない', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 0, 2, 0, 1, -1, 0] },
    { sid: 2, sectionName: '💬 人との関わり方', emoji: '💬', text: '人に頼るのが苦手', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 0, 0, 1, -2, 0, 0, 2] },

    // セクション3: 感情の動き方
    { sid: 3, sectionName: '💭 感情の動き方', emoji: '💭', text: '映画やアニメで泣くことがよくある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 2, 1, 0, 1, 0, 0, 0] },
    { sid: 3, sectionName: '💭 感情の動き方', emoji: '💭', text: '怒りを感じても表に出さない方だ', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, -1, 0, 0, 2, 0, 1] },
    { sid: 3, sectionName: '💭 感情の動き方', emoji: '💭', text: 'テンションの上がり下がりが激しい', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 2, 0, 0, -1, 2, 0] },
    { sid: 3, sectionName: '💭 感情の動き方', emoji: '💭', text: '褒められると素直に喜べない', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 1, 0, 0, 0, 0, 0, 1] },
    { sid: 3, sectionName: '💭 感情の動き方', emoji: '💭', text: '好きなものの話になると止まらなくなる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [1, 0, 2, 2, 0, 0, 1, 0] },
    { sid: 3, sectionName: '💭 感情の動き方', emoji: '💭', text: '相手の気持ちを考えすぎて疲れることがある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 2, 0, 0, 0, -1, 0, 0] },

    // セクション4: こだわりポイント
    { sid: 4, sectionName: '✨ こだわりポイント', emoji: '✨', text: '自分なりのルーティンがある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 0, 2, 0, 1, -1, 1] },
    { sid: 4, sectionName: '✨ こだわりポイント', emoji: '✨', text: '「ま、いっか」が口癖', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, -1, 0, -2, 0, 0, 2, 0] },
    { sid: 4, sectionName: '✨ こだわりポイント', emoji: '✨', text: '持ち物にはこだわりがある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 0, 2, 0, 0, 0, 1] },
    { sid: 4, sectionName: '✨ こだわりポイント', emoji: '✨', text: '計画通りにいかないとモヤモヤする', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 0, 2, 0, -1, -1, 0] },
    { sid: 4, sectionName: '✨ こだわりポイント', emoji: '✨', text: '推しや好きなものがコロコロ変わる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 1, -1, 0, 0, 2, 0] },
    { sid: 4, sectionName: '✨ こだわりポイント', emoji: '✨', text: '人と違うことをするのが好き', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 1, 1, 0, 0, 1, 2] },

    // セクション5: ストレス時の反応
    { sid: 5, sectionName: '🌧️ ストレス時の反応', emoji: '🌧️', text: 'イライラすると一人になりたくなる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 1, 0, 0, -1, 0, 0, 2] },
    { sid: 5, sectionName: '🌧️ ストレス時の反応', emoji: '🌧️', text: 'ストレスが溜まると爆買いしがち', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 1, 0, 0, -2, 1, 0] },
    { sid: 5, sectionName: '🌧️ ストレス時の反応', emoji: '🌧️', text: '嫌なことがあっても寝たら忘れる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, -2, 0, 0, 0, 1, 0, 0] },
    { sid: 5, sectionName: '🌧️ ストレス時の反応', emoji: '🌧️', text: '誰かに話を聞いてもらいたくなる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [1, 1, 0, 0, 2, 0, 0, -1] },
    { sid: 5, sectionName: '🌧️ ストレス時の反応', emoji: '🌧️', text: '辛い時でも「大丈夫」と言ってしまう', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 0, 0, -1, 2, 0, 1] },
    { sid: 5, sectionName: '🌧️ ストレス時の反応', emoji: '🌧️', text: '落ち込んだ時、推しや好きなコンテンツに救われる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 0, 1, 1, 0, 0, 0] },
  ],

  // 14タイプの取扱説明書
  resultTypes: [
    {
      id: 'marshmallow',
      emoji: '\u{1F361}',
      name: 'もちもちマシュマロちゃん',
      tag: '甘えん坊の癒し系',
      color: '#FCA5A5',
      description: '外はふわふわ、中はとろとろ。甘えたい気持ちと気まぐれさが同居する、みんなの癒し担当。',
      traits: ['甘えん坊', '気分屋', '寂しがり', '素直'],
      advice: '【取り扱い注意】構ってほしい時のサインを見逃さないで。放置すると拗ねます。甘いものを与えると機嫌が直ります。',
      scoreWeights: [0.5, 0.5, 0.5, -0.5, 2, -0.5, 1.5, -1],
    },
    {
      id: 'ice_prince',
      emoji: '\u2744\uFE0F',
      name: 'クール系アイスプリンス',
      tag: '自立したマイペース',
      color: '#93C5FD',
      description: '一見クールだけど、実は心の中は熱い。自分の世界を大切にする孤高のマイペーサー。',
      traits: ['マイペース', '自立心が強い', '感情を出さない', 'こだわり強い'],
      advice: '【取り扱い注意】無理に距離を詰めないで。一人の時間を尊重すると心を開いてくれます。急な予定変更NG。',
      scoreWeights: [-1, 0, -1, 1.5, -1.5, 1.5, -0.5, 2],
    },
    {
      id: 'sparkler',
      emoji: '\u{1F386}',
      name: 'キラキラ花火タイプ',
      tag: '場を盛り上げるムードメーカー',
      color: '#FCD34D',
      description: 'テンション高め、ノリ最強！どんな場もパッと明るくする人間花火。ただし燃え尽きも早い。',
      traits: ['社交的', 'テンション高い', '飽きっぽい', '情熱的'],
      advice: '【取り扱い注意】テンション高い時に水を差さないで。急に静かになったら電池切れのサイン。充電時間をあげてね。',
      scoreWeights: [2, -0.5, 2, -0.5, 0.5, -0.5, 1.5, -0.5],
    },
    {
      id: 'glass_heart',
      emoji: '\u{1F48E}',
      name: 'ガラスのハートの持ち主',
      tag: '繊細すぎる感受性の天才',
      color: '#C4B5FD',
      description: '人の気持ちを感じ取る天才。でもその繊細さゆえに、傷つきやすい面も。HSPの素質あり。',
      traits: ['繊細', '共感力が高い', '涙もろい', '一人の時間が必要'],
      advice: '【取り扱い注意】「気にしすぎ」は禁句。感受性を否定せず、「よく気づくね」と肯定してあげて。静かな環境が回復のカギ。',
      scoreWeights: [-0.5, 2, -0.5, 0.5, 0.5, 0, -0.5, 0.5],
    },
    {
      id: 'commander',
      emoji: '\u{1F451}',
      name: 'しっかり者の隊長タイプ',
      tag: '頼れるリーダー気質',
      color: '#6EE7B7',
      description: '計画を立てて実行する力はピカイチ。みんなを引っ張るけど、実は自分が頼りたい夜もある。',
      traits: ['計画的', '責任感が強い', '完璧主義', '頼られたい'],
      advice: '【取り扱い注意】たまには「任せて」と言ってあげて。完璧じゃなくてもいいよ、と伝えると涙ぐむかも。',
      scoreWeights: [1, 0, 0.5, 2, -0.5, 2, -1.5, 1],
    },
    {
      id: 'cat_type',
      emoji: '\u{1F431}',
      name: 'きまぐれ猫タイプ',
      tag: '自由奔放なツンデレ',
      color: '#FCA5A5',
      description: '近づいたら逃げて、離れたら寄ってくる。自由を愛するツンデレさん。でも本当は愛されたい。',
      traits: ['気まぐれ', 'ツンデレ', '自由奔放', '本音を隠す'],
      advice: '【取り扱い注意】追いかけないで。気分が乗った時に構ってあげると懐きます。束縛は絶対NG。',
      scoreWeights: [-0.5, 0.5, 0.5, 0, 0.5, 0, 2, 1.5],
    },
    {
      id: 'sunshine',
      emoji: '\u{1F33B}',
      name: 'ぽかぽかひまわりタイプ',
      tag: '天然癒し系おひさま',
      color: '#FBBF24',
      description: 'いるだけで場が温かくなる、天然の癒しオーラの持ち主。素直で真っ直ぐ、裏表なし。',
      traits: ['素直', '温かい', '天然', '裏表がない'],
      advice: '【取り扱い注意】否定されるとしょんぼりします。笑顔で接すると笑顔が返ってきます。単純なのでサプライズが効果抜群。',
      scoreWeights: [1.5, 0, 1, -0.5, 1, 0, 0, -0.5],
    },
    {
      id: 'phantom',
      emoji: '\u{1F319}',
      name: 'ミステリアス月光タイプ',
      tag: '掴めない不思議ちゃん',
      color: '#A78BFA',
      description: '何を考えてるかわからない、神秘的なオーラの持ち主。仲良くなると意外な一面を見せてくれる。',
      traits: ['ミステリアス', '独自の世界観', '内向的', '意外な一面'],
      advice: '【取り扱い注意】無理に内面を聞き出さないで。時間をかけてゆっくり仲良くなるタイプ。一度信頼されたらずっと味方。',
      scoreWeights: [-1, 1, -0.5, 1, -0.5, 1, 0, 1.5],
    },
    {
      id: 'tornado',
      emoji: '\u{1F32A}\uFE0F',
      name: '爆走トルネードタイプ',
      tag: '止められない行動力の塊',
      color: '#F97316',
      description: '思い立ったが吉日！行動力は最強だけど、後先考えないのが玉にキズ。巻き込み力もMAX。',
      traits: ['行動力', '衝動的', '巻き込み上手', '後悔は後回し'],
      advice: '【取り扱い注意】止めても無駄なので一緒に走ってあげて。ただし「大丈夫？」の一言は忘れずに。ブレーキ役が必要。',
      scoreWeights: [1, -1, 2, -0.5, 0, -1.5, 2, 0],
    },
    {
      id: 'teddy_bear',
      emoji: '\u{1F9F8}',
      name: 'もこもこテディベアタイプ',
      tag: '愛されたい聞き上手',
      color: '#D4A574',
      description: 'みんなの話を聞くのが得意で、頼られることが多い。でも本当は自分が一番甘えたい。',
      traits: ['聞き上手', '優しい', '自己犠牲的', '甘えたい'],
      advice: '【取り扱い注意】「いつもありがとう」の言葉が一番嬉しい。たまには甘えさせてあげて。我慢しすぎに注意。',
      scoreWeights: [1, 1, 0, 0, 1.5, 1.5, -0.5, -1],
    },
    {
      id: 'rock',
      emoji: '\u{1F5FF}',
      name: '不動の岩タイプ',
      tag: '動じない鋼のメンタル',
      color: '#9CA3AF',
      description: 'どんな時も冷静沈着。感情の起伏が少なく、何があっても「まぁ、なんとかなるでしょ」。',
      traits: ['冷静', '鈍感力', '動じない', 'ストレス耐性'],
      advice: '【取り扱い注意】反応が薄くても嫌いなわけじゃないです。感情表現は苦手だけど、ちゃんと見てるし聞いてます。',
      scoreWeights: [0, -2, -1, 0, -1, 2, -1, 1],
    },
    {
      id: 'puppy',
      emoji: '\u{1F436}',
      name: 'わんわん忠犬タイプ',
      tag: '一途で情熱的な愛情モンスター',
      color: '#FB923C',
      description: '好きな人にはとことん一途！全力で愛情表現するけど、たまに重いと言われがち。',
      traits: ['一途', '愛情深い', '嫉妬しやすい', '全力投球'],
      advice: '【取り扱い注意】愛情表現を受け止めてあげて。「重い」と言うと傷つきます。一緒にいる時間が最大のご褒美。',
      scoreWeights: [1.5, 0.5, 1.5, 0, 2, 0, 0, -1.5],
    },
    {
      id: 'chameleon',
      emoji: '\u{1F98E}',
      name: 'カメレオン適応タイプ',
      tag: '空気を読む変幻自在',
      color: '#34D399',
      description: '場の空気を瞬時に読んで自分を変えられるスキル持ち。でも「本当の自分」がわからなくなることも。',
      traits: ['空気を読む', '適応力', '八方美人', '自分を見失う'],
      advice: '【取り扱い注意】「そのままのあなたでいいよ」が最強の言葉。合わせてくれてることに気づいて感謝を伝えてあげて。',
      scoreWeights: [1, 1, 0.5, -1, 0.5, 1, 0, -1.5],
    },
    {
      id: 'volcano',
      emoji: '\u{1F30B}',
      name: '溜め込み火山タイプ',
      tag: '普段は穏やか、でも限界が来たら大爆発',
      color: '#EF4444',
      description: '普段はニコニコしてるけど、ストレスを溜め込みがち。限界を超えると大爆発して周囲を驚かせる。',
      traits: ['我慢強い', '溜め込み型', '爆発力', 'ギャップ'],
      advice: '【取り扱い注意】「困ってない？」とこまめに声をかけてあげて。小さなガス抜きが大爆発の予防になります。',
      scoreWeights: [0, 1.5, 0, 1, -0.5, -0.5, -0.5, 0.5],
    },
  ],

  hashtags: ['取扱説明書', 'トリセツ診断', '私の説明書', '診断研究所'],
  references: [
    'Costa, P. T., & McCrae, R. R. (1992). NEO Personality Inventory.',
    'Aron, E. N. (1996). The Highly Sensitive Person.',
    'Thomas, A., & Chess, S. (1977). Temperament and Development.',
  ],
};
