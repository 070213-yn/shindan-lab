"use client";

/**
 * ローディング演出コンポーネント
 *
 * 約6秒間のオーブアニメーションとステップ表示で
 * 診断結果を「分析中」の演出をする。
 * 完了後にcurrentStepを'result'に遷移させる。
 */

import { useEffect, useState } from "react";
import { useQuizStore } from "@/store/quizStore";

/** ステップ表示用のラベル一覧 */
const STEP_LABELS = [
  "愛着スタイルを解析中",
  "8次元スコアを算出中",
  "12タイプを判定中",
  "相性マトリクスを計算中",
  "アドバイスを生成中",
  "シェア画像を作成中",
];

/** 各ステップがアクティブになるタイミング（ms） */
const STEP_ACTIVE_TIMES = [500, 1300, 2200, 3100, 4000, 4800];

/** アクティブ→完了になるまでの追加時間（ms） */
const STEP_DONE_DELAY = 650;

export default function LoadingOrb() {
  const { crushName, setCurrentStep } = useQuizStore();
  const displayName = crushName || "あの人";

  // プログレスバーのパーセント（0〜100）
  const [percent, setPercent] = useState(0);
  // 各ステップの状態: 'waiting' | 'active' | 'done'
  const [stepStates, setStepStates] = useState<string[]>(
    Array(6).fill("waiting")
  );

  useEffect(() => {
    // --- パーセントカウンター（60msごとに自然に上がる） ---
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) return 100;
        // 約6秒で100%になるよう、60ms間隔で約1.7ずつ増加
        return Math.min(prev + 1.7, 99);
      });
    }, 60);

    // --- ステップアクティブ化タイマー ---
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEP_ACTIVE_TIMES.forEach((time, i) => {
      // アクティブにする
      timers.push(
        setTimeout(() => {
          setStepStates((prev) => {
            const next = [...prev];
            next[i] = "active";
            return next;
          });
        }, time)
      );
      // 完了にする
      timers.push(
        setTimeout(() => {
          setStepStates((prev) => {
            const next = [...prev];
            next[i] = "done";
            return next;
          });
        }, time + STEP_DONE_DELAY)
      );
    });

    // --- 最終遷移: 5800msで100%、さらに600ms後にresultへ ---
    timers.push(
      setTimeout(() => {
        setPercent(100);
      }, 5800)
    );
    timers.push(
      setTimeout(() => {
        setCurrentStep("result");
      }, 6400)
    );

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [setCurrentStep]);

  return (
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
        {/* タイトル: 〇〇との相性を分析中… */}
        <p
          className="font-stick"
          style={{ fontSize: 22, color: "#FF6BE8", marginBottom: 6 }}
        >
          {displayName}との相性を分析中…
        </p>

        {/* サブテキスト */}
        <p style={{ fontSize: 13, color: "#D4B8F5", marginBottom: 28 }}>
          43問・8次元のデータを宇宙が演算中
        </p>

        {/* ===== オーブアニメーション ===== */}
        <div
          style={{
            width: 110,
            height: 110,
            margin: "0 auto 32px",
            position: "relative",
          }}
        >
          {/* 外周リング1 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(255,107,232,.3)",
              animation: "glowPulse 2s ease-in-out infinite",
            }}
          />
          {/* 外周リング2 */}
          <div
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: "50%",
              border: "1px solid rgba(196,90,255,.2)",
              animation: "glowPulse 2.5s 0.5s ease-in-out infinite",
            }}
          />

          {/* 回転リング1: ピンク */}
          <div
            style={{
              position: "absolute",
              inset: 22,
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#FF6BE8",
              animation: "spin360 1.9s linear infinite",
            }}
          />
          {/* 回転リング2: 紫（逆回転） */}
          <div
            style={{
              position: "absolute",
              inset: 34,
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#C45AFF",
              animation: "spin360 2.5s linear infinite reverse",
            }}
          />
          {/* 回転リング3: 青紫 */}
          <div
            style={{
              position: "absolute",
              inset: 46,
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#7B5CFF",
              animation: "spin360 3.3s linear infinite",
            }}
          />

          {/* 中央コア */}
          <div
            style={{
              position: "absolute",
              inset: 42,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #FF6BE8 0%, #C45AFF 50%, #7B5CFF 100%)",
              boxShadow:
                "0 0 20px rgba(255,107,232,.6), 0 0 40px rgba(196,90,255,.3)",
              animation: "coreBeat 1.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* ===== ステップリスト ===== */}
        <div style={{ marginBottom: 28, textAlign: "left", maxWidth: 260, margin: "0 auto 28px" }}>
          {STEP_LABELS.map((label, i) => {
            const state = stepStates[i];
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  marginBottom: 8,
                  transition: "opacity 0.3s",
                }}
              >
                {/* ドット or チェックマーク */}
                {state === "done" ? (
                  <span
                    style={{
                      width: 16,
                      display: "inline-flex",
                      justifyContent: "center",
                      color: "rgba(255,107,232,.6)",
                      fontSize: 12,
                    }}
                  >
                    ✓
                  </span>
                ) : (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      marginLeft: 5,
                      marginRight: 5,
                      flexShrink: 0,
                      background:
                        state === "active"
                          ? "#FF6BE8"
                          : "rgba(208,184,245,.3)",
                      boxShadow:
                        state === "active"
                          ? "0 0 8px rgba(255,107,232,.6)"
                          : "none",
                      animation:
                        state === "active"
                          ? "dotPulse 1s ease-in-out infinite"
                          : "none",
                      transition: "all 0.3s",
                    }}
                  />
                )}

                {/* テキスト */}
                <span
                  style={{
                    fontSize: 13,
                    color: state === "active" ? "#fff" : "#D0B8F5",
                    fontWeight: state === "active" ? 700 : 400,
                    transition: "all 0.3s",
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ===== パーセント表示 ===== */}
        <p
          className="font-stick"
          style={{ fontSize: 50, color: "#FF6BE8", marginBottom: 12 }}
        >
          {Math.round(percent)}%
        </p>

        {/* ===== プログレスバー ===== */}
        <div
          style={{
            width: "100%",
            height: 6,
            background: "rgba(255,255,255,.08)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              background: "linear-gradient(90deg, #FF6BE8, #C45AFF, #7B5CFF)",
              borderRadius: 3,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* ===== CSSアニメーション定義 ===== */}
        <style>{`
          @keyframes spin360 {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50%      { opacity: 1;   transform: scale(1.06); }
          }
          @keyframes coreBeat {
            0%, 100% { transform: scale(1);    opacity: 0.9; }
            50%      { transform: scale(1.15); opacity: 1; }
          }
          @keyframes dotPulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50%      { opacity: 1;   transform: scale(1.4); }
          }
        `}</style>
      </div>
    </div>
  );
}
