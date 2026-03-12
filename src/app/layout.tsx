import type { Metadata, Viewport } from "next";
import "./globals.css";

/** サイト共通の定数 */
const BASE_URL = "https://www.shindan-lab.net";
const SITE_NAME = "診断研究所";
const SITE_DESCRIPTION =
  "心理学ベースの本格診断6種類。恋愛・性格・メンタル・前世まで、自分の知らない自分に出会える総合診断サイト。完全無料・登録不要。";

/**
 * ビューポート設定（Next.js 16 では metadata とは別にエクスポートする）
 * themeColor でブラウザのアドレスバー色を制御
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F0FAFA",
};

/**
 * ルートページのメタデータ
 * SEOに必要な情報を包括的に設定
 */
export const metadata: Metadata = {
  // 基本情報
  title: {
    default: `${SITE_NAME} | 6つの本格診断で自分を完全解析`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "診断",
    "性格診断",
    "心理テスト",
    "MBTI",
    "恋愛診断",
    "前世診断",
    "ストレス診断",
    "無料診断",
    "自己分析",
    "性格テスト",
    "心理診断",
    "MBTI診断",
    "16タイプ",
    "診断サイト",
  ],
  authors: [{ name: SITE_NAME, url: BASE_URL }],

  // 検索エンジン向けの指示
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // アイコン・マニフェスト
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",

  // OGP（SNSでシェアされたときの表示）
  openGraph: {
    title: `${SITE_NAME} | 6つの本格診断で自分を完全解析`,
    description:
      "恋愛・性格・メンタル・前世まで -- 6種の本格心理診断で自分を完全解析。完全無料・登録不要。",
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - 6つの本格診断で自分を完全解析`,
      },
    ],
  },

  // Twitterカード設定
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 6つの本格診断で自分を完全解析`,
    description:
      "恋愛・性格・メンタル・前世まで -- 6種の本格心理診断で自分を完全解析。完全無料・登録不要。",
    images: [`${BASE_URL}/og-image.png`],
  },

  // 正規URL（重複コンテンツ防止のため）
  alternates: {
    canonical: BASE_URL,
  },
};

/**
 * JSON-LD構造化データ
 * Googleの検索結果でリッチスニペット（強調表示）を出すための設定
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/icon.png`,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-fresh-pattern" style={{ background: "#F0FAFA" }}>
        {children}
        {/* 構造化データ: 検索エンジンにサイト情報を正確に伝えるためのJSON-LD */}
        {jsonLd.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </body>
    </html>
  );
}
