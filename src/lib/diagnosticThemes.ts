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

/** 全22診断のテーマ定義 */
const FULL_THEMES: Record<string, DiagnosticTheme> = {
  // ── mbti128: SF・未来的、ディープパープル宇宙 ──
  mbti128: {
    bgColor: '#0B0D2E',
    bgGradient: 'linear-gradient(135deg, #0B0D2E 0%, #1A0A3E 40%, #0D1B3E 100%)',
    bgPattern: 'dna',
    bgStyle: {
      backgroundImage:
        'repeating-linear-gradient(45deg, rgba(139,92,246,0.03) 0px, transparent 4px, transparent 12px), repeating-linear-gradient(-45deg, rgba(59,130,246,0.03) 0px, transparent 4px, transparent 12px)',
    },
    particleColors: ['#FF6BE8', '#7B5CFF', '#38BDF8', '#34D399', '#FBBF24'],
    particleCount: 60,
    particleType: 'sparkles',
    blob1Color: 'rgba(139,92,246,0.25)',
    blob2Color: 'rgba(59,130,246,0.2)',
    cardBg: 'rgba(139,92,246,0.08)',
    cardBorder: 'rgba(139,92,246,0.2)',
    textPrimary: '#E0D4FF',
    textSecondary: 'rgba(224,212,255,0.6)',
    accentEmoji: '🧬',
  },

  // ── talent: 豪華・王者、ゴールド×ダークネイビー ──
  talent: {
    bgColor: '#0A0E1A',
    bgGradient: 'linear-gradient(135deg, #0A0E1A 0%, #1A1500 40%, #0D0A00 100%)',
    bgPattern: 'sparkle',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 25% 25%, rgba(250,204,21,0.06) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(234,179,8,0.05) 0%, transparent 40%)',
    },
    particleColors: ['#FFD700', '#FFC107', '#FFE082', '#FFAB00'],
    particleCount: 50,
    particleType: 'sparkles',
    blob1Color: 'rgba(255,215,0,0.2)',
    blob2Color: 'rgba(255,193,7,0.15)',
    cardBg: 'rgba(255,215,0,0.06)',
    cardBorder: 'rgba(255,215,0,0.15)',
    textPrimary: '#FFF8DC',
    textSecondary: 'rgba(255,248,220,0.6)',
    accentEmoji: '⭐',
  },

  // ── spirit: 瞑想・スピリチュアル、深い藍色 ──
  spirit: {
    bgColor: '#060D1F',
    bgGradient: 'linear-gradient(180deg, #060D1F 0%, #0A1628 50%, #0D0F2A 100%)',
    bgPattern: 'mystic',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(100,149,237,0.06) 0%, transparent 50%), conic-gradient(from 0deg at 50% 50%, transparent, rgba(100,149,237,0.03), transparent, rgba(70,130,230,0.02), transparent)',
    },
    particleColors: ['#B0C4DE', '#87CEEB', '#E0E8FF'],
    particleCount: 30,
    particleType: 'orbs',
    blob1Color: 'rgba(100,149,237,0.2)',
    blob2Color: 'rgba(70,130,230,0.15)',
    cardBg: 'rgba(100,149,237,0.06)',
    cardBorder: 'rgba(100,149,237,0.15)',
    textPrimary: '#C8D8F0',
    textSecondary: 'rgba(200,216,240,0.6)',
    accentEmoji: '🔮',
  },

  // ── isekai: RPGファンタジー、暗い森のエメラルドグリーン ──
  isekai: {
    bgColor: '#060F0A',
    bgGradient: 'linear-gradient(135deg, #060F0A 0%, #0A1A0F 40%, #081510 100%)',
    bgPattern: 'fantasy',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 20% 80%, rgba(34,197,94,0.05) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.04) 0%, transparent 40%)',
    },
    particleColors: ['#86EFAC', '#4ADE80', '#A7F3D0', '#6EE7B7'],
    particleCount: 45,
    particleType: 'leaves',
    blob1Color: 'rgba(34,197,94,0.2)',
    blob2Color: 'rgba(16,185,129,0.15)',
    cardBg: 'rgba(34,197,94,0.06)',
    cardBorder: 'rgba(34,197,94,0.15)',
    textPrimary: '#D1FAE5',
    textSecondary: 'rgba(209,250,229,0.6)',
    accentEmoji: '⚔️',
  },

  // ── mental: 深海・静寂、穏やかなティール〜ダークシアン ──
  mental: {
    bgColor: '#041518',
    bgGradient: 'linear-gradient(180deg, #041518 0%, #06202A 50%, #041820 100%)',
    bgPattern: 'waves',
    bgStyle: {
      backgroundImage:
        'repeating-linear-gradient(135deg, rgba(20,184,166,0.02) 0px, transparent 8px, transparent 16px)',
    },
    particleColors: ['#67E8F9', '#5EEAD4', '#A5F3FC', '#99F6E4'],
    particleCount: 40,
    particleType: 'bubbles',
    blob1Color: 'rgba(20,184,166,0.2)',
    blob2Color: 'rgba(34,211,238,0.15)',
    cardBg: 'rgba(20,184,166,0.06)',
    cardBorder: 'rgba(20,184,166,0.15)',
    textPrimary: '#CCFBF1',
    textSecondary: 'rgba(204,251,241,0.6)',
    accentEmoji: '🛡️',
  },

  // ── commu: ポップ・明るい、オレンジ〜ウォームイエロー ──
  commu: {
    bgColor: '#1A0E00',
    bgGradient: 'linear-gradient(135deg, #1A0E00 0%, #1F1200 40%, #1A0F05 100%)',
    bgPattern: 'social',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 40% 40%, rgba(251,146,60,0.05) 0%, transparent 40%), radial-gradient(circle at 60% 60%, rgba(253,186,116,0.04) 0%, transparent 40%)',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(251,146,60,0.2)',
    blob2Color: 'rgba(253,186,116,0.15)',
    cardBg: 'rgba(251,146,60,0.06)',
    cardBorder: 'rgba(251,146,60,0.15)',
    textPrimary: '#FFF3E0',
    textSecondary: 'rgba(255,243,224,0.6)',
    accentEmoji: '💬',
  },

  // ── oshi: アイドル・ライブ会場、ネオンピンク×パープル ──
  oshi: {
    bgColor: '#1A0520',
    bgGradient: 'linear-gradient(135deg, #1A0520 0%, #200A28 40%, #150818 100%)',
    bgPattern: 'concert',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 30% 70%, rgba(236,72,153,0.06) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(168,85,247,0.05) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(251,191,36,0.03) 0%, transparent 30%)',
    },
    particleColors: ['#FF69B4', '#FF1493', '#FF6EB4', '#FFB6C1'],
    particleCount: 50,
    particleType: 'hearts',
    blob1Color: 'rgba(236,72,153,0.25)',
    blob2Color: 'rgba(168,85,247,0.2)',
    cardBg: 'rgba(236,72,153,0.06)',
    cardBorder: 'rgba(236,72,153,0.18)',
    textPrimary: '#FFE4F0',
    textSecondary: 'rgba(255,228,240,0.6)',
    accentEmoji: '🎪',
  },

  // ── career: ビジネス・クール、ダークブルー×シルバー ──
  career: {
    bgColor: '#06091A',
    bgGradient: 'linear-gradient(135deg, #06091A 0%, #0A1025 40%, #080D1E 100%)',
    bgPattern: 'tech',
    bgStyle: {
      backgroundImage:
        'linear-gradient(0deg, rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
    },
    particleColors: ['#A5B4FC', '#C7D2FE', '#E0E7FF'],
    particleCount: 40,
    particleType: 'pixels',
    blob1Color: 'rgba(99,102,241,0.2)',
    blob2Color: 'rgba(165,180,252,0.15)',
    cardBg: 'rgba(99,102,241,0.06)',
    cardBorder: 'rgba(99,102,241,0.15)',
    textPrimary: '#E0E7FF',
    textSecondary: 'rgba(224,231,255,0.6)',
    accentEmoji: '🚀',
  },

  // ── shadow: ダーク・ゴシック、真っ黒に赤アクセント ──
  shadow: {
    bgColor: '#0A0505',
    bgGradient: 'linear-gradient(180deg, #0A0505 0%, #120808 50%, #0D0606 100%)',
    bgPattern: 'dark',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 50%)',
    },
    particleColors: ['#EF4444', '#DC2626', '#FCA5A5'],
    particleCount: 15,
    particleType: 'lightning',
    blob1Color: 'rgba(220,38,38,0.2)',
    blob2Color: 'rgba(185,28,28,0.15)',
    cardBg: 'rgba(220,38,38,0.05)',
    cardBorder: 'rgba(220,38,38,0.15)',
    textPrimary: '#FEE2E2',
    textSecondary: 'rgba(254,226,226,0.55)',
    accentEmoji: '🎭',
  },

  // ── sns: デジタル・サイバーパンク、ネオングリーン×ブルー ──
  sns: {
    bgColor: '#030D0A',
    bgGradient: 'linear-gradient(135deg, #030D0A 0%, #051510 40%, #040F10 100%)',
    bgPattern: 'digital',
    bgStyle: {
      backgroundImage:
        'linear-gradient(0deg, rgba(34,211,238,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.02) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
    particleColors: ['#22D3EE', '#34D399', '#6EE7B7', '#67E8F9'],
    particleCount: 50,
    particleType: 'pixels',
    blob1Color: 'rgba(34,211,238,0.2)',
    blob2Color: 'rgba(52,211,153,0.15)',
    cardBg: 'rgba(34,211,238,0.05)',
    cardBorder: 'rgba(34,211,238,0.15)',
    textPrimary: '#D1FAE5',
    textSecondary: 'rgba(209,250,229,0.6)',
    accentEmoji: '📱',
  },

  // ── pastlife: ノスタルジック・古風、セピアトーン ──
  pastlife: {
    bgColor: '#14100A',
    bgGradient: 'linear-gradient(180deg, #14100A 0%, #1A150E 50%, #110D08 100%)',
    bgPattern: 'vintage',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(180,140,80,0.06) 0%, transparent 60%)',
    },
    particleColors: ['#FFF8DC', '#FAEBD7', '#F5DEB3'],
    particleCount: 30,
    particleType: 'snow',
    blob1Color: 'rgba(180,140,80,0.2)',
    blob2Color: 'rgba(160,120,60,0.15)',
    cardBg: 'rgba(180,140,80,0.06)',
    cardBorder: 'rgba(180,140,80,0.15)',
    textPrimary: '#F5DEB3',
    textSecondary: 'rgba(245,222,179,0.6)',
    accentEmoji: '⏳',
  },

  // ── leadership: 威厳・王宮、ロイヤルブルー×ゴールド ──
  leadership: {
    bgColor: '#0A0A1E',
    bgGradient: 'linear-gradient(135deg, #0A0A1E 0%, #0D1030 40%, #0A0B20 100%)',
    bgPattern: 'grid',
    bgStyle: {
      backgroundImage:
        'linear-gradient(0deg, rgba(255,215,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.02) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    },
    particleColors: ['#FFD700', '#FFC107', '#FBBF24'],
    particleCount: 40,
    particleType: 'sparkles',
    blob1Color: 'rgba(59,130,246,0.2)',
    blob2Color: 'rgba(255,215,0,0.15)',
    cardBg: 'rgba(59,130,246,0.06)',
    cardBorder: 'rgba(255,215,0,0.12)',
    textPrimary: '#E0E8FF',
    textSecondary: 'rgba(224,232,255,0.6)',
    accentEmoji: '👑',
  },

  // ── creative: アーティスティック、カラフル虹色 ──
  creative: {
    bgColor: '#100818',
    bgGradient: 'linear-gradient(135deg, #100818 0%, #0D0A20 30%, #081018 60%, #0A1510 100%)',
    bgPattern: 'paint',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 15% 50%, rgba(236,72,153,0.05) 0%, transparent 35%), radial-gradient(circle at 85% 30%, rgba(59,130,246,0.05) 0%, transparent 35%), radial-gradient(circle at 50% 80%, rgba(234,179,8,0.04) 0%, transparent 35%)',
    },
    particleColors: ['#FF6BE8', '#7B5CFF', '#38BDF8', '#34D399', '#FBBF24', '#FB923C'],
    particleCount: 55,
    particleType: 'sparkles',
    blob1Color: 'rgba(236,72,153,0.2)',
    blob2Color: 'rgba(59,130,246,0.15)',
    cardBg: 'rgba(168,85,247,0.06)',
    cardBorder: 'rgba(168,85,247,0.15)',
    textPrimary: '#F0E4FF',
    textSecondary: 'rgba(240,228,255,0.6)',
    accentEmoji: '🎨',
  },

  // ── stress: 癒し・ナチュラル、穏やかなグリーン ──
  stress: {
    bgColor: '#060F08',
    bgGradient: 'linear-gradient(180deg, #060F08 0%, #0A180D 50%, #081210 100%)',
    bgPattern: 'clouds',
    bgStyle: {
      backgroundImage:
        'radial-gradient(ellipse at 30% 20%, rgba(134,239,172,0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(167,243,208,0.04) 0%, transparent 60%)',
    },
    particleColors: ['#BBF7D0', '#A7F3D0', '#D1FAE5'],
    particleCount: 35,
    particleType: 'leaves',
    blob1Color: 'rgba(74,222,128,0.18)',
    blob2Color: 'rgba(134,239,172,0.12)',
    cardBg: 'rgba(74,222,128,0.06)',
    cardBorder: 'rgba(74,222,128,0.12)',
    textPrimary: '#DCFCE7',
    textSecondary: 'rgba(220,252,231,0.6)',
    accentEmoji: '🌿',
  },

  // ── friendship: 温もり、暖かいオレンジ〜ピーチ ──
  friendship: {
    bgColor: '#1A0D05',
    bgGradient: 'linear-gradient(135deg, #1A0D05 0%, #1F1008 40%, #180C04 100%)',
    bgPattern: 'warm',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.05) 0%, transparent 60%)',
    },
    particleColors: ['#FDBA74', '#FB923C', '#FED7AA'],
    particleCount: 35,
    particleType: 'bubbles',
    blob1Color: 'rgba(251,146,60,0.2)',
    blob2Color: 'rgba(253,186,116,0.15)',
    cardBg: 'rgba(251,146,60,0.06)',
    cardBorder: 'rgba(251,146,60,0.12)',
    textPrimary: '#FFF3E0',
    textSecondary: 'rgba(255,243,224,0.6)',
    accentEmoji: '🤝',
  },

  // ── chrono: 宇宙・時間、深い紺×星空 ──
  chrono: {
    bgColor: '#050718',
    bgGradient: 'linear-gradient(180deg, #050718 0%, #0A0D28 50%, #060820 100%)',
    bgPattern: 'night',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.05) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(67,56,202,0.04) 0%, transparent 40%)',
    },
    particleColors: ['#FFFFFF', '#C7D2FE', '#A5B4FC', '#E0E7FF'],
    particleCount: 70,
    particleType: 'stars',
    blob1Color: 'rgba(99,102,241,0.2)',
    blob2Color: 'rgba(67,56,202,0.15)',
    cardBg: 'rgba(99,102,241,0.06)',
    cardBorder: 'rgba(99,102,241,0.12)',
    textPrimary: '#E0E7FF',
    textSecondary: 'rgba(224,231,255,0.6)',
    accentEmoji: '🌙',
  },

  // ── money: 富・高級感、ダークグリーン×ゴールド ──
  money: {
    bgColor: '#050D05',
    bgGradient: 'linear-gradient(135deg, #050D05 0%, #0A1808 40%, #081005 100%)',
    bgPattern: 'coins',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 25% 35%, rgba(234,179,8,0.05) 0%, transparent 35%), radial-gradient(circle at 75% 65%, rgba(74,222,128,0.04) 0%, transparent 35%)',
    },
    particleColors: ['#FFD700', '#34D399', '#A7F3D0', '#FBBF24'],
    particleCount: 40,
    particleType: 'sparkles',
    blob1Color: 'rgba(34,197,94,0.2)',
    blob2Color: 'rgba(234,179,8,0.15)',
    cardBg: 'rgba(34,197,94,0.06)',
    cardBorder: 'rgba(234,179,8,0.12)',
    textPrimary: '#D1FAE5',
    textSecondary: 'rgba(209,250,229,0.6)',
    accentEmoji: '💰',
  },

  // ── impression: エレガント、ローズゴールド×ベージュ ──
  impression: {
    bgColor: '#150D10',
    bgGradient: 'linear-gradient(135deg, #150D10 0%, #1A1015 40%, #120A0E 100%)',
    bgPattern: 'mirror',
    bgStyle: {
      backgroundImage:
        'linear-gradient(180deg, rgba(244,143,177,0.04) 0%, transparent 40%), linear-gradient(0deg, rgba(244,143,177,0.03) 0%, transparent 40%)',
    },
    particleColors: ['#F48FB1', '#F8BBD0', '#FCE4EC'],
    particleCount: 25,
    particleType: 'orbs',
    blob1Color: 'rgba(244,143,177,0.2)',
    blob2Color: 'rgba(248,187,208,0.15)',
    cardBg: 'rgba(244,143,177,0.06)',
    cardBorder: 'rgba(244,143,177,0.12)',
    textPrimary: '#FCE4EC',
    textSecondary: 'rgba(252,228,236,0.6)',
    accentEmoji: '🪞',
  },

  // ── brain: テック・ハッカー、マトリックス風ダークグリーン ──
  brain: {
    bgColor: '#020A02',
    bgGradient: 'linear-gradient(180deg, #020A02 0%, #041205 50%, #030D03 100%)',
    bgPattern: 'neural',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 30% 40%, rgba(34,197,94,0.04) 0%, transparent 30%), radial-gradient(circle at 70% 60%, rgba(74,222,128,0.03) 0%, transparent 30%)',
    },
    particleColors: ['#22C55E', '#4ADE80', '#86EFAC'],
    particleCount: 55,
    particleType: 'pixels',
    blob1Color: 'rgba(34,197,94,0.18)',
    blob2Color: 'rgba(74,222,128,0.12)',
    cardBg: 'rgba(34,197,94,0.05)',
    cardBorder: 'rgba(34,197,94,0.12)',
    textPrimary: '#DCFCE7',
    textSecondary: 'rgba(220,252,231,0.6)',
    accentEmoji: '🧠',
  },

  // ── job: プロフェッショナル、ネイビー×ティール ──
  job: {
    bgColor: '#050A14',
    bgGradient: 'linear-gradient(135deg, #050A14 0%, #08101E 40%, #061018 100%)',
    bgPattern: 'tech',
    bgStyle: {
      backgroundImage:
        'linear-gradient(0deg, rgba(20,184,166,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)',
      backgroundSize: '25px 25px',
    },
    particleColors: ['#38BDF8', '#5EEAD4', '#67E8F9'],
    particleCount: 35,
    particleType: 'bubbles',
    blob1Color: 'rgba(59,130,246,0.2)',
    blob2Color: 'rgba(20,184,166,0.15)',
    cardBg: 'rgba(59,130,246,0.06)',
    cardBorder: 'rgba(20,184,166,0.12)',
    textPrimary: '#E0F2FE',
    textSecondary: 'rgba(224,242,254,0.6)',
    accentEmoji: '🧭',
  },

  // ── learning: 温かみのある知的、ブックイエロー×ブラウン ──
  learning: {
    bgColor: '#12100A',
    bgGradient: 'linear-gradient(135deg, #12100A 0%, #18150E 40%, #100E08 100%)',
    bgPattern: 'notebook',
    bgStyle: {
      backgroundImage:
        'linear-gradient(0deg, rgba(180,140,80,0.025) 1px, transparent 1px)',
      backgroundSize: '100% 24px',
    },
    particleColors: [],
    particleCount: 0,
    particleType: 'none',
    blob1Color: 'rgba(234,179,8,0.18)',
    blob2Color: 'rgba(180,140,80,0.12)',
    cardBg: 'rgba(234,179,8,0.06)',
    cardBorder: 'rgba(180,140,80,0.12)',
    textPrimary: '#FEF3C7',
    textSecondary: 'rgba(254,243,199,0.6)',
    accentEmoji: '📚',
  },

  // ── love: ロマンチック、ピンク×パープル ──
  love: {
    bgColor: '#1A0515',
    bgGradient: 'linear-gradient(135deg, #1A0515 0%, #200A20 40%, #150810 100%)',
    bgPattern: 'hearts',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 20% 30%, rgba(236,72,153,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.05) 0%, transparent 50%)',
    },
    particleColors: ['#FF69B4', '#DA70D6', '#FF6EB4', '#DDA0DD'],
    particleCount: 45,
    particleType: 'hearts',
    blob1Color: 'rgba(236,72,153,0.25)',
    blob2Color: 'rgba(168,85,247,0.18)',
    cardBg: 'rgba(236,72,153,0.06)',
    cardBorder: 'rgba(236,72,153,0.15)',
    textPrimary: '#FFE4F0',
    textSecondary: 'rgba(255,228,240,0.6)',
    accentEmoji: '💕',
  },
};

/** デフォルトのテーマ（マッチしなかった場合用） */
const DEFAULT_THEME: DiagnosticTheme = {
  bgColor: '#0D0118',
  bgGradient: 'linear-gradient(135deg, #0D0118 0%, #130520 40%, #0A0115 100%)',
  bgPattern: 'default',
  bgStyle: {
    backgroundImage:
      'radial-gradient(circle at 50% 50%, rgba(255,107,232,0.04) 0%, transparent 50%)',
  },
  particleColors: ['#FF6BE8', '#C45AFF', '#7B5CFF'],
  particleCount: 40,
  particleType: 'stars',
  blob1Color: 'rgba(255,107,232,0.2)',
  blob2Color: 'rgba(196,90,255,0.15)',
  cardBg: 'rgba(255,107,232,0.05)',
  cardBorder: 'rgba(255,107,232,0.12)',
  textPrimary: '#F0E4FF',
  textSecondary: 'rgba(240,228,255,0.6)',
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
