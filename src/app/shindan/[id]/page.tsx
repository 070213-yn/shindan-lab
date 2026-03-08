"use client";

/**
 * 汎用診断ページ（/shindan/[id]）
 *
 * URLパラメータのIDに応じた診断設定を読み込み、
 * DiagnosticEngineに渡して診断フローを実行する。
 */

import { use } from "react";
import { DIAGNOSIS_REGISTRY } from "@/lib/diagnoses";
import DiagnosticEngine from "@/components/diagnostic/DiagnosticEngine";
import Link from "next/link";

export default function ShindanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const config = DIAGNOSIS_REGISTRY[id];

  // 不明な診断IDの場合
  if (!config) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0D0118",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
        <h1
          className="font-stick"
          style={{ fontSize: 24, color: "#FF6BE8", marginBottom: 12 }}
        >
          診断が見つかりません
        </h1>
        <p style={{ color: "rgba(255,255,255,.6)", marginBottom: 24 }}>
          指定された診断ID「{id}」は存在しません。
        </p>
        <Link
          href="/"
          className="btn-gradient"
          style={{
            padding: "14px 32px",
            textDecoration: "none",
            display: "inline-block",
            fontSize: 14,
          }}
        >
          トップへ戻る
        </Link>
      </div>
    );
  }

  return <DiagnosticEngine config={config} />;
}
