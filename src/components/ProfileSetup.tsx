"use client";

/**
 * プロフィール入力コンポーネント（5ステップ）
 *
 * profileStep 0: 性別選択
 * profileStep 1: 実年齢（スライダー）
 * profileStep 2: 精神年齢（スライダー + 差分表示）
 * profileStep 3: 恋愛経験（4択）
 * profileStep 4: 現在の状況（5択）→ 診断スタートへ
 */

import { useQuizStore } from "@/store/quizStore";

// ---------- 定数 ----------

/** ステップドットの色定義 */
const DOT_ACTIVE = "#FF6BE8";
const DOT_DONE = "rgba(255,107,232,.45)";
const DOT_TODO = "rgba(255,107,232,.15)";

/** 性別の選択肢 */
const GENDERS = [
  { value: "female" as const, label: "女性", emoji: "👩" },
  { value: "male" as const, label: "男性", emoji: "👨" },
  { value: "other" as const, label: "その他", emoji: "🌈" },
];

/** 恋愛経験の選択肢 */
const EXP_OPTIONS = [
  { value: "none" as const, label: "まだない", emoji: "🌱" },
  { value: "little" as const, label: "少しある", emoji: "🌸" },
  { value: "some" as const, label: "そこそこある", emoji: "💝" },
  { value: "rich" as const, label: "豊富にある", emoji: "💎" },
];

/** 現在の状況の選択肢 */
const STATUS_OPTIONS = [
  { value: "crush" as const, label: "片思い中", emoji: "💘" },
  { value: "single" as const, label: "恋人なし", emoji: "🔍" },
  { value: "dating" as const, label: "恋人あり", emoji: "💑" },
  { value: "healing" as const, label: "失恋・回復中", emoji: "🌙" },
  { value: "notready" as const, label: "今は恋愛より自分の時間", emoji: "🕊️" },
];

// ---------- 共通スタイル ----------

/** 選択カードの基本スタイル */
const cardBase: React.CSSProperties = {
  background: "rgba(255,255,255,.04)",
  border: "2px solid rgba(255,107,232,.2)",
  borderRadius: 20,
  padding: "20px 16px",
  cursor: "pointer",
  textAlign: "center",
  transition: "all .25s ease",
};

/** 選択済みカードのスタイル */
const cardSelected: React.CSSProperties = {
  borderColor: "#FF6BE8",
  background:
    "linear-gradient(135deg,rgba(255,107,232,.2),rgba(196,90,255,.12))",
};

/** メインボタン共通スタイル */
const btnBase: React.CSSProperties = {
  padding: "14px 36px",
  borderRadius: 16,
  border: "none",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  color: "#fff",
  background: "linear-gradient(135deg,#FF6BE8,#C45AFF)",
  transition: "opacity .2s",
};

/** 戻るボタン共通スタイル */
const btnBack: React.CSSProperties = {
  padding: "14px 28px",
  borderRadius: 16,
  border: "1px solid rgba(255,107,232,.3)",
  background: "transparent",
  color: "rgba(255,255,255,.6)",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
};

// ---------- 精神年齢の差分テキストを返すヘルパー ----------

function mentalDiffLabel(diff: number): string {
  if (diff >= 8) return "かなり大人っぽい";
  if (diff >= 4) return "少し大人っぽい";
  if (diff <= -8) return "かなり若々しい";
  if (diff <= -4) return "少し若々しい";
  return "ほぼ同じ";
}

// ---------- コンポーネント本体 ----------

