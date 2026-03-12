import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "参考文献一覧 | 診断研究所",
  description:
    "診断研究所の各診断で使用している学術研究・参考文献の一覧です。2020年代のSNS・デジタルウェルビーイング研究を含む29本の文献を掲載。",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.shindan-lab.net/references",
  },
};

export default function ReferencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
