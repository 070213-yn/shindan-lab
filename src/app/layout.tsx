import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "診断研究所 | 6つの本格診断で自分を完全解析",
  description:
    "心理学ベースの本格診断6種類。恋愛・性格・メンタル・前世まで、自分の知らない自分に出会える総合診断サイト。完全無料・登録不要。",
  openGraph: {
    title: "診断研究所 | 6つの本格診断で自分を完全解析",
    description:
      "恋愛・性格・メンタル・前世まで -- 6種の本格心理診断で自分を完全解析。完全無料・登録不要。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-fresh-pattern" style={{ background: "#F0FAFA" }}>{children}</body>
    </html>
  );
}
