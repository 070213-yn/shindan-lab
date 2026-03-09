"use client";

/**
 * 診断ランディング画面（イントロ）
 *
 * 診断を始める前に、診断の概要・所要時間・質問数などを表示する。
 * 診断ごとのテーマカラーに基づいた演出で期待感を高める。
 * テーマ固有のSVG装飾・ボタンスタイル・フレーバーテキストで個性を演出。
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

/**
 * ボタンスタイルに応じた装飾テキストを返す
 */
function getButtonLabel(style?: string): string {
  switch (style) {
    case 'flask': return '実験を開始する';
    case 'wand': return '占いを始める';
    case 'sword': return '冒険に出発する';
    case 'shield': return '診断をはじめる';
    case 'scroll': return '記憶を辿る';
    case 'gem': return '才能を発掘する';
    case 'compass': return '探索を開始する';
    case 'ribbon': return 'トリセツを作る';
    case 'skull': return '運命を覗く';
    case 'coin': return '金運を鑑定する';
    case 'book': return '学びの旅へ';
    case 'heart': return '恋愛診断スタート';
    default: return '診断をはじめる';
  }
}

/**
 * ボタンスタイルに応じた装飾アイコン（左右に配置する小さいSVG）を返す
 */
function getButtonIcon(style?: string, color?: string): string {
  const c = color || 'white';
  switch (style) {
    case 'flask':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M7 2h6v4l4 8c0 2-2 4-7 4s-7-2-7-4l4-8V2z" fill="none" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/><line x1="7" y1="2" x2="13" y2="2" stroke="${c}" stroke-width="1.5"/></svg>`;
    case 'wand':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><line x1="3" y1="17" x2="15" y2="5" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/><polygon points="15,5 17,3 19,5 17,7" fill="${c}" opacity="0.8"/><circle cx="5" cy="5" r="1" fill="${c}" opacity="0.5"/><circle cx="8" cy="3" r="0.8" fill="${c}" opacity="0.4"/></svg>`;
    case 'sword':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><line x1="10" y1="1" x2="10" y2="14" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/><path d="M9 1 L10 0 L11 1" fill="${c}" opacity="0.8"/><line x1="6" y1="12" x2="14" y2="12" stroke="${c}" stroke-width="1.5"/><line x1="10" y1="14" x2="10" y2="18" stroke="${c}" stroke-width="2"/></svg>`;
    case 'shield':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 2L17 5V11Q17 16 10 19Q3 16 3 11V5Z" fill="none" stroke="${c}" stroke-width="1.5"/></svg>`;
    case 'scroll':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><ellipse cx="4" cy="10" rx="2" ry="7" fill="none" stroke="${c}" stroke-width="1"/><rect x="4" y="4" width="11" height="12" fill="none" stroke="${c}" stroke-width="1"/><ellipse cx="15" cy="10" rx="2" ry="7" fill="none" stroke="${c}" stroke-width="1"/></svg>`;
    case 'gem':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 2L17 7L10 18L3 7Z" fill="none" stroke="${c}" stroke-width="1.5"/><line x1="3" y1="7" x2="17" y2="7" stroke="${c}" stroke-width="1"/><line x1="10" y1="7" x2="10" y2="18" stroke="${c}" stroke-width="0.8" opacity="0.5"/></svg>`;
    case 'compass':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="8" fill="none" stroke="${c}" stroke-width="1.2"/><path d="M10 3L12 10L10 17L8 10Z" fill="${c}" opacity="0.5"/><circle cx="10" cy="10" r="1.5" fill="${c}"/></svg>`;
    case 'ribbon':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 9L5 4Q2 7 6 9L10 9L15 4Q18 7 14 9L10 9L8 16L10 13L12 16Z" fill="none" stroke="${c}" stroke-width="1.2"/></svg>`;
    case 'skull':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="9" r="7" fill="none" stroke="${c}" stroke-width="1.2"/><circle cx="7" cy="8" r="1.5" fill="${c}" opacity="0.6"/><circle cx="13" cy="8" r="1.5" fill="${c}" opacity="0.6"/><path d="M8 13L9 12L10 13L11 12L12 13" stroke="${c}" stroke-width="0.8" fill="none"/></svg>`;
    case 'coin':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="8" fill="none" stroke="${c}" stroke-width="1.5"/><text x="10" y="14" text-anchor="middle" font-size="10" fill="${c}" opacity="0.8">$</text></svg>`;
    case 'book':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 4Q6 2 2 4V16Q6 14 10 16Q14 14 18 16V4Q14 2 10 4Z" fill="none" stroke="${c}" stroke-width="1.2"/><line x1="10" y1="4" x2="10" y2="16" stroke="${c}" stroke-width="0.8"/></svg>`;
    case 'heart':
      return `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 17Q3 12 3 7Q3 3 7 3Q9 3 10 5Q11 3 13 3Q17 3 17 7Q17 12 10 17Z" fill="${c}" opacity="0.6"/></svg>`;
    default:
      return `<svg viewBox="0 0 20 20" width="18" height="18"><polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8" fill="${c}" opacity="0.6"/></svg>`;
  }
}

