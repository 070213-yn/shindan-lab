"use client";

/**
 * ときめきラボ ポータルページ
 *
 * 全診断を一覧表示するメインページ。
 * 恋愛診断 + 10種の新診断をカードグリッドで表示。
 * ティーン向けにワクワクする演出と、TikTok/LINEでシェアしたくなるデザイン。
 */

import { useEffect, useRef, useState } from "react";
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
};

// 全カードデータ（恋愛 + 10診断）
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
  })),
];

export default function PortalPage() {
  // 星空パーティクル
  const starsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!starsRef.current) return;
    const container = starsRef.current;
    container.innerHTML = "";
    for (let i = 0; i < 120; i++) {
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
        opacity: "0.1",
      });
      container.appendChild(star);
    }
    // 色付き星
    const colors = ["#FF6BE8", "#C45AFF", "#7B5CFF", "#FFD700", "#00CED1", "#2ECC71", "#FF7F7F", "#4169E1"];
    for (let i = 0; i < 12; i++) {
      const star = document.createElement("div");
      const size = 3 + Math.random() * 1.5;
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
        opacity: "0.15",
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
  const completedCount = Object.keys(personaResults).length;

  // ティッカー
  const tickerItems = [
    "21種類の本格診断",
    "心理学ベース",
    "完全無料・登録不要",
    "ペルソナカード生成",
    "SNSでシェアして比較",
    "適職を超精密マッチング",
    "脳タイプ完全解析",
    "裏キャラを暴く",
  ];
  const tickerText = [...tickerItems, ...tickerItems].map((t) => `★ ${t} `).join("");

  return (
    <>
      {/* 背景エフェクト */}
      <div
        ref={starsRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
        aria-hidden="true"
      />

      {/* ブロブ */}
      <div
        className="blob-dynamic-1"
        style={{
          position: "fixed", width: 500, height: 500, borderRadius: "50%",
          background: "rgba(196,90,255,.1)", filter: "blur(90px)",
          top: -150, right: -150, zIndex: 0, pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div
        className="blob-dynamic-2"
        style={{
          position: "fixed", width: 400, height: 400, borderRadius: "50%",
          background: "rgba(255,107,232,.08)", filter: "blur(90px)",
          bottom: 0, left: -150, zIndex: 0, pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "fixed", width: 300, height: 300, borderRadius: "50%",
          background: "rgba(0,206,209,.06)", filter: "blur(80px)",
          top: "60%", left: "50%", zIndex: 0, pointerEvents: "none",
          animation: "blobFloat 15s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* ナビバー */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 24px",
          background: "rgba(13,1,24,.85)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,107,232,.15)",
        }}
      >
        <span className="font-stick" style={{ color: "#FF6BE8", fontSize: "1.2rem" }}>
          ときめきラボ
        </span>
        <Link
          href="/persona"
          style={{
            padding: "6px 14px",
            background: completedCount > 0 ? "linear-gradient(135deg, #FF6BE8, #C45AFF)" : "rgba(255,255,255,.06)",
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

      {/* ヒーローセクション */}
      <section
        style={{
          minHeight: "80svh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "80px 20px 40px", position: "relative", zIndex: 1,
        }}
      >
        {/* ティッカー */}
        <div
          className="ticker-shimmer-bg"
          style={{
            position: "relative", width: "100vw", overflow: "hidden", whiteSpace: "nowrap",
            padding: "6px 0", fontSize: "0.75rem", fontWeight: 700,
            color: "#FF6BE8", letterSpacing: "0.05em", marginBottom: 40,
          }}
        >
          <span style={{ display: "inline-block", animation: "tickerScroll 25s linear infinite" }}>
            {tickerText}
          </span>
        </div>

        {/* メインタイトル */}
        <h1
          className="hero-title-glow"
          style={{
            lineHeight: 1.1, marginBottom: 20,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="font-stick" style={{ display: "block", fontSize: "clamp(40px, 12vw, 80px)", color: "#FF6BE8" }}>
            ときめきラボ
          </span>
        </h1>

        {/* キャッチコピー */}
        <p
          className="font-zen"
          style={{
            fontSize: "1.125rem", fontWeight: 700, color: "rgba(255,255,255,.9)",
            marginBottom: 16,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
          }}
        >
          自分を知る、21の旅。
        </p>

        {/* 説明文 */}
        <p
          style={{
            maxWidth: 520, fontSize: "0.95rem", lineHeight: 1.8,
            color: "rgba(255,255,255,.7)", marginBottom: 32,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s",
          }}
        >
          心理学の研究をベースにした本格診断シリーズ。恋愛、才能、メンタル、適職、脳タイプ、前世まで -- 21種の診断であなたの知らない自分に出会おう。全診断を受けてペルソナカードを完成させよう！
        </p>

        {/* 統計バッジ */}
        <div
          style={{
            display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.7s, transform 0.6s ease-out 0.7s",
          }}
        >
          {[
            { label: "21種類の診断", icon: "✦" },
            { label: "560+問の質問", icon: "✦" },
            { label: "ペルソナカード", icon: "🔮" },
            { label: "完全無料", icon: "✦" },
          ].map((badge) => (
            <span
              key={badge.label}
              style={{
                padding: "6px 14px", borderRadius: 20,
                background: "rgba(255,107,232,.08)",
                border: "1px solid rgba(255,107,232,.15)",
                fontSize: 12, color: "rgba(255,255,255,.7)",
                letterSpacing: "0.03em",
              }}
            >
              <span style={{ color: "#FF6BE8", marginRight: 4 }}>{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>
      </section>

      {/* 診断カードグリッド */}
      <section
        style={{
          padding: "40px 16px 80px", maxWidth: 1100, margin: "0 auto",
          position: "relative", zIndex: 1,
        }}
      >
        {/* セクションタイトル */}
        <div style={{ textAlign: "left", marginBottom: 32 }}>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C45AFF", display: "block", marginBottom: 8 }}>
            ALL DIAGNOSES
          </span>
          <h2 className="font-stick" style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)" }}>
            診断を選ぶ
          </h2>
        </div>

        {/* カードグリッド */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
          className="portal-grid"
        >
          {ALL_DIAGNOSES.map((diag, index) => (
            <Link
              key={diag.id}
              href={diag.href}
              style={{
                display: "block",
                textDecoration: "none",
                background: "rgba(10,1,22,.88)",
                borderRadius: 20,
                padding: "24px 20px",
                border: "1px solid transparent",
                position: "relative",
                overflow: "hidden",
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transition: `opacity 0.5s cubic-bezier(0.25,1,0.5,1) ${index * 0.06}s, transform 0.5s cubic-bezier(0.25,1,0.5,1) ${index * 0.06}s, border-color 0.3s, box-shadow 0.3s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-4px) scale(1.02)";
                el.style.borderColor = diag.themeColor;
                el.style.boxShadow = `0 0 24px ${diag.themeColor}25, 0 8px 32px rgba(0,0,0,.3)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "none";
                el.style.borderColor = "transparent";
                el.style.boxShadow = "none";
              }}
            >
              {/* 背景グラデーション（微かなアクセント） */}
              <div
                style={{
                  position: "absolute",
                  top: 0, right: 0, width: 120, height: 120,
                  background: `radial-gradient(circle at top right, ${diag.themeColor}12, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* NEWバッジ */}
              {diag.isNew && (
                <span
                  style={{
                    position: "absolute", top: 12, right: 12,
                    padding: "2px 8px", borderRadius: 8,
                    background: `linear-gradient(135deg, ${diag.gradientFrom}, ${diag.gradientTo})`,
                    fontSize: 9, fontWeight: 700, color: "#fff",
                    letterSpacing: "0.05em",
                  }}
                >
                  NEW
                </span>
              )}

              {/* 注目バッジ */}
              {diag.isFeatured && (
                <span
                  style={{
                    position: "absolute", top: 12, right: 12,
                    padding: "2px 8px", borderRadius: 8,
                    background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
                    fontSize: 9, fontWeight: 700, color: "#fff",
                    letterSpacing: "0.05em",
                    animation: "glowBreath 3s ease-in-out infinite",
                  }}
                >
                  POPULAR
                </span>
              )}

              {/* 絵文字 */}
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>
                {diag.emoji}
              </div>

              {/* タイトル */}
              <h3
                className="font-zen"
                style={{
                  fontSize: "1.05rem", fontWeight: 700,
                  color: diag.themeColor, marginBottom: 4,
                }}
              >
                {diag.title}
              </h3>

              {/* サブタイトル */}
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,.45)", marginBottom: 10, letterSpacing: "0.03em" }}>
                {diag.subtitle}
              </p>

              {/* 説明 */}
              <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "rgba(255,255,255,.65)", marginBottom: 14 }}>
                {diag.description}
              </p>

              {/* メタ情報 */}
              <div style={{ display: "flex", gap: 12, fontSize: "0.7rem", color: "rgba(255,255,255,.4)" }}>
                <span>{diag.questionCount}問</span>
                <span>約{diag.estimatedMinutes}分</span>
              </div>

              {/* 下部アクセント線 */}
              <div
                style={{
                  position: "absolute", bottom: 0, left: 20, right: 20, height: 2,
                  background: `linear-gradient(90deg, transparent, ${diag.themeColor}40, transparent)`,
                  borderRadius: 1,
                }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ペルソナカード誘導セクション */}
      <section
        style={{
          padding: "60px 20px",
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,107,232,.08), rgba(196,90,255,.08), rgba(123,92,255,.08))",
            border: "1px solid rgba(255,107,232,.15)",
            borderRadius: 24,
            padding: "40px 24px",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔮</div>
          <h2
            className="font-stick"
            style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", color: "#FF6BE8", marginBottom: 12 }}
          >
            ペルソナカード
          </h2>
          <p
            style={{
              fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.8,
              marginBottom: 24, maxWidth: 400, margin: "0 auto 24px",
            }}
          >
            全ての診断結果を統合して、あなただけの一枚のカードを生成。
            レアリティ付きのペルソナカードをTikTokやLINEでシェアしよう！
          </p>
          <Link
            href="/persona"
            className="btn-gradient"
            style={{
              padding: "16px 40px",
              fontSize: 15,
              textDecoration: "none",
              display: "inline-block",
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
          padding: "60px 20px 40px", textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.08)",
          position: "relative", zIndex: 1,
        }}
      >
        <div className="font-stick" style={{ fontSize: "1.3rem", color: "#FF6BE8", marginBottom: 12 }}>
          ときめきラボ
        </div>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,.5)", marginBottom: 12 }}>
          自分を知る、21の旅。
        </p>
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,.25)" }}>
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
            text-shadow: 0 0 20px rgba(255, 107, 232, 0.15), 0 0 40px rgba(196, 90, 255, 0.05);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 107, 232, 0.4), 0 0 60px rgba(196, 90, 255, 0.2), 0 0 100px rgba(123, 92, 255, 0.1);
          }
        }

        .ticker-shimmer-bg {
          background: linear-gradient(90deg, rgba(255,107,232,0.06) 0%, rgba(196,90,255,0.12) 25%, rgba(255,107,232,0.06) 50%, rgba(123,92,255,0.12) 75%, rgba(255,107,232,0.06) 100%);
          background-size: 200% 100%;
          animation: tickerShimmerBg 4s ease-in-out infinite;
        }
        @keyframes tickerShimmerBg {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
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
      `}</style>
    </>
  );
}
