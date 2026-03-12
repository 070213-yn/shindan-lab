/**
 * わたしの取扱説明書 診断定義
 *
 * Big Five性格特性理論（Costa & McCrae, 1992）とHSP研究（Aron, 1996）をベースに、
 * あなたの「扱い方」を徹底分析する診断。
 * 処方箋風のビジュアルで取扱説明書カードとして画像出力される。
 */

import type { DiagnosisConfig, TorisetsuPattern } from '../diagnosticTypes';

export const torisetsuDiagnosis: DiagnosisConfig = {
  id: 'torisetsu',
  title: 'わたしの取扱説明書',
  subtitle: 'あなたの"トリセツ"を完全作成',
  catchphrase: '友達に渡したい、自分の説明書\u2014\u2014',
  description: 'Big Five性格特性理論（Costa & McCrae, 1992）とHSP研究（Aron, 1996）をベースに、あなたの「扱い方」を徹底分析。喜ばせ方、怒らせ方、地雷、甘やかし方、取り扱い注意事項まで\u2014\u2014可愛い取扱説明書カードとして出力されます。友達やパートナーに見せたくなる、自分だけの一枚！',
  emoji: '\u{1F4CB}',
  themeColor: '#F472B6',
  gradientFrom: '#F472B6',
  gradientTo: '#FB923C',

  questionCount: 35,
  estimatedMinutes: 8,

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

  // 質問: 35問（7セクション x 5問）
  // 形式: 5段階評価（1=全く当てはまらない〜5=とても当てはまる）
  // 参考: Big Five (Costa & McCrae, 1992), HSP (Aron, 1996),
  //       気質研究 (Thomas & Chess, 1977)
  sections: {
    1: '\u2600\uFE0F 日常の過ごし方',
    2: '\u{1F4AC} 人との関わり方',
    3: '\u{1F4AD} 感情の動き方',
    4: '\u2728 こだわりポイント',
    5: '\u{1F327}\uFE0F ストレス時の反応',
    6: '\u{1F496} 甘え方・距離感',
    7: '\u{1F525} 本音の見え方',
  },

  questions: [
    // セクション1: 日常の過ごし方（5問）
    { sid: 1, sectionName: '\u2600\uFE0F 日常の過ごし方', emoji: '\u2600\uFE0F', text: '休日は予定を詰め込むより、のんびりしたい', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 1, -1, 0, 0, 0, 0, 1] },
    { sid: 1, sectionName: '\u2600\uFE0F 日常の過ごし方', emoji: '\u2600\uFE0F', text: '朝起きたら、まず今日の予定を頭の中で整理する', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 0, 2, 0, 1, -1, 1] },
    { sid: 1, sectionName: '\u2600\uFE0F 日常の過ごし方', emoji: '\u2600\uFE0F', text: 'BGMがないと作業に集中できない', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 1, 0, 0, 0, 1, 0] },
    { sid: 1, sectionName: '\u2600\uFE0F 日常の過ごし方', emoji: '\u2600\uFE0F', text: '一人でカフェに行くのが好き', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 0, 0, 1, 0, 0, 0, 2] },
    { sid: 1, sectionName: '\u2600\uFE0F 日常の過ごし方', emoji: '\u2600\uFE0F', text: '寝る前にその日あったことを振り返る', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 2, 0, 0, 0, 0, 0, 0] },

    // セクション2: 人との関わり方（5問）
    { sid: 2, sectionName: '\u{1F4AC} 人との関わり方', emoji: '\u{1F4AC}', text: '初対面の人とすぐ仲良くなれる方だ', source: 'Costa & McCrae (1992); Aron (1996)', weights: [2, -1, 1, 0, 0, 0, 0, -1] },
    { sid: 2, sectionName: '\u{1F4AC} 人との関わり方', emoji: '\u{1F4AC}', text: '友達の悩みを聞くのが得意', source: 'Costa & McCrae (1992); Aron (1996)', weights: [1, 1, 0, 0, 1, 1, 0, 0] },
    { sid: 2, sectionName: '\u{1F4AC} 人との関わり方', emoji: '\u{1F4AC}', text: 'グループのノリについていけない時がある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 2, -1, 0, 0, 0, 0, 1] },
    { sid: 2, sectionName: '\u{1F4AC} 人との関わり方', emoji: '\u{1F4AC}', text: '約束の時間には絶対遅れたくない', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 0, 2, 0, 1, -1, 0] },
    { sid: 2, sectionName: '\u{1F4AC} 人との関わり方', emoji: '\u{1F4AC}', text: '人に頼るのが苦手', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 0, 0, 1, -2, 0, 0, 2] },

    // セクション3: 感情の動き方（5問）
    { sid: 3, sectionName: '\u{1F4AD} 感情の動き方', emoji: '\u{1F4AD}', text: '映画やアニメで泣くことがよくある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 2, 1, 0, 1, 0, 0, 0] },
    { sid: 3, sectionName: '\u{1F4AD} 感情の動き方', emoji: '\u{1F4AD}', text: '怒りを感じても表に出さない方だ', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, -1, 0, 0, 2, 0, 1] },
    { sid: 3, sectionName: '\u{1F4AD} 感情の動き方', emoji: '\u{1F4AD}', text: 'テンションの上がり下がりが激しい', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 2, 0, 0, -1, 2, 0] },
    { sid: 3, sectionName: '\u{1F4AD} 感情の動き方', emoji: '\u{1F4AD}', text: '好きなものの話になると止まらなくなる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [1, 0, 2, 2, 0, 0, 1, 0] },
    { sid: 3, sectionName: '\u{1F4AD} 感情の動き方', emoji: '\u{1F4AD}', text: '相手の気持ちを考えすぎて疲れることがある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 2, 0, 0, 0, -1, 0, 0] },

    // セクション4: こだわりポイント（5問）
    { sid: 4, sectionName: '\u2728 こだわりポイント', emoji: '\u2728', text: '自分なりのルーティンがある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 0, 2, 0, 1, -1, 1] },
    { sid: 4, sectionName: '\u2728 こだわりポイント', emoji: '\u2728', text: '「ま、いっか」が口癖', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, -1, 0, -2, 0, 0, 2, 0] },
    { sid: 4, sectionName: '\u2728 こだわりポイント', emoji: '\u2728', text: '持ち物にはこだわりがある', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 0, 2, 0, 0, 0, 1] },
    { sid: 4, sectionName: '\u2728 こだわりポイント', emoji: '\u2728', text: '計画通りにいかないとモヤモヤする', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 0, 2, 0, -1, -1, 0] },
    { sid: 4, sectionName: '\u2728 こだわりポイント', emoji: '\u2728', text: '人と違うことをするのが好き', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 1, 1, 0, 0, 1, 2] },

    // セクション5: ストレス時の反応（5問）
    { sid: 5, sectionName: '\u{1F327}\uFE0F ストレス時の反応', emoji: '\u{1F327}\uFE0F', text: 'イライラすると一人になりたくなる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 1, 0, 0, -1, 0, 0, 2] },
    { sid: 5, sectionName: '\u{1F327}\uFE0F ストレス時の反応', emoji: '\u{1F327}\uFE0F', text: 'ストレスが溜まると爆買いしがち', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 1, 0, 0, -2, 1, 0] },
    { sid: 5, sectionName: '\u{1F327}\uFE0F ストレス時の反応', emoji: '\u{1F327}\uFE0F', text: '嫌なことがあっても寝たら忘れる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, -2, 0, 0, 0, 1, 0, 0] },
    { sid: 5, sectionName: '\u{1F327}\uFE0F ストレス時の反応', emoji: '\u{1F327}\uFE0F', text: '辛い時でも「大丈夫」と言ってしまう', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 0, 0, 0, -1, 2, 0, 1] },
    { sid: 5, sectionName: '\u{1F327}\uFE0F ストレス時の反応', emoji: '\u{1F327}\uFE0F', text: '落ち込んだ時、推しや好きなコンテンツに救われる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [0, 1, 0, 1, 1, 0, 0, 0] },

    // セクション6: 甘え方・距離感（5問）新規追加
    { sid: 6, sectionName: '\u{1F496} 甘え方・距離感', emoji: '\u{1F496}', text: '甘えたい気持ちはあるけど、自分からは言い出せない', source: 'Costa & McCrae (1992); Bowlby (1969)', weights: [0, 1, 0, 0, 1, 0, 0, 1] },
    { sid: 6, sectionName: '\u{1F496} 甘え方・距離感', emoji: '\u{1F496}', text: '仲良くなると急に距離が近くなる方だ', source: 'Costa & McCrae (1992); Bowlby (1969)', weights: [1, 0, 1, 0, 2, 0, 1, -1] },
    { sid: 6, sectionName: '\u{1F496} 甘え方・距離感', emoji: '\u{1F496}', text: '好きな人の前では自分を作ってしまう', source: 'Costa & McCrae (1992); Bowlby (1969)', weights: [0, 1, 0, 0, 0, 1, 0, -1] },
    { sid: 6, sectionName: '\u{1F496} 甘え方・距離感', emoji: '\u{1F496}', text: '誰かと一緒にいても、ふと一人になりたくなる', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 1, 0, 0, -1, 0, 1, 2] },
    { sid: 6, sectionName: '\u{1F496} 甘え方・距離感', emoji: '\u{1F496}', text: 'スキンシップ（ハグや手を繋ぐ等）は好きな方だ', source: 'Costa & McCrae (1992); Bowlby (1969)', weights: [1, 0, 1, 0, 2, 0, 0, -1] },

    // セクション7: 本音の見え方（5問）新規追加
    { sid: 7, sectionName: '\u{1F525} 本音の見え方', emoji: '\u{1F525}', text: '本音と建前を使い分けるのが上手いと思う', source: 'Costa & McCrae (1992); Thomas & Chess (1977)', weights: [1, 0, 0, 0, -1, 1, 0, 0] },
    { sid: 7, sectionName: '\u{1F525} 本音の見え方', emoji: '\u{1F525}', text: '言いたいことがあっても飲み込むことが多い', source: 'Costa & McCrae (1992); Aron (1996)', weights: [-1, 1, -1, 0, 0, 2, 0, 0] },
    { sid: 7, sectionName: '\u{1F525} 本音の見え方', emoji: '\u{1F525}', text: 'SNSの投稿は本当の自分とは少し違う', source: 'Costa & McCrae (1992); Thomas & Chess (1977)', weights: [0, 1, 0, 0, 0, 0, 1, 1] },
    { sid: 7, sectionName: '\u{1F525} 本音の見え方', emoji: '\u{1F525}', text: '感情が顔に出やすいと言われる', source: 'Costa & McCrae (1992); Thomas & Chess (1977)', weights: [0, 0, 1, 0, 1, -1, 1, 0] },
    { sid: 7, sectionName: '\u{1F525} 本音の見え方', emoji: '\u{1F525}', text: '「何考えてるかわからない」と言われたことがある', source: 'Costa & McCrae (1992); Thomas & Chess (1977)', weights: [-1, 0, -1, 1, -1, 1, 0, 2] },
  ],

  // 14タイプの取扱説明書（取説項目付き）
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
      torisetsuFields: {
        whenDown: 'そっとしておいて。でも30分後にお菓子を持ってきてくれると100点満点です。',
        whenDecline: '「今日はおうちでゴロゴロしたい〜」が本音。3回続いたら本当に電池切れ。',
        howToPlease: '「かわいいね」「すごいね」のストレートな褒め言葉で即チャージ完了。',
        ngWord: '「いい歳してそんな甘えるなよ」\u2014\u2014心が粉々になります。',
        loveMode: '好きな人にはベタベタ甘えモード全開。わかりやすすぎてバレバレです。',
        rechargeMethod: 'ふかふかのお布団でぬいぐるみ抱きながらSNS巡回。話しかけないのが吉。',
        cautionNote: '寂しいのに「別に寂しくない」と言い始めたら危険信号。すぐ構ってあげて。',
        bestMatch: '包容力があって、甘えさせてくれる穏やかな人。',
      },
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
      torisetsuFields: {
        whenDown: '一人にしてください。本当に辛い時は自分から来ます。待っていてくれるだけでいい。',
        whenDecline: '「今日は自分の時間が必要」\u2014\u2014嘘ではなく本気。尊重してあげて。',
        howToPlease: 'こだわりの趣味を理解して一緒に楽しんでくれると、静かに感動しています。',
        ngWord: '「もっと感情出しなよ」「ノリ悪いね」\u2014\u2014一瞬で心のシャッターが閉まります。',
        loveMode: '好きな人の前でだけ、ほんの少し柔らかくなる。気づける人だけが気づく変化。',
        rechargeMethod: '自分だけの空間で好きな音楽を聴きながらコーヒーを淹れる至福の時間。',
        cautionNote: '急な予定変更と大人数の集まりは本気でストレス。事前に伝えてあげて。',
        bestMatch: 'マイペースを乱さない、適度な距離感を保てる落ち着いた人。',
      },
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
      torisetsuFields: {
        whenDown: 'テンション低い時は放っておいて。でも「元気ないね？」の一言は嬉しい。',
        whenDecline: '「ごめん今日ムリ！」はそのまんまの意味。深く考えないで。明日また誘って。',
        howToPlease: '一緒にはしゃいでくれるだけで最高。ノリツッコミしてくれたら120点。',
        ngWord: '「うるさい」「テンション下げて」\u2014\u2014存在否定に聞こえます。',
        loveMode: '好きな人には特にテンション高くなるので周りにバレバレ。本人だけ気づいてない。',
        rechargeMethod: '友達と電話しまくるか、逆に一人で大音量で音楽聴いて踊る。両極端。',
        cautionNote: '燃え尽き症候群になりやすい。急に無口になったら要注意、優しく見守って。',
        bestMatch: '一緒に盛り上がってくれて、落ちた時は静かに隣にいてくれる人。',
      },
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
      torisetsuFields: {
        whenDown: 'そっとしておいてほしい。3時間後にお菓子を差し入れるとベスト。',
        whenDecline: '「今日はちょっと...」が3回続いたら本気で疲れてるサイン。察してあげて。',
        howToPlease: '手書きの手紙や小さなプレゼントなど、気持ちのこもったものに弱い。',
        ngWord: '「気にしすぎ」「考えすぎ」\u2014\u2014繊細さを否定されると立ち直れない。',
        loveMode: '好きな人の些細な変化に気づくけど、自分からはなかなか動けない。',
        rechargeMethod: '静かな部屋で好きな音楽を聴きながら何もしない時間。自然の中も効果的。',
        cautionNote: '大声・人混み・急かされるのが苦手。ペースを乱さないであげて。',
        bestMatch: '穏やかで、感受性を「すごいね」と認めてくれる優しい人。',
      },
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
      torisetsuFields: {
        whenDown: '弱音を見せたがらない。「何かあった？」と優しく聞いてあげると溢れ出す。',
        whenDecline: '本当に予定が詰まっている。代替日を提案すると喜ぶ。',
        howToPlease: '「いつも頼りにしてるよ」「あなたのおかげだよ」で涙腺崩壊。',
        ngWord: '「別にそこまでしなくていいのに」\u2014\u2014頑張りを否定されると折れる。',
        loveMode: '好きな人のために全力でプランを立てる。デートのしおり作りがち。',
        rechargeMethod: 'ToDoリストを全部消化した後のご褒美スイーツ。達成感が充電源。',
        cautionNote: '頑張りすぎて倒れるタイプ。たまには強制的に休ませてあげて。',
        bestMatch: '隊長モードを「すごい」と認めつつ、素の自分も引き出してくれる人。',
      },
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
      torisetsuFields: {
        whenDown: '構ってほしくない顔してるけど、そばにはいてほしい。矛盾してるけど許して。',
        whenDecline: '「気分じゃない」は嘘じゃない。明日は気分が変わるかもしれない。',
        howToPlease: '推しの新情報を教えてあげると120%の笑顔が見られます。',
        ngWord: '「なんでそんな気まぐれなの？」\u2014\u2014自分でもわかってるから言わないで。',
        loveMode: '好きな人には素っ気なくするのに、いないと寂しくて探す。バレてる。',
        rechargeMethod: '気の向くままに散歩。行き先は決めない。風の向くまま。',
        cautionNote: '束縛すると逃げます。自由を与えると自分から戻ってきます。信じて待って。',
        bestMatch: 'ベタベタしないけど、必要な時はそっとそばにいてくれる大人な人。',
      },
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
      torisetsuFields: {
        whenDown: '一人で静かに泣いてることが多い。気づいたらハグしてあげて。',
        whenDecline: '本当に申し訳なさそうに断る。罪悪感を感じてるから「全然いいよ！」と言ってあげて。',
        howToPlease: 'サプライズが最強。小さなプレゼントでも大喜びで跳び跳ねます。',
        ngWord: '「天然だね（馬鹿にした感じで）」\u2014\u2014笑ってるけど内心傷ついてます。',
        loveMode: '好きな人にだけ異常に優しくなるのでバレバレです。ニコニコが止まらない。',
        rechargeMethod: '日向ぼっこしながらぼーっとする。あと美味しいもの食べると一発回復。',
        cautionNote: '人の悪口を聞くと元気がなくなる。ネガティブな環境から遠ざけてあげて。',
        bestMatch: '一緒に笑ってくれて、ちょっとリードしてくれる明るい人。',
      },
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
      torisetsuFields: {
        whenDown: '一人で処理するタイプ。無理に聞かないで。ただ「いつでも話聞くよ」は心に響く。',
        whenDecline: '「ちょっと用事が...」は9割一人時間が欲しいだけ。問い詰めないで。',
        howToPlease: '好きな世界観を共有してくれると心の扉が少し開きます。推しの話を聞いて。',
        ngWord: '「もっとオープンになりなよ」\u2014\u2014これが一番しんどい。',
        loveMode: '好きな人に自分の秘密を少しずつ明かす。特別扱いが始まったらそれがサイン。',
        rechargeMethod: '深夜の読書タイム。あるいは誰もいない場所で星を見る。',
        cautionNote: '信頼を裏切ると二度と心を開きません。一度きりのチャンスを大切に。',
        bestMatch: '沈黙が心地よい関係でいられる、聡明で落ち着いた人。',
      },
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
      torisetsuFields: {
        whenDown: '動き回って気を紛らわすタイプ。「走りに行こう！」が最良の処方箋。',
        whenDecline: '断ることがほぼない。断られたということは本当に限界。放っておいてあげて。',
        howToPlease: '「面白そう！」「一緒に行こう！」\u2014\u2014ノリの良い返事が最大のご褒美。',
        ngWord: '「落ち着きなよ」「ちゃんと考えてから動いたら？」\u2014\u2014やる気が消滅します。',
        loveMode: '好きな人をイベントやお出かけにガンガン誘う。断られてもめげない強メンタル。',
        rechargeMethod: '新しい場所に行く。知らない街を歩くだけで回復する不思議体質。',
        cautionNote: '突っ走りすぎて怪我しがち。物理的にも精神的にもブレーキ役を確保して。',
        bestMatch: '一緒に冒険してくれつつ、暴走したら止めてくれるしっかり者。',
      },
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
      torisetsuFields: {
        whenDown: '誰かに話を聞いてほしい。でも自分からは言えない。「最近どう？」と聞いてあげて。',
        whenDecline: '断れない性格だから断った時は本当に限界。「大丈夫？」が魔法の言葉。',
        howToPlease: '「いつもありがとう」「あなたがいてくれて助かる」\u2014\u2014感謝の言葉が最強。',
        ngWord: '「別にお前に頼んでないし」\u2014\u2014善意を否定されると心が折れます。',
        loveMode: '好きな人の世話を焼きまくる。「お母さんみたい」と言われるのは褒め言葉。',
        rechargeMethod: 'もふもふ系の毛布にくるまって甘いココアを飲む。誰かにハグしてもらえたら最高。',
        cautionNote: '我慢して我慢して突然泣き出す。定期的に「大丈夫？」と聞いてあげて。',
        bestMatch: '甘えさせてくれて、たまにはリードしてくれる頼もしい人。',
      },
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
      torisetsuFields: {
        whenDown: '本人は「別に」と言うけど、好物を差し入れると静かに喜んでいます。',
        whenDecline: '「無理」の一言。シンプル。深い意味はないので気にしないで。',
        howToPlease: '一緒に黙ってゲームしたり映画を観たりする時間。会話なくてもOK。',
        ngWord: '「ちょっとは感情出しなよ」\u2014\u2014出してるつもりなんです。これが全力。',
        loveMode: '好きな人にだけ返信が早くなる。周りは気づくけど本人は無自覚。',
        rechargeMethod: '何もしない。文字通り何もしない。ぼーっとするのが最高の贅沢。',
        cautionNote: '限界に気づきにくい。本人が「ちょっと疲れた」と言ったらかなり限界です。',
        bestMatch: '感情表現が豊かで、こっちの分まで喜んでくれるような明るい人。',
      },
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
      torisetsuFields: {
        whenDown: '隣にいてほしい。何も言わなくていい、ただ一緒にいてくれるだけで回復。',
        whenDecline: 'めったに断らない。断ったらそれは体調不良か大事な用事。許してあげて。',
        howToPlease: '「好きだよ」「大事だよ」のストレート直球が一番効きます。頻度が大事。',
        ngWord: '「重い」「もうちょっと放っておいて」\u2014\u2014尻尾がしおれます。',
        loveMode: '好きな人の予定を全部覚えてる。誕生日はもちろん、好きな食べ物もメモ済み。',
        rechargeMethod: '好きな人か親友と過ごす時間。一人でいると逆に元気がなくなる。',
        cautionNote: '嫉妬スイッチが入りやすい。他の人と仲良くしても「あなたが一番」と伝えて。',
        bestMatch: '愛情を全力で受け止めてくれる、懐の深い人。',
      },
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
      torisetsuFields: {
        whenDown: '誰にも相談できずに一人で抱え込む。「無理しなくていいよ」が救いの一言。',
        whenDecline: '断ること自体がストレス。断った後に罪悪感で落ち込んでる。フォローしてあげて。',
        howToPlease: '「そのままでいいよ」「無理に合わせなくていいからね」\u2014\u2014泣くかも。',
        ngWord: '「八方美人」「誰にでもいい顔するよね」\u2014\u2014自分でもわかってるから刺さる。',
        loveMode: '好きな人の好みに自分を寄せていく。気づいたら好きな人の趣味が自分の趣味に。',
        rechargeMethod: '完全に一人になって「本当の自分」を取り戻す時間。日記を書くのも効果的。',
        cautionNote: '「みんなに合わせすぎてない？」と定期的に確認してあげて。限界が見えにくい。',
        bestMatch: '素の自分を出しても受け入れてくれる、ありのままを愛してくれる人。',
      },
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
      torisetsuFields: {
        whenDown: '「大丈夫」と言うけど全然大丈夫じゃない。こまめに聞いてあげるのが大事。',
        whenDecline: '断れないタイプなので断った時はかなり限界。追い打ちをかけないで。',
        howToPlease: '日頃の頑張りに気づいて「ちゃんと見てるよ」と言ってあげると涙腺決壊。',
        ngWord: '「みんなそう思ってるよ」\u2014\u2014即死コンボ。溜め込んでた感情が一気に爆発します。',
        loveMode: '好きな人の前でもニコニコ仮面を被りがち。でもたまに素が出る瞬間がある。',
        rechargeMethod: '一人カラオケで大声で叫ぶ。感情のガス抜きが必要。',
        cautionNote: '機嫌が悪いときはLINEの返事が単語になります。「うん」「おk」が続いたら注意。',
        bestMatch: 'こまめに「大丈夫？」と聞いてくれる、気配り上手な人。',
      },
    },
  ],

  hashtags: ['わたしの取説', 'トリセツ診断', 'ときめきラボ', '診断研究所'],
  references: [
    'Costa, P. T., & McCrae, R. R. (1992). NEO Personality Inventory.',
    'Aron, E. N. (1996). The Highly Sensitive Person.',
    'Thomas, A., & Chess, S. (1977). Temperament and Development.',
    'Bowlby, J. (1969). Attachment and Loss.',
  ],
};

