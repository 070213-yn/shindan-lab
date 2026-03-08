"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { TYPES } from "@/lib/types";

// ============================================================
// ときめきラボ ランディングページ
// テーマ: Y2Kグリッター x 宇宙 x TikTok映え
// 背景色: #0D0118（ディープスペース）
// ============================================================

export default function LandingPage() {
  // --- 星空パーティクル生成 ---
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;
    const container = starsRef.current;
    // 既存の星をクリア
    container.innerHTML = "";
    for (let i = 0; i < 100; i++) {
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
  // 2セット分繰り返す（無限スクロール用）
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

      {/* ブロブ1（紫系） */}
      <div
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
          animation: "blobFloat 12s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* ブロブ2（ピンク系） */}
      <div
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
          animation: "blobFloat 15s ease-in-out infinite",
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
          href="/quiz"
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

      {/* ========== ティッカーバー ========== */}
      <div
        style={{
          position: "fixed",
          top: 56,
          left: 0,
          right: 0,
          zIndex: 99,
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "6px 0",
          background:
            "linear-gradient(90deg, #FF6BE8, #C45AFF, #7B5CFF, #4DE8FF, #80FFB0, #FFE080, #FF6BE8)",
          backgroundSize: "300%",
          animation: "tickerBg 8s linear infinite",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#0D0118",
          letterSpacing: "0.05em",
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

      {/* ========== ヒーローセクション ========== */}
      <section
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 20px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* バッジ */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(255,107,232,.4)",
            borderRadius: 50,
            padding: "6px 18px",
            fontSize: "0.75rem",
            color: "#FF6BE8",
            marginBottom: 24,
            letterSpacing: "0.08em",
          }}
        >
          {/* ドットインジケーター */}
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#FF6BE8",
              animation: "dotPulse 2s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          LOVE PERSONALITY ANALYSIS
        </div>

        {/* メインタイトル */}
        <h1 style={{ lineHeight: 1.1, marginBottom: 16 }}>
          <span
            className="font-stick"
            style={{
              display: "block",
              fontSize: "clamp(58px, 17vw, 110px)",
              color: "#FF6BE8",
              textShadow: "0 0 60px rgba(255,107,232,.5)",
            }}
          >
            ときめき
          </span>
          <span
            className="font-stick"
            style={{
              display: "block",
              fontSize: "clamp(58px, 17vw, 110px)",
              color: "#C45AFF",
              textShadow: "0 0 60px rgba(196,90,255,.4)",
            }}
          >
            ラボ
          </span>
        </h1>

        {/* 説明テキスト */}
        <p
          style={{
            maxWidth: 520,
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,.75)",
            marginBottom: 20,
          }}
        >
          心理学研究をベースにした本格恋愛性格診断。
          <br />
          43問の質問に答えるだけで、あなたの恋愛タイプを
          <br />
          8次元で分析し、12タイプから判定します。
        </p>

        {/* 参考文献バッジ */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          {["愛着理論", "進化心理学", "自己拡張モデル"].map((label) => (
            <span
              key={label}
              style={{
                fontSize: "0.7rem",
                padding: "4px 12px",
                borderRadius: 50,
                border: "1px solid rgba(255,255,255,.2)",
                color: "rgba(255,255,255,.6)",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* CTAボタン群 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          {/* メインCTA */}
          <Link
            href="/quiz"
            className="btn-gradient"
            style={{
              padding: "18px 48px",
              fontSize: "1.1rem",
              textDecoration: "none",
              display: "inline-block",
              animation: "ctaPulse 3s ease-in-out infinite",
            }}
          >
            43問・無料診断スタート
          </Link>

          {/* サブCTA */}
          <button
            onClick={scrollToTypes}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,.25)",
              borderRadius: 50,
              padding: "10px 28px",
              color: "rgba(255,255,255,.7)",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.3s",
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
        <div style={{ textAlign: "center", marginBottom: 48 }}>
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

        {/* タイプカードグリッド（レスポンシブ対応用のCSS Grid） */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
          className="types-grid"
        >
          {TYPES.map((type) => (
            <div
              key={type.id}
              style={{
                background: "rgba(10,1,22,.88)",
                borderRadius: 16,
                padding: "22px 18px",
                border: "1px solid rgba(255,255,255,.08)",
                transition: "transform 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  type.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,.08)";
              }}
            >
              {/* 絵文字 */}
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>
                {type.emoji}
              </div>

              {/* タイプ名 */}
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

              {/* タグ */}
              <p
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,.45)",
                  marginBottom: 10,
                  letterSpacing: "0.03em",
                }}
              >
                {type.tag}
              </p>

              {/* 説明 */}
              <p
                style={{
                  fontSize: "0.78rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,.65)",
                }}
              >
                {type.desc.length > 60
                  ? type.desc.slice(0, 60) + "…"
                  : type.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 診断セクション ========== */}
      <section
        id="quiz"
        style={{
          padding: "80px 20px",
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* セクションタイトル */}
        <span
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "#C45AFF",
            display: "block",
            marginBottom: 8,
          }}
        >
          FREE DIAGNOSIS
        </span>
        <h2
          className="font-stick"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
            marginBottom: 32,
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
            {/* 診断の特徴 */}
            {[
              { label: "43問", detail: "直感で答える質問" },
              { label: "8次元分析", detail: "多角的なスコアリング" },
              { label: "12タイプ判定", detail: "あなたの恋愛性格" },
              { label: "約8-10分", detail: "サクッと完了" },
            ].map((item) => (
              <div key={item.label}>
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

        {/* CTA */}
        <Link
          href="/quiz"
          className="btn-gradient"
          style={{
            padding: "18px 52px",
            fontSize: "1.1rem",
            textDecoration: "none",
            display: "inline-block",
            animation: "ctaPulse 3s ease-in-out infinite",
          }}
        >
          診断スタート
        </Link>
      </section>

      {/* ========== フッター ========== */}
      <footer
        style={{
          padding: "60px 20px 40px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.08)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ロゴ */}
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

        {/* キャッチコピー */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,.6)",
            marginBottom: 32,
          }}
        >
          恋する全ての人に、勇気と自信を。
        </p>

        {/* 参考文献 */}
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,.35)",
              marginBottom: 8,
              fontWeight: 700,
            }}
          >
            参考文献
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {references.map((ref) => (
              <li
                key={ref}
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,.3)",
                  lineHeight: 1.8,
                }}
              >
                {ref}
              </li>
            ))}
          </ul>
        </div>

        {/* コピーライト */}
        <p
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,.25)",
            marginTop: 32,
          }}
        >
          &copy; 2026 ときめきラボ
        </p>
      </footer>

      {/* ========== レスポンシブ用スタイル ========== */}
      <style jsx>{`
        /* 4列 → 3列（900px以下） */
        @media (max-width: 900px) {
          .types-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        /* 3列 → 2列（580px以下） */
        @media (max-width: 580px) {
          .types-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
