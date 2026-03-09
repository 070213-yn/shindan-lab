"use client";

/**
 * 汎用診断エンジン
 *
 * DiagnosisConfigを受け取り、ランディング→プロフィール入力→クイズ→ローディング→結果表示を
 * 一つのコンポーネントで管理する。各診断ページはこのコンポーネントにconfigを渡すだけ。
 *
 * 改修内容:
 * - ランディング画面の追加（診断イントロ）
 * - 診断ごとのUIテーマシステム（背景パターン、CSS変数）
 * - グローバルプロフィールによるプロフィール入力スキップ
 */

import { useEffect, useMemo, useState } from "react";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import { createDiagnosticStore, type GenericDiagState } from "@/store/createDiagnosticStore";
import { getDiagnosticTheme } from "@/lib/diagnosticThemes";
import DiagLanding from "./DiagLanding";
import DiagProfileSetup from "./DiagProfileSetup";
import DiagQuizFeed from "./DiagQuizFeed";
import DiagLoading from "./DiagLoading";
import DiagResult from "./DiagResult";

interface Props {
  config: DiagnosisConfig;
}

/** テーマカラーから暗い背景色を生成する */
function adjustBgColor(hex: string): string {
  // hexからRGBを抽出して、非常に暗いバージョンを作る
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // 元の色の5%だけ混ぜた暗い背景
  const br = Math.round(13 + r * 0.04);
  const bg = Math.round(1 + g * 0.03);
  const bb = Math.round(24 + b * 0.05);
  return `rgb(${br}, ${bg}, ${bb})`;
}

export default function DiagnosticEngine({ config }: Props) {
  // ストアをconfigに基づいて動的生成（useMemoで1回だけ）
  const useStore = useMemo(
    () => createDiagnosticStore(config.questions.length, config.dimensions.length),
    [config]
  );
  const store = useStore();

  // 診断テーマを取得
  const theme = useMemo(() => getDiagnosticTheme(config.id), [config.id]);

  // 初期表示時にlandingステップへ（ストアのデフォルトが'landing'なので実質不要だが明示的に）
  useEffect(() => {
    store.setCurrentStep("landing");
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

  // 動的に生成した背景色
  const dynamicBg = adjustBgColor(config.themeColor);

  return (
    <div
      style={{
        // テーマCSS変数を設定
        ['--diag-primary' as string]: config.themeColor,
        ['--diag-from' as string]: config.gradientFrom,
        ['--diag-to' as string]: config.gradientTo,
        ['--diag-bg' as string]: dynamicBg,
        background: dynamicBg,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {/* 背景：診断テーマパターン */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          ...theme.bgStyle,
        }}
        aria-hidden="true"
      />

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
        {store.currentStep === "landing" && (
          <DiagLanding config={config} store={store} />
        )}
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
