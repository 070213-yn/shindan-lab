"use client";

/**
 * 診断ページ（/quiz）
 * 青春 x 爽やか x 透明感スタイル
 *
 * 診断フロー全体を管理するページ。
 * currentStep に応じて profile → quiz → name → loading → result と画面を切り替える。
 */

import { useEffect, useState } from "react";
import Link from "next/link";
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

  // ---------- 名前送信ハンドラ ----------
  const handleNameSubmit = () => {
    setCrushName(nameInput.trim());
    setCurrentStep("loading");
  };

  return (
    <div className="bg-fresh-pattern" style={{ background: "#F0FAFA", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* ===== ホームに戻るボタン ===== */}
      <div style={{ position: "relative", zIndex: 2, padding: "16px 20px 0" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(45,212,191,0.2)",
            color: "#2dd4bf",
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ fontSize: 14 }}>&#8592;</span>
          ホームに戻る
        </Link>
      </div>

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
              background: "#F0FAFA",
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
                style={{ fontSize: 26, color: "#2dd4bf", marginBottom: 12 }}
              >
                最後に一つだけ
              </h2>

              {/* 説明テキスト */}
              <p
                style={{
                  color: "#4a6572",
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
                  background: "rgba(255,255,255,.8)",
                  border: "1px solid rgba(45,212,191,.3)",
                  borderRadius: 14,
                  color: "#1a2e3b",
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
                  color: "#6b8a99",
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
