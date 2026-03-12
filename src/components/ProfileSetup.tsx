"use client";

/**
 * プロフィール入力コンポーネント（3ステップ）
 *
 * profileStep 0: 性別選択
 * profileStep 1: 実年齢（スライダー）
 * profileStep 2: 恋愛経験（4択）→ 診断スタートへ
 *
 * 演出: glowBreath, popBounce, staggered fadeUp, スライダーglow等
 */

import { useState, useEffect, useCallback } from "react";
import { useQuizStore } from "@/store/quizStore";

// ---------- 定数 ----------

const DOT_ACTIVE = "#FF6BE8";
const DOT_DONE = "rgba(255,107,232,.45)";
const DOT_TODO = "rgba(255,107,232,.15)";

const GENDERS = [
  { value: "female" as const, label: "女性", emoji: "👩" },
  { value: "male" as const, label: "男性", emoji: "👨" },
  { value: "other" as const, label: "その他", emoji: "🌈" },
];

const EXP_OPTIONS = [
  { value: "none" as const, label: "まだない", sub: "初めての恋愛を探し中", emoji: "🌱" },
  { value: "little" as const, label: "少しある", sub: "1〜2人と付き合った", emoji: "🌸" },
  { value: "some" as const, label: "そこそこある", sub: "3〜5人と付き合った", emoji: "💝" },
  { value: "rich" as const, label: "豊富にある", sub: "6人以上と付き合った", emoji: "💎" },
];

const TOTAL_STEPS = 3;

// ---------- 共通スタイル ----------

// カード選択のアニメーション: ホバー時のtranslateYとshadowを追加
const cardBase: React.CSSProperties = {
  background: "rgba(255,255,255,.7)",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "rgba(255,107,232,.2)",
  borderRadius: 20,
  padding: "20px 16px",
  cursor: "pointer",
  textAlign: "center",
  transition: "all .25s cubic-bezier(.25,1,.5,1)",
  backdropFilter: "blur(8px)",
};

// 選択時のbox-shadow追加で視覚フィードバック改善
const cardSelected: React.CSSProperties = {
  borderColor: "#FF6BE8",
  background: "linear-gradient(135deg,rgba(255,107,232,.2),rgba(196,90,255,.12))",
  boxShadow: "0 0 20px rgba(255,107,232,.15)",
};

const btnBase: React.CSSProperties = {
  padding: "14px 36px",
  borderRadius: 50,
  border: "none",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  color: "#fff",
  fontFamily: "'Zen Maru Gothic', sans-serif",
  background: "linear-gradient(135deg,#FF6BE8,#C45AFF)",
  transition: "opacity .2s, transform .1s ease",
};

const btnBack: React.CSSProperties = {
  padding: "14px 28px",
  borderRadius: 50,
  border: "1px solid rgba(255,107,232,.25)",
  background: "transparent",
  color: "#7B5A8E",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "'Zen Maru Gothic', sans-serif",
  transition: "color .2s, border-color .2s, transform .1s ease",
};

// ---------- コンポーネント本体 ----------

