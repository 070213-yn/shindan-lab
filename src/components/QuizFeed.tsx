"use client";

/**
 * QuizFeed — スクロール形式の43問診断フィード
 *
 * 全質問をカード形式で縦に並べ、回答するとスムーズに次の未回答へスクロール。
 * 全問回答後にCTAボタンが有効化され、結果画面へ遷移する。
 */

import { useQuizStore } from "@/store/quizStore";
import { QUESTIONS, SECTION_NAMES } from "@/lib/questions";
import { useRef } from "react";

/** 5段階の選択肢ラベル */
const SCALE_LABELS = ["思わない", "やや違う", "どちらでも", "ややそう", "そう思う"];

export default function QuizFeed() {
  const { answers, setAnswer, setCurrentStep } = useQuizStore();

  // 各質問カードへのref（スムーズスクロール用）
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 回答済みの数
  const answeredCount = answers.filter((a) => a !== null).length;
  const totalCount = QUESTIONS.length; // 43
  const allAnswered = answeredCount === totalCount;

  // --- 選択ハンドラ ---
  const handleSelect = (qIndex: number, value: number) => {
    setAnswer(qIndex, value);

    // 次の未回答質問へスムーズスクロール
    const nextUnanswered = answers.findIndex(
      (a, i) => a === null && i !== qIndex
    );
    if (nextUnanswered !== -1 && cardRefs.current[nextUnanswered]) {
      // 少し遅延させてからスクロール（state更新後にUIが反映されるのを待つ）
      setTimeout(() => {
        cardRefs.current[nextUnanswered]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 180);
    }
  };

  // --- CTA押下 ---
  const handleSubmit = () => {
    if (!allAnswered) return;
    setCurrentStep("name");
  };

  // --- セクション区切りの挿入判定 ---
  // 各質問の前に、セクションが変わるタイミングで区切りを表示する
  const shouldShowSection = (index: number): boolean => {
    if (index === 0) return true;
    return QUESTIONS[index].sid !== QUESTIONS[index - 1].sid;
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#080012", color: "#fff" }}
    >
      {/* ===== ヘッダー (sticky) ===== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(8,0,18,.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,107,232,.15)",
          padding: "12px 20px 10px",
        }}
      >
        {/* 上段: タイトル & 閉じるボタン */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            className="font-stick"
            style={{ fontSize: 16, color: "#FF6BE8" }}
          >
            ときめきラボ 診断
          </span>
          <button
            onClick={() => window.history.back()}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,.55)",
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            &#10005; 閉じる
          </button>
        </div>

        {/* プログレスバー */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,.08)",
              height: 5,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(answeredCount / totalCount) * 100}%`,
                background: "linear-gradient(90deg,#FF6BE8,#C45AFF)",
                borderRadius: 4,
                transition: "width .35s ease",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#FF6BE8",
              whiteSpace: "nowrap",
            }}
          >
            {answeredCount} / {totalCount}
          </span>
        </div>
      </header>

      {/* ===== フィード本体 ===== */}
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "24px 20px 160px",
        }}
      >
        {QUESTIONS.map((q, idx) => (
          <div key={idx}>
            {/* --- セクション区切り --- */}
            {shouldShowSection(idx) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  margin: idx === 0 ? "0 0 20px" : "36px 0 20px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(255,107,232,.12)",
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: 3,
                    color: "rgba(255,107,232,.55)",
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                  }}
                >
                  SECTION {q.sid} &mdash; {SECTION_NAMES[q.sid]}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(255,107,232,.12)",
                  }}
                />
              </div>
            )}

            {/* --- 質問カード --- */}
            <div
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{
                background:
                  answers[idx] !== null
                    ? "rgba(255,107,232,.05)"
                    : "rgba(255,255,255,.035)",
                border: `1px solid ${
                  answers[idx] !== null
                    ? "rgba(255,107,232,.35)"
                    : "rgba(255,107,232,.15)"
                }`,
                borderRadius: 18,
                padding: 18,
                marginBottom: 14,
                transition: "border-color .3s, background .3s",
              }}
            >
              {/* 質問番号 */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2.5,
                  color: "rgba(255,107,232,.45)",
                  marginBottom: 6,
                }}
              >
                Q{String(idx + 1).padStart(2, "0")}
              </div>

              {/* 質問文 */}
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.65,
                  margin: "0 0 6px",
                }}
              >
                {q.text}
              </p>

              {/* 出典 */}
              <p
                style={{
                  fontSize: 9.5,
                  color: "rgba(196,90,255,.45)",
                  margin: "0 0 14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {q.source}
              </p>

              {/* 5段階選択ボタン */}
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map((val) => {
                  const isSelected = answers[idx] === val;
                  return (
                    <button
                      key={val}
                      onClick={() => handleSelect(idx, val)}
                      style={{
                        flex: 1,
                        height: 52,
                        borderRadius: 12,
                        border: isSelected
                          ? "1.5px solid #FF6BE8"
                          : "1.5px solid rgba(255,107,232,.18)",
                        background: isSelected
                          ? "linear-gradient(135deg,rgba(255,107,232,.28),rgba(196,90,255,.18))"
                          : "rgba(255,255,255,.04)",
                        color: isSelected ? "#fff" : "#C8AEED",
                        boxShadow: isSelected
                          ? "0 0 14px rgba(255,107,232,.3)"
                          : "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        padding: 0,
                        transition:
                          "border-color .2s, background .2s, box-shadow .2s",
                      }}
                    >
                      {/* 数字（font-stick） */}
                      <span className="font-stick" style={{ fontSize: 18 }}>
                        {val}
                      </span>
                      {/* ラベル */}
                      <span style={{ fontSize: 8, lineHeight: 1.1 }}>
                        {SCALE_LABELS[val - 1]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== 固定CTA ===== */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background:
            "linear-gradient(to top, rgba(8,0,18,1) 60%, transparent)",
          padding: "16px 20px",
          zIndex: 20,
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={allAnswered ? "btn-gradient" : ""}
            style={{
              width: "100%",
              borderRadius: 50,
              padding: 17,
              border: "none",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              cursor: allAnswered ? "pointer" : "default",
              opacity: allAnswered ? 1 : 0.4,
              background: allAnswered
                ? "linear-gradient(135deg,#FF6BE8,#C45AFF)"
                : "linear-gradient(135deg,#FF6BE8,#C45AFF)",
              animation: allAnswered ? "ctaPulse 2s ease-in-out infinite" : "none",
              transition: "opacity .3s",
            }}
          >
            {allAnswered
              ? "全問回答完了！結果を見る"
              : `あと ${totalCount - answeredCount} 問`}
          </button>
        </div>
      </div>

      {/* CTAパルスアニメーション */}
      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,232,.45); }
          50%      { box-shadow: 0 0 24px 6px rgba(255,107,232,.35); }
        }
      `}</style>
    </div>
  );
}
