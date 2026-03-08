/**
 * 推し活スタイル診断
 *
 * 理論基盤:
 * - Henry Jenkins (2006) Convergence Culture（参加型文化とファン文化論）
 * - Matt Hills (2002) Fan Cultures（ファンダム理論・ファンの類型化）
 * - Mihaly Csikszentmihalyi (1990) Flow（フロー理論・没入体験）
 *
 * 6次元: 情熱度, 発信力, 収集力, 分析力, コミュニティ力, 創作力
 * 結果タイプ: 14種類
 * 質問数: 28問（5セクション）
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const oshiDiagnosis: DiagnosisConfig = {
  id: 'oshi',
  title: '推し活スタイル診断',
  subtitle: 'あなたの推し方タイプを診断！',
  catchphrase: '推しへの愛、どのタイプ？',
  description:
    '好きなアイドル、アニメキャラ、YouTuber、スポーツ選手……推し方は人それぞれ！あなたの推し活を6つの視点から分析して、14タイプの中からぴったりの推し活スタイルを見つけ出します。',
  emoji: '💖',
  themeColor: '#FF6B35',
  gradientFrom: '#FF6B35',
  gradientTo: '#FF2E63',

  // --- プロフィール入力 ---
  profileFields: [
    {
      id: 'gender',
      label: '性別',
      type: 'select',
      options: [
        { value: 'male', label: '男性', emoji: '♂️' },
        { value: 'female', label: '女性', emoji: '♀️' },
        { value: 'other', label: 'その他 / 答えたくない', emoji: '🌈' },
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

  // --- 6次元スコアリング ---
  // 順番: 情熱度, 発信力, 収集力, 分析力, コミュニティ力, 創作力
  dimensions: [
    { key: 'passion', label: '情熱度', color: '#FF2E63' },
    { key: 'promotion', label: '発信力', color: '#FF6B35' },
    { key: 'collection', label: '収集力', color: '#FFC233' },
    { key: 'analysis', label: '分析力', color: '#08D9D6' },
    { key: 'community', label: 'コミュニティ力', color: '#7B68EE' },
    { key: 'creation', label: '創作力', color: '#FF85A2' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '推しとの向き合い方',
    2: 'SNSでの推し活',
    3: 'イベント・グッズ',
    4: '推し仲間との関係',
    5: '推しへの感情',
  },

  // --- 質問データ（28問） ---
  // weights配列: [情熱度, 発信力, 収集力, 分析力, コミュニティ力, 創作力]
  questions: [
    // ===== セクション1: 推しとの向き合い方（6問） =====
    {
      sid: 1,
      sectionName: '推しとの向き合い方',
      emoji: '💫',
      text: '推しのことを考えない日はほぼない',
      source: 'Csikszentmihalyi(1990) フロー理論 - 没入と内発的動機づけ',
      weights: [2, 0, 0, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '推しとの向き合い方',
      emoji: '📖',
      text: '推しの過去のインタビューや出演作品を遡って全部チェックする',
      source: 'Hills(2002) ファンダム理論 - ファンの知識蓄積行動',
      weights: [1, 0, 1, 2, 0, 0],
    },
    {
      sid: 1,
      sectionName: '推しとの向き合い方',
      emoji: '🔄',
      text: '推しが変わることに抵抗はない。新しい魅力に出会うとすぐハマる',
      source: 'Jenkins(2006) 参加型文化論 - ノマド的ファン行動',
      weights: [0, 0, 0, 1, 1, 0],
    },
    {
      sid: 1,
      sectionName: '推しとの向き合い方',
      emoji: '💰',
      text: '推しのためならお小遣いや貯金を惜しまず使える',
      source: 'Hills(2002) ファンダム理論 - ファン消費行動と感情経済',
      weights: [2, 0, 2, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '推しとの向き合い方',
      emoji: '🏠',
      text: '推し活は一人で静かに楽しむほうが好きだ',
      source: 'Hills(2002) ファンダム理論 - 孤独なファンvs社交的ファン',
      weights: [1, -1, 1, 1, -1, 1],
    },
    {
      sid: 1,
      sectionName: '推しとの向き合い方',
      emoji: '📅',
      text: '推しの誕生日や記念日は絶対に忘れないし、何かしらお祝いする',
      source: 'Csikszentmihalyi(1990) フロー理論 - 儀式的活動と没入',
      weights: [2, 1, 0, 0, 1, 0],
    },

    // ===== セクション2: SNSでの推し活（6問） =====
    {
      sid: 2,
      sectionName: 'SNSでの推し活',
      emoji: '📢',
      text: 'SNSで推しの魅力を熱く語って、周りにも布教する',
      source: 'Jenkins(2006) 参加型文化論 - ファンの布教行動と拡散',
      weights: [1, 2, 0, 0, 1, 0],
    },
    {
      sid: 2,
      sectionName: 'SNSでの推し活',
      emoji: '🧵',
      text: '推しについての考察や分析をSNSに長文で投稿することがある',
      source: 'Jenkins(2006) 参加型文化論 - テキスト密猟と解釈コミュニティ',
      weights: [0, 2, 0, 2, 0, 1],
    },
    {
      sid: 2,
      sectionName: 'SNSでの推し活',
      emoji: '🖼️',
      text: '推しの画像や動画を保存するフォルダがどんどん増えていく',
      source: 'Hills(2002) ファンダム理論 - デジタルアーカイブ行動',
      weights: [1, 0, 2, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: 'SNSでの推し活',
      emoji: '🔔',
      text: '推しのSNS通知はオンにしていて、更新があったらすぐチェックする',
      source: 'Csikszentmihalyi(1990) フロー理論 - 即時フィードバックと没入',
      weights: [2, 0, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: 'SNSでの推し活',
      emoji: '🎨',
      text: 'ファンアートやMAD動画を作って推しへの愛を表現する',
      source: 'Jenkins(2006) 参加型文化論 - ファンによる二次創作',
      weights: [0, 1, 0, 0, 0, 2],
    },
    {
      sid: 2,
      sectionName: 'SNSでの推し活',
      emoji: '👀',
      text: 'SNSでは推しの情報を見る専門。自分からはあまり発信しない',
      source: 'Hills(2002) ファンダム理論 - サイレントファン/ROM専',
      weights: [1, -1, 1, 1, -1, 0],
    },

    // ===== セクション3: イベント・グッズ（6問） =====
    {
      sid: 3,
      sectionName: 'イベント・グッズ',
      emoji: '🎤',
      text: '推しのライブやイベントには可能な限り全通したい',
      source: 'Hills(2002) ファンダム理論 - 巡礼行動と聖地参加',
      weights: [2, 0, 0, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: 'イベント・グッズ',
      emoji: '🧸',
      text: 'グッズは種類をコンプリートしないと気が済まない',
      source: 'Hills(2002) ファンダム理論 - 収集行動とファンの物質文化',
      weights: [1, 0, 2, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: 'イベント・グッズ',
      emoji: '📸',
      text: 'イベントで撮った写真や動画はSNSにすぐアップする',
      source: 'Jenkins(2006) 参加型文化論 - リアルタイム共有行動',
      weights: [0, 2, 0, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: 'イベント・グッズ',
      emoji: '🗂️',
      text: 'グッズやチケットは綺麗に保管・整理する。捨てるなんて絶対ムリ',
      source: 'Hills(2002) ファンダム理論 - アーカイブ的ファン実践',
      weights: [1, 0, 2, 1, 0, 0],
    },
    {
      sid: 3,
      sectionName: 'イベント・グッズ',
      emoji: '✨',
      text: '推しのイベント用に痛バッグやうちわを手作りする',
      source: 'Jenkins(2006) 参加型文化論 - 物質的ファン創作',
      weights: [1, 0, 1, 0, 0, 2],
    },
    {
      sid: 3,
      sectionName: 'イベント・グッズ',
      emoji: '🎯',
      text: 'グッズの買い方は計画的。レアものだけを厳選して買う',
      source: 'Hills(2002) ファンダム理論 - 選択的消費とファン資本',
      weights: [0, 0, 1, 2, 0, 0],
    },

    // ===== セクション4: 推し仲間との関係（5問） =====
    {
      sid: 4,
      sectionName: '推し仲間との関係',
      emoji: '🤝',
      text: '同じ推しのファン同士で交流するのが好きだ',
      source: 'Jenkins(2006) 参加型文化論 - ファンコミュニティの形成',
      weights: [0, 1, 0, 0, 2, 0],
    },
    {
      sid: 4,
      sectionName: '推し仲間との関係',
      emoji: '🚫',
      text: '正直、同担（同じ推しのファン）には少しライバル意識がある',
      source: 'Hills(2002) ファンダム理論 - ファン間の競争とファン資本',
      weights: [2, 0, 1, 0, -1, 0],
    },
    {
      sid: 4,
      sectionName: '推し仲間との関係',
      emoji: '🌐',
      text: '推し活を通じてネットで新しい友達ができた経験がある',
      source: 'Jenkins(2006) 参加型文化論 - トランスメディア的つながり',
      weights: [0, 1, 0, 0, 2, 0],
    },
    {
      sid: 4,
      sectionName: '推し仲間との関係',
      emoji: '🎁',
      text: '推し仲間と情報やグッズを交換するのが楽しい',
      source: 'Hills(2002) ファンダム理論 - 贈与経済とファンの社会関係',
      weights: [0, 0, 1, 0, 2, 0],
    },
    {
      sid: 4,
      sectionName: '推し仲間との関係',
      emoji: '📚',
      text: '界隈の暗黙のルールやマナーには詳しいほうだと思う',
      source: 'Jenkins(2006) 参加型文化論 - ファンダムの規範とガバナンス',
      weights: [0, 0, 0, 2, 2, 0],
    },

    // ===== セクション5: 推しへの感情（5問） =====
    {
      sid: 5,
      sectionName: '推しへの感情',
      emoji: '😭',
      text: '推しが頑張っている姿を見ると、思わず泣きそうになる',
      source: 'Csikszentmihalyi(1990) フロー理論 - 感情的没入と自己超越体験',
      weights: [2, 0, 0, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: '推しへの感情',
      emoji: '🔬',
      text: '推しの発言や行動の裏にある意図を考察するのが好きだ',
      source: 'Hills(2002) ファンダム理論 - 解釈的ファン実践',
      weights: [0, 0, 0, 2, 0, 1],
    },
    {
      sid: 5,
      sectionName: '推しへの感情',
      emoji: '✍️',
      text: '推しに手紙やファンレターを書いたことがある（書きたいと思う）',
      source: 'Jenkins(2006) 参加型文化論 - ファンとアーティストの疑似相互作用',
      weights: [1, 1, 0, 0, 0, 2],
    },
    {
      sid: 5,
      sectionName: '推しへの感情',
      emoji: '🌟',
      text: '推しの成長や成功を、親のような気持ちで見守っている',
      source: 'Hills(2002) ファンダム理論 - パラソーシャル関係と感情的投資',
      weights: [2, 0, 0, 1, 0, 0],
    },
    {
      sid: 5,
      sectionName: '推しへの感情',
      emoji: '💭',
      text: '推しからインスピレーションを受けて、自分も何か作品を作りたくなる',
      source: 'Csikszentmihalyi(1990) フロー理論 - 創造性の連鎖と内発的動機づけ',
      weights: [0, 0, 0, 0, 0, 2],
    },
  ],

  // --- 結果タイプ（14種類） ---
  // scoreWeights: [情熱度, 発信力, 収集力, 分析力, コミュニティ力, 創作力]
  resultTypes: [
    {
      id: 'fukyo_man',
      emoji: '📣',
      name: '全力布教マン',
      tag: '#布教の鬼 #推しを広めたい',
      color: '#FF6B35',
      description:
        '「この推しの良さをもっとみんなに知ってほしい！」が口癖。発信力と情熱が最高レベルで、プレゼン資料並みの布教ツイートを作れる伝道師タイプ。新規ファンの入り口はだいたいあなた。',
      advice:
        '布教は素晴らしいけど、相手の温度感に合わせるともっと効果的。「聞かれたら答える」くらいの余裕も時には大事だよ。',
      traits: ['プレゼン力', '行動力', '情熱的'],
      scoreWeights: [2, 3, 0, 1, 1, 0],
    },
    {
      id: 'silent_gachi',
      emoji: '🔥',
      name: '静かなるガチ勢',
      tag: '#ROM専だけどガチ #心の中は大炎上',
      color: '#8B0000',
      description:
        'SNSではあまり発信しないけど、推しへの情熱は誰にも負けない。すべての供給をチェックし、情報を正確に把握している。静かに、でも確実に推し続けるプロフェッショナル。',
      advice:
        'たまには推しへの想いを外に出してみて。あなたの深い愛が伝われば、きっと素敵な推し仲間に出会えるはず。',
      traits: ['一途さ', '情報収集力', '継続力'],
      scoreWeights: [3, 0, 2, 2, 0, 0],
    },
    {
      id: 'kousatsu_oni',
      emoji: '🔍',
      name: '考察の鬼',
      tag: '#考察班 #深読みのプロ',
      color: '#08D9D6',
      description:
        '推しの発言や作品を何層にも深読みする天才。「あのインタビューの言葉の真意は……」と語り出したら止まらない。分析力が高く、ファンダム内でも一目置かれる知識人。',
      advice:
        '考察は楽しいけど、たまには「かわいい！好き！」ってシンプルに推す時間も大切にしよう。頭だけじゃなく心で感じる推し活もいいよ。',
      traits: ['分析力', '知識欲', '洞察力'],
      scoreWeights: [1, 1, 1, 3, 0, 1],
    },
    {
      id: 'goods_king',
      emoji: '👑',
      name: 'グッズ収集王',
      tag: '#コンプリート主義 #収集癖',
      color: '#FFC233',
      description:
        'グッズを集めることに命をかけている。部屋は推しグッズで溢れ、整理収納もお手の物。レアアイテムの情報はいち早くキャッチし、確実にゲットするハンタータイプ。',
      advice:
        'コレクションは素敵だけど、お財布との相談も忘れずに。「厳選する目」を養うと、もっと満足度の高い収集ができるよ。',
      traits: ['収集への情熱', '情報感度', '整理整頓力'],
      scoreWeights: [1, 0, 3, 1, 0, 0],
    },
    {
      id: 'ichizu_type',
      emoji: '💍',
      name: '同担拒否の一途型',
      tag: '#推しは私だけのもの #一途な愛',
      color: '#E64980',
      description:
        '推しへの愛が深すぎて、同担（同じ推しのファン）にちょっと嫉妬しちゃう。でもそれは本気で推しているからこその感情。一途で真剣な愛の持ち主。',
      advice:
        '独占欲が強い自分も受け入れつつ、他のファンも推しの幸せを願う仲間だと思えると、もっと楽しい推し活になるかも。',
      traits: ['一途さ', '情熱', '真剣さ'],
      scoreWeights: [3, 0, 1, 0, 0, 0],
    },
    {
      id: 'hakoshi_happy',
      emoji: '🌈',
      name: '箱推しハッピー型',
      tag: '#みんな好き #箱推し最高',
      color: '#7B68EE',
      description:
        'メンバー全員が推し！「誰が一番？」なんて選べないし、選ぶ必要もない。グループ全体の成長を見守り、メンバーの絡みに大喜びする平和なファン。',
      advice:
        '箱推しの視野の広さは強みだけど、一人に深くフォーカスしてみるのも新しい発見があるかも。深さと広さの両方を楽しもう。',
      traits: ['博愛精神', 'ポジティブさ', '視野の広さ'],
      scoreWeights: [1, 1, 0, 0, 2, 0],
    },
    {
      id: 'niji_kami',
      emoji: '🎨',
      name: '二次創作の神',
      tag: '#創作沼 #推しへの愛を形に',
      color: '#FF85A2',
      description:
        '推しへの愛をイラスト、小説、動画、音楽……あらゆる形で表現するクリエイター。創作力が爆発的で、あなたの作品が新たなファンを生むことも。推しへの最大のラブレター。',
      advice:
        '創作に没頭しすぎて公式の供給を見逃さないように注意。インプットとアウトプットのバランスを意識すると作品の質も上がるよ。',
      traits: ['創造力', '表現力', '集中力'],
      scoreWeights: [0, 1, 0, 1, 0, 3],
    },
    {
      id: 'event_kaikin',
      emoji: '🎪',
      name: 'イベント皆勤賞型',
      tag: '#全通 #現場の鬼',
      color: '#20C997',
      description:
        'ライブ、ファンミ、リリイベ……現場に行ってこそ推し活！フットワークが軽く、全国どこでも推しに会いに行く行動力の持ち主。チケット戦争にも負けない。',
      advice:
        '現場は最高だけど、体力とお金の管理も大切。次のイベントに万全で行くためにも、休む勇気を持とう。',
      traits: ['行動力', 'フットワーク', '体力'],
      scoreWeights: [2, 0, 1, 0, 2, 0],
    },
    {
      id: 'emo_hitari',
      emoji: '🌙',
      name: 'エモ浸り型',
      tag: '#感情の海 #推しは人生',
      color: '#C084FC',
      description:
        '推しの一挙一動に感情が揺さぶられるエモーショナルなファン。推しの曲を聴いて泣き、推しの笑顔を見て泣き、推しの成長に泣く。あなたの推し活は感動の連続。',
      advice:
        '感情が豊かなのは素敵だけど、推しのネガティブなニュースに引きずられすぎないように。自分の心の健康も大切にしてね。',
      traits: ['感受性', '共感力', '感情表現力'],
      scoreWeights: [3, 0, 0, 0, 0, 1],
    },
    {
      id: 'shinki_boukenka',
      emoji: '🧭',
      name: '新規開拓冒険家型',
      tag: '#沼渡り #次の推しを探して',
      color: '#4ECDC4',
      description:
        '常に新しい推しとの出会いを求めるアドベンチャー。好奇心旺盛で、ジャンルを超えて魅力を発見できる目を持っている。あなたの推し歴は冒険の軌跡。',
      advice:
        '新しい出会いは刺激的だけど、一つの推しを深く知る楽しさも忘れずに。「広く深く」が最強だよ。',
      traits: ['好奇心', '柔軟性', '発見力'],
      scoreWeights: [0, 1, 0, 1, 1, 0],
    },
    {
      id: 'kaiwai_jyuchin',
      emoji: '🏛️',
      name: '界隈の重鎮型',
      tag: '#古参 #界隈の生き字引',
      color: '#495057',
      description:
        'ファンダムの歴史を知り尽くした重鎮。新規ファンへの案内役を買って出て、界隈のマナーやルールにも精通。あなたがいることで、ファンダム全体が安定する存在。',
      advice:
        '古参ゆえの「昔はこうだった」マウントにならないように気をつけて。新しいファンの視点から学ぶこともたくさんあるよ。',
      traits: ['知識の深さ', '責任感', '包容力'],
      scoreWeights: [1, 1, 1, 2, 3, 0],
    },
    {
      id: 'oshihen_footwork',
      emoji: '🌪️',
      name: '推し変フットワーク型',
      tag: '#今この瞬間の推し #トレンドに敏感',
      color: '#FF922B',
      description:
        'トレンドをいち早くキャッチして、新しいコンテンツにすぐハマれるタイプ。推しが変わっても、その瞬間の全力さは本物。「推しは増やすもの」がモットー。',
      advice:
        'フットワークの軽さは武器だけど、前の推しの良さも忘れないで。「元推し」にも感謝の気持ちを持つと、推し活がもっと豊かになるよ。',
      traits: ['トレンド感度', '適応力', '瞬発力'],
      scoreWeights: [0, 2, 0, 0, 1, 0],
    },
    {
      id: 'data_analyst',
      emoji: '📊',
      name: 'データ分析ファン型',
      tag: '#数字で語る #再生数は正義',
      color: '#339AF0',
      description:
        '再生回数、フォロワー数、ランキング……データで推しの実力を証明するアナリスト。数字の変動を誰よりも正確に追い、戦略的に推しの応援をプランニングできる。',
      advice:
        '数字も大事だけど、数字に表れない推しの魅力も大切にしよう。「好き」という気持ちはデータ化できない最強の推し活だよ。',
      traits: ['分析力', '戦略性', '客観性'],
      scoreWeights: [0, 1, 0, 3, 1, 0],
    },
    {
      id: 'supporter_parent',
      emoji: '🌻',
      name: '親心サポーター型',
      tag: '#見守る愛 #推しの味方',
      color: '#94D82D',
      description:
        '推しの成長を温かく見守る、まるで保護者のような存在。推しが失敗しても応援し、成功したら自分のことのように喜ぶ。あなたの無条件の愛が推しの力になっている。',
      advice:
        '見守る愛は尊いけど、推しに過度な期待をかけすぎないように注意。推しも人間だから、ありのままを受け入れる余裕を持とう。',
      traits: ['包容力', '忍耐力', '無条件の愛'],
      scoreWeights: [2, 0, 0, 1, 1, 0],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#推し活診断', '#推し活スタイル', '#オタクタイプ', '#ファンタイプ診断', '#推しへの愛'],
  references: [
    'Jenkins, H. (2006). Convergence Culture: Where Old and New Media Collide. NYU Press.',
    'Hills, M. (2002). Fan Cultures. Routledge.',
    'Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience. Harper & Row.',
    'Jenkins, H. (1992). Textual Poachers: Television Fans and Participatory Culture. Routledge.',
    'Sandvoss, C. (2005). Fans: The Mirror of Consumption. Polity Press.',
    'Horton, D., & Wohl, R. R. (1956). Mass Communication and Para-Social Interaction. Psychiatry, 19(3), 215-229.',
  ],
};
