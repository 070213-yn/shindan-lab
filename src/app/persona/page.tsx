"use client";

/**
 * ペルソナカードページ（/persona）
 * 青春 x 爽やか x 透明感スタイル
 *
 * 全診断結果を統合した「自分だけの一枚」を表示する。
 * 診断結果はlocalStorageから読み込む。
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import PersonaCard from "@/components/PersonaCard";
import TotalAnalysis from "@/components/TotalAnalysis";
import PersonalFriends from "@/components/PersonalFriends";
import { usePersonaStore } from "@/store/personaStore";

export default function PersonaPage() {
  const { results } = usePersonaStore();
  const completedCount = Object.keys(results).length;

  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-fresh-pattern" style={{ background: "#F0FAFA", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* メインコンテンツ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ナビバー */}
        <nav
          style={{
            position: "sticky", top: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 24px",
            background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(45,212,191,0.15)",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 30, height: 30, borderRadius: "50%",
                background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)",
                color: "#2dd4bf", fontSize: 14,
                transition: "all 0.2s ease",
              }}
            >
              &#8592;
            </span>
            <span className="font-stick" style={{ color: "#2dd4bf", fontSize: "1.2rem" }}>
              ときめきラボ
            </span>
          </Link>
          <span style={{ fontSize: 11, color: "#4a6572", letterSpacing: "0.08em" }}>
            PERSONA CARD
          </span>
        </nav>

        {/* ヒーロー */}
        <section
          style={{
            textAlign: "center",
            padding: "40px 20px 24px",
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔮</div>
          <h1
            className="font-stick"
            style={{ fontSize: "clamp(24px, 7vw, 36px)", color: "#2dd4bf", marginBottom: 8 }}
          >
            ペルソナカード
          </h1>
          <p
            style={{
              fontSize: 14, color: "#2d4a57", lineHeight: 1.7,
              maxWidth: 400, margin: "0 auto 8px",
            }}
          >
            全ての診断結果を統合した、あなただけの一枚。
            <br />
            診断を受けるほどカードが進化します。
          </p>
          {completedCount > 0 && (
            <p style={{ fontSize: 12, color: "#4a6572" }}>
              {completedCount}個の診断を完了
            </p>
          )}
        </section>

        {/* ペルソナカード本体 */}
        <section style={{ padding: "0 0 40px" }}>
          <PersonaCard />
        </section>

        {/* 統合パーソナリティ分析 */}
        <section style={{ padding: "0 0 40px" }}>
          <TotalAnalysis />
        </section>

        {/* パーソナルフレンズ */}
        <section style={{ padding: "0 0 60px" }}>
          <PersonalFriends />
        </section>
      </div>
    </div>
  );
}
