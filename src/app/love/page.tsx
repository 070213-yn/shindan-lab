"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { TYPES } from "@/lib/types";

// ============================================================
// ときめきラボ ランディングページ
// テーマ: Y2Kグリッター x 宇宙
// 背景色: #0D0118（ディープスペース）
// ============================================================

export default function LandingPage() {
  // --- 星空パーティクル生成（150個 + 色付き大型星） ---
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;
    const container = starsRef.current;
    container.innerHTML = "";

    // 通常の星（140個）
    for (let i = 0; i < 140; i++) {
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

    // 色付き大型星（10個）— ピンクや紫のアクセント
    const specialColors = [
      "#FF6BE8", "#C45AFF", "#FF6BE8", "#7B5CFF", "#FF6BE8",
      "#C45AFF", "#FF8FF0", "#A06BFF", "#FF6BE8", "#C45AFF",
    ];
    for (let i = 0; i < 10; i++) {
      const star = document.createElement("div");
      const size = 3 + Math.random() * 1.5; // 3〜4.5px
      Object.assign(star.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: specialColors[i],
        borderRadius: "50%",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 4}s`,
        opacity: "0.15",
        boxShadow: `0 0 6px ${specialColors[i]}`,
      });
      container.appendChild(star);
    }
  }, []);

  // --- IntersectionObserver: タイプカードのstaggered fadeUp ---
  const typesGridRef = useRef<HTMLDivElement>(null);
  const [typesVisible, setTypesVisible] = useState(false);

  useEffect(() => {
    if (!typesGridRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTypesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(typesGridRef.current);
    return () => observer.disconnect();
  }, []);

  // --- IntersectionObserver: 診断セクション ---
  const quizRef = useRef<HTMLDivElement>(null);
  const [quizVisible, setQuizVisible] = useState(false);

  useEffect(() => {
    if (!quizRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setQuizVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(quizRef.current);
    return () => observer.disconnect();
  }, []);

  // --- ヒーローセクションのフェードアップ制御 ---
  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    // マウント後に少し遅延させてアニメーション開始
    const timer = setTimeout(() => setHeroMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // --- ページ内スクロール ---
  const scrollToTypes = () => {
    document.getElementById("types")?.scrollIntoView({ behavior: "smooth" });
  };

  // --- ティッカーの内容 ---
  const tickerItems = [
    "43問・本格恋愛性格診断",
    "8次元スコアリング",
    "12タイプ完全判定",
    "愛着理論×進化心理学",
    "完全無料・登録不要",
    "SNSでシェアして比較",
  ];
  const tickerText = [...tickerItems, ...tickerItems]
    .map((t) => `★ ${t} `)
    .join("");

  // --- 参考文献一覧 ---
  const references = [
    "Lee, J.A. (1973). The Colors of Love",
    "Bartholomew & Horowitz (1991). Attachment Styles",
    "Aron et al. (1997). Self-Expansion Model",
    "Buss, D.M. (2003). The Evolution of Desire",
    "Fisher, H. (2004). Why We Love",
  ];

  // --- 診断カードの特徴項目（アイコン付き） ---
  const quizFeatures = [
    { label: "43問", detail: "直感で答える質問", icon: "💭" },
    { label: "8次元分析", detail: "多角的なスコアリング", icon: "📊" },
    { label: "12タイプ判定", detail: "あなたの恋愛性格", icon: "💎" },
    { label: "約8-10分", detail: "サクッと完了", icon: "⏱️" },
  ];

  return (
    <>
      {/* ========== 背景エフェクト ========== */}

      {/* 星空パーティクル */}
      <div
        ref={starsRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        aria-hidden="true"
      />

      {/* 流れ星エフェクト（3本） */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <div className="shooting-star shooting-star-1" />
        <div className="shooting-star shooting-star-2" />
        <div className="shooting-star shooting-star-3" />
      </div>

      {/* ブロブ1（紫系） — よりダイナミックな動き */}
      <div
        className="blob-dynamic-1"
        style={{
          position: "fixed",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(196,90,255,.1)",
          filter: "blur(90px)",
          top: -150,
          right: -150,
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ブロブ2（ピンク系） — よりダイナミックな動き */}
      <div
        className="blob-dynamic-2"
        style={{
          position: "fixed",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,107,232,.08)",
          filter: "blur(90px)",
          bottom: 0,
          left: -150,
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ブロブ3（バイオレット系、画面中央付近、小さめ） — 新規追加 */}
      <div
        className="blob-dynamic-3"
        style={{
          position: "fixed",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(123,92,255,.07)",
          filter: "blur(80px)",
          top: "45%",
          left: "40%",
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ========== ナビバー ========== */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: "rgba(13,1,24,.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,107,232,.15)",
        }}
      >
        <span
          className="font-stick"
          style={{ color: "#FF6BE8", fontSize: "1.2rem" }}
        >
          ときめきラボ
        </span>
        <Link
          href="/love/quiz"
          className="btn-gradient"
          style={{
            padding: "8px 20px",
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          診断スタート
        </Link>
      </nav>

      {/* ========== ヒーローセクション ========== */}
      <section
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "56px 20px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ティッカーバー（shimmerグラデーション背景） */}
        <div
          className="ticker-shimmer-bg"
          style={{
            position: "relative",
            width: "100vw",
            overflow: "hidden",
            whiteSpace: "nowrap",
            padding: "6px 0",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#FF6BE8",
            letterSpacing: "0.05em",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              display: "inline-block",
              animation: "tickerScroll 20s linear infinite",
            }}
          >
            {tickerText}
          </span>
        </div>

        {/* メインタイトル — glowBreathアニメーション */}
        <h1
          className="hero-title-glow"
          style={{
            lineHeight: 1.1,
            marginBottom: 20,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span
            className="font-stick"
            style={{
              display: "block",
              fontSize: "clamp(40px, 12vw, 80px)",
              color: "#FF6BE8",
            }}
          >
            ときめきラボ
          </span>
        </h1>

        {/* キャッチコピー — delay 0.3s フェードアップ */}
        <p
          className="font-zen"
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "rgba(255,255,255,.9)",
            marginBottom: 16,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
          }}
        >
          恋は、勇気が9割。
        </p>

        {/* 説明テキスト — delay 0.5s フェードアップ */}
        <p
          style={{
            maxWidth: 520,
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,.75)",
            marginBottom: 32,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s",
          }}
        >
          心理学研究をベースにした本格恋愛性格診断。43問の質問に答えるだけで、あなたの恋愛タイプを8次元で分析し、12タイプから判定します。
        </p>

        {/* CTAボタン群 — delay 0.7s フェードアップ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.7s, transform 0.6s ease-out 0.7s",
          }}
        >
          <Link
            href="/love/quiz"
            className="btn-gradient"
            style={{
              padding: "18px 48px",
              fontSize: "1.1rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            43問・無料診断スタート
          </Link>

          <button
            onClick={scrollToTypes}
            style={{
              background: "transparent",
              border: "none",
              padding: "8px 0",
              color: "rgba(255,255,255,.6)",
              fontSize: "0.85rem",
              cursor: "pointer",
              textDecoration: "underline",
              transition: "color 0.3s",
            }}
          >
            12タイプを見る
          </button>
        </div>
      </section>

      {/* ========== 12タイプグリッド ========== */}
      <section
        id="types"
        style={{
          padding: "80px 20px",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* セクションタイトル */}
        <div style={{ textAlign: "left", marginBottom: 48 }}>
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "#C45AFF",
              display: "block",
              marginBottom: 8,
            }}
          >
            LOVE TYPES
          </span>
          <h2
            className="font-stick"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)" }}
          >
            12の恋愛性格タイプ
          </h2>
        </div>

        {/* タイプカードグリッド — IntersectionObserverでstaggered fadeUp */}
        <div
          ref={typesGridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
          className="types-grid"
        >
          {TYPES.map((type, index) => (
            <div
              key={type.id}
              className="type-card-hover"
              style={{
                background: "rgba(10,1,22,.88)",
                borderRadius: 16,
                padding: "22px 18px",
                border: "1px solid transparent",
                transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                // staggered fadeUp: 表示されるまで透明、表示後にアニメーション
                opacity: typesVisible ? 1 : 0,
                transform: typesVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transitionProperty: "opacity, transform, border-color, box-shadow",
                transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                transitionDelay: typesVisible ? `${index * 0.06}s` : "0s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = type.color;
                el.style.boxShadow = `0 0 20px ${type.color}33, 0 0 40px ${type.color}15`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "none";
                el.style.borderColor = "transparent";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>
                {type.emoji}
              </div>
              <h3
                className="font-zen"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: type.color,
                  marginBottom: 4,
                }}
              >
                {type.name}
              </h3>
              <p
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,.55)",
                  marginBottom: 10,
                  letterSpacing: "0.03em",
                }}
              >
                {type.tag}
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,.75)",
                }}
              >
                {type.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 診断セクション ========== */}
      <section
        ref={quizRef}
        id="quiz"
        style={{
          padding: "80px 20px",
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "left",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "#C45AFF",
            display: "block",
            marginBottom: 8,
            opacity: quizVisible ? 1 : 0,
            transform: quizVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          FREE DIAGNOSIS
        </span>
        <h2
          className="font-stick"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
            marginBottom: 32,
            opacity: quizVisible ? 1 : 0,
            transform: quizVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
          }}
        >
          43問・8次元・本格診断
        </h2>

        {/* 診断カード */}
        <div
          style={{
            background: "rgba(10,1,22,.88)",
            borderRadius: 20,
            padding: "36px 28px",
            border: "1px solid rgba(255,107,232,.15)",
            marginBottom: 32,
            textAlign: "left",
            opacity: quizVisible ? 1 : 0,
            transform: quizVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 24,
            }}
          >
            {/* 診断の特徴（アイコン付き） */}
            {quizFeatures.map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.3rem", lineHeight: 1, flexShrink: 0, marginTop: 2 }}>
                  {item.icon}
                </span>
                <div>
                  <div
                    className="font-zen"
                    style={{
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "#FF6BE8",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,.6)",
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,.7)",
            }}
          >
            愛着理論・進化心理学・自己拡張モデルなど、複数の心理学研究をベースに設計。あなたの恋愛における行動パターンや価値観を8つの次元で数値化し、12のタイプから最も近いものを判定します。
          </p>
        </div>

        {/* CTA — glowBreathアニメーション付き */}
        <div
          style={{
            textAlign: "center",
            opacity: quizVisible ? 1 : 0,
            transform: quizVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease-out 0.35s, transform 0.5s ease-out 0.35s",
          }}
        >
          <Link
            href="/love/quiz"
            className="btn-gradient animate-glowBreath"
            style={{
              padding: "18px 52px",
              fontSize: "1.1rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            診断スタート
          </Link>
        </div>
      </section>

      {/* ========== フッター ========== */}
      <footer
        style={{
          padding: "80px 20px 60px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.08)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="font-stick"
          style={{
            fontSize: "1.3rem",
            color: "#FF6BE8",
            marginBottom: 12,
          }}
        >
          ときめきラボ
        </div>
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,.6)",
            marginBottom: 40,
          }}
        >
          恋する全ての人に、勇気と自信を。
        </p>
        <p
          style={{
            maxWidth: 700,
            margin: "0 auto",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,.3)",
            lineHeight: 1.8,
          }}
        >
          <span style={{ fontWeight: 700, marginRight: 6 }}>参考文献:</span>
          {references.join("; ")}
        </p>
        <p
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,.25)",
            marginTop: 40,
          }}
        >
          &copy; 2026 ときめきラボ
        </p>
      </footer>

      {/* ========== スタイル定義（レスポンシブ + 演出） ========== */}
      <style jsx>{`
        /* --- レスポンシブ: グリッド列数 --- */
        @media (max-width: 900px) {
          .types-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .types-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* --- タイトルのglowBreathアニメーション（textShadowが呼吸する） --- */
        .hero-title-glow span {
          animation: titleGlowBreath 3s ease-in-out infinite;
        }
        @keyframes titleGlowBreath {
          0%, 100% {
            text-shadow:
              0 0 20px rgba(255, 107, 232, 0.15),
              0 0 40px rgba(196, 90, 255, 0.05);
          }
          50% {
            text-shadow:
              0 0 30px rgba(255, 107, 232, 0.4),
              0 0 60px rgba(196, 90, 255, 0.2),
              0 0 100px rgba(123, 92, 255, 0.1);
          }
        }

        /* --- ティッカーバーのshimmerグラデーション背景 --- */
        .ticker-shimmer-bg {
          background: linear-gradient(
            90deg,
            rgba(255, 107, 232, 0.06) 0%,
            rgba(196, 90, 255, 0.12) 25%,
            rgba(255, 107, 232, 0.06) 50%,
            rgba(123, 92, 255, 0.12) 75%,
            rgba(255, 107, 232, 0.06) 100%
          );
          background-size: 200% 100%;
          animation: tickerShimmerBg 4s ease-in-out infinite;
        }
        @keyframes tickerShimmerBg {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* --- 流れ星エフェクト --- */
        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          opacity: 0;
        }
        /* 流れ星の光の尾 */
        .shooting-star::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.8),
            rgba(255, 107, 232, 0.4),
            transparent
          );
          transform-origin: left center;
          transform: rotate(215deg);
        }

        /* 流れ星1 — 左上から右下、8秒周期 */
        .shooting-star-1 {
          top: 8%;
          left: 25%;
          animation: shoot1 8s ease-in infinite 2s;
        }
        .shooting-star-1::after {
          width: 100px;
        }
        @keyframes shoot1 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          2% {
            opacity: 1;
          }
          12% {
            opacity: 0;
            transform: translate(250px, 180px);
          }
          100% {
            opacity: 0;
            transform: translate(250px, 180px);
          }
        }

        /* 流れ星2 — 少し角度を変え、12秒周期 */
        .shooting-star-2 {
          top: 15%;
          left: 60%;
          animation: shoot2 12s ease-in infinite 5s;
        }
        .shooting-star-2::after {
          width: 60px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.7),
            rgba(196, 90, 255, 0.4),
            transparent
          );
          transform: rotate(225deg);
        }
        @keyframes shoot2 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          1.5% {
            opacity: 1;
          }
          10% {
            opacity: 0;
            transform: translate(180px, 220px);
          }
          100% {
            opacity: 0;
            transform: translate(180px, 220px);
          }
        }

        /* 流れ星3 — もう少し浅い角度、15秒周期 */
        .shooting-star-3 {
          top: 5%;
          left: 45%;
          animation: shoot3 15s ease-in infinite 9s;
        }
        .shooting-star-3::after {
          width: 70px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.6),
            rgba(255, 107, 232, 0.3),
            transparent
          );
          transform: rotate(205deg);
        }
        @keyframes shoot3 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          1% {
            opacity: 1;
          }
          8% {
            opacity: 0;
            transform: translate(300px, 140px);
          }
          100% {
            opacity: 0;
            transform: translate(300px, 140px);
          }
        }

        /* --- ブロブのダイナミックな動き --- */
        .blob-dynamic-1 {
          animation: blobDynamic1 14s ease-in-out infinite;
        }
        @keyframes blobDynamic1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-40px, 30px) scale(1.05); }
          50% { transform: translate(30px, -50px) scale(0.95); }
          75% { transform: translate(-20px, -30px) scale(1.02); }
        }

        .blob-dynamic-2 {
          animation: blobDynamic2 18s ease-in-out infinite;
        }
        @keyframes blobDynamic2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -40px) scale(1.08); }
          66% { transform: translate(-30px, 40px) scale(0.93); }
        }

        .blob-dynamic-3 {
          animation: blobDynamic3 20s ease-in-out infinite;
        }
        @keyframes blobDynamic3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -25px) scale(1.1); }
          50% { transform: translate(-25px, 20px) scale(0.9); }
          75% { transform: translate(15px, 30px) scale(1.05); }
        }
      `}</style>
    </>
  );
}
