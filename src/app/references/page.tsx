"use client";

/**
 * 参考文献一覧ページ
 * 診断研究所で使用している学術研究・文献のリスト
 */

import Link from "next/link";

// 文献の型定義
interface Reference {
  authors: string;
  year: number;
  title: string;
  journal?: string;
  url?: string;
  usedIn: string[];
}

// 古典理論
const classicReferences: Reference[] = [
  {
    authors: "Jung, C.G.",
    year: 1921,
    title: "Psychological Types",
    journal: "Rascher Verlag",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Eysenck, H.J.",
    year: 1967,
    title: "The Biological Basis of Personality",
    journal: "Charles C Thomas Publisher",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Myers, I.B. & Myers, P.B.",
    year: 1995,
    title: "Gifts Differing: Understanding Personality Type",
    journal: "Davies-Black Publishing",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Costa, P.T. & McCrae, R.R.",
    year: 1992,
    title: "NEO-PI-R Professional Manual",
    journal: "Psychological Assessment Resources",
    usedIn: ["MBTI-512", "裏の顔診断", "ストレス診断"],
  },
  {
    authors: "John, O.P. & Srivastava, S.",
    year: 1999,
    title: "The Big Five Trait Taxonomy: History, Measurement, and Theoretical Perspectives",
    journal: "Handbook of Personality: Theory and Research",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Nardi, D.",
    year: 2011,
    title: "Neuroscience of Personality: Brain Savvy Insights for All Types of People",
    journal: "Radiance House",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Cain, S.",
    year: 2012,
    title: "Quiet: The Power of Introverts in a World That Can't Stop Talking",
    journal: "Crown Publishing Group",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "DeYoung, C.G.",
    year: 2015,
    title: "Cybernetic Big Five Theory",
    journal: "Journal of Research in Personality, 56, 33-58",
    usedIn: ["MBTI-512"],
  },
];

