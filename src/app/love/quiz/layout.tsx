// 恋愛性格診断クイズページのSEOメタデータレイアウト
// クイズ進行中のページはインデックスさせない（noindex）
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "恋愛性格診断テスト | 診断研究所",
  description:
    "恋愛性格診断テストを実施中。43問の質問に答えて、あなたの恋愛タイプを8次元で分析します。",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "恋愛性格診断テスト | 診断研究所",
    description:
      "43問の質問に答えて、あなたの恋愛タイプを8次元で分析。完全無料。",
    type: "website",
    url: "https://www.shindan-lab.net/love/quiz",
    siteName: "診断研究所",
  },
  twitter: {
    card: "summary_large_image",
    title: "恋愛性格診断テスト | 診断研究所",
    description:
      "43問の質問に答えて、あなたの恋愛タイプを8次元で分析。完全無料。",
  },
  alternates: {
    canonical: "https://www.shindan-lab.net/love/quiz",
  },
};

export default function LoveQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
