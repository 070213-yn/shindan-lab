import type { Metadata } from "next";
import { DIAGNOSIS_SEO } from "@/lib/seo";

/** ベースURL */
const BASE_URL = "https://www.shindan-lab.net";

/**
 * 診断ページごとの動的メタデータを生成する
 * Next.js 16 では params は Promise なので await が必要
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // SEOデータから該当する診断情報を取得（見つからなければ汎用フォールバック）
  const seo = DIAGNOSIS_SEO[id] ?? {
    title: "診断研究所 | 本格心理診断",
    description:
      "心理学ベースの本格診断で自分を完全解析。完全無料・登録不要。",
    keywords: ["診断", "心理テスト", "性格診断", "無料診断"],
  };

  const pageUrl = `${BASE_URL}/shindan/${id}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,

    // OGP（SNSシェア時の表示設定）
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: pageUrl,
      siteName: "診断研究所",
      locale: "ja_JP",
      type: "website",
    },

    // Twitterカード設定
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },

    // 正規URL（重複コンテンツ防止）
    alternates: {
      canonical: pageUrl,
    },
  };
}

/**
 * 診断ページ共通レイアウト
 * 現時点では子要素をそのまま表示するだけのパススルーレイアウト
 */
export default function ShindanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
