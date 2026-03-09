/**
 * ストレスコーピング診断
 *
 * 理論基盤:
 *   - トランスアクショナルモデル — Lazarus & Folkman (1984)
 *   - COPEインベントリ — Carver, Scheier & Weintraub (1989)
 *   - CISS（コーピング・インベントリ） — Endler & Parker (1990)
 *
 * 7次元: 問題焦点型対処, 情動焦点型対処, 回避型対処, 社会的サポート活用,
 *         セルフケア力, 認知的再評価力, 表現的対処力
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const stressDiagnosis: DiagnosisConfig = {
  id: 'stress',
  title: 'ストレスコーピング診断',
  subtitle: 'あなたのストレス対処法を科学的に解析！',
  catchphrase: 'ストレスとの付き合い方、知ってみない？',
  description:
    'ストレス心理学の理論をベースに、あなたがストレスにどう向き合い、どう乗り越えるかを7つの軸で分析します。28問の質問に正直に答えて、自分だけのコーピングスタイルを発見しよう！',
  emoji: '🧘',
  themeColor: '#14B8A6',
  gradientFrom: '#14B8A6',
  gradientTo: '#0D9488',

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
    { key: 'problem',    label: '問題焦点型対処',     color: '#14B8A6' },
    { key: 'emotion',    label: '情動焦点型対処',     color: '#F472B6' },
    { key: 'avoidance',  label: '回避型対処',         color: '#A78BFA' },
    { key: 'social',     label: '社会的サポート活用', color: '#60A5FA' },
    { key: 'selfcare',   label: 'セルフケア力',       color: '#34D399' },
    { key: 'reappraisal', label: '認知的再評価力',    color: '#FBBF24' },
    { key: 'expression', label: '表現的対処力',       color: '#F87171' },
  ],

  // --- セクション定義 ---
  sections: {
    1: 'テスト前の行動',
    2: '友人とのトラブル',
    3: '失敗した時',
    4: '環境変化への対応',
    5: 'リラックス方法',
    6: '長期ストレス',
  },

  // --- 28問の質問データ ---
  // weights: [問題焦点型, 情動焦点型, 回避型, 社会的サポート, セルフケア, 認知的再評価, 表現的対処]
  questions: [
    // === セクション1: テスト前の行動 5問 ===
    {
      sid: 1,
      sectionName: 'テスト前の行動',
      emoji: '📝',
      text: '明日テストなのにまだ全然勉強してない！まず何をする？',
      source: 'Lazarus & Folkman (1984) — 一次的評価における問題対処の選択',
      weights: [3, 0, 1, 0, 0, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'テスト前の行動',
      emoji: '😰',
      text: 'テスト範囲が広すぎてパニック！このとき頭に浮かぶことは？',
      source: 'Carver et al. (1989) — COPE 計画立案サブスケール',
      weights: [2, 1, 0, 0, 0, 2, 0],
    },
    {
      sid: 1,
      sectionName: 'テスト前の行動',
      emoji: '🎮',
      text: 'テスト前日、不安すぎてつい別のことをしてしまう。あるある？',
      source: 'Endler & Parker (1990) — CISS 回避型コーピング尺度',
      weights: [0, 1, 3, 0, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: 'テスト前の行動',
      emoji: '📱',
      text: 'テスト前に友達に「やばい、全然わかんない！」と連絡する？',
      source: 'Carver et al. (1989) — COPE 社会的サポート探索サブスケール',
      weights: [0, 0, 0, 3, 0, 0, 1],
    },
    {
      sid: 1,
      sectionName: 'テスト前の行動',
      emoji: '🧠',
      text: 'テスト結果が悪かったとき、「次どうすればいい？」と考える方？',
      source: 'Lazarus & Folkman (1984) — 二次的評価と問題焦点型コーピング',
      weights: [2, 0, 0, 0, 0, 3, 0],
    },

    // === セクション2: 友人とのトラブル 5問 ===
    {
      sid: 2,
      sectionName: '友人とのトラブル',
      emoji: '😤',
      text: '友達に悪口を言われたことを知った。まず何をする？',
      source: 'Lazarus & Folkman (1984) — 対人ストレス場面の一次的評価',
      weights: [2, 0, 0, 1, 0, 0, 2],
    },
    {
      sid: 2,
      sectionName: '友人とのトラブル',
      emoji: '💔',
      text: '仲良しグループから急に外されたら、どう対処する？',
      source: 'Endler & Parker (1990) — CISS 情動志向型コーピング',
      weights: [0, 2, 1, 1, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '友人とのトラブル',
      emoji: '🤝',
      text: '友達とケンカしたあと、自分から謝れるタイプ？',
      source: 'Carver et al. (1989) — COPE 積極的コーピングサブスケール',
      weights: [3, 0, 0, 1, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '友人とのトラブル',
      emoji: '😢',
      text: '友達関係で傷ついたとき、誰かに話を聞いてもらいたい？',
      source: 'Carver et al. (1989) — COPE 情緒的サポート探索',
      weights: [0, 2, 0, 3, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '友人とのトラブル',
      emoji: '🔄',
      text: '友達ともめたあと、「まあ仕方ないか」と思える方？',
      source: 'Lazarus & Folkman (1984) — 認知的再評価による情動調整',
      weights: [0, 0, 1, 0, 1, 3, 0],
    },

    // === セクション3: 失敗した時 5問 ===
    {
      sid: 3,
      sectionName: '失敗した時',
      emoji: '🏃',
      text: '部活や習い事で大きなミスをした。直後の行動は？',
      source: 'Carver et al. (1989) — COPE 行動的対処サブスケール',
      weights: [2, 1, 0, 0, 0, 1, 1],
    },
    {
      sid: 3,
      sectionName: '失敗した時',
      emoji: '😭',
      text: 'みんなの前で恥ずかしい失敗をした！泣きたくなる？',
      source: 'Endler & Parker (1990) — CISS 情動志向型反応パターン',
      weights: [0, 3, 0, 0, 0, 0, 2],
    },
    {
      sid: 3,
      sectionName: '失敗した時',
      emoji: '💪',
      text: '失敗したあと、「次はこうしよう」と具体的に考える？',
      source: 'Lazarus & Folkman (1984) — 問題焦点型コーピングの計画立案',
      weights: [3, 0, 0, 0, 0, 2, 0],
    },
    {
      sid: 3,
      sectionName: '失敗した時',
      emoji: '🛏️',
      text: '嫌なことがあると、とりあえず寝てリセットするタイプ？',
      source: 'Endler & Parker (1990) — CISS 回避-気晴らし型コーピング',
      weights: [0, 0, 2, 0, 2, 0, 0],
    },
    {
      sid: 3,
      sectionName: '失敗した時',
      emoji: '🌈',
      text: '失敗を「いい経験だった」と思い直せるのはどれくらいの時間がかかる？',
      source: 'Lazarus & Folkman (1984) — 認知的再評価の時間的プロセス',
      weights: [0, 0, 0, 0, 1, 3, 1],
    },

    // === セクション4: 環境変化への対応 5問 ===
    {
      sid: 4,
      sectionName: '環境変化への対応',
      emoji: '🏫',
      text: 'クラス替えで知らない人ばかりになった。どう動く？',
      source: 'Carver et al. (1989) — COPE 積極的コーピング（環境適応）',
      weights: [2, 0, 0, 2, 0, 0, 1],
    },
    {
      sid: 4,
      sectionName: '環境変化への対応',
      emoji: '🏠',
      text: '引っ越しや転校で新しい環境に。不安なとき、まずやることは？',
      source: 'Endler & Parker (1990) — CISS 課題志向型コーピング（環境変化）',
      weights: [1, 0, 0, 2, 1, 0, 1],
    },
    {
      sid: 4,
      sectionName: '環境変化への対応',
      emoji: '🌀',
      text: '急に予定が変わると、どう感じる？',
      source: 'Lazarus & Folkman (1984) — ストレス評価の認知的柔軟性',
      weights: [0, 1, 1, 0, 0, 2, 0],
    },
    {
      sid: 4,
      sectionName: '環境変化への対応',
      emoji: '📋',
      text: '新しいルールや決まりができたとき、どう対応する？',
      source: 'Carver et al. (1989) — COPE 受容サブスケール',
      weights: [1, 0, 1, 0, 0, 3, 0],
    },
    {
      sid: 4,
      sectionName: '環境変化への対応',
      emoji: '🤔',
      text: '変化が多くてストレスなとき、自分をどうやって落ち着かせる？',
      source: 'Endler & Parker (1990) — CISS 情動調整とセルフケア',
      weights: [0, 1, 0, 0, 3, 1, 0],
    },

    // === セクション5: リラックス方法 4問 ===
    {
      sid: 5,
      sectionName: 'リラックス方法',
      emoji: '🎵',
      text: 'ストレスが溜まったとき、一番やりたいことは？',
      source: 'Endler & Parker (1990) — CISS 回避-社会的気晴らし型',
      weights: [0, 1, 2, 0, 2, 0, 0],
    },
    {
      sid: 5,
      sectionName: 'リラックス方法',
      emoji: '🏃‍♂️',
      text: 'イライラしたとき、体を動かしたくなる？それとも静かに過ごしたい？',
      source: 'Carver et al. (1989) — COPE 身体的コーピング行動',
      weights: [0, 0, 0, 0, 3, 0, 1],
    },
    {
      sid: 5,
      sectionName: 'リラックス方法',
      emoji: '📓',
      text: '日記やSNSに気持ちを書き出すことがある？',
      source: 'Carver et al. (1989) — COPE 感情表出サブスケール',
      weights: [0, 1, 0, 0, 1, 0, 3],
    },
    {
      sid: 5,
      sectionName: 'リラックス方法',
      emoji: '🍫',
      text: 'ストレス解消に「自分へのご褒美」をよくあげる？',
      source: 'Endler & Parker (1990) — CISS セルフケア型コーピング',
      weights: [0, 0, 1, 0, 3, 0, 0],
    },

    // === セクション6: 長期ストレス 4問 ===
    {
      sid: 6,
      sectionName: '長期ストレス',
      emoji: '📆',
      text: '何週間もストレスが続いたとき、一番つらいのは？',
      source: 'Lazarus & Folkman (1984) — 慢性ストレスにおけるコーピング資源の枯渇',
      weights: [1, 2, 0, 1, 0, 0, 1],
    },
    {
      sid: 6,
      sectionName: '長期ストレス',
      emoji: '🆘',
      text: '長い間つらい状況が続くと、誰かに助けを求められる？',
      source: 'Carver et al. (1989) — COPE 道具的サポート探索',
      weights: [0, 0, 0, 3, 1, 0, 1],
    },
    {
      sid: 6,
      sectionName: '長期ストレス',
      emoji: '🧘',
      text: 'ずっとストレスがあるとき、自分なりのリセット方法を持っている？',
      source: 'Endler & Parker (1990) — CISS セルフケアリソースの評価',
      weights: [1, 0, 0, 0, 3, 1, 0],
    },
    {
      sid: 6,
      sectionName: '長期ストレス',
      emoji: '💭',
      text: 'つらい時期を乗り越えたあと、「成長できた」と感じることがある？',
      source: 'Lazarus & Folkman (1984) — ストレス関連成長と認知的再評価',
      weights: [0, 0, 0, 0, 0, 3, 1],
    },
  ],

  // --- 14種類の結果タイプ ---
  // scoreWeights: [問題焦点型, 情動焦点型, 回避型, 社会的サポート, セルフケア, 認知的再評価, 表現的対処]
  resultTypes: [
    {
      id: 'strategic-solver',
      emoji: '🎯',
      name: '戦略的解決マスター',
      tag: '#問題解決のプロ',
      color: '#14B8A6',
      description:
        'あなたはストレスの原因をまっすぐ見つめて、具体的な行動で解決するタイプ。問題を分析して計画を立て、着実に乗り越えていく戦略家です。',
      advice:
        '計画通りにいかないときもあるよ。「完璧じゃなくても大丈夫」と自分に言い聞かせることも、立派なコーピングだよ。',
      traits: ['論理的思考', '計画的', '行動力がある', '冷静に対処できる'],
      scoreWeights: [3, 0, -1, 0, 0, 2, 0],
    },
    {
      id: 'emotion-healer',
      emoji: '💧',
      name: '感情浄化ヒーラー',
      tag: '#感情に素直な癒し手',
      color: '#F472B6',
      description:
        'あなたは感情をしっかり感じ取り、その感情と向き合うことでストレスを浄化するタイプ。泣いたり笑ったり、感情を大切にすることが回復の鍵です。',
      advice:
        '感情に流されすぎると疲れちゃうことも。たまには「考えるのは明日にしよう」とお休みしてOKだよ。',
      traits: ['感受性が高い', '共感力がある', '自分の気持ちに正直', '感情表現が豊か'],
      scoreWeights: [0, 3, 0, 1, 0, 0, 2],
    },
    {
      id: 'escape-master',
      emoji: '🎭',
      name: '逃避の達人',
      tag: '#上手に距離を取る天才',
      color: '#A78BFA',
      description:
        'あなたはストレスから上手に距離を取るのが得意。「今はこれ以上考えない」と割り切って、別のことに集中することで心を守る賢い戦略の持ち主です。',
      advice:
        '一時的に逃げるのは全然OK！でも、逃げ続けると問題が大きくなることも。タイミングを見て向き合うことも意識しよう。',
      traits: ['切り替えが早い', '楽観的', '趣味が多い', '柔軟な考え方'],
      scoreWeights: [-1, 0, 3, 0, 1, 0, 0],
    },
    {
      id: 'social-consultant',
      emoji: '👥',
      name: '仲間頼りの相談王',
      tag: '#みんなの力を借りる名人',
      color: '#60A5FA',
      description:
        'あなたはストレスを感じたとき、信頼できる人に相談することで解決の糸口を見つけるタイプ。「一人で抱え込まない」という最強のスキルを持っています。',
      advice:
        '相談できるのは素晴らしい力。でも、自分で解決する力も少しずつ鍛えると、もっと強くなれるよ。',
      traits: ['コミュニケーション上手', '信頼関係を築ける', '素直', '協調性が高い'],
      scoreWeights: [0, 0, 0, 3, 0, 0, 1],
    },
    {
      id: 'selfcare-master',
      emoji: '🛁',
      name: 'セルフケアの鬼',
      tag: '#自分を大切にする天才',
      color: '#34D399',
      description:
        'あなたは自分の心と体の声をよく聞いて、上手にケアできるタイプ。好きなことをしたり、休んだり、自分なりのリフレッシュ法を確立しています。',
      advice:
        'セルフケアは最高の習慣！でも「一人で何でも解決しなきゃ」と思わなくて大丈夫。人に頼るのもセルフケアの一つだよ。',
      traits: ['自己理解が深い', '生活リズムが整っている', '趣味を大切にする', 'マイペース'],
      scoreWeights: [0, 0, 0, 0, 3, 1, 0],
    },
    {
      id: 'positive-converter',
      emoji: '🔄',
      name: 'ポジティブ変換機',
      tag: '#何でもプラスに変える',
      color: '#FBBF24',
      description:
        'あなたはストレスや困難を「成長のチャンス」と捉え直すことができるタイプ。ピンチをチャンスに変換するその能力は、心理学的にも最強のコーピング戦略です。',
      advice:
        '何でもポジティブに変換しすぎると、本当につらいときに気持ちを抑え込んでしまうことも。「つらい」と感じることもOKだよ。',
      traits: ['前向き', '柔軟な思考', '学びの姿勢', '逆境に強い'],
      scoreWeights: [1, 0, 0, 0, 0, 3, 0],
    },
    {
      id: 'explosive-releaser',
      emoji: '💥',
      name: '爆発型ストレス発散者',
      tag: '#溜めて一気に放出',
      color: '#EF4444',
      description:
        'あなたはストレスを溜めがちだけど、発散するときは一気に爆発的にエネルギーを放出するタイプ。カラオケで絶叫したり、思いっきり体を動かしたりして解消します。',
      advice:
        '爆発的に発散するのもアリだけど、小まめにガス抜きする方法も覚えると楽になるよ。日々の小さな発散を心がけてみて。',
      traits: ['エネルギッシュ', '感情が豊か', '溜め込みがち', '全力投球タイプ'],
      scoreWeights: [0, 2, 0, 0, 1, 0, 3],
    },
    {
      id: 'silent-endurer',
      emoji: '🏔️',
      name: '沈黙の耐久者',
      tag: '#静かに耐え抜く強さ',
      color: '#6B7280',
      description:
        'あなたはストレスを表に出さず、静かに内側で処理するタイプ。周りには何でもないように見せながら、黙々と耐え抜く精神力を持っています。',
      advice:
        '一人で耐えるのは強さだけど、誰かに話すだけで楽になることもあるよ。信頼できる人に少しだけ打ち明けてみて。',
      traits: ['忍耐力がある', '自立している', '冷静', '表に出さない'],
      scoreWeights: [1, -1, 0, -1, 1, 1, -1],
    },
    {
      id: 'laugh-it-off',
      emoji: '😂',
      name: '笑い飛ばし型',
      tag: '#ユーモアで乗り越える',
      color: '#FCD34D',
      description:
        'あなたはつらいことがあっても笑いに変えて乗り越えるタイプ。ユーモアは実は高度なコーピング戦略で、ストレスの深刻さを和らげる効果があります。',
      advice:
        '笑いで乗り越えるのは素敵な力。でも、本当につらいときは笑わなくていいからね。泣ける場所も持っておこう。',
      traits: ['ユーモアがある', '場を和ませる', '明るい', 'ストレスを軽くできる'],
      scoreWeights: [0, 0, 1, 1, 0, 2, 2],
    },
    {
      id: 'exercise-detox',
      emoji: '🏃‍♂️',
      name: '運動デトックス型',
      tag: '#体を動かしてスッキリ',
      color: '#10B981',
      description:
        'あなたはストレスを感じたら体を動かすことで解消するタイプ。運動によるストレス解消は科学的にも証明されている最も効果的な方法の一つです。',
      advice:
        '体を動かすのは最高の発散法！でも疲れすぎには注意。心の疲れには心のケアも必要だよ。',
      traits: ['活動的', 'エネルギッシュ', '体を動かすのが好き', '行動派'],
      scoreWeights: [1, 0, 0, 0, 3, 0, 1],
    },
    {
      id: 'analyzer',
      emoji: '🔬',
      name: '分析して落ち着く型',
      tag: '#理解することで安心する',
      color: '#8B5CF6',
      description:
        'あなたはストレスの原因を分析し、理解することで安心感を得るタイプ。「なぜつらいのか」を言語化できると、それだけで気持ちが整理されます。',
      advice:
        '分析しすぎると「考えすぎループ」にハマることも。ときには「考えなくてもいい」と自分に許可を出そう。',
      traits: ['分析的', '知的好奇心が強い', '自己理解が深い', '言語化が得意'],
      scoreWeights: [2, 0, 0, 0, 0, 3, 1],
    },
    {
      id: 'hobby-escape',
      emoji: '🎨',
      name: '趣味没頭逃避型',
      tag: '#好きなことに夢中になって回復',
      color: '#EC4899',
      description:
        'あなたはストレスを感じたら好きなことに没頭して心をリセットするタイプ。ゲーム、絵、音楽、読書など、趣味の世界に入ることで自然と元気を取り戻します。',
      advice:
        '趣味は心の栄養。ただし、やるべきことを後回しにしすぎると逆にストレスが増えることも。バランスを意識してみよう。',
      traits: ['集中力がある', '没頭できる', '多趣味', '自分の世界を持っている'],
      scoreWeights: [0, 0, 2, 0, 2, 0, 0],
    },
    {
      id: 'mindfulness',
      emoji: '🧘',
      name: 'マインドフルネス瞑想型',
      tag: '#今この瞬間に集中する',
      color: '#06B6D4',
      description:
        'あなたは「今この瞬間」に意識を集中させることでストレスを和らげるタイプ。深呼吸をしたり、自然を感じたり、静かに自分と向き合うことで心を整えます。',
      advice:
        '心を落ち着かせる力は素晴らしい。でも、感情を「消す」のではなく「感じてから手放す」ことを意識するとさらに効果的だよ。',
      traits: ['落ち着いている', '自分と向き合える', '穏やか', '内省的'],
      scoreWeights: [0, 1, 0, 0, 2, 2, 0],
    },
    {
      id: 'crying-catharsis',
      emoji: '🌧️',
      name: '涙活浄化型',
      tag: '#泣いてスッキリ回復する',
      color: '#93C5FD',
      description:
        'あなたは涙を流すことでストレスを浄化するタイプ。泣くことには科学的にストレスホルモンを排出する効果があり、実はとても賢い対処法です。',
      advice:
        '泣けるのは強さの証拠。でも泣いたあとに「次どうする？」を考える習慣をつけると、もっと前に進めるよ。',
      traits: ['感受性が高い', '素直', '感情に正直', '共感力がある'],
      scoreWeights: [0, 3, 0, 0, 0, 0, 2],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: [
    '#ストレスコーピング診断',
    '#ストレス対処法診断',
    '#あなたのコーピングタイプは',
    '#心理テスト',
    '#ときめきラボ',
  ],
  references: [
    'Lazarus, R. S., & Folkman, S. (1984). Stress, Appraisal, and Coping. Springer Publishing Company.',
    'Carver, C. S., Scheier, M. F., & Weintraub, J. K. (1989). Assessing coping strategies: A theoretically based approach. Journal of Personality and Social Psychology, 56(2), 267-283.',
    'Endler, N. S., & Parker, J. D. A. (1990). Multidimensional assessment of coping: A critical evaluation. Journal of Personality and Social Psychology, 58(5), 844-854.',
  ],
};
