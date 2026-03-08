/**
 * 第一印象ギャップ診断
 *
 * 理論基盤:
 *   - Luft & Ingham (1955) ジョハリの窓 — 自己と他者から見える領域のずれ
 *   - Goffman (1959) 印象管理 — 社会的場面でのセルフプレゼンテーション
 *   - Leary (1995) 自己呈示理論 — 他者に与える印象の意図的コントロール
 *   - Swann (1987) 自己検証理論 — 自己概念と他者評価の一致を求める動機
 *
 * 7次元: 外向的印象, 知的印象, 親しみやすさ, ミステリアス度, 信頼感, ギャップ度, 真の自己一致度
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

export const impressionDiagnosis: DiagnosisConfig = {
  id: 'impression',
  title: '第一印象ギャップ診断',
  subtitle: '周りから見たあなた vs 本当のあなた！',
  catchphrase: 'そのギャップ、バレてないと思ってる？——',
  description:
    'ジョハリの窓やゴフマンの印象管理理論をベースに、「周りが見ているあなた」と「本当のあなた」のギャップを徹底解剖。自分でも知らなかった意外な一面が見つかるかも！',
  emoji: '🪞',
  themeColor: '#E11D48',
  gradientFrom: '#E11D48',
  gradientTo: '#FB7185',

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
      min: 8,
      max: 18,
      defaultValue: 14,
      unit: '歳',
    },
  ],

  // --- スコアリング次元（7次元） ---
  dimensions: [
    { key: 'extroverted', label: '外向的印象', color: '#F59E0B' },
    { key: 'intellectual', label: '知的印象', color: '#3B82F6' },
    { key: 'approachable', label: '親しみやすさ', color: '#10B981' },
    { key: 'mysterious', label: 'ミステリアス度', color: '#8B5CF6' },
    { key: 'trustworthy', label: '信頼感', color: '#06B6D4' },
    { key: 'gap', label: 'ギャップ度', color: '#E11D48' },
    { key: 'trueself', label: '真の自己一致度', color: '#F97316' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '初対面の印象',
    2: 'SNSでの見え方',
    3: '友達からの評価',
    4: '本当の性格',
    5: 'ギャップの自覚',
    6: 'コミュニケーションスタイル',
  },

  // --- 質問データ（28問） ---
  // weights: [外向的印象, 知的印象, 親しみやすさ, ミステリアス度, 信頼感, ギャップ度, 真の自己一致度]
  questions: [
    // === セクション1: 初対面の印象 (5問) ===
    {
      sid: 1,
      sectionName: '初対面の印象',
      emoji: '👋',
      text: '初対面の人から「話しかけやすい雰囲気だね」と言われることが多い',
      source: 'Goffman, E. (1959). The Presentation of Self in Everyday Life. 第一印象と表出行動',
      weights: [2, 0, 3, -1, 1, 0, 1],
    },
    {
      sid: 1,
      sectionName: '初対面の印象',
      emoji: '🧊',
      text: '初めて会う人に「クールだね」「怖そう」と言われたことがある',
      source: 'Goffman, E. (1959). The Presentation of Self in Everyday Life. 表出的統制',
      weights: [-1, 2, -2, 3, 0, 1, 0],
    },
    {
      sid: 1,
      sectionName: '初対面の印象',
      emoji: '🌟',
      text: '新しい場所ではとりあえず明るく振る舞うようにしている',
      source: 'Leary, M.R. (1995). Self-Presentation: Impression Management and Interpersonal Behavior. 意図的印象操作',
      weights: [3, 0, 2, -1, 0, 2, -1],
    },
    {
      sid: 1,
      sectionName: '初対面の印象',
      emoji: '📚',
      text: '第一印象で「頭が良さそう」と言われることがある',
      source: 'Swann, W.B. (1987). Identity negotiation. 自己呈示と知性の印象',
      weights: [0, 3, 0, 1, 1, 0, 1],
    },
    {
      sid: 1,
      sectionName: '初対面の印象',
      emoji: '🤔',
      text: '自己紹介の時、本当の自分をどこまで見せるか悩む',
      source: 'Luft, J. & Ingham, H. (1955). The Johari Window. 開放領域と隠蔽領域の調整',
      weights: [0, 0, -1, 2, 0, 2, -1],
    },

    // === セクション2: SNSでの見え方 (5問) ===
    {
      sid: 2,
      sectionName: 'SNSでの見え方',
      emoji: '📸',
      text: 'SNSに載せる写真は、かなり厳選している',
      source: 'Leary, M.R. (1995). Self-Presentation. オンラインでの戦略的自己呈示',
      weights: [0, 1, 0, 1, 0, 2, -1],
    },
    {
      sid: 2,
      sectionName: 'SNSでの見え方',
      emoji: '😆',
      text: 'SNSのノリと実際のテンションにけっこう差がある',
      source: 'Goffman, E. (1959). The Presentation of Self. フロントステージとバックステージの乖離',
      weights: [1, 0, 0, 0, 0, 3, -2],
    },
    {
      sid: 2,
      sectionName: 'SNSでの見え方',
      emoji: '🎭',
      text: 'SNSでは「面白い人」「陽キャ」のキャラを演じていると感じる',
      source: 'Leary, M.R. (1995). Self-Presentation. ペルソナの構築と維持',
      weights: [3, 0, 1, 0, 0, 3, -2],
    },
    {
      sid: 2,
      sectionName: 'SNSでの見え方',
      emoji: '🤳',
      text: 'プロフィール写真は何度も撮り直す方だ',
      source: 'Leary, M.R. (1995). Self-Presentation. 見た目の印象管理',
      weights: [0, 0, 0, 0, 0, 1, -1],
    },
    {
      sid: 2,
      sectionName: 'SNSでの見え方',
      emoji: '💬',
      text: 'DM（ダイレクトメッセージ）と表の投稿で、口調がかなり違う',
      source: 'Goffman, E. (1959). The Presentation of Self. 舞台裏の自己と表の自己',
      weights: [0, 0, 0, 1, 0, 3, -1],
    },

    // === セクション3: 友達からの評価 (5問) ===
    {
      sid: 3,
      sectionName: '友達からの評価',
      emoji: '👫',
      text: '友達に「お前って意外と○○だよな」とよく言われる',
      source: 'Luft, J. & Ingham, H. (1955). The Johari Window. 盲点領域の発見',
      weights: [0, 0, 0, 1, 0, 3, 0],
    },
    {
      sid: 3,
      sectionName: '友達からの評価',
      emoji: '🤝',
      text: '友達からは「しっかり者」「頼りになる」と思われている',
      source: 'Swann, W.B. (1987). Identity negotiation. 他者からの役割期待',
      weights: [0, 2, 1, 0, 3, 0, 1],
    },
    {
      sid: 3,
      sectionName: '友達からの評価',
      emoji: '🎉',
      text: '友達と一緒にいる時は、ムードメーカーになることが多い',
      source: 'Goffman, E. (1959). The Presentation of Self. 集団における役割演出',
      weights: [3, 0, 2, 0, 0, 0, 1],
    },
    {
      sid: 3,
      sectionName: '友達からの評価',
      emoji: '😶',
      text: '「何を考えてるかわからない」と言われたことがある',
      source: 'Luft, J. & Ingham, H. (1955). The Johari Window. 未知の領域',
      weights: [-1, 1, -2, 3, 0, 2, -1],
    },
    {
      sid: 3,
      sectionName: '友達からの評価',
      emoji: '😊',
      text: '親友だけが知っている「別の自分」がいると思う',
      source: 'Luft, J. & Ingham, H. (1955). The Johari Window. 隠蔽領域と信頼関係',
      weights: [0, 0, 1, 1, 1, 2, 1],
    },

    // === セクション4: 本当の性格 (5問) ===
    {
      sid: 4,
      sectionName: '本当の性格',
      emoji: '🌙',
      text: '一人でいる時の方が、本当の自分でいられる気がする',
      source: 'Swann, W.B. (1987). Identity negotiation. 自己検証と孤独場面',
      weights: [-2, 1, -1, 2, 0, 2, 2],
    },
    {
      sid: 4,
      sectionName: '本当の性格',
      emoji: '😢',
      text: '実は結構繊細で、些細なことで傷つくことがある',
      source: 'Leary, M.R. (1995). Self-Presentation. 公的自己と私的自己の乖離',
      weights: [0, 0, 1, 0, 0, 2, 1],
    },
    {
      sid: 4,
      sectionName: '本当の性格',
      emoji: '🐈',
      text: '本当は甘えたいのに、甘えるのが下手だ',
      source: 'Swann, W.B. (1987). Identity negotiation. 自己呈示と欲求の不一致',
      weights: [0, 0, 1, 1, 0, 3, 0],
    },
    {
      sid: 4,
      sectionName: '本当の性格',
      emoji: '🔥',
      text: 'おとなしそうに見られるけど、心の中では結構激しい感情がある',
      source: 'Luft, J. & Ingham, H. (1955). The Johari Window. 隠蔽領域の感情',
      weights: [-1, 0, 0, 2, 0, 3, 0],
    },
    {
      sid: 4,
      sectionName: '本当の性格',
      emoji: '🧠',
      text: '周りには見せないけど、物事を深く考えるタイプだ',
      source: 'Swann, W.B. (1987). Identity negotiation. 内的認知スタイルと外的印象の差',
      weights: [0, 3, 0, 2, 1, 1, 1],
    },

    // === セクション5: ギャップの自覚 (4問) ===
    {
      sid: 5,
      sectionName: 'ギャップの自覚',
      emoji: '🎪',
      text: '場面や相手によって、自分のキャラが全然違うと感じる',
      source: 'Goffman, E. (1959). The Presentation of Self. 場面別の役割演出と多面的自己',
      weights: [0, 0, 0, 1, 0, 3, -2],
    },
    {
      sid: 5,
      sectionName: 'ギャップの自覚',
      emoji: '😮',
      text: '「え、そんな一面あるんだ！」と驚かれることが楽しい',
      source: 'Leary, M.R. (1995). Self-Presentation. ギャップの開示と自己効力感',
      weights: [1, 0, 1, 1, 0, 2, 1],
    },
    {
      sid: 5,
      sectionName: 'ギャップの自覚',
      emoji: '🪄',
      text: '自分のギャップは武器だと思っている',
      source: 'Leary, M.R. (1995). Self-Presentation. 戦略的ギャップ活用',
      weights: [0, 1, 0, 2, 1, 3, 0],
    },
    {
      sid: 5,
      sectionName: 'ギャップの自覚',
      emoji: '😞',
      text: '周りのイメージと本当の自分が違いすぎて、疲れることがある',
      source: 'Swann, W.B. (1987). Identity negotiation. 自己不一致とストレス',
      weights: [0, 0, 0, 0, -1, 2, -3],
    },

    // === セクション6: コミュニケーションスタイル (4問) ===
    {
      sid: 6,
      sectionName: 'コミュニケーションスタイル',
      emoji: '🗣️',
      text: '大勢の中では盛り上げ役だけど、帰り道はぐったりする',
      source: 'Goffman, E. (1959). The Presentation of Self. 表舞台のコストと裏舞台の回復',
      weights: [2, 0, 1, 0, 0, 3, -1],
    },
    {
      sid: 6,
      sectionName: 'コミュニケーションスタイル',
      emoji: '💭',
      text: '自分からは話しかけないけど、話しかけられると意外とよく喋る',
      source: 'Luft, J. & Ingham, H. (1955). The Johari Window. 受動的開示と外向性の隠蔽',
      weights: [-1, 0, 2, 1, 1, 2, 1],
    },
    {
      sid: 6,
      sectionName: 'コミュニケーションスタイル',
      emoji: '📝',
      text: '文章（LINEやメール）の方が、面と向かって話すより本音を言える',
      source: 'Leary, M.R. (1995). Self-Presentation. メディアによる自己呈示の変化',
      weights: [-1, 1, 0, 1, 0, 2, 1],
    },
    {
      sid: 6,
      sectionName: 'コミュニケーションスタイル',
      emoji: '🫂',
      text: '相手の話をよく聞く方だけど、自分のことはあまり話さない',
      source: 'Luft, J. & Ingham, H. (1955). The Johari Window. 隠蔽領域の維持と信頼形成',
      weights: [0, 1, 2, 2, 2, 1, 0],
    },
  ],

  // --- 結果タイプ（14種類） ---
  resultTypes: [
    {
      id: 'cool_sweet',
      emoji: '🧊🍬',
      name: '見た目クール×中身は甘えん坊',
      tag: '#氷の鎧の下にマシュマロ',
      color: '#6366F1',
      description:
        'クールで近寄りがたい雰囲気を出しているけど、実は甘えたくて仕方ない。仲良くなった人だけが知っている「デレ」の破壊力は凄まじい。ツンデレの完成形です。',
      advice:
        'クールな外見は立派な個性。でも、もう少しだけ甘えてみて。ギャップに気づいた人はあなたの虜になるよ。信頼できる人には思い切って甘えてみよう。',
      traits: ['クールな外見', '隠れ甘えん坊', 'ツンデレ気質', '信頼した人だけに見せる素顔'],
      scoreWeights: [-1, 1, -1, 2, 0, 3, -1],
    },
    {
      id: 'honor_free',
      emoji: '🎓🦅',
      name: '優等生の皮を被った自由人',
      tag: '#真面目は仮の姿',
      color: '#059669',
      description:
        '周りからは「真面目」「優等生」と思われているけど、心の中では校則もルールもぶっ壊したいと思っている。本当はもっと自由に生きたい冒険者の魂を持っています。',
      advice:
        '真面目に見えるのは信頼の証。でも自由な心も大切にして。勉強も遊びも全力の「ハイブリッド型」を目指せば、最強の自分になれるよ。',
      traits: ['表の真面目さ', '裏の冒険心', '二面性のバランス', '自由への渇望'],
      scoreWeights: [0, 2, 1, 0, 2, 2, -1],
    },
    {
      id: 'quiet_toxic',
      emoji: '😌🗡️',
      name: 'おとなしそうに見えて実は毒舌',
      tag: '#静かなる辛口評論家',
      color: '#DC2626',
      description:
        '大人しくて控えめに見えるけど、心の中では鋭いツッコミが止まらない。口に出さないだけで、観察力は誰よりも高い。的確すぎる毒舌は、もはや才能です。',
      advice:
        '鋭い観察眼は宝物。時にはその「心の声」をユーモアとして出してみて。笑いに変えれば、一目置かれる存在になれるよ。',
      traits: ['静かな外見', '内なる辛口', '鋭い観察眼', 'ユーモアの才能'],
      scoreWeights: [-2, 2, 0, 2, 0, 3, 0],
    },
    {
      id: 'bright_sensitive',
      emoji: '☀️🥀',
      name: '明るく見えて実は繊細',
      tag: '#太陽の笑顔にガラスの心',
      color: '#F59E0B',
      description:
        'いつも元気で明るいムードメーカー。でも本当は人一倍傷つきやすく、一人になると静かに泣いていることもある。みんなの笑顔のために、自分の痛みを隠している優しい人です。',
      advice:
        'みんなを笑顔にできるのは素敵な力。でも自分の気持ちも大切にして。辛い時は辛いと言っていいんだよ。弱さを見せることは、もっと深い信頼につながるよ。',
      traits: ['元気な表の顔', 'ガラスのハート', '感受性の豊かさ', '自己犠牲的な優しさ'],
      scoreWeights: [3, 0, 2, 0, 0, 3, -2],
    },
    {
      id: 'playful_loyal',
      emoji: '😎💕',
      name: 'チャラそうに見えて実は一途',
      tag: '#軽いノリの重い愛情',
      color: '#EC4899',
      description:
        'ノリが軽くて誰とでも楽しく話せるから「チャラい」と思われがち。でも本当は一度信頼した人をめちゃくちゃ大切にする一途な性格。裏切りは絶対許さないタイプです。',
      advice:
        'フレンドリーなのは最高の武器。でも本気の時はちゃんと「本気」を見せてみて。ギャップに気づいた人は、あなたのことをもっと好きになるよ。',
      traits: ['フレンドリーな外見', '一途な心', '友達思い', '隠れた真剣さ'],
      scoreWeights: [3, 0, 3, 0, 1, 2, 0],
    },
    {
      id: 'scary_kind',
      emoji: '😠💐',
      name: '怖そうに見えて実は優しい',
      tag: '#見た目は番長、中身はお母さん',
      color: '#7C3AED',
      description:
        '目つきが鋭かったり雰囲気が怖かったりして近寄りがたいけど、話してみるとめちゃくちゃ優しい。困っている人を見ると放っておけない、隠れた世話焼きさんです。',
      advice:
        '優しさは最大の魅力。第一印象のギャップを「強み」に変えよう。怖そうな見た目×優しい中身は、最強のギャップ萌えだよ。',
      traits: ['威圧的な外見', '隠れた優しさ', '世話焼き', 'ギャップの王者'],
      scoreWeights: [-2, 0, -1, 2, 2, 3, 1],
    },
    {
      id: 'natural_clever',
      emoji: '🌸🧮',
      name: '天然に見えて実は計算高い',
      tag: '#ぽわぽわ顔で全部計算済み',
      color: '#F472B6',
      description:
        '天然っぽくてフワフワした印象だけど、頭の中では常に状況を分析している。「何も考えてなさそう」は大間違い。実は場の空気を一番読んでいる戦略家です。',
      advice:
        '頭の回転の速さは大きな武器。でも、たまには本当に「ぼーっとする」時間を作ってみて。全部計算しなくても大丈夫。素の自分も十分魅力的だよ。',
      traits: ['天然な外見', '鋭い分析力', '空気を読む力', '戦略的思考'],
      scoreWeights: [0, 3, 2, 0, 0, 2, -1],
    },
    {
      id: 'serious_weirdo',
      emoji: '📐🤪',
      name: '真面目に見えて実は変人',
      tag: '#堅い殻の中のカオス',
      color: '#8B5CF6',
      description:
        '見た目も振る舞いも真面目そのもの。でも頭の中は常にカオスで、独特すぎる発想の持ち主。ギャップが激しすぎて、素を出すとみんなが驚くタイプです。',
      advice:
        'その独特な世界観は才能。もっと素の自分を出していこう。「真面目×変人」のギャップは人を惹きつける最強の個性だよ。',
      traits: ['真面目な外見', 'カオスな内面', '独特な発想力', '予想不可能'],
      scoreWeights: [0, 2, 0, 2, 2, 3, 0],
    },
    {
      id: 'mature_spoiled',
      emoji: '🍷🧸',
      name: '大人っぽく見えて実は甘えたい',
      tag: '#しっかり者の中の子供',
      color: '#A855F7',
      description:
        '落ち着いていて大人っぽい。みんなから頼られるしっかり者。でも本当は誰かに甘えたいし、頼りたい。「大人の仮面」の裏に隠れた子供の自分がいます。',
      advice:
        '頼られるのは素晴らしいこと。でもたまには甘える側にもなっていいんだよ。「頼る」ことは弱さじゃなくて、相手を信頼している証拠だよ。',
      traits: ['大人っぽい外見', '甘えたい本音', '頼られキャラ', '隠れた子供心'],
      scoreWeights: [0, 1, 0, 0, 3, 2, -1],
    },
    {
      id: 'reliable_lost',
      emoji: '🧭😵',
      name: 'しっかり者に見えて実は方向音痴',
      tag: '#人生もリアルも迷子',
      color: '#0EA5E9',
      description:
        'みんなをまとめるリーダー的存在に見えるけど、実はかなりのうっかりさん。地図が読めなかったり、予定を忘れたり、隠しきれないポンコツさが逆に愛されるタイプです。',
      advice:
        'しっかり者×ポンコツのギャップは最高に愛される組み合わせ。完璧じゃなくていい。抜けているところも含めて、あなたの魅力なんだよ。',
      traits: ['リーダー的外見', '隠れポンコツ', '愛されキャラ', '完璧じゃない魅力'],
      scoreWeights: [1, 0, 3, 0, 2, 2, 0],
    },
    {
      id: 'center_loner',
      emoji: '👥🏝️',
      name: 'クラスの中心に見えて実は一人好き',
      tag: '#社交的ぼっちの極み',
      color: '#6366F1',
      description:
        '誰とでも仲良くできるし、グループの中心にいるように見える。でも本当は一人の時間が一番好きで、休みの日は引きこもりたい。社交性は全て「スキル」で回している上級者です。',
      advice:
        '一人の時間を愛せるのは素敵な才能。社交スキルも本物。両方持っているのは強みだよ。無理せず自分のペースで人付き合いしていこう。',
      traits: ['社交的な外見', '孤独を愛する心', 'コミュ力スキル', '内向的な本性'],
      scoreWeights: [2, 0, 1, 2, 0, 3, -1],
    },
    {
      id: 'silent_talkative',
      emoji: '🤐🗣️',
      name: '無口に見えて実は話したがり',
      tag: '#心の中は常に実況中継',
      color: '#14B8A6',
      description:
        '普段は静かでおとなしいけど、心の中ではずっとおしゃべりしている。仲良い人の前では止まらないトークを展開。ギャップで相手を驚かせるマシンガントーカーです。',
      advice:
        '話したい気持ちがあるなら、もっと出していこう。最初の一言を勇気を出して言えれば、あとは勝手に楽しくなるよ。あなたの話、聞きたい人は絶対いるよ。',
      traits: ['無口な外見', '止まらないトーク', '仲良し限定のおしゃべり', '心の中の実況'],
      scoreWeights: [-2, 0, 1, 1, 0, 3, 1],
    },
    {
      id: 'childish_wise',
      emoji: '🧒🦉',
      name: '子供っぽく見えて実は達観してる',
      tag: '#見た目は子供、頭脳は仙人',
      color: '#84CC16',
      description:
        '見た目や振る舞いは年齢より幼く見えるけど、考え方はめちゃくちゃ大人。人生について深く考えていて、時々哲学者のような発言をして周りを驚かせます。',
      advice:
        '深い思考力は将来きっと役に立つ。でも考えすぎて疲れた時は、子供っぽい自分を楽しんで。両方のバランスが取れた時、あなたは無敵だよ。',
      traits: ['幼い外見', '深い思考', '哲学的視点', '大人と子供の共存'],
      scoreWeights: [0, 3, 1, 1, 1, 2, 1],
    },
    {
      id: 'normal_unique',
      emoji: '🫥✨',
      name: '普通に見えて実は超個性派',
      tag: '#平凡の仮面の裏のカリスマ',
      color: '#F97316',
      description:
        '一見すると「普通の人」。でも中身はめちゃくちゃ個性的で、独自の世界を持っている。目立たないのは「あえて」で、本気を出したら誰よりも輝けるポテンシャルの持ち主です。',
      advice:
        '個性を隠しているのはもったいない。少しずつでいいから本当の自分を出してみて。「普通の見た目×超個性的な中身」は最高のサプライズになるよ。',
      traits: ['平凡な外見', '唯一無二の個性', '隠れたカリスマ', '本気の爆発力'],
      scoreWeights: [0, 0, 0, 3, 0, 3, 0],
    },
  ],

  // --- メタ情報 ---
  questionCount: 28,
  estimatedMinutes: 5,
  hashtags: ['#第一印象ギャップ診断', '#ギャップ萌え', '#本当の自分', '#印象管理'],
  references: [
    'Luft, J. & Ingham, H. (1955). The Johari Window, a graphic model of interpersonal awareness. Proceedings of the Western Training Laboratory in Group Development. UCLA.',
    'Goffman, E. (1959). The Presentation of Self in Everyday Life. Doubleday.',
    'Leary, M.R. (1995). Self-Presentation: Impression Management and Interpersonal Behavior. Westview Press.',
    'Swann, W.B. (1987). Identity negotiation: Where two roads meet. Journal of Personality and Social Psychology, 53(6), 1038-1051.',
  ],
};
