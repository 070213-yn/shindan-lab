"use client";

/**
 * 診断研究所 ポータルページ（可愛い x ラボ x テーマパーク）
 *
 * 研究所入口のようなワクワク感と可愛い装飾で
 * テーマパークの入場ゲートをイメージ。
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { DIAGNOSIS_LIST } from "@/lib/diagnoses";
import { usePersonaStore } from "@/store/personaStore";

// ========== SVGコンポーネント ==========

// 試験管SVG
const TestTubeSvg = ({ size = 24, color = "currentColor", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M9 2h6v2H9V2zm0 4V4h6v2l3 14a2 2 0 01-2 2H8a2 2 0 01-2-2L9 6z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="11" cy="14" r="1.5" fill={color} opacity="0.3"/>
    <circle cx="13" cy="17" r="1" fill={color} opacity="0.2"/>
  </svg>
);

// フラスコSVG
const FlaskSvg = ({ size = 24, color = "currentColor", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M10 2h4v6l5 10a2 2 0 01-1.8 3H6.8a2 2 0 01-1.8-3L10 8V2z" stroke={color} strokeWidth="1.5"/>
    <line x1="8" y1="2" x2="16" y2="2" stroke={color} strokeWidth="1.5"/>
  </svg>
);

// DNA二重らせんSVG
const DnaSvg = ({ size = 40, color = "currentColor", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size * 2} viewBox="0 0 40 80" fill="none" style={style}>
    <path d="M10 0 C10 20, 30 20, 30 40 C30 60, 10 60, 10 80" stroke={color} strokeWidth="2" opacity="0.4"/>
    <path d="M30 0 C30 20, 10 20, 10 40 C10 60, 30 60, 30 80" stroke={color} strokeWidth="2" opacity="0.4"/>
    <line x1="10" y1="10" x2="30" y2="10" stroke={color} strokeWidth="1" opacity="0.2"/>
    <line x1="12" y1="20" x2="28" y2="20" stroke={color} strokeWidth="1" opacity="0.2"/>
    <line x1="18" y1="30" x2="22" y2="30" stroke={color} strokeWidth="1" opacity="0.2"/>
    <line x1="12" y1="50" x2="28" y2="50" stroke={color} strokeWidth="1" opacity="0.2"/>
    <line x1="10" y1="60" x2="30" y2="60" stroke={color} strokeWidth="1" opacity="0.2"/>
    <line x1="14" y1="70" x2="26" y2="70" stroke={color} strokeWidth="1" opacity="0.2"/>
  </svg>
);

// 泡SVG（浮遊アニメーション用）
const BubbleSvg = ({ size = 12, color = "#2dd4bf", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" style={style}>
    <circle cx="6" cy="6" r="5" fill={color} opacity="0.15"/>
    <circle cx="4" cy="4" r="1.5" fill="#fff" opacity="0.4"/>
  </svg>
);

// トロフィーSVG
const TrophySvg = ({ size = 40, color = "#FFD700" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path d="M12 8h16v10c0 4.4-3.6 8-8 8s-8-3.6-8-8V8z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5"/>
    <path d="M12 10H6c0 4 3 7 6 7v-7zm16 0h6c0 4-3 7-6 7v-7z" fill={color} opacity="0.2"/>
    <rect x="17" y="26" width="6" height="4" fill={color} opacity="0.4"/>
    <rect x="13" y="30" width="14" height="3" rx="1.5" fill={color} opacity="0.3"/>
    <circle cx="20" cy="16" r="3" fill={color} opacity="0.5"/>
  </svg>
);

// メダルSVG
const MedalSvg = ({ size = 32, color = "#FF6BE8" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill={color} opacity="0.3"/>
    <circle cx="16" cy="18" r="8" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
    <circle cx="16" cy="18" r="5" fill={color} opacity="0.1"/>
    <path d="M13 2l3 8m3-8l-3 8" stroke={color} strokeWidth="1" opacity="0.3"/>
  </svg>
);

// 虫眼鏡SVG
const MagnifyingSvg = ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <line x1="13" y1="13" x2="18" y2="18" stroke={color} strokeWidth="2" opacity="0.6"/>
  </svg>
);


// 恋愛診断は別ページなので手動定義
const LOVE_DIAGNOSIS = {
  id: "love",
  title: "恋愛性格診断",
  subtitle: "本格12タイプ判定",
  emoji: "\u{1F498}",
  themeColor: "#FF6BE8",
  gradientFrom: "#FF6BE8",
  gradientTo: "#C45AFF",
  description: "愛着理論×進化心理学ベース。43問で恋愛タイプを8次元分析。",
  questionCount: 43,
  estimatedMinutes: 10,
  catchphrase: "恋は、勇気が9割。",
  href: "/love",
  isNew: false,
  isFeatured: false,
  category: "social" as const,
};

// カテゴリ定義
type CategoryKey = "all" | "personality" | "mind" | "ability" | "career" | "social" | "mystery";
const CATEGORIES: { key: CategoryKey; label: string; emoji: string }[] = [
  { key: "all", label: "すべて", emoji: "\u2726" },
  { key: "personality", label: "性格・タイプ", emoji: "\u{1F9EC}" },
  { key: "mind", label: "メンタル・心理", emoji: "\u{1F9E0}" },
  { key: "ability", label: "能力・才能", emoji: "\u2B50" },
  { key: "career", label: "仕事・将来", emoji: "\u{1F680}" },
  { key: "social", label: "恋愛・対人", emoji: "\u{1F4AC}" },
  { key: "mystery", label: "スピ・エンタメ", emoji: "\u{1F52E}" },
];

// 各診断をカテゴリに分類するマップ
const CATEGORY_MAP: Record<string, CategoryKey> = {
  mbti128: "personality",
  shadow: "personality",
  mental: "mind",
  stress: "mind",
  talent: "ability",
  learning: "ability",
  job: "career",
  money: "career",
  love: "social",
  spirit: "mystery",
  isekai: "mystery",
  pastlife: "mystery",
  torisetsu: "personality",
  deathcause: "mystery",
};

// 全カードデータ（MBTI-128を先頭 + 恋愛 + 他の診断）
const ALL_DIAGNOSES_RAW = [
  LOVE_DIAGNOSIS,
  ...DIAGNOSIS_LIST.map((d) => ({
    id: d.id,
    title: d.title,
    subtitle: d.subtitle,
    emoji: d.emoji,
    themeColor: d.themeColor,
    gradientFrom: d.gradientFrom,
    gradientTo: d.gradientTo,
    description: d.description,
    questionCount: d.questionCount,
    estimatedMinutes: d.estimatedMinutes,
    catchphrase: d.catchphrase,
    href: `/shindan/${d.id}`,
    isNew: true,
    isFeatured: d.id === "mbti128",
    category: (CATEGORY_MAP[d.id] || "mystery") as CategoryKey,
  })),
];
// MBTI-128を先頭に配置（メイン推し診断）
const ALL_DIAGNOSES = [
  ...ALL_DIAGNOSES_RAW.filter((d) => d.id === "mbti128"),
  ...ALL_DIAGNOSES_RAW.filter((d) => d.id !== "mbti128"),
];

// 人気の実験ランキング（手動ピックアップ）
const POPULAR_EXPERIMENTS = [
  { rank: 1, id: "mbti128", medal: "#FFD700" },
  { rank: 2, id: "shadow", medal: "#C0C0C0" },
  { rank: 3, id: "deathcause", medal: "#CD7F32" },
];

// 研究所からのお知らせ
const LAB_NEWS = [
  { date: "2026.03", text: "新着: 前世の死因診断を追加しました!", isNew: true },
  { date: "2026.02", text: "ペルソナカード機能がパワーアップ!", isNew: false },
  { date: "2026.01", text: "MBTI-128 超精密診断をリリース!", isNew: false },
];


export default function PortalPage() {
  // カードのフェードアップ
  const gridRef = useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // ハイドレーション対策: マウント前はlocalStorage依存の表示を抑制
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // ヒーローフェードアップ
  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ペルソナストア
  const personaResults = usePersonaStore((s) => s.results);
  const globalProfile = usePersonaStore((s) => s.globalProfile);
  const setGlobalProfile = usePersonaStore((s) => s.setGlobalProfile);
  const completedCount = Object.keys(personaResults).length;

  // グローバルプロフィール設定UI
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [tempName, setTempName] = useState<string>(globalProfile.name ?? "");
  const [tempGender, setTempGender] = useState<string | null>(globalProfile.gender);
  const [tempAge, setTempAge] = useState<number>(globalProfile.age ?? 16);

  // カテゴリフィルタ
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  // フィルタ済み診断
  const filteredDiagnoses =
    activeCategory === "all"
      ? ALL_DIAGNOSES
      : ALL_DIAGNOSES.filter((d) => d.category === activeCategory);

  // ホバー中のカードID
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 波紋エフェクト
  const handleRipple = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    Object.assign(ripple.style, {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: "rgba(45, 212, 191, 0.15)",
      left: `${e.clientX - rect.left - size / 2}px`,
      top: `${e.clientY - rect.top - size / 2}px`,
      animation: "rippleEffect 0.6s ease-out",
      pointerEvents: "none",
      zIndex: "10",
    });
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  // ティッカー（研究所風）
  const tickerItems = [
    "13種類の本格実験",
    "心理学研究ベース",
    "完全無料・登録不要",
    "ペルソナカード生成",
    "あなたの裏の顔を解析",
    "適職を超精密マッチング",
    "脳タイプ完全解析",
    "前世の死因を特定",
    "研究員募集中（参加無料）",
  ];
  const tickerText = [...tickerItems, ...tickerItems].map((t) => `\u{1F9EA} ${t} `).join("");

  // プロフィール保存ハンドラ
  const handleSaveProfile = () => {
    setGlobalProfile(tempName.trim() || null, tempGender, tempAge);
    setShowProfileSetup(false);
  };

  // 性別の表示名
  const genderLabel = (g: string | null) => {
    if (g === "male") return "男性";
    if (g === "female") return "女性";
    if (g === "other") return "その他";
    return null;
  };

  return (
    <>
      {/* ===== 浮遊SVGアニメーション背景（ヒーロー用） ===== */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: "none", zIndex: 0, overflow: "hidden",
      }}>
        {/* フラスコ - 左上 */}
        <FlaskSvg size={48} color="#2dd4bf" style={{
          position: "absolute", top: "12%", left: "5%",
          opacity: 0.18,
          animation: "labFloat1 8s ease-in-out infinite",
        }} />
        {/* 試験管 - 右上 */}
        <TestTubeSvg size={40} color="#38bdf8" style={{
          position: "absolute", top: "8%", right: "10%",
          opacity: 0.15,
          animation: "labFloat2 10s ease-in-out infinite",
          transform: "rotate(15deg)",
        }} />
        {/* DNA - 左中央 */}
        <DnaSvg size={30} color="#c084fc" style={{
          position: "absolute", top: "30%", left: "8%",
          opacity: 0.12,
          animation: "labFloat3 12s ease-in-out infinite",
        }} />
        {/* 泡1 */}
        <BubbleSvg size={20} color="#2dd4bf" style={{
          position: "absolute", top: "20%", left: "30%",
          animation: "bubbleRise1 7s ease-in-out infinite",
        }} />
        {/* 泡2 */}
        <BubbleSvg size={14} color="#38bdf8" style={{
          position: "absolute", top: "40%", right: "20%",
          animation: "bubbleRise2 9s ease-in-out infinite",
        }} />
        {/* 泡3 */}
        <BubbleSvg size={10} color="#c084fc" style={{
          position: "absolute", top: "60%", left: "15%",
          animation: "bubbleRise3 6s ease-in-out infinite",
        }} />
        {/* フラスコ - 右下 */}
        <FlaskSvg size={36} color="#c084fc" style={{
          position: "absolute", bottom: "20%", right: "8%",
          opacity: 0.12,
          animation: "labFloat1 11s ease-in-out infinite reverse",
        }} />
        {/* 試験管 - 左下 */}
        <TestTubeSvg size={32} color="#2dd4bf" style={{
          position: "absolute", bottom: "30%", left: "12%",
          opacity: 0.1,
          animation: "labFloat2 9s ease-in-out infinite reverse",
          transform: "rotate(-20deg)",
        }} />
        {/* 泡4 */}
        <BubbleSvg size={16} color="#FF6BE8" style={{
          position: "absolute", top: "70%", right: "35%",
          animation: "bubbleRise1 8s ease-in-out infinite 2s",
        }} />
        {/* 泡5 */}
        <BubbleSvg size={24} color="#2dd4bf" style={{
          position: "absolute", top: "50%", left: "45%",
          animation: "bubbleRise2 11s ease-in-out infinite 1s",
        }} />
        {/* DNA - 右 */}
        <DnaSvg size={24} color="#38bdf8" style={{
          position: "absolute", top: "15%", right: "25%",
          opacity: 0.08,
          animation: "labFloat3 14s ease-in-out infinite reverse",
        }} />
      </div>

      {/* ===== ティッカー（最上部固定・研究所風） ===== */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          overflow: "hidden", whiteSpace: "nowrap",
          padding: "5px 0", fontSize: "12px", fontWeight: 700,
          color: "#fff", letterSpacing: "0.04em",
          background: "linear-gradient(135deg, rgba(45,212,191,.92), rgba(99,102,241,.85), rgba(45,212,191,.92))",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <span style={{ display: "inline-block", animation: "tickerScroll 30s linear infinite" }}>
          {tickerText}
        </span>
      </div>

      {/* ===== ナビバー（ラボ風ガラス） ===== */}
      <nav
        style={{
          position: "fixed", top: 28, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 24px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(45,212,191,0.15)",
          boxShadow: "0 2px 16px rgba(0,0,0,.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FlaskSvg size={20} color="#2dd4bf" />
          <span className="font-stick" style={{
            color: "#2dd4bf",
            fontSize: "1.1rem",
          }}>
            診断研究所
          </span>
        </div>
        <Link
          href="/persona"
          style={{
            padding: "6px 14px",
            background: completedCount > 0 ? "linear-gradient(135deg, #2dd4bf, #38bdf8)" : "rgba(45,212,191,.1)",
            borderRadius: 20,
            color: completedCount > 0 ? "#fff" : "#2dd4bf",
            fontSize: 11,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.03em",
            border: completedCount > 0 ? "none" : "1px solid rgba(45,212,191,.2)",
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <TestTubeSvg size={14} color={completedCount > 0 ? "#fff" : "#2dd4bf"} />
          {completedCount > 0 ? `PERSONA (${completedCount})` : "PERSONA CARD"}
        </Link>
      </nav>

      {/* ===== ヒーローセクション（研究所入口風） ===== */}
      <section
        style={{
          minHeight: "52svh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "110px 20px 32px", position: "relative", zIndex: 1,
        }}
      >
        {/* ラボ装飾フレーム */}
        <div style={{
          position: "relative", display: "inline-flex", flexDirection: "column",
          alignItems: "center",
        }}>
          {/* 上部の試験管×フラスコ装飾 */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}>
            <TestTubeSvg size={28} color="#2dd4bf" style={{ transform: "rotate(-15deg)" }} />
            <BubbleSvg size={10} color="#2dd4bf" />
            <FlaskSvg size={24} color="#6366f1" />
            <BubbleSvg size={8} color="#c084fc" />
            <TestTubeSvg size={22} color="#38bdf8" style={{ transform: "rotate(15deg)" }} />
          </div>

          {/* メインタイトル */}
          <h1
            style={{
              lineHeight: 1.1, marginBottom: 4,
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
            }}
          >
            <span className="font-stick" style={{
              display: "block", fontSize: "clamp(40px, 11vw, 72px)",
              color: "#0f1f2b",
              textShadow: "0 2px 20px rgba(45,212,191,0.15)",
            }}>
              診断研究所
            </span>
          </h1>

          {/* 英語サブ */}
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.25em", color: "#2dd4bf",
            marginBottom: 12, fontWeight: 600,
            opacity: heroMounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.2s",
          }}>
            SHINDAN LABORATORY
          </p>

          {/* 下部のライン装飾 */}
          <div style={{
            width: 60, height: 2, borderRadius: 1,
            background: "linear-gradient(90deg, transparent, #2dd4bf, #6366f1, #2dd4bf, transparent)",
            marginBottom: 16,
            opacity: heroMounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.25s",
          }} />
        </div>

        {/* キャッチコピー */}
        <p
          className="font-zen"
          style={{
            fontSize: "1.15rem", fontWeight: 700, color: "#2d4a57",
            marginBottom: 8, lineHeight: 1.7,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
          }}
        >
          あなたの本当の姿、実験してみない?
        </p>
        <p
          style={{
            fontSize: "0.82rem", color: "#4a6572", marginBottom: 20,
            opacity: heroMounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.35s",
          }}
        >
          心理学ベースの本格診断で、知らなかった自分に出会える研究所。
        </p>

        {/* 実験ラベル風バッジ */}
        <div
          style={{
            display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.45s, transform 0.6s ease-out 0.45s",
          }}
        >
          {[
            { label: "13の実験", icon: "\u{1F9EA}", bg: "rgba(45,212,191,.12)" },
            { label: "心理学ベース", icon: "\u{1F9EC}", bg: "rgba(99,102,241,.1)" },
            { label: "入場無料", icon: "\u{1F193}", bg: "rgba(56,189,248,.1)" },
            { label: "ペルソナカード", icon: "\u{1F0CF}", bg: "rgba(192,132,252,.1)" },
          ].map((badge) => (
            <span
              key={badge.label}
              style={{
                padding: "6px 14px", borderRadius: 8,
                background: badge.bg,
                border: "1px dashed rgba(45,212,191,.3)",
                fontSize: 12, color: "#2d4a57", fontWeight: 600,
                letterSpacing: "0.03em",
                position: "relative",
                fontFamily: "monospace, 'Zen Maru Gothic', sans-serif",
              }}
            >
              {/* ラベル風のドット装飾 */}
              <span style={{
                position: "absolute", top: -3, left: -3,
                width: 6, height: 6, borderRadius: "50%",
                background: "#2dd4bf",
              }} />
              <span style={{ marginRight: 4 }}>{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>

        {/* CTAボタン */}
        <div style={{
          marginTop: 28,
          opacity: heroMounted ? 1 : 0,
          transform: heroMounted ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.6s ease-out 0.55s, transform 0.6s ease-out 0.55s",
        }}>
          <a
            href="#experiments"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 50,
              background: "linear-gradient(135deg, #2dd4bf, #6366f1)",
              color: "#fff", fontSize: 14, fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(45,212,191,.3), 0 0 0 4px rgba(45,212,191,.1)",
              transition: "all 0.3s ease",
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            <FlaskSvg size={18} color="#fff" />
            実験を始める
          </a>
        </div>
      </section>

      {/* ===== 人気の実験ランキング ===== */}
      <section
        style={{
          padding: "32px 16px", maxWidth: 700, margin: "0 auto",
          position: "relative", zIndex: 1,
        }}
      >
        <div style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(45,212,191,.12)",
          borderRadius: 20,
          padding: "24px 20px",
          boxShadow: "0 4px 24px rgba(0,0,0,.04)",
        }}>
          {/* セクションヘッダ */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <TrophySvg size={28} />
            <div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#2dd4bf", display: "block" }}>
                POPULAR EXPERIMENTS
              </span>
              <h2 className="font-stick" style={{ fontSize: "1.2rem", color: "#0f1f2b", margin: 0 }}>
                人気の実験ランキング
              </h2>
            </div>
          </div>

          {/* ランキングリスト */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {POPULAR_EXPERIMENTS.map((item) => {
              const diag = ALL_DIAGNOSES.find((d) => d.id === item.id);
              if (!diag) return null;
              return (
                <Link
                  key={item.id}
                  href={diag.href}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 16px", borderRadius: 14,
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(45,212,191,.1)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(0,0,0,.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  {/* 順位メダル */}
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${item.medal}, ${item.medal}88)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 900, color: "#fff",
                    flexShrink: 0,
                    boxShadow: `0 2px 8px ${item.medal}44`,
                  }}>
                    {item.rank}
                  </div>
                  {/* 絵文字 */}
                  <span style={{ fontSize: "1.6rem" }}>{diag.emoji}</span>
                  {/* テキスト */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="font-zen" style={{
                      fontSize: "0.9rem", fontWeight: 700, color: "#0f1f2b", margin: 0,
                    }}>
                      {diag.title}
                    </h3>
                    <p style={{ fontSize: "0.72rem", color: "#4a6572", margin: 0 }}>
                      {diag.questionCount}問 / 約{diag.estimatedMinutes}分
                    </p>
                  </div>
                  {/* 矢印 */}
                  <span style={{ color: "#2dd4bf", fontSize: 16, fontWeight: 700 }}>→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 研究所からのお知らせ ===== */}
      <section
        style={{
          padding: "16px 16px 32px", maxWidth: 700, margin: "0 auto",
          position: "relative", zIndex: 1,
        }}
      >
        <div style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(45,212,191,.12)",
          borderRadius: 20,
          padding: "20px 20px",
          boxShadow: "0 4px 24px rgba(0,0,0,.04)",
        }}>
          {/* セクションヘッダ */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <MagnifyingSvg size={22} color="#6366f1" />
            <div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#6366f1", display: "block" }}>
                LAB NEWS
              </span>
              <h2 className="font-stick" style={{ fontSize: "1.1rem", color: "#0f1f2b", margin: 0 }}>
                研究所からのお知らせ
              </h2>
            </div>
          </div>

          {/* ニュースリスト */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {LAB_NEWS.map((news, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "10px 14px", borderRadius: 12,
                  background: news.isNew ? "rgba(45,212,191,.06)" : "transparent",
                  borderLeft: news.isNew ? "3px solid #2dd4bf" : "3px solid rgba(45,212,191,.15)",
                }}
              >
                <span style={{
                  fontSize: "0.68rem", color: "#94a8b4", whiteSpace: "nowrap",
                  fontFamily: "monospace",
                  paddingTop: 2,
                }}>
                  {news.date}
                </span>
                <span style={{ fontSize: "0.82rem", color: "#2d4a57", lineHeight: 1.5 }}>
                  {news.isNew && (
                    <span style={{
                      display: "inline-block", padding: "1px 6px", borderRadius: 4,
                      background: "#2dd4bf", color: "#fff", fontSize: 9,
                      fontWeight: 700, marginRight: 6, verticalAlign: "middle",
                    }}>
                      NEW
                    </span>
                  )}
                  {news.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 診断カードグリッド ===== */}
      <section
        id="experiments"
        style={{
          padding: "24px 16px 80px", maxWidth: 1100, margin: "0 auto",
          position: "relative", zIndex: 1,
        }}
      >
        {/* グローバルプロフィール設定（実験ノート風カード） */}
        <div
          style={{
            marginBottom: 24,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(45,212,191,.12)",
            borderRadius: 16,
            padding: "14px 20px",
            boxShadow: "0 2px 12px rgba(0,0,0,.04)",
            position: "relative",
          }}
        >
          {/* フラスコ装飾 */}
          <FlaskSvg size={18} color="#2dd4bf" style={{
            position: "absolute", top: 10, right: 14, opacity: 0.25,
          }} />

          {mounted && globalProfile.gender && globalProfile.age ? (
            // 設定済み表示
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 28, height: 28, borderRadius: "50%",
                  background: "rgba(45,212,191,.15)", fontSize: 14, color: "#2dd4bf",
                }}>
                  ✓
                </span>
                <span style={{ fontSize: 13, color: "#2d4a57" }}>
                  <strong style={{ color: "#2dd4bf" }}>{globalProfile.name ? `${globalProfile.name}さん` : ""}{globalProfile.name ? " / " : ""}{globalProfile.age}歳・{genderLabel(globalProfile.gender)}</strong> で実験中
                </span>
              </div>
              <button
                onClick={() => {
                  setTempName(globalProfile.name ?? "");
                  setTempGender(globalProfile.gender);
                  setTempAge(globalProfile.age ?? 16);
                  setShowProfileSetup(true);
                }}
                style={{
                  padding: "4px 12px", borderRadius: 12,
                  background: "rgba(45,212,191,.1)", border: "1px solid rgba(45,212,191,.2)",
                  color: "#2dd4bf", fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}
              >
                変更
              </button>
            </div>
          ) : (
            // 未設定表示
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <TestTubeSvg size={16} color="#2dd4bf" />
                <span style={{ fontSize: 13, color: "#4a6572" }}>
                  被験者情報を登録すると、実験がスムーズに!
                </span>
              </div>
              <button
                onClick={() => setShowProfileSetup(true)}
                style={{
                  padding: "6px 16px", borderRadius: 12,
                  background: "linear-gradient(135deg, #2dd4bf, #38bdf8)",
                  border: "none", color: "#fff", fontSize: 12, fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                登録する
              </button>
            </div>
          )}

          {/* インライン設定フォーム */}
          {showProfileSetup && (
            <div
              style={{
                marginTop: 16, paddingTop: 16,
                borderTop: "1px dashed rgba(45,212,191,.2)",
                animation: "slideDown 0.3s ease-out",
              }}
            >
              {/* 名前入力 */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "#4a6572", marginBottom: 8 }}>被験者名（ニックネームでもOK）</p>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="ニックネームを入力"
                  maxLength={20}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 10,
                    background: "rgba(255,255,255,.8)",
                    border: "1px solid rgba(45,212,191,.2)",
                    color: "#0f1f2b", fontSize: 14, outline: "none",
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#2dd4bf"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(45,212,191,.2)"; }}
                />
              </div>

              {/* 性別選択 */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "#4a6572", marginBottom: 8 }}>性別</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { value: "male", label: "男性", emoji: "♂" },
                    { value: "female", label: "女性", emoji: "♀" },
                    { value: "other", label: "その他", emoji: "◇" },
                  ].map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setTempGender(g.value)}
                      style={{
                        flex: 1, padding: "8px 0", borderRadius: 10,
                        background: tempGender === g.value ? "rgba(45,212,191,.15)" : "rgba(255,255,255,.6)",
                        border: tempGender === g.value ? "1.5px solid #2dd4bf" : "1px solid rgba(45,212,191,.15)",
                        color: tempGender === g.value ? "#2dd4bf" : "#4a6572",
                        fontSize: 13, fontWeight: 600, cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {g.emoji} {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 年齢スライダー */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "#4a6572", marginBottom: 8 }}>
                  年齢: <strong style={{ color: "#2dd4bf", fontSize: 16 }}>{tempAge}</strong>歳
                </p>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={tempAge}
                  onChange={(e) => setTempAge(Number(e.target.value))}
                  className="profile-slider"
                  style={{
                    width: "100%", height: 6,
                    WebkitAppearance: "none", appearance: "none",
                    background: `linear-gradient(to right, #2dd4bf ${((tempAge - 10) / 50) * 100}%, rgba(45,212,191,.15) ${((tempAge - 10) / 50) * 100}%)`,
                    borderRadius: 3, outline: "none", cursor: "pointer",
                  }}
                />
              </div>

              {/* 保存ボタン */}
              <button
                onClick={handleSaveProfile}
                disabled={!tempGender}
                style={{
                  width: "100%", padding: "10px 0", borderRadius: 12,
                  background: tempGender
                    ? "linear-gradient(135deg, #2dd4bf, #38bdf8)"
                    : "rgba(45,212,191,.1)",
                  border: "none",
                  color: tempGender ? "#fff" : "#4a6572",
                  fontSize: 13, fontWeight: 700, cursor: tempGender ? "pointer" : "default",
                  transition: "all 0.2s ease",
                }}
              >
                保存する
              </button>
            </div>
          )}
        </div>

        {/* セクションタイトル */}
        <div style={{ textAlign: "left", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <FlaskSvg size={24} color="#2dd4bf" />
          <div>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#2dd4bf", display: "block", marginBottom: 4 }}>
              ALL EXPERIMENTS
            </span>
            <h2 className="font-stick" style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#0f1f2b", margin: 0 }}>
              実験を選ぶ
            </h2>
          </div>
        </div>

        {/* カテゴリタブ */}
        <div
          style={{
            display: "flex", gap: 8, marginBottom: 20,
            overflowX: "auto", paddingBottom: 4,
            scrollbarWidth: "none",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: "8px 16px", borderRadius: 20,
                background: activeCategory === cat.key
                  ? "linear-gradient(135deg, #2dd4bf, #6366f1)"
                  : "rgba(255,255,255,0.6)",
                border: activeCategory === cat.key
                  ? "none"
                  : "1px solid rgba(45,212,191,.15)",
                color: activeCategory === cat.key ? "#fff" : "#2d4a57",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.25s ease",
                backdropFilter: "blur(8px)",
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* カードグリッド */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 14,
          }}
          className="portal-grid"
        >
          {filteredDiagnoses.map((diag, index) => {
            const result = personaResults[diag.id];
            const isCompleted = !!result;
            const isHovered = hoveredCard === diag.id;

            return (
              <Link
                key={diag.id}
                href={diag.href}
                onClick={handleRipple}
                onMouseEnter={() => setHoveredCard(diag.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: "18px 18px",
                  border: isHovered ? `1px solid ${diag.themeColor}40` : "1px solid rgba(45,212,191,.12)",
                  borderTop: isHovered ? `2.5px solid ${diag.themeColor}` : "1px solid rgba(45,212,191,.12)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible
                    ? (isHovered ? "translateY(-3px) scale(1.01)" : "translateY(0) scale(1)")
                    : "translateY(24px) scale(0.96)",
                  transition: `opacity 0.5s cubic-bezier(0.25,1,0.5,1) ${index * 0.04}s, transform 0.35s ease, border-color 0.3s, box-shadow 0.3s, border-top 0.3s`,
                  boxShadow: isHovered
                    ? `0 0 25px ${diag.themeColor}15, 0 8px 30px rgba(0,0,0,.06)`
                    : "0 2px 12px rgba(0,0,0,.04)",
                  // 研究ノート風の罫線パターン背景
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(45,212,191,0.04) 23px, rgba(45,212,191,0.04) 24px)",
                }}
              >
                {/* カード角のフラスコ装飾 */}
                <FlaskSvg size={16} color={diag.themeColor} style={{
                  position: "absolute", top: 8, right: 8, opacity: 0.2,
                }} />

                {/* ホバー時の泡エフェクト */}
                {isHovered && (
                  <>
                    <BubbleSvg size={8} color={diag.themeColor} style={{
                      position: "absolute", bottom: 12, right: 20,
                      animation: "cardBubble1 1.5s ease-in-out infinite",
                    }} />
                    <BubbleSvg size={6} color={diag.themeColor} style={{
                      position: "absolute", bottom: 18, right: 34,
                      animation: "cardBubble2 1.8s ease-in-out infinite 0.3s",
                    }} />
                    <BubbleSvg size={10} color={diag.themeColor} style={{
                      position: "absolute", bottom: 8, right: 48,
                      animation: "cardBubble3 2s ease-in-out infinite 0.6s",
                    }} />
                  </>
                )}

                {/* 左側: 大きな絵文字アイコン */}
                <div
                  style={{
                    fontSize: "2.2rem",
                    minWidth: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${diag.themeColor}18, ${diag.themeColor}08)`,
                    flexShrink: 0,
                    transition: "transform 0.3s ease",
                    transform: isHovered ? "rotate(-5deg) scale(1.05)" : "none",
                  }}
                >
                  {diag.emoji}
                </div>

                {/* 右側: テキスト情報 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* タイトル行 */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <h3
                      className="font-zen"
                      style={{
                        fontSize: "0.95rem", fontWeight: 700,
                        color: "#0f1f2b",
                        margin: 0,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}
                    >
                      {diag.title}
                    </h3>
                    {isCompleted && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 18, height: 18, borderRadius: "50%",
                        background: "rgba(45,212,191,.15)", fontSize: 10, color: "#2dd4bf",
                        flexShrink: 0,
                      }}>
                        ✓
                      </span>
                    )}
                  </div>

                  {/* ホバー時「実験中...」テキスト */}
                  {isHovered && (
                    <span style={{
                      display: "inline-block",
                      fontSize: "0.65rem", color: diag.themeColor,
                      fontWeight: 700, fontFamily: "monospace",
                      letterSpacing: "0.1em",
                      animation: "experimentPulse 1.2s ease-in-out infinite",
                      marginBottom: 2,
                    }}>
                      ▶ EXPERIMENT READY...
                    </span>
                  )}

                  {/* 説明文 */}
                  <p style={{
                    fontSize: "0.75rem", lineHeight: 1.5, color: "#2d4a57",
                    marginBottom: 8,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {diag.description}
                  </p>

                  {/* メタ情報バッジ */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 8,
                      background: "rgba(45,212,191,.08)", border: "1px solid rgba(45,212,191,.15)",
                      fontSize: 10, color: "#2d4a57",
                    }}>
                      {diag.questionCount}問
                    </span>
                    <span style={{
                      padding: "2px 8px", borderRadius: 8,
                      background: "rgba(45,212,191,.08)", border: "1px solid rgba(45,212,191,.15)",
                      fontSize: 10, color: "#2d4a57",
                    }}>
                      約{diag.estimatedMinutes}分
                    </span>
                    {isCompleted && result && (
                      <span style={{
                        padding: "2px 8px", borderRadius: 8,
                        background: "rgba(45,212,191,.1)", border: "1px solid rgba(45,212,191,.2)",
                        fontSize: 10, color: "#2dd4bf", fontWeight: 600,
                      }}>
                        {result.typeName}
                      </span>
                    )}
                    {diag.isFeatured && (
                      <span style={{
                        padding: "2px 8px", borderRadius: 8,
                        background: "linear-gradient(135deg, rgba(45,212,191,.12), rgba(99,102,241,.12))",
                        border: "1px solid rgba(45,212,191,.2)",
                        fontSize: 10, color: "#2dd4bf", fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}>
                        イチオシ
                      </span>
                    )}
                  </div>
                </div>

                {/* 背景グラデーション（微かなアクセント） */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, right: 0, width: 100, height: 100,
                    background: `radial-gradient(circle at top right, ${diag.themeColor}0A, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== ペルソナカード誘導セクション（研究成果発表風） ===== */}
      <section
        style={{
          padding: "40px 20px",
          maxWidth: 650,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(45,212,191,.12)",
            borderRadius: 24,
            padding: "36px 24px",
            boxShadow: "0 4px 24px rgba(0,0,0,.04)",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* 背景装飾 */}
          <div style={{
            position: "absolute", top: -10, left: -10, opacity: 0.08,
            transform: "rotate(-15deg)",
          }}>
            <DnaSvg size={50} color="#6366f1" />
          </div>
          <div style={{
            position: "absolute", bottom: -5, right: -5, opacity: 0.08,
            transform: "rotate(20deg)",
          }}>
            <FlaskSvg size={60} color="#2dd4bf" />
          </div>

          {/* メダルとトロフィー装飾 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            <MedalSvg size={28} color="#c084fc" />
            <TrophySvg size={44} color="#FFD700" />
            <MedalSvg size={28} color="#FF6BE8" />
          </div>

          <span style={{
            fontSize: "0.65rem", letterSpacing: "0.2em", color: "#6366f1",
            display: "block", marginBottom: 8,
          }}>
            RESEARCH RESULTS
          </span>

          <h2
            className="font-stick"
            style={{
              fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
              color: "#0f1f2b",
              marginBottom: 10,
            }}
          >
            研究成果発表
          </h2>
          <p
            style={{
              fontSize: 13, color: "#2d4a57", lineHeight: 1.8,
              marginBottom: 8, maxWidth: 420, margin: "0 auto 8px",
            }}
          >
            全ての実験結果を統合して、あなただけの研究レポートを生成。
          </p>
          <p
            style={{
              fontSize: 12, color: "#4a6572", lineHeight: 1.7,
              marginBottom: 24, maxWidth: 420, margin: "0 auto 24px",
            }}
          >
            レアリティ付きのペルソナカードをSNSでシェアして、
            仲間と結果を比較しよう!
          </p>

          {/* 進捗インジケータ */}
          {completedCount > 0 && (
            <div style={{
              marginBottom: 20,
              padding: "10px 16px",
              borderRadius: 12,
              background: "rgba(45,212,191,.06)",
              border: "1px dashed rgba(45,212,191,.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#4a6572" }}>実験進捗</span>
                <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 700 }}>
                  {completedCount} / {ALL_DIAGNOSES.length}
                </span>
              </div>
              <div style={{
                width: "100%", height: 6, borderRadius: 3,
                background: "rgba(45,212,191,.1)",
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${(completedCount / ALL_DIAGNOSES.length) * 100}%`,
                  height: "100%", borderRadius: 3,
                  background: "linear-gradient(90deg, #2dd4bf, #6366f1)",
                  transition: "width 0.5s ease",
                }} />
              </div>
            </div>
          )}

          <Link
            href="/persona"
            style={{
              padding: "14px 36px",
              fontSize: 14,
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #2dd4bf, #6366f1)",
              color: "#fff",
              borderRadius: 50,
              fontWeight: 700,
              fontFamily: "'Zen Maru Gothic', sans-serif",
              boxShadow: "0 4px 20px rgba(45,212,191,.25), 0 0 0 4px rgba(45,212,191,.08)",
              transition: "all 0.3s ease",
            }}
          >
            <TestTubeSvg size={18} color="#fff" />
            {completedCount > 0
              ? `研究レポートを見る (${completedCount}実験完了)`
              : "ペルソナカードとは?"}
          </Link>
        </div>
      </section>

      {/* ===== フッター（ラボ風） ===== */}
      <footer
        style={{
          padding: "48px 20px 30px", textAlign: "center",
          borderTop: "1px solid rgba(45,212,191,.1)",
          position: "relative", zIndex: 1,
        }}
      >
        {/* ラボ装飾ライン */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          marginBottom: 16,
        }}>
          <div style={{ width: 40, height: 1, background: "rgba(45,212,191,.2)" }} />
          <TestTubeSvg size={16} color="#2dd4bf" style={{ opacity: 0.4 }} />
          <FlaskSvg size={18} color="#6366f1" style={{ opacity: 0.3 }} />
          <TestTubeSvg size={14} color="#38bdf8" style={{ opacity: 0.35 }} />
          <div style={{ width: 40, height: 1, background: "rgba(45,212,191,.2)" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <FlaskSvg size={18} color="#2dd4bf" />
          <span className="font-stick" style={{
            fontSize: "1.2rem",
            color: "#2dd4bf",
          }}>
            診断研究所
          </span>
        </div>
        <p style={{ fontSize: "0.78rem", color: "#4a6572", marginBottom: 4, letterSpacing: "0.08em" }}>
          SHINDAN LABORATORY
        </p>
        <p style={{ fontSize: "0.82rem", color: "#4a6572", marginBottom: 12 }}>
          あなたの本当の姿を、科学する。
        </p>

        {/* TikTok公式 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, padding: "16px 0",
        }}>
          <a
            href="https://www.tiktok.com/@tokimeki_lab"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 20px", borderRadius: 25,
              background: "#000", color: "#fff",
              fontSize: 13, fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z"/>
            </svg>
            公式TikTokはこちら
          </a>
        </div>

        {/* 法的ページリンク */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "4px 16px", padding: "12px 0",
        }}>
          {[
            { label: "プライバシーポリシー", href: "/privacy" },
            { label: "利用規約", href: "/terms" },
            { label: "特定商取引法に基づく表記", href: "/tokusho" },
            { label: "お問い合わせ", href: "/contact" },
          ].map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontSize: 10, color: "#4a6572", textDecoration: "none",
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* コピーライト */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "4px 0 20px",
        }}>
          <TestTubeSvg size={12} color="#94a8b4" style={{ opacity: 0.5 }} />
          <p style={{ fontSize: 10, color: "#94a8b4", margin: 0 }}>
            &copy; 2026 診断研究所 All rights reserved.
          </p>
          <TestTubeSvg size={12} color="#94a8b4" style={{ opacity: 0.5 }} />
        </div>
      </footer>

      {/* CSSアニメーション */}
      <style jsx>{`
        @media (max-width: 640px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* スライダーのサム */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2dd4bf;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(45,212,191,.4);
          border: 2px solid rgba(255,255,255,.8);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2dd4bf;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(45,212,191,.4);
          border: 2px solid rgba(255,255,255,.8);
        }

        /* 浮遊アニメーション（フラスコ・試験管） */
        @keyframes labFloat1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(5deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
          75% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes labFloat2 {
          0%, 100% { transform: translateY(0) rotate(15deg); }
          33% { transform: translateY(-18px) rotate(20deg); }
          66% { transform: translateY(-10px) rotate(10deg); }
        }
        @keyframes labFloat3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }

        /* 泡の上昇アニメーション */
        @keyframes bubbleRise1 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.3; }
        }
        @keyframes bubbleRise2 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-25px) scale(0.8); opacity: 0.2; }
        }
        @keyframes bubbleRise3 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-35px) scale(1.3); opacity: 0.15; }
        }

        /* カードホバー時の泡エフェクト */
        @keyframes cardBubble1 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-16px) scale(1.3); opacity: 0.1; }
        }
        @keyframes cardBubble2 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.05; }
        }
        @keyframes cardBubble3 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.35; }
          50% { transform: translateY(-14px) scale(1.4); opacity: 0.08; }
        }

        /* 「実験中...」点滅 */
        @keyframes experimentPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
