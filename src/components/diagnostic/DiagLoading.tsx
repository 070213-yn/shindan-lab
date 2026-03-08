"use client";

/**
 * 汎用診断ローディングアニメーション
 *
 * 診断テーマカラーに応じたオーブアニメーションと
 * ステップリストを表示する。約5秒後に結果画面へ遷移。
 */

import { useEffect, useState } from "react";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
}

/** 分析ステップの定義 */
const ANALYSIS_STEPS = [
  { label: "回答データを収集中...", delay: 0 },
  { label: "多次元スコアを計算中...", delay: 800 },
  { label: "パターンを分析中...", delay: 1800 },
  { label: "タイプを照合中...", delay: 2800 },
  { label: "結果を生成中...", delay: 3800 },
];

export default function DiagLoading({ config, store }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [percent, setPercent] = useState(0);

  // ステップ進行
  useEffect(() => {
    const timers = ANALYSIS_STEPS.map((step, i) =>
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
        background: "#0D0118",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      {/* オーブアニメーション */}
      <div
        style={{
          position: "relative",
          width: 140,
          height: 140,
          marginBottom: 40,
        }}
      >
        {/* 外側リング1 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `2px solid ${config.themeColor}30`,
            borderTopColor: config.themeColor,
            borderRadius: "50%",
            animation: "spin360 2s linear infinite",
          }}
        />
        {/* 外側リング2（逆回転） */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            border: `2px solid ${config.gradientTo}25`,
            borderBottomColor: config.gradientTo,
            borderRadius: "50%",
            animation: "spin360 3s linear infinite reverse",
          }}
        />
        {/* 外側リング3 */}
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: `1px solid ${config.themeColor}20`,
            borderLeftColor: `${config.themeColor}80`,
            borderRadius: "50%",
            animation: "spin360 4s linear infinite",
          }}
        />
        {/* 中央コア */}
        <div
          style={{
            position: "absolute",
            inset: 36,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${config.themeColor}40, ${config.gradientTo}20, transparent)`,
            animation: "coreBeat 2s ease-in-out infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
          }}
        >
          {config.emoji}
        </div>
      </div>

      {/* パーセント表示 */}
      <div
        className="font-stick"
        style={{
          fontSize: 32,
          color: config.themeColor,
          marginBottom: 8,
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
          }}
        />
      </div>

      {/* ステップリスト */}
      <div style={{ maxWidth: 280, width: "100%" }}>
        {ANALYSIS_STEPS.map((step, i) => {
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
                      ? `0 0 8px ${config.themeColor}`
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
