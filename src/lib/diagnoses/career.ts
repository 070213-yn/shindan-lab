/**
 * 未来の職業適性診断
 *
 * 理論基盤:
 *   - Holland(1959, 1997) RIASEC職業興味理論
 *   - Super(1980) キャリア発達理論
 *   - Schein(1978) キャリアアンカー理論
 *
 * 6次元: 現実型(R), 研究型(I), 芸術型(A), 社会型(S), 企業型(E), 慣習型(C)
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const careerDiagnosis: DiagnosisConfig = {
  id: 'career',
  title: '未来の職業適性診断',
  subtitle: '10年後のあなたにぴったりの職業は？',
  catchphrase: 'キミの才能が目覚める、運命の職業を発見しよう！',
  description:
    '世界的に認められたRIASEC理論をベースに、あなたの興味・行動パターン・価値観から未来の天職を導き出します。全28問であなたの隠れた適性が明らかに！',
  emoji: '🚀',
  themeColor: '#3498DB',
  gradientFrom: '#3498DB',
  gradientTo: '#2ECC71',

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

  // --- スコアリング次元（RIASEC） ---
  dimensions: [
    { key: 'R', label: '現実型', color: '#E74C3C' },
    { key: 'I', label: '研究型', color: '#3498DB' },
    { key: 'A', label: '芸術型', color: '#9B59B6' },
    { key: 'S', label: '社会型', color: '#2ECC71' },
    { key: 'E', label: '企業型', color: '#F39C12' },
    { key: 'C', label: '慣習型', color: '#1ABC9C' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '学校の得意科目',
    2: '休日の過ごし方',
    3: '問題解決スタイル',
    4: '理想の働き方',
    5: 'チームでの役割',
    6: '将来の夢',
  },

  // --- 質問データ（28問） ---
  // weights: [R, I, A, S, E, C]
  questions: [
    // === セクション1: 学校の得意科目 (5問) ===
    {
      sid: 1,
      sectionName: '学校の得意科目',
      emoji: '📚',
      text: '体育や技術の授業で、実際にモノを作ったり体を動かすのが好きだ',
      source: 'Holland, J.L. (1997). Making Vocational Choices (3rd ed.). RIASEC現実型指標',
      weights: [3, 0, 0, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '学校の得意科目',
      emoji: '🔬',
      text: '理科の実験で「なぜこうなるんだろう？」と考え続けるのが楽しい',
      source: 'Holland, J.L. (1997). Making Vocational Choices. RIASEC研究型指標',
      weights: [0, 3, 0, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '学校の得意科目',
      emoji: '🎨',
      text: '美術や音楽の時間は、自分だけの世界に入り込める気がする',
      source: 'Holland, J.L. (1959). A theory of vocational choice. 芸術型興味特性',
      weights: [0, 0, 3, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '学校の得意科目',
      emoji: '📝',
      text: '国語や道徳の授業で、人の気持ちを考える問題が得意だ',
      source: 'Super, D.E. (1980). A life-span, life-space approach to career development. 社会型関心',
      weights: [0, 0, 0, 3, 0, 0],
    },
    {
      sid: 1,
      sectionName: '学校の得意科目',
      emoji: '🔢',
      text: '数学の計算問題を正確に速く解けると達成感がある',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 慣習型・正確性指標',
      weights: [0, 0, 0, 0, 0, 3],
    },

    // === セクション2: 休日の過ごし方 (5問) ===
    {
      sid: 2,
      sectionName: '休日の過ごし方',
      emoji: '🏕️',
      text: '休みの日はアウトドアで体を動かしたり、DIYをしたりしたい',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 現実型余暇活動',
      weights: [3, 0, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '休日の過ごし方',
      emoji: '📖',
      text: '図書館やネットで気になったことを徹底的に調べるのが好き',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 研究型探求行動',
      weights: [0, 3, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '休日の過ごし方',
      emoji: '🎵',
      text: '休日は絵を描いたり、曲を作ったり、小説を書いたりして過ごす',
      source: 'Schein, E.H. (1978). Career Anchors. 創造性志向のキャリアアンカー',
      weights: [0, 0, 3, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '休日の過ごし方',
      emoji: '👫',
      text: '友達と遊んだりボランティア活動をしたり、人と関わる休日が好き',
      source: 'Super, D.E. (1980). Life-span career development. 社会的関心',
      weights: [0, 0, 0, 3, 0, 0],
    },
    {
      sid: 2,
      sectionName: '休日の過ごし方',
      emoji: '💰',
      text: 'フリマアプリで売買したり、お金のやりくりを考えるのが楽しい',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 企業型経済活動',
      weights: [0, 0, 0, 0, 3, 0],
    },

    // === セクション3: 問題解決スタイル (5問) ===
    {
      sid: 3,
      sectionName: '問題解決スタイル',
      emoji: '🛠️',
      text: '困ったことがあると、まず手を動かして試しながら解決策を見つける',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 現実型問題解決',
      weights: [3, 0, 0, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: '問題解決スタイル',
      emoji: '🧩',
      text: 'データや情報を集めて、論理的に分析してから行動する',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 研究型分析思考',
      weights: [0, 3, 0, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: '問題解決スタイル',
      emoji: '💡',
      text: '誰も思いつかないような斬新なアイデアで突破口を開くのが好き',
      source: 'Schein, E.H. (1978). Career Anchors. 創造性・独自性アンカー',
      weights: [0, 0, 3, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: '問題解決スタイル',
      emoji: '🤝',
      text: '困っている人がいたら、自分のことを後回しにしてでも助けたい',
      source: 'Super, D.E. (1980). Career development. 奉仕的価値観',
      weights: [0, 0, 0, 3, 0, 0],
    },
    {
      sid: 3,
      sectionName: '問題解決スタイル',
      emoji: '📊',
      text: '計画を立て、チェックリストを作り、一つずつ確実に進めるのが好き',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 慣習型組織化行動',
      weights: [0, 0, 0, 0, 0, 3],
    },

    // === セクション4: 理想の働き方 (5問) ===
    {
      sid: 4,
      sectionName: '理想の働き方',
      emoji: '🏗️',
      text: '目に見える成果物を自分の手で作り上げる仕事がしたい',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 現実型職業選好',
      weights: [3, 0, 1, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '理想の働き方',
      emoji: '🔭',
      text: 'まだ誰も知らない新しい発見をする仕事に憧れる',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 研究型職業志向',
      weights: [0, 3, 1, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '理想の働き方',
      emoji: '🌍',
      text: '世界中の人を笑顔にするエンターテインメントを生み出したい',
      source: 'Schein, E.H. (1978). Career Anchors. 奉仕・創造性複合アンカー',
      weights: [0, 0, 2, 1, 1, 0],
    },
    {
      sid: 4,
      sectionName: '理想の働き方',
      emoji: '👥',
      text: 'たくさんの人をまとめて大きなプロジェクトを動かすリーダーになりたい',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 企業型リーダーシップ',
      weights: [0, 0, 0, 1, 3, 0],
    },
    {
      sid: 4,
      sectionName: '理想の働き方',
      emoji: '🏠',
      text: '安定した環境で、決まった仕事をきっちりこなす働き方が理想だ',
      source: 'Schein, E.H. (1978). Career Anchors. 安定性・保障アンカー',
      weights: [0, 0, 0, 0, 0, 3],
    },

    // === セクション5: チームでの役割 (4問) ===
    {
      sid: 5,
      sectionName: 'チームでの役割',
      emoji: '⚙️',
      text: 'グループワークでは、実際に手を動かす実行役を引き受けることが多い',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 現実型チーム行動',
      weights: [3, 0, 0, 0, 0, 1],
    },
    {
      sid: 5,
      sectionName: 'チームでの役割',
      emoji: '🧠',
      text: 'チームでは「参謀」や「ブレーン」のように頭脳担当になりがちだ',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 研究型チーム役割',
      weights: [0, 3, 0, 0, 1, 0],
    },
    {
      sid: 5,
      sectionName: 'チームでの役割',
      emoji: '💬',
      text: 'みんなの意見を聞いて、場の雰囲気を良くするのが得意だ',
      source: 'Super, D.E. (1980). Career development. 社会的役割行動',
      weights: [0, 0, 0, 3, 1, 0],
    },
    {
      sid: 5,
      sectionName: 'チームでの役割',
      emoji: '📢',
      text: 'グループでは自然とリーダー役になり、みんなを引っ張っていく',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 企業型リーダー行動',
      weights: [0, 0, 0, 0, 3, 0],
    },

    // === セクション6: 将来の夢 (4問) ===
    {
      sid: 6,
      sectionName: '将来の夢',
      emoji: '🌟',
      text: '自分の作品で多くの人を感動させるクリエイターになりたい',
      source: 'Holland, J.L. (1959). A theory of vocational choice. 芸術型将来志向',
      weights: [0, 0, 3, 1, 0, 0],
    },
    {
      sid: 6,
      sectionName: '将来の夢',
      emoji: '🏆',
      text: '起業して自分のビジネスを成功させ、社会に影響を与えたい',
      source: 'Schein, E.H. (1978). Career Anchors. 起業家的創造性アンカー',
      weights: [0, 0, 0, 0, 3, 0],
    },
    {
      sid: 6,
      sectionName: '将来の夢',
      emoji: '🩺',
      text: '病気や困難を抱える人を助ける仕事に就きたい',
      source: 'Super, D.E. (1980). Career development. 奉仕的職業志向',
      weights: [0, 0, 0, 3, 0, 0],
    },
    {
      sid: 6,
      sectionName: '将来の夢',
      emoji: '🤖',
      text: 'AIやロボット、宇宙など最先端テクノロジーの世界で働きたい',
      source: 'Holland, J.L. (1997). Making Vocational Choices. 研究型・現実型複合志向',
      weights: [2, 2, 0, 0, 0, 0],
    },
  ],

  // --- 結果タイプ（14種類） ---
  resultTypes: [
    {
      id: 'genius_programmer',
      emoji: '💻',
      name: '天才プログラマー',
      tag: '#コードで世界を変える',
      color: '#2C3E50',
      description:
        'あなたは論理的思考力と実行力を兼ね備えた「天才プログラマー」タイプ！複雑な問題を美しいコードで解決し、未来のテクノロジーを創り出す才能があります。',
      advice:
        'プログラミングを始めてみよう！Scratchやpythonから挑戦して、自分のアプリやゲームを作ってみて。数学の勉強も将来きっと役に立つよ。',
      traits: ['論理的思考力', '粘り強さ', '問題解決力', '創造的効率性'],
      scoreWeights: [2, 3, 0, 0, 1, 2],
    },
    {
      id: 'world_designer',
      emoji: '🎨',
      name: '世界的デザイナー',
      tag: '#美で世界を塗り替える',
      color: '#8E44AD',
      description:
        'あなたは豊かな感性と独創性で「世界的デザイナー」になれる素質の持ち主！色・形・空間を操って、人々の心を動かすビジュアルを生み出します。',
      advice:
        'デザインアプリ（Canva, Figmaなど）を触ってみよう。街中のポスターや建物を観察して「なぜこれがカッコいいのか」を考えるクセをつけると、センスが磨かれるよ。',
      traits: ['美的センス', '独創性', '色彩感覚', '空間把握力'],
      scoreWeights: [1, 0, 3, 0, 0, 1],
    },
    {
      id: 'charisma_youtuber',
      emoji: '📹',
      name: 'カリスマYouTuber',
      tag: '#発信力で世界を席巻',
      color: '#E74C3C',
      description:
        'あなたは人を惹きつけるカリスマ性と表現力の持ち主！「カリスマYouTuber」として、オリジナルコンテンツで何百万人もの心をつかむ力があります。',
      advice:
        '動画編集やトーク力を磨こう！まずは短い動画を作って友達に見せるところから始めてみて。人を楽しませるネタ帳をつけるのもおすすめ。',
      traits: ['カリスマ性', 'エンタメ力', '発信力', '共感力'],
      scoreWeights: [0, 0, 2, 2, 3, 0],
    },
    {
      id: 'space_engineer',
      emoji: '🚀',
      name: '宇宙開発エンジニア',
      tag: '#宇宙への扉を開く者',
      color: '#1A237E',
      description:
        'あなたは好奇心と技術力を兼ね備えた「宇宙開発エンジニア」タイプ！ロケットや人工衛星の開発に携わり、人類の宇宙進出を支える才能があります。',
      advice:
        '理科と数学の勉強を頑張ろう！NASAやJAXAのサイトで最新ニュースをチェックしたり、プラモデルやロケット模型を作ってみるのもいいね。',
      traits: ['好奇心', '技術力', '精密さ', '壮大な構想力'],
      scoreWeights: [3, 3, 0, 0, 0, 2],
    },
    {
      id: 'legendary_doctor',
      emoji: '🩺',
      name: '伝説の医師',
      tag: '#命を救う天才ドクター',
      color: '#27AE60',
      description:
        'あなたは高い知性と深い思いやりを持つ「伝説の医師」タイプ！科学的知識と人への優しさを武器に、たくさんの命を救う未来が待っています。',
      advice:
        '生物と化学に興味を持とう！身近な健康や体のしくみについて調べてみて。ボランティア活動で人の役に立つ経験を積むのも大切だよ。',
      traits: ['知性', '思いやり', '冷静さ', '使命感'],
      scoreWeights: [1, 3, 0, 3, 0, 1],
    },
    {
      id: 'revolutionary_entrepreneur',
      emoji: '🏢',
      name: '革命的起業家',
      tag: '#新しい世界を創造する',
      color: '#F39C12',
      description:
        'あなたはリーダーシップとビジョンを持つ「革命的起業家」タイプ！新しいビジネスを次々と立ち上げ、社会の常識を覆す才能があります。',
      advice:
        'ビジネスの本を読んだり、身近な「不便」を解決するアイデアを考えてみよう。お小遣い帳をつけてお金の流れを理解するのも起業家への第一歩！',
      traits: ['リーダーシップ', 'ビジョン', '行動力', 'リスクテイク'],
      scoreWeights: [0, 0, 0, 1, 3, 1],
    },
    {
      id: 'international_diplomat',
      emoji: '🌐',
      name: '国際的外交官',
      tag: '#世界をつなぐ架け橋',
      color: '#2980B9',
      description:
        'あなたは高いコミュニケーション力と社会への関心を持つ「国際的外交官」タイプ！異なる文化や意見をまとめ、世界平和に貢献する才能があります。',
      advice:
        '英語を頑張ろう！そして色んな国の文化やニュースに興味を持とう。学校の委員会やディベートに参加して、意見をまとめる練習をするのもおすすめ。',
      traits: ['交渉力', '多文化理解', '社交性', '調整力'],
      scoreWeights: [0, 1, 0, 3, 2, 2],
    },
    {
      id: 'top_athlete_coach',
      emoji: '🏅',
      name: 'トップアスリートコーチ',
      tag: '#人の限界を超えさせる',
      color: '#E67E22',
      description:
        'あなたは身体能力への理解と人を導く力を持つ「トップアスリートコーチ」タイプ！選手の可能性を最大限に引き出し、世界チャンピオンを育てます。',
      advice:
        'スポーツを楽しもう！自分が得意じゃなくても、「どうすれば上手くなるか」を考える力が大事。友達にスポーツを教えてあげる経験も積んでみてね。',
      traits: ['指導力', '観察力', '忍耐力', '身体知性'],
      scoreWeights: [3, 1, 0, 2, 1, 0],
    },
    {
      id: 'ai_researcher',
      emoji: '🤖',
      name: 'AI研究者',
      tag: '#知能の謎を解き明かす',
      color: '#00BCD4',
      description:
        'あなたは抜群の知的好奇心と分析力で「AI研究者」になれる才能を秘めています！人工知能の可能性を追求し、未来のテクノロジーを切り拓きます。',
      advice:
        '数学と理科をしっかり勉強しよう。AIについて調べてみたり、簡単なプログラミングに挑戦してみて。「なぜ？」を大切にする好奇心が最大の武器だよ。',
      traits: ['分析力', '知的好奇心', '論理的思考', '先見性'],
      scoreWeights: [1, 3, 0, 0, 0, 2],
    },
    {
      id: 'film_director',
      emoji: '🎬',
      name: '映画監督',
      tag: '#物語で心を震わせる',
      color: '#7B1FA2',
      description:
        'あなたは物語を紡ぐ力と人の感情を動かすセンスを持つ「映画監督」タイプ！壮大なストーリーと映像美で、世界中の人々を感動させます。',
      advice:
        'たくさんの映画やドラマを観て、好きなシーンの「なぜ感動するのか」を分析しよう。スマホで短い映像作品を撮ってみるのもGood！',
      traits: ['ストーリーテリング', '演出力', '感受性', '統率力'],
      scoreWeights: [0, 0, 3, 1, 2, 0],
    },
    {
      id: 'eco_scientist',
      emoji: '🌱',
      name: '環境サイエンティスト',
      tag: '#地球の未来を守る知性',
      color: '#4CAF50',
      description:
        'あなたは科学的知識と地球への愛情を持つ「環境サイエンティスト」タイプ！気候変動や生態系の問題を研究し、地球の未来を守る使命を持っています。',
      advice:
        '自然観察を始めよう！身近な植物や動物を観察したり、環境問題について調べてみて。理科の勉強が直接未来の地球を守ることにつながるよ。',
      traits: ['科学的思考', '自然愛', '持続可能性への意識', '研究力'],
      scoreWeights: [2, 3, 0, 2, 0, 1],
    },
    {
      id: 'bestseller_author',
      emoji: '📝',
      name: 'ベストセラー作家',
      tag: '#言葉の魔術師',
      color: '#795548',
      description:
        'あなたは豊かな想像力と言葉のセンスで「ベストセラー作家」になれる才能があります！物語や言葉の力で、読者の人生を変えるような作品を生み出します。',
      advice:
        'とにかくたくさん本を読もう！そして日記や物語を書く習慣をつけてみて。感じたことを言葉にする練習が、未来のベストセラーの種になるよ。',
      traits: ['想像力', '言語センス', '内省力', '表現力'],
      scoreWeights: [0, 1, 3, 1, 0, 1],
    },
    {
      id: 'game_creator',
      emoji: '🎮',
      name: 'ゲームクリエイター',
      tag: '#遊びの天才アーキテクト',
      color: '#FF5722',
      description:
        'あなたは創造力と技術力、そしてエンタメ精神を兼ね備えた「ゲームクリエイター」タイプ！世界中の人を夢中にさせるゲームを作り出す才能があります。',
      advice:
        'ゲームをプレイするだけじゃなく「作る側」に回ってみよう！UnityやScratchでゲーム制作に挑戦。数学とプログラミングの勉強も忘れずに。',
      traits: ['創造力', '技術力', 'エンタメ精神', 'ユーザー目線'],
      scoreWeights: [2, 1, 3, 0, 1, 1],
    },
    {
      id: 'top_patissier',
      emoji: '🧁',
      name: 'トップパティシエ',
      tag: '#甘い芸術を創る匠',
      color: '#E91E63',
      description:
        'あなたは繊細な感性と正確な技術を持つ「トップパティシエ」タイプ！美しいスイーツで人々を幸せにする、味覚のアーティストです。',
      advice:
        'まずはお菓子作りに挑戦してみよう！レシピ通り正確に作る力と、見た目を美しくデコレーションするセンスの両方を磨いてね。料理系のコンテストにも参加してみて。',
      traits: ['繊細さ', '正確性', '美的センス', 'おもてなし精神'],
      scoreWeights: [2, 0, 2, 1, 0, 3],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#未来の職業診断', '#RIASEC', '#適職診断', '#将来の夢'],
  references: [
    'Holland, J.L. (1959). A theory of vocational choice. Journal of Counseling Psychology, 6(1), 35-45.',
    'Holland, J.L. (1997). Making Vocational Choices: A Theory of Vocational Personalities and Work Environments (3rd ed.). Psychological Assessment Resources.',
    'Super, D.E. (1980). A life-span, life-space approach to career development. Journal of Vocational Behavior, 16(3), 282-298.',
    'Schein, E.H. (1978). Career Dynamics: Matching Individual and Organizational Needs. Addison-Wesley.',
  ],
};
