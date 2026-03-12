/**
 * サイトマップ自動生成
 * Next.js App Routerの規約に従い、/sitemap.xml を動的に生成する
 * 参考: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** サイトマップを生成する関数 */
export default function sitemap(): MetadataRoute.Sitemap {
  /** 現在の日時（lastModifiedに使用） */
  const now = new Date();

  /**
   * 静的ページの定義
   * changeFrequency: クローラーにページの更新頻度を伝える
   * priority: 0.0〜1.0でページの重要度を指定（1.0が最重要）
   */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0, // トップページは最優先
    },
    {
      url: `${SITE_URL}/love`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/love/quiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/quiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/persona`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  /**
   * 診断ページの定義
   * 各診断はサイトの主要コンテンツなので優先度を高く設定
   */
  const diagnosisIds = [
    "shadow",
    "pastlife",
    "stress",
    "mbti128",
    "godtype",
  ];

  const diagnosisPages: MetadataRoute.Sitemap = diagnosisIds.map((id) => ({
    url: `${SITE_URL}/shindan/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9, // 診断ページは高優先度
  }));

  /**
   * 法的ページ・お問い合わせ（更新頻度が低いため優先度を下げる）
   */
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/tokushoho`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [...staticPages, ...diagnosisPages, ...legalPages];
}
