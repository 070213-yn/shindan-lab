/**
 * 前世診断
 *
 * あなたの直感・好み・行動パターンから「前世」を判定する占い系診断。
 * 心理学的にはJungの元型理論やCampbellの英雄の旅をベースに、
 * 歴史上の人物類型と性格特性を結びつけたエンターテインメント診断。
 *
 * 理論基盤:
 *   - Jung(1959) 集合的無意識・元型理論
 *   - Campbell(1949) "The Hero with a Thousand Faces" — 英雄の旅
 *   - Hillman(1996) "The Soul's Code" — 魂の暗号理論
 *   - 歴史的人物類型研究 x エンターテインメント占い要素
 *
 * 6次元スコアリング: 高貴さ, 冒険心, 芸術性, 知略, 慈愛, 戦闘力
 * 35問・200タイプの超大規模前世診断
 */

import type { DiagnosisConfig } from '../diagnosticTypes';
import { pastlifeHistoryTypes } from './pastlife-types-history';
import { pastlifeAnimalTypes } from './pastlife-types-animals';
import { pastlifeTypesInsects } from './pastlife-types-insects';
import { pastlifeTypesPlants } from './pastlife-types-plants';
import { pastlifeTypesMyths } from './pastlife-types-myths';
import { pastlifeTypesNature } from './pastlife-types-nature';

