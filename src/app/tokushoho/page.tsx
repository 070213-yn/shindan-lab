"use client";

/**
 * 特定商取引法に基づく表記ページ
 * 診断研究所 - 完全無料サービスのため簡易表記
 */

import Link from "next/link";

// テーブルデータ
const TOKUSHOHO_DATA = [
  { label: "事業者名", value: "やな" },
  { label: "運営責任者", value: "やな" },
  { label: "所在地", value: "ご請求いただいた場合、遅滞なく開示いたします" },
  { label: "電話番号", value: "ご請求いただいた場合、遅滞なく開示いたします" },
  { label: "メールアドレス", value: "お問い合わせフォームよりご連絡ください" },
  { label: "サービス内容", value: "心理学に基づく各種診断サービスの提供" },
  { label: "料金", value: "全サービス無料" },
  { label: "支払方法", value: "なし（全サービス無料のため）" },
  { label: "返品・交換", value: "なし（全サービス無料のため）" },
  { label: "サービスの提供時期", value: "即時（サイト上でご利用いただけます）" },
];

// フッターリンク
const FOOTER_LINKS = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
  {
    href: "https://docs.google.com/forms/d/e/1FAIpQLSe72uFPyf-pI1RcH04IuecN0mkwnU9a9L2yKyRcLhaHvq2TZg/viewform?usp=publish-editor",
    label: "お問い合わせ",
    external: true,
  },
];

export default function TokushohoPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdfa 0%, #e0f7f5 30%, #f0fafa 60%, #e8faf6 100%)",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        padding: "40px 16px 60px",
      }}
    >
      {/* 背景の装飾 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* 装飾円 */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-5%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* ホームへ戻るリンク */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "#2dd4bf",
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 500,
            marginBottom: 28,
            transition: "opacity 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span style={{ fontSize: 18 }}>←</span> ホームに戻る
        </Link>

        {/* メインカード */}
        <div
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 8px 32px rgba(45,212,191,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            padding: "40px 36px",
            overflow: "hidden",
          }}
        >
          {/* 見出し */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 2,
                color: "#2dd4bf",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Legal Notice
            </div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                margin: 0,
                background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.4,
              }}
            >
              特定商取引法に基づく表記
            </h1>
            <div
              style={{
                width: 48,
                height: 3,
                background: "linear-gradient(90deg, #2dd4bf, #99f6e4)",
                borderRadius: 2,
                margin: "16px auto 0",
              }}
            />
          </div>

          {/* サービス説明 */}
          <p
            style={{
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.8,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            「診断研究所」は完全無料の診断サービスです。
            <br />
            有料での商品・サービスの販売は行っておりません。
          </p>

          {/* テーブル */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(45,212,191,0.15)",
            }}
          >
            {TOKUSHOHO_DATA.map((item, index) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  borderBottom:
                    index < TOKUSHOHO_DATA.length - 1
                      ? "1px solid rgba(45,212,191,0.1)"
                      : "none",
                  background:
                    index % 2 === 0
                      ? "rgba(240,253,250,0.5)"
                      : "rgba(255,255,255,0.3)",
                  transition: "background 0.2s",
                }}
              >
                {/* 項目名 */}
                <div
                  style={{
                    width: "35%",
                    minWidth: 130,
                    padding: "14px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#0f766e",
                    borderRight: "1px solid rgba(45,212,191,0.1)",
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(45,212,191,0.04)",
                  }}
                >
                  {item.label}
                </div>
                {/* 内容 */}
                <div
                  style={{
                    flex: 1,
                    padding: "14px 16px",
                    fontSize: 14,
                    color: "#334155",
                    lineHeight: 1.6,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.label === "メールアドレス" ? (
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSe72uFPyf-pI1RcH04IuecN0mkwnU9a9L2yKyRcLhaHvq2TZg/viewform?usp=publish-editor"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#2dd4bf",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 補足事項 */}
          <div
            style={{
              marginTop: 28,
              padding: "16px 20px",
              background: "rgba(45,212,191,0.05)",
              borderRadius: 12,
              border: "1px solid rgba(45,212,191,0.1)",
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "#64748b",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              ※ 当サイトは個人が運営する完全無料の診断サービスです。住所・電話番号につきましては、
              個人情報保護の観点から、請求があった場合に遅滞なく開示する方式を採用しております。
            </p>
          </div>
        </div>

        {/* フッターリンク */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px 24px",
          }}
        >
          {FOOTER_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 13,
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#2dd4bf")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 13,
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#2dd4bf")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* コピーライト */}
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#cbd5e1",
            marginTop: 16,
          }}
        >
          &copy; 2025 診断研究所 All rights reserved.
        </p>
      </div>
    </div>
  );
}
