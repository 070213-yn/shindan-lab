// 特定商取引法に基づく表記ページのSEOメタデータレイアウト
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | 診断研究所",
  description:
    "診断研究所の特定商取引法に基づく表記。事業者情報、販売価格、返品・キャンセルポリシーなどを掲載しています。",
  openGraph: {
    title: "特定商取引法に基づく表記 | 診断研究所",
    description:
      "診断研究所の特定商取引法に基づく表記。事業者情報等を掲載しています。",
    type: "website",
    url: "https://www.shindan-lab.net/tokushoho",
    siteName: "診断研究所",
  },
  twitter: {
    card: "summary",
    title: "特定商取引法に基づく表記 | 診断研究所",
    description:
      "診断研究所の特定商取引法に基づく表記。事業者情報等を掲載しています。",
  },
  alternates: {
    canonical: "https://www.shindan-lab.net/tokushoho",
  },
};

export default function TokushohoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
