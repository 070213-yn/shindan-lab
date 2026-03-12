// お問い合わせページのSEOメタデータレイアウト
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | 診断研究所",
  description:
    "診断研究所へのお問い合わせ・ご意見・ご感想はこちらから。診断内容へのフィードバックや不具合報告もお気軽にどうぞ。",
  keywords: [
    "お問い合わせ",
    "問い合わせ",
    "フィードバック",
    "ご意見",
    "不具合報告",
    "診断研究所 連絡先",
  ],
  openGraph: {
    title: "お問い合わせ | 診断研究所",
    description:
      "診断研究所へのお問い合わせ・ご意見・ご感想はこちらから。お気軽にどうぞ。",
    type: "website",
    url: "https://www.shindan-lab.net/contact",
    siteName: "診断研究所",
  },
  twitter: {
    card: "summary",
    title: "お問い合わせ | 診断研究所",
    description:
      "診断研究所へのお問い合わせ・ご意見・ご感想はこちらから。",
  },
  alternates: {
    canonical: "https://www.shindan-lab.net/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
