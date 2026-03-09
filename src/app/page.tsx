"use client";

/**
 * ときめきラボ ポータルページ（超ハイクオリティ・ダークUI版）
 *
 * オーロラ背景 + 星空 + 流れ星 + グリッドライン で
 * 「一つのハイクオリティなゲーム」をプレイしているような体験を実現。
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
  { key: "social", label: "対人・SNS", emoji: "\u{1F4AC}" },
  { key: "mystery", label: "スピ・エンタメ", emoji: "\u{1F52E}" },
];

// 各診断をカテゴリに分類するマップ
const CATEGORY_MAP: Record<string, CategoryKey> = {
  mbti128: "personality",
  shadow: "personality",
  impression: "personality",
  chrono: "personality",
  mental: "mind",
  stress: "mind",
  brain: "mind",
  talent: "ability",
  creative: "ability",
  learning: "ability",
  career: "career",
  job: "career",
  leadership: "career",
  money: "career",
  love: "social",
  commu: "social",
  friendship: "social",
  sns: "social",
  oshi: "social",
  spirit: "mystery",
  isekai: "mystery",
  pastlife: "mystery",
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

export default function PortalPage() {
  // 星空パーティクル（ダーク背景向け）
  const starsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!starsRef.current) return;
    const container = starsRef.current;
    container.innerHTML = "";
    // 白い星: 60個
    for (let i = 0; i < 60; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2.5 + 1;
      Object.assign(star.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: "#fff",
        borderRadius: "50%",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: "0.15",
      });
      container.appendChild(star);
    }

    // 流れ星: 3個（時間差で出現）
    for (let i = 0; i < 3; i++) {
      const shooting = document.createElement("div");
      Object.assign(shooting.style, {
        position: "absolute",
        top: `${5 + Math.random() * 30}%`,
        left: `${Math.random() * 60}%`,
        width: "0px",
        height: "1px",
        background: "linear-gradient(90deg, rgba(255,255,255,0.8), transparent)",
        borderRadius: "1px",
        animation: `shootingStar ${1.5 + Math.random()}s ease-in-out infinite`,
        animationDelay: `${5 + i * 8 + Math.random() * 4}s`,
        opacity: "0.7",
        transformOrigin: "left center",
      });
      container.appendChild(shooting);
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
  const tickerText = [...tickerItems, ...tickerItems].map((t) => `\u2605 ${t} `).join("");

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
      {/* ===== 背景レイヤー群 ===== */}

      {/* 星空パーティクル + 流れ星 */}
      <div
        ref={starsRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
        aria-hidden="true"
      />

      {/* SFグリッドライン */}
      <div
        style={{
          position: "fixed", inset: 0,
          backgroundImage: "linear-gradient(rgba(99,102,241,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none", zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* オーロラレイヤー1: 大きなインディゴブロブ */}
      <div
        style={{
          position: "fixed", top: "-20%", left: "-10%",
          width: "120vw", height: "50vh",
          background: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,.18) 0%, transparent 60%)",
          filter: "blur(80px)",
          animation: "auroraWave1 20s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* オーロラレイヤー2: ティールの光 */}
      <div
        style={{
          position: "fixed", top: "10%", left: "20%",
          width: "60vw", height: "40vh",
          background: "radial-gradient(ellipse at 50% 50%, rgba(20,184,166,.12) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "auroraWave2 25s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* オーロラレイヤー3: マゼンタのアクセント */}
      <div
        style={{
          position: "fixed", top: "30%", right: "-10%",
          width: "50vw", height: "50vh",
          background: "radial-gradient(ellipse at 60% 50%, rgba(236,72,153,.1) 0%, transparent 65%)",
          filter: "blur(90px)",
          animation: "auroraWave3 18s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* オーロラレイヤー4: 底部のディープパープル */}
      <div
        style={{
          position: "fixed", bottom: "-10%", left: "30%",
          width: "70vw", height: "40vh",
          background: "radial-gradient(ellipse at 50% 70%, rgba(139,92,246,.12) 0%, transparent 60%)",
          filter: "blur(120px)",
          animation: "auroraWave4 22s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ===== ティッカー（最上部固定） ===== */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          overflow: "hidden", whiteSpace: "nowrap",
          padding: "4px 0", fontSize: "12px", fontWeight: 700,
          color: "#fff", letterSpacing: "0.04em",
          background: "linear-gradient(135deg, rgba(99,102,241,.9), rgba(129,140,248,.9), rgba(99,102,241,.9))",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ display: "inline-block", animation: "tickerScroll 25s linear infinite" }}>
          {tickerText}
        </span>
      </div>

      {/* ===== ナビバー（ダーク半透明ガラス） ===== */}
      <nav
        style={{
          position: "fixed", top: 24, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 24px",
          background: "rgba(7,11,26,.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid transparent",
          borderImage: "linear-gradient(90deg, transparent, #6366F1, #EC4899, #14B8A6, transparent) 1",
          boxShadow: "0 4px 20px rgba(0,0,0,.3)",
        }}
      >
        <span className="font-stick" style={{
          background: "linear-gradient(135deg, #818CF8, #EC4899, #14B8A6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "1.2rem",
        }}>
          ときめきラボ
        </span>
        <Link
          href="/persona"
          style={{
            padding: "6px 14px",
            background: completedCount > 0 ? "linear-gradient(135deg, #6366F1, #818CF8)" : "rgba(99,102,241,.15)",
            borderRadius: 20,
            color: completedCount > 0 ? "#fff" : "rgba(255,255,255,.5)",
            fontSize: 11,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.03em",
            border: completedCount > 0 ? "none" : "1px solid rgba(99,102,241,.2)",
          }}
        >
          {completedCount > 0 ? `PERSONA (${completedCount})` : "PERSONA CARD"}
        </Link>
      </nav>

      {/* ===== ヒーローセクション ===== */}
      <section
        style={{
          minHeight: "40svh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "100px 20px 24px", position: "relative", zIndex: 1,
        }}
      >
        {/* メインタイトル（オーロラテキストグラデーション） */}
        <h1
          style={{
            lineHeight: 1.1, marginBottom: 12,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="font-stick" style={{
            display: "block", fontSize: "clamp(36px, 10vw, 64px)",
            background: "linear-gradient(135deg, #818CF8, #EC4899, #14B8A6, #A78BFA, #F472B6)",
            backgroundSize: "300% 300%",
            animation: "textAuroraShift 8s ease-in-out infinite",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(99,102,241,.3))",
          }}>
            ときめきラボ
          </span>
        </h1>

        {/* キャッチコピー */}
        <p
          className="font-zen"
          style={{
            fontSize: "1.1rem", fontWeight: 700, color: "rgba(255,255,255,.85)",
            marginBottom: 16,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
          }}
        >
          22の診断で自分を完全解析。
        </p>

        {/* バッジ */}
        <div
          style={{
            display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s",
          }}
        >
          {[
            { label: "22種類", icon: "\u{1F9EA}" },
            { label: "心理学ベース", icon: "\u{1F9E0}" },
            { label: "完全無料", icon: "\u2726" },
            { label: "ペルソナカード", icon: "\u{1F0CF}" },
          ].map((badge) => (
            <span
              key={badge.label}
              style={{
                padding: "4px 12px", borderRadius: 20,
                background: "rgba(99,102,241,.1)",
                border: "1px solid rgba(99,102,241,.2)",
                fontSize: 11, color: "rgba(255,255,255,.7)",
                letterSpacing: "0.03em",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ marginRight: 3 }}>{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>
      </section>

      {/* ===== 診断カードグリッド ===== */}
      <section
        style={{
          padding: "24px 16px 80px", maxWidth: 1100, margin: "0 auto",
          position: "relative", zIndex: 1,
        }}
      >
        {/* グローバルプロフィール設定（ダークガラスカード） */}
        <div
          style={{
            marginBottom: 24,
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: 16,
            padding: "14px 20px",
            boxShadow: "0 4px 20px rgba(0,0,0,.2)",
          }}
        >
          {globalProfile.gender && globalProfile.age ? (
            // 設定済み表示
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 28, height: 28, borderRadius: "50%",
                  background: "rgba(20,184,166,.15)", fontSize: 14, color: "#14B8A6",
                }}>
                  ✓
                </span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>
                  <strong style={{ color: "#14B8A6" }}>{globalProfile.name ? `${globalProfile.name}さん` : ""}{globalProfile.name ? " / " : ""}{globalProfile.age}歳・{genderLabel(globalProfile.gender)}</strong> で診断中
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
                  background: "rgba(99,102,241,.12)", border: "1px solid rgba(99,102,241,.2)",
                  color: "#818CF8", fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}
              >
                変更
              </button>
            </div>
          ) : (
            // 未設定表示
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>
                🧪 名前・年齢・性別を設定すると、診断がスムーズに！
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
                borderTop: "1px solid rgba(255,255,255,.06)",
                animation: "slideDown 0.3s ease-out",
              }}
            >
              {/* 名前入力 */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>名前（ニックネームでもOK）</p>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="ニックネームを入力"
                  maxLength={20}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 10,
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.1)",
                    color: "#fff", fontSize: 14, outline: "none",
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#6366F1"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; }}
                />
              </div>

              {/* 性別選択 */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>性別</p>
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
                        border: tempGender === g.value ? "1.5px solid #6366F1" : "1px solid rgba(255,255,255,.08)",
                        color: tempGender === g.value ? "#818CF8" : "rgba(255,255,255,.5)",
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
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>
                  年齢: <strong style={{ color: "#818CF8", fontSize: 16 }}>{tempAge}</strong>歳
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
                    background: `linear-gradient(to right, #6366F1 ${((tempAge - 10) / 50) * 100}%, rgba(255,255,255,.08) ${((tempAge - 10) / 50) * 100}%)`,
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
                  color: tempGender ? "#fff" : "rgba(255,255,255,.2)",
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
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "#818CF8", display: "block", marginBottom: 6 }}>
            ALL DIAGNOSES
          </span>
          <h2 className="font-stick" style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#fff" }}>
            診断を選ぶ
          </h2>
        </div>

        {/* カテゴリタブ（ダーク対応） */}
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
                  : "rgba(255,255,255,.04)",
                border: activeCategory === cat.key
                  ? "none"
                  : "1px solid rgba(255,255,255,.08)",
                color: activeCategory === cat.key ? "#fff" : "rgba(255,255,255,.5)",
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
                  background: "rgba(255,255,255,.03)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: "18px 18px",
                  border: "1px solid rgba(255,255,255,.06)",
                  borderTop: "1px solid rgba(255,255,255,.06)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                  transition: `opacity 0.5s cubic-bezier(0.25,1,0.5,1) ${index * 0.04}s, transform 0.5s cubic-bezier(0.25,1,0.5,1) ${index * 0.04}s, border-color 0.3s, box-shadow 0.3s, border-top 0.3s`,
                  boxShadow: "0 2px 8px rgba(0,0,0,.2)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(-3px) scale(1.01)";
                  el.style.borderColor = diag.themeColor + "40";
                  el.style.borderTop = `2px solid ${diag.themeColor}`;
                  el.style.boxShadow = `0 0 25px ${diag.themeColor}20, 0 8px 30px rgba(0,0,0,.3)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "none";
                  el.style.borderColor = "rgba(255,255,255,.06)";
                  el.style.borderTop = "1px solid rgba(255,255,255,.06)";
                  el.style.boxShadow = "0 2px 8px rgba(0,0,0,.2)";
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
                    background: `linear-gradient(135deg, ${diag.themeColor}18, ${diag.themeColor}08)`,
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
                        color: "#fff",
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
                        background: "rgba(20,184,166,.15)", fontSize: 10, color: "#14B8A6",
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
                      background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)",
                      fontSize: 10, color: "rgba(255,255,255,.5)",
                    }}>
                      {diag.questionCount}問
                    </span>
                    <span style={{
                      padding: "2px 8px", borderRadius: 8,
                      background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)",
                      fontSize: 10, color: "rgba(255,255,255,.5)",
                    }}>
                      約{diag.estimatedMinutes}分
                    </span>
                    {isCompleted && result && (
                      <span style={{
                        padding: "2px 8px", borderRadius: 8,
                        background: "rgba(20,184,166,.1)", border: "1px solid rgba(20,184,166,.2)",
                        fontSize: 10, color: "#14B8A6", fontWeight: 600,
                      }}>
                        {result.typeName}
                      </span>
                    )}
                    {diag.isFeatured && (
                      <span style={{
                        padding: "2px 8px", borderRadius: 8,
                        background: "linear-gradient(135deg, rgba(236,72,153,.15), rgba(99,102,241,.15))",
                        border: "1px solid rgba(236,72,153,.25)",
                        fontSize: 10, color: "#F472B6", fontWeight: 700,
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

      {/* ===== ペルソナカード誘導セクション ===== */}
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
            background: "rgba(255,255,255,.04)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: 20,
            padding: "32px 24px",
            boxShadow: "0 4px 30px rgba(0,0,0,.2)",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🃏</div>
          <h2
            className="font-stick"
            style={{
              fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
              background: "linear-gradient(135deg, #818CF8, #EC4899, #14B8A6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 10,
            }}
          >
            ペルソナカード
          </h2>
          <p
            style={{
              fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.8,
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
              boxShadow: "0 4px 20px rgba(99,102,241,.3)",
              transition: "all 0.3s ease",
            }}
          >
            {completedCount > 0
              ? `ペルソナカードを見る (${completedCount}診断完了)`
              : "ペルソナカードとは？"}
          </Link>
        </div>
      </section>

      {/* ===== フッター ===== */}
      <footer
        style={{
          padding: "40px 20px 30px", textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.06)",
          position: "relative", zIndex: 1,
        }}
      >
        <div className="font-stick" style={{
          fontSize: "1.2rem", marginBottom: 8,
          background: "linear-gradient(135deg, #818CF8, #EC4899)",
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

        /* スライダーのサム（つまみ）スタイル（ダーク版） */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366F1;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(99,102,241,.5);
          border: 2px solid rgba(255,255,255,.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366F1;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(99,102,241,.5);
          border: 2px solid rgba(255,255,255,.2);
        }
      `}</style>
    </>
  );
}
