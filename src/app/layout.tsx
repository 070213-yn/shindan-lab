import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ときめきラボ | 22の本格診断で自分を完全解析",
  description:
    "心理学ベースの本格診断22種類。恋愛・才能・適職・メンタル・脳タイプ・前世まで、自分の知らない自分に出会える総合診断サイト。完全無料・登録不要。",
  openGraph: {
    title: "ときめきラボ | 22の本格診断で自分を完全解析",
    description:
      "恋愛・才能・適職・脳タイプ・前世まで -- 22種の本格心理診断で自分を完全解析。完全無料・登録不要。",
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
      <body>{children}</body>
    </html>
  );
}
