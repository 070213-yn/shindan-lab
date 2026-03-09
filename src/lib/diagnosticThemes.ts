/**
 * 診断ごとのUIテーマ定義
 *
 * 各診断IDに応じた背景色・グラデーション・パーティクル・ブロブ・カードスタイルなどを定義。
 * 22診断すべてに個性的な世界観を持たせるための設定。
 */

/** パーティクルのタイプ */
export type ParticleType =
  | 'stars'
  | 'bubbles'
  | 'sparkles'
  | 'snow'
  | 'hearts'
  | 'leaves'
  | 'lightning'
  | 'orbs'
  | 'pixels'
  | 'none';

/** テーマ情報 */
export interface DiagnosticTheme {
  // 背景
  bgColor: string;           // 背景ベースカラー
  bgGradient: string;        // 背景グラデーションCSS
  bgPattern: string;         // パターン名（互換用）
  bgStyle: React.CSSProperties;

  // パーティクル
  particleColors: string[];   // パーティクルの色配列
  particleCount: number;      // パーティクルの数
  particleType: ParticleType;

  // ブロブ（装飾球）
  blob1Color: string;
  blob2Color: string;

  // UI
  cardBg: string;             // カード背景色
  cardBorder: string;         // カードボーダー色
  textPrimary: string;        // メインテキスト色
  textSecondary: string;      // サブテキスト色

  // アクセント
  accentEmoji: string;
}

