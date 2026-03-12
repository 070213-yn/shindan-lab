"use client";

/**
 * 診断ランディング画面（イントロ）
 *
 * 診断を始める前に、診断の概要・所要時間・質問数などを表示する。
 * 診断ごとのテーマカラーに基づいた演出で期待感を高める。
 * テーマ固有のSVG装飾・ボタンスタイル・フレーバーテキストで個性を演出。
 */

import { useMemo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import type { GenericDiagState } from "@/store/createDiagnosticStore";
import { getDiagnosticTheme } from "@/lib/diagnosticThemes";
import PixelSparkle from "@/components/PixelSparkle";

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

  // --- IntersectionObserver: タイプカードのstaggered fadeUpアニメーション ---
  const typesGridRef = useRef<HTMLDivElement>(null);
  const [typesVisible, setTypesVisible] = useState(false);
  // タイプが多い場合の「もっと見る」制御（30個以上で折りたたみ）
  const [showAllTypes, setShowAllTypes] = useState(false);
  const TYPE_INITIAL_COUNT = 30;

  useEffect(() => {
    if (!typesGridRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTypesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(typesGridRef.current);
    return () => observer.disconnect();
  }, []);

  // タイプ一覧セクションへスムーズスクロール
  const scrollToTypes = () => {
    document.getElementById("result-types")?.scrollIntoView({ behavior: "smooth" });
  };

  // 参考文献の最初の1つからラベルを生成
  const referenceLabel = config.references.length > 0
    ? config.references[0].replace(/[（(].*/g, '').slice(0, 30)
    : null;

  // ボタンラベルとアイコン
  const buttonLabel = getButtonLabel(theme.buttonStyle);
  const buttonIconHtml = getButtonIcon(theme.buttonStyle);

  // シマーアニメーションとパルスアニメーションのスタイルタグ（コンポーネント内で完結）
  const dynamicStyles = useMemo(() => `
    @keyframes diagLandingShimmer {
      0% { left: -100%; }
      100% { left: 200%; }
    }
    @keyframes diagLandingPulse {
      0%, 100% {
        box-shadow: 0 4px 24px ${config.themeColor}40;
      }
      50% {
        box-shadow: 0 6px 32px ${config.themeColor}60, 0 0 48px ${config.themeColor}20;
      }
    }
    @keyframes diagLandingRingSpin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    @keyframes diagLandingDotOrbit {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(-360deg); }
    }
    @keyframes diagLandingIconBounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-2px); }
    }
    .diag-landing-btn:hover {
      transform: scale(1.03) !important;
      box-shadow: 0 8px 40px ${config.themeColor}50, 0 0 60px ${config.themeColor}25 !important;
    }
    .diag-landing-btn:active {
      transform: scale(0.97) !important;
    }
    .diag-landing-back:hover {
      background: ${config.themeColor}15 !important;
      border-color: ${config.themeColor}40 !important;
      color: ${config.themeColor} !important;
    }
  `, [config.themeColor]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 16px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ピクセルキラキラパーティクル */}
      <PixelSparkle color={config.themeColor} count={10} size={20} speed={140} />

      {/* 動的スタイル */}
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />

      {/* 背景装飾: 上部のアーチSVG */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 520,
          height: 200,
          pointerEvents: "none",
          opacity: 0.5,
          animation: "staggeredFadeUp 0.8s cubic-bezier(0.25,1,0.5,1) 0s both",
        }}
      >
        <svg viewBox="0 0 520 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {/* 装飾アーチ */}
          <path
            d="M0 200 Q260 -20 520 200"
            stroke={config.themeColor}
            strokeWidth="1"
            strokeOpacity="0.15"
            fill="none"
          />
          <path
            d="M40 200 Q260 20 480 200"
            stroke={config.themeColor}
            strokeWidth="0.8"
            strokeOpacity="0.1"
            fill="none"
          />
          {/* リボン装飾 */}
          <path
            d="M160 30 Q200 15 240 25 Q260 28 260 28 Q260 28 280 25 Q320 15 360 30"
            stroke={`url(#ribbonGrad-${config.id})`}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeOpacity="0.4"
          />
          {/* 小さな装飾ドット */}
          <circle cx="180" cy="50" r="2" fill={config.themeColor} opacity="0.15" />
          <circle cx="340" cy="50" r="2" fill={config.themeColor} opacity="0.15" />
          <circle cx="260" cy="12" r="3" fill={config.themeColor} opacity="0.12" />
          <circle cx="130" cy="80" r="1.5" fill={config.themeColor} opacity="0.1" />
          <circle cx="390" cy="80" r="1.5" fill={config.themeColor} opacity="0.1" />
          <defs>
            <linearGradient id={`ribbonGrad-${config.id}`} x1="160" y1="30" x2="360" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={config.gradientFrom} />
              <stop offset="100%" stopColor={config.gradientTo} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ホームに戻るリンク */}
      <div
        style={{
          padding: "16px 0 0",
          maxWidth: 480,
          width: "100%",
          margin: "0 auto",
          animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0s both",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Link
          href="/"
          className="diag-landing-back"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 20,
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            color: theme.textSecondary,
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.25s ease",
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ fontSize: 14, lineHeight: 1 }}>&#8592;</span>
          ホームに戻る
        </Link>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* ====== 診断の絵文字＋二重リング装飾 ====== */}
        <div
          style={{
            position: "relative",
            marginBottom: 20,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.05s both",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 160,
          }}
        >
          {/* 外側リング（ゆっくり回転） */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: `2px dashed ${config.themeColor}20`,
              animation: "diagLandingRingSpin 25s linear infinite",
              pointerEvents: "none",
            }}
          >
            {/* 外側リング上の装飾ドット */}
            <div style={{
              position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
              width: 8, height: 8, borderRadius: "50%",
              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              opacity: 0.5,
            }} />
            <div style={{
              position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
              width: 6, height: 6, borderRadius: "50%",
              background: config.themeColor,
              opacity: 0.3,
            }} />
            <div style={{
              position: "absolute", left: -4, top: "50%", transform: "translateY(-50%)",
              width: 6, height: 6, borderRadius: "50%",
              background: config.themeColor,
              opacity: 0.3,
            }} />
            <div style={{
              position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)",
              width: 6, height: 6, borderRadius: "50%",
              background: config.themeColor,
              opacity: 0.3,
            }} />
          </div>

          {/* 内側リング */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 110,
              height: 110,
              borderRadius: "50%",
              border: `2.5px solid ${config.themeColor}18`,
              background: `radial-gradient(circle, ${config.themeColor}06 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

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
                opacity: 0.35,
                animation: `${theme.uniqueAnimation || 'floatDiagonal'} 8s ease-in-out infinite`,
                pointerEvents: "none",
              }}
              dangerouslySetInnerHTML={{ __html: theme.landingSvg }}
            />
          )}

          {/* メイン絵文字（72pxに拡大） */}
          <div
            style={{
              position: "relative",
              fontSize: 72,
              lineHeight: 1,
              filter: `drop-shadow(0 0 20px ${config.themeColor}35)`,
              animation: "floatDiagonal 5s ease-in-out infinite",
              zIndex: 1,
            }}
          >
            {config.emoji}
          </div>
        </div>

        {/* ====== 診断タイトル ====== */}
        <h1
          className="font-stick"
          style={{
            fontSize: 26,
            color: theme.textPrimary,
            marginBottom: 8,
            letterSpacing: "0.02em",
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.1s both",
          }}
        >
          {config.title}
        </h1>

        {/* キャッチフレーズ */}
        <p
          className="font-zen"
          style={{
            fontSize: 13.5,
            color: config.themeColor,
            fontWeight: 700,
            marginBottom: 24,
            lineHeight: 1.7,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.18s both",
          }}
        >
          {config.catchphrase}
        </p>

        {/* ====== 説明カード（グラスモーフィズム + アクセントバー） ====== */}
        <div
          style={{
            position: "relative",
            borderRadius: 20,
            padding: 2,
            marginBottom: 24,
            background: `linear-gradient(135deg, ${config.gradientFrom}45, ${config.gradientTo}20, ${config.gradientFrom}35)`,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.26s both",
          }}
        >
          <div
            style={{
              position: "relative",
              background: `${theme.cardBg}`,
              backdropFilter: "blur(16px) saturate(1.4)",
              WebkitBackdropFilter: "blur(16px) saturate(1.4)",
              borderRadius: 18,
              padding: "20px 20px 20px 24px",
              textAlign: "left",
              overflow: "hidden",
            }}
          >
            {/* 左端のアクセントバー（グラデーション） */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 12,
                bottom: 12,
                width: 4,
                borderRadius: 4,
                background: `linear-gradient(180deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            />

            {/* この診断でわかること */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: config.themeColor,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  marginBottom: 4,
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
              {/* アンダーラインアクセント */}
              <div
                style={{
                  width: 40,
                  height: 2,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo}80)`,
                  marginBottom: 10,
                }}
              />
              <p
                style={{
                  fontSize: 13.5,
                  color: theme.textSecondary,
                  lineHeight: 1.75,
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
                gap: 10,
              }}
            >
              {/* 質問数 */}
              <div
                style={{
                  background: `linear-gradient(145deg, ${config.themeColor}08, ${config.themeColor}18)`,
                  borderRadius: 14,
                  padding: "14px 8px 10px",
                  textAlign: "center",
                  border: `1px solid ${config.themeColor}12`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* セル内の微光 */}
                <div style={{
                  position: "absolute", top: 0, right: 0, width: 30, height: 30,
                  borderRadius: "0 14px 0 30px",
                  background: `${config.themeColor}08`,
                }} />
                <div
                  className="font-stick"
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: config.themeColor,
                    marginBottom: 2,
                    lineHeight: 1.1,
                    position: "relative",
                  }}
                >
                  {config.questionCount}
                </div>
                <div style={{
                  fontSize: 9,
                  color: theme.textSecondary,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}>
                  QUESTIONS
                </div>
              </div>

              {/* 所要時間 */}
              <div
                style={{
                  background: `linear-gradient(145deg, ${config.themeColor}08, ${config.themeColor}18)`,
                  borderRadius: 14,
                  padding: "14px 8px 10px",
                  textAlign: "center",
                  border: `1px solid ${config.themeColor}12`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, right: 0, width: 30, height: 30,
                  borderRadius: "0 14px 0 30px",
                  background: `${config.themeColor}08`,
                }} />
                <div
                  className="font-stick"
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: config.themeColor,
                    marginBottom: 2,
                    lineHeight: 1.1,
                    position: "relative",
                  }}
                >
                  {config.estimatedMinutes}
                </div>
                <div style={{
                  fontSize: 9,
                  color: theme.textSecondary,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}>
                  MINUTES
                </div>
              </div>

              {/* 結果タイプ数 */}
              <div
                style={{
                  background: `linear-gradient(145deg, ${config.themeColor}08, ${config.themeColor}18)`,
                  borderRadius: 14,
                  padding: "14px 8px 10px",
                  textAlign: "center",
                  border: `1px solid ${config.themeColor}12`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, right: 0, width: 30, height: 30,
                  borderRadius: "0 14px 0 30px",
                  background: `${config.themeColor}08`,
                }} />
                <div
                  className="font-stick"
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: config.themeColor,
                    marginBottom: 2,
                    lineHeight: 1.1,
                    position: "relative",
                  }}
                >
                  {config.resultTypes.length}
                </div>
                <div style={{
                  fontSize: 9,
                  color: theme.textSecondary,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}>
                  TYPES
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====== 開始ボタン（シマー + パルス + グロー） ====== */}
        <button
          onClick={() => setCurrentStep("profile")}
          className="diag-landing-btn"
          style={{
            position: "relative",
            width: "100%",
            padding: "20px 0",
            background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            color: "#fff",
            border: "none",
            borderRadius: 50,
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "'Zen Maru Gothic', sans-serif",
            cursor: "pointer",
            boxShadow: `0 4px 24px ${config.themeColor}40`,
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            animation: `staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.38s both, diagLandingPulse 2.5s ease-in-out 1.2s infinite`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            overflow: "hidden",
            letterSpacing: "0.04em",
          }}
        >
          {/* シマーアニメーション（光が横切る） */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "60%",
              height: "100%",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 60%, transparent 100%)",
              animation: "diagLandingShimmer 3s ease-in-out 1.5s infinite",
              pointerEvents: "none",
            }}
          />
          {/* 左アイコン（微妙なバウンス） */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              opacity: 0.9,
              animation: "diagLandingIconBounce 2s ease-in-out infinite",
              position: "relative",
            }}
            dangerouslySetInnerHTML={{ __html: buttonIconHtml }}
          />
          <span style={{ position: "relative" }}>{buttonLabel}</span>
          {/* 右アイコン */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              opacity: 0.9,
              transform: "scaleX(-1)",
              animation: "diagLandingIconBounce 2s ease-in-out 0.3s infinite",
              position: "relative",
            }}
            dangerouslySetInnerHTML={{ __html: buttonIconHtml }}
          />
        </button>

        {/* ====== タイプ一覧を見るボタン ====== */}
        <button
          onClick={scrollToTypes}
          style={{
            background: "transparent",
            border: "none",
            padding: "12px 0",
            color: theme.textSecondary,
            fontSize: 13,
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            transition: "color 0.3s",
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.45s both",
            opacity: 0.8,
            width: "100%",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = config.themeColor;
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = theme.textSecondary;
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.8";
          }}
        >
          {config.resultTypes.length}タイプ一覧を見る ↓
        </button>

        {/* ====== 下部情報エリア ====== */}
        <div
          style={{
            marginTop: 20,
            animation: "staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.5s both",
          }}
        >
          {/* 参考文献 + 実験担当者をまとめたカード */}
          {(referenceLabel || theme.labDirector) && (
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 16,
                background: `${theme.cardBg}`,
                backdropFilter: "blur(8px)",
                border: `1px solid ${config.themeColor}15`,
              }}
            >
              {/* 参考文献バッジ */}
              {referenceLabel && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                      fontSize: 11,
                    }}
                  >
                    📚
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: theme.textSecondary,
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {referenceLabel}等の研究に基づく本格診断
                  </span>
                </div>
              )}

              {/* 実験担当者バッジ */}
              {theme.labDirector && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                      fontSize: 11,
                    }}
                  >
                    🔬
                  </span>
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
          )}
        </div>
      </div>
      </div>

      {/* ====== タイプ一覧セクション ====== */}
      <section
        id="result-types"
        style={{
          padding: "60px 0 40px",
          maxWidth: 680,
          width: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* セクションタイトル */}
        <div style={{ textAlign: "left", marginBottom: 32, padding: "0 4px" }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              color: config.themeColor,
              display: "block",
              marginBottom: 6,
              fontWeight: 700,
            }}
          >
            RESULT TYPES
          </span>
          <h2
            className="font-stick"
            style={{
              fontSize: 22,
              color: theme.textPrimary,
              margin: 0,
            }}
          >
            診断結果タイプ一覧
          </h2>
          {/* アクセントライン */}
          <div
            style={{
              width: 48,
              height: 3,
              borderRadius: 3,
              background: `linear-gradient(90deg, ${config.gradientFrom}, ${config.gradientTo})`,
              marginTop: 10,
            }}
          />
        </div>

        {/* タイプチップ一覧（コンパクト表示） */}
        <div
          ref={typesGridRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {(() => {
            const totalTypes = config.resultTypes.length;
            const needsCollapse = totalTypes > TYPE_INITIAL_COUNT;
            const visibleTypes = needsCollapse && !showAllTypes
              ? config.resultTypes.slice(0, TYPE_INITIAL_COUNT)
              : config.resultTypes;

            return (
              <>
                {visibleTypes.map((type, index) => (
                  <div
                    key={type.id}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 10px",
                      background: theme.cardBg,
                      borderRadius: 50,
                      border: `1px solid ${type.color}30`,
                      fontSize: 12,
                      lineHeight: 1,
                      cursor: "default",
                      whiteSpace: "nowrap",
                      // staggered fadeUp（delay上限0.8sで30個以降は一括表示）
                      opacity: typesVisible ? 1 : 0,
                      transform: typesVisible ? "translateY(0)" : "translateY(12px)",
                      transitionProperty: "opacity, transform, border-color, box-shadow",
                      transitionDuration: "0.4s, 0.4s, 0.2s, 0.2s",
                      transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                      transitionDelay: typesVisible
                        ? `${Math.min(index * 0.025, 0.8)}s`
                        : "0s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = type.color;
                      el.style.boxShadow = `0 0 8px ${type.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = `${type.color}30`;
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* 絵文字 */}
                    <span style={{ fontSize: 13, lineHeight: 1 }}>{type.emoji}</span>
                    {/* タイプ名のみ（tagは省略） */}
                    <span
                      className="font-zen"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: type.color,
                      }}
                    >
                      {type.name}
                    </span>
                  </div>
                ))}

                {/* 「もっと見る」ボタン（30タイプ以上の場合のみ表示） */}
                {needsCollapse && !showAllTypes && (
                  <button
                    onClick={() => setShowAllTypes(true)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 14px",
                      background: `linear-gradient(135deg, ${config.gradientFrom}15, ${config.gradientTo}15)`,
                      border: `1px dashed ${config.themeColor}40`,
                      borderRadius: 50,
                      fontSize: 11,
                      fontWeight: 600,
                      color: config.themeColor,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                      opacity: typesVisible ? 1 : 0,
                      transform: typesVisible ? "translateY(0)" : "translateY(12px)",
                      transitionProperty: "opacity, transform, background",
                      transitionDuration: "0.4s",
                      transitionDelay: typesVisible ? "0.85s" : "0s",
                    }}
                  >
                    +{totalTypes - TYPE_INITIAL_COUNT}タイプをもっと見る
                  </button>
                )}
              </>
            );
          })()}
        </div>

        {/* ====== タイプ一覧下の開始ボタン ====== */}
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
          }}
        >
          <button
            onClick={() => setCurrentStep("profile")}
            className="diag-landing-btn"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 400,
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
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              overflow: "hidden",
              letterSpacing: "0.04em",
            }}
          >
            {/* シマーアニメーション */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "60%",
                height: "100%",
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 60%, transparent 100%)",
                animation: "diagLandingShimmer 3s ease-in-out 1.5s infinite",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                opacity: 0.9,
                position: "relative",
              }}
              dangerouslySetInnerHTML={{ __html: buttonIconHtml }}
            />
            <span style={{ position: "relative" }}>{buttonLabel}</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                opacity: 0.9,
                transform: "scaleX(-1)",
                position: "relative",
              }}
              dangerouslySetInnerHTML={{ __html: buttonIconHtml }}
            />
          </button>
        </div>
      </section>

      {/* チップ表示のためgrid用レスポンシブは不要（flexbox wrapで自動折り返し） */}
    </div>
  );
}
