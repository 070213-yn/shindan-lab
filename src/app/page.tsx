"use client";

/**
 * 診断研究所 ポータルページ（大幅リニューアル版）
 *
 * グラスモーフィズム + リッチアニメーション + 高情報密度
 * テーマパーク入口のワクワク感と洗練されたデザインの融合
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { DIAGNOSIS_LIST } from "@/lib/diagnoses";
import { usePersonaStore } from "@/store/personaStore";
import PixelSparkle from "@/components/PixelSparkle";

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
type CategoryKey = "all" | "personality" | "mind" | "social" | "mystery";
const CATEGORIES: { key: CategoryKey; label: string; emoji: string }[] = [
  { key: "all", label: "すべて", emoji: "\u2726" },
  { key: "personality", label: "性格・タイプ", emoji: "\u{1F9EC}" },
  { key: "mind", label: "メンタル・心理", emoji: "\u{1F9E0}" },
  { key: "social", label: "恋愛・対人", emoji: "\u{1F4AC}" },
  { key: "mystery", label: "スピ・エンタメ", emoji: "\u{1F52E}" },
];

// 各診断をカテゴリに分類するマップ
const CATEGORY_MAP: Record<string, CategoryKey> = {
  mbti128: "personality",
  shadow: "personality",
  stress: "mind",
  love: "social",
  pastlife: "mystery",
  torisetsu: "personality",
  godtype: "mystery",
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

// 人気の実験ランキング（デフォルト: Google Analytics連動予定）
const POPULAR_EXPERIMENTS = [
  { rank: 1, id: "mbti128", medal: "#FFD700", label: "ゴールド" },
  { rank: 2, id: "love", medal: "#C0C0C0", label: "シルバー" },
  { rank: 3, id: "torisetsu", medal: "#CD7F32", label: "ブロンズ" },
];

// 研究所からのお知らせ
const LAB_NEWS = [
  { date: "2026.03", text: "診断研究所がオープンしました!", isNew: true },
];

// タイプライター用テキスト
const TYPEWRITER_TEXTS = [
  "あなたの本当の姿、実験してみない?",
  "心理学ベースの本格診断 7種類",
  "知らなかった自分に出会える場所",
  "完全無料・登録不要ですぐ始められる",
];

// カードに付けるタグ（「人気」「新作」など）
const CARD_TAGS: Record<string, { text: string; bg: string; color: string }> = {
  mbti128: { text: "大人気", bg: "linear-gradient(135deg, #FF6BE8, #C45AFF)", color: "#fff" },
  shadow: { text: "人気", bg: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" },
  love: { text: "定番", bg: "linear-gradient(135deg, #ec4899, #f43f5e)", color: "#fff" },
  torisetsu: { text: "新作", bg: "linear-gradient(135deg, #2dd4bf, #38bdf8)", color: "#fff" },
  godtype: { text: "新作", bg: "linear-gradient(135deg, #D4AF37, #F0C040)", color: "#fff" },
};


// ========== スクロールフェードインフック ==========
function useScrollFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}


export default function PortalPage() {
  // ハイドレーション対策
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // ヒーローアニメーション
  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // タイプライターアニメーション
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const currentFullText = TYPEWRITER_TEXTS[typewriterIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typewriterText === currentFullText) {
      // テキスト完成後、2秒待って削除開始
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typewriterText === "") {
      // 削除完了、次のテキストへ
      setIsDeleting(false);
      setTypewriterIndex((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setTypewriterText(currentFullText.slice(0, typewriterText.length - 1));
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setTypewriterText(currentFullText.slice(0, typewriterText.length + 1));
      }, 60);
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, typewriterIndex]);

  // スクロールフェードイン（各セクション用）
  const rankingFade = useScrollFadeIn(0.1);
  const newsFade = useScrollFadeIn(0.1);
  const gridFade = useScrollFadeIn(0.05);
  const personaFade = useScrollFadeIn(0.1);

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

  // ティッカー
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
      {/* ===== 装飾的グラデーション背景ブロブ ===== */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: "none", zIndex: 0, overflow: "hidden",
      }}>
        {/* ピンクブロブ - 左上 */}
        <div style={{
          position: "absolute", top: "-10%", left: "-15%",
          width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,168,212,0.25) 0%, rgba(249,168,212,0.08) 40%, transparent 70%)",
          animation: "blobFloat 12s ease-in-out infinite",
          filter: "blur(40px)",
        }} />
        {/* 紫ブロブ - 右上 */}
        <div style={{
          position: "absolute", top: "5%", right: "-10%",
          width: "45vw", height: "45vw", maxWidth: 550, maxHeight: 550,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,181,253,0.22) 0%, rgba(196,181,253,0.06) 40%, transparent 70%)",
          animation: "blobFloat 15s ease-in-out infinite reverse",
          filter: "blur(40px)",
        }} />
        {/* ミントブロブ - 中央下 */}
        <div style={{
          position: "absolute", top: "40%", left: "20%",
          width: "55vw", height: "55vw", maxWidth: 650, maxHeight: 650,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(110,231,183,0.18) 0%, rgba(110,231,183,0.05) 40%, transparent 70%)",
          animation: "blobFloat 18s ease-in-out infinite 3s",
          filter: "blur(50px)",
        }} />
        {/* ブルーブロブ - 右下 */}
        <div style={{
          position: "absolute", top: "60%", right: "5%",
          width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(147,197,253,0.2) 0%, rgba(147,197,253,0.05) 40%, transparent 70%)",
          animation: "blobFloat 14s ease-in-out infinite 6s",
          filter: "blur(45px)",
        }} />

        {/* 浮遊SVG装飾 */}
        <FlaskSvg size={48} color="#2dd4bf" style={{
          position: "absolute", top: "12%", left: "5%",
          opacity: 0.15, animation: "labFloat1 8s ease-in-out infinite",
        }} />
        <TestTubeSvg size={40} color="#38bdf8" style={{
          position: "absolute", top: "8%", right: "10%",
          opacity: 0.12, animation: "labFloat2 10s ease-in-out infinite",
          transform: "rotate(15deg)",
        }} />
        <DnaSvg size={30} color="#c084fc" style={{
          position: "absolute", top: "30%", left: "8%",
          opacity: 0.1, animation: "labFloat3 12s ease-in-out infinite",
        }} />
        <BubbleSvg size={20} color="#2dd4bf" style={{
          position: "absolute", top: "20%", left: "30%",
          animation: "bubbleRise1 7s ease-in-out infinite",
        }} />
        <BubbleSvg size={14} color="#38bdf8" style={{
          position: "absolute", top: "40%", right: "20%",
          animation: "bubbleRise2 9s ease-in-out infinite",
        }} />
        <FlaskSvg size={36} color="#c084fc" style={{
          position: "absolute", bottom: "20%", right: "8%",
          opacity: 0.1, animation: "labFloat1 11s ease-in-out infinite reverse",
        }} />
        <BubbleSvg size={24} color="#2dd4bf" style={{
          position: "absolute", top: "50%", left: "45%",
          animation: "bubbleRise2 11s ease-in-out infinite 1s",
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

      {/* ===== ナビバー ===== */}
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
          <span className="font-stick" style={{ color: "#2dd4bf", fontSize: "1.1rem" }}>
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
            fontSize: 11, fontWeight: 700, textDecoration: "none",
            letterSpacing: "0.03em",
            border: completedCount > 0 ? "none" : "1px solid rgba(45,212,191,.2)",
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <TestTubeSvg size={14} color={completedCount > 0 ? "#fff" : "#2dd4bf"} />
          {completedCount > 0 ? `PERSONA (${completedCount})` : "PERSONA CARD"}
        </Link>
      </nav>

      {/* ===== ヒーローセクション（グラスモーフィズム） ===== */}
      <section
        style={{
          minHeight: "60svh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "120px 20px 40px", position: "relative", zIndex: 1,
        }}
      >
        {/* ヒーロー背景のキラキラ演出 */}
        <PixelSparkle
          variants={["star", "twinkle", "dust", "diamond"]}
          color="#2dd4bf"
          count={15}
          size={16}
          speed={150}
          area="top"
          style={{ zIndex: 0, pointerEvents: "none" }}
        />
        {/* グラスモーフィズム ヒーローカード */}
        <div style={{
          position: "relative",
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: 32,
          padding: "48px 40px 40px",
          maxWidth: 680,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,0.6)",
          opacity: heroMounted ? 1 : 0,
          transform: heroMounted ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}>
          {/* カード内部の微かな光沢エフェクト */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "50%",
            borderRadius: "32px 32px 0 0",
            background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)",
            pointerEvents: "none",
          }} />

          {/* 上部の試験管×フラスコ装飾 */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
            justifyContent: "center",
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
          }}>
            <TestTubeSvg size={28} color="#2dd4bf" style={{ transform: "rotate(-15deg)" }} />
            <BubbleSvg size={10} color="#2dd4bf" />
            <FlaskSvg size={24} color="#6366f1" />
            <BubbleSvg size={8} color="#c084fc" />
            <TestTubeSvg size={22} color="#38bdf8" style={{ transform: "rotate(15deg)" }} />
          </div>

          {/* 「13種類の本格診断」バッジ */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 20px", borderRadius: 50,
            background: "linear-gradient(135deg, rgba(45,212,191,0.15), rgba(99,102,241,0.12))",
            border: "1px solid rgba(45,212,191,0.3)",
            marginBottom: 20,
            opacity: heroMounted ? 1 : 0,
            transition: "opacity 0.5s ease-out 0.3s",
          }}>
            <span style={{ fontSize: 16 }}>{"\u{1F9EA}"}</span>
            <span style={{
              fontSize: 13, fontWeight: 800, letterSpacing: "0.08em",
              background: "linear-gradient(135deg, #2dd4bf, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              13種類の本格診断
            </span>
            <span style={{
              fontSize: 10, fontWeight: 700, color: "#fff",
              background: "#ef4444", borderRadius: 8, padding: "1px 6px",
            }}>
              無料
            </span>
          </div>

          {/* メインタイトル（グラデーションテキスト） */}
          <h1
            style={{
              lineHeight: 1.15, marginBottom: 8,
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
            }}
          >
            <span className="font-dela" style={{
              display: "block",
              fontSize: "clamp(36px, 10vw, 64px)",
              background: "linear-gradient(135deg, #0f1f2b 0%, #2dd4bf 40%, #6366f1 70%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 2px 8px rgba(45,212,191,0.2))",
            }}>
              診断研究所
            </span>
          </h1>

          {/* 英語サブ */}
          <p style={{
            fontSize: "0.75rem", letterSpacing: "0.3em", color: "#6366f1",
            marginBottom: 16, fontWeight: 600,
            opacity: heroMounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.4s",
          }}>
            SHINDAN LABORATORY
          </p>

          {/* グラデーション区切り線 */}
          <div style={{
            width: 80, height: 3, borderRadius: 2, margin: "0 auto 20px",
            background: "linear-gradient(90deg, #2dd4bf, #6366f1, #c084fc)",
            opacity: heroMounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.45s",
          }} />

          {/* タイプライター風テキスト */}
          <div
            style={{
              fontSize: "clamp(0.95rem, 3vw, 1.2rem)", fontWeight: 700,
              color: "#2d4a57", marginBottom: 8,
              minHeight: "1.8em",
              opacity: heroMounted ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
            className="font-zen"
          >
            <span>{typewriterText}</span>
            <span style={{
              display: "inline-block", width: 2, height: "1.1em",
              background: "#2dd4bf", marginLeft: 2,
              verticalAlign: "middle",
              animation: "cursorBlink 0.8s step-end infinite",
            }} />
          </div>

          <p style={{
            fontSize: "0.82rem", color: "#4a6572", marginBottom: 24,
            lineHeight: 1.7,
            opacity: heroMounted ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.55s",
          }}>
            心理学ベースの本格診断で、知らなかった自分に出会える研究所。
          </p>

          {/* プロフィール設定ボタン */}
          <div style={{
            marginBottom: 16,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s",
          }}>
            {mounted && globalProfile.gender && globalProfile.age ? (
              <button
                onClick={() => {
                  setTempName(globalProfile.name ?? "");
                  setTempGender(globalProfile.gender);
                  setTempAge(globalProfile.age ?? 16);
                  setShowProfileSetup(true);
                }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 22px", borderRadius: 14,
                  background: "rgba(45,212,191,.08)",
                  border: "1px solid rgba(45,212,191,.2)",
                  color: "#2d4a57", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s ease",
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 22, height: 22, borderRadius: "50%",
                  background: "rgba(45,212,191,.15)", fontSize: 12, color: "#2dd4bf",
                }}>{"\u2713"}</span>
                <span>
                  <strong style={{ color: "#2dd4bf" }}>
                    {globalProfile.name ? `${globalProfile.name}さん` : ""}{globalProfile.name ? " / " : ""}{globalProfile.age}歳・{genderLabel(globalProfile.gender)}
                  </strong> で設定済み
                </span>
                <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 700 }}>変更</span>
              </button>
            ) : (
              <button
                onClick={() => setShowProfileSetup(true)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 22px", borderRadius: 14,
                  background: "rgba(45,212,191,.08)",
                  border: "1.5px dashed rgba(45,212,191,.35)",
                  color: "#2d4a57", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s ease",
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                <TestTubeSvg size={16} color="#2dd4bf" />
                すべての診断で使えるプロフィールを設定
              </button>
            )}
          </div>

          {/* プロフィール設定フォーム（インラインモーダル） */}
          {showProfileSetup && (
            <div style={{
              marginBottom: 20, padding: "20px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(45,212,191,.2)",
              animation: "slideDown 0.3s ease-out",
              textAlign: "left",
            }}>
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "#4a6572", marginBottom: 8 }}>ニックネーム（任意）</p>
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

              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "#4a6572", marginBottom: 8 }}>性別</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { value: "male", label: "男性", emoji: "\u2642" },
                    { value: "female", label: "女性", emoji: "\u2640" },
                    { value: "other", label: "その他", emoji: "\u25C7" },
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

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setShowProfileSetup(false)}
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 12,
                    background: "rgba(0,0,0,.04)", border: "1px solid rgba(0,0,0,.08)",
                    color: "#4a6572", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={!tempGender}
                  className={tempGender ? "btn-gradient" : ""}
                  style={{
                    flex: 2, padding: "10px 0", borderRadius: 12,
                    background: tempGender ? "linear-gradient(135deg, #2dd4bf, #38bdf8)" : "rgba(45,212,191,.1)",
                    border: "none",
                    color: tempGender ? "#fff" : "#4a6572",
                    fontSize: 13, fontWeight: 700,
                    cursor: tempGender ? "pointer" : "default",
                  }}
                >
                  保存する
                </button>
              </div>
            </div>
          )}

          {/* CTAボタン */}
          <a
            href="#experiments"
            className="btn-gradient"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 40px", borderRadius: 50,
              fontSize: 15, fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(45,212,191,.35), 0 0 0 4px rgba(45,212,191,.1)",
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease-out 0.7s, transform 0.6s ease-out 0.7s, box-shadow 0.3s ease",
            }}
          >
            <FlaskSvg size={18} color="#fff" />
            実験を始める
          </a>
        </div>
      </section>

      {/* ===== セクション区切り ===== */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div className="section-line-animate" />
      </div>

      {/* ===== 人気の実験ランキング ===== */}
      <section
        ref={rankingFade.ref}
        style={{
          padding: "40px 16px", maxWidth: 800, margin: "0 auto",
          position: "relative", zIndex: 1,
          opacity: rankingFade.visible ? 1 : 0,
          transform: rankingFade.visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        {/* グラスモーフィズムカード */}
        <div style={{
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: 24,
          padding: "32px 28px",
          boxShadow: "0 8px 32px rgba(0,0,0,.05), inset 0 1px 0 rgba(255,255,255,0.5)",
          position: "relative", overflow: "hidden",
        }}>
          {/* 背景の微かなグラデーション装飾 */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,215,0,0.08), transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* セクションヘッダ */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <TrophySvg size={32} />
            <div>
              <span style={{
                fontSize: "0.7rem", letterSpacing: "0.15em", color: "#f59e0b",
                display: "block", fontWeight: 700,
              }}>
                POPULAR EXPERIMENTS
              </span>
              <h2 className="font-stick" style={{ fontSize: "1.3rem", color: "#0f1f2b", margin: 0 }}>
                人気の実験ランキング
              </h2>
            </div>
          </div>

          {/* ランキングリスト */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {POPULAR_EXPERIMENTS.map((item, idx) => {
              const diag = ALL_DIAGNOSES.find((d) => d.id === item.id);
              if (!diag) return null;

              // メダルのグラデーション（ゴールド/シルバー/ブロンズ）
              const medalGradients: Record<number, string> = {
                1: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700, #FFEC8B)",
                2: "linear-gradient(135deg, #C0C0C0, #E8E8E8, #A9A9A9, #D3D3D3)",
                3: "linear-gradient(135deg, #CD7F32, #DEB887, #8B6914, #DAA520)",
              };
              const medalShadows: Record<number, string> = {
                1: "0 2px 12px rgba(255,215,0,.5), inset 0 1px 2px rgba(255,255,255,.6)",
                2: "0 2px 12px rgba(192,192,192,.4), inset 0 1px 2px rgba(255,255,255,.6)",
                3: "0 2px 12px rgba(205,127,50,.4), inset 0 1px 2px rgba(255,255,255,.4)",
              };

              return (
                <Link
                  key={item.id}
                  href={diag.href}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "16px 20px", borderRadius: 16,
                    background: idx === 0
                      ? "linear-gradient(135deg, rgba(255,215,0,0.06), rgba(255,165,0,0.04))"
                      : "rgba(255,255,255,0.5)",
                    border: idx === 0
                      ? "1.5px solid rgba(255,215,0,0.3)"
                      : "1px solid rgba(45,212,191,.1)",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)",
                    position: "relative", overflow: "hidden",
                  }}
                  className="card-cute"
                >
                  {/* 順位メダル（リッチ版） */}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: medalGradients[item.rank] || medalGradients[3],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 900, color: "#fff",
                    flexShrink: 0,
                    boxShadow: medalShadows[item.rank] || medalShadows[3],
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    position: "relative",
                  }}>
                    {/* 光沢オーバーレイ */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "50%",
                      borderRadius: "50% 50% 0 0",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.4), transparent)",
                      pointerEvents: "none",
                    }} />
                    {item.rank}
                  </div>

                  {/* 絵文字 */}
                  <span style={{ fontSize: "1.8rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>
                    {diag.emoji}
                  </span>

                  {/* テキスト */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="font-zen" style={{
                      fontSize: "0.95rem", fontWeight: 700, color: "#0f1f2b", margin: 0,
                    }}>
                      {diag.title}
                    </h3>
                    <p style={{ fontSize: "0.72rem", color: "#4a6572", margin: "2px 0 0 0" }}>
                      {diag.questionCount}問 / 約{diag.estimatedMinutes}分
                    </p>
                  </div>

                  {/* ランクラベル */}
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: item.medal,
                    letterSpacing: "0.05em", opacity: 0.7,
                  }}>
                    {item.label}
                  </span>

                  {/* 矢印 */}
                  <span style={{ color: "#2dd4bf", fontSize: 18, fontWeight: 700 }}>{"\u2192"}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== セクション区切り ===== */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div className="section-line-animate" />
      </div>

      {/* ===== 診断カードグリッド ===== */}
      <section
        id="experiments"
        ref={gridFade.ref}
        style={{
          padding: "32px 16px 80px", maxWidth: 1200, margin: "0 auto",
          position: "relative", zIndex: 1,
        }}
      >
        {/* カードグリッド周辺のふわふわパーティクル */}
        <PixelSparkle
          variants={["bubble", "dust", "snow"]}
          color="#8B5CF6"
          count={8}
          size={14}
          speed={160}
          style={{ zIndex: 0, pointerEvents: "none" }}
        />
        {/* セクションタイトル */}
        <div style={{
          textAlign: "left", marginBottom: 24,
          display: "flex", alignItems: "center", gap: 14,
          opacity: gridFade.visible ? 1 : 0,
          transform: gridFade.visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "linear-gradient(135deg, rgba(45,212,191,.15), rgba(99,102,241,.1))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FlaskSvg size={26} color="#2dd4bf" />
          </div>
          <div>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#2dd4bf", display: "block", marginBottom: 4, fontWeight: 700 }}>
              ALL EXPERIMENTS
            </span>
            <h2 className="font-stick" style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#0f1f2b", margin: 0 }}>
              実験を選ぶ
            </h2>
          </div>
        </div>

        {/* カテゴリタブ */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 24,
          overflowX: "auto", paddingBottom: 4,
          scrollbarWidth: "none",
          opacity: gridFade.visible ? 1 : 0,
          transition: "opacity 0.5s ease-out 0.15s",
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: "10px 18px", borderRadius: 24,
                background: activeCategory === cat.key
                  ? "linear-gradient(135deg, #2dd4bf, #6366f1)"
                  : "rgba(255,255,255,0.5)",
                border: activeCategory === cat.key
                  ? "none"
                  : "1px solid rgba(45,212,191,.15)",
                color: activeCategory === cat.key ? "#fff" : "#2d4a57",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.25s ease",
                backdropFilter: "blur(8px)",
                boxShadow: activeCategory === cat.key
                  ? "0 4px 16px rgba(45,212,191,.25)"
                  : "0 1px 4px rgba(0,0,0,.04)",
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* カードグリッド（3列 / 2列 / 1列） */}
        <div
          className="portal-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {filteredDiagnoses.map((diag, index) => {
            const result = personaResults[diag.id];
            const isCompleted = !!result;
            const isHovered = hoveredCard === diag.id;
            const tag = CARD_TAGS[diag.id];

            return (
              <Link
                key={diag.id}
                href={diag.href}
                onClick={handleRipple}
                onMouseEnter={() => setHoveredCard(diag.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  borderRadius: 20,
                  padding: "0",
                  border: isHovered
                    ? `1.5px solid ${diag.themeColor}60`
                    : "1px solid rgba(255,255,255,0.6)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: gridFade.visible ? 1 : 0,
                  transform: gridFade.visible
                    ? (isHovered ? "scale(1.03)" : "scale(1)")
                    : "translateY(30px) scale(0.96)",
                  transition: `opacity 0.5s cubic-bezier(0.25,1,0.5,1) ${index * 0.04}s, transform 0.35s ease, border-color 0.3s, box-shadow 0.3s`,
                  boxShadow: isHovered
                    ? `0 0 30px ${diag.themeColor}20, 0 12px 40px rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,0.5)`
                    : "0 4px 16px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,0.4)",
                }}
              >
                {/* カードトップ: 絵文字+グラデーション背景 */}
                <div style={{
                  padding: "28px 20px 20px",
                  background: `linear-gradient(145deg, ${diag.gradientFrom}12, ${diag.gradientTo}08)`,
                  position: "relative",
                  textAlign: "center",
                  borderBottom: `1px solid ${diag.themeColor}15`,
                }}>
                  {/* ホバー時のグローエフェクト */}
                  {isHovered && (
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      width: 120, height: 120,
                      transform: "translate(-50%, -50%)",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${diag.themeColor}15, transparent 70%)`,
                      animation: "cardGlow 2s ease-in-out infinite",
                      pointerEvents: "none",
                    }} />
                  )}

                  {/* タグ（人気、新作など） */}
                  {tag && (
                    <span style={{
                      position: "absolute", top: 10, right: 10,
                      padding: "3px 10px", borderRadius: 10,
                      background: tag.bg, color: tag.color,
                      fontSize: 10, fontWeight: 800,
                      boxShadow: "0 2px 8px rgba(0,0,0,.1)",
                      letterSpacing: "0.05em",
                    }}>
                      {tag.text}
                    </span>
                  )}

                  {/* 大きな絵文字 */}
                  <div style={{
                    fontSize: "3rem",
                    lineHeight: 1,
                    transition: "transform 0.3s cubic-bezier(0.25,1,0.5,1)",
                    transform: isHovered ? "scale(1.15) rotate(-5deg)" : "scale(1)",
                    filter: isHovered ? `drop-shadow(0 4px 12px ${diag.themeColor}40)` : "none",
                    marginBottom: 4,
                  }}>
                    {diag.emoji}
                  </div>

                  {/* サブタイトル */}
                  {diag.subtitle && (
                    <p style={{
                      fontSize: 11, color: diag.themeColor, fontWeight: 600,
                      margin: 0, opacity: 0.8,
                    }}>
                      {diag.subtitle}
                    </p>
                  )}
                </div>

                {/* カードボトム: テキスト情報 */}
                <div style={{ padding: "16px 20px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* タイトル行 */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <h3
                      className="font-zen"
                      style={{
                        fontSize: "0.95rem", fontWeight: 700,
                        color: "#0f1f2b", margin: 0,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}
                    >
                      {diag.title}
                    </h3>
                    {isCompleted && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 20, height: 20, borderRadius: "50%",
                        background: "linear-gradient(135deg, #2dd4bf, #38bdf8)",
                        fontSize: 10, color: "#fff", flexShrink: 0,
                        boxShadow: "0 2px 6px rgba(45,212,191,.3)",
                      }}>
                        {"\u2713"}
                      </span>
                    )}
                  </div>

                  {/* 説明文 */}
                  <p style={{
                    fontSize: "0.75rem", lineHeight: 1.6, color: "#4a6572",
                    marginBottom: 12, flex: 1,
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
                      padding: "3px 10px", borderRadius: 8,
                      background: `${diag.themeColor}0D`,
                      border: `1px solid ${diag.themeColor}20`,
                      fontSize: 10, color: "#2d4a57", fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 3,
                    }}>
                      {"\u{1F4DD}"} {diag.questionCount}問
                    </span>
                    <span style={{
                      padding: "3px 10px", borderRadius: 8,
                      background: `${diag.themeColor}0D`,
                      border: `1px solid ${diag.themeColor}20`,
                      fontSize: 10, color: "#2d4a57", fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 3,
                    }}>
                      {"\u23F1"} 約{diag.estimatedMinutes}分
                    </span>
                    {isCompleted && result && (
                      <span style={{
                        padding: "3px 10px", borderRadius: 8,
                        background: "rgba(45,212,191,.1)",
                        border: "1px solid rgba(45,212,191,.2)",
                        fontSize: 10, color: "#2dd4bf", fontWeight: 700,
                      }}>
                        {result.typeName}
                      </span>
                    )}
                  </div>
                </div>

                {/* ホバー時の下部グラデーションバー */}
                <div style={{
                  height: 3,
                  background: isHovered
                    ? `linear-gradient(90deg, ${diag.gradientFrom}, ${diag.gradientTo})`
                    : "transparent",
                  transition: "background 0.3s ease",
                }} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== セクション区切り ===== */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div className="section-line-animate" />
      </div>

      {/* ===== ペルソナカード誘導セクション ===== */}
      <section
        ref={personaFade.ref}
        style={{
          padding: "40px 20px",
          maxWidth: 700, margin: "0 auto",
          textAlign: "center", position: "relative", zIndex: 1,
          opacity: personaFade.visible ? 1 : 0,
          transform: personaFade.visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div style={{
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: 28,
          padding: "40px 28px",
          boxShadow: "0 8px 32px rgba(0,0,0,.05), inset 0 1px 0 rgba(255,255,255,0.5)",
          position: "relative", overflow: "hidden",
        }}>
          {/* 背景装飾 */}
          <div style={{
            position: "absolute", top: -20, left: -20, opacity: 0.06,
            transform: "rotate(-15deg)",
          }}>
            <DnaSvg size={60} color="#6366f1" />
          </div>
          <div style={{
            position: "absolute", bottom: -10, right: -10, opacity: 0.06,
            transform: "rotate(20deg)",
          }}>
            <FlaskSvg size={70} color="#2dd4bf" />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <MedalSvg size={28} color="#c084fc" />
            <TrophySvg size={44} color="#FFD700" />
            <MedalSvg size={28} color="#FF6BE8" />
          </div>

          <span style={{
            fontSize: "0.65rem", letterSpacing: "0.2em", color: "#6366f1",
            display: "block", marginBottom: 8, fontWeight: 700,
          }}>
            RESEARCH RESULTS
          </span>

          <h2 className="font-stick" style={{
            fontSize: "clamp(1.2rem, 4vw, 1.6rem)", color: "#0f1f2b", marginBottom: 10,
          }}>
            研究成果発表
          </h2>

          <p style={{
            fontSize: 13, color: "#2d4a57", lineHeight: 1.8,
            marginBottom: 8, maxWidth: 420, margin: "0 auto 8px",
          }}>
            全ての実験結果を統合して、あなただけの研究レポートを生成。
          </p>
          <p style={{
            fontSize: 12, color: "#4a6572", lineHeight: 1.7,
            marginBottom: 24, maxWidth: 420, margin: "0 auto 24px",
          }}>
            レアリティ付きのペルソナカードをSNSでシェアして、仲間と結果を比較しよう!
          </p>

          {completedCount > 0 && (
            <div style={{
              marginBottom: 20, padding: "12px 18px", borderRadius: 14,
              background: "rgba(45,212,191,.06)",
              border: "1px dashed rgba(45,212,191,.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: "#4a6572" }}>実験進捗</span>
                <span style={{ fontSize: 11, color: "#2dd4bf", fontWeight: 700 }}>
                  {completedCount} / {ALL_DIAGNOSES.length}
                </span>
              </div>
              <div style={{
                width: "100%", height: 8, borderRadius: 4,
                background: "rgba(45,212,191,.1)", overflow: "hidden",
              }}>
                <div style={{
                  width: `${(completedCount / ALL_DIAGNOSES.length) * 100}%`,
                  height: "100%", borderRadius: 4,
                  background: "linear-gradient(90deg, #2dd4bf, #6366f1, #c084fc)",
                  transition: "width 0.5s ease",
                  position: "relative",
                }}>
                  <span className="progress-shimmer" />
                </div>
              </div>
            </div>
          )}

          <Link
            href="/persona"
            className="btn-gradient"
            style={{
              padding: "14px 36px", fontSize: 14,
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8,
              borderRadius: 50,
              boxShadow: "0 4px 20px rgba(45,212,191,.25), 0 0 0 4px rgba(45,212,191,.08)",
            }}
          >
            <TestTubeSvg size={18} color="#fff" />
            {completedCount > 0
              ? `研究レポートを見る (${completedCount}実験完了)`
              : "ペルソナカードとは?"}
          </Link>
        </div>
      </section>

      {/* ===== 研究所からのお知らせ（最下部） ===== */}
      <section
        ref={newsFade.ref}
        style={{
          padding: "16px 16px 40px", maxWidth: 800, margin: "0 auto",
          position: "relative", zIndex: 1,
          opacity: newsFade.visible ? 1 : 0,
          transform: newsFade.visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div style={{
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: 20,
          padding: "24px 24px",
          boxShadow: "0 4px 24px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <MagnifyingSvg size={22} color="#6366f1" />
            <div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#6366f1", display: "block", fontWeight: 700 }}>
                LAB NEWS
              </span>
              <h2 className="font-stick" style={{ fontSize: "1.1rem", color: "#0f1f2b", margin: 0 }}>
                研究所からのお知らせ
              </h2>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {LAB_NEWS.map((news, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "12px 16px", borderRadius: 12,
                  background: news.isNew ? "rgba(45,212,191,.06)" : "transparent",
                  borderLeft: news.isNew ? "3px solid #2dd4bf" : "3px solid rgba(45,212,191,.15)",
                  transition: "background 0.2s ease",
                }}
              >
                <span style={{
                  fontSize: "0.68rem", color: "#94a8b4", whiteSpace: "nowrap",
                  fontFamily: "monospace", paddingTop: 2,
                }}>
                  {news.date}
                </span>
                <span style={{ fontSize: "0.82rem", color: "#2d4a57", lineHeight: 1.5 }}>
                  {news.isNew && (
                    <span style={{
                      display: "inline-block", padding: "2px 8px", borderRadius: 6,
                      background: "linear-gradient(135deg, #2dd4bf, #38bdf8)",
                      color: "#fff", fontSize: 9, fontWeight: 700, marginRight: 6,
                      verticalAlign: "middle",
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

      {/* ===== リッチフッター ===== */}
      <footer style={{
        padding: "0", position: "relative", zIndex: 1,
        marginTop: 40,
      }}>
        {/* フッター上のさりげないキラキラ装飾 */}
        <PixelSparkle
          variant="twinkle"
          color="#2dd4bf"
          count={6}
          size={12}
          speed={180}
          style={{ zIndex: 0, pointerEvents: "none" }}
        />
        {/* グラデーション区切り線 */}
        <div style={{
          height: 2,
          background: "linear-gradient(90deg, transparent, #2dd4bf, #6366f1, #c084fc, #6366f1, #2dd4bf, transparent)",
          margin: "0 auto",
          maxWidth: 1200,
        }} />

        {/* フッターコンテンツ */}
        <div style={{
          background: "linear-gradient(180deg, rgba(240,250,250,0), rgba(240,250,250,1) 20%)",
          padding: "36px 20px 24px",
        }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            {/* ブランドロゴ */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              <FlaskSvg size={20} color="#2dd4bf" />
              <span className="font-stick" style={{ fontSize: "1.05rem", color: "#2dd4bf" }}>
                診断研究所
              </span>
            </div>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#94a8b4", marginBottom: 16 }}>
              SHINDAN LABORATORY
            </p>

            {/* TikTokボタン */}
            <div style={{ marginBottom: 20 }}>
              <a
                href="https://www.tiktok.com/@shindan_lab?lang=ja-JP"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "7px 18px", borderRadius: 20,
                  background: "#0f0f0f", color: "#fff",
                  fontSize: 11, fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z"/>
                </svg>
                公式TikTok
              </a>
            </div>

            {/* 法的リンク（横並び） */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              flexWrap: "wrap", gap: "4px 0", marginBottom: 20,
            }}>
              {[
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "利用規約", href: "/terms" },
                { label: "特定商取引法", href: "/tokushoho" },
                { label: "お問い合わせ", href: "/contact" },
              ].map((link, i) => (
                <span key={link.href} style={{ display: "inline-flex", alignItems: "center" }}>
                  <Link href={link.href} style={{
                    fontSize: 11, color: "#6b8a97", textDecoration: "none",
                    padding: "4px 8px",
                    transition: "color 0.2s ease",
                  }}>
                    {link.label}
                  </Link>
                  {i < 3 && (
                    <span style={{ color: "rgba(45,212,191,.3)", fontSize: 10 }}>|</span>
                  )}
                </span>
              ))}
            </div>

            {/* コピーライト */}
            <div style={{
              borderTop: "1px solid rgba(45,212,191,.08)",
              paddingTop: 14,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <p style={{ fontSize: 10, color: "#a0b4be", margin: 0 }}>
                &copy; 2026 診断研究所 All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* CSSアニメーション */}
      <style jsx>{`
        /* レスポンシブグリッド: 3列 -> 2列 -> 1列 */
        @media (max-width: 960px) {
          .portal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
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

        /* タイプライターのカーソル点滅 */
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
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
      `}</style>
    </>
  );
}
