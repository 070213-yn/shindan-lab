"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { TYPES } from "@/lib/types";

// ============================================================
// 診断研究所 ランディングページ
// テーマ: 青春 x 爽やか x 透明感
// 背景色: #F0FAFA（フレッシュミント）
// ============================================================

export default function LandingPage() {
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
      {/* ========== ナビバー（白い半透明ガラス） ========== */}
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
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(45,212,191,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(45,212,191,0.2)",
              color: "#2dd4bf",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ fontSize: 14 }}>&#8592;</span>
            ホームに戻る
          </Link>
          <span
            className="font-stick"
            style={{ color: "#2dd4bf", fontSize: "1.2rem" }}
          >
            診断研究所
          </span>
        </div>
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
        {/* ティッカーバー */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            overflow: "hidden",
            whiteSpace: "nowrap",
            padding: "6px 0",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#2dd4bf",
            letterSpacing: "0.05em",
            marginBottom: 40,
            background: "rgba(45,212,191,0.08)",
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

        {/* メインタイトル */}
        <h1
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
              color: "#1a2e3b",
            }}
          >
            診断研究所
          </span>
        </h1>

        {/* キャッチコピー */}
        <p
          className="font-zen"
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "#1a2e3b",
            marginBottom: 16,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
          }}
        >
          恋は、勇気が9割。
        </p>

        {/* 説明テキスト */}
        <p
          style={{
            maxWidth: 520,
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#4a6572",
            marginBottom: 32,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s",
          }}
        >
          心理学研究をベースにした本格恋愛性格診断。43問の質問に答えるだけで、あなたの恋愛タイプを8次元で分析し、12タイプから判定します。
        </p>

        {/* CTAボタン群 */}
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
              color: "#6b8a99",
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
              color: "#2dd4bf",
              display: "block",
              marginBottom: 8,
            }}
          >
            LOVE TYPES
          </span>
          <h2
            className="font-stick"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)", color: "#1a2e3b" }}
          >
            12の恋愛性格タイプ
          </h2>
        </div>

        {/* タイプカードグリッド */}
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
                background: "rgba(255,255,255,0.7)",
                borderRadius: 16,
                padding: "22px 18px",
                border: "1px solid rgba(45,212,191,.12)",
                transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                opacity: typesVisible ? 1 : 0,
                transform: typesVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transitionProperty: "opacity, transform, border-color, box-shadow",
                transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                transitionDelay: typesVisible ? `${index * 0.06}s` : "0s",
                boxShadow: "0 2px 12px rgba(0,0,0,.04)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = type.color;
                el.style.boxShadow = `0 0 20px ${type.color}20, 0 8px 24px rgba(0,0,0,.06)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "none";
                el.style.borderColor = "rgba(45,212,191,.12)";
                el.style.boxShadow = "0 2px 12px rgba(0,0,0,.04)";
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
                  color: "#6b8a99",
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
                  color: "#4a6572",
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
            color: "#2dd4bf",
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
            color: "#1a2e3b",
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
            background: "rgba(255,255,255,0.7)",
            borderRadius: 20,
            padding: "36px 28px",
            border: "1px solid rgba(45,212,191,.15)",
            marginBottom: 32,
            textAlign: "left",
            boxShadow: "0 2px 12px rgba(0,0,0,.04)",
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
                      color: "#2dd4bf",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#4a6572",
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
              color: "#4a6572",
            }}
          >
            愛着理論・進化心理学・自己拡張モデルなど、複数の心理学研究をベースに設計。あなたの恋愛における行動パターンや価値観を8つの次元で数値化し、12のタイプから最も近いものを判定します。
          </p>
        </div>

        {/* CTA */}
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
            className="btn-gradient"
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
          borderTop: "1px solid rgba(45,212,191,.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="font-stick"
          style={{
            fontSize: "1.3rem",
            color: "#2dd4bf",
            marginBottom: 12,
          }}
        >
          診断研究所
        </div>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#4a6572",
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
            color: "#9cb3bf",
            lineHeight: 1.8,
          }}
        >
          <span style={{ fontWeight: 700, marginRight: 6 }}>参考文献:</span>
          {references.join("; ")}
        </p>
        <p
          style={{
            fontSize: "0.65rem",
            color: "#9cb3bf",
            marginTop: 40,
          }}
        >
          &copy; 2026 診断研究所
        </p>
      </footer>

      {/* ========== スタイル定義（レスポンシブ） ========== */}
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
      `}</style>
    </>
  );
}
