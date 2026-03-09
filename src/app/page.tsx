"use client";

/**
 * ときめきラボ ポータルページ（改修版）
 *
 * 22種の総合診断サイトとしてリブランディング。
 * サイエンス×ポップな「自分発見ラボ」をコンセプトに、
 * コンパクトなヒーロー、グローバルプロフィール、カテゴリ分けカードグリッドを実装。
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { DIAGNOSIS_LIST } from "@/lib/diagnoses";
import { usePersonaStore } from "@/store/personaStore";

// 恋愛診断は別ページなので手動定義
const LOVE_DIAGNOSIS = {
  id: "love",
  title: "恋愛性格診断",
  subtitle: "本格12タイプ判定",
  emoji: "💘",
  themeColor: "#FF6BE8",
  gradientFrom: "#FF6BE8",
  gradientTo: "#C45AFF",
  description: "愛着理論×進化心理学ベース。43問で恋愛タイプを8次元分析。",
  questionCount: 43,
  estimatedMinutes: 10,
  catchphrase: "恋は、勇気が9割。",
  href: "/love",
  isNew: false,
  isFeatured: true,
  category: "self" as const,
};

// カテゴリ定義
type CategoryKey = "all" | "self" | "future" | "fun";
const CATEGORIES: { key: CategoryKey; label: string; emoji: string }[] = [
  { key: "all", label: "すべて", emoji: "✦" },
  { key: "self", label: "自分を知る", emoji: "🔍" },
  { key: "future", label: "未来を探る", emoji: "🚀" },
  { key: "fun", label: "楽しむ", emoji: "🎮" },
];

// 各診断をカテゴリに分類するマップ
const CATEGORY_MAP: Record<string, CategoryKey> = {
  love: "self",
  talent: "self",
  mental: "self",
  commu: "self",
  shadow: "self",
  brain: "self",
  impression: "self",
  learning: "self",
  mbti128: "self",
  stress: "self",
  career: "future",
  job: "future",
  leadership: "future",
  money: "future",
  creative: "future",
  chrono: "future",
  spirit: "fun",
  isekai: "fun",
  oshi: "fun",
  sns: "fun",
  pastlife: "fun",
  friendship: "fun",
};

// 全カードデータ（恋愛 + 21診断）
const ALL_DIAGNOSES = [
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
    isFeatured: false,
    category: (CATEGORY_MAP[d.id] || "fun") as CategoryKey,
  })),
];

export default function PortalPage() {
  // 星空パーティクル（50個以下に最適化）
  const starsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!starsRef.current) return;
    const container = starsRef.current;
    container.innerHTML = "";
    // 白い星: 35個
    for (let i = 0; i < 35; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2.5 + 0.5;
      Object.assign(star.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: "#fff",
        borderRadius: "50%",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: "0.15",
      });
      container.appendChild(star);
    }
    // 色付き星: 10個
    const colors = ["#6366F1", "#EC4899", "#14B8A6", "#818CF8", "#F472B6", "#2DD4BF"];
    for (let i = 0; i < 10; i++) {
      const star = document.createElement("div");
      const size = 2.5 + Math.random() * 1.5;
      const c = colors[i % colors.length];
      Object.assign(star.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: c,
        borderRadius: "50%",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 4}s`,
        opacity: "0.2",
        boxShadow: `0 0 6px ${c}`,
      });
      container.appendChild(star);
    }
  }, []);

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
  const [tempGender, setTempGender] = useState<string | null>(globalProfile.gender);
  const [tempAge, setTempAge] = useState<number>(globalProfile.age ?? 16);

  // カテゴリフィルタ
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  // フィルタ済み診断
  const filteredDiagnoses =
    activeCategory === "all"
      ? ALL_DIAGNOSES
      : ALL_DIAGNOSES.filter((d) => d.category === activeCategory);

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
      background: "rgba(99, 102, 241, 0.15)",
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
    "22種類の本格診断",
    "心理学ベース",
    "完全無料・登録不要",
    "ペルソナカード生成",
    "SNSでシェアして比較",
    "適職を超精密マッチング",
    "脳タイプ完全解析",
    "裏キャラを暴く",
  ];
  const tickerText = [...tickerItems, ...tickerItems].map((t) => `★ ${t} `).join("");

  // プロフィール保存ハンドラ
  const handleSaveProfile = () => {
    setGlobalProfile(tempGender, tempAge);
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
      {/* 背景エフェクト */}
      <div
        ref={starsRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
        aria-hidden="true"
      />

      {/* ブロブ（新カラーに変更） */}
      <div
        className="blob-dynamic-1"
        style={{
          position: "fixed", width: 500, height: 500, borderRadius: "50%",
          background: "rgba(99,102,241,.08)", filter: "blur(90px)",
          top: -150, right: -150, zIndex: 0, pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div
        className="blob-dynamic-2"
        style={{
          position: "fixed", width: 400, height: 400, borderRadius: "50%",
          background: "rgba(236,72,153,.06)", filter: "blur(90px)",
          bottom: 0, left: -150, zIndex: 0, pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "fixed", width: 300, height: 300, borderRadius: "50%",
          background: "rgba(20,184,166,.06)", filter: "blur(80px)",
          top: "60%", left: "50%", zIndex: 0, pointerEvents: "none",
          animation: "blobFloat 15s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* ティッカー（最上部固定） */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          overflow: "hidden", whiteSpace: "nowrap",
          padding: "4px 0", fontSize: "12px", fontWeight: 700,
          color: "#fff", letterSpacing: "0.04em",
          background: "linear-gradient(135deg, #6366F1, #818CF8, #6366F1)",
        }}
      >
        <span style={{ display: "inline-block", animation: "tickerScroll 25s linear infinite" }}>
          {tickerText}
        </span>
      </div>

      {/* ナビバー（ティッカーの下に配置） */}
      <nav
        style={{
          position: "fixed", top: 24, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 24px",
          background: "rgba(15,23,42,.85)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(99,102,241,.15)",
        }}
      >
        <span className="font-stick" style={{ color: "#6366F1", fontSize: "1.2rem" }}>
          ときめきラボ
        </span>
        <Link
          href="/persona"
          style={{
            padding: "6px 14px",
            background: completedCount > 0 ? "linear-gradient(135deg, #6366F1, #818CF8)" : "rgba(255,255,255,.06)",
            borderRadius: 20,
            color: completedCount > 0 ? "#fff" : "rgba(255,255,255,.5)",
            fontSize: 11,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.03em",
          }}
        >
          {completedCount > 0 ? `PERSONA (${completedCount})` : "PERSONA CARD"}
        </Link>
      </nav>

      {/* ヒーローセクション（コンパクト化） */}
      <section
        style={{
          minHeight: "40svh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "100px 20px 24px", position: "relative", zIndex: 1,
        }}
      >
        {/* メインタイトル */}
        <h1
          className="hero-title-glow"
          style={{
            lineHeight: 1.1, marginBottom: 12,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="font-stick" style={{
            display: "block", fontSize: "clamp(36px, 10vw, 64px)",
            background: "linear-gradient(135deg, #6366F1, #EC4899, #14B8A6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            ときめきラボ
          </span>
        </h1>

        {/* キャッチコピー */}
        <p
          className="font-zen"
          style={{
            fontSize: "1.1rem", fontWeight: 700, color: "rgba(255,255,255,.9)",
            marginBottom: 16,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
          }}
        >
          22の診断で自分を完全解析。
        </p>

        {/* バッジ（1行にコンパクトに） */}
        <div
          style={{
            display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s",
          }}
        >
          {[
            { label: "22種類", icon: "🧪" },
            { label: "心理学ベース", icon: "🧠" },
            { label: "完全無料", icon: "✦" },
            { label: "ペルソナカード", icon: "🃏" },
          ].map((badge) => (
            <span
              key={badge.label}
              style={{
                padding: "4px 12px", borderRadius: 20,
                background: "rgba(99,102,241,.08)",
                border: "1px solid rgba(99,102,241,.2)",
                fontSize: 11, color: "rgba(255,255,255,.7)",
                letterSpacing: "0.03em",
              }}
            >
              <span style={{ marginRight: 3 }}>{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>
      </section>

      {/* 診断カードグリッド */}
      <section
        style={{
          padding: "24px 16px 80px", maxWidth: 1100, margin: "0 auto",
          position: "relative", zIndex: 1,
        }}
      >
        {/* グローバルプロフィール設定 */}
        <div
          style={{
            marginBottom: 24,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(99,102,241,.15)",
            borderRadius: 16,
            padding: "14px 20px",
          }}
        >
          {globalProfile.gender && globalProfile.age ? (
            // 設定済み表示
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 28, height: 28, borderRadius: "50%",
                  background: "rgba(20,184,166,.15)", fontSize: 14,
                }}>
                  ✓
                </span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.8)" }}>
                  <strong style={{ color: "#14B8A6" }}>{globalProfile.age}歳・{genderLabel(globalProfile.gender)}</strong> で診断中
                </span>
              </div>
              <button
                onClick={() => {
                  setTempGender(globalProfile.gender);
                  setTempAge(globalProfile.age ?? 16);
                  setShowProfileSetup(true);
                }}
                style={{
                  padding: "4px 12px", borderRadius: 12,
                  background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)",
                  color: "#818CF8", fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}
              >
                変更
              </button>
            </div>
          ) : (
            // 未設定表示
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>
                🧪 年齢と性別を設定すると、診断がスムーズに！
              </span>
              <button
                onClick={() => setShowProfileSetup(true)}
                style={{
                  padding: "6px 16px", borderRadius: 12,
                  background: "linear-gradient(135deg, #6366F1, #818CF8)",
                  border: "none", color: "#fff", fontSize: 12, fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                設定する
              </button>
            </div>
          )}

          {/* インライン設定フォーム */}
          {showProfileSetup && (
            <div
              style={{
                marginTop: 16, paddingTop: 16,
                borderTop: "1px solid rgba(99,102,241,.1)",
                animation: "slideDown 0.3s ease-out",
              }}
            >
              {/* 性別選択 */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 8 }}>性別</p>
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
                        background: tempGender === g.value ? "rgba(99,102,241,.2)" : "rgba(255,255,255,.04)",
                        border: tempGender === g.value ? "1.5px solid #6366F1" : "1px solid rgba(255,255,255,.1)",
                        color: tempGender === g.value ? "#818CF8" : "rgba(255,255,255,.6)",
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
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 8 }}>
                  年齢: <strong style={{ color: "#6366F1", fontSize: 16 }}>{tempAge}</strong>歳
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
                    background: `linear-gradient(to right, #6366F1 ${((tempAge - 10) / 50) * 100}%, rgba(255,255,255,.1) ${((tempAge - 10) / 50) * 100}%)`,
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
                    ? "linear-gradient(135deg, #6366F1, #818CF8)"
                    : "rgba(255,255,255,.06)",
                  border: "none",
                  color: tempGender ? "#fff" : "rgba(255,255,255,.3)",
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
        <div style={{ textAlign: "left", marginBottom: 20 }}>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "#6366F1", display: "block", marginBottom: 6 }}>
            ALL DIAGNOSES
          </span>
          <h2 className="font-stick" style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)" }}>
            診断を選ぶ
          </h2>
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
                  ? "linear-gradient(135deg, #6366F1, #818CF8)"
                  : "rgba(255,255,255,0.04)",
                border: activeCategory === cat.key
                  ? "none"
                  : "1px solid rgba(255,255,255,.08)",
                color: activeCategory === cat.key ? "#fff" : "rgba(255,255,255,.5)",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.25s ease",
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

            return (
              <Link
                key={diag.id}
                href={diag.href}
                onClick={handleRipple}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 16,
                  padding: "18px 18px",
                  border: "1px solid rgba(255,255,255,.06)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                  transition: `opacity 0.5s cubic-bezier(0.25,1,0.5,1) ${index * 0.04}s, transform 0.5s cubic-bezier(0.25,1,0.5,1) ${index * 0.04}s, border-color 0.3s, box-shadow 0.3s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(-3px) scale(1.01)";
                  el.style.borderColor = diag.themeColor + "60";
                  el.style.boxShadow = `0 0 20px ${diag.themeColor}20, 0 8px 24px rgba(0,0,0,.2)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "none";
                  el.style.borderColor = "rgba(255,255,255,.06)";
                  el.style.boxShadow = "none";
                }}
              >
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
                    background: `linear-gradient(135deg, ${diag.themeColor}12, ${diag.themeColor}06)`,
                    flexShrink: 0,
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
                        color: "rgba(255,255,255,.9)",
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
                        background: "rgba(20,184,166,.2)", fontSize: 10, color: "#14B8A6",
                        flexShrink: 0,
                      }}>
                        ✓
                      </span>
                    )}
                  </div>

                  {/* 説明文 */}
                  <p style={{
                    fontSize: "0.75rem", lineHeight: 1.5, color: "rgba(255,255,255,.5)",
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
                      background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.15)",
                      fontSize: 10, color: "rgba(255,255,255,.5)",
                    }}>
                      {diag.questionCount}問
                    </span>
                    <span style={{
                      padding: "2px 8px", borderRadius: 8,
                      background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.15)",
                      fontSize: 10, color: "rgba(255,255,255,.5)",
                    }}>
                      約{diag.estimatedMinutes}分
                    </span>
                    {isCompleted && result && (
                      <span style={{
                        padding: "2px 8px", borderRadius: 8,
                        background: "rgba(20,184,166,.1)", border: "1px solid rgba(20,184,166,.15)",
                        fontSize: 10, color: "#14B8A6", fontWeight: 600,
                      }}>
                        {result.typeName}
                      </span>
                    )}
                    {diag.isFeatured && (
                      <span style={{
                        padding: "2px 8px", borderRadius: 8,
                        background: "rgba(236,72,153,.1)", border: "1px solid rgba(236,72,153,.15)",
                        fontSize: 10, color: "#EC4899", fontWeight: 700,
                      }}>
                        POPULAR
                      </span>
                    )}
                  </div>
                </div>

                {/* 背景グラデーション（微かなアクセント） */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, right: 0, width: 100, height: 100,
                    background: `radial-gradient(circle at top right, ${diag.themeColor}08, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ペルソナカード誘導セクション */}
      <section
        style={{
          padding: "40px 20px",
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,.08), rgba(236,72,153,.06), rgba(20,184,166,.06))",
            border: "1px solid rgba(99,102,241,.15)",
            borderRadius: 20,
            padding: "32px 24px",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🃏</div>
          <h2
            className="font-stick"
            style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", color: "#6366F1", marginBottom: 10 }}
          >
            ペルソナカード
          </h2>
          <p
            style={{
              fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.8,
              marginBottom: 20, maxWidth: 400, margin: "0 auto 20px",
            }}
          >
            全ての診断結果を統合して、あなただけの一枚のカードを生成。
            レアリティ付きのペルソナカードをSNSでシェアしよう！
          </p>
          <Link
            href="/persona"
            style={{
              padding: "14px 36px",
              fontSize: 14,
              textDecoration: "none",
              display: "inline-block",
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              color: "#fff",
              borderRadius: 50,
              fontWeight: 700,
              fontFamily: "'Zen Maru Gothic', sans-serif",
              boxShadow: "0 4px 20px rgba(99,102,241,.2)",
              transition: "all 0.3s ease",
            }}
          >
            {completedCount > 0
              ? `ペルソナカードを見る (${completedCount}診断完了)`
              : "ペルソナカードとは？"}
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer
        style={{
          padding: "40px 20px 30px", textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.06)",
          position: "relative", zIndex: 1,
        }}
      >
        <div className="font-stick" style={{
          fontSize: "1.2rem", marginBottom: 8,
          background: "linear-gradient(135deg, #6366F1, #EC4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          ときめきラボ
        </div>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,.4)", marginBottom: 8 }}>
          22の診断で自分を完全解析。
        </p>
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,.2)" }}>
          &copy; 2026 ときめきラボ
        </p>
      </footer>

      {/* レスポンシブスタイル */}
      <style jsx>{`
        @media (max-width: 640px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .hero-title-glow span {
          animation: titleGlowBreath 3s ease-in-out infinite;
        }
        @keyframes titleGlowBreath {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.15));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.4)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.15));
          }
        }

        .blob-dynamic-1 { animation: blobDynamic1 14s ease-in-out infinite; }
        @keyframes blobDynamic1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-40px, 30px) scale(1.05); }
          50% { transform: translate(30px, -50px) scale(0.95); }
          75% { transform: translate(-20px, -30px) scale(1.02); }
        }

        .blob-dynamic-2 { animation: blobDynamic2 18s ease-in-out infinite; }
        @keyframes blobDynamic2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -40px) scale(1.08); }
          66% { transform: translate(-30px, 40px) scale(0.93); }
        }

        /* スライダーのサム（つまみ）スタイル */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366F1;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(99,102,241,.4);
          border: 2px solid #fff;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366F1;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(99,102,241,.4);
          border: 2px solid #fff;
        }
      `}</style>
    </>
  );
}
