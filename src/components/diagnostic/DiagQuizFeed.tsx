"use client";

/**
 * 汎用診断クイズフィードコンポーネント
 *
 * スクロール型で質問を表示し、選択するとリアルタイムでスコア加算。
 * IntersectionObserverでフェードアップアニメーション。
 *
 * 改修内容:
 * - テーマカラーでボーダーアクセントの質問カードデザイン
 * - 回答ボタンの見た目改善（間隔、サイズ、アニメーション）
 * - セクション切り替え時のフルスクリーンオーバーレイ演出
 * - プログレスバーのテーマカラーグラデーション
 */

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
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
  { value: 1, label: "全然違う", short: "1" },
  { value: 2, label: "あまり", short: "2" },
  { value: 3, label: "どちらとも", short: "3" },
  { value: 4, label: "まあまあ", short: "4" },
  { value: 5, label: "めっちゃ当てはまる", short: "5" },
];

export default function DiagQuizFeed({ config, store, theme }: Props) {
  const { answers, setAnswer, setCurrentStep } = store;
  const questions = config.questions;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  // セクション演出オーバーレイ（フェーズ番号・総数も保持）
  const [sectionOverlay, setSectionOverlay] = useState<{
    show: boolean;
    emoji: string;
    name: string;
    phaseNumber: number;
    totalPhases: number;
  } | null>(null);
  const shownSections = useRef<Set<number>>(new Set());

  // セクション一覧（重複排除で順序を保持）
  const sectionList = (() => {
    const seen = new Set<number>();
    const list: { sid: number; emoji: string; sectionName: string }[] = [];
    for (const q of questions) {
      if (!seen.has(q.sid)) {
        seen.add(q.sid);
        list.push({ sid: q.sid, emoji: q.emoji, sectionName: q.sectionName });
      }
    }
    return list;
  })();

  // 回答済み数
  const answeredCount = answers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === questions.length;
  const progress = (answeredCount / questions.length) * 100;

  // IntersectionObserverでカードのフェードアップ（セクション演出はhandleSelectで発火）
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

  // 回答選択ハンドラ（セクション全問回答後にオーバーレイ演出を発火）
  const handleSelect = useCallback(
    (qIndex: number, value: number) => {
      setAnswer(qIndex, value, questions[qIndex].weights);

      // 回答した質問のセクションIDを取得
      const currentSid = questions[qIndex].sid;

      // このセクションに属する全質問のインデックスを取得
      const sectionQuestionIndices = questions
        .map((q, idx) => (q.sid === currentSid ? idx : -1))
        .filter((idx) => idx !== -1);

      // 今回の回答を反映した上で、このセクションの全質問が回答済みかチェック
      // （answersはまだ更新前の可能性があるため、今回答したインデックスは回答済みとして扱う）
      const allSectionAnswered = sectionQuestionIndices.every(
        (idx) => idx === qIndex || answers[idx] !== null
      );

      if (allSectionAnswered) {
        // 次のセクションを特定
        const currentSectionIdx = sectionList.findIndex((s) => s.sid === currentSid);
        const nextSection = sectionList[currentSectionIdx + 1];

        // 次のセクションが存在し、まだ演出を出していない場合にオーバーレイ表示
        if (nextSection && !shownSections.current.has(nextSection.sid)) {
          shownSections.current.add(nextSection.sid);
          setSectionOverlay({
            show: true,
            emoji: nextSection.emoji,
            name: nextSection.sectionName,
            phaseNumber: currentSectionIdx + 2, // 次のフェーズ番号（1始まり）
            totalPhases: sectionList.length,
          });
          setTimeout(() => {
            setSectionOverlay(null);
          }, 1800); // 1.2秒→1.8秒に延長
        }
      }

      scrollToNext(qIndex);
    },
    [setAnswer, questions, scrollToNext, answers, sectionList]
  );

  // セクション区切りを判定
  const isNewSection = (i: number) => i === 0 || questions[i].sid !== questions[i - 1].sid;

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 100 }}>
      {/* セクション切り替えオーバーレイ（研究所フェーズ切り替え風） */}
      {sectionOverlay && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, ${config.themeColor}18 50%, rgba(255,255,255,0.95) 100%)`,
            backdropFilter: "blur(12px)",
            animation: "sectionOverlayAnim 1.8s cubic-bezier(0.25,1,0.5,1) forwards",
            pointerEvents: "none",
          }}
        >
          {/* フェーズラベル */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: `${config.themeColor}99`,
              textTransform: "uppercase",
              marginBottom: 8,
              animation: "staggeredFadeUp 0.5s cubic-bezier(0.25,1,0.5,1) 0.05s both",
            }}
          >
            Phase {sectionOverlay.phaseNumber} / {sectionOverlay.totalPhases}
          </div>

          {/* セクション絵文字 */}
          <div
            style={{
              fontSize: 56,
              marginBottom: 12,
              animation: "scaleIn 0.4s cubic-bezier(0.25,1,0.5,1) both",
            }}
          >
            {sectionOverlay.emoji}
          </div>

          {/* セクション名 */}
          <div
            className="font-zen"
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: config.themeColor,
              marginBottom: 16,
              animation: "staggeredFadeUp 0.5s cubic-bezier(0.25,1,0.5,1) 0.15s both",
            }}
          >
            {sectionOverlay.name}
          </div>

          {/* プログレスバー装飾（フェーズ進捗） */}
          <div
            style={{
              width: 120,
              height: 3,
              borderRadius: 2,
              background: `${config.themeColor}20`,
              overflow: "hidden",
              animation: "staggeredFadeUp 0.5s cubic-bezier(0.25,1,0.5,1) 0.25s both",
            }}
          >
            <div
              style={{
                width: `${(sectionOverlay.phaseNumber / sectionOverlay.totalPhases) * 100}%`,
                height: "100%",
                borderRadius: 2,
                background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
                transformOrigin: "left",
                animation: "phaseBarFill 0.6s cubic-bezier(0.25,1,0.5,1) 0.35s both",
              }}
            />
          </div>
        </div>
      )}

      {/* プログレスバー（固定） */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
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
            <span
              className="font-zen"
              style={{ fontSize: 12, fontWeight: 700, color: config.themeColor }}
            >
              {config.emoji} {config.title}
            </span>
          </div>
          <span style={{ fontSize: 12, color: "rgba(74,101,114,.6)" }}>
            {answeredCount} / {questions.length}
          </span>
        </div>

        {/* プログレスバー */}
        <div
          style={{
            height: 4,
            background: "rgba(45,212,191,.1)",
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
      </div>

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

            {/* 質問カード */}
            <div
              ref={(el) => { cardRefs.current[i] = el; }}
              data-idx={i}
              className={visibleCards.has(i) ? "quiz-card-visible" : "quiz-card-hidden"}
              style={{
                background: "rgba(255,255,255,0.7)",
                border: `1px solid ${
                  answers[i] !== null ? `${config.themeColor}30` : "rgba(45,212,191,.15)"
                }`,
                borderLeft: answers[i] !== null
                  ? `3px solid ${config.themeColor}60`
                  : `1px solid rgba(45,212,191,.15)`,
                borderRadius: 16,
                padding: "20px 18px",
                marginBottom: 14,
                position: "relative",
                transition: "border-color 0.3s, border-left 0.3s, opacity 0.55s var(--ease-smooth), transform 0.55s var(--ease-smooth)",
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
                <span style={{ fontSize: 11, color: "rgba(74,101,114,.5)" }}>
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
                  color: "#0f1f2b",
                  marginBottom: 16,
                }}
              >
                {q.text}
              </p>

              {/* 5段階選択肢（改善版） */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {SCALE_OPTIONS.map((opt) => {
                  const isSelected = answers[i] === opt.value;
                  // サイズを端ほど小さく、中央を大きくする配列
                  const sizes = [40, 44, 48, 44, 40];
                  const size = sizes[opt.value - 1];
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(i, opt.value)}
                      className={`scale-btn-hover ${isSelected ? "scale-btn-selected animate-popBounce" : ""}`}
                      style={{
                        width: size,
                        height: size,
                        borderRadius: 14,
                        border: `2px solid ${
                          isSelected ? config.themeColor : "rgba(45,212,191,.2)"
                        }`,
                        background: isSelected
                          ? `linear-gradient(135deg, ${config.gradientFrom}30, ${config.gradientTo}30)`
                          : "rgba(255,255,255,0.5)",
                        color: isSelected ? "#fff" : "#4a6572",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isSelected
                          ? `0 0 16px ${config.themeColor}35`
                          : "none",
                        transition: "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                      title={opt.label}
                    >
                      {opt.value}
                    </button>
                  );
                })}
              </div>

              {/* 選択肢ラベル（両端のみ） */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 6,
                  fontSize: 9,
                  color: "rgba(74,101,114,.5)",
                  padding: "0 4px",
                }}
              >
                <span>全然違う</span>
                <span>めっちゃ当てはまる</span>
              </div>
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
            className={allAnswered ? "btn-glow-active" : ""}
            style={{
              padding: "18px 48px",
              background: allAnswered
                ? `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`
                : "rgba(45,212,191,.1)",
              color: allAnswered ? "#fff" : "rgba(74,101,114,.4)",
              border: "none",
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Zen Maru Gothic', sans-serif",
              cursor: allAnswered ? "pointer" : "default",
              transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              boxShadow: allAnswered
                ? `0 4px 24px ${config.themeColor}40`
                : "none",
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
