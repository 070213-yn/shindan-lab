// 利用規約ページのSEOメタデータレイアウト
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | 診断研究所",
  description:
    "診断研究所の利用規約。サービスのご利用条件、免責事項、禁止事項などをご確認ください。",
  openGraph: {
    title: "利用規約 | 診断研究所",
    description:
      "診断研究所の利用規約。サービスのご利用条件をご確認ください。",
    type: "website",
    url: "https://www.shindan-lab.net/terms",
    siteName: "診断研究所",
  },
  twitter: {
    card: "summary",
    title: "利用規約 | 診断研究所",
    description:
      "診断研究所の利用規約。サービスのご利用条件をご確認ください。",
  },
  alternates: {
    canonical: "https://www.shindan-lab.net/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
