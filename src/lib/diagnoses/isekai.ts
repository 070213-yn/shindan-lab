/**
 * 異世界転生クラス診断
 *
 * 理論基盤:
 *   - Myers-Briggs Type Indicator (MBTI) — Myers & Briggs (1962)
 *   - Holland (1959) RIASEC 職業興味理論
 *   - Bartle (1996) Player Types — ゲーマー行動分類
 *
 * 7次元: 攻撃力(決断力), 防御力(忍耐力), 魔力(創造力), 知力(分析力),
 *         敏捷性(適応力), カリスマ(統率力), 運(直感力)
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const isekaiDiagnosis: DiagnosisConfig = {
  id: 'isekai',
  title: '異世界転生クラス診断',
  subtitle: 'あなたが異世界に転生したら何になる？',
  catchphrase: '現実世界の性格から、異世界でのクラスが判明！',
  description:
    'MBTI理論とHollandの職業興味理論をベースに、あなたの判断パターン・行動特性からRPG風のクラス（職業）を診断します。28問の質問に直感で答えて、異世界でのあなたの姿を発見しましょう！',
  emoji: '⚔️',
  themeColor: '#4169E1',
  gradientFrom: '#4169E1',
  gradientTo: '#7B68EE',

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
      min: 8,
      max: 18,
      defaultValue: 13,
      unit: '歳',
    },
  ],

  // --- 7次元のスコアリング ---
  dimensions: [
    { key: 'attack',   label: '攻撃力（決断力）', color: '#E74C3C' },
    { key: 'defense',  label: '防御力（忍耐力）', color: '#3498DB' },
    { key: 'magic',    label: '魔力（創造力）',   color: '#9B59B6' },
    { key: 'intel',    label: '知力（分析力）',   color: '#2ECC71' },
    { key: 'agility',  label: '敏捷性（適応力）', color: '#F39C12' },
    { key: 'charisma', label: 'カリスマ（統率力）', color: '#E91E63' },
    { key: 'luck',     label: '運（直感力）',     color: '#00BCD4' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '戦闘スタイル（判断力）',
    2: 'パーティ適性（社交性）',
    3: '魔法適性（創造力）',
    4: '冒険スタイル（探求心）',
    5: 'ステータス傾向（基礎能力）',
    6: '特殊スキル（直感力）',
  },

  // --- 28問の質問データ ---
  // weights: [攻撃, 防御, 魔力, 知力, 敏捷, カリスマ, 運]
  questions: [
    // === セクション1: 戦闘スタイル（判断力） 5問 ===
    {
      sid: 1,
      sectionName: '戦闘スタイル（判断力）',
      emoji: '⚔️',
      text: 'テストの直前、まだ勉強していない範囲があった。どうする？',
      source: 'Myers & Briggs (1962) — 判断(J)vs知覚(P)次元',
      weights: [2, 0, 0, 1, 1, 0, -1],
    },
    {
      sid: 1,
      sectionName: '戦闘スタイル（判断力）',
      emoji: '🗡️',
      text: 'グループで意見が割れたとき、あなたはどうすることが多い？',
      source: 'Holland (1959) — Enterprising(企業的)タイプの決断力指標',
      weights: [2, -1, 0, 0, 0, 2, 0],
    },
    {
      sid: 1,
      sectionName: '戦闘スタイル（判断力）',
      emoji: '🛡️',
      text: '嫌いな食べ物が給食に出た。あなたの行動は？',
      source: 'Bartle (1996) — Achiever/Killerタイプの行動傾向',
      weights: [1, 2, 0, 0, 1, 0, -1],
    },
    {
      sid: 1,
      sectionName: '戦闘スタイル（判断力）',
      emoji: '💥',
      text: '友達と遊ぶ約束の日に急に別の誘いが来た。どうする？',
      source: 'Myers & Briggs (1962) — 外向(E)vs内向(I)・判断次元',
      weights: [0, 2, 0, 0, -1, 1, 1],
    },
    {
      sid: 1,
      sectionName: '戦闘スタイル（判断力）',
      emoji: '🏹',
      text: 'ゲームで強い敵に遭遇した。あなたの第一反応は？',
      source: 'Bartle (1996) — Player Typesにおける戦闘行動分類',
      weights: [3, 0, 0, 1, 1, 0, -1],
    },

    // === セクション2: パーティ適性（社交性） 5問 ===
    {
      sid: 2,
      sectionName: 'パーティ適性（社交性）',
      emoji: '🤝',
      text: 'クラスで新しい班が決まった。あなたの気持ちに近いのは？',
      source: 'Holland (1959) — Social(社会的)タイプの対人指標',
      weights: [0, 0, 0, 0, 1, 2, 1],
    },
    {
      sid: 2,
      sectionName: 'パーティ適性（社交性）',
      emoji: '👥',
      text: '文化祭の出し物を決めるとき、あなたの役割は？',
      source: 'Myers & Briggs (1962) — 外向(E)vs内向(I)次元',
      weights: [1, 0, 1, 0, 0, 3, 0],
    },
    {
      sid: 2,
      sectionName: 'パーティ適性（社交性）',
      emoji: '💬',
      text: '初対面の人がいる場に行くとき、あなたは？',
      source: 'Holland (1959) — Socialタイプの社交性評価',
      weights: [-1, 0, 0, 0, 2, 2, 1],
    },
    {
      sid: 2,
      sectionName: 'パーティ適性（社交性）',
      emoji: '🎭',
      text: '友達が落ち込んでいるとき、あなたはどうする？',
      source: 'Myers & Briggs (1962) — 感情(F)vs思考(T)次元',
      weights: [0, 1, 1, 0, 0, 2, 0],
    },
    {
      sid: 2,
      sectionName: 'パーティ適性（社交性）',
      emoji: '🏰',
      text: 'チームスポーツで自分のミスで負けそうなとき、どう思う？',
      source: 'Bartle (1996) — Socializer行動パターン',
      weights: [0, 2, 0, 0, 0, 1, -1],
    },

    // === セクション3: 魔法適性（創造力） 5問 ===
    {
      sid: 3,
      sectionName: '魔法適性（創造力）',
      emoji: '✨',
      text: '自由研究のテーマを選ぶなら？',
      source: 'Holland (1959) — Artistic(芸術的)タイプの創造性指標',
      weights: [0, 0, 3, 1, 0, 0, 1],
    },
    {
      sid: 3,
      sectionName: '魔法適性（創造力）',
      emoji: '🔮',
      text: '暇な休日の過ごし方で一番近いのは？',
      source: 'Myers & Briggs (1962) — 直感(N)vs感覚(S)次元',
      weights: [0, 0, 2, 1, 1, 0, 2],
    },
    {
      sid: 3,
      sectionName: '魔法適性（創造力）',
      emoji: '📖',
      text: '物語や漫画を読むとき、一番惹かれるのは？',
      source: 'Holland (1959) — Artisticタイプの興味パターン',
      weights: [1, 0, 2, 1, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: '魔法適性（創造力）',
      emoji: '🎨',
      text: '「自由に絵を描いて」と言われたら、何を描く？',
      source: 'Myers & Briggs (1962) — 直感(N)次元の創造性評価',
      weights: [0, 0, 3, 0, 0, 0, 2],
    },
    {
      sid: 3,
      sectionName: '魔法適性（創造力）',
      emoji: '🌙',
      text: 'もし魔法が一つだけ使えるとしたら？',
      source: 'Bartle (1996) — Explorer/Achieverの欲求分類',
      weights: [1, 1, 2, 0, 1, 0, 1],
    },

    // === セクション4: 冒険スタイル（探求心） 5問 ===
    {
      sid: 4,
      sectionName: '冒険スタイル（探求心）',
      emoji: '🗺️',
      text: '知らない街に来た。まず何をする？',
      source: 'Bartle (1996) — Explorerタイプの行動パターン',
      weights: [1, 0, 0, 2, 2, 0, 1],
    },
    {
      sid: 4,
      sectionName: '冒険スタイル（探求心）',
      emoji: '🧭',
      text: '宝の地図を見つけた。あなたの反応は？',
      source: 'Holland (1959) — Investigative(研究的)タイプの探求指標',
      weights: [1, 0, 1, 1, 1, 0, 2],
    },
    {
      sid: 4,
      sectionName: '冒険スタイル（探求心）',
      emoji: '🏔️',
      text: '修学旅行で自由行動。あなたのプランは？',
      source: 'Myers & Briggs (1962) — 知覚(P)次元の自由度嗜好',
      weights: [0, 0, 1, 1, 2, 1, 1],
    },
    {
      sid: 4,
      sectionName: '冒険スタイル（探求心）',
      emoji: '🚪',
      text: '二つの扉がある。右は「安全」左は「未知」。どちらを選ぶ？',
      source: 'Bartle (1996) — Explorer vs Achiever 行動選好',
      weights: [2, -1, 1, 0, 2, 0, 2],
    },
    {
      sid: 4,
      sectionName: '冒険スタイル（探求心）',
      emoji: '🌊',
      text: '夏休みにやりたいことは？',
      source: 'Holland (1959) — RIASECの興味パターン総合評価',
      weights: [1, 0, 1, 0, 2, 1, 1],
    },

    // === セクション5: ステータス傾向（基礎能力） 4問 ===
    {
      sid: 5,
      sectionName: 'ステータス傾向（基礎能力）',
      emoji: '💪',
      text: '苦手な科目のテストが近い。あなたの対策は？',
      source: 'Myers & Briggs (1962) — 判断(J)の計画性評価',
      weights: [0, 2, 0, 2, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: 'ステータス傾向（基礎能力）',
      emoji: '🧠',
      text: '「なぜ空は青いの？」と聞かれたら？',
      source: 'Holland (1959) — Investigativeタイプの知的好奇心',
      weights: [0, 0, 1, 3, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: 'ステータス傾向（基礎能力）',
      emoji: '🏃',
      text: '体育の授業で一番好きなのは？',
      source: 'Holland (1959) — Realistic(現実的)タイプの身体活動嗜好',
      weights: [2, 1, 0, 0, 2, 0, 0],
    },
    {
      sid: 5,
      sectionName: 'ステータス傾向（基礎能力）',
      emoji: '📝',
      text: '自分の長所を一つ挙げるとしたら？',
      source: 'Myers & Briggs (1962) — 全次元の自己認知',
      weights: [1, 1, 1, 1, 1, 1, 1],
    },

    // === セクション6: 特殊スキル（直感力） 4問 ===
    {
      sid: 6,
      sectionName: '特殊スキル（直感力）',
      emoji: '🌟',
      text: 'ジャンケンで勝つ自信はある？',
      source: 'Myers & Briggs (1962) — 直感(N)次元の自己評価',
      weights: [0, 0, 0, 0, 1, 0, 3],
    },
    {
      sid: 6,
      sectionName: '特殊スキル（直感力）',
      emoji: '🎲',
      text: '何か選ぶとき、直感と論理どちらを重視する？',
      source: 'Myers & Briggs (1962) — 直感(N)vs感覚(S)の意思決定評価',
      weights: [0, 0, 1, -1, 0, 0, 3],
    },
    {
      sid: 6,
      sectionName: '特殊スキル（直感力）',
      emoji: '🔑',
      text: '困ったとき、解決のヒントはどこから来ることが多い？',
      source: 'Holland (1959) — 各タイプの問題解決スタイル',
      weights: [0, 0, 2, 2, 0, 1, 1],
    },
    {
      sid: 6,
      sectionName: '特殊スキル（直感力）',
      emoji: '🦋',
      text: '虫の知らせ（なんとなく嫌な予感）を感じたことがある？',
      source: 'Myers & Briggs (1962) — 直感(N)次元の経験的評価',
      weights: [0, 0, 1, 0, 1, 0, 3],
    },
  ],

  // --- 14種類の結果タイプ ---
  // scoreWeights: [攻撃, 防御, 魔力, 知力, 敏捷, カリスマ, 運]
  resultTypes: [
    {
      id: 'hero',
      emoji: '⚔️',
      name: '聖剣の勇者',
      tag: '#王道の主人公タイプ',
      color: '#FFD700',
      description:
        'あなたは困難に立ち向かう決断力と仲間を導くカリスマを兼ね備えた勇者タイプ。ピンチのときほど底力を発揮し、まわりを鼓舞する天性のリーダーです。',
      advice:
        '一人で背負い込みすぎないことが大切。仲間に頼ることで、もっと強くなれるよ。',
      traits: ['決断力が高い', 'ピンチに強い', '正義感が強い', '仲間思い'],
      scoreWeights: [3, 1, 0, 1, 1, 2, 1],
    },
    {
      id: 'archmage',
      emoji: '🔮',
      name: '禁書の大魔導士',
      tag: '#知識の探求者',
      color: '#9B59B6',
      description:
        'あなたは底知れない知的好奇心と豊かな創造力を持つ大魔導士タイプ。未知の魔法（知識）を求めて禁書の塔にこもり、誰も知らない真理を解き明かします。',
      advice:
        'たまには本を閉じて外に出よう。知識は体験と組み合わさることで真の力になるよ。',
      traits: ['知識欲が強い', '集中力が高い', '独創的', '探究心旺盛'],
      scoreWeights: [0, 0, 3, 3, 0, 0, 1],
    },
    {
      id: 'assassin',
      emoji: '🗡️',
      name: '影の暗殺者',
      tag: '#孤高のスペシャリスト',
      color: '#2C3E50',
      description:
        'あなたは鋭い観察眼と素早い判断力を持つ暗殺者タイプ。目立たず、しかし確実に目標を達成する実力者。一人の時間を大切にし、自分のペースで物事を進めます。',
      advice:
        '時には仲間に心を開いてみて。信頼できる人がいると、任務の成功率はもっと上がるよ。',
      traits: ['観察力が鋭い', '冷静沈着', '一人が好き', '確実性を重視'],
      scoreWeights: [2, 0, 0, 2, 3, 0, 1],
    },
    {
      id: 'paladin',
      emoji: '🛡️',
      name: '光の聖騎士',
      tag: '#守護する正義の盾',
      color: '#F1C40F',
      description:
        'あなたは仲間を守る強い意志と揺るがない信念を持つ聖騎士タイプ。どんな攻撃にも耐え、大切な人を必ず守り抜く頼れる存在です。',
      advice:
        '自分自身のことも大切にしてね。守るためには、まず自分が元気でいることが大事だよ。',
      traits: ['忍耐力がある', '責任感が強い', '優しい', '信念が強い'],
      scoreWeights: [1, 3, 0, 0, 0, 2, 0],
    },
    {
      id: 'alchemist',
      emoji: '⚗️',
      name: '万能の錬金術師',
      tag: '#何でもこなす器用人',
      color: '#E67E22',
      description:
        'あなたはあらゆる素材（才能）を組み合わせて新しい価値を生み出す錬金術師タイプ。バランスが良く、どんな状況でも柔軟に対応できる万能型です。',
      advice:
        '器用貧乏にならないよう、一つの得意分野を深掘りするのもオススメだよ。',
      traits: ['器用', '好奇心旺盛', '応用力が高い', 'バランス型'],
      scoreWeights: [1, 1, 2, 2, 2, 0, 1],
    },
    {
      id: 'ranger',
      emoji: '🏹',
      name: '風の遊撃手',
      tag: '#自由を愛する風の戦士',
      color: '#1ABC9C',
      description:
        'あなたは風のように自由に動き回り、どんな地形でも戦える遊撃手タイプ。束縛を嫌い、自分の感覚を信じて最善の一手を打ちます。',
      advice:
        '自由も大切だけど、チームワークが必要な場面では協調性を意識してみよう。',
      traits: ['自由を愛する', '身軽', '適応力が高い', '直感的'],
      scoreWeights: [2, 0, 0, 0, 3, 0, 2],
    },
    {
      id: 'guardian',
      emoji: '🏰',
      name: '鋼の守護者',
      tag: '#不動の壁',
      color: '#7F8C8D',
      description:
        'あなたは揺るがない精神力と圧倒的な忍耐力を持つ守護者タイプ。どんなプレッシャーにも負けず、コツコツと努力を積み上げる最強の盾です。',
      advice:
        'たまには力を抜いてリラックスすることも大切。柔軟性を加えればさらに強くなれるよ。',
      traits: ['我慢強い', 'コツコツ型', '安定志向', 'プレッシャーに強い'],
      scoreWeights: [0, 3, 0, 1, 0, 1, 0],
    },
    {
      id: 'sage',
      emoji: '📚',
      name: '星詠みの賢者',
      tag: '#未来を見通す知恵者',
      color: '#2980B9',
      description:
        'あなたは深い洞察力と先を見通す知恵を持つ賢者タイプ。物事の本質を見抜き、最適な道を示すことができる知の守護者です。',
      advice:
        '考えすぎて動けなくなることもあるから、時には「まずやってみる」精神も大切だよ。',
      traits: ['洞察力がある', '慎重', '先見の明', '落ち着いている'],
      scoreWeights: [0, 1, 1, 3, 0, 1, 2],
    },
    {
      id: 'dragoon',
      emoji: '🐉',
      name: '竜騎士',
      tag: '#力と誇りの戦士',
      color: '#C0392B',
      description:
        'あなたは圧倒的な攻撃力と誇り高い精神を持つ竜騎士タイプ。困難な相手にも果敢に立ち向かい、その勇姿で仲間を鼓舞する力強い存在です。',
      advice:
        '勢いだけでなく、戦略を立てることも大切。「考えてから動く」を意識してみよう。',
      traits: ['パワフル', '勇敢', '誇り高い', '迫力がある'],
      scoreWeights: [3, 1, 0, 0, 1, 2, 0],
    },
    {
      id: 'healer',
      emoji: '💚',
      name: '白魔の癒者',
      tag: '#みんなの心を癒す光',
      color: '#27AE60',
      description:
        'あなたは人の痛みがわかる優しさと癒しの力を持つヒーラータイプ。傷ついた仲間を回復させ、パーティ全体を支える縁の下の力持ちです。',
      advice:
        '他人のことばかり気にして自分を後回しにしないでね。セルフケアも立派な魔法だよ。',
      traits: ['共感力が高い', '面倒見が良い', '穏やか', '聞き上手'],
      scoreWeights: [0, 2, 1, 0, 0, 2, 1],
    },
    {
      id: 'merchant',
      emoji: '💰',
      name: '商人ギルドマスター',
      tag: '#交渉と戦略の達人',
      color: '#D4AF37',
      description:
        'あなたは鋭い交渉力と戦略的思考を持つ商人タイプ。情報を集め、最善の取引を成立させる知恵者。人脈こそが最大の武器です。',
      advice:
        '損得だけでなく、純粋な友情や信頼関係も大切にすると、もっと大きな成功が待ってるよ。',
      traits: ['交渉上手', '情報通', '戦略的', '社交的'],
      scoreWeights: [0, 0, 0, 2, 1, 3, 2],
    },
    {
      id: 'beastmaster',
      emoji: '🐺',
      name: '獣使い',
      tag: '#自然と心を通わせる者',
      color: '#8D6E63',
      description:
        'あなたは動物や自然と深い絆を結べる獣使いタイプ。言葉に頼らないコミュニケーション能力と、鋭い直感で危険を察知します。',
      advice:
        '人間関係でも、もう少し言葉で伝える努力をしてみよう。気持ちは言わないと伝わらないこともあるよ。',
      traits: ['動物好き', '直感が鋭い', '自然体', '非言語コミュニケーションが得意'],
      scoreWeights: [1, 1, 1, 0, 2, 0, 3],
    },
    {
      id: 'bard',
      emoji: '🎵',
      name: '吟遊詩人',
      tag: '#歌と物語で世界を変える',
      color: '#FF69B4',
      description:
        'あなたは表現力と魅力でまわりを惹きつける吟遊詩人タイプ。歌や物語（コミュニケーション）の力で仲間の士気を上げ、敵すらも魅了します。',
      advice:
        '注目を浴びるのは得意だけど、地道な練習も忘れずに。才能は努力で磨かれるよ。',
      traits: ['表現力豊か', 'ムードメーカー', '感受性が強い', '人を惹きつける'],
      scoreWeights: [0, 0, 2, 0, 1, 3, 1],
    },
    {
      id: 'ninja',
      emoji: '🌑',
      name: '忍び',
      tag: '#影に潜む万能戦士',
      color: '#34495E',
      description:
        'あなたは高い適応力とバランスの取れた能力を持つ忍びタイプ。状況に応じて戦い方を変え、あらゆる任務をそつなくこなす影の実力者です。',
      advice:
        '目立たないのが長所だけど、時には自分をアピールすることも大切。実力を見せる場面を作ろう。',
      traits: ['適応力が高い', '多芸多才', '冷静', '観察力がある'],
      scoreWeights: [1, 1, 1, 1, 3, 0, 2],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: [
    '#異世界転生クラス診断',
    '#RPG診断',
    '#あなたの異世界クラスは',
    '#性格診断',
    '#ときめきラボ',
  ],
  references: [
    'Myers, I. B., & Briggs, K. C. (1962). The Myers-Briggs Type Indicator. Consulting Psychologists Press.',
    'Holland, J. L. (1959). A Theory of Vocational Choice. Journal of Counseling Psychology, 6(1), 35-45.',
    'Bartle, R. (1996). Hearts, Clubs, Diamonds, Spades: Players Who Suit MUDs. Journal of MUD Research, 1(1).',
  ],
};
