/**
 * メンタル耐性診断
 *
 * 理論基盤:
 *   - Connor-Davidson Resilience Scale (CD-RISC) — Connor & Davidson (2003)
 *   - ポジティブ心理学 — Seligman (1998) Learned Optimism
 *   - マインドセット理論 — Dweck (2006) Growth Mindset
 *   - 自己効力感理論 — Bandura (1997) Self-Efficacy
 *
 * 7次元: 回復力, 楽観性, 自己効力感, 感情調整力, 柔軟性, 粘り強さ, 社会的サポート活用力
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const mentalDiagnosis: DiagnosisConfig = {
  id: 'mental',
  title: 'メンタル耐性診断',
  subtitle: 'あなたのメンタルの強さを科学的に解析！',
  catchphrase: 'ストレスに負けない心の秘密、知ってみない？',
  description:
    '心理学のレジリエンス（回復力）研究をベースに、あなたのメンタルの特徴を7つの軸で分析します。28問の質問に正直に答えて、自分の心の強みを発見しましょう！',
  emoji: '🧠',
  themeColor: '#2ECC71',
  gradientFrom: '#2ECC71',
  gradientTo: '#27AE60',

  // --- プロフィール入力 ---
  profileFields: [
    {
      id: 'gender',
      label: '性別',
      type: 'select',
      options: [
        { value: 'male', label: '男性', emoji: '🧑' },
        { value: 'female', label: '女性', emoji: '👩' },
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

  // --- 7次元のスコアリング ---
  dimensions: [
    { key: 'recovery',    label: '回復力',               color: '#2ECC71' },
    { key: 'optimism',    label: '楽観性',               color: '#F1C40F' },
    { key: 'efficacy',    label: '自己効力感',           color: '#E74C3C' },
    { key: 'regulation',  label: '感情調整力',           color: '#3498DB' },
    { key: 'flexibility', label: '柔軟性',               color: '#9B59B6' },
    { key: 'grit',        label: '粘り強さ',             color: '#E67E22' },
    { key: 'support',     label: '社会的サポート活用力', color: '#1ABC9C' },
  ],

  // --- セクション定義 ---
  sections: {
    1: 'ストレス対処',
    2: '自己認識',
    3: '対人場面',
    4: '挑戦への姿勢',
    5: '日常の感情',
    6: '回復パターン',
  },

  // --- 28問の質問データ ---
  // weights: [回復力, 楽観性, 自己効力感, 感情調整力, 柔軟性, 粘り強さ, サポート活用]
  questions: [
    // === セクション1: ストレス対処 5問 ===
    {
      sid: 1,
      sectionName: 'ストレス対処',
      emoji: '😤',
      text: '明日テストなのに全然勉強してない！こんなとき、あなたは？',
      source: 'Connor & Davidson (2003) — CD-RISC ストレス対処項目',
      weights: [1, 1, 2, 0, 1, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'ストレス対処',
      emoji: '📱',
      text: 'SNSで自分の悪口を見つけてしまった。最初に思うことは？',
      source: 'Seligman (1998) — 楽観的・悲観的説明スタイルの評価',
      weights: [2, 1, 0, 2, 0, 0, 1],
    },
    {
      sid: 1,
      sectionName: 'ストレス対処',
      emoji: '🏫',
      text: '部活の試合で大きなミスをしてしまった。そのあとの気持ちは？',
      source: 'Dweck (2006) — 成長マインドセット vs 固定マインドセット',
      weights: [2, 0, 1, 1, 0, 2, 0],
    },
    {
      sid: 1,
      sectionName: 'ストレス対処',
      emoji: '😰',
      text: '友達同士のケンカに巻き込まれた。あなたの行動は？',
      source: 'Connor & Davidson (2003) — 対人ストレス対処尺度',
      weights: [0, 0, 1, 2, 2, 0, 1],
    },
    {
      sid: 1,
      sectionName: 'ストレス対処',
      emoji: '⏰',
      text: '楽しみにしていた予定が急にキャンセルになった。どう感じる？',
      source: 'Seligman (1998) — 帰属スタイル（一時的vs永続的）の評価',
      weights: [1, 2, 0, 1, 2, 0, 0],
    },

    // === セクション2: 自己認識 5問 ===
    {
      sid: 2,
      sectionName: '自己認識',
      emoji: '🪞',
      text: '「自分のいいところは？」と聞かれたら、すぐに答えられる？',
      source: 'Bandura (1997) — 自己効力感の自己評価',
      weights: [0, 1, 3, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '自己認識',
      emoji: '📊',
      text: 'テストの結果が返ってきた。予想より悪かったとき、どう考える？',
      source: 'Dweck (2006) — 成長マインドセットの失敗解釈パターン',
      weights: [1, 1, 1, 0, 1, 2, 0],
    },
    {
      sid: 2,
      sectionName: '自己認識',
      emoji: '🎯',
      text: '将来の夢について聞かれたとき、あなたの気持ちに近いのは？',
      source: 'Bandura (1997) — 目標設定と自己効力感の関係',
      weights: [0, 2, 2, 0, 0, 1, 0],
    },
    {
      sid: 2,
      sectionName: '自己認識',
      emoji: '💭',
      text: '寝る前に今日一日を振り返ることがある？',
      source: 'Connor & Davidson (2003) — 自己認識と内省の評価項目',
      weights: [1, 0, 0, 2, 1, 0, 0],
    },
    {
      sid: 2,
      sectionName: '自己認識',
      emoji: '🔄',
      text: '「自分って変わったな」と思うことはある？',
      source: 'Dweck (2006) — 成長マインドセットの自己変化認知',
      weights: [1, 0, 1, 0, 2, 1, 0],
    },

    // === セクション3: 対人場面 5問 ===
    {
      sid: 3,
      sectionName: '対人場面',
      emoji: '🤝',
      text: '困ったとき、誰かに相談するのは得意？',
      source: 'Connor & Davidson (2003) — 社会的サポート活用尺度',
      weights: [0, 0, 0, 0, 0, 0, 3],
    },
    {
      sid: 3,
      sectionName: '対人場面',
      emoji: '😢',
      text: '友達に「元気ないね」と言われた。本当につらいとき、正直に話せる？',
      source: 'Seligman (1998) — 社会的つながりと楽観性の関係',
      weights: [1, 0, 0, 1, 0, 0, 3],
    },
    {
      sid: 3,
      sectionName: '対人場面',
      emoji: '🙋',
      text: 'クラスで発表するとき、どう感じる？',
      source: 'Bandura (1997) — 社会的場面での自己効力感',
      weights: [0, 1, 2, 1, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: '対人場面',
      emoji: '💔',
      text: '仲良しの友達と気まずくなったとき、あなたは？',
      source: 'Connor & Davidson (2003) — 対人レジリエンス項目',
      weights: [1, 0, 1, 1, 1, 1, 2],
    },
    {
      sid: 3,
      sectionName: '対人場面',
      emoji: '🎁',
      text: '誰かに助けてもらったとき、素直に「ありがとう」と言える？',
      source: 'Seligman (1998) — ポジティブ心理学における感謝の評価',
      weights: [0, 1, 0, 1, 0, 0, 2],
    },

    // === セクション4: 挑戦への姿勢 5問 ===
    {
      sid: 4,
      sectionName: '挑戦への姿勢',
      emoji: '🧗',
      text: '今まで一度もやったことがないことに誘われた。あなたの反応は？',
      source: 'Dweck (2006) — 成長マインドセットの挑戦受容度',
      weights: [0, 1, 2, 0, 2, 1, 0],
    },
    {
      sid: 4,
      sectionName: '挑戦への姿勢',
      emoji: '🏆',
      text: '大会やコンクールに出るか迷っている。あなたの気持ちは？',
      source: 'Bandura (1997) — 課題遂行における自己効力感評価',
      weights: [0, 1, 2, 0, 0, 2, 0],
    },
    {
      sid: 4,
      sectionName: '挑戦への姿勢',
      emoji: '📚',
      text: '難しい問題にぶつかったとき、どうする？',
      source: 'Dweck (2006) — 困難場面での持続性と成長志向',
      weights: [0, 0, 1, 0, 1, 3, 0],
    },
    {
      sid: 4,
      sectionName: '挑戦への姿勢',
      emoji: '🌱',
      text: '「努力しても才能には勝てない」という意見、どう思う？',
      source: 'Dweck (2006) — 固定vs成長マインドセットの信念評価',
      weights: [0, 1, 1, 0, 1, 3, 0],
    },
    {
      sid: 4,
      sectionName: '挑戦への姿勢',
      emoji: '🚀',
      text: '失敗したあと、もう一回チャレンジする気持ちになれる？',
      source: 'Connor & Davidson (2003) — レジリエンスの回復行動項目',
      weights: [2, 1, 1, 0, 0, 2, 0],
    },

    // === セクション5: 日常の感情 4問 ===
    {
      sid: 5,
      sectionName: '日常の感情',
      emoji: '☀️',
      text: '朝起きたとき、「今日も一日がんばろう」と思えることが多い？',
      source: 'Seligman (1998) — 楽観性尺度の日常評価',
      weights: [1, 3, 0, 0, 0, 1, 0],
    },
    {
      sid: 5,
      sectionName: '日常の感情',
      emoji: '😊',
      text: '嫌なことがあっても、しばらくすると気持ちを切り替えられる？',
      source: 'Connor & Davidson (2003) — 感情回復力の評価',
      weights: [3, 1, 0, 1, 1, 0, 0],
    },
    {
      sid: 5,
      sectionName: '日常の感情',
      emoji: '😠',
      text: 'イライラしたとき、自分なりの落ち着き方を持っている？',
      source: 'Bandura (1997) — 感情調整の自己効力感',
      weights: [1, 0, 1, 3, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: '日常の感情',
      emoji: '🌧️',
      text: '何日も気分が沈むことがある？',
      source: 'Seligman (1998) — 悲観的説明スタイルの持続性評価',
      weights: [2, 2, 0, 1, 0, 0, 1],
    },

    // === セクション6: 回復パターン 4問 ===
    {
      sid: 6,
      sectionName: '回復パターン',
      emoji: '🛁',
      text: '落ち込んだとき、一番回復するのはどんなとき？',
      source: 'Connor & Davidson (2003) — 回復メカニズムの分類',
      weights: [2, 0, 0, 1, 1, 0, 2],
    },
    {
      sid: 6,
      sectionName: '回復パターン',
      emoji: '🎮',
      text: 'ストレス発散法として一番やっているのは？',
      source: 'Seligman (1998) — ポジティブ活動と回復力の関連',
      weights: [2, 1, 0, 1, 1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '回復パターン',
      emoji: '🌈',
      text: 'つらい経験のあと、「あれがあったから今の自分がある」と思えるタイプ？',
      source: 'Connor & Davidson (2003) — ポストトラウマ的成長(PTG)評価',
      weights: [2, 2, 1, 0, 1, 1, 0],
    },
    {
      sid: 6,
      sectionName: '回復パターン',
      emoji: '💤',
      text: '悩みがあるとき、ぐっすり眠れる？',
      source: 'Connor & Davidson (2003) — ストレス下の身体的回復力',
      weights: [2, 1, 0, 2, 1, 0, 0],
    },
  ],

  // --- 12種類の結果タイプ ---
  // scoreWeights: [回復力, 楽観性, 自己効力感, 感情調整力, 柔軟性, 粘り強さ, サポート活用]
  resultTypes: [
    {
      id: 'diamond',
      emoji: '💎',
      name: 'ダイヤモンドメンタル',
      tag: '#最強の輝き',
      color: '#B9F2FF',
      description:
        'あなたのメンタルはダイヤモンドのように硬く、美しく輝いています。どんな圧力にも押しつぶされず、むしろ輝きを増す最強タイプ。全ての次元が高水準で、まさに心の宝石です。',
      advice:
        '強すぎるがゆえに、他の人の弱さに気づきにくいこともあるかも。「弱さ」も個性として認めてあげよう。',
      traits: ['圧倒的な回復力', '揺るがない自信', '冷静沈着', 'どんな環境でも輝く'],
      scoreWeights: [3, 2, 3, 2, 2, 3, 1],
    },
    {
      id: 'flexible',
      emoji: '🌿',
      name: 'しなやかメンタル',
      tag: '#柳のようにしなる強さ',
      color: '#7DCEA0',
      description:
        'あなたのメンタルは柳のようにしなやか。強風（ストレス）が吹いても折れずにしなり、風が止めば元に戻る柔軟性が最大の武器です。',
      advice:
        '柔軟すぎて「流されている」と感じることもあるかも。自分の軸をしっかり持つことも意識してみよう。',
      traits: ['適応力が高い', '切り替えが早い', '変化を楽しめる', '受容力がある'],
      scoreWeights: [2, 1, 1, 1, 3, 1, 2],
    },
    {
      id: 'iron',
      emoji: '🔩',
      name: '不屈の鉄心',
      tag: '#絶対に折れない意志',
      color: '#ABB2B9',
      description:
        'あなたのメンタルは鉄のように頑強。一度決めたことは何があっても最後までやり遂げる不屈の精神力を持っています。粘り強さは誰にも負けません。',
      advice:
        '頑固になりすぎると、自分も周りも疲れちゃうことがあるよ。たまには「まあいっか」も大事だよ。',
      traits: ['粘り強い', '意志が強い', '責任感がある', '最後までやりきる'],
      scoreWeights: [1, 0, 2, 1, 0, 3, 0],
    },
    {
      id: 'sunshine',
      emoji: '🌻',
      name: '陽だまりメンタル',
      tag: '#みんなを温める太陽',
      color: '#F9E79F',
      description:
        'あなたのメンタルは陽だまりのように温かく、ポジティブなエネルギーに満ちています。楽観的な性格で、まわりの人まで明るくする太陽のような存在です。',
      advice:
        '明るさの裏で無理をしていないか、たまに自分の気持ちを確認してね。泣きたいときは泣いていいんだよ。',
      traits: ['ポジティブ思考', '明るい', '周囲を元気にする', '楽観的'],
      scoreWeights: [1, 3, 1, 0, 1, 1, 2],
    },
    {
      id: 'stillwater',
      emoji: '🌊',
      name: '静水メンタル',
      tag: '#深く静かな強さ',
      color: '#85C1E9',
      description:
        'あなたのメンタルは深い湖のように静かで穏やか。表面は穏やかでも、内面には驚くほどの深さと強さを秘めています。感情のコントロールが抜群です。',
      advice:
        '感情を抑え込みすぎると、ある日突然あふれ出ることもあるよ。信頼できる人には素直に気持ちを打ち明けてね。',
      traits: ['冷静', '感情コントロールが上手', '内面が深い', '穏やか'],
      scoreWeights: [1, 0, 1, 3, 1, 1, 0],
    },
    {
      id: 'lighthouse',
      emoji: '🗼',
      name: '嵐の中の灯台',
      tag: '#暗闇を照らす希望の光',
      color: '#F5B041',
      description:
        'あなたのメンタルは嵐の中でも消えない灯台の光。困難な状況でも希望を見失わず、まわりの人にも道を示す頼もしい存在です。',
      advice:
        '灯台は自分の足元を照らせないと言われるように、自分自身のケアも忘れないでね。',
      traits: ['希望を持ち続ける', '困難に強い', 'リーダーシップ', '安定感がある'],
      scoreWeights: [2, 2, 2, 1, 0, 2, 1],
    },
    {
      id: 'bamboo',
      emoji: '🎋',
      name: '竹メンタル',
      tag: '#まっすぐに、しなやかに',
      color: '#82E0AA',
      description:
        'あなたのメンタルは竹のようにまっすぐで、しなやか。成長スピードが速く、困難に柔軟に対応しつつも、芯はブレない理想的なバランスの持ち主です。',
      advice:
        '成長が速い分、根っこ（基本）がおろそかになることも。基盤をしっかり固めることも意識しよう。',
      traits: ['成長が早い', '芯がある', '柔軟だが折れない', 'バランスが良い'],
      scoreWeights: [2, 1, 1, 1, 2, 2, 1],
    },
    {
      id: 'phoenix',
      emoji: '🔥',
      name: '不死鳥メンタル',
      tag: '#何度でも蘇る',
      color: '#E74C3C',
      description:
        'あなたのメンタルは不死鳥のように、燃え尽きてもまた蘇る驚異の回復力を持っています。ダメージは受けるけれど、必ず立ち上がる逆境に最も強いタイプです。',
      advice:
        '何度も復活できるからといって、わざと無理をする必要はないよ。ダメージを減らす工夫も学ぼう。',
      traits: ['驚異的な回復力', '逆境に強い', '再起力がある', '経験を力に変える'],
      scoreWeights: [3, 1, 2, 0, 1, 2, 0],
    },
    {
      id: 'shield',
      emoji: '🛡️',
      name: '結界メンタル',
      tag: '#心にバリアを張れる',
      color: '#AED6F1',
      description:
        'あなたのメンタルは結界のように、外からのネガティブなエネルギーを上手にブロックできるタイプ。嫌なことがあっても、心の中に入れない防御力を持っています。',
      advice:
        'バリアが強すぎると、ポジティブなものまでブロックしてしまうことも。時には心をオープンにしてみよう。',
      traits: ['心の防御力が高い', 'マイペース', '影響されにくい', '自分の世界がある'],
      scoreWeights: [1, 0, 1, 3, 0, 1, 0],
    },
    {
      id: 'bridge',
      emoji: '🌉',
      name: '架け橋メンタル',
      tag: '#人と人をつなぐ力',
      color: '#AF7AC5',
      description:
        'あなたのメンタルの強さは「人とのつながり」から生まれるタイプ。一人では弱くても、仲間といると無敵になる。そして自分も誰かの支えになれる架け橋のような存在です。',
      advice:
        '人に頼るのは素晴らしい力だけど、一人でも大丈夫な自分も少しずつ育てていこう。',
      traits: ['人とのつながりを大切にする', '共感力が高い', '助け合いが得意', '絆を深められる'],
      scoreWeights: [0, 1, 0, 1, 1, 0, 3],
    },
    {
      id: 'seed',
      emoji: '🌱',
      name: '種メンタル（成長途中）',
      tag: '#これから芽吹く可能性',
      color: '#ABEBC6',
      description:
        'あなたのメンタルは今まさに成長中の種。まだ芽が出たばかりかもしれないけれど、水（経験）と光（サポート）があれば、どんな大きな木にもなれる無限の可能性を秘めています。',
      advice:
        '焦らなくて大丈夫！今は「弱い」んじゃなくて「成長中」なだけ。小さな成功体験を積み重ねていこう。',
      traits: ['伸びしろが大きい', '素直', '感受性が豊か', '成長意欲がある'],
      scoreWeights: [0, 1, 0, 0, 1, 1, 1],
    },
    {
      id: 'moon',
      emoji: '🌙',
      name: '月メンタル',
      tag: '#満ち欠けしても輝く',
      color: '#D5D8DC',
      description:
        'あなたのメンタルは月のように、日によって強さが変わるタイプ。満月のときは最高のパフォーマンスを発揮し、新月のときは静かに休む。その波があること自体が、あなたらしさです。',
      advice:
        '調子の波を「弱さ」と思わなくてOK。自分のリズムを知って、それに合わせた過ごし方を見つけよう。',
      traits: ['調子に波がある', '感受性が強い', '直感的', '自分のリズムがある'],
      scoreWeights: [1, 1, 1, 1, 2, 0, 1],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: [
    '#メンタル耐性診断',
    '#メンタル強さ診断',
    '#あなたのメンタルタイプは',
    '#心理テスト',
    '#診断研究所',
  ],
  references: [
    'Connor, K. M., & Davidson, J. R. T. (2003). Development of a new resilience scale: The Connor-Davidson Resilience Scale (CD-RISC). Depression and Anxiety, 18(2), 76-82.',
    'Seligman, M. E. P. (1998). Learned Optimism: How to Change Your Mind and Your Life. Vintage Books.',
    'Dweck, C. S. (2006). Mindset: The New Psychology of Success. Random House.',
    'Bandura, A. (1997). Self-Efficacy: The Exercise of Control. W.H. Freeman.',
  ],
};
