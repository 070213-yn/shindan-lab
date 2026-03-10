"use client";

/**
 * 診断研究所 - 利用規約ページ
 *
 * グラスモーフィズム + 研究所テーマのデザイン
 * テーマカラー: #2dd4bf（ティール）
 */

import Link from "next/link";

// セクションデータの型定義
interface Section {
  title: string;
  content: string[];
}

// 利用規約の各セクション
const sections: Section[] = [
  {
    title: "本規約について",
    content: [
      "本利用規約（以下「本規約」）は、やな（以下「運営者」）が提供するWebサイト「診断研究所」（以下「本サービス」）の利用に関する条件を定めるものです。",
      "本サービスをご利用いただいた時点で、本規約に同意したものとみなします。",
    ],
  },
  {
    title: "サービス内容",
    content: [
      "本サービスは、心理学に基づく各種診断コンテンツを提供するWebサイトです。",
      "全ての診断は無料でご利用いただけます。利用にあたって料金が発生することは一切ありません。",
    ],
  },
  {
    title: "利用条件",
    content: [
      "本サービスの利用に年齢制限はありません。どなたでもご利用いただけます。",
      "会員登録やログインは不要です。ブラウザからアクセスするだけでご利用いただけます。",
    ],
  },
  {
    title: "禁止事項",
    content: [
      "本サービスの利用にあたり、以下の行為を禁止します。",
      "・本サービスへの不正アクセス、またはそれを試みる行為",
      "・診断結果やコンテンツのスクレイピング（自動収集）等、商用目的での利用",
      "・他の利用者や第三者への誹謗中傷（悪口や名誉を傷つける行為）",
      "・本サービスのコンテンツに対する著作権その他の権利を侵害する行為",
      "・その他、運営者が不適切と判断する行為",
    ],
  },
  {
    title: "知的財産権",
    content: [
      "本サービスに掲載されている診断コンテンツ、テキスト、画像、デザイン等に関する著作権その他の知的財産権は、運営者に帰属します。",
      "個人的な利用の範囲を超えて、無断で複製・転載・改変することを禁じます。",
    ],
  },
  {
    title: "免責事項",
    content: [
      "本サービスで提供する診断結果は、エンターテインメント（娯楽）を目的としたものです。医学的・心理学的な診断や助言を行うものではありません。",
      "診断結果に基づいて利用者が行った行動や判断について、運営者は一切の責任を負いません。",
      "本サービスの利用により生じたいかなる損害についても、運営者は責任を負わないものとします。",
    ],
  },
  {
    title: "サービスの変更・停止",
    content: [
      "運営者は、事前の予告なく本サービスの内容を変更、または一時的もしくは永続的に停止する場合があります。",
      "これにより利用者に生じた損害について、運営者は責任を負いません。",
    ],
  },
  {
    title: "規約の変更",
    content: [
      "運営者は、必要に応じて本規約を変更することがあります。変更後の規約は、本ページに掲載した時点で効力を生じます。",
      "重要な変更を行う場合は、本サービス上で通知するよう努めます。",
    ],
  },
  {
    title: "準拠法・管轄",
    content: [
      "本規約は日本法に準拠し、日本法に基づいて解釈されます。",
      "本規約に関する紛争については、日本国内の裁判所を専属的合意管轄裁判所とします。",
    ],
  },
];

// フッターリンクの型定義
interface FooterLink {
  label: string;
  href: string;
}

// フッターリンク（他の法的ページへ）
const footerLinks: FooterLink[] = [
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "特定商取引法に基づく表記", href: "/tokushoho" },
  {
    label: "お問い合わせ",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSe72uFPyf-pI1RcH04IuecN0mkwnU9a9L2yKyRcLhaHvq2TZg/viewform?usp=publish-editor",
  },
];

export default function TermsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdfa 0%, #e0f7f5 40%, #f0fafa 100%)",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        padding: "40px 16px 80px",
      }}
    >
      {/* 背景の装飾パーティクル */}
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
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(45,212,191,${0.06 + i * 0.01}) 0%, transparent 70%)`,
              top: `${10 + i * 15}%`,
              left: `${5 + i * 16}%`,
              animation: `float${i % 3} ${6 + i * 2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ホームに戻るリンク */}
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
            marginBottom: 24,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          ← ホームに戻る
        </Link>

        {/* グラスモーフィズムカード */}
        <div
          className="terms-card"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 8px 32px rgba(45,212,191,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            padding: "48px 40px",
          }}
        >
          {/* ページタイトル */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                letterSpacing: 3,
                color: "#2dd4bf",
                textTransform: "uppercase",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              Terms of Service
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                margin: 0,
                background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              利用規約
            </h1>
            <div
              style={{
                width: 40,
                height: 3,
                background: "linear-gradient(90deg, #2dd4bf, #99f6e4)",
                borderRadius: 2,
                margin: "16px auto 0",
              }}
            />
          </div>

          {/* 各セクション */}
          {sections.map((section, index) => (
            <div key={index} style={{ marginBottom: index < sections.length - 1 ? 36 : 0 }}>
              {/* 番号付き見出し */}
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 14px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #134e4a, #0d9488)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {section.title}
                </span>
              </h2>

              {/* 本文 */}
              <div style={{ paddingLeft: 40 }}>
                {section.content.map((text, tIdx) => (
                  <p
                    key={tIdx}
                    style={{
                      fontSize: 14,
                      lineHeight: 1.9,
                      color: "#374151",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>

              {/* セクション区切り線 */}
              {index < sections.length - 1 && (
                <div
                  style={{
                    height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.2), transparent)",
                    marginTop: 24,
                  }}
                />
              )}
            </div>
          ))}

          {/* 制定日 */}
          <div
            style={{
              textAlign: "right",
              marginTop: 48,
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            制定日: 2025年1月1日
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
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                fontSize: 13,
                color: "#6b7280",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2dd4bf")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* コピーライト */}
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#9ca3af",
            marginTop: 16,
          }}
        >
          &copy; 2025 診断研究所
        </p>
      </div>

      {/* 背景アニメーション用CSS */}
      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(0.95); }
        }

        @media (max-width: 600px) {
          .terms-card {
            padding: 28px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
