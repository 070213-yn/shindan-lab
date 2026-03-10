"use client";

/**
 * 汎用診断エンジン
 *
 * DiagnosisConfigを受け取り、ランディング→プロフィール入力→クイズ→ローディング→結果表示を
 * 一つのコンポーネントで管理する。各診断ページはこのコンポーネントにconfigを渡すだけ。
 *
 * 改修内容:
 * - テーマごとに背景色・グラデーション・パーティクル・ブロブを完全差別化
 * - adjustBgColor廃止 → theme.bgColor / theme.bgGradient を直接使用
 * - パーティクルタイプ別の描画ロジック（stars/bubbles/sparkles/snow/hearts/leaves/lightning/orbs/pixels/none）
 * - テーマ固有のSVGモチーフが背景に浮遊する装飾
 */

import { useEffect, useMemo, useState } from "react";
import type { DiagnosisConfig } from "@/lib/diagnosticTypes";
import { createDiagnosticStore, type GenericDiagState } from "@/store/createDiagnosticStore";
import { getDiagnosticTheme, type ParticleType } from "@/lib/diagnosticThemes";
import { usePersonaStore } from "@/store/personaStore";
import DiagLanding from "./DiagLanding";
import DiagProfileSetup from "./DiagProfileSetup";
import DiagQuizFeed from "./DiagQuizFeed";
import DiagLoading from "./DiagLoading";
import DiagResult from "./DiagResult";

interface Props {
  config: DiagnosisConfig;
}

/** パーティクル1つ分のデータ */
interface ParticleData {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
  // パーティクルタイプごとに追加データ
  opacity?: number;
  char?: string; // 文字ベースのパーティクル用（hearts, sparkles, leaves）
}

/** 浮遊SVGモチーフ1つ分のデータ */
interface FloatingMotifData {
  id: number;
  motifIndex: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  rotation: number;
}

/**
 * パーティクルタイプに応じたデータ配列を生成する
 */
function generateParticles(
  type: ParticleType,
  count: number,
  colors: string[]
): ParticleData[] {
  if (type === 'none' || count === 0 || colors.length === 0) return [];

  return Array.from({ length: count }, (_, i) => {
    const color = colors[i % colors.length];
    const base: ParticleData = {
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 2,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      color,
      opacity: 0.6 + Math.random() * 0.4,
    };

    switch (type) {
      case 'stars':
        // 小さい丸、twinkleアニメーション
        base.size = Math.random() * 2.5 + 0.5;
        break;
      case 'bubbles':
        // やや大きめの丸、ゆっくり上昇
        base.size = Math.random() * 6 + 3;
        base.duration = `${6 + Math.random() * 6}s`;
        base.opacity = 0.35 + Math.random() * 0.2;
        break;
      case 'sparkles':
        // キラキラ星型文字
        base.char = '✦';
        base.size = Math.random() * 10 + 6;
        break;
      case 'snow':
        // 白い粒、ゆっくり落下
        base.size = Math.random() * 3 + 1.5;
        base.duration = `${8 + Math.random() * 8}s`;
        base.opacity = 0.45 + Math.random() * 0.15;
        break;
      case 'hearts':
        // 小さいハート
        base.char = '♥';
        base.size = Math.random() * 10 + 8;
        base.duration = `${6 + Math.random() * 6}s`;
        base.opacity = 0.4 + Math.random() * 0.2;
        break;
      case 'leaves':
        // 小さい葉
        base.char = '🍃';
        base.size = Math.random() * 10 + 8;
        base.duration = `${8 + Math.random() * 8}s`;
        base.opacity = 0.4 + Math.random() * 0.2;
        break;
      case 'lightning':
        // ランダムな閃光（数は少なく、大きめ）
        base.size = Math.random() * 60 + 40;
        base.duration = `${2 + Math.random() * 4}s`;
        base.delay = `${Math.random() * 8}s`;
        base.opacity = 0.05 + Math.random() * 0.1;
        break;
      case 'orbs':
        // 大きめの光の球（3-5個程度）
        base.size = Math.random() * 80 + 40;
        base.duration = `${10 + Math.random() * 10}s`;
        base.opacity = 0.06 + Math.random() * 0.08;
        break;
      case 'pixels':
        // 小さい四角、マトリックス風に落下
        base.size = Math.random() * 4 + 2;
        base.duration = `${4 + Math.random() * 6}s`;
        base.opacity = 0.3 + Math.random() * 0.5;
        break;
    }

    return base;
  });
}

/**
 * 浮遊SVGモチーフのデータ配列を生成する
 */
