// ============================================================
// 恋愛タイプ定義データ（12タイプ）
// ============================================================

/** 恋愛タイプの型定義 */
export interface LoveType {
  id: string;
  emoji: string;
  name: string;
  tag: string;
  color: string;
  /** タイプの説明文 */
  desc: string;
  /** アドバイス */
  advice: string;
  /** 応援絵文字 */
  cheer: string;
  /** 応援メッセージ（中） */
  cheerm: string;
  /** 応援メッセージ（短） */
  cheers: string;
  /** 他タイプとの相性スコア (0-100) */
  compat: Record<string, number>;
}

// ------------------------------------------------------------
// 12タイプ定義
// ------------------------------------------------------------
export const TYPES: LoveType[] = [
  {
    id: 'EROS',
    emoji: '\u{1F525}',
    name: '情熱炎上型',
    tag: 'EROS TYPE / 高情熱・感覚重視',
    color: '#FF6BE8',
    desc: '見た目や雰囲気の「ときめき」が恋愛の原動力。好きになったら全力で向き合う情熱家です。感情に正直で、恋愛に対するエネルギーが誰よりも強い。その情熱は相手を圧倒することもありますが、それが一番の魅力です。',
    advice: '熱量が強いぶん、相手のペースを尊重することが大切。最初のときめきが冷めても、日常の積み重ねに「新しいときめき」を見つける練習をすると、長続きする恋愛になります。',
    cheer: '\u{1F525}',
    cheerm: 'その情熱は最大の武器。恐れずに、ぶつけていこう。',
    cheers: '本気で好きになれるあなたは、それだけで特別な存在です。',
    compat: { EROS: 72, STORGE: 65, PRAGMA: 58, AGAPE: 80, MANIA: 55, LUDUS: 48, GROWTH: 70, AVOIDANT: 40, COMPLEMENT: 75, IDEALIST: 68, SECURE: 72, INTELLECTUAL: 60 },
  },
  {
    id: 'STORGE',
    emoji: '\u{1F33F}',
    name: '友情深根型',
    tag: 'STORGE TYPE / 信頼・安心・友情基盤',
    color: '#80E8C0',
    desc: '友達から始まる深い絆を育てることが恋愛の本質。付き合うまでに時間がかかりますが、一度築いた関係は揺るぎない。「ほっとする」「自然体でいられる」そんな安心感を大切にします。',
    advice: '想いを伝えるタイミングを怖がりすぎないで。信頼関係はすでにできているので、あとは気持ちを言葉にする一歩だけ。友情という最高の土台があるから、絶対に大丈夫。',
    cheer: '\u{1F33F}',
    cheerm: '「一緒にいると落ち着く」それが本物の愛のサイン。',
    cheers: 'あなたが積み上げてきた信頼と時間は、絶対に裏切らない。',
    compat: { EROS: 65, STORGE: 85, PRAGMA: 78, AGAPE: 75, MANIA: 48, LUDUS: 42, GROWTH: 80, AVOIDANT: 38, COMPLEMENT: 68, IDEALIST: 60, SECURE: 88, INTELLECTUAL: 72 },
  },
  {
    id: 'PRAGMA',
    emoji: '\u{1F4CB}',
    name: '現実設計型',
    tag: 'PRAGMA TYPE / 将来・価値観・堅実',
    color: '#A0C8FF',
    desc: '価値観・生活習慣・将来の方向性の一致を最重視する堅実派。感情だけでなく理性を使って恋愛を選択します。長期的に幸せな関係を築く力があり、一度決めたら誠実に貫きます。',
    advice: '条件を優先しすぎると、感情的なつながりを見落とすことも。「一緒にいて楽しい」という感覚も大切な判断基準です。分析しすぎず、たまには直感を信じてみて。',
    cheer: '\u{1F4CB}',
    cheerm: 'あなたの慎重さが、長く続く愛を作る。',
    cheers: '将来を見据えながら恋愛できるあなたは、パートナーにとって最高の存在です。',
    compat: { EROS: 55, STORGE: 78, PRAGMA: 88, AGAPE: 68, MANIA: 40, LUDUS: 35, GROWTH: 75, AVOIDANT: 58, COMPLEMENT: 65, IDEALIST: 52, SECURE: 80, INTELLECTUAL: 78 },
  },
  {
    id: 'AGAPE',
    emoji: '\u{1F49A}',
    name: '無条件献身型',
    tag: 'AGAPE TYPE / 尽くす・無条件の愛',
    color: '#80FFB0',
    desc: '相手の幸せを自分の喜びにできる純粋な愛の持ち主。見返りを求めず、ただ大切な人を守りたいという気持ちで動きます。その深い思いやりは、誰もが羨む恋愛の強みです。',
    advice: '自己犠牲が深くなりすぎると、自分が消耗します。「あなた自身も大切」を忘れずに。相手に頼ること・甘えることも、信頼の証。自分の気持ちをちゃんと伝えてください。',
    cheer: '\u{1F49A}',
    cheerm: 'あなたの優しさは本物。でも、自分のことも大切にしてね。',
    cheers: '尽くすことが得意なあなたは、その分きちんと大切にされる関係を選んで。',
    compat: { EROS: 80, STORGE: 75, PRAGMA: 68, AGAPE: 78, MANIA: 58, LUDUS: 38, GROWTH: 72, AVOIDANT: 42, COMPLEMENT: 70, IDEALIST: 72, SECURE: 82, INTELLECTUAL: 65 },
  },
  {
    id: 'MANIA',
    emoji: '\u{1F30A}',
    name: '感情嵐型',
    tag: 'MANIA TYPE / 愛着不安・強烈な感情',
    color: '#C8A0FF',
    desc: '恋愛に全力で飛び込む情熱家ですが、相手を失う不安も強い。感情の波が激しく、愛が深いほど不安も大きくなります。その強烈なエネルギーは、相手を圧倒するほどの深い愛の裏返しです。',
    advice: '不安な気持ちは「もっと愛したい」サイン。まずは自分自身への信頼を高めること。相手の行動に即反応せず、一歩引いて考える習慣が関係を安定させます。',
    cheer: '\u{1F30A}',
    cheerm: 'その深い感情はあなたの魅力。ただ、自分を信じることも忘れずに。',
    cheers: '愛することへの情熱は誰にも負けない。その力を、自分への愛にも向けてみて。',
    compat: { EROS: 55, STORGE: 48, PRAGMA: 40, AGAPE: 58, MANIA: 45, LUDUS: 28, GROWTH: 52, AVOIDANT: 22, COMPLEMENT: 50, IDEALIST: 60, SECURE: 70, INTELLECTUAL: 45 },
  },
  {
    id: 'LUDUS',
    emoji: '\u{1F3AE}',
    name: '自由蝶々型',
    tag: 'LUDUS TYPE / 軽やか・自由・マイペース',
    color: '#FFE080',
    desc: '恋愛を重く考えず、軽やかに楽しむスタイル。特定の相手に依存しない自立心と、楽しさを大切にする姿勢が魅力。自分のペースを守りながら、でも楽しく関係を築きます。',
    advice: '軽やかさは魅力ですが、相手が深刻に考えている場合はすれ違いになることも。自分の気持ちと相手への誠実さのバランスを意識すると、より豊かな関係が生まれます。',
    cheer: '\u{1F3AE}',
    cheerm: 'そのマイペースさは絶対に武器。本気になる瞬間を恐れないで。',
    cheers: '自由でいることとちゃんと向き合うことは矛盾しない。あなたならできる。',
    compat: { EROS: 48, STORGE: 42, PRAGMA: 35, AGAPE: 38, MANIA: 28, LUDUS: 62, GROWTH: 48, AVOIDANT: 70, COMPLEMENT: 45, IDEALIST: 40, SECURE: 50, INTELLECTUAL: 55 },
  },
  {
    id: 'GROWTH',
    emoji: '\u{1F331}',
    name: '共成長型',
    tag: 'GROWTH TYPE / 成長・自己拡張',
    color: '#B8FFB0',
    desc: '恋愛を通じて互いが成長できることを最重視します。好奇心旺盛で、相手から学び、相手に良い影響を与えることが喜び。恋愛が自分の可能性を広げる手段でもあります。',
    advice: '成長を求めるあまり、相手にプレッシャーをかけてしまうことも。相手のペースを受け入れながら、「一緒にいるだけで十分」と感じる瞬間も大切にしてください。',
    cheer: '\u{1F331}',
    cheerm: '恋愛で成長できるあなたは、常に輝いている。',
    cheers: '一緒にいることで、互いに最高の自分になれる関係を。',
    compat: { EROS: 70, STORGE: 80, PRAGMA: 75, AGAPE: 72, MANIA: 52, LUDUS: 48, GROWTH: 85, AVOIDANT: 50, COMPLEMENT: 78, IDEALIST: 80, SECURE: 78, INTELLECTUAL: 88 },
  },
  {
    id: 'AVOIDANT',
    emoji: '\u{1F6E1}\u{FE0F}',
    name: '独立堅守型',
    tag: 'AVOIDANT TYPE / 自立・対等・回避',
    color: '#C8C8E8',
    desc: '自分の空間・時間・自由を最優先。依存せず、対等な関係を求めます。恋愛に不必要な束縛や重さを嫌い、互いが自立した上での関係を理想とする自立派です。',
    advice: '独立心は魅力ですが、相手に「大切にされていない」と感じさせてしまうことも。適度に感情を共有することが、関係の深みを生みます。',
    cheer: '\u{1F6E1}\u{FE0F}',
    cheerm: 'その自立心は最高の強み。でも、たまは頼ることも強さだよ。',
    cheers: '対等でいられる関係を大切に。あなたには、それができる力がある。',
    compat: { EROS: 40, STORGE: 38, PRAGMA: 58, AGAPE: 42, MANIA: 22, LUDUS: 70, GROWTH: 50, AVOIDANT: 65, COMPLEMENT: 52, IDEALIST: 45, SECURE: 48, INTELLECTUAL: 62 },
  },
  {
    id: 'COMPLEMENT',
    emoji: '\u{1F9E9}',
    name: '補完求道型',
    tag: 'COMPLEMENT TYPE / 補い合う・相補性',
    color: '#FFB8E0',
    desc: '自分にない部分を持つ相手に強く惹かれます。互いの強みと弱みが噛み合うとき、最高のパートナーシップが生まれると信じています。',
    advice: '「補い合う」関係は美しいですが、依存しすぎに注意。相手の欠点も含めて受け入れながら、自分自身の成長も忘れずに。',
    cheer: '\u{1F9E9}',
    cheerm: 'あなたの「合わせる力」が、最高のパートナーシップを作る。',
    cheers: '違いを恐れず、むしろその違いを楽しんで。それがあなたの才能。',
    compat: { EROS: 75, STORGE: 68, PRAGMA: 65, AGAPE: 70, MANIA: 50, LUDUS: 45, GROWTH: 78, AVOIDANT: 52, COMPLEMENT: 72, IDEALIST: 68, SECURE: 75, INTELLECTUAL: 70 },
  },
  {
    id: 'IDEALIST',
    emoji: '\u{2B50}',
    name: '理想追求型',
    tag: 'IDEALIST TYPE / 運命・完璧・高理想',
    color: '#FFE8A0',
    desc: '「運命の人」の存在を信じ、理想の恋愛を諦めません。妥協せず完璧な相性を探し続ける浪漫主義者。その高い基準が自分を磨く力になっています。',
    advice: '理想を持つことは素晴らしいですが、目の前の人の良さを見落とすことも。「完璧な人」より「一緒にいて自然体になれる人」に目を向けてみてください。',
    cheer: '\u{2B50}',
    cheerm: '理想を持ち続けることは、あなたの輝きの源。',
    cheers: '理想があるから、あなたは妥協しない。その姿勢が、いつか本物を引き寄せる。',
    compat: { EROS: 68, STORGE: 60, PRAGMA: 52, AGAPE: 72, MANIA: 60, LUDUS: 40, GROWTH: 80, AVOIDANT: 45, COMPLEMENT: 68, IDEALIST: 70, SECURE: 65, INTELLECTUAL: 78 },
  },
  {
    id: 'SECURE',
    emoji: '\u{1F932}',
    name: '安定守護型',
    tag: 'SECURE TYPE / 安全基地・安心・信頼',
    color: '#A0E8FF',
    desc: '相手の心の安全基地になれる安定した愛着スタイルの持ち主。感情が安定していて、相手を不安にさせません。深く信頼される関係を自然に作れる、恋愛の理想形です。',
    advice: '安定しすぎて「刺激がない」と言われることも。たまには自分の気持ちを大げさに表現したり、サプライズを仕掛けてみて。あなたの安定感をベースに、ときめきをプラスして。',
    cheer: '\u{1F932}',
    cheerm: 'あなたのそばにいると、誰でも安心できる。それが最大の魅力。',
    cheers: 'その安定した愛が、相手にとって最高の贈り物になっている。',
    compat: { EROS: 72, STORGE: 88, PRAGMA: 80, AGAPE: 82, MANIA: 70, LUDUS: 50, GROWTH: 78, AVOIDANT: 48, COMPLEMENT: 75, IDEALIST: 65, SECURE: 85, INTELLECTUAL: 75 },
  },
  {
    id: 'INTELLECTUAL',
    emoji: '\u{1F52D}',
    name: '知的探求型',
    tag: 'INTELLECTUAL TYPE / 知的共鳴・思索',
    color: '#D0B8FF',
    desc: '知的な刺激・深い会話・共通の興味を恋愛の基盤にします。表面的な魅力より、内面の深さや思想の共鳴を求める思索派。話せばわかる相手との深い絆を育てます。',
    advice: '知的つながりを重視するあまり、感情的なつながりを後回しにすることも。「一緒に楽しむ」だけでなく、「一緒に感じる」時間も大切にしてください。',
    cheer: '\u{1F52D}',
    cheerm: 'あなたの深さが分かる人が、必ずいる。',
    cheers: '話が合う、思想が共鳴する。それが、あなたにとっての本当のときめき。',
    compat: { EROS: 60, STORGE: 72, PRAGMA: 78, AGAPE: 65, MANIA: 45, LUDUS: 55, GROWTH: 88, AVOIDANT: 62, COMPLEMENT: 70, IDEALIST: 78, SECURE: 75, INTELLECTUAL: 90 },
  },
];

// ------------------------------------------------------------
// レーダーチャート用の次元ラベルと色
// ------------------------------------------------------------

/** レーダーチャートの8次元ラベル */
export const DIM_LABELS = ['情熱度', '愛着不安', '回避傾向', '現実性', '献身度', '友情度', '成長志向', '自由度'];

/** 各次元に対応する色（DIM_LABELSと同じ順序） */
export const DIM_COLORS = ['#FF6BE8', '#C8A0FF', '#C8C8E8', '#A0C8FF', '#80FFB0', '#80E8C0', '#B8FFB0', '#FFE080'];