export const pastlifeDiagnosis: DiagnosisConfig = {
  id: 'pastlife',
  title: '前世診断',
  subtitle: 'あなたの前世を占う！',
  catchphrase: '魂の記憶が目覚める — あなたの前世は何者だったのか？',
  description:
    '直感的な好み・歴史への親和性・価値観・行動パターンなど35問の質問から、あなたの「前世」を占います。歴史上の人物から動物、虫、植物、神話の存在、自然現象まで200タイプから判定します。',
  emoji: '🔮',
  themeColor: '#B8860B',
  gradientFrom: '#B8860B',
  gradientTo: '#8B4513',

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

  // --- 6次元スコアリング ---
  // 0: 高貴さ, 1: 冒険心, 2: 芸術性, 3: 知略, 4: 慈愛, 5: 戦闘力
  dimensions: [
    { key: 'nobility',   label: '高貴さ',   color: '#FFD700' },
    { key: 'adventure',  label: '冒険心',   color: '#FF6347' },
    { key: 'artistry',   label: '芸術性',   color: '#DA70D6' },
    { key: 'intellect',  label: '知略',     color: '#4169E1' },
    { key: 'compassion', label: '慈愛',     color: '#3CB371' },
    { key: 'combat',     label: '戦闘力',   color: '#DC143C' },
  ],

  // --- セクション（6セクション） ---
  sections: {
    1: '直感と記憶の断片',
    2: '歴史と文化への共鳴',
    3: '魂の価値観',
    4: '行動と本能',
    5: '夢と想像の世界',
    6: 'もしも前世に戻れたら',
  },

  // --- 質問データ（35問） ---
  // weights: [高貴さ, 冒険心, 芸術性, 知略, 慈愛, 戦闘力]
  questions: [
    // === セクション1: 直感と記憶の断片（6問） ===
    {
      sid: 1, sectionName: '直感と記憶の断片', emoji: '🏰',
      text: '古い城や宮殿の廊下を歩いている夢を見たとき、恐怖よりも「懐かしい」という感覚が先に来る',
      source: 'Jung(1959) 集合的無意識 — 元型としての「城」イメージ',
      weights: [2, 0, 1, 0, 0, 0],
    },
    {
      sid: 1, sectionName: '直感と記憶の断片', emoji: '⚔️',
      text: '博物館で古い武器や甲冑を見ると、手に取って使い方が分かるような不思議な感覚がある',
      source: 'Campbell(1949) 英雄の旅 — 戦士の元型',
      weights: [0, 1, 0, 0, 0, 2],
    },
    {
      sid: 1, sectionName: '直感と記憶の断片', emoji: '🎨',
      text: '美術館で何百年も前の絵画を見ると、描いた人の気持ちが手に取るように分かる気がする',
      source: 'Hillman(1996) 魂の暗号 — 芸術的衝動と魂の記憶',
      weights: [0, 0, 2, 1, 1, 0],
    },
    {
      sid: 1, sectionName: '直感と記憶の断片', emoji: '🌊',
      text: '初めて訪れた港町や海辺で、なぜか「ここに来たことがある」というデジャヴを感じたことがある',
      source: 'Campbell(1949) 英雄の旅 — 旅立ちの元型',
      weights: [0, 2, 0, 0, 0, 1],
    },
    {
      sid: 1, sectionName: '直感と記憶の断片', emoji: '📜',
      text: '読めないはずの古い文字や暗号を見ると、意味が浮かんできそうな奇妙な感覚になる',
      source: 'Jung(1959) 元型的シンボルとしての古代文字',
      weights: [0, 0, 1, 2, 0, 0],
    },
    {
      sid: 1, sectionName: '直感と記憶の断片', emoji: '🕯️',
      text: 'ろうそくの灯りや焚き火の炎をじっと見つめていると、別の時代の映像が頭に浮かぶことがある',
      source: 'Jung(1959) 火の元型 — 変容と神聖さの象徴',
      weights: [0, 0, 1, 0, 2, 0],
    },

    // === セクション2: 歴史と文化への共鳴（6問） ===
    {
      sid: 2, sectionName: '歴史と文化への共鳴', emoji: '🏛️',
      text: '古代文明の遺跡（ピラミッド、パルテノン神殿、マチュピチュなど）の映像を見ると、体の芯が震えるような感動を覚える',
      source: 'Jung(1959) 集合的無意識 — 文化的元型の共鳴',
      weights: [1, 1, 1, 2, 0, 0],
    },
    {
      sid: 2, sectionName: '歴史と文化への共鳴', emoji: '🇯🇵',
      text: '時代劇や武士の映画を見ると、刀の構え方や礼儀作法が「正しいかどうか」無意識にチェックしてしまう',
      source: 'Campbell(1949) 英雄の旅 — 文化圏別の英雄像',
      weights: [1, 0, 0, 1, 0, 2],
    },
    {
      sid: 2, sectionName: '歴史と文化への共鳴', emoji: '🎭',
      text: '古典文学や昔の詩歌を読むと、現代語の文章より心に響くことがある',
      source: 'Hillman(1996) 魂の暗号 — 過去の文化への無意識的共鳴',
      weights: [1, 0, 2, 1, 1, 0],
    },
    {
      sid: 2, sectionName: '歴史と文化への共鳴', emoji: '🗺️',
      text: 'シルクロードや大航海時代のルートを地図でたどると、まるで自分が旅した記憶のようにワクワクする',
      source: 'Campbell(1949) 英雄の旅 — 未知の世界への召命',
      weights: [0, 2, 0, 1, 0, 1],
    },
    {
      sid: 2, sectionName: '歴史と文化への共鳴', emoji: '⛪',
      text: '古い教会や神社仏閣に入ると、祈りの作法を誰にも教わっていないのに体が自然と動く',
      source: 'Jung(1959) ヌミノーゼ体験 — 聖なるものとの遭遇',
      weights: [2, 0, 0, 0, 2, 0],
    },
    {
      sid: 2, sectionName: '歴史と文化への共鳴', emoji: '🌍',
      text: '特定の国や地域の音楽を初めて聴いたとき、涙が出るほど懐かしく感じたことがある',
      source: 'Jung(1959) 集合的無意識 — 音楽と原初的記憶',
      weights: [0, 0, 2, 0, 2, 0],
    },

    // === セクション3: 魂の価値観（6問） ===
    {
      sid: 3, sectionName: '魂の価値観', emoji: '👑',
      text: 'グループの中で自然とリーダー役になり、みんなの方向を決める立場に立つことが多い',
      source: 'Jung(1959) 王の元型 — リーダーシップと高貴さ',
      weights: [2, 0, 0, 1, 0, 1],
    },
    {
      sid: 3, sectionName: '魂の価値観', emoji: '🕊️',
      text: '友人同士のケンカを見ると、どちらの味方もせず「みんなが納得する落としどころ」を探したくなる',
      source: 'Jung(1959) 賢者の元型 — 知恵による調和',
      weights: [0, 0, 0, 1, 2, -1],
    },
    {
      sid: 3, sectionName: '魂の価値観', emoji: '✨',
      text: '何かを作り出す瞬間（絵、文章、料理、音楽なんでも）に、生きている実感が最も強くなる',
      source: 'Hillman(1996) 魂の暗号 — 創造的衝動とダイモン',
      weights: [0, 0, 2, 0, 1, 0],
    },
    {
      sid: 3, sectionName: '魂の価値観', emoji: '🔬',
      text: '「世界がなぜこうなっているのか」を知りたくて、つい調べ続けてしまい時間を忘れることがある',
      source: 'Jung(1959) 賢者の元型 — 知識への渇望',
      weights: [0, 0, 0, 2, 1, 0],
    },
    {
      sid: 3, sectionName: '魂の価値観', emoji: '💪',
      text: '逆境に追い込まれたとき、恐怖よりも「ここで負けてたまるか」という闘志が先に湧いてくる',
      source: 'Campbell(1949) 英雄の旅 — 試練と変容',
      weights: [0, 1, 0, 0, 0, 2],
    },
    {
      sid: 3, sectionName: '魂の価値観', emoji: '🌱',
      text: '自分の利益よりも、困っている人や弱い立場の人を助けることに人生の意味を感じる',
      source: 'Jung(1959) 癒し手の元型 — 奉仕と慈悲の精神',
      weights: [0, 0, 0, 0, 2, 0],
    },

    // === セクション4: 行動と本能（6問） ===
    {
      sid: 4, sectionName: '行動と本能', emoji: '🧭',
      text: '旅行先では観光名所よりも、地元の人しか知らない裏路地や秘境に惹かれる',
      source: 'Campbell(1949) 英雄の旅 — 冒険への出発',
      weights: [0, 2, 0, 1, 0, 0],
    },
    {
      sid: 4, sectionName: '行動と本能', emoji: '♟️',
      text: '問題が起きたとき、感情的に動くのではなく冷静に情報を集めて最善手を考えるタイプだ',
      source: 'Jung(1959) 魔術師の元型 — 知略と変容の力',
      weights: [0, 0, 0, 2, 0, 1],
    },
    {
      sid: 4, sectionName: '行動と本能', emoji: '🎤',
      text: '人前に立つと緊張よりもアドレナリンが出て、むしろ普段以上の力を発揮できる',
      source: 'Hillman(1996) 魂の暗号 — 表現者としてのダイモン',
      weights: [1, 0, 2, 0, 0, 0],
    },
    {
      sid: 4, sectionName: '行動と本能', emoji: '🏃',
      text: '「みんながやっている」という理由だけでは動けず、自分が納得しないとルールに従えない',
      source: 'Campbell(1949) トリックスターの元型 — 境界の超越',
      weights: [0, 2, 0, 1, 0, 0],
    },
    {
      sid: 4, sectionName: '行動と本能', emoji: '🤲',
      text: '誰かが泣いていると、理由を聞く前に体が勝手に近づいて手を差し伸べている',
      source: 'Jung(1959) 癒し手の元型 — 無条件の慈悲',
      weights: [0, 0, 0, 0, 2, 0],
    },
    {
      sid: 4, sectionName: '行動と本能', emoji: '🏔️',
      text: '危険だと分かっていても「自分の目で確かめたい」という衝動を抑えられないことがある',
      source: 'Campbell(1949) 英雄の旅 — 試練の門',
      weights: [0, 2, 0, 0, 0, 1],
    },

    // === セクション5: 夢と想像の世界（6問） ===
    {
      sid: 5, sectionName: '夢と想像の世界', emoji: '🌌',
      text: '夜空を見上げると、星座の名前よりも「あの星に誰かがいるかもしれない」と想像してしまう',
      source: 'Jung(1959) 集合的無意識 — 星と天体の元型的意味',
      weights: [0, 1, 1, 2, 0, 0],
    },
    {
      sid: 5, sectionName: '夢と想像の世界', emoji: '🐉',
      text: '空を飛ぶ夢や、見知らぬ大地を冒険する夢をよく見る（見たいと思う）',
      source: 'Jung(1959) 夢分析 — 集合的無意識の噴出',
      weights: [0, 2, 1, 0, 0, 1],
    },
    {
      sid: 5, sectionName: '夢と想像の世界', emoji: '👘',
      text: '民族衣装や歴史的な衣装を着た自分の姿を想像すると、不思議とどんな振る舞いをすべきか分かる',
      source: 'Hillman(1996) 魂の暗号 — 過去世の記憶と衣装の象徴',
      weights: [2, 0, 1, 0, 0, 0],
    },
    {
      sid: 5, sectionName: '夢と想像の世界', emoji: '🗡️',
      text: '夢の中で何かと戦い、目覚めたとき汗だくだが不思議と爽快感を感じたことがある',
      source: 'Jung(1959) 影の元型 — 無意識の闘争と統合',
      weights: [0, 1, 0, 0, 0, 2],
    },
    {
      sid: 5, sectionName: '夢と想像の世界', emoji: '🌿',
      text: '深い森の中を一人で歩く想像をすると、恐怖ではなく「ここが自分の居場所だ」という安心感がある',
      source: 'Jung(1959) 集合的無意識 — 自然界との原初的つながり',
      weights: [0, 1, 1, 0, 2, 0],
    },
    {
      sid: 5, sectionName: '夢と想像の世界', emoji: '🔮',
      text: '未来を予知するよりも、過去の出来事を「体験」できる能力が欲しいと思う',
      source: 'Hillman(1996) 魂の暗号 — 時間を超えた魂の旅',
      weights: [1, 0, 1, 1, 1, 0],
    },

    // === セクション6: もしも前世に戻れたら（5問） ===
    {
      sid: 6, sectionName: 'もしも前世に戻れたら', emoji: '🪄',
      text: 'もし魔法が使えるなら、人を癒す治療の魔法よりも、敵を倒す攻撃の魔法を選びたい',
      source: 'Jung(1959) 影の元型 — 力への意志と防衛本能',
      weights: [0, 0, 0, 0, -2, 2],
    },
    {
      sid: 6, sectionName: 'もしも前世に戻れたら', emoji: '🏠',
      text: 'もし前世の時代に戻れるなら、豪華な宮殿よりも見知らぬ土地を旅する生活を選ぶ',
      source: 'Campbell(1949) 英雄の旅 — 安住vs冒険の選択',
      weights: [-1, 2, 0, 0, 0, 0],
    },
    {
      sid: 6, sectionName: 'もしも前世に戻れたら', emoji: '📚',
      text: 'もし古代の職業に就けるなら、戦士や王よりも、記録を残す学者や書記を選びたい',
      source: 'Jung(1959) 賢者の元型 — 知の継承者',
      weights: [0, -1, 1, 2, 1, -1],
    },
    {
      sid: 6, sectionName: 'もしも前世に戻れたら', emoji: '👥',
      text: 'もし王国を治めるなら、強力な軍隊よりも、民が幸せに暮らせる制度を作ることに力を注ぎたい',
      source: 'Jung(1959) 王の元型 — 慈悲深い統治者',
      weights: [2, 0, 0, 1, 2, -1],
    },
    {
      sid: 6, sectionName: 'もしも前世に戻れたら', emoji: '🎭',
      text: 'もし前世で名を残せるなら、軍事的勝利よりも、後世に語り継がれる芸術作品を遺したい',
      source: 'Hillman(1996) 魂の暗号 — 不滅への衝動',
      weights: [0, 0, 2, 1, 0, -1],
    },
  ],

  // --- 200種類の結果タイプ（6分割ファイルから統合） ---
  // scoreWeights: [高貴さ, 冒険心, 芸術性, 知略, 慈愛, 戦闘力]
  resultTypes: [
    ...pastlifeHistoryTypes,   // 歴史上の人物・職業 (50)
    ...pastlifeAnimalTypes,    // 動物 (40)
    ...pastlifeTypesInsects,   // 虫・小さな生き物 (25)
    ...pastlifeTypesPlants,    // 植物・樹木 (25)
    ...pastlifeTypesMyths,     // 神話・伝説 (30)
    ...pastlifeTypesNature,    // 自然現象・元素 (30)
  ],

  /* インラインタイプは分割ファイルに移行済み */

  // --- メタ情報 ---
  questionCount: 35,
  estimatedMinutes: 6,
  hashtags: ['#前世診断', '#あなたの前世', '#ときめき研究所'],
  references: [
    'Jung, C. G. (1959). The Archetypes and the Collective Unconscious. Collected Works Vol. 9, Part 1. Princeton University Press.',
    'Campbell, J. (1949). The Hero with a Thousand Faces. Pantheon Books.',
    'Hillman, J. (1996). The Soul\'s Code: In Search of Character and Calling. Random House.',
    'Jung, C. G. (1964). Man and His Symbols. Doubleday.',
    'Eliade, M. (1957). The Sacred and the Profane: The Nature of Religion. Harcourt Brace.',
    'Campbell, J. (1988). The Power of Myth. Doubleday.',
    'von Franz, M.-L. (1970). An Introduction to the Interpretation of Fairytales. Spring Publications.',
  ],
};