/**
 * 取説項目の組み合わせパターン定義
 *
 * 次元インデックス:
 *   0: 社交性, 1: 繊細さ, 2: テンション, 3: こだわり度,
 *   4: 甘えん坊度, 5: 忍耐力, 6: 気まぐれ度, 7: 自立度
 *
 * 各項目10パターン以上 × 8項目 = 80以上のテキスト
 * 理論上の組み合わせ: 10^8 = 1億通り
 */
export const TORISETSU_PATTERNS: Record<string, TorisetsuPattern[]> = {

  // ============================================
  // 1. 落ち込んでいるとき (whenDown)
  //    主に 社交性(0) × 繊細さ(1) で分岐
  // ============================================
  whenDown: [
    // 2条件ルール（優先度高）
    {
      rules: [{ dim: 0, level: 'high' }, { dim: 1, level: 'high' }],
      text: '友達に電話して泣きながら話したい。共感してくれる言葉が一番の薬。聞いてくれるだけで8割回復する',
    },
    {
      rules: [{ dim: 0, level: 'high' }, { dim: 1, level: 'low' }],
      text: 'カラオケで叫べば30分で復活するタイプ。深刻に考えすぎないのが自分の強み',
    },
    {
      rules: [{ dim: 0, level: 'low' }, { dim: 1, level: 'high' }],
      text: '一人で静かに泣かせてほしい。3日くらいで自己修復するから放っておいて',
    },
    {
      rules: [{ dim: 0, level: 'low' }, { dim: 1, level: 'low' }],
      text: '落ち込んでること自体に気づいてない説。寝たら忘れる天才',
    },
    {
      rules: [{ dim: 5, level: 'high' }, { dim: 1, level: 'high' }],
      text: '表に出さず耐えるけど、限界超えると急に倒れる。「大丈夫」の回数が増えたら危険信号',
    },
    // 1条件ルール（フォールバック）
    {
      rules: [{ dim: 4, level: 'high' }],
      text: 'ペットか推しの動画見て泣いてる。でもそれが浄化になってるから心配しないで',
    },
    {
      rules: [{ dim: 5, level: 'high' }],
      text: '表に出さず黙って耐える。でも限界超えると急に倒れるので要観察',
    },
    {
      rules: [{ dim: 2, level: 'high' }],
      text: '10分泣いたら「まあいっか！」って切り替える天才。復活が異常に早い',
    },
    {
      rules: [{ dim: 6, level: 'high' }],
      text: '気分によって対処法が全然違う。今日は泣く、明日は暴食、明後日は爆買い',
    },
    {
      rules: [{ dim: 3, level: 'high' }],
      text: '原因を徹底分析して解決しないと気が済まない。感情より論理で立ち直る根本解決型',
    },
    {
      rules: [{ dim: 7, level: 'high' }],
      text: '自分で自分を立て直す。他人に弱みを見せるのが苦手だから、そっとしておいて',
    },
    {
      rules: [{ dim: 0, level: 'mid' }],
      text: '信頼できる人にだけポロッと本音を漏らす。気づいてくれたら救われる',
    },
  ],

  // ============================================
  // 2. 遊びを断るとき (whenDecline)
  //    主に 社交性(0) × こだわり(3) × 気まぐれ(6) で分岐
  // ============================================
  whenDecline: [
    {
      rules: [{ dim: 0, level: 'high' }, { dim: 6, level: 'high' }],
      text: '基本断らないけど、OKした2時間後に「やっぱ無理かも…」のLINEが来る確率60%',
    },
    {
      rules: [{ dim: 0, level: 'low' }, { dim: 3, level: 'high' }],
      text: '「今日は予定があって…」←予定＝家で一人の時間。嘘ではない',
    },
    {
      rules: [{ dim: 0, level: 'high' }, { dim: 5, level: 'high' }],
      text: '断れなくて全部行く。でも帰宅後に虚無になって3日は引きこもる',
    },
    {
      rules: [{ dim: 1, level: 'high' }, { dim: 0, level: 'low' }],
      text: '断った後に「嫌われたかな…」って3日くらい気にする。フォローのLINEくれると助かる',
    },
    {
      rules: [{ dim: 0, level: 'high' }],
      text: '基本断らない。でも3回連続で行くと4回目で電池切れになる。充電日を察して',
    },
    {
      rules: [{ dim: 6, level: 'high' }],
      text: 'OKした2時間後に「やっぱ無理かも…」のLINEが来る。気分屋なので許して',
    },
    {
      rules: [{ dim: 1, level: 'high' }],
      text: '断った後に「嫌われたかな…」って3日くらい気にしてる。何も気にしてないよって言って',
    },
    {
      rules: [{ dim: 5, level: 'high' }],
      text: '断れなくて全部行く。でも帰宅後に虚無になる。たまに断る勇気をください',
    },
    {
      rules: [{ dim: 7, level: 'high' }],
      text: '「行かない」以上。理由は聞かないで。察してくれる人が好き',
    },
    {
      rules: [{ dim: 2, level: 'high' }],
      text: '断る時も明るいから本気で断ってると思われない。「マジで無理」を3回言ったら本気',
    },
    {
      rules: [{ dim: 4, level: 'high' }],
      text: '行きたいけど体力がない。迎えに来てくれたら行く。お姫様扱いして',
    },
    {
      rules: [{ dim: 3, level: 'high' }],
      text: '予定通りの一日を過ごしたいだけ。急な誘いは前日までにお願いします',
    },
  ],

  // ============================================
  // 3. 喜ばせる方法 (howToPlease)
  //    主に テンション(2) × こだわり(3) × 甘えん坊度(4) で分岐
  // ============================================
  howToPlease: [
    {
      rules: [{ dim: 2, level: 'high' }, { dim: 0, level: 'high' }],
      text: 'サプライズに弱い。みんなでワイワイ祝ってくれたら一生覚えてる。号泣確定',
    },
    {
      rules: [{ dim: 3, level: 'high' }, { dim: 1, level: 'high' }],
      text: '趣味のことを覚えていてくれるだけで100点。推しの名前を言えたら120点。さりげない気遣いに弱い',
    },
    {
      rules: [{ dim: 4, level: 'high' }, { dim: 0, level: 'high' }],
      text: '「すごいね」「えらいね」って褒めてくれたら犬みたいに喜ぶ。ストレートな言葉が一番',
    },
    {
      rules: [{ dim: 7, level: 'high' }, { dim: 3, level: 'high' }],
      text: '結果で認めてくれること。お世辞はすぐバレるのでNG。本音の評価が嬉しい',
    },
    {
      rules: [{ dim: 2, level: 'high' }],
      text: 'サプライズに弱い。何でもいいから「特別感」を演出してくれたら号泣する',
    },
    {
      rules: [{ dim: 3, level: 'high' }],
      text: '趣味のことを覚えていてくれるだけで100点。推しの名前を言えたら120点',
    },
    {
      rules: [{ dim: 4, level: 'high' }],
      text: '「すごいね」「えらいね」って褒めてくれたら犬みたいに喜ぶ。頻度が大事',
    },
    {
      rules: [{ dim: 7, level: 'high' }],
      text: '結果で認めてくれること。お世辞はすぐバレるのでNG',
    },
    {
      rules: [{ dim: 1, level: 'high' }],
      text: '手書きの手紙とか、さりげない気遣いにめちゃくちゃ弱い。気持ちがこもってれば何でもOK',
    },
    {
      rules: [{ dim: 0, level: 'high' }],
      text: 'みんなでワイワイが最高。自分の誕生日にサプライズされたら一生覚えてる',
    },
    {
      rules: [{ dim: 5, level: 'high' }],
      text: '努力を見ていてくれる人が好き。がんばりを認めてもらえると泣く',
    },
    {
      rules: [{ dim: 6, level: 'high' }],
      text: '欲しいものが毎日変わるので、その日の気分で何か買ってくれたらOK。察して力が試される',
    },
  ],

  // ============================================
  // 4. 怒らせるNGワード (ngWord)
  //    主に 繊細さ(1) × こだわり(3) × 忍耐力(5) で分岐
  // ============================================
  ngWord: [
    {
      rules: [{ dim: 1, level: 'high' }, { dim: 5, level: 'high' }],
      text: '「気にしすぎ」は即死コンボ。我慢してるのに追い打ちかけないで。静かにブチギレる',
    },
    {
      rules: [{ dim: 3, level: 'high' }, { dim: 1, level: 'high' }],
      text: '「そんなのどうでもよくない？」は核地雷。こだわりを否定されると3日は口きかない',
    },
    {
      rules: [{ dim: 2, level: 'high' }, { dim: 6, level: 'high' }],
      text: '「うるさい」って言われるとシュンってなる。テンション下がると3日戻らない。扱い注意',
    },
    {
      rules: [{ dim: 1, level: 'high' }],
      text: '「気にしすぎ」は即死コンボ。分かっててもやめられないの。否定しないで',
    },
    {
      rules: [{ dim: 3, level: 'high' }],
      text: '「そんなのどうでもよくない？」は核地雷。こだわりを否定されると無理',
    },
    {
      rules: [{ dim: 5, level: 'high' }],
      text: '「もっと頑張れ」←これ以上頑張れと…？静かにブチギレるので注意',
    },
    {
      rules: [{ dim: 4, level: 'high' }],
      text: '「自分でやりなよ」が地味にキツい。突き放さないで。甘えさせて',
    },
    {
      rules: [{ dim: 0, level: 'high' }],
      text: '「つまんない」って言われるのが一番傷つく。場を盛り上げようとしてるのに',
    },
    {
      rules: [{ dim: 7, level: 'high' }],
      text: '「心配だから～してあげる」←余計なお世話が一番嫌い。信頼してほしい',
    },
    {
      rules: [{ dim: 2, level: 'high' }],
      text: '「うるさい」って言われるとシュンってなる。テンション下がると3日戻らない',
    },
    {
      rules: [{ dim: 6, level: 'high' }],
      text: '「前と言ってること違うじゃん」←確かにそうだけど言わないで。成長と呼んで',
    },
    {
      rules: [{ dim: 5, level: 'low' }],
      text: '「落ち着いて」がトリガー。落ち着けないから怒ってるんだよ',
    },
  ],

  // ============================================
  // 5. 恋愛モード (loveMode)
  //    主に 社交性(0) × 甘えん坊度(4) × 繊細さ(1) で分岐
  // ============================================
  loveMode: [
    {
      rules: [{ dim: 4, level: 'high' }, { dim: 0, level: 'high' }],
      text: '好きバレ100%。周りにバレバレだけど本人は隠してるつもり。わかりやすくて可愛い',
    },
    {
      rules: [{ dim: 4, level: 'high' }, { dim: 0, level: 'low' }],
      text: '好きな人にだけ話しかけるので、急に近づいてきたら確定。レアな行動を見逃さないで',
    },
    {
      rules: [{ dim: 1, level: 'high' }, { dim: 7, level: 'high' }],
      text: '相手の小さな変化に気づく。でも気づいてることを悟られたくない。複雑',
    },
    {
      rules: [{ dim: 7, level: 'high' }, { dim: 0, level: 'low' }],
      text: '好きでも媚びない。でもさりげなく隣にいる頻度が上がる。気づいて',
    },
    {
      rules: [{ dim: 1, level: 'high' }],
      text: '相手の小さな変化に気づく天才。でも自分からは絶対動けない。誰か背中押して',
    },
    {
      rules: [{ dim: 7, level: 'high' }],
      text: '好きでも媚びない。でもさりげなく隣にいる頻度が上がる。気づける人だけが気づく',
    },
    {
      rules: [{ dim: 2, level: 'high' }],
      text: '恋してる時のテンションがおかしい。周りに「何かあった？」って聞かれるレベル',
    },
    {
      rules: [{ dim: 3, level: 'high' }],
      text: '理想が高いので恋しにくいけど、ハマったら一直線。沼が深い',
    },
    {
      rules: [{ dim: 5, level: 'high' }],
      text: '片思いを3年温め続けるタイプ。告白のタイミングを永遠に探してる',
    },
    {
      rules: [{ dim: 6, level: 'high' }],
      text: '月に1回くらい好きな人変わる。でも「あ、やっぱこの人だわ」って戻ってくる',
    },
    {
      rules: [{ dim: 4, level: 'high' }],
      text: '好きな人にはベタベタ甘えモード全開。わかりやすすぎてバレバレ',
    },
    {
      rules: [{ dim: 0, level: 'high' }],
      text: '好きな人にだけ異常に優しくなるのでバレバレ。ニコニコが止まらない',
    },
  ],

  // ============================================
  // 6. 充電方法 (rechargeMethod)
  //    主に 社交性(0) × テンション(2) × 自立度(7) で分岐
  // ============================================
  rechargeMethod: [
    {
      rules: [{ dim: 0, level: 'low' }, { dim: 7, level: 'high' }],
      text: '一人カフェ。話しかけないでほしいオーラ全開。自分だけの空間が最高の充電器',
    },
    {
      rules: [{ dim: 0, level: 'high' }, { dim: 2, level: 'high' }],
      text: '友達と遊ぶのが充電。人と会わないと逆にしんどくなるタイプ。予定が空くと病む',
    },
    {
      rules: [{ dim: 1, level: 'high' }, { dim: 0, level: 'low' }],
      text: '自然の中でぼーっとする。海か山があれば回復する。都会の喧騒から離れたい',
    },
    {
      rules: [{ dim: 4, level: 'high' }, { dim: 0, level: 'high' }],
      text: '誰かにくっついてぬくぬくしたい。人肌が一番の充電器。一人は寂しい',
    },
    {
      rules: [{ dim: 1, level: 'high' }],
      text: '自然の中でぼーっとする。海か山があれば全回復。音のない場所が好き',
    },
    {
      rules: [{ dim: 2, level: 'low' }],
      text: '布団の中でスマホいじりながらダラダラ。12時間は必要。起きたら別人',
    },
    {
      rules: [{ dim: 3, level: 'high' }],
      text: '推し活。新しいグッズ買うか推しの動画見れば全回復。オタクの底力',
    },
    {
      rules: [{ dim: 4, level: 'high' }],
      text: '誰かにくっついてぬくぬくしたい。人肌が一番の充電器',
    },
    {
      rules: [{ dim: 5, level: 'high' }],
      text: 'ジムか散歩。体を動かすと頭がスッキリする派。汗かくと悩みも流れる',
    },
    {
      rules: [{ dim: 6, level: 'high' }],
      text: 'その日の気分次第。ある日は料理、ある日はカラオケ、ある日は無。予測不能',
    },
    {
      rules: [{ dim: 7, level: 'high' }],
      text: '一人の時間が最高の贅沢。好きな音楽を聴きながらコーヒーを淹れる至福',
    },
    {
      rules: [{ dim: 0, level: 'high' }],
      text: '友達と電話しまくるか、逆に一人で大音量で音楽聴いて踊る。両極端',
    },
  ],

  // ============================================
  // 7. 取扱注意事項 (cautionNote)
  //    主に 気まぐれ度(6) × 繊細さ(1) × 忍耐力(5) で分岐
  // ============================================
  cautionNote: [
    {
      rules: [{ dim: 5, level: 'high' }, { dim: 1, level: 'high' }],
      text: '限界まで我慢して急に爆発する。前兆は「大丈夫」の回数が増えること。要観察',
    },
    {
      rules: [{ dim: 0, level: 'high' }, { dim: 4, level: 'high' }],
      text: 'かまってちゃん発動すると連投LINEが止まらない。受け止めてあげて',
    },
    {
      rules: [{ dim: 2, level: 'high' }, { dim: 6, level: 'high' }],
      text: 'テンション高い日にノリで約束したことを次の日忘れてる。大事なことはメモさせて',
    },
    {
      rules: [{ dim: 5, level: 'low' }, { dim: 2, level: 'high' }],
      text: 'キレるまでが早い。でも5分で忘れる。嵐のような人だけど悪気はない',
    },
    {
      rules: [{ dim: 6, level: 'high' }],
      text: '昨日のテンションと今日のテンションが別人。でも明日には戻るので放置推奨',
    },
    {
      rules: [{ dim: 1, level: 'high' }],
      text: '機嫌が悪いときはLINEの返事が単語になります。「うん」「おk」が続いたらそっとして',
    },
    {
      rules: [{ dim: 7, level: 'high' }],
      text: '困ってても助けを求めない。倒れてから気づかれるパターン。定期的に確認して',
    },
    {
      rules: [{ dim: 3, level: 'high' }],
      text: '地雷を踏むと無言になる。でも何が地雷だったかは教えてくれない。察して力が必要',
    },
    {
      rules: [{ dim: 4, level: 'high' }],
      text: '寂しいのに「別に寂しくない」と言い始めたら危険信号。すぐ構ってあげて',
    },
    {
      rules: [{ dim: 5, level: 'high' }],
      text: '頑張りすぎて倒れるタイプ。「ちょっと疲れた」は「もう限界」の翻訳。強制的に休ませて',
    },
    {
      rules: [{ dim: 0, level: 'high' }],
      text: '人といすぎると突然シャットダウンする。電池切れは急に来る。充電時間をあげて',
    },
    {
      rules: [{ dim: 2, level: 'low' }],
      text: 'ローテンションの日は何をしても響かない。無理に元気づけないで。放っておけば復活する',
    },
  ],

  // ============================================
  // 8. 相性のいい人 (bestMatch)
  //    全次元の総合で分岐
  // ============================================
  bestMatch: [
    {
      rules: [{ dim: 0, level: 'high' }, { dim: 2, level: 'high' }],
      text: '一緒にはしゃいでくれる人。ノリが合う人最強。テンション合わないと無理',
    },
    {
      rules: [{ dim: 1, level: 'high' }, { dim: 0, level: 'low' }],
      text: '静かに隣にいてくれる人。沈黙が苦にならない関係が理想。言葉より空気感',
    },
    {
      rules: [{ dim: 4, level: 'high' }, { dim: 1, level: 'high' }],
      text: '包容力おばけ。甘えても「しょうがないな～」って受け止めてくれる優しい人',
    },
    {
      rules: [{ dim: 7, level: 'high' }, { dim: 3, level: 'high' }],
      text: '干渉しすぎない人。お互いのこだわりを尊重できる大人な関係が理想',
    },
    {
      rules: [{ dim: 3, level: 'high' }],
      text: '自分のこだわりを否定しない人。むしろ興味を持ってくれたら最高',
    },
    {
      rules: [{ dim: 4, level: 'high' }],
      text: '包容力おばけ。甘えても「しょうがないな～」って受け止めてくれる人',
    },
    {
      rules: [{ dim: 7, level: 'high' }],
      text: '干渉しすぎない人。お互いの時間を尊重できる大人な関係',
    },
    {
      rules: [{ dim: 5, level: 'high' }],
      text: 'ちゃんと気づいてくれる人。こっちが我慢してることに気づける観察力の持ち主',
    },
    {
      rules: [{ dim: 6, level: 'high' }],
      text: '振り回されても笑ってくれる人。もしくは同じくらい気まぐれな人。一緒にカオスを楽しめる',
    },
    {
      rules: [{ dim: 2, level: 'low' }, { dim: 1, level: 'high' }],
      text: '癒し系。争いが嫌いなので穏やかな人が安心する。一緒にいて疲れない人',
    },
    {
      rules: [{ dim: 0, level: 'high' }],
      text: '一緒に盛り上がってくれて、落ちた時は静かに隣にいてくれる人',
    },
    {
      rules: [{ dim: 1, level: 'high' }],
      text: '穏やかで、感受性を「すごいね」と認めてくれる優しい人',
    },
  ],
};
