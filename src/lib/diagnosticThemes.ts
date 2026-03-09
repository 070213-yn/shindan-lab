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

/** セクション切り替え時の演出スタイル */
export type SectionTransitionStyle = 'fade' | 'slide' | 'zoom' | 'flip' | 'dissolve';

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

  // 診断固有のSVG装飾（背景に浮かぶモチーフ）
  svgMotifs?: string[];
  // 固有のCSSアニメーション名
  uniqueAnimation?: string;
  // セクション切り替え時の演出スタイル
  sectionTransitionStyle?: SectionTransitionStyle;
  // ランディングページの装飾SVG（メインビジュアル下）
  landingSvg?: string;
  // ボタン装飾スタイル
  buttonStyle?: 'flask' | 'wand' | 'sword' | 'shield' | 'scroll' | 'gem' | 'compass' | 'ribbon' | 'skull' | 'coin' | 'book' | 'heart' | 'default';
  // 実験担当者のフレーバーテキスト
  labDirector?: string;
}

/** 全12診断のテーマ定義（爽やかライトテーマ） */
const FULL_THEMES: Record<string, DiagnosticTheme> = {
  // ── mbti128: DNA螺旋モチーフ、紫のグラデーション ──
  mbti128: {
    bgColor: '#F0ECFF',
    bgGradient: 'linear-gradient(135deg, #F0ECFF 0%, #E8F0FF 50%, #F5ECFF 100%)',
    bgPattern: 'dna',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 25% 25%, rgba(139,92,246,0.06) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(99,102,241,0.05) 0%, transparent 40%)',
    },
    particleColors: ['rgba(139,92,246,0.25)', 'rgba(99,102,241,0.2)', 'rgba(168,85,247,0.2)'],
    particleCount: 18,
    particleType: 'orbs',
    blob1Color: 'rgba(139,92,246,0.12)',
    blob2Color: 'rgba(99,102,241,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(139,92,246,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🧬',
    svgMotifs: [
      // DNA螺旋ストランド1
      '<path d="M10 0 Q20 10 10 20 Q0 30 10 40 Q20 50 10 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
      // DNA螺旋ストランド2
      '<path d="M10 0 Q0 10 10 20 Q20 30 10 40 Q0 50 10 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
      // 横のブリッジ（塩基対）
      '<line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><line x1="4" y1="30" x2="16" y2="30" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><line x1="4" y1="50" x2="16" y2="50" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>',
      // 小さな分子記号
      '<circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.3"/><line x1="13" y1="9" x2="16" y2="7" stroke="currentColor" stroke-width="1"/>',
      // 二重らせん（ミニ版）
      '<path d="M5 0 C15 5 5 15 15 20 C5 25 15 35 5 40" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>',
    ],
    uniqueAnimation: 'dnaRotate',
    sectionTransitionStyle: 'dissolve',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M40 10 Q60 30 40 50 Q20 70 40 90 Q60 110 40 130" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.3"/><path d="M80 10 Q60 30 80 50 Q100 70 80 90 Q60 110 80 130" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.3"/><line x1="42" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2" opacity="0.2"/><line x1="42" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="2" opacity="0.2"/><line x1="42" y1="70" x2="78" y2="70" stroke="currentColor" stroke-width="2" opacity="0.2"/><line x1="42" y1="90" x2="78" y2="90" stroke="currentColor" stroke-width="2" opacity="0.2"/></svg>',
    buttonStyle: 'flask',
    labDirector: '遺伝子解析室 室長: ヘリックス博士',
  },

  // ── talent: 星と王冠モチーフ、金色のキラキラ ──
  talent: {
    bgColor: '#FFF8E8',
    bgGradient: 'linear-gradient(135deg, #FFF8E8 0%, #FFF5E0 50%, #FFFAEC 100%)',
    bgPattern: 'sparkle',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 25% 25%, rgba(250,204,21,0.08) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(234,179,8,0.06) 0%, transparent 40%)',
    },
    particleColors: ['rgba(255,215,0,0.35)', 'rgba(255,193,7,0.3)', 'rgba(234,179,8,0.25)'],
    particleCount: 25,
    particleType: 'sparkles',
    blob1Color: 'rgba(255,215,0,0.12)',
    blob2Color: 'rgba(255,193,7,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(255,215,0,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '⭐',
    svgMotifs: [
      // 五芒星
      '<polygon points="10,0 12.5,7 20,7 14,11.5 16,19 10,14 4,19 6,11.5 0,7 7.5,7" fill="currentColor" opacity="0.3"/>',
      // 王冠
      '<path d="M2 18 L2 10 L6 14 L10 6 L14 14 L18 10 L18 18 Z" fill="currentColor" opacity="0.25"/>',
      // 宝石（ダイヤモンド型）
      '<path d="M10 2 L18 8 L10 18 L2 8 Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.35"/><line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="1" opacity="0.2"/>',
      // キラキラ四方向
      '<path d="M10 0 L11 8 L20 10 L11 12 L10 20 L9 12 L0 10 L9 8 Z" fill="currentColor" opacity="0.2"/>',
      // 小さな星のクラスタ
      '<circle cx="5" cy="5" r="1.5" fill="currentColor" opacity="0.4"/><circle cx="15" cy="8" r="1" fill="currentColor" opacity="0.3"/><circle cx="10" cy="15" r="1.2" fill="currentColor" opacity="0.35"/>',
    ],
    uniqueAnimation: 'gemSparkle',
    sectionTransitionStyle: 'zoom',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M30 70 L30 45 L40 55 L60 25 L80 55 L90 45 L90 70 Z" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="2" stroke-opacity="0.3"/><polygon points="60,8 63,18 73,18 65,24 68,34 60,28 52,34 55,24 47,18 57,18" fill="currentColor" opacity="0.25"/><polygon points="30,20 31.5,25 37,25 33,28 34,33 30,30 26,33 27,28 23,25 28.5,25" fill="currentColor" opacity="0.15"/><polygon points="90,20 91.5,25 97,25 93,28 94,33 90,30 86,33 87,28 83,25 88.5,25" fill="currentColor" opacity="0.15"/></svg>',
    buttonStyle: 'gem',
    labDirector: '才能研究室 室長: クラウン博士',
  },

  // ── spirit: 魔法陣モチーフ、青い神秘的な光 ──
  spirit: {
    bgColor: '#E8F0FF',
    bgGradient: 'linear-gradient(180deg, #E8F0FF 0%, #EDF4FF 50%, #E8EEFF 100%)',
    bgPattern: 'mystic',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(100,149,237,0.08) 0%, transparent 50%)',
    },
    particleColors: ['rgba(100,149,237,0.3)', 'rgba(70,130,230,0.25)', 'rgba(147,197,253,0.2)'],
    particleCount: 15,
    particleType: 'orbs',
    blob1Color: 'rgba(100,149,237,0.12)',
    blob2Color: 'rgba(70,130,230,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(100,149,237,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🔮',
    svgMotifs: [
      // 魔法陣（外円＋内円＋星）
      '<circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/><circle cx="15" cy="15" r="9" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.25"/><polygon points="15,2 18,11 27,11 20,17 22,26 15,21 8,26 10,17 3,11 12,11" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>',
      // 三日月
      '<path d="M15 3 A12 12 0 1 1 15 27 A8 8 0 1 0 15 3 Z" fill="currentColor" opacity="0.15"/>',
      // 波紋（同心円）
      '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4"/><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.25"/><circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.15"/>',
      // 神秘的な目
      '<path d="M3 10 Q10 2 17 10 Q10 18 3 10 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/><circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.2"/>',
      // ルーン文字風
      '<path d="M5 2 L10 10 L5 18 M5 10 L15 10" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.25"/>',
    ],
    uniqueAnimation: 'auraRipple',
    sectionTransitionStyle: 'dissolve',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="2" opacity="0.2"/><circle cx="60" cy="60" r="35" stroke="currentColor" stroke-width="1.5" opacity="0.15"/><circle cx="60" cy="60" r="20" stroke="currentColor" stroke-width="1" opacity="0.1"/><polygon points="60,12 72,40 104,40 78,58 86,88 60,70 34,88 42,58 16,40 48,40" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.2"/></svg>',
    buttonStyle: 'wand',
    labDirector: '霊性研究室 室長: ミスティカ博士',
  },

  // ── isekai: 剣と盾モチーフ、緑のファンタジー感 ──
  isekai: {
    bgColor: '#E8FFF0',
    bgGradient: 'linear-gradient(135deg, #E8FFF0 0%, #EDFFF5 50%, #E8FFEC 100%)',
    bgPattern: 'fantasy',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 20% 80%, rgba(34,197,94,0.07) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 40%)',
    },
    particleColors: ['rgba(34,197,94,0.25)', 'rgba(16,185,129,0.2)', 'rgba(74,222,128,0.2)'],
    particleCount: 20,
    particleType: 'sparkles',
    blob1Color: 'rgba(34,197,94,0.12)',
    blob2Color: 'rgba(16,185,129,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(34,197,94,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '⚔️',
    svgMotifs: [
      // 剣
      '<path d="M10 2 L10 16 M7 16 L13 16 M10 16 L10 20 M7 20 L13 20" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3"/><path d="M9 2 L10 0 L11 2" fill="currentColor" opacity="0.3"/>',
      // 盾
      '<path d="M10 3 L18 6 L18 13 Q18 20 10 23 Q2 20 2 13 L2 6 Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"/><path d="M10 7 L10 18" stroke="currentColor" stroke-width="1" opacity="0.15"/><path d="M5 11 L15 11" stroke="currentColor" stroke-width="1" opacity="0.15"/>',
      // クリスタル
      '<path d="M10 2 L15 8 L12 20 L8 20 L5 8 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><line x1="5" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="0.8" opacity="0.15"/>',
      // スクロール（巻物）
      '<rect x="5" y="4" width="14" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" stroke-width="0.6" opacity="0.15"/><line x1="7" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="0.6" opacity="0.15"/><line x1="7" y1="14" x2="13" y2="14" stroke="currentColor" stroke-width="0.6" opacity="0.15"/>',
      // ポーション瓶
      '<path d="M8 2 L12 2 L12 6 L16 14 Q16 20 10 20 Q4 20 4 14 L8 6 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.25"/>',
    ],
    uniqueAnimation: 'questPulse',
    sectionTransitionStyle: 'slide',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M50 15 L50 75 M38 75 L62 75 M50 75 L50 90 M40 90 L60 90" stroke="currentColor" stroke-width="3" opacity="0.2" stroke-linecap="round"/><path d="M48 15 L50 8 L52 15" fill="currentColor" opacity="0.25"/><path d="M75 30 L95 35 L95 55 Q95 75 75 85 Q55 75 55 55 L55 35 Z" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/></svg>',
    buttonStyle: 'sword',
    labDirector: '異世界転生研究室 室長: ガイア博士',
  },

  // ── mental: ハートと盾モチーフ、ティールの安心感 ──
  mental: {
    bgColor: '#E8FFFE',
    bgGradient: 'linear-gradient(180deg, #E8FFFE 0%, #ECFFFD 50%, #E8FAFF 100%)',
    bgPattern: 'waves',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.07) 0%, transparent 50%)',
    },
    particleColors: ['rgba(20,184,166,0.2)', 'rgba(34,211,238,0.15)', 'rgba(45,212,191,0.18)'],
    particleCount: 12,
    particleType: 'bubbles',
    blob1Color: 'rgba(20,184,166,0.12)',
    blob2Color: 'rgba(34,211,238,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(20,184,166,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🛡️',
    svgMotifs: [
      // ハートと盾の融合
      '<path d="M10 18 Q2 12 2 7 Q2 2 7 2 Q10 2 10 6 Q10 2 13 2 Q18 2 18 7 Q18 12 10 18 Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"/>',
      // 波（水面）
      '<path d="M0 10 Q5 5 10 10 Q15 15 20 10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.2"/><path d="M0 15 Q5 10 10 15 Q15 20 20 15" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15"/>',
      // 保護のオーラ
      '<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2" stroke-dasharray="3 2"/>',
      // 手のひら
      '<path d="M8 18 Q4 14 4 10 Q4 6 8 4 L10 4 Q10 8 10 12 M12 18 Q16 14 16 10 Q16 6 12 4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>',
      // 安定の三角
      '<path d="M10 5 L17 17 L3 17 Z" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"/>',
    ],
    uniqueAnimation: 'waveRock',
    sectionTransitionStyle: 'fade',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M60 90 Q20 65 20 40 Q20 20 40 20 Q55 20 60 35 Q65 20 80 20 Q100 20 100 40 Q100 65 60 90 Z" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><path d="M60 75 Q35 58 35 42 Q35 30 47 30 Q55 30 60 40 Q65 30 73 30 Q85 30 85 42 Q85 58 60 75 Z" fill="currentColor" opacity="0.06"/></svg>',
    buttonStyle: 'shield',
    labDirector: 'メンタル研究室 室長: セレニティ博士',
  },

  // ── shadow: 仮面モチーフ、ダークレッドの影 ──
  shadow: {
    bgColor: '#F5E8E8',
    bgGradient: 'linear-gradient(180deg, #F5E8E8 0%, #F0E0E5 50%, #F5EAEA 100%)',
    bgPattern: 'dark',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 50%)',
    },
    particleColors: ['rgba(220,38,38,0.15)', 'rgba(185,28,28,0.12)', 'rgba(248,113,113,0.1)'],
    particleCount: 10,
    particleType: 'orbs',
    blob1Color: 'rgba(220,38,38,0.1)',
    blob2Color: 'rgba(185,28,28,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(220,38,38,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🎭',
    svgMotifs: [
      // 仮面（片方だけ）
      '<path d="M4 8 Q4 2 10 2 Q16 2 16 8 L16 12 Q16 16 13 17 L10 18 L7 17 Q4 16 4 12 Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"/><circle cx="7" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/><circle cx="13" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>',
      // 割れたミラー
      '<rect x="3" y="2" width="14" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><path d="M8 2 L12 10 L6 18" stroke="currentColor" stroke-width="0.8" opacity="0.3"/><path d="M12 5 L9 12" stroke="currentColor" stroke-width="0.6" opacity="0.2"/>',
      // 影の渦
      '<path d="M10 4 Q16 4 16 10 Q16 16 10 16 Q6 16 5 12" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"/><path d="M10 7 Q13 7 13 10 Q13 13 10 13" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.15"/>',
      // 闇の雫
      '<path d="M10 4 Q14 10 14 14 Q14 18 10 18 Q6 18 6 14 Q6 10 10 4 Z" fill="currentColor" opacity="0.12"/>',
      // 糸（マリオネット風）
      '<line x1="5" y1="0" x2="5" y2="12" stroke="currentColor" stroke-width="0.6" opacity="0.2"/><line x1="15" y1="0" x2="15" y2="12" stroke="currentColor" stroke-width="0.6" opacity="0.2"/><line x1="10" y1="0" x2="10" y2="8" stroke="currentColor" stroke-width="0.6" opacity="0.2"/><circle cx="10" cy="15" r="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15"/>',
    ],
    uniqueAnimation: 'mirrorCrack',
    sectionTransitionStyle: 'flip',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M35 40 Q35 20 60 20 Q85 20 85 40 L85 60 Q85 80 70 85 L60 90 L50 85 Q35 80 35 60 Z" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><ellipse cx="48" cy="48" rx="7" ry="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.2"/><ellipse cx="72" cy="48" rx="7" ry="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.2"/><path d="M55 68 Q60 72 65 68" stroke="currentColor" stroke-width="1.5" opacity="0.15"/></svg>',
    buttonStyle: 'skull',
    labDirector: '深層心理研究室 室長: シャドウ博士',
  },

  // ── pastlife: 砂時計モチーフ、セピアのノスタルジー ──
  pastlife: {
    bgColor: '#FFF5EC',
    bgGradient: 'linear-gradient(180deg, #FFF5EC 0%, #FFF0E5 50%, #FFF3E8 100%)',
    bgPattern: 'vintage',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(180,140,80,0.07) 0%, transparent 60%)',
    },
    particleColors: ['rgba(180,140,80,0.25)', 'rgba(160,120,60,0.2)', 'rgba(200,170,110,0.18)'],
    particleCount: 14,
    particleType: 'sparkles',
    blob1Color: 'rgba(180,140,80,0.12)',
    blob2Color: 'rgba(160,120,60,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(180,140,80,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '⏳',
    svgMotifs: [
      // 砂時計
      '<path d="M4 2 L16 2 L16 4 L10 10 L16 16 L16 18 L4 18 L4 16 L10 10 L4 4 Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"/>',
      // 時計の文字盤
      '<circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><line x1="10" y1="10" x2="10" y2="4" stroke="currentColor" stroke-width="1.2" opacity="0.3"/><line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" stroke-width="1" opacity="0.25"/>',
      // 古いカギ
      '<circle cx="8" cy="5" r="3" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"/><line x1="8" y1="8" x2="8" y2="18" stroke="currentColor" stroke-width="1.2" opacity="0.2"/><line x1="8" y1="14" x2="12" y2="14" stroke="currentColor" stroke-width="1" opacity="0.15"/><line x1="8" y1="17" x2="11" y2="17" stroke="currentColor" stroke-width="1" opacity="0.15"/>',
      // 巻物
      '<ellipse cx="4" cy="10" rx="2" ry="8" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><rect x="4" y="3" width="12" height="14" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.15"/><ellipse cx="16" cy="10" rx="2" ry="8" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>',
      // 羽ペン
      '<path d="M14 4 Q8 10 4 18 M14 4 Q16 6 14 8 Q10 12 8 14" stroke="currentColor" stroke-width="1" fill="none" opacity="0.2"/>',
    ],
    uniqueAnimation: 'clockSpin',
    sectionTransitionStyle: 'fade',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M35 15 L85 15 L85 25 L60 55 L85 85 L85 95 L35 95 L35 85 L60 55 L35 25 Z" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><circle cx="60" cy="55" r="3" fill="currentColor" opacity="0.1"/><path d="M48 70 Q55 62 60 70 Q65 62 72 70" fill="currentColor" opacity="0.06"/></svg>',
    buttonStyle: 'scroll',
    labDirector: '前世記録室 室長: クロノス博士',
  },

  // ── stress: 薬草と葉っぱモチーフ、グリーンの癒し ──
  stress: {
    bgColor: '#EEFFF0',
    bgGradient: 'linear-gradient(180deg, #EEFFF0 0%, #F2FFF5 50%, #EEFFF2 100%)',
    bgPattern: 'clouds',
    bgStyle: {
      backgroundImage:
        'radial-gradient(ellipse at 30% 20%, rgba(134,239,172,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(167,243,208,0.05) 0%, transparent 60%)',
    },
    particleColors: ['rgba(74,222,128,0.2)', 'rgba(134,239,172,0.18)', 'rgba(34,197,94,0.15)'],
    particleCount: 16,
    particleType: 'leaves',
    blob1Color: 'rgba(74,222,128,0.1)',
    blob2Color: 'rgba(134,239,172,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(74,222,128,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🌿',
    svgMotifs: [
      // 葉っぱ
      '<path d="M10 18 Q2 14 2 8 Q2 2 10 2 Q18 2 18 8 Q18 14 10 18 Z" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.25"/><path d="M10 18 L10 5" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>',
      // ハーブの小枝
      '<path d="M10 20 L10 5 M10 8 Q6 5 4 6 M10 12 Q14 9 16 10 M10 16 Q6 13 4 14" stroke="currentColor" stroke-width="1" fill="none" opacity="0.2"/>',
      // 風のカール
      '<path d="M2 10 Q8 6 14 10 Q18 12 20 8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/>',
      // ティーカップ
      '<path d="M4 8 L4 16 Q4 18 10 18 Q16 18 16 16 L16 8 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><path d="M16 10 Q20 10 20 13 Q20 16 16 16" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.15"/>',
      // 水滴
      '<path d="M10 4 Q14 10 14 14 Q14 18 10 18 Q6 18 6 14 Q6 10 10 4 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>',
    ],
    uniqueAnimation: 'breezeFloat',
    sectionTransitionStyle: 'fade',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M60 100 Q25 80 25 50 Q25 20 60 15 Q95 20 95 50 Q95 80 60 100 Z" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><path d="M60 95 L60 30" stroke="currentColor" stroke-width="1.5" opacity="0.1"/><path d="M60 45 Q45 35 40 40" stroke="currentColor" stroke-width="1" opacity="0.1"/><path d="M60 60 Q75 50 80 55" stroke="currentColor" stroke-width="1" opacity="0.1"/></svg>',
    buttonStyle: 'flask',
    labDirector: 'ストレス緩和研究室 室長: ハーバル博士',
  },

  // ── money: コインと宝石モチーフ、ゴールドグリーン ──
  money: {
    bgColor: '#F0FFE8',
    bgGradient: 'linear-gradient(135deg, #F5FFE8 0%, #F0FFEE 50%, #EFFFE5 100%)',
    bgPattern: 'coins',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 25% 35%, rgba(234,179,8,0.06) 0%, transparent 35%), radial-gradient(circle at 75% 65%, rgba(74,222,128,0.05) 0%, transparent 35%)',
    },
    particleColors: ['rgba(234,179,8,0.3)', 'rgba(255,215,0,0.25)', 'rgba(34,197,94,0.2)'],
    particleCount: 20,
    particleType: 'sparkles',
    blob1Color: 'rgba(34,197,94,0.12)',
    blob2Color: 'rgba(234,179,8,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(34,197,94,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '💰',
    svgMotifs: [
      // コイン（正面）
      '<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"/><text x="10" y="14" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.3">$</text>',
      // コインスタック
      '<ellipse cx="10" cy="16" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><ellipse cx="10" cy="13" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><ellipse cx="10" cy="10" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.25"/>',
      // 宝石
      '<path d="M10 3 L16 8 L13 18 L7 18 L4 8 Z" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"/><path d="M4 8 L10 12 L16 8" stroke="currentColor" stroke-width="0.8" opacity="0.15"/><line x1="10" y1="12" x2="10" y2="18" stroke="currentColor" stroke-width="0.6" opacity="0.1"/>',
      // 上昇する矢印（グラフ風）
      '<path d="M2 18 L8 10 L12 14 L18 4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.2"/><path d="M15 4 L18 4 L18 7" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.2"/>',
      // 金庫
      '<rect x="3" y="4" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"/><circle cx="10" cy="11" r="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15"/><line x1="10" y1="8" x2="10" y2="11" stroke="currentColor" stroke-width="0.8" opacity="0.15"/>',
    ],
    uniqueAnimation: 'coinBounce',
    sectionTransitionStyle: 'zoom',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.2"/><text x="60" y="60" text-anchor="middle" font-size="28" fill="currentColor" opacity="0.15">$</text><ellipse cx="45" cy="85" rx="20" ry="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.12"/><ellipse cx="45" cy="80" rx="20" ry="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.12"/><ellipse cx="45" cy="75" rx="20" ry="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.15"/></svg>',
    buttonStyle: 'coin',
    labDirector: '金銭感覚研究室 室長: ゴールド博士',
  },

  // ── job: コンパスと地図モチーフ、ブルーティール ──
  job: {
    bgColor: '#E8F5FF',
    bgGradient: 'linear-gradient(135deg, #E8F5FF 0%, #EDF8FF 50%, #E8F2FF 100%)',
    bgPattern: 'tech',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 40% 40%, rgba(20,184,166,0.06) 0%, transparent 40%), radial-gradient(circle at 60% 60%, rgba(59,130,246,0.05) 0%, transparent 40%)',
    },
    particleColors: ['rgba(59,130,246,0.2)', 'rgba(20,184,166,0.18)', 'rgba(99,102,241,0.15)'],
    particleCount: 14,
    particleType: 'stars',
    blob1Color: 'rgba(59,130,246,0.12)',
    blob2Color: 'rgba(20,184,166,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(20,184,166,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '🧭',
    svgMotifs: [
      // コンパス
      '<circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.25"/><path d="M10 3 L12 10 L10 17 L8 10 Z" fill="currentColor" opacity="0.15"/><circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.2"/>',
      // 地図のピン
      '<path d="M10 18 Q10 12 6 9 Q3 6 6 3 Q10 0 14 3 Q17 6 14 9 Q10 12 10 18 Z" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.25"/><circle cx="10" cy="7" r="2" fill="currentColor" opacity="0.15"/>',
      // 望遠鏡
      '<path d="M4 16 L8 8 L14 4 L16 6 L10 10 L6 18 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>',
      // 方位記号（N）
      '<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.15"/><text x="10" y="6" text-anchor="middle" font-size="5" fill="currentColor" opacity="0.3">N</text><text x="10" y="18" text-anchor="middle" font-size="4" fill="currentColor" opacity="0.2">S</text>',
      // 道（パス）
      '<path d="M2 18 Q6 14 10 14 Q14 14 14 10 Q14 6 18 2" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.2" stroke-dasharray="2 2"/>',
    ],
    uniqueAnimation: 'compassRotate',
    sectionTransitionStyle: 'slide',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="55" r="40" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><circle cx="60" cy="55" r="3" fill="currentColor" opacity="0.2"/><path d="M60 20 L64 55 L60 90 L56 55 Z" fill="currentColor" opacity="0.1"/><path d="M25 55 L56 51 L95 55 L56 59 Z" fill="currentColor" opacity="0.08"/><text x="60" y="18" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.2">N</text></svg>',
    buttonStyle: 'compass',
    labDirector: '適職探索研究室 室長: コンパス博士',
  },

  // ── learning: 本と鉛筆モチーフ、イエローの明るさ ──
  learning: {
    bgColor: '#FFFAEC',
    bgGradient: 'linear-gradient(135deg, #FFFAEC 0%, #FFFCF0 50%, #FFF8E8 100%)',
    bgPattern: 'notebook',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 50% 50%, rgba(234,179,8,0.06) 0%, transparent 50%)',
    },
    particleColors: ['rgba(234,179,8,0.2)', 'rgba(180,140,80,0.18)', 'rgba(250,204,21,0.15)'],
    particleCount: 16,
    particleType: 'sparkles',
    blob1Color: 'rgba(234,179,8,0.1)',
    blob2Color: 'rgba(180,140,80,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(234,179,8,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '📚',
    svgMotifs: [
      // 開いた本
      '<path d="M10 5 Q5 3 2 5 L2 17 Q5 15 10 17 Q15 15 18 17 L18 5 Q15 3 10 5 Z" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.25"/><line x1="10" y1="5" x2="10" y2="17" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>',
      // 鉛筆
      '<path d="M14 2 L18 6 L8 16 L4 16 L4 12 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><path d="M4 16 L3 19 L6 18" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.15"/>',
      // 電球（アイデア）
      '<path d="M10 2 Q16 2 16 8 Q16 12 12 14 L12 17 L8 17 L8 14 Q4 12 4 8 Q4 2 10 2 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><line x1="8" y1="18" x2="12" y2="18" stroke="currentColor" stroke-width="0.8" opacity="0.15"/>',
      // 虫めがね
      '<circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"/><line x1="12.5" y1="12.5" x2="18" y2="18" stroke="currentColor" stroke-width="1.5" opacity="0.25"/>',
      // ノートの罫線
      '<rect x="3" y="2" width="14" height="18" rx="1" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.15"/><line x1="5" y1="6" x2="15" y2="6" stroke="currentColor" stroke-width="0.5" opacity="0.12"/><line x1="5" y1="9" x2="15" y2="9" stroke="currentColor" stroke-width="0.5" opacity="0.12"/><line x1="5" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="0.5" opacity="0.12"/><line x1="5" y1="15" x2="12" y2="15" stroke="currentColor" stroke-width="0.5" opacity="0.12"/>',
    ],
    uniqueAnimation: 'pageFlip',
    sectionTransitionStyle: 'flip',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M60 25 Q35 18 15 25 L15 90 Q35 83 60 90 Q85 83 105 90 L105 25 Q85 18 60 25 Z" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><line x1="60" y1="25" x2="60" y2="90" stroke="currentColor" stroke-width="1.5" opacity="0.1"/><line x1="25" y1="40" x2="52" y2="40" stroke="currentColor" stroke-width="0.8" opacity="0.08"/><line x1="25" y1="50" x2="52" y2="50" stroke="currentColor" stroke-width="0.8" opacity="0.08"/><line x1="68" y1="40" x2="95" y2="40" stroke="currentColor" stroke-width="0.8" opacity="0.08"/><line x1="68" y1="50" x2="95" y2="50" stroke="currentColor" stroke-width="0.8" opacity="0.08"/></svg>',
    buttonStyle: 'book',
    labDirector: '学習スタイル研究室 室長: スタディ博士',
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
    particleColors: ['rgba(236,72,153,0.25)', 'rgba(244,114,182,0.2)', 'rgba(168,85,247,0.15)'],
    particleCount: 18,
    particleType: 'hearts',
    blob1Color: 'rgba(236,72,153,0.12)',
    blob2Color: 'rgba(168,85,247,0.1)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(236,72,153,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '💕',
    svgMotifs: [
      // ハート
      '<path d="M10 18 Q2 12 2 7 Q2 2 7 2 Q10 2 10 6 Q10 2 13 2 Q18 2 18 7 Q18 12 10 18 Z" fill="currentColor" opacity="0.15"/>',
      // 天使の羽
      '<path d="M10 10 Q4 6 2 10 Q0 14 4 12 Q8 10 10 10 M10 10 Q16 6 18 10 Q20 14 16 12 Q12 10 10 10" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>',
      // 花びら
      '<path d="M10 2 Q14 6 14 10 Q14 14 10 18 Q6 14 6 10 Q6 6 10 2 Z" fill="currentColor" opacity="0.1"/><circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.15"/>',
      // リボン
      '<path d="M10 10 L5 5 Q2 8 5 10 M10 10 L15 5 Q18 8 15 10 M10 10 L10 16" stroke="currentColor" stroke-width="1" fill="none" opacity="0.2"/>',
      // キューピッドの矢
      '<line x1="2" y1="18" x2="18" y2="2" stroke="currentColor" stroke-width="1" opacity="0.2"/><path d="M18 2 L15 2 L18 5" fill="currentColor" opacity="0.2"/><path d="M3 16 L2 18 L4 17" fill="currentColor" opacity="0.15"/>',
    ],
    uniqueAnimation: 'heartBeat',
    sectionTransitionStyle: 'dissolve',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><path d="M60 95 Q15 65 15 40 Q15 15 40 15 Q55 15 60 35 Q65 15 80 15 Q105 15 105 40 Q105 65 60 95 Z" fill="currentColor" opacity="0.06" stroke="currentColor" stroke-width="2" stroke-opacity="0.15"/></svg>',
    buttonStyle: 'heart',
    labDirector: '恋愛心理研究室 室長: アモーレ博士',
  },

  // ── torisetsu: リボンとハートモチーフ、ピンクの可愛さ ──
  torisetsu: {
    bgColor: '#FFF0F5',
    bgGradient: 'linear-gradient(135deg, #FFF0F5 0%, #FFF5EB 50%, #FFF0F8 100%)',
    bgPattern: 'fresh',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 30% 30%, rgba(244,114,182,0.07) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(251,146,60,0.05) 0%, transparent 40%)',
    },
    particleColors: ['rgba(244,114,182,0.3)', 'rgba(251,146,60,0.25)', 'rgba(236,72,153,0.2)'],
    particleCount: 16,
    particleType: 'sparkles',
    blob1Color: 'rgba(244,114,182,0.1)',
    blob2Color: 'rgba(251,146,60,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(244,114,182,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '📋',
    svgMotifs: [
      // リボン
      '<path d="M10 10 L4 4 Q1 7 5 10 L10 10 L16 4 Q19 7 15 10 L10 10 L8 18 L10 15 L12 18 Z" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.25"/>',
      // プレゼント箱
      '<rect x="3" y="9" width="14" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"/><rect x="2" y="6" width="16" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><line x1="10" y1="6" x2="10" y2="19" stroke="currentColor" stroke-width="0.8" opacity="0.15"/>',
      // 星のスタンプ
      '<path d="M10 3 L12 8 L17 8 L13 11 L14.5 16 L10 13 L5.5 16 L7 11 L3 8 L8 8 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>',
      // ハートの吹き出し
      '<path d="M10 16 Q2 12 2 8 Q2 4 6 4 Q8 4 10 6 Q12 4 14 4 Q18 4 18 8 Q18 12 10 16 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><path d="M8 16 L6 20 L11 17" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.15"/>',
      // カギ括弧（「」）風
      '<path d="M4 4 L4 8 L6 8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.2"/><path d="M16 12 L16 16 L14 16" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.2"/>',
    ],
    uniqueAnimation: 'giftOpen',
    sectionTransitionStyle: 'zoom',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><rect x="25" y="50" width="70" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><rect x="20" y="38" width="80" height="15" rx="4" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><line x1="60" y1="38" x2="60" y2="100" stroke="currentColor" stroke-width="1.5" opacity="0.1"/><path d="M60 38 Q45 20 35 30 Q30 35 40 38 M60 38 Q75 20 85 30 Q90 35 80 38" fill="none" stroke="currentColor" stroke-width="2" opacity="0.2"/></svg>',
    buttonStyle: 'ribbon',
    labDirector: 'トリセツ作成室 室長: プレゼン博士',
  },

  // ── deathcause: 骸骨と薔薇モチーフ、パープルの妖艶さ ──
  deathcause: {
    bgColor: '#F0ECFF',
    bgGradient: 'linear-gradient(135deg, #EDEAFF 0%, #E8E0FF 50%, #F0ECFF 100%)',
    bgPattern: 'fresh',
    bgStyle: {
      backgroundImage:
        'radial-gradient(circle at 30% 70%, rgba(139,92,246,0.06) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(168,85,247,0.05) 0%, transparent 40%)',
    },
    particleColors: ['rgba(139,92,246,0.3)', 'rgba(99,102,241,0.25)', 'rgba(168,85,247,0.2)'],
    particleCount: 12,
    particleType: 'orbs',
    blob1Color: 'rgba(139,92,246,0.1)',
    blob2Color: 'rgba(99,102,241,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBorder: 'rgba(139,92,246,0.2)',
    textPrimary: '#0f1f2b',
    textSecondary: '#2d4a57',
    accentEmoji: '💀',
    svgMotifs: [
      // 骸骨（顔）
      '<circle cx="10" cy="9" r="8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"/><circle cx="7" cy="8" r="2" fill="currentColor" opacity="0.15"/><circle cx="13" cy="8" r="2" fill="currentColor" opacity="0.15"/><path d="M7 14 L8 13 L9 14 L10 13 L11 14 L12 13 L13 14" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.2"/>',
      // 薔薇
      '<path d="M10 10 Q12 6 10 4 Q8 6 10 10 Q14 8 14 6 Q12 8 10 10 Q6 8 6 6 Q8 8 10 10 Z" fill="currentColor" opacity="0.15"/><path d="M10 10 L10 18 M8 14 L10 12 M12 15 L10 13" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.2"/>',
      // 幽霊
      '<path d="M6 18 L6 8 Q6 2 10 2 Q14 2 14 8 L14 18 L12 15 L10 18 L8 15 Z" fill="currentColor" opacity="0.1"/><circle cx="8" cy="8" r="1" fill="white" opacity="0.5"/><circle cx="12" cy="8" r="1" fill="white" opacity="0.5"/>',
      // 十字架
      '<path d="M10 2 L10 18 M5 6 L15 6" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.15"/>',
      // 蝋燭
      '<rect x="8" y="8" width="4" height="10" rx="0.5" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/><path d="M10 8 Q12 5 10 2 Q8 5 10 8 Z" fill="currentColor" opacity="0.15"/>',
    ],
    uniqueAnimation: 'ghostFloat',
    sectionTransitionStyle: 'dissolve',
    landingSvg: '<svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="45" r="28" fill="none" stroke="currentColor" stroke-width="2" opacity="0.15"/><circle cx="48" cy="42" r="7" fill="currentColor" opacity="0.08"/><circle cx="72" cy="42" r="7" fill="currentColor" opacity="0.08"/><path d="M47 58 L50 55 L53 58 L56 55 L59 58 L62 55 L65 58 L68 55 L71 58" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.15"/><path d="M50 80 Q55 73 60 75 Q65 73 70 80 Q65 85 60 83 Q55 85 50 80 Z" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="1" stroke-opacity="0.15"/><path d="M60 83 L60 95 M55 88 L60 85 M65 90 L60 87" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1"/></svg>',
    buttonStyle: 'skull',
    labDirector: '死因予測研究室 室長: モルテ博士',
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
  svgMotifs: [],
  uniqueAnimation: 'default',
  sectionTransitionStyle: 'fade',
  buttonStyle: 'default',
  labDirector: '総合研究室 室長: ラボ博士',
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
