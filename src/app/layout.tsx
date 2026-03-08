import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ときめきラボ | 本格診断シリーズ",
  description:
    "心理学研究をベースにした本格診断シリーズ。恋愛、才能、メンタル、前世まで -- 11種類の診断であなたの知らない自分に出会おう。",
  openGraph: {
    title: "ときめきラボ | 本格診断シリーズ",
    description:
      "恋愛、才能、メンタル、前世まで -- 11種類の本格診断。あなたの知らない自分に出会おう。",
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
