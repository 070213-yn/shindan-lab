"use client";

/**
 * 診断ランディング画面（イントロ）
 *
 * 診断を始める前に、診断の概要・所要時間・質問数などを表示する。
 * 診断ごとのテーマカラーに基づいた演出で期待感を高める。
 */

import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
}

export default function DiagLanding({ config, store }: Props) {
  const { setCurrentStep } = store;

  // 参考文献の最初の1つからラベルを生成
  const referenceLabel = config.references.length > 0
    ? config.references[0].replace(/[（(].*/g, '').slice(0, 30)
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* 診断の絵文字（大きめ、ゆらゆらアニメーション） */}
        <div
          style={{
            fontSize: 72,
            marginBottom: 20,
            animation: "floatDiagonal 5s ease-in-out infinite",
            filter: `drop-shadow(0 0 20px ${config.themeColor}40)`,
          }}
        >
          {config.emoji}
        </div>

        {/* 診断タイトル */}
        <h1
          className="font-stick"
          style={{
            fontSize: 26,
            color: "#fff",
            marginBottom: 8,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.1s both",
          }}
        >
          {config.title}
        </h1>

        {/* キャッチフレーズ */}
        <p
          className="font-zen"
          style={{
            fontSize: 14,
            color: config.themeColor,
            fontWeight: 700,
            marginBottom: 28,
            lineHeight: 1.6,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.2s both",
          }}
        >
          {config.catchphrase}
        </p>

        {/* 説明カード */}
        <div
          style={{
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 16,
            padding: "20px 18px",
            marginBottom: 24,
            textAlign: "left",
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.3s both",
          }}
        >
          {/* この診断でわかること */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 10,
                color: config.themeColor,
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: 6,
                textTransform: "uppercase",
              }}
            >
              この診断でわかること
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,.7)",
                lineHeight: 1.7,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {config.description}
            </p>
          </div>

          {/* メタ情報: 質問数・所要時間・結果タイプ数 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
            }}
          >
            {/* 質問数 */}
            <div
              style={{
                background: `${config.themeColor}10`,
                borderRadius: 10,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div
                className="font-stick"
                style={{
                  fontSize: 20,
                  color: config.themeColor,
                  marginBottom: 2,
                }}
              >
                {config.questionCount}
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>
                問
              </div>
            </div>

            {/* 所要時間 */}
            <div
              style={{
                background: `${config.themeColor}10`,
                borderRadius: 10,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div
                className="font-stick"
                style={{
                  fontSize: 20,
                  color: config.themeColor,
                  marginBottom: 2,
                }}
              >
                {config.estimatedMinutes}
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>
                分
              </div>
            </div>

            {/* 結果タイプ数 */}
            <div
              style={{
                background: `${config.themeColor}10`,
                borderRadius: 10,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div
                className="font-stick"
                style={{
                  fontSize: 20,
                  color: config.themeColor,
                  marginBottom: 2,
                }}
              >
                {config.resultTypes.length}
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>
                タイプ
              </div>
            </div>
          </div>
        </div>

        {/* 診断をはじめるボタン */}
        <button
          onClick={() => setCurrentStep("profile")}
          className="btn-glow-active"
          style={{
            width: "100%",
            padding: "18px 0",
            background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            color: "#fff",
            border: "none",
            borderRadius: 50,
            fontSize: 17,
            fontWeight: 700,
            fontFamily: "'Zen Maru Gothic', sans-serif",
            cursor: "pointer",
            boxShadow: `0 4px 24px ${config.themeColor}40`,
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.45s both",
          }}
        >
          診断をはじめる
        </button>

        {/* 参考文献のチラ見せ */}
        {referenceLabel && (
          <p
            style={{
              marginTop: 16,
              fontSize: 10,
              color: "rgba(255,255,255,.3)",
              animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.55s both",
            }}
          >
            {referenceLabel}等の研究に基づいた本格診断
          </p>
        )}
      </div>
    </div>
  );
}