export default function ProfileSetup() {
  const {
    profile,
    profileStep,
    setGender,
    setRealAge,
    setMentalAge,
    setExp,
    setStatus,
    setProfileStep,
    setCurrentStep,
  } = useQuizStore();

  // --- ステップドット ---
  const renderDots = () => (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 4,
            borderRadius: 2,
            width: i === profileStep ? 40 : 20,
            background:
              i === profileStep ? DOT_ACTIVE : i < profileStep ? DOT_DONE : DOT_TODO,
            transition: "all .3s ease",
          }}
        />
      ))}
    </div>
  );

  // --- ステップ共通ヘッダー ---
  const renderHeader = (stepNum: number, title: string, desc?: string) => (
    <div className="text-center mb-8">
      <p
        style={{
          fontSize: 10,
          letterSpacing: 3,
          color: "rgba(255,107,232,.5)",
          marginBottom: 10,
        }}
      >
        STEP {stepNum} / 5
      </p>
      <h2
        style={{
          fontFamily: "'Stick', sans-serif",
          fontSize: 26,
          color: "#FF6BE8",
          margin: "0 0 12px",
        }}
      >
        {title}
      </h2>
      {desc && (
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>
          {desc}
        </p>
      )}
    </div>
  );

  // --- ナビゲーションボタン ---
  const renderNav = (opts: {
    showBack?: boolean;
    nextLabel?: string;
    disabled?: boolean;
    onNext: () => void;
  }) => (
    <div className="flex justify-center gap-3 mt-10">
      {opts.showBack && (
        <button style={btnBack} onClick={() => setProfileStep(profileStep - 1)}>
          &larr; 戻る
        </button>
      )}
      <button
        style={{
          ...btnBase,
          opacity: opts.disabled ? 0.4 : 1,
          pointerEvents: opts.disabled ? "none" : "auto",
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
      {renderHeader(1, "あなたの性別を教えてください", "性別によって、恋愛心理の分析アルゴリズムが変わります。")}

      {/* 2列グリッド: 女性 / 男性 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {GENDERS.slice(0, 2).map((g) => (
          <div
            key={g.value}
            style={{
              ...cardBase,
              ...(profile.gender === g.value ? cardSelected : {}),
            }}
            onClick={() => setGender(g.value)}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{g.emoji}</div>
            <div style={{ fontSize: 15, color: "#fff", fontWeight: 600 }}>{g.label}</div>
          </div>
        ))}
      </div>

      {/* 全幅: その他 */}
      <div
        style={{
          ...cardBase,
          ...(profile.gender === "other" ? cardSelected : {}),
        }}
        onClick={() => setGender("other")}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>{GENDERS[2].emoji}</div>
        <div style={{ fontSize: 15, color: "#fff", fontWeight: 600 }}>
          {GENDERS[2].label}
        </div>
      </div>

      {renderNav({
        disabled: profile.gender === null,
        onNext: () => setProfileStep(1),
      })}
    </div>
  );

  // ==================== Step 1: 実年齢 ====================
  const renderStep1 = () => (
    <div className="animate-fadeUp">
      {renderHeader(2, "あなたの年齢は？")}

      {/* 大きく年齢表示 */}
      <div className="text-center mb-8">
        <span
          style={{
            fontFamily: "'Stick', sans-serif",
            fontSize: 64,
            color: "#FF6BE8",
          }}
        >
          {profile.realAge}
        </span>
        <span
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,.5)",
            marginLeft: 4,
          }}
        >
          歳
        </span>
      </div>

      {/* スライダー */}
      <div className="px-2">
        <input
          type="range"
          min={13}
          max={60}
          value={profile.realAge}
          onChange={(e) => {
            const v = Number(e.target.value);
            setRealAge(v);
            // 精神年齢の初期値を実年齢に合わせる（まだStep2に行っていない場合）
            if (profileStep === 1) setMentalAge(v);
          }}
          className="profile-slider w-full"
        />
      </div>

      {renderNav({
        showBack: true,
        onNext: () => setProfileStep(2),
      })}

      {/* スライダーカスタムCSS */}
      <style>{sliderCSS}</style>
    </div>
  );

  // ==================== Step 2: 精神年齢 ====================
  const renderStep2 = () => {
    const diff = profile.mentalAge - profile.realAge;
    const sign = diff > 0 ? "+" : "";

    return (
      <div className="animate-fadeUp">
        {renderHeader(
          3,
          "精神年齢は？",
          "自分の「心の年齢」だと思う数字を選んでください。"
        )}

        {/* 大きく精神年齢表示 */}
        <div className="text-center mb-6">
          <span
            style={{
              fontFamily: "'Stick', sans-serif",
              fontSize: 64,
              color: "#FF6BE8",
            }}
          >
            {profile.mentalAge}
          </span>
          <span
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,.5)",
              marginLeft: 4,
            }}
          >
            歳
          </span>
        </div>

        {/* 差分表示ボックス */}
        <div
          style={{
            background: "rgba(255,107,232,.08)",
            border: "1px solid rgba(255,107,232,.2)",
            borderRadius: 14,
            padding: "12px 16px",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>
            実年齢との差: {sign}{diff} — {mentalDiffLabel(diff)}
          </span>
        </div>

        {/* スライダー */}
        <div className="px-2">
          <input
            type="range"
            min={10}
            max={70}
            value={profile.mentalAge}
            onChange={(e) => setMentalAge(Number(e.target.value))}
            className="profile-slider w-full"
          />
        </div>

        {renderNav({
          showBack: true,
          onNext: () => setProfileStep(3),
        })}

        <style>{sliderCSS}</style>
      </div>
    );
  };

  // ==================== Step 3: 恋愛経験 ====================
  const renderStep3 = () => (
    <div className="animate-fadeUp">
      {renderHeader(4, "恋愛経験は？")}

      <div className="grid grid-cols-2 gap-3">
        {EXP_OPTIONS.map((opt) => (
          <div
            key={opt.value}
            style={{
              ...cardBase,
              ...(profile.exp === opt.value ? cardSelected : {}),
            }}
            onClick={() => setExp(opt.value)}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{opt.emoji}</div>
            <div style={{ fontSize: 15, color: "#fff", fontWeight: 600 }}>
              {opt.label}
            </div>
          </div>
        ))}
      </div>

      {renderNav({
        showBack: true,
        disabled: profile.exp === null,
        onNext: () => setProfileStep(4),
      })}
    </div>
  );

  // ==================== Step 4: 現在の状況 ====================
  const renderStep4 = () => (
    <div className="animate-fadeUp">
      {renderHeader(5, "今の恋愛状況は？")}

      <div className="flex flex-col gap-3">
        {STATUS_OPTIONS.map((opt) => (
          <div
            key={opt.value}
            style={{
              ...cardBase,
              display: "flex",
              alignItems: "center",
              gap: 14,
              textAlign: "left",
              padding: "16px 20px",
              ...(profile.status === opt.value ? cardSelected : {}),
            }}
            onClick={() => setStatus(opt.value)}
          >
            <span style={{ fontSize: 28 }}>{opt.emoji}</span>
            <span style={{ fontSize: 15, color: "#fff", fontWeight: 600 }}>
              {opt.label}
            </span>
          </div>
        ))}
      </div>

      {renderNav({
        showBack: true,
        nextLabel: "診断スタート",
        disabled: profile.status === null,
        onNext: () => setCurrentStep("quiz"),
      })}
    </div>
  );

  // --- ステップルーティング ---
  const steps = [renderStep0, renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px 100px" }}>
      {renderDots()}
      {steps[profileStep]()}
    </div>
  );
}

// ---------- スライダーのカスタムCSS ----------

const sliderCSS = `
  .profile-slider {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }

  /* トラック */
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

  /* サム（つまみ） */
  .profile-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF6BE8, #C45AFF);
    border: none;
    margin-top: -10px;
    box-shadow: 0 2px 8px rgba(255,107,232,.4);
  }
  .profile-slider::-moz-range-thumb {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF6BE8, #C45AFF);
    border: none;
    box-shadow: 0 2px 8px rgba(255,107,232,.4);
  }
`;
