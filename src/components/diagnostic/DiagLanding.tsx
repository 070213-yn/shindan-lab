"use client";

/**
 * 診断ランディング画面（イントロ）
 *
 * 診断を始める前に、診断の概要・所要時間・質問数などを表示する。
 * 診断ごとのテーマカラーに基づいた演出で期待感を高める。
 */

import { useMemo } from "react";
import Link from "next/link";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";
import { getDiagnosticTheme } from "@/lib/diagnosticThemes";

interface Props {
  config: DiagnosisConfig;
  store: GenericDiagState;
}

export default function DiagLanding({ config, store }: Props) {
  const { setCurrentStep } = store;
  // テーマから色情報を取得
  const theme = useMemo(() => getDiagnosticTheme(config.id), [config.id]);

  // 参考文献の最初の1つからラベルを生成
  const referenceLabel = config.references.length > 0
    ? config.references[0].replace(/[（(].*/g, '').slice(0, 30)
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 20px 40px",
      }}
    >
      {/* ホームに戻るリンク */}
      <div
        style={{
          padding: "16px 0 0",
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0s both",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 20,
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            color: theme.textSecondary,
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: 14 }}>&#8592;</span>
          ホームに戻る
        </Link>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* 診断の絵文字（コンパクト化） */}
        <div
          style={{
            fontSize: 52,
            marginBottom: 14,
            animation: "floatDiagonal 5s ease-in-out infinite",
            filter: `drop-shadow(0 0 16px ${config.themeColor}40)`,
          }}
        >
          {config.emoji}
        </div>

        {/* 診断タイトル */}
        <h1
          className="font-stick"
          style={{
            fontSize: 24,
            color: theme.textPrimary,
            marginBottom: 6,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.1s both",
          }}
        >
          {config.title}
        </h1>

        {/* キャッチフレーズ */}
        <p
          className="font-zen"
          style={{
            fontSize: 13,
            color: config.themeColor,
            fontWeight: 700,
            marginBottom: 20,
            lineHeight: 1.6,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.2s both",
          }}
        >
          {config.catchphrase}
        </p>

        {/* 説明カード（テーマ色で差別化） */}
        <div
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: 16,
            padding: "16px 16px",
            marginBottom: 20,
            textAlign: "left",
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.3s both",
          }}
        >
          {/* この診断でわかること */}
          <div style={{ marginBottom: 14 }}>
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
                color: theme.textSecondary,
                lineHeight: 1.7,
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
              <div style={{ fontSize: 10, color: theme.textSecondary }}>
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
              <div style={{ fontSize: 10, color: theme.textSecondary }}>
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
              <div style={{ fontSize: 10, color: theme.textSecondary }}>
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
              marginTop: 12,
              fontSize: 10,
              color: theme.textSecondary,
              animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.55s both",
            }}
          >
            {referenceLabel}等の研究に基づいた本格診断
          </p>
        )}
      </div>
      </div>
    </div>
  );
}
