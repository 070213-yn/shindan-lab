// 一般診断クイズページのSEOメタデータレイアウト
// クイズ進行中のページはインデックスさせない（noindex）
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "診断テスト | 診断研究所",
  description:
    "診断テストを実施中。質問に答えて、あなたの性格タイプを多角的に分析します。完全無料・登録不要。",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "診断テスト | 診断研究所",
    description:
      "質問に答えて、あなたの性格タイプを多角的に分析。完全無料・登録不要。",
    type: "website",
    url: "https://www.shindan-lab.net/quiz",
    siteName: "診断研究所",
  },
  twitter: {
    card: "summary_large_image",
    title: "診断テスト | 診断研究所",
    description:
      "質問に答えて、あなたの性格タイプを多角的に分析。完全無料・登録不要。",
  },
  alternates: {
    canonical: "https://www.shindan-lab.net/quiz",
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
