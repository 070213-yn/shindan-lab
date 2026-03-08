import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ときめきラボ | 本格恋愛性格診断",
  description: "心理学研究をベースにした本格恋愛性格診断。43問・8次元スコアリングで、あなたの恋愛タイプを科学的に解明。",
  openGraph: {
    title: "ときめきラボ | 本格恋愛性格診断",
    description: "43問・8次元・12タイプの本格恋愛性格診断。あなたの恋愛タイプを科学的に解明。",
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