function generateFloatingMotifs(motifCount: number): FloatingMotifData[] {
  // 5-8個のモチーフを生成
  const count = Math.min(Math.max(5, Math.floor(Math.random() * 4) + 5), 8);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    motifIndex: i % motifCount,
    top: `${10 + Math.random() * 75}%`,
    left: `${5 + Math.random() * 85}%`,
    size: 25 + Math.random() * 30,
    delay: Math.random() * 8,
    duration: 15 + Math.random() * 15,
    opacity: 0.15 + Math.random() * 0.15,
    rotation: Math.random() * 360,
  }));
}

/**
 * パーティクルタイプに応じたアニメーション名を取得する
 */
function getParticleAnimation(type: ParticleType): string {
  switch (type) {
    case 'stars': return 'twinkle';
    case 'bubbles': return 'particleBubbleRise';
    case 'sparkles': return 'particleSparkle';
    case 'snow': return 'particleSnowFall';
    case 'hearts': return 'particleHeartFloat';
    case 'leaves': return 'particleLeafFall';
    case 'lightning': return 'particleLightningFlash';
    case 'orbs': return 'particleOrbFloat';
    case 'pixels': return 'particlePixelFall';
    default: return 'twinkle';
  }
}

/**
 * パーティクルタイプに応じたスタイルを返す
 */
