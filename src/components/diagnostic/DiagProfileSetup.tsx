"use client";

/**
 * 汎用プロフィール入力コンポーネント
 *
 * 診断設定のprofileFieldsに基づいて、動的にプロフィール入力画面を生成する。
 * 性別選択 → 年齢スライダー → ... の順でステップ進行。
 */

import { useCallback } from "react";
import type { ProfileFieldConfig, DiagnosisConfig } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
}

export default function DiagProfileSetup({ config, store }: Props) {
  const { profileData, setProfileField, profileStep, setProfileStep, setCurrentStep } = store;
  const fields = config.profileFields;
  const currentField = fields[profileStep];

  const handleNext = useCallback(() => {
    if (profileStep < fields.length - 1) {
      setProfileStep(profileStep + 1);
    } else {
      setCurrentStep("quiz");
    }
  }, [profileStep, fields.length, setProfileStep, setCurrentStep]);

  const isCurrentValid = currentField
    ? currentField.type === "slider"
      ? true // スライダーは常に有効（デフォルト値あり）
      : profileData[currentField.id] !== undefined && profileData[currentField.id] !== null
    : false;

  if (!currentField) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* ステップインジケーター */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          {fields.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === profileStep ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background:
                  i === profileStep
                    ? config.themeColor
                    : i < profileStep
                    ? `${config.themeColor}80`
                    : "rgba(255,255,255,.15)",
                transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            />
          ))}
        </div>

        {/* 診断アイコン */}
        <div
          style={{
            fontSize: 48,
            marginBottom: 16,
            animation: "float 3s ease-in-out infinite",
          }}
        >
          {config.emoji}
        </div>

        {/* フィールドラベル */}
        <h2
          className="font-zen"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: config.themeColor,
            marginBottom: 8,
          }}
        >
          {currentField.label}
        </h2>

        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,.5)",
            marginBottom: 28,
          }}
        >
          {profileStep + 1} / {fields.length}
        </p>

        {/* フィールド入力 */}
        {currentField.type === "select" && currentField.options && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                currentField.options.length <= 3 ? `repeat(${currentField.options.length}, 1fr)` : "repeat(2, 1fr)",
              gap: 12,
              marginBottom: 32,
            }}
          >
            {currentField.options.map((opt, oi) => {
              const isSelected = profileData[currentField.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setProfileField(currentField.id, opt.value)}
                  className={isSelected ? "animate-popBounceRich" : ""}
                  style={{
                    padding: "16px 12px",
                    background: isSelected
                      ? `${config.themeColor}20`
                      : "rgba(255,255,255,.04)",
                    border: `2px solid ${
                      isSelected ? config.themeColor : "rgba(255,255,255,.1)"
                    }`,
                    borderRadius: 14,
                    color: isSelected ? "#fff" : "rgba(255,255,255,.7)",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    animation: `staggeredFadeUp 0.5s cubic-bezier(0.25,1,0.5,1) ${oi * 0.08}s both`,
                  }}
                >
                  {opt.emoji && (
                    <span
                      className={isSelected ? "animate-emojiFloat" : ""}
                      style={{ fontSize: 24 }}
                    >
                      {opt.emoji}
                    </span>
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {currentField.type === "slider" && (
          <div style={{ marginBottom: 32, padding: "0 8px" }}>
            {/* 数値表示 */}
            <div
              className="font-stick age-display"
              style={{
                fontSize: 48,
                color: config.themeColor,
                marginBottom: 20,
              }}
            >
              {profileData[currentField.id] ?? currentField.defaultValue ?? currentField.min ?? 10}
              {currentField.unit && (
                <span style={{ fontSize: 18, color: "rgba(255,255,255,.5)", marginLeft: 4 }}>
                  {currentField.unit}
                </span>
              )}
            </div>

            {/* スライダー */}
            <input
              type="range"
              className="profile-slider"
              min={currentField.min ?? 0}
              max={currentField.max ?? 100}
              value={Number(profileData[currentField.id] ?? currentField.defaultValue ?? currentField.min ?? 10)}
              onChange={(e) => setProfileField(currentField.id, Number(e.target.value))}
              style={{
                width: "100%",
                height: 6,
                borderRadius: 3,
                appearance: "none",
                background: `linear-gradient(90deg, ${config.themeColor}, ${config.gradientTo})`,
                outline: "none",
                cursor: "pointer",
              }}
            />

            {/* 最小値・最大値ラベル */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
                fontSize: 11,
                color: "rgba(255,255,255,.35)",
              }}
            >
              <span>{currentField.min ?? 0}{currentField.unit || ""}</span>
              <span>{currentField.max ?? 100}{currentField.unit || ""}</span>
            </div>
          </div>
        )}

        {/* 次へボタン */}
        <button
          onClick={handleNext}
          disabled={!isCurrentValid}
          className={isCurrentValid ? "btn-glow-active" : ""}
          style={{
            width: "100%",
            padding: "16px 0",
            background: isCurrentValid
              ? `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`
              : "rgba(255,255,255,.08)",
            color: isCurrentValid ? "#fff" : "rgba(255,255,255,.3)",
            border: "none",
            borderRadius: 50,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Zen Maru Gothic', sans-serif",
            cursor: isCurrentValid ? "pointer" : "default",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {profileStep < fields.length - 1 ? "次へ" : "診断スタート！"}
        </button>
      </div>
    </div>
  );
}
