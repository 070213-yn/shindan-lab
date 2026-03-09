"use client";

/**
 * 汎用診断ローディングアニメーション
 *
 * 診断テーマカラーに応じたリングアニメーションと
 * 診断固有のステップテキストを表示する。約5秒後に結果画面へ遷移。
 *
 * 改修内容:
 * - テーマカラーベースのリングアニメーション強化
 * - 診断IDに応じた固有のステップテキスト
 */

import { useEffect, useState, useMemo } from "react";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";
import { getLoadingSteps } from "@/lib/diagnosticThemes";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
}

export default function DiagLoading({ config, store }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [percent, setPercent] = useState(0);

  // 診断IDに応じたステップテキストを取得
  const analysisSteps = useMemo(() => getLoadingSteps(config.id), [config.id]);

  // ステップ進行
  useEffect(() => {
    const timers = analysisSteps.map((step, i) =>
      setTimeout(() => setActiveStep(i + 1), step.delay)
    );

    // パーセント進行
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 90);

    // 完了後に結果画面へ
    const finishTimer = setTimeout(() => {
      store.setCurrentStep("result");
    }, 5000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, [store]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--diag-bg, #0D0118)",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      {/* テーマカラーの背景グロー */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.themeColor}15, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* リングアニメーション */}
      <div
        style={{
          position: "relative",
          width: 150,
          height: 150,
          marginBottom: 40,
        }}
      >
        {/* 外側リング1: テーマカラー */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `2px solid ${config.themeColor}30`,
            borderTopColor: config.themeColor,
            borderRightColor: `${config.themeColor}60`,
            borderRadius: "50%",
            animation: "spin360 2s linear infinite",
          }}
        />
        {/* 外側リング2: グラデーション（逆回転） */}
        <div
          style={{
            position: "absolute",
            inset: 10,
            border: `2px solid ${config.gradientTo}20`,
            borderBottomColor: config.gradientTo,
            borderLeftColor: `${config.gradientTo}50`,
            borderRadius: "50%",
            animation: "spin360 3s linear infinite reverse",
          }}
        />
        {/* 外側リング3: 薄い点線風 */}
        <div
          style={{
            position: "absolute",
            inset: 22,
            border: `1px dashed ${config.themeColor}18`,
            borderRadius: "50%",
            animation: "spin360 6s linear infinite",
          }}
        />
        {/* 内側リング */}
        <div
          style={{
            position: "absolute",
            inset: 30,
            border: `1px solid ${config.themeColor}15`,
            borderLeftColor: `${config.themeColor}70`,
            borderRadius: "50%",
            animation: "spin360 4s linear infinite",
          }}
        />
        {/* 中央コア */}
        <div
          style={{
            position: "absolute",
            inset: 40,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${config.themeColor}35, ${config.gradientTo}15, transparent)`,
            animation: "coreBeat 2s ease-in-out infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
          }}
        >
          {config.emoji}
        </div>
      </div>

      {/* パーセント表示 */}
      <div
        className="font-stick"
        style={{
          fontSize: 36,
          color: config.themeColor,
          marginBottom: 8,
          textShadow: `0 0 20px ${config.themeColor}40`,
        }}
      >
        {Math.min(percent, 100)}%
      </div>

      {/* プログレスバー */}
      <div
        style={{
          width: "100%",
          maxWidth: 280,
          height: 4,
          background: "rgba(255,255,255,.08)",
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 32,
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${Math.min(percent, 100)}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
            borderRadius: 2,
            transition: "width 0.1s linear",
            position: "relative",
          }}
        >
          <span className="progress-shimmer" />
        </div>
      </div>

      {/* ステップリスト */}
      <div style={{ maxWidth: 280, width: "100%" }}>
        {analysisSteps.map((step, i) => {
          const status =
            i + 1 < activeStep ? "done" : i + 1 === activeStep ? "active" : "waiting";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
                opacity: status === "waiting" ? 0.3 : status === "active" ? 1 : 0.6,
                transition: "opacity 0.4s",
              }}
            >
              {/* ステータスドット */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    status === "done"
                      ? config.themeColor
                      : status === "active"
                      ? config.themeColor
                      : "rgba(255,255,255,.2)",
                  boxShadow:
                    status === "active"
                      ? `0 0 8px ${config.themeColor}, 0 0 16px ${config.themeColor}50`
                      : status === "done"
                      ? `0 0 4px ${config.themeColor}50`
                      : "none",
                  animation:
                    status === "active"
                      ? "dotPulse 1s ease-in-out infinite"
                      : "none",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color:
                    status === "done"
                      ? "rgba(255,255,255,.6)"
                      : status === "active"
                      ? "#fff"
                      : "rgba(255,255,255,.3)",
                }}
              >
                {step.label}
              </span>
              {status === "done" && (
                <span style={{ fontSize: 11, color: config.themeColor, marginLeft: "auto" }}>
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
