"use client";

/**
 * 診断ページ（/quiz）
 *
 * 診断フロー全体を管理するページ。
 * currentStep に応じて profile → quiz → name → loading → result と画面を切り替える。
 */

import { useEffect, useState, useMemo } from "react";
import { useQuizStore } from "@/store/quizStore";
import ProfileSetup from "@/components/ProfileSetup";
import QuizFeed from "@/components/QuizFeed";
import LoadingOrb from "@/components/LoadingOrb";
import ResultView from "@/components/ResultView";

export default function QuizPage() {
  const { currentStep, setCrushName, setCurrentStep } = useQuizStore();

  // 名前入力用のローカルステート
  const [nameInput, setNameInput] = useState("");

  // ページ訪問時にprofileステップから開始
  useEffect(() => {
    setCurrentStep("profile");
  }, []);

  // ---------- 星空パーティクル（100個）をメモ化 ----------
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.5, // 0.5〜3px
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 3}s`,
      })),
    []
  );

  // ---------- 名前送信ハンドラ ----------
  const handleNameSubmit = () => {
    setCrushName(nameInput.trim());
    setCurrentStep("loading");
  };

  return (
    <div style={{ background: "#0D0118", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* ===== 背景エフェクト：星空パーティクル ===== */}
      <div
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
        aria-hidden="true"
      >
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

      {/* ===== 背景エフェクト：ブロブ2つ ===== */}
      <div
        style={{
          position: "fixed",
          top: "15%",
          left: "-10%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,90,255,.25), transparent 70%)",
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
          background: "radial-gradient(circle, rgba(255,107,232,.2), transparent 70%)",
          filter: "blur(60px)",
          animation: "blobFloat 10s 2s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ===== メインコンテンツ ===== */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ステップ1: プロフィール設定 */}
        {currentStep === "profile" && <ProfileSetup />}

        {/* ステップ2: 診断クイズ */}
        {currentStep === "quiz" && <QuizFeed />}

        {/* ステップ3: 好きな人の名前入力 */}
        {currentStep === "name" && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "#0D0118",
              zIndex: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                padding: "0 24px",
                textAlign: "center",
              }}
            >
              {/* 絵文字アイコン */}
              <div style={{ fontSize: 64, marginBottom: 20 }}>💌</div>

              {/* 見出し */}
              <h2
                className="font-stick"
                style={{ fontSize: 26, color: "#FF6BE8", marginBottom: 12 }}
              >
                最後に一つだけ
              </h2>

              {/* 説明テキスト */}
              <p
                style={{
                  color: "rgba(255,255,255,.7)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                気になるあの人の名前を教えてください。
                <br />
                結果画面でちょっとだけ特別な演出があります。
              </p>

              {/* テキスト入力 */}
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="例：たくみくん（空白でもOK）"
                maxLength={12}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,107,232,.3)",
                  borderRadius: 14,
                  color: "#fff",
                  fontSize: 16,
                  outline: "none",
                  marginBottom: 24,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNameSubmit();
                }}
              />

              {/* 送信ボタン */}
              <button
                className="btn-gradient"
                onClick={handleNameSubmit}
                style={{
                  width: "100%",
                  padding: "16px 0",
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                分析スタート！
              </button>

              {/* 注記 */}
              <p
                style={{
                  color: "rgba(255,255,255,.4)",
                  fontSize: 12,
                  marginTop: 14,
                }}
              >
                入力は任意です
              </p>
            </div>
          </div>
        )}

        {/* ステップ4: ローディング */}
        {currentStep === "loading" && <LoadingOrb />}

        {/* ステップ5: 結果表示 */}
        {currentStep === "result" && <ResultView />}
      </div>
    </div>
  );
}
