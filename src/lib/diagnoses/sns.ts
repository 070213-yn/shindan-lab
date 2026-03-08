/**
 * SNSパーソナリティ診断
 *
 * あなたのSNS上での振る舞い・性格傾向を7つの次元から分析し、
 * 14種類のSNSパーソナリティタイプに分類する診断。
 *
 * 理論基盤:
 *   - Turkle(2011) "Alone Together" — デジタルアイデンティティ理論
 *   - Goffman(1959) "The Presentation of Self in Everyday Life" — 自己呈示理論
 *   - Big Five × デジタル行動研究 (Correa et al., 2010)
 *   - Boyd(2014) "It's Complicated" — 10代のSNS利用研究
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const snsDiagnosis: DiagnosisConfig = {
  id: 'sns',
  title: 'SNSパーソナリティ診断',
  subtitle: 'あなたのSNS人格タイプは？',
  catchphrase: 'タイムラインの向こう側にいる「本当のあなた」を暴く！',
  description:
    'SNSでの投稿スタイル、フォロワーとの関わり方、情報収集の仕方など25問の質問から、あなたのSNS上での性格タイプを科学的に分析します。Turkleのデジタルアイデンティティ理論やGoffmanの自己呈示理論をベースに設計された本格診断です。',
  emoji: '📱',
  themeColor: '#00CED1',
  gradientFrom: '#00CED1',
  gradientTo: '#7B68EE',

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
      defaultValue: 14,
      unit: '歳',
    },
  ],

  // --- 7次元スコアリング ---
  // 0: 発信力, 1: 影響力, 2: 共感力, 3: 匿名性志向, 4: 承認欲求, 5: 情報感度, 6: クリエイティブ力
  dimensions: [
    { key: 'broadcast',   label: '発信力',       color: '#FF6B6B' },
    { key: 'influence',   label: '影響力',       color: '#FFD93D' },
    { key: 'empathy',     label: '共感力',       color: '#6BCB77' },
    { key: 'anonymity',   label: '匿名性志向',   color: '#4D96FF' },
    { key: 'approval',    label: '承認欲求',     color: '#FF6EC7' },
    { key: 'infoSense',   label: '情報感度',     color: '#A66CFF' },
    { key: 'creative',    label: 'クリエイティブ力', color: '#F7A76C' },
  ],

  // --- セクション ---
  sections: {
    1: '投稿スタイル',
    2: 'フォロワーとの関係',
    3: '情報収集',
    4: '自己表現',
    5: 'デジタルマナー',
    6: '炎上対応',
  },

  // --- 質問データ（28問） ---
  // weights: [発信力, 影響力, 共感力, 匿名性志向, 承認欲求, 情報感度, クリエイティブ力]
  questions: [
    // === セクション1: 投稿スタイル（5問） ===
    {
      sid: 1, sectionName: '投稿スタイル', emoji: '✍️',
      text: '面白いことがあったとき、すぐSNSに投稿したくなる',
      source: 'Turkle(2011) Alone Together — デジタル自己表現衝動',
      weights: [2, 0, 0, -1, 1, 0, 0],
    },
    {
      sid: 1, sectionName: '投稿スタイル', emoji: '📸',
      text: '投稿する前に写真の加工やフィルター選びにこだわる',
      source: 'Goffman(1959) 自己呈示理論 — 印象管理',
      weights: [1, 0, 0, 0, 1, 0, 2],
    },
    {
      sid: 1, sectionName: '投稿スタイル', emoji: '🔄',
      text: '一度投稿した内容を削除して書き直すことがよくある',
      source: 'Walther(1996) 超個人的コミュニケーション理論',
      weights: [0, 0, 0, 1, 2, 0, 0],
    },
    {
      sid: 1, sectionName: '投稿スタイル', emoji: '📝',
      text: '長文でじっくり自分の考えを書くのが好きだ',
      source: 'Boyd(2014) It\'s Complicated — 自己表現と文脈崩壊',
      weights: [2, 1, 0, 0, 0, 1, 1],
    },
    {
      sid: 1, sectionName: '投稿スタイル', emoji: '🎬',
      text: '動画やリール・ショート動画を作って投稿するのが好き',
      source: 'Correa et al.(2010) Big Five × SNS利用行動研究',
      weights: [2, 1, 0, -1, 1, 0, 2],
    },

    // === セクション2: フォロワーとの関係（5問） ===
    {
      sid: 2, sectionName: 'フォロワーとの関係', emoji: '💬',
      text: '知らない人からのコメントやDMにも積極的に返信する',
      source: 'Ellison & Vitak(2015) ソーシャルネットワークサイトの関係維持',
      weights: [1, 1, 2, -1, 0, 0, 0],
    },
    {
      sid: 2, sectionName: 'フォロワーとの関係', emoji: '👥',
      text: 'フォロワー数が増えると嬉しくてモチベーションが上がる',
      source: 'Zell & Moeller(2018) SNSの自己価値感への影響',
      weights: [0, 2, 0, -1, 2, 0, 0],
    },
    {
      sid: 2, sectionName: 'フォロワーとの関係', emoji: '🤝',
      text: 'SNSで知り合った人とリアルでも会ってみたいと思う',
      source: 'Turkle(2011) デジタル関係のリアル化',
      weights: [0, 1, 2, -2, 0, 0, 0],
    },
    {
      sid: 2, sectionName: 'フォロワーとの関係', emoji: '🔔',
      text: '推しや気になる人の投稿は通知ONにして即チェックする',
      source: 'Baym(2010) Personal Connections in the Digital Age',
      weights: [0, 0, 2, 0, 0, 2, 0],
    },
    {
      sid: 2, sectionName: 'フォロワーとの関係', emoji: '🚫',
      text: '合わない人はすぐブロックやミュートする',
      source: 'Marwick & Boyd(2011) 文脈崩壊とプライバシー',
      weights: [0, 0, -1, 2, 0, 1, 0],
    },

    // === セクション3: 情報収集（5問） ===
    {
      sid: 3, sectionName: '情報収集', emoji: '🔍',
      text: 'トレンドやハッシュタグをチェックして流行を追うのが好きだ',
      source: 'Hermida(2010) アンビエント・ジャーナリズム理論',
      weights: [0, 0, 0, 0, 0, 2, 1],
    },
    {
      sid: 3, sectionName: '情報収集', emoji: '📰',
      text: 'ニュースや社会問題をSNSで知ることが多い',
      source: 'Gil de Zúñiga et al.(2012) SNSと政治参加の関係研究',
      weights: [0, 0, 1, 0, 0, 2, 0],
    },
    {
      sid: 3, sectionName: '情報収集', emoji: '🧐',
      text: 'バズっている投稿を見たとき、情報源を確認してから信じる',
      source: 'Tandoc et al.(2018) フェイクニュースとメディアリテラシー',
      weights: [0, 1, 0, 0, -1, 2, 0],
    },
    {
      sid: 3, sectionName: '情報収集', emoji: '📊',
      text: '自分の投稿のインプレッション数やアナリティクスをよく見る',
      source: 'Van Dijck(2013) The Culture of Connectivity',
      weights: [1, 2, 0, 0, 1, 1, 0],
    },
    {
      sid: 3, sectionName: '情報収集', emoji: '🕵️',
      text: '投稿せずにタイムラインを見るだけ（ROM専）の時間が長い',
      source: 'Nonnecke & Preece(2000) ラーカー行動研究',
      weights: [-2, 0, 1, 2, 0, 1, 0],
    },

    // === セクション4: 自己表現（5問） ===
    {
      sid: 4, sectionName: '自己表現', emoji: '🎭',
      text: 'SNSでは現実の自分と違うキャラを演じている気がする',
      source: 'Goffman(1959) 表舞台と裏舞台 — 印象管理理論',
      weights: [0, 0, 0, 2, 1, 0, 1],
    },
    {
      sid: 4, sectionName: '自己表現', emoji: '🔐',
      text: '本音は裏アカ（サブアカウント）に書く',
      source: 'Marwick & Boyd(2011) 文脈崩壊と複数アカウント戦略',
      weights: [1, 0, 0, 2, 0, 0, 0],
    },
    {
      sid: 4, sectionName: '自己表現', emoji: '🌟',
      text: 'プロフィール写真やアイコンの選び方にはこだわりがある',
      source: 'Hancock & Toma(2009) オンライン自己呈示と理想自己',
      weights: [0, 1, 0, 0, 2, 0, 2],
    },
    {
      sid: 4, sectionName: '自己表現', emoji: '💭',
      text: 'エモい・ポエムっぽい投稿をして気持ちを表現するのが好き',
      source: 'Pennebaker(2011) 表現的筆記と感情処理の研究',
      weights: [1, 0, 1, 0, 1, 0, 2],
    },
    {
      sid: 4, sectionName: '自己表現', emoji: '🏷️',
      text: '複数のSNSアカウントを使い分けている',
      source: 'Zhao et al.(2008) オンライン・アイデンティティの構築研究',
      weights: [1, 0, 0, 2, 0, 1, 1],
    },

    // === セクション5: デジタルマナー（4問） ===
    {
      sid: 5, sectionName: 'デジタルマナー', emoji: '🤔',
      text: '他人の投稿にネガティブなコメントを見つけると気になる',
      source: 'Suler(2004) オンライン脱抑制効果',
      weights: [0, 0, 2, 0, 0, 1, 0],
    },
    {
      sid: 5, sectionName: 'デジタルマナー', emoji: '⚖️',
      text: '投稿する前に「これを見て傷つく人がいないか」考える',
      source: 'Valkenburg & Peter(2009) 青少年のSNS利用と社会的影響',
      weights: [0, 0, 2, 0, -1, 0, 0],
    },
    {
      sid: 5, sectionName: 'デジタルマナー', emoji: '🔒',
      text: '自分の個人情報や位置情報はSNSに載せないようにしている',
      source: 'Livingstone(2008) 子どものオンラインプライバシー研究',
      weights: [-1, 0, 0, 2, 0, 1, 0],
    },
    {
      sid: 5, sectionName: 'デジタルマナー', emoji: '👍',
      text: 'いいねやリアクションはこまめにつけるほうだ',
      source: 'Scissors et al.(2016) フィードバック行動と社会的絆',
      weights: [0, 0, 2, -1, 0, 0, 0],
    },

    // === セクション6: 炎上対応（4問） ===
    {
      sid: 6, sectionName: '炎上対応', emoji: '🔥',
      text: '炎上している話題を見つけると、つい経緯を追いかけてしまう',
      source: 'Crockett(2017) SNSにおける道徳的憤りの伝播研究',
      weights: [0, 0, 0, 1, 0, 2, 0],
    },
    {
      sid: 6, sectionName: '炎上対応', emoji: '🛡️',
      text: '友達が炎上したら、味方になって助けたいと思う',
      source: 'Barlińska et al.(2013) ネットいじめにおける傍観者行動',
      weights: [1, 1, 2, 0, 0, 0, 0],
    },
    {
      sid: 6, sectionName: '炎上対応', emoji: '🧯',
      text: '炎上しそうな投稿を見たら「落ち着こう」と仲裁に入りたくなる',
      source: 'Kowalski et al.(2014) ネットいじめ介入戦略の研究',
      weights: [1, 2, 2, -1, 0, 0, 0],
    },
    {
      sid: 6, sectionName: '炎上対応', emoji: '🤐',
      text: 'SNSでの議論や対立には関わらないようにしている',
      source: 'Hampton et al.(2014) ソーシャルメディアと沈黙の螺旋',
      weights: [-1, -1, 0, 2, 0, 0, 0],
    },
  ],

  // --- 14種類の結果タイプ ---
  // scoreWeights: [発信力, 影響力, 共感力, 匿名性志向, 承認欲求, 情報感度, クリエイティブ力]
  resultTypes: [
    {
      id: 'buzz-genius',
      emoji: '⚡',
      name: 'バズりの天才',
      tag: '#天性のバイラルメーカー',
      color: '#FF4500',
      description:
        'あなたはSNSの空気を読む天才。何気ない一言がバズる才能を持っています。トレンドを先読みし、みんなが「それ！」と思う投稿を自然に生み出せるのは、高い発信力と情報感度の賜物です。',
      advice:
        'バズる力は素晴らしいけど、発信する内容の責任も伴います。影響力が大きい分、「本当にこれを広めていいか？」を一呼吸置いて考える習慣をつけると、もっと信頼されるアカウントになれます。',
      traits: ['トレンドの先読み', '天然バイラル体質', '言語センス抜群', 'タイミング上手'],
      scoreWeights: [3, 2, 0, 0, 1, 2, 1],
    },
    {
      id: 'rom-observer',
      emoji: '🔭',
      name: 'ROM専の観察者',
      tag: '#静かなる情報通',
      color: '#4169E1',
      description:
        'タイムラインの裏でじっくり世界を観察するあなた。投稿は少なくても、誰よりも広く深く情報を集めています。「見ているだけ」に見えて、実は一番状況を把握しているタイプです。',
      advice:
        'たまには自分の感想や意見をつぶやいてみて。あなたの鋭い視点は、きっと多くの人の気づきになるはず。小さな一言から始めてみよう。',
      traits: ['鋭い観察眼', '情報収集力', '冷静な分析', '多角的視点'],
      scoreWeights: [0, 0, 1, 2, 0, 3, 0],
    },
    {
      id: 'story-artisan',
      emoji: '✨',
      name: 'ストーリー映え職人',
      tag: '#ビジュアルの魔術師',
      color: '#FF69B4',
      description:
        '写真加工、フィルター選び、ストーリーの構成…すべてにこだわるビジュアル派。あなたの投稿はまるで作品のよう。「映え」を追求する姿勢は、実は高いクリエイティブ力の表れです。',
      advice:
        '美しい投稿の裏には努力がある。でも、たまには加工なしの「リアル」を見せてみるのも魅力的。完璧じゃない自分も、きっとフォロワーは好きになってくれるよ。',
      traits: ['美的センス', '加工スキル', 'こだわり気質', 'ビジュアル表現力'],
      scoreWeights: [1, 0, 0, 0, 2, 0, 3],
    },
    {
      id: 'reply-communicator',
      emoji: '💬',
      name: 'リプ魔のコミュニケーター',
      tag: '#会話の達人',
      color: '#32CD32',
      description:
        'タイムラインの盛り上げ役。リプ・コメント・引用RTで常に誰かと会話しているあなたは、SNSの社交場を最も楽しんでいるタイプ。高い共感力と発信力で、コミュニティの中心にいます。',
      advice:
        '会話を楽しむのは素敵だけど、自分の時間も大切に。SNSに費やす時間を意識して、オフラインの趣味や友達との時間も充実させよう。',
      traits: ['会話好き', '共感上手', 'コミュニティ貢献', '社交的'],
      scoreWeights: [2, 1, 3, 0, 0, 0, 0],
    },
    {
      id: 'dark-resident',
      emoji: '🌙',
      name: '闇アカの住人',
      tag: '#夜のタイムライン',
      color: '#483D8B',
      description:
        '裏アカ・サブアカで本音を吐き出すあなた。表と裏を使い分けるのは、実はとても器用な証拠。匿名性の安心感の中でこそ、あなたの本当の感性が輝いています。',
      advice:
        '裏アカでの本音は大切な自己表現。でも、ネガティブな内容ばかりにならないよう注意。信頼できる友達には、表アカでも少しずつ本音を見せてみよう。',
      traits: ['本音と建前の使い分け', '深い内省力', '感受性豊か', '独自の世界観'],
      scoreWeights: [1, 0, 0, 3, 1, 0, 1],
    },
    {
      id: 'influencer-egg',
      emoji: '🥚',
      name: 'インフルエンサー予備軍',
      tag: '#未来のトップクリエイター',
      color: '#FFD700',
      description:
        '影響力への憧れと高い承認欲求を持つあなた。フォロワーを増やすためにアナリティクスを研究し、戦略的に投稿する。その努力と情熱は、将来大きく花開く可能性を秘めています。',
      advice:
        'フォロワー数だけが価値じゃない。本当に好きなことを発信し続けることが、結果的に一番フォロワーに響く。焦らず「自分らしさ」を磨こう。',
      traits: ['戦略的思考', '成長志向', '数字への意識', '高いモチベーション'],
      scoreWeights: [2, 3, 0, 0, 2, 1, 1],
    },
    {
      id: 'account-master',
      emoji: '🎭',
      name: 'アカウント使い分けの達人',
      tag: '#七変化のデジタル人格',
      color: '#9370DB',
      description:
        '趣味垢、推し垢、リア友用…複数のアカウントを自在に操るあなた。それぞれの場で最適な自分を見せる能力は、デジタル時代の高度な社会スキルです。',
      advice:
        '使い分け上手は素晴らしいけど、「本当の自分」を見失わないようにね。全部のアカウントに共通する「核」を意識すると、もっと楽にSNSを楽しめるよ。',
      traits: ['適応力抜群', '文脈理解力', '多面的な自己', '高い社会的知性'],
      scoreWeights: [1, 0, 1, 2, 0, 1, 2],
    },
    {
      id: 'like-machine',
      emoji: '❤️',
      name: 'いいね製造機',
      tag: '#みんなの味方',
      color: '#FF1493',
      description:
        'タイムラインに流れてくる投稿にいいねやリアクションを惜しみなく送るあなた。その温かさはフォロワーに安心感を与え、SNSの空気を良くしている縁の下の力持ちです。',
      advice:
        'いいねを送るだけでなく、自分の意見や感想もコメントで伝えてみて。あなたの温かい言葉は、いいねボタン以上の力を持っているはず。',
      traits: ['応援上手', '温かい性格', '受容力が高い', '平和主義'],
      scoreWeights: [0, 0, 3, 0, 0, 0, 0],
    },
    {
      id: 'firefighter',
      emoji: '🧯',
      name: '炎上消火隊長',
      tag: '#SNSの平和維持部隊',
      color: '#DC143C',
      description:
        '炎上を見つけると冷静に状況を分析し、仲裁に入りたくなるあなた。高い影響力と共感力を兼ね備え、荒れたタイムラインに秩序をもたらす存在です。',
      advice:
        '正義感は素晴らしいけど、全ての炎上に首を突っ込む必要はないよ。自分のメンタルを守ることも大切。「これは本当に自分が関わるべき？」と一歩引いて考えてみて。',
      traits: ['正義感が強い', '冷静な判断力', '仲裁力', 'リーダーシップ'],
      scoreWeights: [1, 2, 2, 0, 0, 1, 0],
    },
    {
      id: 'oshi-warrior',
      emoji: '🗡️',
      name: '推し垢の戦士',
      tag: '#推しは人生',
      color: '#FF6347',
      description:
        '推しのためなら何でもする！布教活動・ファンアート・イベント参加…推しへの愛を全力でSNSに注ぐあなた。その情熱と行動力は、ファンコミュニティの原動力です。',
      advice:
        '推し活は最高の趣味。でも推しに依存しすぎないように。自分自身の生活や他の趣味も大切にすると、推し活ももっと楽しくなるよ。',
      traits: ['圧倒的な情熱', '行動力', 'ファンコミュニティ形成力', '献身的'],
      scoreWeights: [2, 0, 2, 0, 1, 1, 1],
    },
    {
      id: 'shadow-philosopher',
      emoji: '🦉',
      name: '裏アカの哲学者',
      tag: '#深夜の思想家',
      color: '#2F4F4F',
      description:
        '匿名の世界で深い思索をつぶやくあなた。日常のふとした瞬間に哲学的な問いを見出し、言葉にする能力は唯一無二。裏アカのタイムラインは、あなただけの思想書です。',
      advice:
        'その深い思考力は宝物。でも、考えすぎてしんどくなったら一度SNSから離れてみて。散歩や音楽など、頭を休める時間も大事にしよう。',
      traits: ['深い思考力', '言語化能力', '内省的', '独自の哲学'],
      scoreWeights: [1, 0, 0, 3, 0, 1, 2],
    },
    {
      id: 'info-curator',
      emoji: '📚',
      name: '情報キュレーター',
      tag: '#歩くまとめサイト',
      color: '#008B8B',
      description:
        '膨大な情報を整理して発信するあなた。ニュース・トレンド・豆知識…あなたのアカウントはフォロワーにとって最高の情報源。高い情報感度と発信力の持ち主です。',
      advice:
        '情報をまとめる力は素晴らしい。ただし、情報の正確性には常に気をつけて。「ソースを確認する」習慣を持つと、もっと信頼されるキュレーターになれるよ。',
      traits: ['整理能力', '幅広い知識', '情報リテラシー', '要約力'],
      scoreWeights: [2, 1, 0, 0, 0, 3, 0],
    },
    {
      id: 'emo-poet',
      emoji: '🌸',
      name: 'エモ投稿の詩人',
      tag: '#言葉で世界を彩る',
      color: '#DA70D6',
      description:
        '感情を美しい言葉にして投稿するあなた。日常の風景や心の揺れ動きを詩的に表現する力は、フォロワーの心に響きます。クリエイティブ力と承認欲求が生み出す、SNS上の文学作品です。',
      advice:
        'あなたの言葉には人を動かす力がある。でも「共感されたい」気持ちが強くなりすぎたら要注意。書くことそのものを楽しむ心を忘れないでね。',
      traits: ['詩的表現力', '感受性の高さ', '情緒豊か', '美的感覚'],
      scoreWeights: [1, 0, 1, 0, 2, 0, 3],
    },
    {
      id: 'stealth-leader',
      emoji: '🐾',
      name: 'ステルスリーダー',
      tag: '#見えないカリスマ',
      color: '#556B2F',
      description:
        '目立つ投稿はしないけど、裏でコミュニティを支えているあなた。グループのまとめ役やイベントの調整役を自然にこなす。影響力と共感力を静かに発揮するタイプです。',
      advice:
        '縁の下の力持ちとしての役割は素晴らしい。でも、たまには自分のやりたいことも発信してみて。あなたが前に出ると、みんな喜んでついてくるよ。',
      traits: ['調整力', '気配り上手', '信頼感', '裏方力'],
      scoreWeights: [0, 2, 2, 1, 0, 1, 0],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#SNSパーソナリティ診断', '#あなたのSNSタイプ', '#ときめき研究所'],
  references: [
    'Turkle, S. (2011). Alone Together: Why We Expect More from Technology and Less from Each Other. Basic Books.',
    'Goffman, E. (1959). The Presentation of Self in Everyday Life. Anchor Books.',
    'Boyd, D. (2014). It\'s Complicated: The Social Lives of Networked Teens. Yale University Press.',
    'Correa, T., Hinsley, A. W., & de Zúñiga, H. G. (2010). Who interacts on the Web? The intersection of users\' personality and social media use. Computers in Human Behavior, 26(2), 247-253.',
    'Ellison, N. B., & Vitak, J. (2015). Social Network Site Affordances and Their Relationship to Social Capital Processes. In S. S. Sundar (Ed.), The Handbook of the Psychology of Communication Technology.',
    'Walther, J. B. (1996). Computer-Mediated Communication: Impersonal, Interpersonal, and Hyperpersonal Interaction. Communication Research, 23(1), 3-43.',
    'Marwick, A. E., & Boyd, D. (2011). I tweet honestly, I tweet passionately: Twitter users, context collapse, and the imagined audience. New Media & Society, 13(1), 114-133.',
    'Suler, J. (2004). The Online Disinhibition Effect. CyberPsychology & Behavior, 7(3), 321-326.',
  ],
};
