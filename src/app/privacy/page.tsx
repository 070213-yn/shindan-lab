"use client";

/**
 * プライバシーポリシーページ
 * 診断研究所 - グラスモーフィズムデザイン
 */

import Link from "next/link";

// セクションデータの型定義
interface PolicySection {
  number: number;
  title: string;
  content: string[];
}

// プライバシーポリシーの各セクション
const sections: PolicySection[] = [
  {
    number: 1,
    title: "個人情報の取り扱いについて",
    content: [
      "当サイト「診断研究所」では、診断の実施にあたり、ユーザーの皆様が入力された情報（回答内容・診断結果等）はすべてお使いのブラウザ内（ローカルストレージ等）にのみ保存されます。",
      "これらの情報が当サイトのサーバーに送信・保存されることはありません。",
      "また、当サイトではユーザー登録や個人情報の入力を求めることはございません。",
    ],
  },
  {
    number: 2,
    title: "Cookieについて",
    content: [
      "当サイトでは、サービスの利便性向上やアクセス状況の分析のためにCookie（クッキー）を使用する場合があります。",
      "Cookieとは、ウェブサイトがお使いのブラウザに送信する小さなデータファイルのことです。ブラウザの設定により、Cookieの受け入れを拒否することも可能ですが、その場合一部の機能がご利用いただけない場合があります。",
    ],
  },
  {
    number: 3,
    title: "アクセス解析ツールについて",
    content: [
      "当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。Google Analyticsはトラフィックデータの収集のためにCookieを使用しますが、このデータは匿名で収集されており、個人を特定するものではありません。",
      "この機能はCookieを無効にすることで収集を拒否することができます。詳しくはGoogle Analyticsの利用規約およびGoogleのプライバシーポリシーをご確認ください。",
    ],
  },
  {
    number: 4,
    title: "広告について",
    content: [
      "当サイトでは、将来的に第三者配信の広告サービス（Google AdSense等）を利用する可能性があります。",
      "広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。これによりユーザーが当サイトや他のサイトにアクセスした際の情報に基づき、適切な広告が表示されます。",
      "パーソナライズ広告はGoogleの広告設定ページから無効にすることができます。",
    ],
  },
  {
    number: 5,
    title: "免責事項",
    content: [
      "当サイトで提供する診断は、心理学的知見やデータに基づいて作成しておりますが、あくまでエンターテインメントを目的としたものです。",
      "診断結果は参考情報としてお楽しみいただくものであり、医学的・心理学的な診断や助言を行うものではありません。",
      "当サイトの利用により生じたいかなる損害についても、運営者は一切の責任を負いかねます。",
    ],
  },
  {
    number: 6,
    title: "プライバシーポリシーの変更",
    content: [
      "当サイトは、必要に応じて本プライバシーポリシーの内容を予告なく変更する場合があります。",
      "変更後のプライバシーポリシーは、当ページに掲載した時点より効力を生じるものとします。",
    ],
  },
  {
    number: 7,
    title: "お問い合わせ先",
    content: [
      "本ポリシーに関するお問い合わせは、以下のフォームよりご連絡ください。",
    ],
  },
];

// フッターリンク一覧
const footerLinks = [
  { href: "/terms", label: "利用規約" },
  { href: "/legal", label: "特定商取引法に基づく表記" },
  {
    href: "https://docs.google.com/forms/d/e/1FAIpQLSe72uFPyf-pI1RcH04IuecN0mkwnU9a9L2yKyRcLhaHvq2TZg/viewform?usp=publish-editor",
    label: "お問い合わせ",
    external: true,
  },
];

export default function PrivacyPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F0FAFA 0%, #E0F7F5 50%, #F0FAFA 100%)",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        padding: "40px 16px 60px",
      }}
    >
      {/* ホームへ戻るリンク */}
      <div style={{ maxWidth: 720, margin: "0 auto 24px", textAlign: "left" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "#2dd4bf",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'Zen Maru Gothic', sans-serif",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          診断研究所トップへ戻る
        </Link>
      </div>

      {/* メインカード */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 8px 32px rgba(45, 212, 191, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
          padding: "48px 40px",
        }}
      >
        {/* タイトル */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            textAlign: "center",
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #2dd4bf, #14b8a6, #0d9488)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          プライバシーポリシー
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#94a3b8",
            margin: "0 0 40px",
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          Privacy Policy
        </p>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.9,
            color: "#475569",
            marginBottom: 36,
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          「診断研究所」（以下「当サイト」）は、ユーザーの皆様のプライバシーを尊重し、個人情報の保護に努めております。
          本プライバシーポリシーでは、当サイトにおける情報の取り扱いについてご説明いたします。
        </p>

        {/* 各セクション */}
        {sections.map((section) => (
          <div key={section.number} style={{ marginBottom: 32 }}>
            {/* セクション見出し */}
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#1e293b",
                margin: "0 0 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "'Zen Maru Gothic', sans-serif",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {section.number}
              </span>
              {section.title}
            </h2>

            {/* セクション本文 */}
            {section.content.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#475569",
                  margin: "0 0 10px",
                  paddingLeft: 38,
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                {paragraph}
              </p>
            ))}

            {/* お問い合わせセクションにはリンクボタンを追加 */}
            {section.number === 7 && (
              <div style={{ paddingLeft: 38, marginTop: 14 }}>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe72uFPyf-pI1RcH04IuecN0mkwnU9a9L2yKyRcLhaHvq2TZg/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 24px",
                    background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
                    color: "#fff",
                    borderRadius: 12,
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 2px 8px rgba(45, 212, 191, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(45, 212, 191, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(45, 212, 191, 0.3)";
                  }}
                >
                  お問い合わせフォームを開く
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}

        {/* 区切り線 */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.3), transparent)",
            margin: "36px 0 28px",
          }}
        />

        {/* 運営者・日付情報 */}
        <div
          style={{
            fontSize: 13,
            color: "#94a3b8",
            lineHeight: 1.8,
            textAlign: "right",
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          <p style={{ margin: "0 0 4px" }}>運営者: やな（個人運営）</p>
          <p style={{ margin: "0 0 4px" }}>制定日: 2025年1月1日</p>
          <p style={{ margin: 0 }}>最終更新日: 2025年1月1日</p>
        </div>
      </div>

      {/* フッターリンク */}
      <div
        style={{
          maxWidth: 720,
          margin: "32px auto 0",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px 24px",
        }}
      >
        {footerLinks.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: "#64748b",
                textDecoration: "none",
                fontFamily: "'Zen Maru Gothic', sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2dd4bf")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: 13,
                color: "#64748b",
                textDecoration: "none",
                fontFamily: "'Zen Maru Gothic', sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2dd4bf")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
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
          marginTop: 20,
          fontFamily: "'Zen Maru Gothic', sans-serif",
        }}
      >
        &copy; 2025 診断研究所. All rights reserved.
      </p>
    </div>
  );
}
