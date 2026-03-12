// 恋愛性格診断ページのSEOメタデータレイアウト
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "恋愛性格診断 | あなたの恋愛タイプを完全解析 | 診断研究所",
  description:
    "43問の本格恋愛診断で、あなたの恋愛傾向・理想のパートナー・恋愛パターンを8次元で分析。24タイプの恋愛性格から自分だけの恋愛タイプを発見。完全無料・登録不要。",
  keywords: [
    "恋愛診断",
    "恋愛性格診断",
    "恋愛タイプ",
    "恋愛相性",
    "恋愛テスト",
    "恋愛傾向",
    "恋愛 無料診断",
    "カップル診断",
    "恋愛心理テスト",
    "モテ診断",
    "恋愛偏差値",
  ],
  openGraph: {
    title: "恋愛性格診断 | あなたの恋愛タイプを完全解析",
    description:
      "43問で恋愛傾向を8次元分析。24タイプからあなたの恋愛性格を発見。完全無料。",
    type: "website",
    url: "https://www.shindan-lab.net/love",
    siteName: "診断研究所",
  },
  twitter: {
    card: "summary_large_image",
    title: "恋愛性格診断 | 診断研究所",
    description:
      "43問で恋愛傾向を8次元分析。24タイプからあなたの恋愛性格を発見。",
  },
  alternates: {
    canonical: "https://www.shindan-lab.net/love",
  },
};

export default function LoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
