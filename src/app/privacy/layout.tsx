// プライバシーポリシーページのSEOメタデータレイアウト
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 診断研究所",
  description:
    "診断研究所のプライバシーポリシー。個人情報の取り扱い、Cookie使用、データ保護についてご説明します。",
  openGraph: {
    title: "プライバシーポリシー | 診断研究所",
    description:
      "診断研究所のプライバシーポリシー。個人情報の取り扱いについてご説明します。",
    type: "website",
    url: "https://www.shindan-lab.net/privacy",
    siteName: "診断研究所",
  },
  twitter: {
    card: "summary",
    title: "プライバシーポリシー | 診断研究所",
    description:
      "診断研究所のプライバシーポリシー。個人情報の取り扱いについてご説明します。",
  },
  alternates: {
    canonical: "https://www.shindan-lab.net/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
