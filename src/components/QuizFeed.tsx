"use client";

/**
 * QuizFeed — スクロール形式の43問診断フィード（演出強化版）
 *
 * 全質問をカード形式で縦に並べ、回答するとスムーズに次の未回答へスクロール。
 * IntersectionObserverによるフェードアップ、選択時パーティクル、
 * プログレスバーシマー、セクション区切りアニメーション等のリッチ演出を搭載。
 */

import { useQuizStore } from "@/store/quizStore";
import { QUESTIONS, SECTION_NAMES } from "@/lib/questions";
import { useRef, useEffect, useCallback, useState } from "react";

/** 5段階の選択肢ラベル */
const SCALE_LABELS = ["思わない", "やや違う", "どちらでも", "ややそう", "そう思う"];

/** セクションごとのアイコン（区切り表示用） */
const SECTION_ICONS: Record<number, string> = {
  1: "🔗",
  2: "💌",
  3: "🔥",
  4: "🏠",
  5: "👥",
  6: "🧭",
  7: "🌿",
  8: "🔮",
};

/**
 * 選択時にボタンからスパークルパーティクルを飛散させる関数
 * ボタンのDOM要素を基準に小さな光の粒を放射状に生成する
 */
function spawnSparkles(buttonEl: HTMLElement) {
  const rect = buttonEl.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  // 6個のパーティクルを生成
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("span");
    dot.className = "spark-dot";
    // 放射状にランダムな方向へ飛ばす
    const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
    const dist = 18 + Math.random() * 14;
    dot.style.cssText = `
      left: ${centerX}px;
      top: ${centerY}px;
      --sx: ${Math.cos(angle) * dist}px;
      --sy: ${Math.sin(angle) * dist}px;
      background: ${i % 2 === 0 ? "#FF6BE8" : "#C45AFF"};
    `;
    buttonEl.appendChild(dot);
    // アニメーション終了後にDOMから削除
    setTimeout(() => dot.remove(), 550);
  }
}

