// ペルソナカードページのSEOメタデータレイアウト
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "あなたの診断ペルソナカード | 診断研究所",
  description:
    "診断結果からあなただけのペルソナカードを生成。性格・恋愛・メンタルの診断結果をビジュアルカードで表示。シェアして友達と比較しよう。",
  keywords: [
    "ペルソナカード",
    "診断結果",
    "性格プロフィール",
    "自己分析カード",
    "診断プロフィール",
    "性格カード",
    "診断まとめ",
  ],
  openGraph: {
    title: "あなたの診断ペルソナカード | 診断研究所",
    description:
      "診断結果からあなただけのペルソナカードを生成。友達とシェアして比較しよう。",
    type: "website",
    url: "https://www.shindan-lab.net/persona",
    siteName: "診断研究所",
  },
  twitter: {
    card: "summary_large_image",
    title: "あなたの診断ペルソナカード | 診断研究所",
    description:
      "診断結果からあなただけのペルソナカードを生成。友達とシェアして比較しよう。",
  },
  alternates: {
    canonical: "https://www.shindan-lab.net/persona",
  },
};

export default function PersonaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
