/**
 * robots.txt 自動生成
 * Next.js App Routerの規約に従い、/robots.txt を動的に生成する
 * クローラー（GoogleBotなど）にサイトの巡回ルールを伝える
 * 参考: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", // すべてのクローラーに対するルール
        allow: "/", // サイト全体のクロールを許可
        disallow: [
          "/api/", // APIエンドポイントはクロール不要
          "/result/", // 個別結果ページはインデックス不要（動的生成のため）
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`, // サイトマップの場所を明示
  };
}
