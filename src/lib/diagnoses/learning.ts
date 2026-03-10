/**
 * 学習スタイル診断
 *
 * 理論基盤:
 *   - Fleming, N.D. (2001) VARK学習スタイルモデル
 *   - Kolb, D.A. (1984) 経験学習モデル
 *   - Gardner, H. (1983) 多重知能理論（Multiple Intelligences）
 *   - Dunn, R. & Dunn, K. (1978) 学習スタイルモデル
 *
 * 7次元: 視覚学習力, 聴覚学習力, 読み書き学習力, 体験学習力,
 *        論理的処理力, 社会的学習力, 内省的学習力
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const learningDiagnosis: DiagnosisConfig = {
  id: 'learning',
  title: '学習スタイル診断',
  subtitle: 'あなたに合った勉強法を発見！',
  catchphrase: '自分だけの最強勉強法が見つかる！25問の学習タイプ分析',
  description:
    'VARK理論・Kolb経験学習モデル・Dunn & Dunn学習スタイル理論など、教育心理学の実証研究に基づいて、あなたの脳が最も効率よく学べるスタイルを科学的に分析。テスト勉強が楽しくなるヒントが見つかります。',
  emoji: '📖',
  themeColor: '#4F46E5',
  gradientFrom: '#4F46E5',
  gradientTo: '#7C3AED',

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
    { key: 'visual',        label: '視覚学習力',     color: '#EF4444' },
    { key: 'auditory',      label: '聴覚学習力',     color: '#F59E0B' },
    { key: 'readwrite',     label: '読み書き学習力', color: '#3B82F6' },
    { key: 'kinesthetic',   label: '体験学習力',     color: '#10B981' },
    { key: 'logical',       label: '論理的処理力',   color: '#8B5CF6' },
    { key: 'social',        label: '社会的学習力',   color: '#EC4899' },
    { key: 'introspective', label: '内省的学習力',   color: '#6366F1' },
  ],

  // --- セクション定義（5セクション） ---
  sections: {
    1: '授業の受け方',
    2: 'ノートの取り方',
    3: 'テスト勉強',
    4: '新しいことの覚え方',
    5: '集中できる環境',
  },

  // --- 質問データ（25問） ---
  // weights: [視覚, 聴覚, 読み書き, 体験, 論理, 社会, 内省]
  questions: [
    // === セクション1: 授業の受け方 (5問) ===
    {
      sid: 1,
      sectionName: '授業の受け方',
      emoji: '🏫',
      text: '先生が図やイラストを使って説明してくれると、すごく分かりやすいと感じる',
      source: 'Fleming, N.D. (2001). Teaching and Learning Styles: VARK Strategies. 視覚学習指標',
      weights: [3, 0, 0, 0, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '授業の受け方',
      emoji: '👂',
      text: '先生の話を聞いているだけで、内容がスッと頭に入ってくることが多い',
      source: 'Fleming, N.D. (2001). Teaching and Learning Styles: VARK Strategies. 聴覚学習指標',
      weights: [0, 3, 0, 0, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '授業の受け方',
      emoji: '🔬',
      text: '実験や実習など、自分で手を動かす授業が一番楽しいし覚えられる',
      source: 'Kolb, D.A. (1984). Experiential Learning. 具体的経験段階',
      weights: [0, 0, 0, 3, 0, 0, 0],
    },
    {
      sid: 1,
      sectionName: '授業の受け方',
      emoji: '🤔',
      text: '授業中、先生の説明を聞きながら「なぜそうなるのか」を自分の頭で考えている',
      source: 'Kolb, D.A. (1984). Experiential Learning. 抽象的概念化段階',
      weights: [0, 0, 0, 0, 3, 0, 1],
    },
    {
      sid: 1,
      sectionName: '授業の受け方',
      emoji: '💬',
      text: 'グループで話し合いながら学ぶ授業のほうが、一人で聞くより頭に入る',
      source: 'Dunn, R. & Dunn, K. (1978). Teaching Students Through Their Individual Learning Styles. 社会的学習要素',
      weights: [0, 0, 0, 0, 0, 3, 0],
    },

    // === セクション2: ノートの取り方 (5問) ===
    {
      sid: 2,
      sectionName: 'ノートの取り方',
      emoji: '🎨',
      text: 'ノートに図や矢印、色ペンを使ってカラフルにまとめるのが好きだ',
      source: 'Fleming, N.D. (2001). VARK Strategies. 視覚型ノートテイキング',
      weights: [3, 0, 0, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: 'ノートの取り方',
      emoji: '📝',
      text: '先生の言葉をできるだけそのまま書き取るようにしている',
      source: 'Fleming, N.D. (2001). VARK Strategies. 読み書き型ノート方略',
      weights: [0, 1, 3, 0, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: 'ノートの取り方',
      emoji: '🗺️',
      text: 'マインドマップのように、キーワードを線でつなげて整理するのが得意だ',
      source: 'Gardner, H. (1983). Frames of Mind. 空間的知能指標',
      weights: [2, 0, 0, 0, 2, 0, 1],
    },
    {
      sid: 2,
      sectionName: 'ノートの取り方',
      emoji: '📋',
      text: '箇条書きでポイントを番号順にまとめるのが一番しっくりくる',
      source: 'Fleming, N.D. (2001). VARK Strategies. 読み書き型構造化',
      weights: [0, 0, 2, 0, 3, 0, 0],
    },
    {
      sid: 2,
      sectionName: 'ノートの取り方',
      emoji: '🤷',
      text: '正直、ノートを取るより先生の話に集中して聴いたほうが覚えられると思う',
      source: 'Fleming, N.D. (2001). VARK Strategies. 聴覚型優位傾向',
      weights: [0, 3, -1, 0, 0, 0, 1],
    },

    // === セクション3: テスト勉強 (5問) ===
    {
      sid: 3,
      sectionName: 'テスト勉強',
      emoji: '🃏',
      text: '単語カード（フラッシュカード）を作って繰り返しめくるのが定番の勉強法だ',
      source: 'Dunn, R. & Dunn, K. (1978). Individual Learning Styles. 反復学習パターン',
      weights: [2, 0, 2, 1, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: 'テスト勉強',
      emoji: '🗣️',
      text: '声に出して読んだり、自分に説明するように話すと覚えやすい',
      source: 'Fleming, N.D. (2001). VARK Strategies. 聴覚型記憶方略',
      weights: [0, 3, 0, 0, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: 'テスト勉強',
      emoji: '👫',
      text: '友達と問題を出し合ったり、教え合ったりすると一番頭に入る',
      source: 'Dunn, R. & Dunn, K. (1978). Individual Learning Styles. 社会的学習パターン',
      weights: [0, 1, 0, 0, 0, 3, 0],
    },
    {
      sid: 3,
      sectionName: 'テスト勉強',
      emoji: '📖',
      text: 'テスト前は教科書やプリントを何度も読み返すのが基本だ',
      source: 'Fleming, N.D. (2001). VARK Strategies. 読み書き型学習',
      weights: [0, 0, 3, 0, 0, 0, 1],
    },
    {
      sid: 3,
      sectionName: 'テスト勉強',
      emoji: '🧩',
      text: '丸暗記よりも、なぜそうなるかの理屈を理解してから覚えたい',
      source: 'Kolb, D.A. (1984). Experiential Learning. 抽象的概念化志向',
      weights: [0, 0, 0, 0, 3, 0, 2],
    },

    // === セクション4: 新しいことの覚え方 (5問) ===
    {
      sid: 4,
      sectionName: '新しいことの覚え方',
      emoji: '🎥',
      text: '動画やアニメーションで説明されると、文字だけよりずっと理解しやすい',
      source: 'Fleming, N.D. (2001). VARK Strategies. 視覚・動的メディア選好',
      weights: [3, 1, 0, 0, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '新しいことの覚え方',
      emoji: '🎮',
      text: 'ゲーム形式やクイズ形式だと、楽しみながら自然に覚えてしまう',
      source: 'Dunn, R. & Dunn, K. (1978). Individual Learning Styles. ゲーミフィケーション親和性',
      weights: [1, 0, 0, 2, 0, 1, 0],
    },
    {
      sid: 4,
      sectionName: '新しいことの覚え方',
      emoji: '📚',
      text: '歴史の年号や出来事は、ストーリーのようにつなげて覚えるのが得意だ',
      source: 'Gardner, H. (1983). Frames of Mind. 言語的知能・物語的記憶',
      weights: [0, 1, 2, 0, 0, 0, 2],
    },
    {
      sid: 4,
      sectionName: '新しいことの覚え方',
      emoji: '✋',
      text: '説明を聞くだけじゃなく、実際にやってみないと身につかないと感じる',
      source: 'Kolb, D.A. (1984). Experiential Learning. 能動的実験段階',
      weights: [0, 0, 0, 3, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: '新しいことの覚え方',
      emoji: '🔢',
      text: '新しいことを学ぶとき、全体像を図や表に整理してから覚え始める',
      source: 'Gardner, H. (1983). Frames of Mind. 論理-数学的知能・体系化',
      weights: [2, 0, 0, 0, 3, 0, 0],
    },

    // === セクション5: 集中できる環境 (5問) ===
    {
      sid: 5,
      sectionName: '集中できる環境',
      emoji: '🎧',
      text: '音楽やBGMを聴きながら勉強するほうが集中できる',
      source: 'Dunn, R. & Dunn, K. (1978). Individual Learning Styles. 聴覚環境要素',
      weights: [0, 3, 0, 0, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: '集中できる環境',
      emoji: '🤫',
      text: '静かな場所で一人で黙々と勉強するのが最も集中できる',
      source: 'Dunn, R. & Dunn, K. (1978). Individual Learning Styles. 環境刺激選好',
      weights: [0, 0, 1, 0, 1, -1, 3],
    },
    {
      sid: 5,
      sectionName: '集中できる環境',
      emoji: '📱',
      text: '机に向かうよりも、タブレットやスマホの学習アプリで勉強するほうが好きだ',
      source: 'Dunn, R. & Dunn, K. (1978). Individual Learning Styles. デジタルメディア親和性（現代拡張）',
      weights: [2, 0, 0, 1, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: '集中できる環境',
      emoji: '☕',
      text: 'カフェや図書館など、適度に人がいる場所のほうが勉強がはかどる',
      source: 'Dunn, R. & Dunn, K. (1978). Individual Learning Styles. 社会的環境要素',
      weights: [0, 1, 0, 0, 0, 2, 0],
    },
    {
      sid: 5,
      sectionName: '集中できる環境',
      emoji: '🚶',
      text: '歩きながら考えたり、体を動かしながらのほうがアイデアが浮かびやすい',
      source: 'Kolb, D.A. (1984). Experiential Learning. 身体運動的学習環境',
      weights: [0, 0, 0, 3, 0, 0, 1],
    },
  ],

  // --- 結果タイプ（12種類） ---
  resultTypes: [
    // 1. 映像記憶の天才
    {
      id: 'visual_genius',
      emoji: '🖼️',
      name: '映像記憶の天才',
      tag: '#見たものは忘れない',
      color: '#EF4444',
      description:
        'あなたは目から入る情報を驚くほど鮮明に記憶できる「映像記憶の天才」タイプ！教科書のページのどこに何が書いてあったか、図や写真の細部まで覚えていることが多いはず。色・形・位置情報に敏感で、地図を見ればすぐに道を覚えられるのもこのタイプの特徴です。',
      advice:
        'おすすめ勉強法：カラーペンで色分けしたノートづくり、図やチャートでの情報整理、YouTubeの解説動画活用、教科書の写真や図をじっくり観察。暗記は「場所」と結びつけると効果抜群。壁にポスターのように要点を貼り出す方法も試してみて。',
      traits: ['映像的記憶力', '色彩感覚', '空間認識', '細部観察力'],
      scoreWeights: [3, 0, 0, 0, 0, 0, 0],
    },
    // 2. 耳から覚える音声派
    {
      id: 'auditory_learner',
      emoji: '🎧',
      name: '耳から覚える音声派',
      tag: '#聴くだけで覚えちゃう',
      color: '#F59E0B',
      description:
        'あなたは耳から入る情報を効率よく記憶できる「音声派」タイプ！先生の話を聞いているだけで自然と内容が頭に入り、歌の歌詞もすぐ覚えられるはず。リズムやメロディーと結びついた情報は特に強力に記憶に残ります。会話の内容を正確に覚えている記憶力も持っています。',
      advice:
        'おすすめ勉強法：音読して自分の声で耳に入れる、録音して通学中に聴き返す、語呂合わせやリズムで暗記、ポッドキャストや音声教材の活用。友達と問題を出し合う「口頭テスト」も効果的。静かすぎる環境より適度なBGMがあるほうが集中できるかも。',
      traits: ['聴覚記憶力', 'リズム感', '言語理解力', '会話での学び'],
      scoreWeights: [0, 3, 0, 0, 0, 0, 0],
    },
    // 3. 書いて覚える筆記王
    {
      id: 'readwrite_king',
      emoji: '✏️',
      name: '書いて覚える筆記王',
      tag: '#ペンを持てば無敵',
      color: '#3B82F6',
      description:
        'あなたは「書く」ことで情報を脳に刻み込む「筆記王」タイプ！手を動かして文字にすることで記憶が定着し、ノートを読み返せばしっかり思い出せます。教科書の要点をまとめ直す作業が得意で、自分なりの「まとめノート」は最強の武器。文章を読んで理解する力も高く、読書を通じた学びにも長けています。',
      advice:
        'おすすめ勉強法：重要ポイントを自分の言葉で書き直す、まとめノートを作る、単語カードに書いて覚える、テスト形式で何度も書いて練習。デジタルよりも手書きのほうが記憶に残りやすい傾向があるので、ペンとノートを大切にしよう。教科書は繰り返し精読がおすすめ。',
      traits: ['筆記力', '要約力', '読解力', '情報整理力'],
      scoreWeights: [0, 0, 3, 0, 0, 0, 0],
    },
    // 4. 体で覚える実践派
    {
      id: 'kinesthetic_learner',
      emoji: '🏃',
      name: '体で覚える実践派',
      tag: '#やってみなきゃ分からない',
      color: '#10B981',
      description:
        'あなたは実際に体験することで最も効率よく学べる「実践派」タイプ！教科書を読むより実験をする、説明を聞くより自分で試す、そうやって体全体で学んだことは一生忘れません。手先が器用だったり、スポーツの動きをすぐに真似できるのもこのタイプの特徴。座りっぱなしは苦手かもしれませんが、それは学び方の個性です。',
      advice:
        'おすすめ勉強法：理科の実験を積極的にやる、模型や立体を作って学ぶ、歩きながら暗記する、ジェスチャーを使って覚える。長時間座り続けず、25分勉強→5分休憩（ポモドーロ・テクニック）で体を動かすのが効果的。実際の場所に行って学ぶフィールドワークもおすすめ。',
      traits: ['身体感覚', '実験好き', '行動で学ぶ', '器用さ'],
      scoreWeights: [0, 0, 0, 3, 0, 0, 0],
    },
    // 5. 図解マスター
    {
      id: 'diagram_master',
      emoji: '📐',
      name: '図解マスター',
      tag: '#複雑な情報も一目瞭然',
      color: '#8B5CF6',
      description:
        'あなたは複雑な情報を図やチャートにまとめることで理解が深まる「図解マスター」タイプ！視覚的な整理力と論理的な構造化力の両方を持つ稀有な才能です。フローチャート、比較表、関係図など、情報を「見える化」するのが得意で、その図を見れば全体像がパッとつかめます。',
      advice:
        'おすすめ勉強法：マインドマップで知識を体系化、フローチャートで手順を整理、比較表で違いを明確にする。ノートは文字びっしりより図解中心にすると効果倍増。XmindやMiroなどのデジタルツールも活用してみて。テスト前には「全体像を1枚にまとめる図」を作ると記憶が整理されるよ。',
      traits: ['構造化力', '全体俯瞰', '視覚整理', '論理的思考'],
      scoreWeights: [2, 0, 0, 0, 3, 0, 1],
    },
    // 6. グループ学習の星
    {
      id: 'social_star',
      emoji: '🌟',
      name: 'グループ学習の星',
      tag: '#みんなで学べば最強',
      color: '#EC4899',
      description:
        'あなたは人との関わりの中で最も力を発揮する「グループ学習の星」タイプ！友達と話し合ったり、教え合ったりすることで理解が深まります。「人に教えると自分が一番覚える」という学習の法則を自然に実践できる才能の持ち主。チームワークが必要な場面では中心的存在になれます。',
      advice:
        'おすすめ勉強法：友達と勉強会を開く、教え合いタイムを設ける、グループLINEで問題を出し合う。「学んだことを誰かに説明する」を習慣にすると記憶の定着率が格段にアップ。一人で勉強するときも、架空の生徒に説明するつもりで声に出すと効果的。人に感謝される経験がモチベーションにもなるよ。',
      traits: ['協調性', '教える力', '対話力', 'チーム学習'],
      scoreWeights: [0, 1, 0, 0, 0, 3, 0],
    },
    // 7. 一人集中型
    {
      id: 'solo_focus',
      emoji: '🧘',
      name: '一人集中型',
      tag: '#静寂の中で最大パワー',
      color: '#6366F1',
      description:
        'あなたは静かな環境で自分のペースで学ぶことで最も力を発揮する「一人集中型」タイプ！自分の内面と向き合い、深く考えることで本質を理解します。表面的な暗記より「なぜそうなるか」の根本理解を大切にし、一度理解したことは長く記憶に残ります。自己分析力が高く、自分の弱点を的確に把握できるのも強みです。',
      advice:
        'おすすめ勉強法：静かな部屋で一人で集中する時間を確保、日記や学習ログをつけて振り返る、自分なりの疑問を書き出してから調べる。「今日学んだことで一番大事なことは何か」を毎日自分に問いかけよう。瞑想やマインドフルネスで集中力を高めるのも相性が良いよ。',
      traits: ['内省力', '深い理解力', '自己管理力', '集中力'],
      scoreWeights: [0, 0, 0, 0, 1, -1, 3],
    },
    // 8. ゲーム感覚学習者
    {
      id: 'gamified_learner',
      emoji: '🎮',
      name: 'ゲーム感覚学習者',
      tag: '#楽しくなきゃ勉強じゃない',
      color: '#F97316',
      description:
        'あなたは楽しさとワクワク感がないと力を発揮できない「ゲーム感覚学習者」タイプ！クイズ形式、ポイント制、タイムアタックなど、ゲーム要素が加わると集中力と記憶力が爆発的にアップします。退屈な丸暗記は苦手でも、工夫次第で驚くほどの成果を出せるのがあなたの才能です。',
      advice:
        'おすすめ勉強法：Quizlet、スタディサプリ、Duolingoなどゲーム要素のある学習アプリを活用。自分で「ポイント制」を作って勉強量を可視化しよう。タイマーで「何分以内にこの問題を解く！」と挑戦する形式も効果的。友達とスコアを競い合うのも良い刺激になるよ。',
      traits: ['競争心', 'ゲーム親和性', '短期集中力', '楽しむ力'],
      scoreWeights: [1, 0, 0, 2, 0, 1, 0],
    },
    // 9. ストーリーで理解する物語派
    {
      id: 'narrative_learner',
      emoji: '📚',
      name: 'ストーリーで理解する物語派',
      tag: '#物語にすれば全部覚えられる',
      color: '#7C3AED',
      description:
        'あなたは情報を「物語」として捉えることで深く記憶できる「物語派」タイプ！歴史の出来事は登場人物の気持ちとともに、数学の公式は発見のエピソードとともに記憶すると抜群に残ります。読書好きで想像力が豊か、因果関係（原因と結果のつながり）を掴むのが上手いのもこのタイプの特徴です。',
      advice:
        'おすすめ勉強法：歴史は漫画や小説形式で学ぶ、理科は「発見の物語」として覚える、暗記事項を自分でストーリーにして語る。「この出来事の主人公は誰で、何を思っていたか」を想像すると記憶に残る。読書量を増やすことが全科目の底力アップにつながるよ。',
      traits: ['物語的思考', '想像力', '因果推理', '読書力'],
      scoreWeights: [0, 1, 2, 0, 0, 0, 2],
    },
    // 10. パターン認識の鬼
    {
      id: 'pattern_recognizer',
      emoji: '🧬',
      name: 'パターン認識の鬼',
      tag: '#法則を見抜く天才',
      color: '#2563EB',
      description:
        'あなたは情報の中から規則性やパターンを瞬時に見抜く「パターン認識の鬼」タイプ！数学の公式や理科の法則、英語の文法規則など、「ルール」を理解すれば応用が利くのが最大の強み。丸暗記は嫌いだけど、理屈が分かれば一気に理解が進みます。物事の本質を掴む力は、どんな分野でも通用する最強スキルです。',
      advice:
        'おすすめ勉強法：「なぜそうなるか」の理屈をまず理解してから問題を解く、例外やイレギュラーにも注目してルールの境界を把握する、異なる分野の共通点を探す「横断的学習」。数学は解法パターンを分類してノートにまとめると効果的。理解重視で効率の良い勉強を心がけよう。',
      traits: ['法則発見力', '論理的思考', '応用力', '抽象化能力'],
      scoreWeights: [0, 0, 0, 0, 3, 0, 2],
    },
    // 11. マインドマップ使い
    {
      id: 'mindmap_user',
      emoji: '🕸️',
      name: 'マインドマップ使い',
      tag: '#知識のネットワークを構築',
      color: '#0D9488',
      description:
        'あなたは知識を「つながり」として捉え、壮大な知識ネットワークを頭の中に構築する「マインドマップ使い」タイプ！一つの知識から関連する情報が芋づる式に出てくるのが強み。色と形で情報を分類し、全体像を一望できる「知識の地図」を作るのが得意。視覚的思考と論理的思考のハイブリッドで、複雑なテーマもスッキリ整理できます。',
      advice:
        'おすすめ勉強法：中心テーマから枝を伸ばすマインドマップを各科目で作成、色は科目やカテゴリーごとに統一する。テスト前に全範囲を1枚のマインドマップにまとめると全体が見渡せて効果的。XmindやMindMeisterなどのアプリも活用して、いつでも見返せるようにしよう。',
      traits: ['関連づけ力', 'ネットワーク思考', '視覚的整理', '全体把握'],
      scoreWeights: [2, 0, 0, 0, 2, 0, 1],
    },
    // 12. フラッシュカード職人
    {
      id: 'flashcard_master',
      emoji: '🃏',
      name: 'フラッシュカード職人',
      tag: '#反復こそ最強の武器',
      color: '#059669',
      description:
        'あなたは「繰り返し」の力を最大限に活かせる「フラッシュカード職人」タイプ！カードを作る過程で情報を整理し、めくる反復練習で記憶を強化する二段構えの学習法がぴったり。短い情報を素早くインプット・アウトプットするスピード感のある学びが得意。視覚的な情報と言葉の情報の両方をバランスよく使える器用さも持っています。',
      advice:
        'おすすめ勉強法：Ankiアプリの「間隔反復システム」で科学的に復習タイミングを管理する、カードの表には問題、裏には答えだけでなくヒントやイラストも入れる。Quizletでデジタルカードを作れば通学中にも復習可能。「間違えたカード」だけを集めた苦手克服デッキを作るのもおすすめだよ。',
      traits: ['反復力', '整理整頓', 'スピード記憶', 'バランス学習'],
      scoreWeights: [1, 0, 2, 1, 0, 0, 0],
    },
  ],

  // --- メタ情報 ---
  questionCount: 25,
  estimatedMinutes: 7,
  hashtags: [
    '#学習スタイル診断',
    '#自分に合った勉強法',
    '#VARK',
    '#学習タイプ',
    '#テスト対策',
    '#診断研究所',
  ],
  references: [
    'Fleming, N.D. (2001). Teaching and Learning Styles: VARK Strategies. Christchurch, New Zealand.',
    'Kolb, D.A. (1984). Experiential Learning: Experience as the Source of Learning and Development. Prentice-Hall.',
    'Gardner, H. (1983). Frames of Mind: The Theory of Multiple Intelligences. Basic Books.',
    'Dunn, R. & Dunn, K. (1978). Teaching Students Through Their Individual Learning Styles: A Practical Approach. Reston Publishing.',
  ],
};