export default function DiagLanding({ config, store }: Props) {
  const { setCurrentStep } = store;
  // テーマから色情報を取得
  const theme = useMemo(() => getDiagnosticTheme(config.id), [config.id]);

  // 参考文献の最初の1つからラベルを生成
  const referenceLabel = config.references.length > 0
    ? config.references[0].replace(/[（(].*/g, '').slice(0, 30)
    : null;

  // ボタンラベルとアイコン
  const buttonLabel = getButtonLabel(theme.buttonStyle);
  const buttonIconHtml = getButtonIcon(theme.buttonStyle);

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
        {/* 診断の絵文字＋テーマ装飾SVG */}
        <div
          style={{
            position: "relative",
            marginBottom: 14,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.05s both",
          }}
        >
          {/* テーマ固有の背景装飾SVG（絵文字の後ろに表示） */}
          {theme.landingSvg && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 140,
                height: 140,
                color: config.themeColor,
                opacity: 0.5,
                animation: `${theme.uniqueAnimation || 'floatDiagonal'} 8s ease-in-out infinite`,
                pointerEvents: "none",
              }}
              dangerouslySetInnerHTML={{ __html: theme.landingSvg }}
            />
          )}
          {/* メイン絵文字 */}
          <div
            style={{
              position: "relative",
              fontSize: 52,
              filter: `drop-shadow(0 0 16px ${config.themeColor}40)`,
              animation: "floatDiagonal 5s ease-in-out infinite",
              zIndex: 1,
            }}
          >
            {config.emoji}
          </div>
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

        {/* 説明カード（テーマ色のグラデーションボーダー） */}
        <div
          style={{
            position: "relative",
            borderRadius: 18,
            padding: 2,
            marginBottom: 20,
            // テーマカラーのグラデーションボーダー
            background: `linear-gradient(135deg, ${config.gradientFrom}40, ${config.gradientTo}20, ${config.gradientFrom}30)`,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.3s both",
          }}
        >
          <div
            style={{
              background: theme.cardBg,
              backdropFilter: "blur(10px)",
              borderRadius: 16,
              padding: "16px 16px",
              textAlign: "left",
            }}
          >
            {/* この診断でわかること */}
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10,
                  color: config.themeColor,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                {/* テーマに合った小さなアイコン */}
                <span
                  style={{
                    display: "inline-flex",
                    width: 16,
                    height: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getButtonIcon(theme.buttonStyle, config.themeColor),
                  }}
                />
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
                  background: `linear-gradient(135deg, ${config.themeColor}08, ${config.themeColor}15)`,
                  borderRadius: 10,
                  padding: "10px 8px",
                  textAlign: "center",
                  border: `1px solid ${config.themeColor}10`,
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
                  background: `linear-gradient(135deg, ${config.themeColor}08, ${config.themeColor}15)`,
                  borderRadius: 10,
                  padding: "10px 8px",
                  textAlign: "center",
                  border: `1px solid ${config.themeColor}10`,
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
                  background: `linear-gradient(135deg, ${config.themeColor}08, ${config.themeColor}15)`,
                  borderRadius: 10,
                  padding: "10px 8px",
                  textAlign: "center",
                  border: `1px solid ${config.themeColor}10`,
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
        </div>

        {/* 診断をはじめるボタン（テーマ装飾付き） */}
        <button
          onClick={() => setCurrentStep("profile")}
          className="btn-glow-active"
          style={{
            position: "relative",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            overflow: "hidden",
          }}
        >
          {/* 左アイコン */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              opacity: 0.9,
            }}
            dangerouslySetInnerHTML={{ __html: buttonIconHtml }}
          />
          {buttonLabel}
          {/* 右アイコン */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              opacity: 0.9,
              transform: "scaleX(-1)",
            }}
            dangerouslySetInnerHTML={{ __html: buttonIconHtml }}
          />
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

        {/* 実験担当者のフレーバーテキスト */}
        {theme.labDirector && (
          <div
            style={{
              marginTop: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 20,
              background: `${config.themeColor}08`,
              border: `1px dashed ${config.themeColor}25`,
              animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.65s both",
            }}
          >
            <span style={{ fontSize: 14 }}>🔬</span>
            <span
              style={{
                fontSize: 11,
                color: theme.textSecondary,
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {theme.labDirector}
            </span>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
