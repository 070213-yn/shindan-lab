"use client";

/**
 * 汎用プロフィール入力コンポーネント
 *
 * 診断設定のprofileFieldsに基づいて、動的にプロフィール入力画面を生成する。
 * レイアウトはProfileSetup（恋愛診断）と統一。色は診断ごとのthemeColorを使用。
 *
 * 改修: globalProfileが設定済みの場合、対応フィールドをスキップする。
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProfileFieldConfig, DiagnosisConfig } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";
import type { DiagnosticTheme } from "@/lib/diagnosticThemes";
import { usePersonaStore } from "@/store/personaStore";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
  theme: DiagnosticTheme;
}

export default function DiagProfileSetup({ config, store, theme }: Props) {
  const { profileData, setProfileField, profileStep, setProfileStep, setCurrentStep } = store;
  const { globalProfile } = usePersonaStore();
  const fields = config.profileFields;
  const currentField = fields[profileStep];
  const hasAutoSkipped = useRef(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [bouncingCard, setBouncingCard] = useState<string | null>(null);
  const [backHovered, setBackHovered] = useState(false);

  const tc = config.themeColor; // テーマカラーの短縮

  // グローバルプロフィールの自動適用とスキップ
  useEffect(() => {
    if (hasAutoSkipped.current) return;
    hasAutoSkipped.current = true;

    if (!globalProfile) return;

    const { gender, age } = globalProfile;
    let skipCount = 0;

    fields.forEach((field) => {
      if (field.id === 'gender' && gender) {
        setProfileField('gender', gender);
        skipCount++;
      } else if (field.id === 'age' && age !== null) {
        setProfileField('age', age);
        skipCount++;
      }
    });

    if (gender && age !== null) {
      const allFieldIds = fields.map(f => f.id);
      const profileFieldsAreOnlyGenderAge =
        allFieldIds.length <= 2 &&
        allFieldIds.every(id => id === 'gender' || id === 'age');

      if (profileFieldsAreOnlyGenderAge) {
        setCurrentStep("quiz");
        return;
      }
    }

    if (skipCount > 0) {
      let firstUnsatisfied = 0;
      for (let i = 0; i < fields.length; i++) {
        const fid = fields[i].id;
        if (fid === 'gender' && gender) continue;
        if (fid === 'age' && age !== null) continue;
        firstUnsatisfied = i;
        break;
      }
      if (firstUnsatisfied > 0) {
        setProfileStep(firstUnsatisfied);
      }
    }
  }, []);

  const handleNext = useCallback(() => {
    let nextStep = profileStep + 1;
    while (nextStep < fields.length) {
      const nextField = fields[nextStep];
      if (nextField.id === 'gender' && globalProfile?.gender) {
        nextStep++;
        continue;
      }
      if (nextField.id === 'age' && globalProfile?.age !== null && globalProfile?.age !== undefined) {
        nextStep++;
        continue;
      }
      break;
    }

    if (nextStep < fields.length) {
      setProfileStep(nextStep);
    } else {
      setCurrentStep("quiz");
    }
  }, [profileStep, fields.length, setProfileStep, setCurrentStep, globalProfile, fields]);

  const handleBack = useCallback(() => {
    let prevStep = profileStep - 1;
    while (prevStep >= 0) {
      const prevField = fields[prevStep];
      if (prevField.id === 'gender' && globalProfile?.gender) {
        prevStep--;
        continue;
      }
      if (prevField.id === 'age' && globalProfile?.age !== null && globalProfile?.age !== undefined) {
        prevStep--;
        continue;
      }
      break;
    }
    if (prevStep >= 0) {
      setProfileStep(prevStep);
    }
  }, [profileStep, fields, setProfileStep, globalProfile]);

  const triggerBounce = useCallback((key: string) => {
    setBouncingCard(key);
    setTimeout(() => setBouncingCard(null), 350);
  }, []);

  const isCurrentValid = currentField
    ? currentField.type === "slider"
      ? true
      : profileData[currentField.id] !== undefined && profileData[currentField.id] !== null
    : false;

  if (!currentField) return null;

  // スライダーの進捗割合
  const sliderVal = Number(profileData[currentField.id] ?? currentField.defaultValue ?? currentField.min ?? 10);
  const sliderMin = currentField.min ?? 0;
  const sliderMax = currentField.max ?? 100;
  const sliderPercent = ((sliderVal - sliderMin) / (sliderMax - sliderMin)) * 100;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px 100px" }}>
      {/* ステップインジケーター（バー形式） */}
      <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
        {fields.map((_, i) => {
          const isActive = i === profileStep;
          return (
            <div
              key={i}
              className={isActive ? "animate-glowBreath" : ""}
              style={{
                height: 4,
                borderRadius: 2,
                width: isActive ? 40 : 28,
                background:
                  isActive ? tc : i < profileStep ? `${tc}80` : `${tc}25`,
                transition: "width .35s cubic-bezier(.25,1,.5,1), background .3s ease",
              }}
            />
          );
        })}
      </div>

      <div className="animate-fadeUp">
        {/* STEP ラベル + タイトル + 説明 */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: `${tc}CC`, marginBottom: 6 }}>
            STEP {profileStep + 1} / {fields.length}
          </p>
          <h2
            className="font-zen"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: tc,
              lineHeight: 1.3,
              marginBottom: 6,
            }}
          >
            {currentField.label}を{"\n"}教えてください
          </h2>
          {currentField.type === "select" && (
            <p style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.8, opacity: 0.85 }}>
              診断精度を高めるために使用します
            </p>
          )}
          {currentField.type === "slider" && currentField.unit === "歳" && (
            <p style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.8, opacity: 0.85 }}>
              年齢によって分析の重みが変わります
            </p>
          )}
        </div>

        {/* select フィールド */}
        {currentField.type === "select" && currentField.options && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                currentField.options.length <= 3 ? `repeat(${Math.min(currentField.options.length, 2)}, 1fr)` : "repeat(2, 1fr)",
              gap: 12,
              marginBottom: 12,
            }}
          >
            {currentField.options.map((opt, oi) => {
              const isSelected = profileData[currentField.id] === opt.value;
              const cardKey = `${currentField.id}-${opt.value}`;
              const isHovered = hoveredCard === cardKey;
              const isBouncing = bouncingCard === cardKey;

              return (
                <div
                  key={opt.value}
                  className={isBouncing ? "animate-popBounceRich" : ""}
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg,${tc}20,${config.gradientTo || tc}12)`
                      : "rgba(255,255,255,.7)",
                    border: `2px solid ${isSelected ? tc : `${tc}20`}`,
                    borderRadius: 20,
                    padding: "20px 16px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all .25s cubic-bezier(.25,1,.5,1)",
                    backdropFilter: "blur(8px)",
                    transform: isHovered && !isBouncing ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: isSelected
                      ? `0 0 20px ${tc}25`
                      : isHovered
                        ? `0 6px 20px ${tc}15`
                        : "none",
                    animation: `staggeredFadeUp 0.5s cubic-bezier(0.25,1,0.5,1) ${oi * 0.08}s both`,
                  }}
                  onMouseEnter={() => setHoveredCard(cardKey)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => {
                    setProfileField(currentField.id, opt.value);
                    triggerBounce(cardKey);
                  }}
                >
                  {opt.emoji && (
                    <span
                      className={isSelected ? "animate-emojiFloat" : ""}
                      style={{ fontSize: 42, display: "block", marginBottom: 8, transition: "transform .3s ease" }}
                    >
                      {opt.emoji}
                    </span>
                  )}
                  <div style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>{opt.label}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* slider フィールド */}
        {currentField.type === "slider" && (
          <div style={{ marginBottom: 32 }}>
            {/* 数値表示 */}
            <div style={{ textAlign: "center", margin: "16px 0" }}>
              <span
                className="font-stick age-display"
                style={{ fontSize: 64, color: tc, lineHeight: 1 }}
              >
                {sliderVal}
              </span>
              {currentField.unit && (
                <span style={{ fontSize: 16, color: `${tc}CC`, fontWeight: 700 }}>
                  {currentField.unit}
                </span>
              )}
            </div>

            {/* スライダー */}
            <div style={{ position: "relative", padding: "0 0 4px" }}>
              <input
                type="range"
                className="profile-slider"
                min={sliderMin}
                max={sliderMax}
                value={sliderVal}
                onChange={(e) => setProfileField(currentField.id, Number(e.target.value))}
                style={{ width: "100%", margin: "8px 0", position: "relative", zIndex: 2 }}
              />
              {/* アクセントライン */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  height: 6,
                  borderRadius: 4,
                  marginTop: -3,
                  width: `${sliderPercent}%`,
                  background: `linear-gradient(90deg, ${config.gradientFrom || tc}, ${config.gradientTo || tc})`,
                  pointerEvents: "none",
                  zIndex: 1,
                  transition: "width .05s linear",
                  opacity: 0.7,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: theme.textSecondary, opacity: 0.8, marginTop: 4 }}>
              <span>{sliderMin}{currentField.unit || ""}</span>
              <span>{sliderMax}{currentField.unit || ""}</span>
            </div>
          </div>
        )}

        {/* ナビゲーションボタン */}
        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          {profileStep > 0 && (
            <button
              style={{
                padding: "14px 28px",
                borderRadius: 50,
                border: `1px solid ${tc}40`,
                background: "transparent",
                color: backHovered ? tc : theme.textSecondary,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "'Zen Maru Gothic', sans-serif",
                transition: "color .2s, border-color .2s",
                borderColor: backHovered ? `${tc}80` : `${tc}40`,
              }}
              onMouseEnter={() => setBackHovered(true)}
              onMouseLeave={() => setBackHovered(false)}
              onClick={handleBack}
            >
              &larr; 戻る
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isCurrentValid}
            className={isCurrentValid ? "btn-glow-active" : ""}
            style={{
              flex: 1,
              padding: "16px 0",
              background: isCurrentValid
                ? `linear-gradient(135deg, ${config.gradientFrom || tc}, ${config.gradientTo || tc})`
                : `${tc}15`,
              color: isCurrentValid ? "#fff" : `${tc}50`,
              border: "none",
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Zen Maru Gothic', sans-serif",
              cursor: isCurrentValid ? "pointer" : "default",
              transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              opacity: isCurrentValid ? 1 : 0.6,
              boxShadow: isCurrentValid ? `0 4px 20px ${tc}40` : "none",
            }}
          >
            {profileStep < fields.length - 1 ? "次へ →" : "診断スタート！"}
          </button>
        </div>
      </div>

      {/* スライダーCSS */}
      <style>{`
        .profile-slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        .profile-slider::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 4px;
          background: ${tc}15;
        }
        .profile-slider::-moz-range-track {
          height: 6px;
          border-radius: 4px;
          background: ${tc}15;
          border: none;
        }
        .profile-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${config.gradientFrom || tc}, ${config.gradientTo || tc});
          border: none;
          margin-top: -10px;
          box-shadow: 0 2px 12px ${tc}50;
          transition: box-shadow .2s ease;
        }
        .profile-slider::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${config.gradientFrom || tc}, ${config.gradientTo || tc});
          border: none;
          box-shadow: 0 2px 12px ${tc}50;
          transition: box-shadow .2s ease;
        }
        .profile-slider:active::-webkit-slider-thumb,
        .profile-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 16px ${tc}90, 0 0 30px ${config.gradientTo || tc}50 !important;
        }
        .profile-slider:active::-moz-range-thumb,
        .profile-slider:focus::-moz-range-thumb {
          box-shadow: 0 0 16px ${tc}90, 0 0 30px ${config.gradientTo || tc}50 !important;
        }
      `}</style>
    </div>
  );
}