export default function QuizFeed() {
  const { answers, setAnswer, setCurrentStep } = useQuizStore();

  // 各質問カードへのref（スムーズスクロール用 & IntersectionObserver用）
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // popBounce中のボタンを追跡（qIndex-value形式のキー）
  const [bouncingKeys, setBouncingKeys] = useState<Set<string>>(new Set());
  // 前回のallAnswered状態を追跡（CTAテキスト変化のアニメーション発火用）
  const prevAllAnsweredRef = useRef(false);
  const [ctaAnimating, setCtaAnimating] = useState(false);

  // 回答済みの数
  const answeredCount = answers.filter((a) => a !== null).length;
  const totalCount = QUESTIONS.length;
  const allAnswered = answeredCount === totalCount;

  // --- IntersectionObserver: カードが画面内に入ったらフェードアップ ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // quiz-card-hiddenを外してvisibleを付与
            entry.target.classList.remove("quiz-card-hidden");
            entry.target.classList.add("quiz-card-visible");
            // 一度表示したら監視を解除（再度隠す必要がないため）
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    // 全カードを監視対象に登録
    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // --- CTAテキスト変化時のアニメーション発火 ---
  useEffect(() => {
    if (allAnswered && !prevAllAnsweredRef.current) {
      setCtaAnimating(true);
      const timer = setTimeout(() => setCtaAnimating(false), 500);
      return () => clearTimeout(timer);
    }
    prevAllAnsweredRef.current = allAnswered;
  }, [allAnswered]);

  // --- 選択ハンドラ ---
  const handleSelect = useCallback(
    (qIndex: number, value: number, e: React.MouseEvent<HTMLButtonElement>) => {
      setAnswer(qIndex, value);

      // スパークルパーティクル発射
      spawnSparkles(e.currentTarget);

      // popBounceアニメーション管理
      const key = `${qIndex}-${value}`;
      setBouncingKeys((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
      setTimeout(() => {
        setBouncingKeys((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }, 380);

      // 次の未回答質問へスムーズスクロール
      const nextUnanswered = answers.findIndex(
        (a, i) => a === null && i !== qIndex
      );
      if (nextUnanswered !== -1 && cardRefs.current[nextUnanswered]) {
        setTimeout(() => {
          cardRefs.current[nextUnanswered]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 200);
      }
    },
    [answers, setAnswer]
  );

  // --- CTA押下 ---
  const handleSubmit = () => {
    if (!allAnswered) return;
    setCurrentStep("name");
  };

  // --- セクション区切りの挿入判定 ---
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
            診断研究所 診断
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

        {/* プログレスバー（先端シマーエフェクト付き） */}
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
              position: "relative",
            }}
          >
            {/* バー本体 — transition改善でぬるっと伸びる */}
            <div
              style={{
                height: "100%",
                width: `${(answeredCount / totalCount) * 100}%`,
                background: "linear-gradient(90deg,#FF6BE8,#C45AFF)",
                borderRadius: 4,
                transition: "width .5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* バー先端を流れるシマー光 */}
              <span className="progress-shimmer" />
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#FF6BE8",
              whiteSpace: "nowrap",
              minWidth: 48,
              textAlign: "right",
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
            {/* --- セクション区切り（アニメーション付き） --- */}
            {shouldShowSection(idx) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  margin: idx === 0 ? "0 0 20px" : "36px 0 20px",
                }}
              >
                {/* 左の線 — section-line-animateでアニメーション伸長 */}
                <div
                  className="section-line-animate"
                  style={{
                    flex: 1,
                    height: 1,
                    margin: 0,
                    animationDelay: `${idx * 0.05}s`,
                  }}
                />
                {/* セクション名 — アイコン付き＆シマーエフェクト */}
                <span
                  className="section-text-shimmer"
                  style={{
                    fontSize: 10,
                    letterSpacing: 3,
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {SECTION_ICONS[q.sid] || "✦"} SECTION {q.sid} &mdash;{" "}
                  {SECTION_NAMES[q.sid]}
                </span>
                {/* 右の線 */}
                <div
                  className="section-line-animate"
                  style={{
                    flex: 1,
                    height: 1,
                    margin: 0,
                    animationDelay: `${idx * 0.05 + 0.15}s`,
                  }}
                />
              </div>
            )}

            {/* --- 質問カード（IntersectionObserverフェードアップ） --- */}
            <div
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="quiz-card-hidden"
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
                padding: "20px 22px",
                marginBottom: 14,
                transition: "border-color .3s, background .3s",
                position: "relative",
              }}
            >
              {/* 回答済みチェックマーク（右上に控えめ表示） */}
              {answers[idx] !== null && (
                <div
                  className="answered-check"
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 14,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(255,107,232,.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "#FF6BE8",
                  }}
                >
                  ✓
                </div>
              )}

              {/* 質問番号 */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2.5,
                  color: "rgba(255,107,232,.6)",
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
                  paddingRight: answers[idx] !== null ? 28 : 0,
                }}
              >
                {q.text}
              </p>

              {/* 出典 */}
              <p
                style={{
                  fontSize: 9.5,
                  color: "rgba(196,90,255,.55)",
                  margin: "0 0 14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {q.source}
              </p>

              {/* 5段階選択ボタン（ホバー拡大 + popBounce + キラキラ擬似要素） */}
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map((val) => {
                  const isSelected = answers[idx] === val;
                  const bounceKey = `${idx}-${val}`;
                  const isBouncing = bouncingKeys.has(bounceKey);

                  return (
                    <button
                      key={val}
                      onClick={(e) => handleSelect(idx, val, e)}
                      className={[
                        "scale-btn-hover",
                        isSelected ? "scale-btn-selected" : "",
                        isBouncing ? "animate-popBounce" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{
                        flex: 1,
                        minHeight: 56,
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
                        position: "relative",
                        overflow: "visible",
                      }}
                    >
                      {/* 数字 */}
                      <span className="font-stick" style={{ fontSize: 18 }}>
                        {val}
                      </span>
                      {/* ラベル */}
                      <span
                        style={{
                          fontSize: 8,
                          lineHeight: 1.1,
                          color: isSelected
                            ? "#fff"
                            : "rgba(255,107,232,.55)",
                        }}
                      >
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

      {/* ===== 固定CTA（全問回答時にglowBreathアニメーション） ===== */}
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
            className={[
              allAnswered ? "btn-gradient" : "",
              allAnswered ? "animate-glowBreath" : "",
            ]
              .filter(Boolean)
              .join(" ")}
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
              background: "linear-gradient(135deg,#FF6BE8,#C45AFF)",
              transition: "opacity .3s, transform .2s",
            }}
          >
            {/* CTAテキスト — 切り替え時にフェードアニメーション */}
            <span
              className={ctaAnimating ? "cta-text-enter" : ""}
              style={{ display: "inline-block" }}
            >
              {allAnswered
                ? "全問回答完了！結果を見る ✨"
                : `あと ${totalCount - answeredCount} 問`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