/** 全12診断のテーマ定義（爽やかライトテーマ） */
const FULL_THEMES: Record<string, DiagnosticTheme> = {
  // ── mbti128: 淡いラベンダー ──
  mbti128: {
    bgColor: '#F0ECFF',
    bgGradient: 'linear-gradient(135deg, #F0ECFF 0%, #E8F0FF 50%, #F5ECFF 100%)',
    bgPattern: 'dna',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 25% 25%, rgba(139,92,246,0.06) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(99,102,241,0.05) 0%, transparent 40%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(139,92,246,0.12)',
    blob2Color: 'rgba(99,102,241,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(139,92,246,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🧬',
  },

  // ── talent: 淡いゴールド ──
  talent: {
    bgColor: '#FFF8E8',
    bgGradient: 'linear-gradient(135deg, #FFF8E8 0%, #FFF5E0 50%, #FFFAEC 100%)',
    bgPattern: 'sparkle',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 25% 25%, rgba(250,204,21,0.08) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(234,179,8,0.06) 0%, transparent 40%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(255,215,0,0.12)',
    blob2Color: 'rgba(255,193,7,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(255,215,0,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '⭐',
  },

  // ── spirit: 淡いブルー ──
  spirit: {
    bgColor: '#E8F0FF',
    bgGradient: 'linear-gradient(180deg, #E8F0FF 0%, #EDF4FF 50%, #E8EEFF 100%)',
    bgPattern: 'mystic',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(100,149,237,0.08) 0%, transparent 50%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(100,149,237,0.12)',
    blob2Color: 'rgba(70,130,230,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(100,149,237,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🔮',
  },

  // ── isekai: 淡いグリーン ──
  isekai: {
    bgColor: '#E8FFF0',
    bgGradient: 'linear-gradient(135deg, #E8FFF0 0%, #EDFFF5 50%, #E8FFEC 100%)',
    bgPattern: 'fantasy',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 20% 80%, rgba(34,197,94,0.07) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 40%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(34,197,94,0.12)',
    blob2Color: 'rgba(16,185,129,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(34,197,94,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '⚔️',
  },

  // ── mental: 淡いティール ──
  mental: {
    bgColor: '#E8FFFE',
    bgGradient: 'linear-gradient(180deg, #E8FFFE 0%, #ECFFFD 50%, #E8FAFF 100%)',
    bgPattern: 'waves',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.07) 0%, transparent 50%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(20,184,166,0.12)',
    blob2Color: 'rgba(34,211,238,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(20,184,166,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🛡️',
  },

  // ── shadow: 淡いレッド ──
  shadow: {
    bgColor: '#F5E8E8',
    bgGradient: 'linear-gradient(180deg, #F5E8E8 0%, #F8ECEC 50%, #F5EAEA 100%)',
    bgPattern: 'dark',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 50%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(220,38,38,0.1)',
    blob2Color: 'rgba(185,28,28,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(220,38,38,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🎭',
  },

  // ── pastlife: 淡いセピア ──
  pastlife: {
    bgColor: '#FFF5EC',
    bgGradient: 'linear-gradient(180deg, #FFF5EC 0%, #FFF8F0 50%, #FFF3E8 100%)',
    bgPattern: 'vintage',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(180,140,80,0.07) 0%, transparent 60%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(180,140,80,0.12)',
    blob2Color: 'rgba(160,120,60,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(180,140,80,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '⏳',
  },

  // ── stress: 淡いグリーン ──
  stress: {
    bgColor: '#EEFFF0',
    bgGradient: 'linear-gradient(180deg, #EEFFF0 0%, #F2FFF5 50%, #EEFFF2 100%)',
    bgPattern: 'clouds',
    bgStyle: {
      backgroundImage:
        'radial-gradient(ellipse at 30% 20%, rgba(134,239,172,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(167,243,208,0.05) 0%, transparent 60%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(74,222,128,0.1)',
    blob2Color: 'rgba(134,239,172,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(74,222,128,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🌿',
  },

  // ── money: 淡いマネーグリーン ──
  money: {
    bgColor: '#F0FFE8',
    bgGradient: 'linear-gradient(135deg, #F0FFE8 0%, #F5FFEE 50%, #EFFFE5 100%)',
    bgPattern: 'coins',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 25% 35%, rgba(234,179,8,0.06) 0%, transparent 35%), radial-gradient(circle at 75% 65%, rgba(74,222,128,0.05) 0%, transparent 35%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(34,197,94,0.12)',
    blob2Color: 'rgba(234,179,8,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(34,197,94,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '💰',
  },

  // ── job: 淡いティール ──
  job: {
    bgColor: '#E8F5FF',
    bgGradient: 'linear-gradient(135deg, #E8F5FF 0%, #EDF8FF 50%, #E8F2FF 100%)',
    bgPattern: 'tech',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 40% 40%, rgba(20,184,166,0.06) 0%, transparent 40%), radial-gradient(circle at 60% 60%, rgba(59,130,246,0.05) 0%, transparent 40%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(59,130,246,0.12)',
    blob2Color: 'rgba(20,184,166,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(20,184,166,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🧭',
  },

  // ── learning: 淡いイエロー ──
  learning: {
    bgColor: '#FFFAEC',
    bgGradient: 'linear-gradient(135deg, #FFFAEC 0%, #FFFCF0 50%, #FFF8E8 100%)',
    bgPattern: 'notebook',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(234,179,8,0.06) 0%, transparent 50%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(234,179,8,0.1)',
    blob2Color: 'rgba(180,140,80,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(234,179,8,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '📚',
  },

  // ── love: 淡いロマンティックピンク ──
  love: {
    bgColor: '#FFE8F0',
    bgGradient: 'linear-gradient(135deg, #FFE8F0 0%, #FFECF5 50%, #FFE5EC 100%)',
    bgPattern: 'hearts',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 20% 30%, rgba(236,72,153,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.05) 0%, transparent 50%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(236,72,153,0.12)',
    blob2Color: 'rgba(168,85,247,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(236,72,153,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '💕',
  },

  // ── torisetsu: 淡いピンク ──
  torisetsu: {
    bgColor: '#FFF0F5',
    bgGradient: 'linear-gradient(135deg, #FFF0F5 0%, #FFF5EB 50%, #FFF0F8 100%)',
    bgPattern: 'fresh',
    bgStyle: {},
    particleColors: ['rgba(244,114,182,0.3)', 'rgba(251,146,60,0.25)'],
    particleCount: 0,
    particleType: 'none' as const,
    blob1Color: 'rgba(244,114,182,0.1)',
    blob2Color: 'rgba(251,146,60,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(244,114,182,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '📋',
  },

  // ── deathcause: 淡いパープル ──
  deathcause: {
    bgColor: '#F0ECFF',
    bgGradient: 'linear-gradient(135deg, #F0ECFF 0%, #E8F0FF 50%, #F5ECFF 100%)',
    bgPattern: 'fresh',
    bgStyle: {},
    particleColors: ['rgba(139,92,246,0.3)', 'rgba(99,102,241,0.25)'],
    particleCount: 0,
    particleType: 'none' as const,
    blob1Color: 'rgba(139,92,246,0.1)',
    blob2Color: 'rgba(99,102,241,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(139,92,246,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '💀',
  },
};

/** デフォルトのテーマ（マッチしなかった場合用、淡いティール） */
const DEFAULT_THEME: DiagnosticTheme = {
  bgColor: '#F0FAFA',
  bgGradient: 'linear-gradient(135deg, #F0FAFA 0%, #E8F8F8 50%, #F0FAFF 100%)',
  bgPattern: 'default',
  bgStyle: {
    backgroundImage:
      'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.06) 0%, transparent 50%)',
  },
  particleColors: [],
  particleCount: 0,
  particleType: 'none',
  blob1Color: 'rgba(45,212,191,0.12)',
  blob2Color: 'rgba(56,189,248,0.1)',
  cardBg: 'rgba(255,255,255,0.7)',
  cardBorder: 'rgba(45,212,191,0.2)',
  textPrimary: '#0f1f2b',
  textSecondary: '#2d4a57',
  accentEmoji: '✨',
};

/**
 * 診断IDからテーマ情報を取得する
 */
export function getDiagnosticTheme(id: string): DiagnosticTheme {
  return FULL_THEMES[id] || DEFAULT_THEME;
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
