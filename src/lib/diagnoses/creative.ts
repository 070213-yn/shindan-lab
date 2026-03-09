/**
 * 創造力タイプ診断
 *
 * 理論基盤:
 * - Guilford (1967) 拡散的思考 (Structure of Intellect)
 * - Torrance (1974) 創造性テスト (TTCT)
 * - Csikszentmihalyi (1996) 創造性システムモデル
 * - Amabile (1996) 内発的動機づけ理論
 *
 * 7次元: 拡散的思考力, 収束的思考力, 独創性, 精緻性, 流暢性, 柔軟性, 好奇心
 * 結果タイプ: 14種類
 * 質問数: 28問（6セクション）
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const creativeDiagnosis: DiagnosisConfig = {
  id: 'creative',
  title: '創造力タイプ診断',
  subtitle: 'あなたの創造力のタイプを分析！',
  catchphrase: 'キミの中に眠る「創造力」の正体とは？',
  description:
    '絵を描く、文章を書く、工作する……創造力の形は人それぞれ。アイデアの出し方、問題の解き方、表現の仕方から7つの力を分析して、14タイプの中からあなただけの創造力スタイルを見つけ出します。',
  emoji: '🎨',
  themeColor: '#EC4899',
  gradientFrom: '#EC4899',
  gradientTo: '#F472B6',

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
  // 順番: 拡散的思考力, 収束的思考力, 独創性, 精緻性, 流暢性, 柔軟性, 好奇心
  dimensions: [
    { key: 'divergent', label: '拡散的思考力', color: '#EC4899' },
    { key: 'convergent', label: '収束的思考力', color: '#8B5CF6' },
    { key: 'originality', label: '独創性', color: '#F97316' },
    { key: 'elaboration', label: '精緻性', color: '#06B6D4' },
    { key: 'fluency', label: '流暢性', color: '#22C55E' },
    { key: 'flexibility', label: '柔軟性', color: '#EAB308' },
    { key: 'curiosity', label: '好奇心', color: '#EF4444' },
  ],

  // --- セクション定義 ---
  sections: {
    1: 'アイデアの出し方',
    2: '問題解決',
    3: '表現方法',
    4: 'インスピレーション源',
    5: '完成までのプロセス',
    6: '好奇心の範囲',
  },

  // --- 質問データ（28問） ---
  // weights配列: [拡散的思考力, 収束的思考力, 独創性, 精緻性, 流暢性, 柔軟性, 好奇心]
  questions: [
    // ===== セクション1: アイデアの出し方（5問） =====
    {
      sid: 1,
      sectionName: 'アイデアの出し方',
      emoji: '💡',
      text: 'アイデアを出すとき、数をとにかくたくさん出すほうだ',
      source: 'Guilford(1967) 拡散的思考 - 流暢性(fluency)',
      weights: [2, 0, 0, 0, 2, 0, 0],
    },
    {
      sid: 1,
      sectionName: 'アイデアの出し方',
      emoji: '🌀',
      text: '「普通こうするよね」と思われる方法を、あえて避けたくなる',
      source: 'Torrance(1974) TTCT - 独創性スコア',
      weights: [1, 0, 2, 0, 0, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'アイデアの出し方',
      emoji: '🔗',
      text: 'まったく関係なさそうなもの同士を組み合わせてアイデアを作るのが好きだ',
      source: 'Guilford(1967) 拡散的思考 - 遠隔連想',
      weights: [2, 0, 1, 0, 0, 1, 0],
    },
    {
      sid: 1,
      sectionName: 'アイデアの出し方',
      emoji: '📝',
      text: 'ひらめいたアイデアは、すぐにメモやスケッチに残したくなる',
      source: 'Amabile(1996) 内発的動機づけ - 創造的行動の習慣化',
      weights: [0, 1, 0, 1, 1, 0, 1],
    },
    {
      sid: 1,
      sectionName: 'アイデアの出し方',
      emoji: '🧪',
      text: '一つのアイデアより、いろんな方向から考えたほうがワクワクする',
      source: 'Guilford(1967) 拡散的思考 - 柔軟性(flexibility)',
      weights: [1, 0, 0, 0, 1, 2, 0],
    },

    // ===== セクション2: 問題解決（5問） =====
    {
      sid: 2,
      sectionName: '問題解決',
      emoji: '🧩',
      text: '難しい問題に出会ったとき、「面白い！」とワクワクする',
      source: 'Csikszentmihalyi(1996) フロー理論 - 挑戦と能力のバランス',
      weights: [0, 0, 0, 0, 0, 1, 2],
    },
    {
      sid: 2,
      sectionName: '問題解決',
      emoji: '🔍',
      text: '問題を解くとき、まず細かく分析して整理するほうだ',
      source: 'Guilford(1967) 収束的思考 - 論理的分析',
      weights: [0, 2, 0, 2, 0, 0, 0],
    },
    {
      sid: 2,
      sectionName: '問題解決',
      emoji: '🎲',
      text: '正解がひとつじゃない問題のほうが得意だ',
      source: 'Guilford(1967) 拡散的思考 - オープンエンド問題',
      weights: [2, 0, 1, 0, 0, 1, 0],
    },
    {
      sid: 2,
      sectionName: '問題解決',
      emoji: '🔄',
      text: 'うまくいかないとき、やり方をガラッと変えてみるのが好きだ',
      source: 'Torrance(1974) TTCT - 柔軟性スコア',
      weights: [1, 0, 0, 0, 0, 2, 1],
    },
    {
      sid: 2,
      sectionName: '問題解決',
      emoji: '⚙️',
      text: '答えが出たら「もっと良い方法はないか」とさらに考え続ける',
      source: 'Torrance(1974) TTCT - 精緻性(elaboration)',
      weights: [0, 1, 0, 2, 0, 0, 1],
    },

    // ===== セクション3: 表現方法（5問） =====
    {
      sid: 3,
      sectionName: '表現方法',
      emoji: '🎨',
      text: '頭に浮かんだイメージを絵やデザインで表現するのが好きだ',
      source: 'Torrance(1974) TTCT - 図形的創造性',
      weights: [1, 0, 1, 1, 0, 0, 0],
    },
    {
      sid: 3,
      sectionName: '表現方法',
      emoji: '✍️',
      text: '自分の考えを言葉や文章にまとめるのが得意だ',
      source: 'Torrance(1974) TTCT - 言語的創造性',
      weights: [0, 1, 0, 1, 2, 0, 0],
    },
    {
      sid: 3,
      sectionName: '表現方法',
      emoji: '🎭',
      text: '演技やダンスなど、身体を使って表現するのが気持ちいい',
      source: 'Csikszentmihalyi(1996) 創造性システムモデル - 身体的表現領域',
      weights: [1, 0, 1, 0, 1, 1, 0],
    },
    {
      sid: 3,
      sectionName: '表現方法',
      emoji: '🎵',
      text: '音楽やリズムで気持ちを表現するのが好きだ',
      source: 'Csikszentmihalyi(1996) 創造性システムモデル - 音楽的表現領域',
      weights: [1, 0, 1, 0, 1, 0, 1],
    },
    {
      sid: 3,
      sectionName: '表現方法',
      emoji: '🛠️',
      text: '手を動かしてモノを作る（工作、プログラミング、料理など）のが一番楽しい',
      source: 'Amabile(1996) 内発的動機づけ - 手を動かす創造活動',
      weights: [0, 1, 0, 2, 0, 0, 1],
    },

    // ===== セクション4: インスピレーション源（5問） =====
    {
      sid: 4,
      sectionName: 'インスピレーション源',
      emoji: '🌿',
      text: '自然の中にいると、アイデアやインスピレーションが湧いてくる',
      source: 'Csikszentmihalyi(1996) 創造性システムモデル - 環境要因',
      weights: [1, 0, 0, 0, 0, 1, 2],
    },
    {
      sid: 4,
      sectionName: 'インスピレーション源',
      emoji: '📚',
      text: '本・マンガ・映画など、他の作品から刺激を受けることが多い',
      source: 'Csikszentmihalyi(1996) 創造性システムモデル - 領域の知識',
      weights: [0, 1, 0, 0, 1, 1, 1],
    },
    {
      sid: 4,
      sectionName: 'インスピレーション源',
      emoji: '💭',
      text: 'ぼーっとしている時間に、一番いいアイデアが浮かぶ',
      source: 'Guilford(1967) 拡散的思考 - 潜在的思考プロセス',
      weights: [2, 0, 1, 0, 0, 0, 0],
    },
    {
      sid: 4,
      sectionName: 'インスピレーション源',
      emoji: '👥',
      text: '人と話していると、どんどんアイデアが膨らむ',
      source: 'Amabile(1996) 内発的動機づけ - 社会的刺激',
      weights: [1, 0, 0, 0, 2, 1, 0],
    },
    {
      sid: 4,
      sectionName: 'インスピレーション源',
      emoji: '🌏',
      text: '新しい場所に行ったり、知らない文化に触れるのが大好きだ',
      source: 'Csikszentmihalyi(1996) 創造性システムモデル - 多様な経験',
      weights: [0, 0, 1, 0, 0, 1, 2],
    },

    // ===== セクション5: 完成までのプロセス（4問） =====
    {
      sid: 5,
      sectionName: '完成までのプロセス',
      emoji: '🎯',
      text: '作品や作業は、細部にこだわって完璧に仕上げたいタイプだ',
      source: 'Torrance(1974) TTCT - 精緻性(elaboration)',
      weights: [0, 2, 0, 2, 0, 0, 0],
    },
    {
      sid: 5,
      sectionName: '完成までのプロセス',
      emoji: '🌊',
      text: '計画をきっちり立てるより、流れに任せて作っていくほうが好きだ',
      source: 'Amabile(1996) 内発的動機づけ - 自律性',
      weights: [2, 0, 1, 0, 0, 1, 0],
    },
    {
      sid: 5,
      sectionName: '完成までのプロセス',
      emoji: '♻️',
      text: '一度完成したものを「もっと良くできないか」と何度も作り直す',
      source: 'Torrance(1974) TTCT - 精緻性と完成度',
      weights: [0, 1, 0, 2, 0, 0, 1],
    },
    {
      sid: 5,
      sectionName: '完成までのプロセス',
      emoji: '🚀',
      text: 'とりあえず作り始めて、やりながら考えるのが自分のスタイルだ',
      source: 'Amabile(1996) 内発的動機づけ - 行動志向の創造性',
      weights: [1, 0, 0, 0, 2, 1, 0],
    },

    // ===== セクション6: 好奇心の範囲（4問） =====
    {
      sid: 6,
      sectionName: '好奇心の範囲',
      emoji: '🔬',
      text: '一つのテーマをとことん深掘りするのが好きだ',
      source: 'Csikszentmihalyi(1996) 創造性システムモデル - 領域への没入',
      weights: [0, 2, 0, 1, 0, 0, 2],
    },
    {
      sid: 6,
      sectionName: '好奇心の範囲',
      emoji: '🦋',
      text: 'いろんなジャンルに興味があって、次々と新しいことに手を出す',
      source: 'Guilford(1967) 拡散的思考 - 探索行動',
      weights: [1, 0, 0, 0, 1, 2, 1],
    },
    {
      sid: 6,
      sectionName: '好奇心の範囲',
      emoji: '❓',
      text: '「なんで？」「どうして？」と疑問を持つことが多い',
      source: 'Csikszentmihalyi(1996) 創造性システムモデル - 知的好奇心',
      weights: [1, 0, 1, 0, 0, 0, 2],
    },
    {
      sid: 6,
      sectionName: '好奇心の範囲',
      emoji: '🌟',
      text: 'まだ誰もやっていないことに挑戦するとテンションが上がる',
      source: 'Torrance(1974) TTCT - 独創性と冒険心',
      weights: [0, 0, 2, 0, 0, 1, 1],
    },
  ],

  // --- 結果タイプ（14種類） ---
  // scoreWeights: [拡散的思考力, 収束的思考力, 独創性, 精緻性, 流暢性, 柔軟性, 好奇心]
  resultTypes: [
    {
      id: 'flash_genius',
      emoji: '⚡',
      name: '閃きの天才',
      tag: '#ひらめきの嵐 #アイデアが止まらない',
      color: '#FBBF24',
      description:
        '頭の中にアイデアが次々と浮かぶ、ひらめきの天才。ぼーっとしているときも脳はフル回転で、突然「あ！」と閃く瞬間がある。拡散的思考力が驚異的に高いタイプ。',
      advice:
        'アイデアを出すのは得意だけど、形にするのが苦手かも。ひらめいたら「まず一つだけ実際にやってみる」を意識すると、天才が本物になるよ。',
      traits: ['瞬発的ひらめき', '連想力', '直感型'],
      scoreWeights: [3, 0, 1, 0, 2, 0, 0],
    },
    {
      id: 'precise_designer',
      emoji: '📐',
      name: '緻密な設計者',
      tag: '#完璧主義 #ディテールの鬼',
      color: '#06B6D4',
      description:
        '細部にこだわる職人気質の持ち主。「ここもうちょっと良くできるな」と何度も改良を重ねる。精緻性と収束的思考力が高く、クオリティの高いものを生み出す力がある。',
      advice:
        '完璧を求めすぎて、なかなか完成しないこともあるかも。「80点で一回出してみる」勇気を持つと、もっとたくさんの作品が生まれるよ。',
      traits: ['完璧主義', '集中力', '品質へのこだわり'],
      scoreWeights: [0, 3, 0, 3, 0, 0, 0],
    },
    {
      id: 'chaos_creator',
      emoji: '🌀',
      name: 'カオスクリエイター',
      tag: '#混沌から生まれる美 #型破り',
      color: '#EF4444',
      description:
        'ルールや常識に縛られない自由な発想の持ち主。「なんでそうなった！？」と周りが驚くような作品を生み出す。カオスの中から予想外の美しさを見つけ出す天才。',
      advice:
        '自由すぎて「何がしたいの？」と言われることもあるかも。たまに自分の中の「テーマ」を一つ決めて制作すると、カオスの中にも軸ができて最強になるよ。',
      traits: ['破壊と創造', '予測不能', '既成概念の破壊者'],
      scoreWeights: [2, 0, 3, 0, 0, 1, 0],
    },
    {
      id: 'storyteller',
      emoji: '📖',
      name: 'ストーリーテラー',
      tag: '#物語の紡ぎ手 #言葉の魔法使い',
      color: '#8B5CF6',
      description:
        '頭の中に無限の物語が眠っている。何気ない日常も、あなたが語ると冒険に変わる。言葉を使って人の心を動かす力が抜群で、流暢性と独創性のバランスが絶妙。',
      advice:
        '頭の中のストーリーを「実際に書き出す」ことを習慣にしよう。頭の中だけだともったいない！SNSや日記でもいいから、少しずつアウトプットしてみて。',
      traits: ['語彙力', '想像力', '構成力'],
      scoreWeights: [1, 1, 1, 0, 3, 0, 0],
    },
    {
      id: 'visual_artist',
      emoji: '🖼️',
      name: 'ビジュアルアーティスト',
      tag: '#目で見る美の追求者 #色と形の達人',
      color: '#EC4899',
      description:
        '世界を「色」と「形」で捉える視覚型クリエイター。美しいものに対するセンスが鋭く、見た人の心をパッと掴むビジュアルを作り出す力がある。',
      advice:
        '視覚だけでなく、言葉や音など他の表現にも挑戦してみて。複数の感覚を組み合わせると、あなたの作品はもっと深みが出るよ。',
      traits: ['色彩感覚', '構図のセンス', '美意識'],
      scoreWeights: [1, 0, 2, 2, 0, 0, 1],
    },
    {
      id: 'music_wizard',
      emoji: '🎵',
      name: '音楽の魔術師',
      tag: '#リズムに生きる #音の世界の住人',
      color: '#7C3AED',
      description:
        '音とリズムで世界を感じ、表現するタイプ。頭の中にはいつもメロディが流れていて、感情を音楽に変換する力が天才的。聴いた人の心に直接響く創造力の持ち主。',
      advice:
        '音楽以外の表現（絵、文章、ダンスなど）にも挑戦してみよう。音楽で培ったリズム感や感性は、どんな分野でも武器になるよ。',
      traits: ['リズム感', '感情表現', '聴覚の鋭さ'],
      scoreWeights: [1, 0, 1, 0, 1, 1, 1],
    },
    {
      id: 'inventor',
      emoji: '🔧',
      name: '発明家',
      tag: '#問題解決の天才 #ないなら作る',
      color: '#F97316',
      description:
        '「こんなものがあったら便利なのに」を実際に作ってしまう発明家タイプ。好奇心と収束的思考力が高く、アイデアを実用的な形にする力が抜群。未来を作る人。',
      advice:
        '一人で発明するのも楽しいけど、人の「困ってること」をもっと聞いてみよう。みんなの課題からヒントを得ると、もっとすごい発明が生まれるよ。',
      traits: ['問題発見力', '実装力', '実用的発想'],
      scoreWeights: [0, 2, 1, 1, 0, 0, 2],
    },
    {
      id: 'remix_master',
      emoji: '🔀',
      name: 'リミックスの達人',
      tag: '#組み合わせの天才 #既存を超える',
      color: '#14B8A6',
      description:
        '既にあるものを組み合わせて、まったく新しいものを生み出す天才。柔軟性が高く「あれとこれ、混ぜたらどうなる？」が口癖。世界の見方を変えてしまうミキサー。',
      advice:
        'リミックスも立派な創造。でも「完全にゼロから作る」体験も一度はしてみて。自分だけのオリジナリティに出会えるかもしれないよ。',
      traits: ['組み合わせ力', '応用力', 'トレンド感度'],
      scoreWeights: [1, 0, 0, 0, 1, 3, 0],
    },
    {
      id: 'dream_architect',
      emoji: '🏰',
      name: '空想建築家',
      tag: '#妄想の王様 #想像力が無限',
      color: '#6366F1',
      description:
        '頭の中に壮大な世界を構築する空想家。現実には存在しない街、キャラクター、物語……あなたの想像力には限界がない。独創性と拡散的思考力が最高レベルのタイプ。',
      advice:
        '空想を形にする手段を一つ身につけよう。絵でも文章でもゲームでもOK。頭の中の世界を誰かと共有できたら、もっとワクワクするよ。',
      traits: ['空想力', '世界観構築力', 'スケールの大きさ'],
      scoreWeights: [2, 0, 3, 0, 0, 0, 1],
    },
    {
      id: 'word_alchemist',
      emoji: '🪶',
      name: '言葉の錬金術師',
      tag: '#言葉で世界を変える #表現力MAX',
      color: '#D946EF',
      description:
        '言葉を自在に操り、人の心を動かす錬金術師。何気ない言葉でも、あなたが紡ぐと特別な意味を持つ。流暢性と精緻性が高く、伝えたいことを的確に表現できる天才。',
      advice:
        '言葉だけでなく、「言葉にできないもの」を表現する方法も探してみて。音楽や絵など、言葉以外の表現が新しい創造力の扉を開くかも。',
      traits: ['語彙力', '表現力', 'コピーライティング'],
      scoreWeights: [0, 1, 0, 2, 3, 0, 0],
    },
    {
      id: 'digital_native',
      emoji: '💻',
      name: 'デジタルネイティブクリエイター',
      tag: '#テクノロジー×創造力 #未来のクリエイター',
      color: '#3B82F6',
      description:
        'デジタルツールを使いこなして創造する、次世代型クリエイター。動画編集、プログラミング、デジタルアート……テクノロジーはあなたの創造力を何倍にも増幅する。',
      advice:
        'デジタルだけでなく、アナログな体験（手描き、手作り）もしてみて。手の感覚から生まれる創造力は、デジタルでは得られない宝物になるよ。',
      traits: ['デジタルリテラシー', 'ツール活用力', '新技術への適応力'],
      scoreWeights: [0, 1, 0, 1, 1, 1, 2],
    },
    {
      id: 'performer',
      emoji: '🎪',
      name: 'パフォーマー',
      tag: '#身体が表現する #ステージの主役',
      color: '#F43F5E',
      description:
        '身体を使った表現が最も輝くタイプ。ダンス、演劇、プレゼン……あなたが人前に立つと空気が変わる。流暢性と柔軟性が高く、即興でも素晴らしいパフォーマンスができる。',
      advice:
        'パフォーマンスを「記録する」習慣をつけよう。動画に撮って見返すと、自分では気づかなかった魅力や改善点が見つかるよ。',
      traits: ['表現力', '即興力', '身体性'],
      scoreWeights: [1, 0, 0, 0, 2, 2, 1],
    },
    {
      id: 'diy_crafter',
      emoji: '🔨',
      name: 'DIYクラフター',
      tag: '#手作りの温もり #世界にひとつだけ',
      color: '#D97706',
      description:
        '手を動かしてモノを作ることに最大の喜びを感じるタイプ。精緻性と好奇心が高く、試行錯誤しながら「世界にひとつだけの作品」を生み出す。あなたの手から生まれるものには温もりがある。',
      advice:
        '作ったものをSNSや展示会で発表してみよう。あなたの手作りの温もりは、きっと多くの人の心に響くはず。フィードバックが次の創作の燃料になるよ。',
      traits: ['手先の器用さ', '忍耐力', 'こだわり'],
      scoreWeights: [0, 1, 0, 3, 0, 0, 2],
    },
    {
      id: 'philosophical_artist',
      emoji: '🌙',
      name: '哲学的アーティスト',
      tag: '#深い問いを形にする #思考と表現の融合',
      color: '#4F46E5',
      description:
        '「なぜ生きるのか」「美しさとは何か」……深い問いを創作に昇華するタイプ。好奇心と独創性が高く、あなたの作品には考えさせられる深みがある。年齢を超えた表現力の持ち主。',
      advice:
        '深く考えることは素晴らしい才能。でも「考えるだけ」で終わらないように、どんな形でもいいからアウトプットを続けよう。思考と表現の循環が、あなたの創造力を高めるよ。',
      traits: ['思索力', '深い問い', '哲学的視点'],
      scoreWeights: [0, 0, 2, 0, 0, 0, 3],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#創造力診断', '#キミの創造力タイプは', '#トキメキ研究所'],
  references: [
    'Guilford, J. P. (1967). "The Nature of Human Intelligence." McGraw-Hill.',
    'Torrance, E. P. (1974). "Torrance Tests of Creative Thinking." Scholastic Testing Service.',
    'Csikszentmihalyi, M. (1996). "Creativity: Flow and the Psychology of Discovery and Invention." Harper Collins.',
    'Amabile, T. M. (1996). "Creativity in Context." Westview Press.',
  ],
};
