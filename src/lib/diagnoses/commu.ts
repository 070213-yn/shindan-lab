/**
 * コミュ力タイプ診断
 *
 * 理論基盤:
 * - Daniel Goleman (1995) Emotional Intelligence (EQ理論)
 * - Thomas & Kilmann (1974) Conflict Mode Instrument
 * - William Moulton Marston (1928) DISC行動理論
 *
 * 7次元: 共感力, 表現力, 傾聴力, 説得力, 空気読み力, ユーモア力, リーダーシップ
 * 結果タイプ: 14種類
 * 質問数: 28問（5セクション）
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const commuDiagnosis: DiagnosisConfig = {
  id: 'commu',
  title: 'コミュ力タイプ診断',
  subtitle: 'あなたのコミュニケーションスタイルを解析！',
  catchphrase: '自分のコミュ力、ちゃんと知ってる？',
  description:
    '友達との会話、グループでの振る舞い、SNSでのやりとり……あなたのコミュニケーションスタイルを7つの視点から分析して、14タイプの中からぴったりのスタイルを見つけ出します。',
  emoji: '💬',
  themeColor: '#FF7F7F',
  gradientFrom: '#FF7F7F',
  gradientTo: '#FFB347',

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
      min: 10,
      max: 70,
      defaultValue: 25,
      unit: '歳',
    },
  ],

  // --- 7次元スコアリング ---
  // 順番: 共感力, 表現力, 傾聴力, 説得力, 空気読み力, ユーモア力, リーダーシップ
  dimensions: [
    { key: 'empathy', label: '共感力', color: '#FF6B6B' },
    { key: 'expression', label: '表現力', color: '#FFA94D' },
    { key: 'listening', label: '傾聴力', color: '#51CF66' },
    { key: 'persuasion', label: '説得力', color: '#339AF0' },
    { key: 'atmosphere', label: '空気読み力', color: '#CC5DE8' },
    { key: 'humor', label: 'ユーモア力', color: '#FF922B' },
    { key: 'leadership', label: 'リーダーシップ', color: '#20C997' },
  ],

  // --- セクション定義 ---
  sections: {
    1: 'グループでの立ち位置',
    2: '感情の伝え方',
    3: '対立時の対応',
    4: '初対面の振る舞い',
    5: 'SNSでのコミュニケーション',
  },

  // --- 質問データ（28問） ---
  // weights配列: [共感力, 表現力, 傾聴力, 説得力, 空気読み力, ユーモア力, リーダーシップ]
  questions: [
    // ===== セクション1: グループでの立ち位置（6問） =====
    {
      sid: 1,
      sectionName: 'グループでの立ち位置',
      emoji: '👥',
      text: 'クラスで班を作るとき、自分から「一緒にやろう！」と声をかけるほうだ',
      source: 'Marston(1928) DISC理論 - 主導型(D)行動パターン',
      weights: [0, 1, 0, 1, 0, 0, 2],
    },
    {
      sid: 1,
      sectionName: 'グループでの立ち位置',
      emoji: '🎯',
      text: 'グループワークで意見がまとまらないとき、自然と仕切り役になる',
      source: 'Goleman(1995) EQ理論 - 社会的スキル(リーダーシップ)',
      weights: [0, 1, 0, 2, 1, 0, 2],
    },
    {
      sid: 1,
      sectionName: 'グループでの立ち位置',
      emoji: '🤝',
      text: 'グループの中で誰かが黙っていたら、さりげなく話を振ってあげる',
      source: 'Goleman(1995) EQ理論 - 共感性と社会的認識',
      weights: [2, 0, 1, 0, 2, 0, 1],
    },
    {
      sid: 1,
      sectionName: 'グループでの立ち位置',
      emoji: '😂',
      text: 'グループの空気が重いとき、面白いことを言って場を和ませる',
      source: 'Martin et al.(2003) ユーモアスタイル質問票(HSQ)',
      weights: [0, 1, 0, 0, 1, 2, 1],
    },
    {
      sid: 1,
      sectionName: 'グループでの立ち位置',
      emoji: '📋',
      text: '文化祭や体育祭では、裏方でサポートするよりリーダーとして引っ張りたい',
      source: 'Marston(1928) DISC理論 - 主導型(D)vs安定型(S)',
      weights: [0, 1, 0, 1, 0, 0, 2],
    },
    {
      sid: 1,
      sectionName: 'グループでの立ち位置',
      emoji: '🧩',
      text: 'みんなの得意・不得意を見て、役割分担を考えるのが好きだ',
      source: 'Goleman(1995) EQ理論 - 社会的スキル(チームワーク)',
      weights: [1, 0, 1, 1, 2, 0, 2],
    },

    // ===== セクション2: 感情の伝え方（6問） =====
    {
      sid: 2,
      sectionName: '感情の伝え方',
      emoji: '💖',
      text: '友達がうれしい報告をしてくれたら、自分のことのように全力で喜べる',
      source: 'Goleman(1995) EQ理論 - 共感性(情動的共感)',
      weights: [2, 1, 0, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '感情の伝え方',
      emoji: '😤',
      text: 'ムカつくことがあっても、すぐには怒らず一回冷静になれる',
      source: 'Goleman(1995) EQ理論 - 自己制御(感情の管理)',
      weights: [0, 0, 1, 0, 2, 0, 1],
    },
    {
      sid: 2,
      sectionName: '感情の伝え方',
      emoji: '🗣️',
      text: '自分の気持ちを言葉にして相手に伝えるのが得意だ',
      source: 'Marston(1928) DISC理論 - 影響型(I)表現特性',
      weights: [0, 2, 0, 1, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '感情の伝え方',
      emoji: '🫂',
      text: '友達が落ち込んでいたら、何も言わずにそばにいてあげる',
      source: 'Goleman(1995) EQ理論 - 共感性(認知的共感)',
      weights: [2, 0, 2, 0, 1, 0, 0],
    },
    {
      sid: 2,
      sectionName: '感情の伝え方',
      emoji: '📝',
      text: '大事なことは口で言うより、LINEやメッセージで伝えるほうが楽だ',
      source: 'Walther(1996) 超対人モデル - CMC環境の自己開示',
      weights: [0, 1, 0, 0, 1, 0, -1],
    },
    {
      sid: 2,
      sectionName: '感情の伝え方',
      emoji: '🎭',
      text: '本当は悲しいのに、人前では明るく振る舞うことがある',
      source: 'Hochschild(1983) 感情労働理論 - 表層演技',
      weights: [0, 0, 0, 0, 2, 0, 0],
    },

    // ===== セクション3: 対立時の対応（6問） =====
    {
      sid: 3,
      sectionName: '対立時の対応',
      emoji: '⚡',
      text: '友達とケンカになったら、自分の意見をはっきり主張するほうだ',
      source: 'Thomas & Kilmann(1974) 対立モード - 競争型',
      weights: [0, 2, 0, 2, -1, 0, 1],
    },
    {
      sid: 3,
      sectionName: '対立時の対応',
      emoji: '🕊️',
      text: 'ケンカになりそうなとき、お互いが納得できる落としどころを探す',
      source: 'Thomas & Kilmann(1974) 対立モード - 妥協型',
      weights: [1, 0, 1, 1, 1, 0, 1],
    },
    {
      sid: 3,
      sectionName: '対立時の対応',
      emoji: '🙈',
      text: '面倒な対立は避けて、自分が引いて丸く収めることが多い',
      source: 'Thomas & Kilmann(1974) 対立モード - 回避型',
      weights: [0, -1, 1, -1, 2, 0, -1],
    },
    {
      sid: 3,
      sectionName: '対立時の対応',
      emoji: '🤔',
      text: 'クラスで揉め事が起きたら、両方の言い分を聞いて仲裁する',
      source: 'Thomas & Kilmann(1974) 対立モード - 協調型',
      weights: [2, 0, 2, 1, 1, 0, 2],
    },
    {
      sid: 3,
      sectionName: '対立時の対応',
      emoji: '💡',
      text: '相手を説得するとき、感情よりも論理やデータで攻める',
      source: 'Aristoteles 修辞学 - ロゴス / Petty & Cacioppo(1986) ELM精緻化見込みモデル',
      weights: [0, 1, 0, 2, 0, 0, 1],
    },
    {
      sid: 3,
      sectionName: '対立時の対応',
      emoji: '😅',
      text: 'ケンカの後、ジョークを言って空気を元に戻すのが得意だ',
      source: 'Martin et al.(2003) HSQ - 親和的ユーモア',
      weights: [0, 1, 0, 0, 1, 2, 0],
    },

    // ===== セクション4: 初対面の振る舞い（5問） =====
    {
      sid: 4,
      sectionName: '初対面の振る舞い',
      emoji: '👋',
      text: '初めて会う人にも、自分から積極的に話しかけることができる',
      source: 'Marston(1928) DISC理論 - 影響型(I)社交性',
      weights: [0, 2, 0, 1, 0, 1, 1],
    },
    {
      sid: 4,
      sectionName: '初対面の振る舞い',
      emoji: '👂',
      text: '初対面の人には、まず相手の話をじっくり聞くようにする',
      source: 'Rogers(1951) 来談者中心療法 - 積極的傾聴',
      weights: [1, 0, 2, 0, 1, 0, 0],
    },
    {
      sid: 4,
      sectionName: '初対面の振る舞い',
      emoji: '🔍',
      text: '初めての人と話すとき、相手の表情や態度をよく観察する',
      source: 'Goleman(1995) EQ理論 - 社会的認識(対人感受性)',
      weights: [1, 0, 1, 0, 2, 0, 0],
    },
    {
      sid: 4,
      sectionName: '初対面の振る舞い',
      emoji: '🌟',
      text: '新しいクラスやグループでも、すぐにその場の中心になれる自信がある',
      source: 'Marston(1928) DISC理論 - 影響型(I)自己確信',
      weights: [0, 2, 0, 1, 0, 1, 2],
    },
    {
      sid: 4,
      sectionName: '初対面の振る舞い',
      emoji: '🧲',
      text: '人見知りの人がいたら、気を遣って話しやすい話題を選ぶ',
      source: 'Goleman(1995) EQ理論 - 共感性と対人関係管理',
      weights: [2, 0, 1, 0, 2, 0, 0],
    },

    // ===== セクション5: SNSでのコミュニケーション（5問） =====
    {
      sid: 5,
      sectionName: 'SNSでのコミュニケーション',
      emoji: '📱',
      text: 'SNSで友達の投稿を見たら、いいねだけじゃなくコメントもする',
      source: 'Walther(1996) 超対人モデル - テキストコミュニケーション特性',
      weights: [1, 2, 0, 0, 0, 1, 0],
    },
    {
      sid: 5,
      sectionName: 'SNSでのコミュニケーション',
      emoji: '🎬',
      text: 'TikTokやリールなど、自分から発信するコンテンツを作るのが好きだ',
      source: 'Jenkins(2006) 参加型文化論 - コンテンツ創造者',
      weights: [0, 2, 0, 1, 0, 1, 1],
    },
    {
      sid: 5,
      sectionName: 'SNSでのコミュニケーション',
      emoji: '💬',
      text: 'グループLINEでは、既読スルーせずなるべく反応を返す',
      source: 'Goleman(1995) EQ理論 - 社会的スキル(応答性)',
      weights: [1, 1, 1, 0, 1, 0, 0],
    },
    {
      sid: 5,
      sectionName: 'SNSでのコミュニケーション',
      emoji: '🤣',
      text: 'SNSでは面白い画像やネタを送って友達を笑わせるのが好きだ',
      source: 'Martin et al.(2003) HSQ - 親和的ユーモア(デジタル環境)',
      weights: [0, 1, 0, 0, 0, 2, 0],
    },
    {
      sid: 5,
      sectionName: 'SNSでのコミュニケーション',
      emoji: '🛡️',
      text: 'ネット上でも、誰かが傷つくような発言には「それはダメだよ」と言える',
      source: 'Goleman(1995) EQ理論 - 社会的スキル(道徳的勇気)',
      weights: [1, 1, 0, 2, 0, 0, 2],
    },
  ],

  // --- 結果タイプ（14種類） ---
  // scoreWeights: [共感力, 表現力, 傾聴力, 説得力, 空気読み力, ユーモア力, リーダーシップ]
  resultTypes: [
    {
      id: 'mood_maker',
      emoji: '🎉',
      name: 'ムードメーカー型',
      tag: '#場の太陽 #笑顔製造機',
      color: '#FFD93D',
      description:
        'あなたがいるだけで場がパッと明るくなる！ユーモアと表現力で、グループの空気をいつもポジティブに変えてしまう天才。みんなが「一緒にいると楽しい」と思う存在です。',
      advice:
        '楽しいだけじゃなく、たまには真剣な話も聞いてあげると信頼度アップ。「笑い」と「傾聴」の二刀流を目指そう！',
      traits: ['ポジティブオーラ', '盛り上げ上手', '誰とでも仲良くなれる'],
      scoreWeights: [1, 2, 0, 1, 1, 3, 1],
    },
    {
      id: 'charisma_leader',
      emoji: '👑',
      name: 'カリスマリーダー型',
      tag: '#生まれながらのリーダー #頼れるボス',
      color: '#4ECDC4',
      description:
        '人を巻き込む力がハンパない！説得力とリーダーシップが高く、自然とみんながついてくるタイプ。ビジョンを語り、チームを動かす力は学校一かも。',
      advice:
        'リーダーシップが強い分、周りの声を聞く時間を意識的に作ろう。「聞く力」を磨くと、最強のリーダーに進化できるよ！',
      traits: ['決断力', '巻き込み力', '責任感'],
      scoreWeights: [0, 2, 0, 3, 1, 0, 3],
    },
    {
      id: 'healing_listener',
      emoji: '🌿',
      name: '癒しの聞き上手型',
      tag: '#安心感の塊 #心のオアシス',
      color: '#51CF66',
      description:
        '話を聞いてくれるだけで心が軽くなる──そんな特別な存在。共感力と傾聴力がずば抜けていて、友達の「相談したい人ランキング」では常に上位。',
      advice:
        '人の悩みを聞きすぎて自分が疲れないように注意。たまには自分の気持ちも誰かに話してみよう。発信力を少し鍛えるとバランスが良くなるよ。',
      traits: ['包容力', '安心感', '秘密を守れる'],
      scoreWeights: [3, 0, 3, 0, 1, 0, 0],
    },
    {
      id: 'genius_tsukkomi',
      emoji: '⚡',
      name: '天才ツッコミ型',
      tag: '#切れ味MAX #笑いの職人',
      color: '#FF6B6B',
      description:
        'タイミングと言葉選びのセンスが抜群！的確なツッコミで笑いを生み出す天才。ユーモア力と表現力の組み合わせで、会話を何倍も面白くする力を持ってます。',
      advice:
        'ツッコミが鋭すぎると、相手が傷つくこともあるから注意。愛のあるツッコミを心がけると、もっと愛される存在になれるよ。',
      traits: ['頭の回転が速い', '観察力', '笑いのセンス'],
      scoreWeights: [0, 2, 0, 1, 1, 3, 0],
    },
    {
      id: 'counselor',
      emoji: '🔮',
      name: 'みんなの相談役型',
      tag: '#人生の先生 #頼れるアドバイザー',
      color: '#845EF7',
      description:
        '共感しながらも、的確なアドバイスができる知恵袋タイプ。傾聴力と説得力のバランスが絶妙で、「あの人に聞けば間違いない」とみんなから頼りにされます。',
      advice:
        'アドバイスする前に「聞いてほしいだけ？」って確認すると最高。相手が求めているものを見極める力をさらに磨こう。',
      traits: ['冷静さ', '的確なアドバイス', '信頼感'],
      scoreWeights: [2, 0, 2, 2, 1, 0, 1],
    },
    {
      id: 'my_pace',
      emoji: '🐢',
      name: 'マイペース独走型',
      tag: '#我が道を行く #自分軸最強',
      color: '#A9E34B',
      description:
        '周りに流されない強い自分軸を持っている。空気を読まないんじゃなく、あえて読んだ上で自分の道を選べるタイプ。独自のセンスと存在感でみんなの記憶に残る人。',
      advice:
        'マイペースは素敵だけど、たまにはチームプレーも意識してみて。自分の世界と周りの世界をつなげると、もっと面白いことが起きるよ。',
      traits: ['ブレない軸', '独自のセンス', '自己肯定感が高い'],
      scoreWeights: [0, 1, 0, 0, 0, 1, 0],
    },
    {
      id: 'shadow_boss',
      emoji: '🎭',
      name: '裏ボス型',
      tag: '#影の実力者 #気づけば仕切ってる',
      color: '#495057',
      description:
        '表に出ないけど、実はグループの方向性を決めているのはあなた。空気読み力とさりげない説得力で、目立たずに全体をコントロールする力を持つ策略家。',
      advice:
        '裏で動くのも才能だけど、たまには表に出て発言する練習をしよう。表現力が加われば、影の実力者から最強リーダーに変身できるよ。',
      traits: ['観察眼', '戦略的思考', 'さりげない影響力'],
      scoreWeights: [1, 0, 1, 2, 3, 0, 2],
    },
    {
      id: 'empathy_master',
      emoji: '💗',
      name: '共感マスター型',
      tag: '#涙もろい #感情が豊か',
      color: '#F06595',
      description:
        '人の気持ちに寄り添う力が驚異的。友達が泣いたら一緒に泣き、喜んだら一緒に喜べる、感情の共鳴者。あなたといると「わかってもらえた」と誰もが感じます。',
      advice:
        '共感力が高すぎて、他人の感情に巻き込まれすぎないように注意。自分の感情と相手の感情を区別する練習をすると、もっと楽になるよ。',
      traits: ['感受性が豊か', '優しさ', '直感力'],
      scoreWeights: [3, 1, 1, 0, 1, 0, 0],
    },
    {
      id: 'social_butterfly',
      emoji: '🦋',
      name: 'ソーシャルバタフライ型',
      tag: '#八方美人(いい意味で) #人脈の達人',
      color: '#22B8CF',
      description:
        'どんなグループにもスッと入っていける社交の達人。表現力と空気読み力のバランスが良く、相手に合わせたコミュニケーションが自然にできるタイプ。',
      advice:
        '広く浅くなりがちだから、深い関係を築くことも意識してみて。「本当の自分」を見せられる親友を大切にしよう。',
      traits: ['適応力', '社交性', 'フットワークの軽さ'],
      scoreWeights: [1, 2, 1, 1, 2, 1, 1],
    },
    {
      id: 'debate_king',
      emoji: '🏆',
      name: 'ディベート王型',
      tag: '#論破マスター #正論は任せて',
      color: '#339AF0',
      description:
        '論理的な説得力が最強クラス。自分の意見を筋道立てて主張できるし、相手の矛盾も見逃さない。ディベートや討論では無敵だけど、日常会話でも頼りになる存在。',
      advice:
        '正論が強すぎると相手を追い詰めちゃうことも。「正しさ」より「伝わる」を意識すると、もっとみんなに受け入れられるよ。',
      traits: ['論理的思考', '自己主張力', '分析力'],
      scoreWeights: [0, 2, 0, 3, 0, 0, 1],
    },
    {
      id: 'peacemaker',
      emoji: '☮️',
      name: 'ピースメーカー型',
      tag: '#平和の使者 #ケンカ仲裁人',
      color: '#94D82D',
      description:
        'グループの調和を守る平和の番人。対立が起きたら真っ先に仲裁に入り、みんなが納得できるポイントを見つける天才。あなたがいるグループは居心地がいい。',
      advice:
        '人の間に入りすぎて疲れないように注意。たまには「自分はこう思う」って自分の意見も大切にしよう。自己主張も平和の一部だよ。',
      traits: ['調和力', '公平さ', '忍耐力'],
      scoreWeights: [2, 0, 2, 1, 2, 0, 1],
    },
    {
      id: 'sns_influencer',
      emoji: '📱',
      name: 'SNSインフルエンサー型',
      tag: '#発信力MAX #トレンドセッター',
      color: '#E64980',
      description:
        'オンラインでの発信力と影響力がずば抜けている。言葉選び、タイミング、見せ方のセンスが光るデジタルネイティブ。SNSでの存在感は学校一かも。',
      advice:
        'オンラインだけじゃなく、対面でのコミュニケーションも大切にしよう。画面越しじゃない「生の会話」の力も磨くと最強になれるよ。',
      traits: ['発信力', 'トレンド感度', '言葉のセンス'],
      scoreWeights: [0, 3, 0, 2, 1, 1, 1],
    },
    {
      id: 'silent_observer',
      emoji: '🦉',
      name: 'サイレントオブザーバー型',
      tag: '#沈黙の知恵者 #見てないようで見てる',
      color: '#868E96',
      description:
        '多くを語らないけど、全部わかってる。観察力と空気読み力が高く、ここぞという時に放つ一言が的確すぎて周りを驚かせる。少ない言葉で深い影響を与えるタイプ。',
      advice:
        'もう少し自分から発信する機会を作ってみて。あなたの意見は価値があるから、もっと聞きたいと思っている人は多いはず。',
      traits: ['観察力', '洞察力', '的確な発言'],
      scoreWeights: [1, 0, 2, 0, 3, 0, 0],
    },
    {
      id: 'entertainer',
      emoji: '🎪',
      name: 'エンターテイナー型',
      tag: '#注目の的 #天性のパフォーマー',
      color: '#FF8787',
      description:
        '人を楽しませることに命をかけている！表現力とユーモア力が最高レベルで、あなたの周りにはいつも笑い声が響いている。注目されることでさらに輝くタイプ。',
      advice:
        '目立つのは得意だけど、聞き役に回る練習もしてみよう。「聞くエンターテイナー」になれたら、もっと深い人間関係が築けるよ。',
      traits: ['表現力', 'サービス精神', 'カリスマ性'],
      scoreWeights: [0, 3, 0, 1, 0, 3, 1],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#コミュ力診断', '#コミュニケーションタイプ', '#自分を知ろう', '#性格診断', '#友達関係'],
  references: [
    'Goleman, D. (1995). Emotional Intelligence. Bantam Books.',
    'Thomas, K. W., & Kilmann, R. H. (1974). Thomas-Kilmann Conflict Mode Instrument. Xicom.',
    'Marston, W. M. (1928). Emotions of Normal People. Kegan Paul.',
    'Martin, R. A., et al. (2003). Individual differences in uses of humor and their relation to psychological well-being. Journal of Research in Personality, 37(1), 48-75.',
    'Rogers, C. R. (1951). Client-Centered Therapy. Houghton Mifflin.',
    'Walther, J. B. (1996). Computer-Mediated Communication: Impersonal, Interpersonal, and Hyperpersonal Interaction. Communication Research, 23(1), 3-43.',
    'Petty, R. E., & Cacioppo, J. T. (1986). The Elaboration Likelihood Model of Persuasion. Advances in Experimental Social Psychology, 19, 123-205.',
    'Hochschild, A. R. (1983). The Managed Heart: Commercialization of Human Feeling. University of California Press.',
  ],
};
