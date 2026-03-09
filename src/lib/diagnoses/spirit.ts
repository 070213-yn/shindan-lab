import type { DiagnosisConfig } from '../diagnosticTypes';

/**
 * 守護精霊診断
 *
 * 理論基盤: Carl Jung (1959) 元型理論 + 動物象徴学 + Big Five性格特性
 * 補助理論: Campbell (1949) 英雄の旅, Costa & McCrae (1992) NEO-PI-R
 *
 * 6次元: 勇気、知恵、優しさ、自由、神秘、生命力
 */
export const spiritDiagnosis: DiagnosisConfig = {
  id: 'spirit',
  title: '守護精霊診断',
  subtitle: 'あなたを守る守護精霊は誰？',
  catchphrase: '心の奥に棲む精霊があなたの本質を映し出す',
  description:
    'ユング心理学の「元型理論」とBig Five性格特性をベースに、あなたの心の深層にいる守護精霊を呼び出します。直感で答えるほど、本当の精霊に出会えるかも？',
  emoji: '🔮',
  themeColor: '#9B59B6',
  gradientFrom: '#9B59B6',
  gradientTo: '#3498DB',

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
      min: 10,
      max: 70,
      defaultValue: 25,
      unit: '歳',
    },
  ],

  // --- 6つのスコアリング次元 ---
  dimensions: [
    { key: 'courage',  label: '勇気',   color: '#E74C3C' },
    { key: 'wisdom',   label: '知恵',   color: '#3498DB' },
    { key: 'kindness', label: '優しさ', color: '#2ECC71' },
    { key: 'freedom',  label: '自由',   color: '#F39C12' },
    { key: 'mystery',  label: '神秘',   color: '#9B59B6' },
    { key: 'vitality', label: '生命力', color: '#E67E22' },
  ],

  // --- セクション定義 ---
  sections: {
    1: '直感・第一印象',
    2: '行動パターン',
    3: '対人関係',
    4: '夢・想像力',
    5: '感情反応',
    6: '価値観・信念',
  },

  // --- 質問データ（30問） ---
  // weights配列: [勇気, 知恵, 優しさ, 自由, 神秘, 生命力]
  questions: [
    // ===== セクション1: 直感・第一印象 =====
    {
      sid: 1,
      sectionName: '直感・第一印象',
      emoji: '✨',
      text: '目を閉じて深呼吸。最初に浮かんだ風景は？',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [0, 1, 1, 2, 2, 0],
    },
    {
      sid: 1,
      sectionName: '直感・第一印象',
      emoji: '🌅',
      text: '朝起きて窓を開けたとき、一番テンションが上がる天気は？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [1, 0, 0, 2, 0, 2],
    },
    {
      sid: 1,
      sectionName: '直感・第一印象',
      emoji: '🗝️',
      text: '道端で古びた鍵を見つけた。あなたの最初の反応は？',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [1, 2, 0, 1, 2, 0],
    },
    {
      sid: 1,
      sectionName: '直感・第一印象',
      emoji: '🎨',
      text: '直感で選んで。一番惹かれる色は？',
      source: 'Jung, C.G. (1964). Man and His Symbols.',
      weights: [2, 1, 1, 1, 2, 1],
    },
    {
      sid: 1,
      sectionName: '直感・第一印象',
      emoji: '🌊',
      text: '海辺に立っている。波の音を聞いてどう感じる？',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [0, 1, 1, 2, 1, 1],
    },

    // ===== セクション2: 行動パターン =====
    {
      sid: 2,
      sectionName: '行動パターン',
      emoji: '🏔️',
      text: '目の前に登ったことのない山がある。あなたはどうする？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [3, 0, 0, 2, 0, 2],
    },
    {
      sid: 2,
      sectionName: '行動パターン',
      emoji: '🔥',
      text: 'クラスで誰かがいじめられている場面を見かけた。あなたは？',
      source: 'Kohlberg, L. (1981). The Philosophy of Moral Development.',
      weights: [3, 0, 3, 0, 0, 1],
    },
    {
      sid: 2,
      sectionName: '行動パターン',
      emoji: '📦',
      text: '「開けてはいけない」と書かれた箱がある。あなたは？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [1, 1, 0, 2, 3, 0],
    },
    {
      sid: 2,
      sectionName: '行動パターン',
      emoji: '🏃',
      text: '休日の過ごし方で一番多いのは？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [1, 1, 1, 1, 1, 2],
    },
    {
      sid: 2,
      sectionName: '行動パターン',
      emoji: '⚔️',
      text: 'ゲームやスポーツで負けたとき、あなたの反応は？',
      source: 'Dweck, C.S. (2006). Mindset: The New Psychology of Success.',
      weights: [2, 1, 0, 0, 0, 3],
    },

    // ===== セクション3: 対人関係 =====
    {
      sid: 3,
      sectionName: '対人関係',
      emoji: '👫',
      text: '友達グループの中で、あなたはどんなポジション？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [1, 1, 2, 1, 0, 1],
    },
    {
      sid: 3,
      sectionName: '対人関係',
      emoji: '😢',
      text: '友達が泣いているとき、あなたはどうする？',
      source: 'Goleman, D. (1995). Emotional Intelligence.',
      weights: [0, 0, 3, 0, 1, 1],
    },
    {
      sid: 3,
      sectionName: '対人関係',
      emoji: '🎁',
      text: '友達へのプレゼントを選ぶとき、大事にすることは？',
      source: 'Jung, C.G. (1971). Psychological Types.',
      weights: [0, 2, 3, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: '対人関係',
      emoji: '🤫',
      text: '秘密を打ち明けられたとき、あなたは？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [0, 2, 2, 0, 1, 0],
    },
    {
      sid: 3,
      sectionName: '対人関係',
      emoji: '🌍',
      text: '知らない国の人と友達になれると思う？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [2, 0, 1, 2, 0, 1],
    },

    // ===== セクション4: 夢・想像力 =====
    {
      sid: 4,
      sectionName: '夢・想像力',
      emoji: '🌙',
      text: 'よく見る夢のパターンに一番近いのは？',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [1, 1, 0, 2, 3, 0],
    },
    {
      sid: 4,
      sectionName: '夢・想像力',
      emoji: '🏰',
      text: 'ファンタジーの世界に行けるなら、どんな役になりたい？',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [2, 2, 1, 1, 2, 1],
    },
    {
      sid: 4,
      sectionName: '夢・想像力',
      emoji: '🐉',
      text: 'もし魔法が使えるなら、どんな魔法がいい？',
      source: 'Jung, C.G. (1959). The Archetypes and the Collective Unconscious.',
      weights: [1, 1, 2, 1, 2, 1],
    },
    {
      sid: 4,
      sectionName: '夢・想像力',
      emoji: '🌳',
      text: '不思議な森に入ったら、最初に何をする？',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [2, 2, 0, 2, 2, 1],
    },
    {
      sid: 4,
      sectionName: '夢・想像力',
      emoji: '⭐',
      text: '星空を見上げたとき、どんなことを考える？',
      source: 'Jung, C.G. (1964). Man and His Symbols.',
      weights: [0, 2, 0, 2, 3, 0],
    },

    // ===== セクション5: 感情反応 =====
    {
      sid: 5,
      sectionName: '感情反応',
      emoji: '😤',
      text: '怒りを感じたとき、あなたの対処法は？',
      source: 'Goleman, D. (1995). Emotional Intelligence.',
      weights: [2, 1, 1, 1, 0, 2],
    },
    {
      sid: 5,
      sectionName: '感情反応',
      emoji: '😊',
      text: '一番幸せを感じる瞬間は？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [0, 1, 2, 1, 1, 2],
    },
    {
      sid: 5,
      sectionName: '感情反応',
      emoji: '😰',
      text: '不安なとき、自分を落ち着かせる方法は？',
      source: 'Goleman, D. (1995). Emotional Intelligence.',
      weights: [1, 2, 0, 0, 2, 1],
    },
    {
      sid: 5,
      sectionName: '感情反応',
      emoji: '🎉',
      text: 'すごく嬉しいことがあったとき、どう表現する？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [1, 0, 1, 2, 0, 3],
    },
    {
      sid: 5,
      sectionName: '感情反応',
      emoji: '💔',
      text: '大切なものを失くしてしまったとき、あなたは？',
      source: 'Kubler-Ross, E. (1969). On Death and Dying.',
      weights: [1, 1, 1, 0, 1, 2],
    },

    // ===== セクション6: 価値観・信念 =====
    {
      sid: 6,
      sectionName: '価値観・信念',
      emoji: '🌸',
      text: '人生で一番大切だと思うものは？',
      source: 'Jung, C.G. (1971). Psychological Types.',
      weights: [1, 1, 2, 2, 1, 1],
    },
    {
      sid: 6,
      sectionName: '価値観・信念',
      emoji: '🦸',
      text: '「かっこいい」と思う人の特徴は？',
      source: 'Campbell, J. (1949). The Hero with a Thousand Faces.',
      weights: [3, 1, 1, 1, 0, 1],
    },
    {
      sid: 6,
      sectionName: '価値観・信念',
      emoji: '🌱',
      text: '10年後の自分に一番期待することは？',
      source: 'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual.',
      weights: [1, 2, 1, 2, 0, 2],
    },
    {
      sid: 6,
      sectionName: '価値観・信念',
      emoji: '🕊️',
      text: '世界を1つだけ変えられるなら、何を変えたい？',
      source: 'Kohlberg, L. (1981). The Philosophy of Moral Development.',
      weights: [1, 1, 3, 1, 0, 1],
    },
    {
      sid: 6,
      sectionName: '価値観・信念',
      emoji: '🎭',
      text: '「自分らしさ」って何だと思う？',
      source: 'Jung, C.G. (1971). Psychological Types.',
      weights: [0, 2, 0, 3, 2, 0],
    },
    {
      sid: 6,
      sectionName: '価値観・信念',
      emoji: '🔮',
      text: '直感と論理、どちらを信じることが多い？',
      source: 'Jung, C.G. (1971). Psychological Types.',
      weights: [1, 2, 0, 0, 3, 0],
    },
  ],

  // --- 結果タイプ（14種類） ---
  // scoreWeights: [勇気, 知恵, 優しさ, 自由, 神秘, 生命力]
  resultTypes: [
    {
      id: 'phoenix',
      emoji: '🔥',
      name: '蒼炎のフェニックス',
      tag: '#不死鳥 #再生の炎',
      color: '#E74C3C',
      description:
        'あなたの守護精霊は蒼炎のフェニックス！何度倒れても立ち上がる不屈の精神と、燃えるような情熱があなたの本質です。困難に直面するほど強くなる、まさに不死鳥のような魂を持っています。',
      advice:
        '挑戦を恐れないで。失敗しても、フェニックスのように何度でも蘇れるのがあなたの力。その炎を絶やさないように、常に新しいことにチャレンジし続けよう！',
      traits: ['不屈の精神', '情熱的', '復活力がある', '困難に強い'],
      scoreWeights: [3, 0, 0, 1, 0, 3],
    },
    {
      id: 'unicorn',
      emoji: '🦄',
      name: '月光のユニコーン',
      tag: '#純粋 #癒しの光',
      color: '#DDA0DD',
      description:
        'あなたの守護精霊は月光のユニコーン！純粋で優しい心を持ち、周りの人を自然と癒す力があります。あなたがいるだけで、その場が穏やかで温かい空気に包まれるのです。',
      advice:
        'あなたの優しさは最大の武器。でも、自分を犠牲にしすぎないように注意してね。月光のように静かに、でも確実に周りを照らし続けるあなたでいよう！',
      traits: ['純粋な心', '癒しの力', '直感が鋭い', '繊細な感性'],
      scoreWeights: [0, 1, 3, 0, 2, 0],
    },
    {
      id: 'dragon',
      emoji: '🐲',
      name: '深森のドラゴン',
      tag: '#守護者 #古代の知恵',
      color: '#27AE60',
      description:
        'あなたの守護精霊は深森のドラゴン！古代の知恵を持ち、大切なものを命がけで守る強さがあります。普段は静かですが、いざというときに圧倒的な力を発揮するタイプです。',
      advice:
        'あなたの知恵と守る力は本物。大切なものを見つけたら、それを全力で守り抜いて。ドラゴンのように、静かに、でも確実に力を蓄えていこう！',
      traits: ['守護者の気質', '深い知恵', '静かな強さ', '忠実'],
      scoreWeights: [2, 3, 1, 0, 1, 1],
    },
    {
      id: 'whale',
      emoji: '🐋',
      name: '星海のクジラ',
      tag: '#宇宙的スケール #深い精神性',
      color: '#2C3E50',
      description:
        'あなたの守護精霊は星海のクジラ！宇宙のように広い心と、海のように深い精神性を持っています。物事を大きな視点で捉え、時間をかけて本質を見抜く力があります。',
      advice:
        '焦らなくて大丈夫。クジラのように悠々と、自分のペースで深く潜っていこう。あなたが見つける真実は、きっと周りの人にも大きな影響を与えるはず！',
      traits: ['広い視野', '深い思考', '大器晩成型', '落ち着きがある'],
      scoreWeights: [0, 2, 1, 1, 3, 0],
    },
    {
      id: 'wolf',
      emoji: '🐺',
      name: '銀月の狼',
      tag: '#孤高の戦士 #群れのリーダー',
      color: '#7F8C8D',
      description:
        'あなたの守護精霊は銀月の狼！独立心が強く、自分の道を突き進む強さがある一方で、仲間を大切にする心も持っています。リーダーとして群れを導く力があります。',
      advice:
        '一匹狼になりすぎないように注意。仲間と一緒にいるときも、あなたらしさを大切にしつつ、みんなの力を引き出すリーダーになろう！',
      traits: ['独立心が強い', 'リーダーシップ', '仲間思い', '直感が鋭い'],
      scoreWeights: [2, 1, 1, 2, 1, 1],
    },
    {
      id: 'butterfly',
      emoji: '🦋',
      name: '虹彩の蝶',
      tag: '#変化の使者 #美の化身',
      color: '#FF69B4',
      description:
        'あなたの守護精霊は虹彩の蝶！自由に飛び回り、美しい変化を恐れない精神の持ち主です。ひとつの場所にとどまらず、常に新しい自分に生まれ変わり続ける力があります。',
      advice:
        '変化を楽しんで！蝶のように、今の姿が最終形ではないことを忘れないで。どんどん変わっていくあなたは、きっと最高に美しい姿にたどり着くはず！',
      traits: ['変化を恐れない', '自由奔放', '美的センス', '適応力が高い'],
      scoreWeights: [0, 0, 0, 3, 1, 2],
    },
    {
      id: 'owl',
      emoji: '🦉',
      name: '黄昏のフクロウ',
      tag: '#夜の賢者 #静かな知恵者',
      color: '#8E44AD',
      description:
        'あなたの守護精霊は黄昏のフクロウ！暗闇の中でも真実を見抜く目と、静かに考え抜く賢さを持っています。みんなが見落とすことに気づける、特別な知恵の持ち主です。',
      advice:
        '周りのスピードに合わせなくてOK。フクロウのように静かに観察し、本当に大切なときに的確な答えを出そう。あなたの知恵は、きっとみんなの助けになるよ！',
      traits: ['観察力が鋭い', '深い思考力', '冷静', '真実を見抜く'],
      scoreWeights: [0, 3, 0, 0, 2, 0],
    },
    {
      id: 'deer',
      emoji: '🦌',
      name: '翠風の鹿',
      tag: '#森の守り手 #穏やかな強さ',
      color: '#2ECC71',
      description:
        'あなたの守護精霊は翠風の鹿！穏やかで優雅な雰囲気の中に、自然の生命力を宿しています。争いを好まず、でも大切なときには毅然とした態度を取れる、静かな強さの持ち主です。',
      advice:
        '無理に強がらなくていいよ。鹿のように穏やかに、でも芯は強く。自然体のあなたが、周りの人にとって一番の癒しになっているはず！',
      traits: ['穏やかな性格', '自然体', '芯が強い', '生命力あふれる'],
      scoreWeights: [0, 0, 2, 1, 0, 3],
    },
    {
      id: 'fox',
      emoji: '🦊',
      name: '暁光のキツネ',
      tag: '#知恵者 #変幻自在',
      color: '#E67E22',
      description:
        'あなたの守護精霊は暁光のキツネ！頭の回転が速く、どんな状況でも機転を利かせて切り抜ける才能があります。いたずら好きな一面もあり、ユーモアセンスも抜群です。',
      advice:
        'あなたの機転の良さは天性のもの。でも、ずる賢さに走らないように注意してね。正しいことに知恵を使えば、キツネのように誰よりも先を行ける！',
      traits: ['頭の回転が速い', '機転が利く', 'ユーモアがある', '戦略的'],
      scoreWeights: [1, 2, 0, 2, 1, 1],
    },
    {
      id: 'eagle',
      emoji: '🦅',
      name: '天空の大鷲',
      tag: '#高みを目指す #王者の翼',
      color: '#F1C40F',
      description:
        'あなたの守護精霊は天空の大鷲！どこまでも高く飛び、広い視野で世界を見渡す力があります。目標に向かって一直線に突き進む集中力と、自由を愛する心を持っています。',
      advice:
        '高い空を飛ぶのは気持ちいいけど、たまには地上に降りてきて。仲間との時間も大切にしながら、でも夢は大きく持ち続けよう！',
      traits: ['高い志', '集中力がある', '自由を愛する', '決断力がある'],
      scoreWeights: [2, 0, 0, 3, 0, 2],
    },
    {
      id: 'turtle',
      emoji: '🐢',
      name: '大地の古亀',
      tag: '#揺るがぬ大地 #永遠の守り手',
      color: '#1ABC9C',
      description:
        'あなたの守護精霊は大地の古亀！どっしりと構えた安定感と、長い時間をかけて物事を成し遂げる忍耐力があります。焦らず着実に進むあなたは、最終的に一番遠くまで行ける人です。',
      advice:
        '周りのスピードに焦る必要はないよ。亀のようにゆっくりでも確実に進めば、気づけば誰よりも先に到着している。あなたのペースを大切に！',
      traits: ['忍耐力がある', '安定感', '堅実', '信頼される'],
      scoreWeights: [1, 2, 2, 0, 0, 1],
    },
    {
      id: 'cat',
      emoji: '🐱',
      name: '月影の猫霊',
      tag: '#気まぐれの魔法 #独自の世界',
      color: '#9B59B6',
      description:
        'あなたの守護精霊は月影の猫霊！自由気ままで、誰にも縛られない独自の世界観を持っています。神秘的な雰囲気を纏い、興味のあることには驚くほどの集中力を発揮します。',
      advice:
        'あなたの「気まぐれ」は実は直感の表れ。やりたいと思ったことにはどんどん飛び込んでOK。猫のように、自分の感覚を信じて生きていこう！',
      traits: ['自由な精神', '直感的', '独自の世界観', '気まぐれだけど本質を突く'],
      scoreWeights: [0, 0, 0, 2, 3, 1],
    },
    {
      id: 'lion',
      emoji: '🦁',
      name: '黄金の獅子王',
      tag: '#王者の風格 #太陽の力',
      color: '#FFD700',
      description:
        'あなたの守護精霊は黄金の獅子王！圧倒的なカリスマ性と、周りを引っ張るリーダーシップを持っています。太陽のように明るく、存在するだけで周囲を勇気づける力があります。',
      advice:
        'あなたの存在感は天性のもの。でも、王者には「守る力」も必要。強さだけでなく、周りの人を思いやる優しさも忘れないようにしよう！',
      traits: ['カリスマ性', '圧倒的な存在感', '勇気がある', 'みんなを守る力'],
      scoreWeights: [3, 0, 1, 0, 0, 2],
    },
    {
      id: 'serpent',
      emoji: '🐍',
      name: '深淵の蛇神',
      tag: '#再生と変容 #隠された力',
      color: '#16A085',
      description:
        'あなたの守護精霊は深淵の蛇神！脱皮を繰り返す蛇のように、常に自分を更新し続ける力を持っています。表面には出さない深い知恵と、隠された強大な力の持ち主です。',
      advice:
        'あなたの力は見えにくいけど、本当は誰よりも強い。秘めた力を正しい方向に使えば、蛇神のように世界を変える変容の力となるはず！',
      traits: ['変容の力', '秘めた強さ', '洞察力がある', '再生力がある'],
      scoreWeights: [1, 2, 0, 0, 3, 1],
    },
  ],

  // --- メタ情報 ---
  questionCount: 30,
  estimatedMinutes: 5,
  hashtags: ['#守護精霊診断', '#精霊', '#ファンタジー', '#心理診断'],
  references: [
    'Jung, C.G. (1959). The Archetypes and the Collective Unconscious. Princeton University Press.',
    'Jung, C.G. (1964). Man and His Symbols. Doubleday.',
    'Jung, C.G. (1971). Psychological Types. Princeton University Press.',
    'Costa, P.T. & McCrae, R.R. (1992). NEO-PI-R Professional Manual. Psychological Assessment Resources.',
    'Campbell, J. (1949). The Hero with a Thousand Faces. Pantheon Books.',
    'Goleman, D. (1995). Emotional Intelligence: Why It Can Matter More Than IQ. Bantam Books.',
    'Kohlberg, L. (1981). The Philosophy of Moral Development. Harper & Row.',
    'Dweck, C.S. (2006). Mindset: The New Psychology of Success. Random House.',
    'Kubler-Ross, E. (1969). On Death and Dying. Macmillan.',
  ],
};
