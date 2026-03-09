"use client";

/**
 * ペルソナカードページ（/persona）
 *
 * 全診断結果を統合した「自分だけの一枚」を表示する。
 * 診断結果はlocalStorageから読み込む。
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PersonaCard from "@/components/PersonaCard";
import TotalAnalysis from "@/components/TotalAnalysis";
import PersonalFriends from "@/components/PersonalFriends";
import { usePersonaStore } from "@/store/personaStore";

export default function PersonaPage() {
  const { results } = usePersonaStore();
  const completedCount = Object.keys(results).length;

  // 星空パーティクル
  const [stars, setStars] = useState<
    { id: number; top: string; left: string; size: number; delay: string; duration: string }[]
  >([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.5,
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 3}s`,
      }))
    );
  }, []);

  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: "#0D0118", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* 背景：星空 */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true">
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              background: "#fff",
              animation: `twinkle ${star.duration} ${star.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* 背景：ブロブ */}
      <div
        style={{
          position: "fixed", top: "10%", left: "-10%", width: 350, height: 350,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,232,.15), transparent 70%)",
          filter: "blur(60px)", animation: "blobFloat 8s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "fixed", bottom: "5%", right: "-8%", width: 300, height: 300,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(196,90,255,.12), transparent 70%)",
          filter: "blur(60px)", animation: "blobFloat 12s 3s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* メインコンテンツ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ナビバー */}
        <nav
          style={{
            position: "sticky", top: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 24px",
            background: "rgba(13,1,24,.85)", backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,107,232,.15)",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 30, height: 30, borderRadius: "50%",
                background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
                color: "rgba(255,255,255,.6)", fontSize: 14,
                transition: "all 0.2s ease",
              }}
            >
              &#8592;
            </span>
            <span className="font-stick" style={{ color: "#FF6BE8", fontSize: "1.2rem" }}>
              ときめきラボ
            </span>
          </Link>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: "0.08em" }}>
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
            style={{ fontSize: "clamp(24px, 7vw, 36px)", color: "#FF6BE8", marginBottom: 8 }}
          >
            ペルソナカード
          </h1>
          <p
            style={{
              fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.7,
              maxWidth: 400, margin: "0 auto 8px",
            }}
          >
            全ての診断結果を統合した、あなただけの一枚。
            <br />
            診断を受けるほどカードが進化します。
          </p>
          {completedCount > 0 && (
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
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
