"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PixelSparkle from "@/components/PixelSparkle";

// ============================================================
// 恋愛性格診断 ランディングページ
// テーマ: プリキュア × 魔法少女 × 乙女ゲー
// カラー: パステルピンク〜ラベンダー〜ホワイト
// ============================================================

export default function LandingPage() {

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


  // --- ティッカーの内容 ---
  const tickerItems = [
    "43問・本格恋愛性格診断",
    "8次元スコアリング",
    "24タイプ完全判定",
    "愛着理論×進化心理学",
    "完全無料・登録不要",
    "SNSでシェアして比較",
  ];
  const tickerText = [...tickerItems, ...tickerItems]
    .map((t) => `${t} `)
    .join("");

  // --- 参考文献一覧 ---
  const references = [
    "Lee, J.A. (1973). The Colors of Love",
    "Bartholomew & Horowitz (1991). Attachment Styles",
    "Aron et al. (1997). Self-Expansion Model",
    "Buss, D.M. (2003). The Evolution of Desire",
    "Fisher, H. (2004). Why We Love",
  ];

  // --- 診断カードの特徴項目 ---
  const quizFeatures = [
    { label: "43問", detail: "直感で答える質問", icon: "💭" },
    { label: "8次元分析", detail: "多角的なスコアリング", icon: "📊" },
    { label: "24タイプ判定", detail: "あなたの恋愛性格", icon: "💎" },
    { label: "約8-10分", detail: "サクッと完了", icon: "⏱️" },
  ];

  // --- ハートSVGパス ---
  const heartPath = "M10 18Q2 12 2 7Q2 2 6.5 2Q9 2 10 5Q11 2 13.5 2Q18 2 18 7Q18 12 10 18Z";

  return (
    <>
      {/* ========== 背景グラデーション ========== */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "linear-gradient(170deg, #FFF0F8 0%, #FDE4F7 20%, #F3E0FF 45%, #E8D5FF 65%, #F5E6FF 85%, #FFF5FD 100%)",
        }}
      />

      {/* ========== ピクセルキラキラパーティクル ========== */}
      <PixelSparkle color="#FF6BE8" count={15} size={18} speed={130} style={{ zIndex: 1 }} />

      {/* ========== 浮遊ハートSVGアニメーション（背景装飾） ========== */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* 浮遊ハート群 */}
        {[
          { x: "8%", y: "15%", size: 24, delay: 0, dur: 6, opacity: 0.12 },
          { x: "85%", y: "10%", size: 18, delay: 1.5, dur: 7, opacity: 0.1 },
          { x: "15%", y: "55%", size: 20, delay: 3, dur: 8, opacity: 0.08 },
          { x: "78%", y: "45%", size: 28, delay: 0.8, dur: 6.5, opacity: 0.1 },
          { x: "45%", y: "75%", size: 16, delay: 2.2, dur: 7.5, opacity: 0.09 },
          { x: "92%", y: "70%", size: 22, delay: 4, dur: 6, opacity: 0.11 },
          { x: "30%", y: "25%", size: 14, delay: 1, dur: 8.5, opacity: 0.07 },
          { x: "60%", y: "85%", size: 20, delay: 2.8, dur: 7, opacity: 0.08 },
          { x: "5%", y: "80%", size: 16, delay: 3.5, dur: 6.8, opacity: 0.1 },
          { x: "70%", y: "20%", size: 12, delay: 0.5, dur: 9, opacity: 0.06 },
        ].map((h, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            style={{
              position: "absolute",
              left: h.x,
              top: h.y,
              width: h.size,
              height: h.size,
              opacity: h.opacity,
              animation: `loveFloat ${h.dur}s ease-in-out ${h.delay}s infinite`,
            }}
          >
            <path d={heartPath} fill="#FF6BE8" />
          </svg>
        ))}

        {/* キラキラパーティクル */}
        {[
          { x: "20%", y: "30%", size: 4, delay: 0, dur: 3 },
          { x: "75%", y: "15%", size: 3, delay: 1, dur: 4 },
          { x: "50%", y: "60%", size: 5, delay: 0.5, dur: 3.5 },
          { x: "10%", y: "70%", size: 3, delay: 2, dur: 4.5 },
          { x: "88%", y: "55%", size: 4, delay: 1.5, dur: 3 },
          { x: "35%", y: "85%", size: 3, delay: 0.8, dur: 4 },
          { x: "65%", y: "40%", size: 5, delay: 2.5, dur: 3.5 },
          { x: "42%", y: "12%", size: 3, delay: 3, dur: 4 },
        ].map((s, i) => (
          <div
            key={`sparkle-${i}`}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFD700 0%, #FF6BE860 50%, transparent 70%)",
              animation: `loveSparkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ========== ナビバー（ピンクのグラスモーフィズム） ========== */}
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
          background: "rgba(255,200,240,0.45)",
          backdropFilter: "blur(16px) saturate(1.6)",
          WebkitBackdropFilter: "blur(16px) saturate(1.6)",
          borderBottom: "1px solid rgba(255,107,232,0.15)",
          boxShadow: "0 2px 20px rgba(255,107,232,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/"
            className="love-nav-back"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,107,232,0.2)",
              color: "#D946A8",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              backdropFilter: "blur(8px)",
              transition: "all 0.25s ease",
            }}
          >
            <span style={{ fontSize: 14 }}>&#8592;</span>
            ホームに戻る
          </Link>
          <span
            className="font-stick"
            style={{
              background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "1.2rem",
            }}
          >
            恋愛性格診断
          </span>
        </div>
        <Link
          href="/love/quiz"
          className="love-nav-cta"
          style={{
            position: "relative",
            padding: "8px 20px",
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
            color: "#fff",
            borderRadius: 50,
            fontWeight: 700,
            fontFamily: "'Zen Maru Gothic', sans-serif",
            boxShadow: "0 2px 12px rgba(255,107,232,0.3)",
            transition: "all 0.3s ease",
            overflow: "hidden",
          }}
        >
          {/* ナビボタンのシマー */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "60%",
              height: "100%",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.2) 60%, transparent 100%)",
              animation: "loveShimmer 3s ease-in-out 1s infinite",
              pointerEvents: "none",
            }}
          />
          <svg viewBox="0 0 20 20" width="14" height="14" style={{ position: "relative" }}>
            <path d={heartPath} fill="white" opacity="0.9" />
          </svg>
          <span style={{ position: "relative" }}>診断スタート</span>
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
          padding: "80px 20px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ティッカーバー（ピンクグラデーション） */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            overflow: "hidden",
            whiteSpace: "nowrap",
            padding: "8px 0",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#D946A8",
            letterSpacing: "0.05em",
            marginBottom: 40,
            background: "linear-gradient(90deg, rgba(255,107,232,0.06), rgba(196,90,255,0.08), rgba(255,107,232,0.06))",
            borderTop: "1px solid rgba(255,107,232,0.1)",
            borderBottom: "1px solid rgba(255,107,232,0.1)",
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

        {/* 二重リング装飾 + メイン絵文字 */}
        <div
          style={{
            position: "relative",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 180,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          {/* 外側リング（ゆっくり回転、ハート装飾付き） */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "2px dashed rgba(255,107,232,0.2)",
              animation: "loveRingSpin 25s linear infinite",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            {/* リング上の装飾ドット */}
            <div style={{
              position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)",
              width: 10, height: 10, borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
              opacity: 0.5,
            }} />
            <div style={{
              position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
              width: 7, height: 7, borderRadius: "50%",
              background: "#C45AFF",
              opacity: 0.3,
            }} />
            <div style={{
              position: "absolute", left: -4, top: "50%", transform: "translateY(-50%)",
              width: 7, height: 7, borderRadius: "50%",
              background: "#FF6BE8",
              opacity: 0.3,
            }} />
            <div style={{
              position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)",
              width: 7, height: 7, borderRadius: "50%",
              background: "#FF6BE8",
              opacity: 0.3,
            }} />
          </div>

          {/* 内側リング */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "2.5px solid rgba(255,107,232,0.12)",
              background: "radial-gradient(circle, rgba(255,107,232,0.04) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* メイン絵文字 */}
          <div
            style={{
              position: "relative",
              fontSize: 80,
              lineHeight: 1,
              filter: "drop-shadow(0 0 24px rgba(255,107,232,0.35))",
              animation: "loveFloat 5s ease-in-out infinite",
              zIndex: 1,
            }}
          >
            💘
          </div>
        </div>

        {/* メインタイトル */}
        <h1
          style={{
            lineHeight: 1.1,
            marginBottom: 20,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s",
          }}
        >
          <span
            className="font-stick"
            style={{
              display: "block",
              fontSize: "clamp(36px, 10vw, 68px)",
              background: "linear-gradient(135deg, #FF6BE8 0%, #C45AFF 50%, #A855F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 8px rgba(255,107,232,0.2))",
            }}
          >
            恋愛性格診断
          </span>
        </h1>

        {/* キャッチコピー */}
        <p
          className="font-zen"
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
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
          className="font-zen"
          style={{
            maxWidth: 520,
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#7B5A8E",
            marginBottom: 36,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out 0.45s, transform 0.6s ease-out 0.45s",
          }}
        >
          心理学研究をベースにした本格恋愛性格診断。43問の質問に答えるだけで、あなたの恋愛タイプを8次元で分析し、24タイプから判定します。
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
            transition: "opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s",
          }}
        >
          <Link
            href="/love/quiz"
            className="love-cta-btn"
            style={{
              position: "relative",
              padding: "20px 52px",
              fontSize: "1.15rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
              color: "#fff",
              borderRadius: 50,
              fontWeight: 700,
              fontFamily: "'Zen Maru Gothic', sans-serif",
              boxShadow: "0 4px 24px rgba(255,107,232,0.4)",
              transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              overflow: "hidden",
              letterSpacing: "0.04em",
              animation: "lovePulse 2.5s ease-in-out 1.2s infinite",
            }}
          >
            {/* シマーアニメーション */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "60%",
                height: "100%",
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 60%, transparent 100%)",
                animation: "loveShimmer 3s ease-in-out 1.5s infinite",
                pointerEvents: "none",
              }}
            />
            {/* 左ハートアイコン */}
            <svg viewBox="0 0 20 20" width="18" height="18" style={{ position: "relative", animation: "loveIconBounce 2s ease-in-out infinite" }}>
              <path d={heartPath} fill="white" opacity="0.9" />
            </svg>
            <span style={{ position: "relative" }}>43問・無料診断スタート</span>
            {/* 右ハートアイコン */}
            <svg viewBox="0 0 20 20" width="18" height="18" style={{ position: "relative", transform: "scaleX(-1)", animation: "loveIconBounce 2s ease-in-out 0.3s infinite" }}>
              <path d={heartPath} fill="white" opacity="0.9" />
            </svg>
          </Link>

        </div>
      </section>

      {/* ========== 診断セクション（グラスモーフィズムカード） ========== */}
      <section
        ref={quizRef}
        id="quiz"
        style={{
          padding: "40px 20px 80px",
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
            color: "#D946A8",
            display: "block",
            marginBottom: 8,
            fontWeight: 700,
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
            fontSize: "clamp(1.4rem, 5vw, 2rem)",
            marginBottom: 32,
            background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: quizVisible ? 1 : 0,
            transform: quizVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
          }}
        >
          43問・8次元・本格診断
        </h2>

        {/* 診断カード（グラデーションボーダー + グラスモーフィズム） */}
        <div
          style={{
            position: "relative",
            borderRadius: 22,
            padding: 2,
            marginBottom: 36,
            background: "linear-gradient(135deg, rgba(255,107,232,0.4), rgba(196,90,255,0.2), rgba(255,107,232,0.3))",
            opacity: quizVisible ? 1 : 0,
            transform: quizVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(16px) saturate(1.4)",
              WebkitBackdropFilter: "blur(16px) saturate(1.4)",
              borderRadius: 20,
              padding: "28px 24px 28px 28px",
              textAlign: "left",
              overflow: "hidden",
            }}
          >
            {/* 左端のアクセントバー */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 16,
                bottom: 16,
                width: 4,
                borderRadius: 4,
                background: "linear-gradient(180deg, #FF6BE8, #C45AFF)",
              }}
            />

            {/* この診断でわかること */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: "#D946A8",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  marginBottom: 4,
                }}
              >
                <svg viewBox="0 0 20 20" width="14" height="14">
                  <path d={heartPath} fill="#D946A8" opacity="0.7" />
                </svg>
                この診断でわかること
              </div>
              <div
                style={{
                  width: 40,
                  height: 2,
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #FF6BE8, rgba(196,90,255,0.5))",
                  marginBottom: 12,
                }}
              />
            </div>

            {/* メタ情報グリッド */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
              }}
              className="quiz-features-grid"
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
                        color: "#D946A8",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#7B5A8E",
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="font-zen"
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: "#7B5A8E",
              }}
            >
              愛着理論・進化心理学・自己拡張モデルなど、複数の心理学研究をベースに設計。あなたの恋愛における行動パターンや価値観を8つの次元で数値化し、24のタイプから最も近いものを判定します。
            </p>
          </div>
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
            className="love-cta-btn"
            style={{
              position: "relative",
              padding: "20px 56px",
              fontSize: "1.15rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
              color: "#fff",
              borderRadius: 50,
              fontWeight: 700,
              fontFamily: "'Zen Maru Gothic', sans-serif",
              boxShadow: "0 4px 24px rgba(255,107,232,0.4)",
              transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              overflow: "hidden",
              letterSpacing: "0.04em",
            }}
          >
            {/* シマー */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "60%",
                height: "100%",
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 60%, transparent 100%)",
                animation: "loveShimmer 3s ease-in-out 1.5s infinite",
                pointerEvents: "none",
              }}
            />
            <svg viewBox="0 0 20 20" width="18" height="18" style={{ position: "relative" }}>
              <path d={heartPath} fill="white" opacity="0.9" />
            </svg>
            <span style={{ position: "relative" }}>診断スタート</span>
            <svg viewBox="0 0 20 20" width="18" height="18" style={{ position: "relative", transform: "scaleX(-1)" }}>
              <path d={heartPath} fill="white" opacity="0.9" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ========== フッター ========== */}
      <footer
        style={{
          padding: "80px 20px 60px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,107,232,0.12)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="font-stick"
          style={{
            fontSize: "1.3rem",
            background: "linear-gradient(135deg, #FF6BE8, #C45AFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 12,
          }}
        >
          恋愛性格診断
        </div>
        <p
          className="font-zen"
          style={{
            fontSize: "0.85rem",
            color: "#7B5A8E",
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
            color: "#B89FC8",
            lineHeight: 1.8,
          }}
        >
          <span style={{ fontWeight: 700, marginRight: 6 }}>参考文献:</span>
          {references.join("; ")}
        </p>
        <p
          style={{
            fontSize: "0.65rem",
            color: "#B89FC8",
            marginTop: 40,
          }}
        >
          &copy; 2026 ときめき研究所
        </p>
      </footer>

      {/* ========== スタイル定義（アニメーション + レスポンシブ） ========== */}
      <style jsx>{`
        /* --- ティッカースクロール --- */
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* --- シマーアニメーション（光が横切るボタン演出） --- */
        @keyframes loveShimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        /* --- パルスアニメーション（ボタンの呼吸） --- */
        @keyframes lovePulse {
          0%, 100% {
            box-shadow: 0 4px 24px rgba(255,107,232,0.4);
          }
          50% {
            box-shadow: 0 6px 32px rgba(255,107,232,0.6), 0 0 48px rgba(196,90,255,0.2);
          }
        }

        /* --- リング回転 --- */
        @keyframes loveRingSpin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* --- 浮遊アニメーション（ハート・絵文字用） --- */
        @keyframes loveFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-12px) rotate(3deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
          75% { transform: translateY(-15px) rotate(2deg); }
        }

        /* --- キラキラパーティクル --- */
        @keyframes loveSparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* --- アイコンバウンス --- */
        @keyframes loveIconBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }

        /* --- CTAボタン ホバー --- */
        .love-cta-btn:hover {
          transform: scale(1.04) !important;
          box-shadow: 0 8px 40px rgba(255,107,232,0.5), 0 0 60px rgba(196,90,255,0.25) !important;
        }
        .love-cta-btn:active {
          transform: scale(0.97) !important;
        }

        /* --- ナビ戻るボタン ホバー --- */
        .love-nav-back:hover {
          background: rgba(255,107,232,0.1) !important;
          border-color: rgba(255,107,232,0.4) !important;
          color: #FF6BE8 !important;
        }

        /* --- ナビCTA ホバー --- */
        .love-nav-cta:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(255,107,232,0.4) !important;
        }

        /* --- タイプリンク ホバー --- */
        .love-types-link:hover {
          color: #D946A8 !important;
        }

        /* --- レスポンシブ: 特徴グリッドを1列に --- */
        @media (max-width: 480px) {
          .quiz-features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
