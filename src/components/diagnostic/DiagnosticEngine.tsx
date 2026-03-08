"use client";

/**
 * 汎用診断エンジン
 *
 * DiagnosisConfigを受け取り、プロフィール入力→クイズ→ローディング→結果表示を
 * 一つのコンポーネントで管理する。各診断ページはこのコンポーネントにconfigを渡すだけ。
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import { createDiagnosticStore, type GenericDiagState } from "@/store/createDiagnosticStore";
import DiagProfileSetup from "./DiagProfileSetup";
import DiagQuizFeed from "./DiagQuizFeed";
import DiagLoading from "./DiagLoading";
import DiagResult from "./DiagResult";

interface Props {
  config: DiagnosisConfig;
}

export default function DiagnosticEngine({ config }: Props) {
  // ストアをconfigに基づいて動的生成（useMemoで1回だけ）
  const useStore = useMemo(
    () => createDiagnosticStore(config.questions.length, config.dimensions.length),
    [config]
  );
  const store = useStore();

  // 初期表示時にprofileステップへ
  useEffect(() => {
    store.setCurrentStep("profile");
  }, []);

  // 星空パーティクル（ハイドレーション対策でクライアントのみ）
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

  return (
    <div style={{ background: "#0D0118", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* 背景：星空パーティクル */}
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
          position: "fixed",
          top: "15%",
          left: "-10%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.themeColor}25, transparent 70%)`,
          filter: "blur(60px)",
          animation: "blobFloat 8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          right: "-8%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.gradientTo}20, transparent 70%)`,
          filter: "blur(60px)",
          animation: "blobFloat 10s 2s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* メインコンテンツ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {store.currentStep === "profile" && (
          <DiagProfileSetup config={config} store={store} />
        )}
        {store.currentStep === "quiz" && (
          <DiagQuizFeed config={config} store={store} />
        )}
        {store.currentStep === "loading" && (
          <DiagLoading config={config} store={store} />
        )}
        {store.currentStep === "result" && (
          <DiagResult config={config} store={store} />
        )}
      </div>
    </div>
  );
}