// デジタル世代研究（2020-2025）
const modernReferences: Reference[] = [
  {
    authors: "Mahalingham, T. et al.",
    year: 2020,
    title: "Alone and Online: Understanding the Relationships Between Social Media Use, Solitude, and Psychological Adjustment",
    journal: "Psychology of Popular Media (APA)",
    url: "https://www.apa.org/pubs/journals/features/ppm-ppm0000287.pdf",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Luo, M. & Hancock, J.T.",
    year: 2020,
    title: "Self-disclosure and Social Media: Motivations, Mechanisms and Psychological Well-being",
    journal: "Current Opinion in Psychology, 31, 110-115",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Montag, C. et al.",
    year: 2021,
    title: "On the Psychology of TikTok Use: A First Glimpse From Empirical Findings",
    journal: "Frontiers in Public Health, 9, 641673",
    url: "https://www.frontiersin.org/articles/10.3389/fpubh.2021.641673/full",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Liu, X. et al.",
    year: 2021,
    title: "A Literature Review of Online Identity Reconstruction",
    journal: "Frontiers in Psychology, 12, 696552",
    url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2021.696552/full",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Valkenburg, P.M. et al.",
    year: 2021,
    title: "Social Media Use and Adolescents' Self-Esteem: Heading for a Person-Specific Media Effects Paradigm",
    journal: "Journal of Communication, 71(1), 56-78 (Oxford)",
    url: "https://academic.oup.com/joc/article/71/1/56/6124731",
    usedIn: ["MBTI-512", "ストレス診断"],
  },
  {
    authors: "Li, Y. & Chen, Y.",
    year: 2022,
    title: "Influence of Personality Traits on Online Self-Disclosure",
    journal: "Frontiers in Psychology, 13, 958991",
    url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2022.958991/full",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Mehta, Y. et al.",
    year: 2023,
    title: "Personality Types and Traits: Examining the Relationship between Different Personality Models",
    journal: "Applied Sciences (MDPI), 13(7), 4506",
    url: "https://www.mdpi.com/2076-3417/13/7/4506",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Rozgonjuk, D. et al.",
    year: 2023,
    title: "On the Association Between Personality, FoMO and Problematic Social Media Use",
    journal: "Acta Psychologica (ScienceDirect)",
    url: "https://www.sciencedirect.com/science/article/pii/S0001691823002020",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Nesi, J. et al.",
    year: 2023,
    title: "Associations Between Youth's Daily Social Media Use and Well-being Are Mediated by Upward Comparisons",
    journal: "Communications Psychology (Nature), 1, 13",
    url: "https://www.nature.com/articles/s44271-023-00013-0",
    usedIn: ["MBTI-512", "ストレス診断"],
  },
  {
    authors: "Nygren, T. et al.",
    year: 2023,
    title: "The Intersection of Personality Traits and Social Media Usage: Large-Scale Representative Samples in Sweden",
    journal: "Psych (MDPI), 5(1), 8",
    url: "https://www.mdpi.com/2624-8611/5/1/8",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Tandon, A. et al.",
    year: 2023,
    title: "Social Media-Induced FoMO and Social Media Fatigue",
    journal: "Journal of Business Research, 156",
    url: "https://www.sciencedirect.com/science/article/pii/S0148296323000516",
    usedIn: ["MBTI-512", "ストレス診断"],
  },
  {
    authors: "U.S. Surgeon General",
    year: 2023,
    title: "Social Media and Youth Mental Health: Advisory",
    journal: "U.S. Department of Health and Human Services",
    url: "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf",
    usedIn: ["ストレス診断"],
  },
  {
    authors: "Carvalho, L.F. & Pianowski, G.",
    year: 2024,
    title: "Meta-analysis of Associations Between Five-Factor Personality Traits and Problematic Social Media Use",
    journal: "Current Psychology (Springer)",
    url: "https://link.springer.com/article/10.1007/s12144-024-06052-y",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Hou, J. et al.",
    year: 2024,
    title: "How Big Five Personality Traits Influence Information Sharing on Social Media: A Meta Analysis",
    journal: "PLOS ONE",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0303770",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Kumar, P. et al.",
    year: 2025,
    title: "Predicting MBTI Personality of YouTube Users",
    journal: "Scientific Reports (Nature), 15",
    url: "https://www.nature.com/articles/s41598-025-85183-z",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Roberts, J. et al.",
    year: 2025,
    title: "FoMO and Its Impact on University Students",
    journal: "Frontiers in Psychology, 16, 1582572",
    url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2025.1582572/full",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Wacks, Y. & Weinstein, A.M.",
    year: 2025,
    title: "Individual Differences in the Prediction of Mental Health by Smartphone and Instagram Use",
    journal: "Behaviour & Information Technology",
    url: "https://www.tandfonline.com/doi/full/10.1080/0144929X.2025.2506661",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Teng, S. et al.",
    year: 2025,
    title: "The Social Benefits of Self-Disclosure and Self-Presentation Through Social Media: A Systematic Review",
    journal: "Behaviour & Information Technology",
    url: "https://www.tandfonline.com/doi/full/10.1080/0144929X.2025.2590096",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Hedlund, E. et al.",
    year: 2025,
    title: "Causal Effects of Social Media on Self-Esteem, Mindfulness, Sleep and Emotional Well-Being",
    journal: "Frontiers in Public Health, 13, 1548504",
    url: "https://www.frontiersin.org/articles/10.3389/fpubh.2025.1548504/full",
    usedIn: ["MBTI-512", "ストレス診断"],
  },
  {
    authors: "Luo, Y. et al.",
    year: 2025,
    title: "A Comparative Study of State Self-Esteem Responses to Social Media Feedback Loops in Adolescents and Adults",
    journal: "Frontiers in Psychology, 16, 1625771",
    url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2025.1625771/full",
    usedIn: ["MBTI-512"],
  },
  {
    authors: "Nesi, J. et al.",
    year: 2025,
    title: "Social Comparison in the 1990s Versus the 2020s",
    journal: "Comprehensive Results in Social Psychology",
    url: "https://www.tandfonline.com/doi/full/10.1080/23743603.2025.2507435",
    usedIn: ["MBTI-512", "ストレス診断"],
  },
];

// フッターリンク
const footerLinks = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/tokushoho", label: "特定商取引法" },
  { href: "/contact", label: "お問い合わせ" },
];

