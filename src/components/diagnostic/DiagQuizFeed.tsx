"use client";

/**
 * 汎用診断クイズフィードコンポーネント
 *
 * スクロール型で質問を表示し、選択するとリアルタイムでスコア加算。
 * IntersectionObserverでフェードアップアニメーション。
 * Liquid Glass エフェクトで Apple 風 UI を実現。
 */

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import LiquidGlass from "@/components/LiquidGlass";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";
import type { DiagnosticTheme } from "@/lib/diagnosticThemes";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
  theme?: DiagnosticTheme;
}

/** 回答選択肢の定義 */
const SCALE_OPTIONS = [
  { value: 1, label: "全く当てはまらない", short: "1" },
  { value: 2, label: "あまり当てはまらない", short: "2" },
  { value: 3, label: "どちらともいえない", short: "3" },
  { value: 4, label: "やや当てはまる", short: "4" },
  { value: 5, label: "とても当てはまる", short: "5" },
];

export default function DiagQuizFeed({ config, store, theme }: Props) {
  const { answers, setAnswer, setCurrentStep } = store;
  const questions = config.questions;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  // 回答済み数
  const answeredCount = answers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === questions.length;
  const progress = (answeredCount / questions.length) * 100;

  // IntersectionObserverでカードのフェードアップ
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisibleCards((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 次の未回答質問へスクロール
  const scrollToNext = useCallback(
    (currentIndex: number) => {
      setTimeout(() => {
        const nextUnanswered = answers.findIndex((a, i) => a === null && i > currentIndex);
        const targetIdx = nextUnanswered >= 0 ? nextUnanswered : currentIndex + 1;
        const el = cardRefs.current[targetIdx];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 250);
    },
    [answers]
  );

  // 回答選択ハンドラ
  const handleSelect = useCallback(
    (qIndex: number, value: number) => {
      setAnswer(qIndex, value, questions[qIndex].weights);
      scrollToNext(qIndex);
    },
    [setAnswer, questions, scrollToNext]
  );

  // セクション区切りを判定
  const isNewSection = (i: number) => i === 0 || questions[i].sid !== questions[i - 1].sid;

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 100 }}>
      {/* プログレスバー（固定ヘッダー） — Liquid Glass */}
      <LiquidGlass
        config={{
          borderRadius: 0,
          glassThickness: 20,
          bezelWidth: 0,
          blur: 0.8,
          tintColor: "255,255,255",
          tintOpacity: 0.72,
          innerShadowBlur: 0,
          innerShadowSpread: 0,
          outerShadowBlur: 12,
          specularOpacity: 0.15,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "12px 16px 10px",
        }}
      >
        {/* 進捗テキスト */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link
              href="/"
              className="liquid-glass-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 20,
                color: "#2dd4bf",
                fontSize: 12,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 14 }}>&#8592;</span>
              ホームに戻る
            </Link>
            <span
              className="font-zen"
              style={{ fontSize: 12, fontWeight: 700, color: config.themeColor }}
            >
              {config.emoji} {config.title}
            </span>
          </div>
          <span style={{ fontSize: 12, color: "rgba(74,101,114,.5)", fontWeight: 500 }}>
            {answeredCount} / {questions.length}
          </span>
        </div>

        {/* プログレスバー */}
        <div
          style={{
            height: 3,
            background: "rgba(45,212,191,.08)",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
              borderRadius: 2,
              transition: "width 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              position: "relative",
            }}
          >
            <span className="progress-shimmer" />
          </div>
        </div>
      </LiquidGlass>

      {/* 質問カード */}
      <div
        ref={containerRef}
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "70px 16px 40px",
        }}
      >
        {questions.map((q, i) => (
          <div key={i}>
            {/* セクション区切り */}
            {isNewSection(i) && (
              <div
                style={{
                  textAlign: "center",
                  padding: i === 0 ? "0 0 20px" : "32px 0 20px",
                }}
              >
                {i > 0 && <div className="section-line-animate" style={{ maxWidth: 200, marginBottom: 20 }} />}
                <span
                  className="section-text-shimmer font-zen"
                  style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}
                >
                  {q.emoji} {q.sectionName}
                </span>
              </div>
            )}

            {/* 質問カード — Liquid Glass */}
            <div
              ref={(el) => { cardRefs.current[i] = el; }}
              data-idx={i}
              className={visibleCards.has(i) ? "quiz-card-visible" : "quiz-card-hidden"}
              style={{
                marginBottom: 14,
                transition: "opacity 0.55s var(--ease-smooth), transform 0.55s var(--ease-smooth)",
              }}
            >
              <LiquidGlass
                config={{
                  borderRadius: 20,
                  glassThickness: 30,
                  bezelWidth: 20,
                  ior: 1.8,
                  blur: 0.3,
                  tintColor: answers[i] !== null ? "45,212,191" : "255,255,255",
                  tintOpacity: answers[i] !== null ? 0.04 : 0.06,
                  specularOpacity: 0.25,
                  saturation: 2,
                  innerShadowBlur: 12,
                  innerShadowSpread: -3,
                  outerShadowBlur: answers[i] !== null ? 16 : 10,
                }}
                style={{
                  padding: "20px 20px",
                  border: answers[i] !== null
                    ? `1px solid rgba(45,212,191,0.20)`
                    : `1px solid rgba(255,255,255,0.35)`,
                  transition: "border-color 0.3s ease",
                }}
              >
                {/* 質問番号 + 回答済みチェック */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 11, color: "rgba(74,101,114,.5)", fontWeight: 500 }}>
                    Q{i + 1}
                  </span>
                  {answers[i] !== null && (
                    <span className="answered-check" style={{ fontSize: 14, color: config.themeColor }}>
                      ✓
                    </span>
                  )}
                </div>

                {/* 質問文 */}
                <p
                  className="font-zen"
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 1.7,
                    color: "#1a1a1a",
                    marginBottom: 18,
                    letterSpacing: "0.01em",
                  }}
                >
                  {q.text}
                </p>

                {/* 5段階選択肢 + 両端ラベル（同じ行） */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 11, color: "rgba(74,101,114,.45)", whiteSpace: "nowrap", marginRight: 4, fontWeight: 500 }}>
                    全然違う
                  </span>
                  {SCALE_OPTIONS.map((opt) => {
                    const isSelected = answers[i] === opt.value;
                    const size = 42;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(i, opt.value)}
                        className={`liquid-glass-btn ${isSelected ? "liquid-glass-active" : ""}`}
                        style={{
                          width: size,
                          height: size,
                          borderRadius: 13,
                          border: isSelected
                            ? "1.5px solid rgba(255,255,255,0.65)"
                            : "1.5px solid rgba(200,210,215,0.35)",
                          background: isSelected
                            ? "none"
                            : "rgba(255,255,255,0.5)",
                          color: isSelected ? "#fff" : "#5a6d78",
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          overflow: "hidden",
                          zIndex: 1,
                          letterSpacing: "-0.02em",
                        }}
                        title={opt.label}
                      >
                        <span style={{ position: "relative", zIndex: 3 }}>{opt.value}</span>
                      </button>
                    );
                  })}
                  <span style={{ fontSize: 11, color: "rgba(74,101,114,.45)", whiteSpace: "nowrap", marginLeft: 4, fontWeight: 500 }}>
                    当てはまる
                  </span>
                </div>
              </LiquidGlass>
            </div>
          </div>
        ))}

        {/* 診断完了ボタン */}
        <div
          style={{
            textAlign: "center",
            padding: "24px 0 40px",
          }}
        >
          <button
            onClick={() => setCurrentStep("loading")}
            disabled={!allAnswered}
            className={allAnswered ? "btn-glow-active liquid-glass-cta" : ""}
            style={{
              padding: "18px 48px",
              background: allAnswered
                ? `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`
                : "rgba(45,212,191,.08)",
              color: allAnswered ? "#fff" : "rgba(74,101,114,.5)",
              border: allAnswered ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(45,212,191,0.1)",
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Zen Maru Gothic', sans-serif",
              cursor: allAnswered ? "pointer" : "default",
              transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              boxShadow: allAnswered
                ? `0 4px 24px ${config.themeColor}35, inset 0 1px 0 rgba(255,255,255,0.3)`
                : "none",
              letterSpacing: "0.02em",
            }}
          >
            <span className={allAnswered ? "cta-text-enter" : ""}>
              {allAnswered ? "結果を見る！" : `あと${questions.length - answeredCount}問`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
