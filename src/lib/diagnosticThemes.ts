/**
 * 診断ごとのUIテーマ定義
 *
 * 各診断IDに応じた背景パターン・パーティクルタイプ・アクセント絵文字を定義する。
 * CSSのbackground-imageで薄い模様を重ねる程度の軽量な実装。
 */

/** テーマ情報 */
export interface DiagnosticTheme {
  bgPattern: string;
  bgStyle: React.CSSProperties;
  accentEmoji: string;
}

/** 背景パターンのCSS定義（薄い模様で重くしない） */
const BG_PATTERNS: Record<string, React.CSSProperties> = {
  hearts: {
    backgroundImage:
      'radial-gradient(circle at 20% 30%, rgba(236,72,153,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(244,114,182,0.04) 0%, transparent 50%)',
  },
  waves: {
    backgroundImage:
      'repeating-linear-gradient(135deg, rgba(56,189,248,0.02) 0px, transparent 8px, transparent 16px)',
  },
  clouds: {
    backgroundImage:
      'radial-gradient(ellipse at 30% 20%, rgba(134,239,172,0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(167,243,208,0.04) 0%, transparent 60%)',
  },
  warm: {
    backgroundImage:
      'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.04) 0%, transparent 60%)',
  },
  mirror: {
    backgroundImage:
      'linear-gradient(180deg, rgba(168,85,247,0.04) 0%, transparent 40%), linear-gradient(0deg, rgba(168,85,247,0.03) 0%, transparent 40%)',
  },
  sparkle: {
    backgroundImage:
      'radial-gradient(circle at 25% 25%, rgba(250,204,21,0.05) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(234,179,8,0.04) 0%, transparent 40%)',
  },
  tech: {
    backgroundImage:
      'linear-gradient(0deg, rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
    backgroundSize: '30px 30px',
  },
  grid: {
    backgroundImage:
      'linear-gradient(0deg, rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
  },
  paint: {
    backgroundImage:
      'radial-gradient(circle at 15% 50%, rgba(236,72,153,0.04) 0%, transparent 35%), radial-gradient(circle at 85% 30%, rgba(59,130,246,0.04) 0%, transparent 35%), radial-gradient(circle at 50% 80%, rgba(234,179,8,0.04) 0%, transparent 35%)',
  },
  notebook: {
    backgroundImage:
      'linear-gradient(0deg, rgba(99,102,241,0.025) 1px, transparent 1px)',
    backgroundSize: '100% 24px',
  },
  neural: {
    backgroundImage:
      'radial-gradient(circle at 30% 40%, rgba(139,92,246,0.05) 0%, transparent 30%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.04) 0%, transparent 30%), radial-gradient(circle at 50% 20%, rgba(192,132,252,0.03) 0%, transparent 25%)',
  },
  mystic: {
    backgroundImage:
      'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 50%), conic-gradient(from 0deg at 50% 50%, transparent, rgba(168,85,247,0.03), transparent, rgba(139,92,246,0.02), transparent)',
  },
  fantasy: {
    backgroundImage:
      'radial-gradient(circle at 20% 80%, rgba(34,197,94,0.04) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.04) 0%, transparent 40%)',
  },
  vintage: {
    backgroundImage:
      'radial-gradient(circle at 50% 50%, rgba(180,140,80,0.05) 0%, transparent 60%)',
  },
  dark: {
    backgroundImage:
      'radial-gradient(circle at 50% 50%, rgba(100,100,120,0.06) 0%, transparent 50%)',
  },
  night: {
    backgroundImage:
      'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.05) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(67,56,202,0.04) 0%, transparent 40%)',
  },
  social: {
    backgroundImage:
      'radial-gradient(circle at 40% 40%, rgba(59,130,246,0.04) 0%, transparent 40%), radial-gradient(circle at 60% 60%, rgba(96,165,250,0.03) 0%, transparent 40%)',
  },
  concert: {
    backgroundImage:
      'radial-gradient(circle at 30% 70%, rgba(236,72,153,0.05) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(168,85,247,0.04) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(251,191,36,0.03) 0%, transparent 30%)',
  },
  digital: {
    backgroundImage:
      'linear-gradient(0deg, rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  },
  coins: {
    backgroundImage:
      'radial-gradient(circle at 25% 35%, rgba(234,179,8,0.05) 0%, transparent 35%), radial-gradient(circle at 75% 65%, rgba(251,191,36,0.04) 0%, transparent 35%)',
  },
  dna: {
    backgroundImage:
      'repeating-linear-gradient(45deg, rgba(34,197,94,0.02) 0px, transparent 4px, transparent 12px), repeating-linear-gradient(-45deg, rgba(59,130,246,0.02) 0px, transparent 4px, transparent 12px)',
  },
  default: {
    backgroundImage:
      'radial-gradient(circle at 50% 50%, rgba(255,107,232,0.04) 0%, transparent 50%)',
  },
};

/** 診断IDごとのテーママッピング */
const THEME_MAP: Record<string, { bgPattern: string; accentEmoji: string }> = {
  // 恋愛・感情系
  love:       { bgPattern: 'hearts',   accentEmoji: '💕' },
  mental:     { bgPattern: 'waves',    accentEmoji: '🛡️' },
  stress:     { bgPattern: 'clouds',   accentEmoji: '🌿' },
  friendship: { bgPattern: 'warm',     accentEmoji: '🤝' },
  impression: { bgPattern: 'mirror',   accentEmoji: '🪞' },

  // 能力・適性系
  talent:     { bgPattern: 'sparkle',  accentEmoji: '⭐' },
  career:     { bgPattern: 'tech',     accentEmoji: '🚀' },
  job:        { bgPattern: 'tech',     accentEmoji: '🧭' },
  leadership: { bgPattern: 'grid',     accentEmoji: '👑' },
  creative:   { bgPattern: 'paint',    accentEmoji: '🎨' },
  learning:   { bgPattern: 'notebook', accentEmoji: '📚' },
  brain:      { bgPattern: 'neural',   accentEmoji: '🧠' },

  // 神秘・エンタメ系
  spirit:     { bgPattern: 'mystic',   accentEmoji: '🔮' },
  isekai:     { bgPattern: 'fantasy',  accentEmoji: '⚔️' },
  pastlife:   { bgPattern: 'vintage',  accentEmoji: '⏳' },
  shadow:     { bgPattern: 'dark',     accentEmoji: '🎭' },
  chrono:     { bgPattern: 'night',    accentEmoji: '🌙' },

  // ソーシャル系
  commu:      { bgPattern: 'social',   accentEmoji: '💬' },
  oshi:       { bgPattern: 'concert',  accentEmoji: '🎪' },
  sns:        { bgPattern: 'digital',  accentEmoji: '📱' },
  money:      { bgPattern: 'coins',    accentEmoji: '💰' },

  // MBTI
  mbti128:    { bgPattern: 'dna',      accentEmoji: '🧬' },
};

/**
 * 診断IDからテーマ情報を取得する
 */
export function getDiagnosticTheme(id: string): DiagnosticTheme {
  const mapping = THEME_MAP[id] || { bgPattern: 'default', accentEmoji: '✨' };
  const bgStyle = BG_PATTERNS[mapping.bgPattern] || BG_PATTERNS.default;

  return {
    bgPattern: mapping.bgPattern,
    bgStyle,
    accentEmoji: mapping.accentEmoji,
  };
}

/**
 * 診断IDに応じたローディングステップテキストを取得する
 */
export function getLoadingSteps(id: string): { label: string; delay: number }[] {
  const stepsMap: Record<string, { label: string; delay: number }[]> = {
    love: [
      { label: '恋愛パターンを分析中...', delay: 0 },
      { label: '感情の傾向を読み取り中...', delay: 800 },
      { label: '相性パラメータを計算中...', delay: 1800 },
      { label: 'あなたの恋愛タイプを判定中...', delay: 2800 },
      { label: '結果をまとめています...', delay: 3800 },
    ],
    mental: [
      { label: 'メンタルデータを収集中...', delay: 0 },
      { label: 'ストレス耐性を測定中...', delay: 800 },
      { label: '心の強さを分析中...', delay: 1800 },
      { label: 'メンタルタイプを照合中...', delay: 2800 },
      { label: '結果を生成中...', delay: 3800 },
    ],
    stress: [
      { label: 'ストレス反応を分析中...', delay: 0 },
      { label: 'リラックス傾向を測定中...', delay: 800 },
      { label: '対処パターンを解析中...', delay: 1800 },
      { label: 'あなたのタイプを判定中...', delay: 2800 },
      { label: '結果をまとめています...', delay: 3800 },
    ],
    career: [
      { label: '適性データを収集中...', delay: 0 },
      { label: 'スキル傾向を分析中...', delay: 800 },
      { label: 'キャリアパスを計算中...', delay: 1800 },
      { label: '最適な道を判定中...', delay: 2800 },
      { label: '結果を生成中...', delay: 3800 },
    ],
    isekai: [
      { label: '異世界を探索中...', delay: 0 },
      { label: '魔力適性を測定中...', delay: 800 },
      { label: '冒険者ギルドに問い合わせ中...', delay: 1800 },
      { label: '運命の職業を判定中...', delay: 2800 },
      { label: '転生先を確定中...', delay: 3800 },
    ],
    spirit: [
      { label: '精神エネルギーを感知中...', delay: 0 },
      { label: 'オーラの色を読み取り中...', delay: 800 },
      { label: '守護存在を探索中...', delay: 1800 },
      { label: 'スピリチュアルタイプを判定中...', delay: 2800 },
      { label: '結果を降ろしています...', delay: 3800 },
    ],
    pastlife: [
      { label: '前世の記憶を探索中...', delay: 0 },
      { label: '魂の記録を読み解き中...', delay: 800 },
      { label: '時代を特定中...', delay: 1800 },
      { label: '前世の姿を判定中...', delay: 2800 },
      { label: '結果をまとめています...', delay: 3800 },
    ],
    shadow: [
      { label: '深層心理にアクセス中...', delay: 0 },
      { label: '影の人格を分析中...', delay: 800 },
      { label: '無意識パターンを解読中...', delay: 1800 },
      { label: 'シャドウタイプを判定中...', delay: 2800 },
      { label: '結果を生成中...', delay: 3800 },
    ],
    creative: [
      { label: '創造性データを収集中...', delay: 0 },
      { label: 'アート適性を測定中...', delay: 800 },
      { label: 'インスピレーション源を分析中...', delay: 1800 },
      { label: 'クリエイタータイプを判定中...', delay: 2800 },
      { label: '結果をまとめています...', delay: 3800 },
    ],
    brain: [
      { label: '脳波パターンを分析中...', delay: 0 },
      { label: '思考回路をマッピング中...', delay: 800 },
      { label: '認知スタイルを解析中...', delay: 1800 },
      { label: '脳タイプを判定中...', delay: 2800 },
      { label: '結果を生成中...', delay: 3800 },
    ],
    mbti128: [
      { label: '性格データを収集中...', delay: 0 },
      { label: '128タイプを照合中...', delay: 800 },
      { label: '認知機能を分析中...', delay: 1800 },
      { label: 'パーソナリティを判定中...', delay: 2800 },
      { label: '結果を生成中...', delay: 3800 },
    ],
    money: [
      { label: '金銭感覚を分析中...', delay: 0 },
      { label: '投資適性を測定中...', delay: 800 },
      { label: '資産運用パターンを解析中...', delay: 1800 },
      { label: 'マネータイプを判定中...', delay: 2800 },
      { label: '結果をまとめています...', delay: 3800 },
    ],
  };

  return stepsMap[id] || [
    { label: '回答データを収集中...', delay: 0 },
    { label: '多次元スコアを計算中...', delay: 800 },
    { label: 'パターンを分析中...', delay: 1800 },
    { label: 'タイプを照合中...', delay: 2800 },
    { label: '結果を生成中...', delay: 3800 },
  ];
}