export default function ProfileSetup() {
  const {
    profile,
    profileStep,
    setGender,
    setRealAge,
    setExp,
    setProfileStep,
    setCurrentStep,
  } = useQuizStore();

  // 戻るボタンのホバー状態管理
  const [backHovered, setBackHovered] = useState(false);

  // カードホバー状態管理（どのカードがホバーされているか）
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 選択時のpopBounceアニメーション用（選択されたカードのキー）
  const [bouncingCard, setBouncingCard] = useState<string | null>(null);

  // staggeredアニメーション用のステップ到達フラグ
  const [step2Entered, setStep2Entered] = useState(false);
  useEffect(() => {
    if (profileStep === 2) {
      setStep2Entered(true);
    }
  }, [profileStep]);

  // カード選択時にpopBounceを発火する共通関数
  const triggerBounce = useCallback((key: string) => {
    setBouncingCard(key);
    setTimeout(() => setBouncingCard(null), 350);
  }, []);

  // --- ステップドット（アクティブドットにglowBreathアニメーション追加） ---
  const renderDots = () => (
    <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
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
                isActive ? DOT_ACTIVE : i < profileStep ? DOT_DONE : DOT_TODO,
              // 幅変更がスムーズにアニメーション
              transition: "width .35s cubic-bezier(.25,1,.5,1), background .3s ease",
            }}
          />
        );
      })}
    </div>
  );

  // --- ステップ共通ヘッダー（\nを<br />に変換して表示） ---
  const renderHeader = (stepNum: number, title: string, desc?: string) => (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#D946A8", marginBottom: 6 }}>
        STEP {stepNum} / {TOTAL_STEPS}
      </p>
      <h2 style={{ fontFamily: "'Stick', sans-serif", fontSize: 26, color: "#C026A3", lineHeight: 1.3, marginBottom: 6 }}>
        {/* タイトル内の\nを<br />に変換 */}
        {title.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </h2>
      {desc && (
        <p style={{ fontSize: 13, color: "#6B5A7E", lineHeight: 1.8 }}>
          {/* 説明文内の\nも<br />に変換 */}
          {desc.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      )}
    </div>
  );

  // --- ナビゲーションボタン（有効時にglowBreath、押下時にscaleダウン） ---
  const renderNav = (opts: {
    showBack?: boolean;
    nextLabel?: string;
    disabled?: boolean;
    onNext: () => void;
  }) => {
    const isEnabled = !opts.disabled;
    return (
      <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
        {opts.showBack && (
          <button
            style={{
              ...btnBack,
              // ホバー時: テキストとボーダーを明るくする
              color: backHovered ? "#C026A3" : "#7B5A8E",
              borderColor: backHovered ? "rgba(255,107,232,.5)" : "rgba(255,107,232,.25)",
            }}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
            onClick={() => setProfileStep(profileStep - 1)}
          >
            &larr; 戻る
          </button>
        )}
        <button
          // 有効時にglowBreathアニメーション + active時のscaleダウン
          className={isEnabled ? "btn-glow-active" : ""}
          style={{
            ...btnBase,
            flex: 1,
            opacity: opts.disabled ? 0.4 : 1,
            pointerEvents: opts.disabled ? "none" : "auto",
            boxShadow: opts.disabled ? "none" : "0 4px 20px rgba(255,107,232,.25)",
          }}
          onClick={opts.onNext}
        >
          {opts.nextLabel ?? "次へ →"}
        </button>
      </div>
    );
  };

  // ==================== Step 0: 性別選択 ====================
  // ホバー時にtranslateY(-3px) + subtle shadow、選択時にpopBounce、絵文字浮き上がり
  const renderGenderCard = (g: typeof GENDERS[number]) => {
    const isSelected = profile.gender === g.value;
    const isHovered = hoveredCard === `gender-${g.value}`;
    const isBouncing = bouncingCard === `gender-${g.value}`;

    return (
      <div
        key={g.value}
        className={isBouncing ? "animate-popBounceRich" : ""}
        style={{
          ...cardBase,
          ...(isSelected ? cardSelected : {}),
          // ホバー時に少し浮き上がり + 影を追加
          transform: isHovered && !isBouncing ? "translateY(-3px)" : "translateY(0)",
          boxShadow: isSelected
            ? "0 0 20px rgba(255,107,232,.15)"
            : isHovered
              ? "0 6px 20px rgba(255,107,232,.12)"
              : "none",
        }}
        onMouseEnter={() => setHoveredCard(`gender-${g.value}`)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => {
          setGender(g.value);
          triggerBounce(`gender-${g.value}`);
        }}
      >
        {/* 絵文字: 選択時にfloatアニメーション */}
        <span
          className={isSelected ? "animate-emojiFloat" : ""}
          style={{
            fontSize: 42,
            display: "block",
            marginBottom: 8,
            transition: "transform .3s ease",
          }}
        >
          {g.emoji}
        </span>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#5B2D6E", marginBottom: 3 }}>{g.label}</div>
      </div>
    );
  };

  const renderStep0 = () => (
    <div className="animate-fadeUp">
      {renderHeader(1, "あなたの性別を\n教えてください", "性別によって、恋愛心理の分析アルゴリズムが変わります。\n（Buss進化心理学・ホルモン研究参考）")}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {GENDERS.slice(0, 2).map((g) => renderGenderCard(g))}
      </div>

      {/* その他カード */}
      {(() => {
        const g = GENDERS[2];
        const isSelected = profile.gender === "other";
        const isHovered = hoveredCard === `gender-other`;
        const isBouncing = bouncingCard === `gender-other`;
        return (
          <div
            className={isBouncing ? "animate-popBounceRich" : ""}
            style={{
              ...cardBase,
              ...(isSelected ? cardSelected : {}),
              transform: isHovered && !isBouncing ? "translateY(-3px)" : "translateY(0)",
              boxShadow: isSelected
                ? "0 0 20px rgba(255,107,232,.15)"
                : isHovered
                  ? "0 6px 20px rgba(255,107,232,.12)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredCard("gender-other")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => {
              setGender("other");
              triggerBounce("gender-other");
            }}
          >
            <span
              className={isSelected ? "animate-emojiFloat" : ""}
              style={{
                fontSize: 42,
                display: "block",
                marginBottom: 8,
                transition: "transform .3s ease",
              }}
            >
              {g.emoji}
            </span>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#5B2D6E" }}>{g.label}</div>
          </div>
        );
      })()}

      {renderNav({ disabled: profile.gender === null, onNext: () => setProfileStep(1) })}
    </div>
  );

  // ==================== Step 1: 実年齢（8歳〜100歳） ====================
  // 年齢数字のスムーズトランジション + スライダーのglowエフェクト
  const renderStep1 = () => {
    // スライダーの進捗割合を計算（アクセントライン用）
    const sliderPercent = ((profile.realAge - 8) / (100 - 8)) * 100;

    return (
      <div className="animate-fadeUp">
        {renderHeader(2, "実年齢を\n教えてください", "年齢によって、重視する恋愛スタイルや\n相性の重みが変わります。（Erikson発達段階理論参考）")}

        {/* 年齢の大きい数字表示（変化時にスケールトランジション） */}
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <span
            className="age-display"
            style={{
              fontFamily: "'Stick', sans-serif",
              fontSize: 64,
              color: "#FF6BE8",
              lineHeight: 1,
            }}
          >
            {profile.realAge}
          </span>
          <span style={{ fontSize: 16, color: "#C026A3", fontWeight: 700 }}>歳</span>
        </div>

        {/* スライダー（カスタムトラック + アクセントライン） */}
        <div style={{ position: "relative", padding: "0 0 4px" }}>
          <input
            type="range"
            min={8}
            max={100}
            value={profile.realAge}
            onChange={(e) => setRealAge(Number(e.target.value))}
            className="profile-slider"
            style={{ width: "100%", margin: "8px 0", position: "relative", zIndex: 2 }}
          />
          {/* トラック上のアクセントライン（値の位置まで色付き） */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              height: 6,
              borderRadius: 4,
              marginTop: -3,
              width: `${sliderPercent}%`,
              background: "linear-gradient(90deg, #FF6BE8, #C45AFF)",
              pointerEvents: "none",
              zIndex: 1,
              transition: "width .05s linear",
              opacity: 0.7,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#B07CC8", marginTop: 4 }}>
          <span>8歳</span><span>100歳</span>
        </div>

        {renderNav({ showBack: true, onNext: () => setProfileStep(2) })}
        <style>{sliderCSS}</style>
      </div>
    );
  };

  // ==================== Step 2: 恋愛経験 ====================
  // staggered fadeUp + ホバーtransform + 選択時popBounce
  const renderStep2 = () => (
    <div className="animate-fadeUp">
      {renderHeader(3, "恋愛経験は\nどのくらい？", "経験が愛着スタイルの形成に影響します。\n（Hazan & Shaver 1987 / 関係経験と内的作業モデル）")}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {EXP_OPTIONS.map((opt, idx) => {
          const isSelected = profile.exp === opt.value;
          const isHovered = hoveredCard === `exp-${opt.value}`;
          const isBouncing = bouncingCard === `exp-${opt.value}`;

          return (
            <div
              key={opt.value}
              // staggered fadeUp（0.1秒ずつ遅延して順番に登場）+ 選択時popBounce
              className={[
                step2Entered ? `animate-stagger-${idx + 1}` : "",
                isBouncing ? "animate-popBounceRich" : "",
              ].filter(Boolean).join(" ")}
              style={{
                ...cardBase,
                borderRadius: 16,
                padding: "16px 12px",
                ...(isSelected ? cardSelected : {}),
                // ホバー時に浮き上がり + 影
                transform: isHovered && !isBouncing ? "translateY(-3px)" : "translateY(0)",
                boxShadow: isSelected
                  ? "0 0 20px rgba(255,107,232,.15)"
                  : isHovered
                    ? "0 6px 20px rgba(255,107,232,.12)"
                    : "none",
              }}
              onMouseEnter={() => setHoveredCard(`exp-${opt.value}`)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                setExp(opt.value);
                triggerBounce(`exp-${opt.value}`);
              }}
            >
              {/* 絵文字: 選択時にfloatアニメーション */}
              <span
                className={isSelected ? "animate-emojiFloat" : ""}
                style={{
                  fontSize: 28,
                  display: "block",
                  marginBottom: 6,
                  transition: "transform .3s ease",
                }}
              >
                {opt.emoji}
              </span>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#5B2D6E", marginBottom: 2 }}>{opt.label}</div>
              <div style={{ fontSize: 10, color: "#8B7A9E" }}>{opt.sub}</div>
            </div>
          );
        })}
      </div>

      {renderNav({
        showBack: true,
        nextLabel: "診断スタート",
        disabled: profile.exp === null,
        onNext: () => setCurrentStep("quiz"),
      })}
    </div>
  );

  // --- ステップルーティング ---
  const steps = [renderStep0, renderStep1, renderStep2];

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px 100px" }}>
      {renderDots()}
      {steps[profileStep]()}
    </div>
  );
}

// ---------- スライダーのカスタムCSS（サムにglowトランジション追加） ----------

const sliderCSS = `
  .profile-slider {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }
  .profile-slider::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 4px;
    background: rgba(255,255,255,.1);
  }
  .profile-slider::-moz-range-track {
    height: 6px;
    border-radius: 4px;
    background: rgba(255,255,255,.1);
    border: none;
  }
  .profile-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF6BE8, #C45AFF);
    border: none;
    margin-top: -10px;
    box-shadow: 0 2px 12px rgba(255,107,232,.35);
    transition: box-shadow .2s ease, transform .15s ease;
  }
  .profile-slider::-moz-range-thumb {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF6BE8, #C45AFF);
    border: none;
    box-shadow: 0 2px 12px rgba(255,107,232,.35);
    transition: box-shadow .2s ease, transform .15s ease;
  }
`;
