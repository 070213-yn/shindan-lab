"use client";

/**
 * プロフィール入力コンポーネント（3ステップ）
 *
 * profileStep 0: 性別選択
 * profileStep 1: 実年齢（スライダー）
 * profileStep 2: 恋愛経験（4択）→ 診断スタートへ
 */

import { useState } from "react";
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

// カード選択のアニメーション: smooth cubic-bezierに変更
const cardBase: React.CSSProperties = {
  background: "rgba(255,255,255,.04)",
  border: "2px solid rgba(255,107,232,.2)",
  borderRadius: 20,
  padding: "20px 16px",
  cursor: "pointer",
  textAlign: "center",
  transition: "all .2s cubic-bezier(.25,.1,.25,1)",
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
  transition: "opacity .2s",
};

const btnBack: React.CSSProperties = {
  padding: "14px 28px",
  borderRadius: 50,
  border: "1px solid rgba(255,107,232,.25)",
  background: "transparent",
  color: "#C8AEED",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "'Zen Maru Gothic', sans-serif",
  transition: "color .2s, border-color .2s",
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

  // --- ステップドット ---
  const renderDots = () => (
    <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 4,
            borderRadius: 2,
            width: i === profileStep ? 40 : 28,
            background:
              i === profileStep ? DOT_ACTIVE : i < profileStep ? DOT_DONE : DOT_TODO,
            transition: "all .3s ease",
          }}
        />
      ))}
    </div>
  );

  // --- ステップ共通ヘッダー（\nを<br />に変換して表示） ---
  const renderHeader = (stepNum: number, title: string, desc?: string) => (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "rgba(255,107,232,.5)", marginBottom: 6 }}>
        STEP {stepNum} / {TOTAL_STEPS}
      </p>
      <h2 style={{ fontFamily: "'Stick', sans-serif", fontSize: 26, color: "#FF6BE8", lineHeight: 1.3, marginBottom: 6 }}>
        {/* タイトル内の\nを<br />に変換 */}
        {title.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </h2>
      {desc && (
        <p style={{ fontSize: 13, color: "#C8AEED", lineHeight: 1.8 }}>
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

  // --- ナビゲーションボタン（戻るボタンにhoverスタイル追加） ---
  const renderNav = (opts: {
    showBack?: boolean;
    nextLabel?: string;
    disabled?: boolean;
    onNext: () => void;
  }) => (
    <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
      {opts.showBack && (
        <button
          style={{
            ...btnBack,
            // ホバー時: テキストとボーダーを明るくする
            color: backHovered ? "#FF6BE8" : "#C8AEED",
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
        style={{
          ...btnBase,
          flex: 1,
          opacity: opts.disabled ? 0.4 : 1,
          pointerEvents: opts.disabled ? "none" : "auto",
          // 「次へ」ボタンのbox-shadow: 控えめに調整
          boxShadow: opts.disabled ? "none" : "0 4px 20px rgba(255,107,232,.25)",
        }}
        onClick={opts.onNext}
      >
        {opts.nextLabel ?? "次へ →"}
      </button>
    </div>
  );

  // ==================== Step 0: 性別選択 ====================
  const renderStep0 = () => (
    <div className="animate-fadeUp">
      {renderHeader(1, "あなたの性別を\n教えてください", "性別によって、恋愛心理の分析アルゴリズムが変わります。\n（Buss進化心理学・ホルモン研究参考）")}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {GENDERS.slice(0, 2).map((g) => (
          <div
            key={g.value}
            style={{ ...cardBase, ...(profile.gender === g.value ? cardSelected : {}) }}
            onClick={() => setGender(g.value)}
          >
            <span style={{ fontSize: 42, display: "block", marginBottom: 8 }}>{g.emoji}</span>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{g.label}</div>
          </div>
        ))}
      </div>

      <div
        style={{ ...cardBase, ...(profile.gender === "other" ? cardSelected : {}) }}
        onClick={() => setGender("other")}
      >
        <span style={{ fontSize: 42, display: "block", marginBottom: 8 }}>{GENDERS[2].emoji}</span>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{GENDERS[2].label}</div>
      </div>

      {renderNav({ disabled: profile.gender === null, onNext: () => setProfileStep(1) })}
    </div>
  );

  // ==================== Step 1: 実年齢 ====================
  const renderStep1 = () => (
    <div className="animate-fadeUp">
      {renderHeader(2, "実年齢を\n教えてください", "年齢によって、重視する恋愛スタイルや\n相性の重みが変わります。（Erikson発達段階理論参考）")}

      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <span style={{ fontFamily: "'Stick', sans-serif", fontSize: 64, color: "#FF6BE8", lineHeight: 1 }}>
          {profile.realAge}
        </span>
        <span style={{ fontSize: 16, color: "rgba(255,107,232,.6)", fontWeight: 700 }}>歳</span>
      </div>

      <input
        type="range"
        min={13}
        max={60}
        value={profile.realAge}
        onChange={(e) => setRealAge(Number(e.target.value))}
        className="profile-slider"
        style={{ width: "100%", margin: "8px 0" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,107,232,.4)", marginTop: 4 }}>
        <span>13歳</span><span>60歳</span>
      </div>

      {renderNav({ showBack: true, onNext: () => setProfileStep(2) })}
      <style>{sliderCSS}</style>
    </div>
  );

  // ==================== Step 2: 恋愛経験 ====================
  const renderStep2 = () => (
    <div className="animate-fadeUp">
      {renderHeader(3, "恋愛経験は\nどのくらい？", "経験が愛着スタイルの形成に影響します。\n（Hazan & Shaver 1987 / 関係経験と内的作業モデル）")}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {EXP_OPTIONS.map((opt) => (
          <div
            key={opt.value}
            style={{
              ...cardBase,
              borderRadius: 16,
              padding: "16px 12px",
              ...(profile.exp === opt.value ? cardSelected : {}),
            }}
            onClick={() => setExp(opt.value)}
          >
            <span style={{ fontSize: 28, display: "block", marginBottom: 6 }}>{opt.emoji}</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{opt.label}</div>
            <div style={{ fontSize: 10, color: "#C8AEED" }}>{opt.sub}</div>
          </div>
        ))}
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

// ---------- スライダーのカスタムCSS（サムのbox-shadow控えめに調整） ----------

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
    box-shadow: 0 2px 10px rgba(255,107,232,.3);
  }
  .profile-slider::-moz-range-thumb {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF6BE8, #C45AFF);
    border: none;
    box-shadow: 0 2px 10px rgba(255,107,232,.3);
  }
`;
