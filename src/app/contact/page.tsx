"use client";

/**
 * お問い合わせページ
 * 診断研究所へのお問い合わせ案内 + Googleフォームへの誘導
 */

import Link from "next/link";

// お問い合わせカテゴリデータ
const CONTACT_CATEGORIES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "不具合・バグ報告",
    description: "診断が正しく動作しない場合",
    color: "#f87171",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="13" y2="13" />
      </svg>
    ),
    title: "ご意見・ご要望",
    description: "新しい診断のリクエストなど",
    color: "#2dd4bf",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
    title: "その他のお問い合わせ",
    description: "取材・コラボなど",
    color: "#a78bfa",
  },
];

// フッターリンクデータ
const FOOTER_LINKS = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/tokushoho", label: "特定商取引法に基づく表記" },
];

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe72uFPyf-pI1RcH04IuecN0mkwnU9a9L2yKyRcLhaHvq2TZg/viewform?usp=publish-editor";

export default function ContactPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F0FAFA 0%, #e0f7f5 50%, #F0FAFA 100%)",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        padding: "40px 16px 60px",
      }}
    >
      {/* ホームへ戻るリンク */}
      <div style={{ maxWidth: 720, margin: "0 auto 24px" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "#2d4a57",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(10px)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.8)";
            e.currentTarget.style.color = "#2dd4bf";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.5)";
            e.currentTarget.style.color = "#2d4a57";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          ホームに戻る
        </Link>
      </div>

      {/* メインカード */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(45,212,191,0.08)",
          padding: "48px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 装飾：背景のグラデーション円 */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 160,
            height: 160,
            background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* タイトル */}
        <div style={{ textAlign: "center", marginBottom: 32, position: "relative" }}>
          {/* フラスコアイコン */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2dd4bf 0%, #38bdf8 100%)",
              marginBottom: 16,
              boxShadow: "0 4px 14px rgba(45,212,191,0.3)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              background: "linear-gradient(135deg, #2dd4bf 0%, #38bdf8 50%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 12,
              lineHeight: 1.4,
            }}
          >
            お問い合わせ
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#2d4a57",
              lineHeight: 1.8,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            診断研究所に関するご質問、ご要望、不具合のご報告などがありましたら、下記のフォームよりお気軽にお問い合わせください。
          </p>
        </div>

        {/* カテゴリカード */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 36,
          }}
        >
          {CONTACT_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              style={{
                background: "rgba(255,255,255,0.7)",
                borderRadius: 16,
                padding: "24px 20px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `${cat.color}18`,
                  color: cat.color,
                  marginBottom: 12,
                }}
              >
                {cat.icon}
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0f1f2b",
                  marginBottom: 6,
                }}
              >
                {cat.title}
              </h3>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        {/* お問い合わせボタン */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "linear-gradient(135deg, #2dd4bf 0%, #38bdf8 100%)",
              color: "#fff",
              fontSize: 17,
              fontWeight: 700,
              fontFamily: "'Zen Maru Gothic', sans-serif",
              padding: "18px 48px",
              borderRadius: 16,
              border: "none",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(45,212,191,0.35), 0 2px 8px rgba(45,212,191,0.2)",
              transition: "all 0.25s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 10px 32px rgba(45,212,191,0.45), 0 4px 12px rgba(45,212,191,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 6px 24px rgba(45,212,191,0.35), 0 2px 8px rgba(45,212,191,0.2)";
            }}
          >
            お問い合わせフォームを開く
            {/* 外部リンクアイコン */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* 注意事項 */}
        <div
          style={{
            background: "rgba(45,212,191,0.06)",
            borderRadius: 14,
            padding: "20px 24px",
            border: "1px solid rgba(45,212,191,0.15)",
          }}
        >
          <h3
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#2d4a57",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            ご注意事項
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <li
              style={{
                fontSize: 13,
                color: "#64748b",
                lineHeight: 1.6,
                paddingLeft: 16,
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 2,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#2dd4bf",
                  opacity: 0.5,
                }}
              />
              回答には3営業日程度お時間をいただく場合があります
            </li>
            <li
              style={{
                fontSize: 13,
                color: "#64748b",
                lineHeight: 1.6,
                paddingLeft: 16,
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 2,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#2dd4bf",
                  opacity: 0.5,
                }}
              />
              全てのお問い合わせに個別回答できない場合があります
            </li>
          </ul>
        </div>
      </div>

      {/* フッター：法的ページリンク */}
      <footer
        style={{
          maxWidth: 720,
          margin: "32px auto 0",
          textAlign: "center",
          padding: "20px 0",
          borderTop: "1px solid rgba(45,212,191,0.15)",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px 24px",
          }}
          aria-label="法的情報ページ"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 13,
                color: "#64748b",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#2dd4bf";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>
          診断研究所 - 個人運営
        </p>
      </footer>
    </div>
  );
}