function getParticleStyle(p: ParticleData, type: ParticleType): React.CSSProperties {
  const animName = getParticleAnimation(type);
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: p.top,
    left: p.left,
    animation: `${animName} ${p.duration} ${p.delay} infinite`,
    opacity: p.opacity ?? 0.6,
    pointerEvents: 'none',
  };

  // 文字ベースのパーティクル
  if (p.char) {
    return {
      ...baseStyle,
      fontSize: p.size,
      color: p.color,
      lineHeight: 1,
    };
  }

  // ドット/球ベースのパーティクル
  switch (type) {
    case 'pixels':
      return {
        ...baseStyle,
        width: p.size,
        height: p.size,
        background: p.color,
        // 四角（borderRadiusなし）
      };
    case 'lightning':
      return {
        ...baseStyle,
        width: p.size,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
        borderRadius: 1,
        filter: `blur(1px)`,
      };
    case 'orbs':
      return {
        ...baseStyle,
        width: p.size,
        height: p.size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${p.color}40, transparent 70%)`,
        filter: 'blur(8px)',
      };
    default:
      // stars, bubbles, snow はすべて丸
      return {
        ...baseStyle,
        width: p.size,
        height: p.size,
        borderRadius: '50%',
        background: p.color,
      };
  }
}

export default function DiagnosticEngine({ config }: Props) {
  // ストアをconfigに基づいて動的生成（useMemoで1回だけ）
  const useStore = useMemo(
    () => createDiagnosticStore(config.questions.length, config.dimensions.length),
    [config]
  );
  const store = useStore();

  // 診断テーマを取得
  const theme = useMemo(() => getDiagnosticTheme(config.id), [config.id]);

  // グローバルプロフィール（プロフィールステップ自動スキップ用）
  const globalProfile = usePersonaStore((s) => s.globalProfile);

  // 初期表示時にlandingステップへ
  useEffect(() => {
    store.setCurrentStep("landing");
  }, []);

  // プロフィールステップ自動スキップ:
  // globalProfileのgenderとageが設定済みで、profileFieldsがgender/ageのみの場合、
  // profileステップを飛ばして直接quizへ遷移する（ちらつき防止）
  useEffect(() => {
    if (store.currentStep !== "profile") return;
    if (!globalProfile.gender || globalProfile.age === null) return;

    const fieldIds = config.profileFields.map((f) => f.id);
    const allCoveredByGlobal = fieldIds.every(
      (id) => id === "gender" || id === "age"
    );
    if (allCoveredByGlobal) {
      // globalProfileの値をストアにセット
      store.setProfileField("gender", globalProfile.gender);
      store.setProfileField("age", globalProfile.age);
      store.setCurrentStep("quiz");
    }
  }, [store.currentStep, globalProfile, config.profileFields]);

  // パーティクル（ハイドレーション対策でクライアントのみ生成）
  const [particles, setParticles] = useState<ParticleData[]>([]);
  useEffect(() => {
    setParticles(
      generateParticles(theme.particleType, theme.particleCount, theme.particleColors)
    );
  }, [theme]);

  // 浮遊SVGモチーフ（ハイドレーション対策でクライアントのみ生成）
  const [floatingMotifs, setFloatingMotifs] = useState<FloatingMotifData[]>([]);
  useEffect(() => {
    if (theme.svgMotifs && theme.svgMotifs.length > 0) {
      setFloatingMotifs(generateFloatingMotifs(theme.svgMotifs.length));
    }
  }, [theme]);

  return (
    <div
      style={{
        // テーマCSS変数を設定
        ['--diag-primary' as string]: config.themeColor,
        ['--diag-from' as string]: config.gradientFrom,
        ['--diag-to' as string]: config.gradientTo,
        ['--diag-bg' as string]: theme.bgColor,
        ['--diag-card-bg' as string]: theme.cardBg,
        ['--diag-card-border' as string]: theme.cardBorder,
        background: theme.bgGradient,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {/* 背景：診断テーマパターン */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          ...theme.bgStyle,
        }}
        aria-hidden="true"
      />

      {/* 背景：パーティクル */}
      {particles.length > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          {particles.map((p) =>
            p.char ? (
              <span key={p.id} style={getParticleStyle(p, theme.particleType)}>
                {p.char}
              </span>
            ) : (
              <div key={p.id} style={getParticleStyle(p, theme.particleType)} />
            )
          )}
        </div>
      )}

      {/* 背景：テーマ固有の浮遊SVGモチーフ */}
      {theme.svgMotifs && theme.svgMotifs.length > 0 && floatingMotifs.length > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          {floatingMotifs.map((motif) => (
            <div
              key={motif.id}
              style={{
                position: "absolute",
                top: motif.top,
                left: motif.left,
                width: motif.size,
                height: motif.size,
                opacity: motif.opacity,
                color: config.themeColor,
                // GPU加速を使用した軽量アニメーション
                animation: `motifFloat ${motif.duration}s ${motif.delay}s ease-in-out infinite`,
                transform: `rotate(${motif.rotation}deg)`,
                willChange: 'transform',
                pointerEvents: 'none',
              }}
              dangerouslySetInnerHTML={{
                __html: `<svg viewBox="0 0 20 20" width="${motif.size}" height="${motif.size}" xmlns="http://www.w3.org/2000/svg">${theme.svgMotifs![motif.motifIndex]}</svg>`,
              }}
            />
          ))}
        </div>
      )}

      {/* 背景：グラデーションメッシュ（奥行きのある背景） */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: [
            `radial-gradient(ellipse 80% 60% at 10% 20%, ${theme.blob1Color}30, transparent 60%)`,
            `radial-gradient(ellipse 60% 80% at 90% 80%, ${theme.blob2Color}30, transparent 60%)`,
            `radial-gradient(ellipse 70% 50% at 80% 15%, ${theme.blob1Color}18, transparent 55%)`,
            `radial-gradient(ellipse 50% 70% at 20% 85%, ${theme.blob2Color}18, transparent 55%)`,
          ].join(', '),
          animation: "meshShift 20s ease-in-out infinite alternate",
          willChange: "opacity",
        }}
        aria-hidden="true"
      />

      {/* 背景：ブロブ（テーマ色で差別化）4つ配置 */}
      {/* ブロブ1: 左上（大きめ） */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "-10%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.blob1Color}, transparent 70%)`,
          filter: "blur(60px)",
          animation: "blobFloat 8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* ブロブ2: 右下（大きめ） */}
      <div
        style={{
          position: "fixed",
          bottom: "8%",
          right: "-8%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.blob2Color}, transparent 70%)`,
          filter: "blur(60px)",
          animation: "blobFloat 10s 2s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* ブロブ3: 右上（小さめ） */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          right: "-5%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.blob2Color}, transparent 70%)`,
          filter: "blur(50px)",
          animation: "blobFloat 12s 4s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* ブロブ4: 左下（小さめ） */}
      <div
        style={{
          position: "fixed",
          bottom: "15%",
          left: "-6%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.blob1Color}, transparent 70%)`,
          filter: "blur(50px)",
          animation: "blobFloat 14s 6s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* 背景：下部グラデーションフェード */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30vh",
          background: `linear-gradient(to bottom, transparent, ${theme.bgColor}90)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* メインコンテンツ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {store.currentStep === "landing" && (
          <DiagLanding config={config} store={store} />
        )}
        {store.currentStep === "profile" && (
          <DiagProfileSetup config={config} store={store} />
        )}
        {store.currentStep === "quiz" && (
          <DiagQuizFeed config={config} store={store} />
        )}
        {store.currentStep === "loading" && (
          <DiagLoading config={config} store={store} />
        )}
        {store.currentStep === "result" && (
          <DiagResult config={config} store={store} />
        )}
      </div>

      {/* 浮遊モチーフ・メッシュグラデーション用のCSSアニメーション定義 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes motifFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-12px) rotate(5deg) scale(1.05);
          }
          50% {
            transform: translateY(-6px) rotate(-3deg) scale(0.97);
          }
          75% {
            transform: translateY(-15px) rotate(4deg) scale(1.03);
          }
        }
        @keyframes meshShift {
          0% {
            opacity: 0.7;
            filter: hue-rotate(0deg);
          }
          50% {
            opacity: 1;
            filter: hue-rotate(8deg);
          }
          100% {
            opacity: 0.8;
            filter: hue-rotate(-5deg);
          }
        }
      `}} />
    </div>
  );
}