// 文献カードコンポーネント
function RefCard({ ref: r, index }: { ref: Reference; index: number }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        background: index % 2 === 0 ? "rgba(45, 212, 191, 0.03)" : "transparent",
        borderRadius: 12,
        borderLeft: "3px solid rgba(45, 212, 191, 0.3)",
        marginBottom: 8,
      }}
    >
      <p style={{
        fontSize: 14, lineHeight: 1.8, color: "#1e293b", margin: "0 0 4px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
      }}>
        <strong>{r.authors}</strong> ({r.year}).{" "}
        {r.url ? (
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0d9488", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            {r.title}
          </a>
        ) : (
          <em>{r.title}</em>
        )}
        {r.journal && (
          <span style={{ color: "#64748b" }}>. {r.journal}</span>
        )}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
        {r.usedIn.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              padding: "2px 10px",
              borderRadius: 20,
              background: "rgba(45, 212, 191, 0.1)",
              color: "#0d9488",
              fontWeight: 600,
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ReferencesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F0FAFA 0%, #E0F7F5 50%, #F0FAFA 100%)",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        padding: "40px 16px 60px",
      }}
    >
      {/* ホームへ戻るリンク */}
      <div style={{ maxWidth: 720, margin: "0 auto 24px", textAlign: "left" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#2dd4bf", textDecoration: "none", fontSize: 14,
            fontWeight: 600, fontFamily: "'Zen Maru Gothic', sans-serif",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          診断研究所トップへ戻る
        </Link>
      </div>

      {/* メインカード */}
      <div
        style={{
          maxWidth: 720, margin: "0 auto",
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 8px 32px rgba(45, 212, 191, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
          padding: "48px 40px",
        }}
      >
        {/* タイトル */}
        <h1
          style={{
            fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 8px",
            background: "linear-gradient(135deg, #2dd4bf, #14b8a6, #0d9488)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}
        >
          参考文献一覧
        </h1>
        <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", margin: "0 0 16px" }}>
          References
        </p>

        {/* 説明文 */}
        <p style={{ fontSize: 14, lineHeight: 1.9, color: "#475569", marginBottom: 12 }}>
          診断研究所の各診断は、査読付き学術論文や心理学の古典的著作に基づいて設計されています。
          以下に、診断の質問設計・スコアリング・タイプ分類に使用した主な参考文献を掲載します。
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.9, color: "#475569", marginBottom: 36 }}>
          特にMBTI-512診断では、従来の心理学理論に加え、
          SNS行動・FOMO・デジタルウェルビーイングなど
          <strong style={{ color: "#0d9488" }}>2020年代の最新研究</strong>
          を積極的に取り入れ、スマホ世代のリアルな性格を測定できる質問を設計しています。
        </p>

        {/* 統計バッジ */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 16, marginBottom: 36, flexWrap: "wrap",
        }}>
          {[
            { num: classicReferences.length + modernReferences.length, label: "参考文献数" },
            { num: modernReferences.length, label: "2020年代研究" },
            { num: "9", label: "測定次元" },
          ].map((stat) => (
            <div key={stat.label} style={{
              textAlign: "center", padding: "12px 20px",
              background: "rgba(45, 212, 191, 0.06)", borderRadius: 12,
              minWidth: 100,
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#0d9488" }}>{stat.num}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 古典理論セクション */}
        <h2 style={{
          fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 6px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #64748b, #475569)",
            color: "#fff", fontSize: 14, fontWeight: 800,
          }}>I</span>
          古典的理論基盤
        </h2>
        <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20, paddingLeft: 42 }}>
          1921 - 2015 | 心理学・性格理論の基礎文献
        </p>
        {classicReferences.map((r, i) => (
          <RefCard key={`c-${i}`} ref={r} index={i} />
        ))}

        {/* 区切り */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.3), transparent)",
          margin: "32px 0",
        }} />

        {/* デジタル世代研究セクション */}
        <h2 style={{
          fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 6px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
            color: "#fff", fontSize: 14, fontWeight: 800,
          }}>II</span>
          デジタル世代研究
        </h2>
        <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20, paddingLeft: 42 }}>
          2020 - 2025 | SNS・スマホ・FOMO・デジタルウェルビーイング
        </p>
        {modernReferences.map((r, i) => (
          <RefCard key={`m-${i}`} ref={r} index={i} />
        ))}

        {/* 区切り線 */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.3), transparent)",
          margin: "36px 0 28px",
        }} />

        {/* 注釈 */}
        <div style={{ fontSize: 12, lineHeight: 1.8, color: "#94a3b8" }}>
          <p style={{ margin: "0 0 8px" }}>
            ※ 各文献のリンクは論文の公開ページへの直接リンクです。
            アクセス制限がある場合は、論文タイトルで検索してください。
          </p>
          <p style={{ margin: 0 }}>
            ※ 当サイトの診断はエンターテインメントを目的としています。
            学術的な心理検査や医学的診断の代替にはなりません。
          </p>
        </div>
      </div>

      {/* フッターリンク */}
      <div style={{
        maxWidth: 720, margin: "32px auto 0",
        display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px 24px",
      }}>
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontSize: 13, color: "#64748b", textDecoration: "none",
              fontFamily: "'Zen Maru Gothic', sans-serif", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2dd4bf")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 12, color: "#cbd5e1", marginTop: 20 }}>
        &copy; 2026 診断研究所. All rights reserved.
      </p>
    </div>
  );
}
