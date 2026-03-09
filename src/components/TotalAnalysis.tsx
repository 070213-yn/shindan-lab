"use client";

/**
 * 統合パーソナリティ分析コンポーネント
 *
 * 全診断結果を横断的にクロスリファレンスして、
 * 心理学的フレームワークに基づく人格分析を表示する。
 *
 * 使用する理論:
 * - Big Five (OCEAN) - Costa & McCrae (1992)
 * - 自己決定理論 (SDT) - Deci & Ryan (2000)
 * - VIA性格強み - Peterson & Seligman (2004)
 * - キャリアアンカー - Schein (1990)
 * - 愛着理論 - Bowlby (1969), Hazan & Shaver (1987)
 * - エリクソン発達段階 - Erikson (1950)
 */

import { useMemo, useState, useEffect } from "react";
import { usePersonaStore } from "@/store/personaStore";
import { generateTotalAnalysis, type TotalAnalysis as TotalAnalysisType } from "@/lib/totalAnalysisEngine";

// ==========================================================
// SVGレーダーチャート（Big Five用）
// ==========================================================

/** Big Five レーダーチャートをSVGで描画 */
function BigFiveRadar({ bigFive }: { bigFive: TotalAnalysisType['bigFive'] }) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 100;

  const labels = [
    { key: 'openness', label: '開放性', short: 'O' },
    { key: 'conscientiousness', label: '誠実性', short: 'C' },
    { key: 'extraversion', label: '外向性', short: 'E' },
    { key: 'agreeableness', label: '協調性', short: 'A' },
    { key: 'neuroticism', label: '神経症傾向', short: 'N' },
  ];

  const values = labels.map((l) => bigFive[l.key as keyof typeof bigFive] as number);

  // ガイド多角形のポイントを計算する関数
  const getPoint = (index: number, scale: number) => {
    const angle = (index / 5) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * radius * scale,
      y: cy + Math.sin(angle) * radius * scale,
    };
  };

  // ガイド多角形のパスを生成
  const guidePath = (scale: number) => {
    const points = Array.from({ length: 5 }, (_, i) => getPoint(i, scale));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  // データ多角形のパスを生成
  const dataPath = () => {
    const points = values.map((v, i) => getPoint(i, v / 100));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }}>
      {/* ガイド多角形 */}
      {[0.33, 0.66, 1].map((scale) => (
        <path key={scale} d={guidePath(scale)} fill="none" stroke="rgba(45,212,191,0.12)" strokeWidth="1" />
      ))}

      {/* 軸線 */}
      {labels.map((_, i) => {
        const p = getPoint(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(45,212,191,0.1)" strokeWidth="1" />;
      })}

      {/* データ多角形 */}
      <path d={dataPath()} fill="rgba(45,212,191,0.2)" stroke="rgba(45,212,191,0.8)" strokeWidth="2" />

      {/* データ点 */}
      {values.map((v, i) => {
        const p = getPoint(i, v / 100);
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2dd4bf" stroke="#fff" strokeWidth="1" />;
      })}

      {/* ラベル */}
      {labels.map((l, i) => {
        const p = getPoint(i, 1.25);
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="#4a6572" fontSize="11">
            {l.label}
          </text>
        );
      })}

      {/* スコア表示 */}
      {values.map((v, i) => {
        const p = getPoint(i, v / 100);
        return (
          <text key={`score-${i}`} x={p.x} y={p.y - 10} textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="bold">
            {v}
          </text>
        );
      })}
    </svg>
  );
}

// ==========================================================
// セクションカードラッパー
// ==========================================================

/** 各分析セクションのカード */
function SectionCard({
  title,
  reference,
  delay,
  blurred,
  blurMessage,
  children,
}: {
  title: string;
  reference?: string;
  delay: number;
  blurred?: boolean;
  blurMessage?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(45,212,191,0.15)',
        borderRadius: 16,
        padding: '24px 20px',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
        animation: `staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) ${delay}s both`,
      }}
    >
      <h3
        className="font-stick"
        style={{
          fontSize: 16,
          color: '#2dd4bf',
          marginBottom: 16,
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </h3>

      {blurred ? (
        <div style={{ position: 'relative' }}>
          <div style={{ filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' }}>
            {children}
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 8,
            }}
          >
            <p style={{ fontSize: 13, color: '#4a6572', textAlign: 'center', padding: '0 16px' }}>
              {blurMessage || 'もっと診断を受けると解放されます'}
            </p>
          </div>
        </div>
      ) : (
        children
      )}

      {reference && (
        <p style={{ fontSize: 10, color: 'rgba(74,101,114,0.5)', marginTop: 14, lineHeight: 1.5 }}>
          {reference}
        </p>
      )}
    </div>
  );
}

// ==========================================================
// プログレスバー（信頼度メーター）
// ==========================================================

function ConfidenceMeter({
  confidence,
  confidenceLabel,
  completedCount,
}: {
  confidence: number;
  confidenceLabel: string;
  completedCount: number;
}) {
  // 次の段階に必要な残り診断数を計算
  const totalDiagnoses = 21;
  const remaining = totalDiagnoses - completedCount;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: '#4a6572' }}>
          分析精度: <strong style={{ color: '#2dd4bf' }}>{confidence}%</strong>
          <span style={{ fontSize: 11, color: 'rgba(74,101,114,0.6)', marginLeft: 8 }}>
            ({confidenceLabel})
          </span>
        </span>
        {remaining > 0 && (
          <span style={{ fontSize: 11, color: 'rgba(74,101,114,0.5)' }}>
            あと{remaining}個で精度UP
          </span>
        )}
      </div>
      <div
        style={{
          width: '100%',
          height: 8,
          background: 'rgba(45,212,191,0.08)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${confidence}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #2dd4bf, #38bdf8)',
            borderRadius: 4,
            transition: 'width 1s ease-out',
          }}
        />
      </div>
      <p style={{ fontSize: 11, color: 'rgba(74,101,114,0.5)', marginTop: 6 }}>
        {completedCount}個の診断結果を統合中
      </p>
    </div>
  );
}

// ==========================================================
// メインコンポーネント
// ==========================================================

export default function TotalAnalysis() {
  const { results, globalProfile } = usePersonaStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedCount = Object.keys(results).length;

  // 分析結果を計算（useMemoでキャッシュ）
  const analysis = useMemo(() => {
    if (completedCount === 0) return null;
    return generateTotalAnalysis(results, globalProfile);
  }, [results, globalProfile, completedCount]);

  // マウント前またはデータなしは非表示
  if (!mounted || !analysis) return null;

  // 信頼度が低い（3診断以下）場合の一部セクションのぼかし判定
  const isLowConfidence = completedCount <= 3;
  const unlockMessage = `あと${4 - completedCount}個診断を受けると解放されます`;

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>
      {/* セクションヘッダー */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 24,
          animation: 'staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) both',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 8 }}>{'\u{1F9EC}'}</div>
        <h2
          className="font-stick"
          style={{ fontSize: 'clamp(18px, 5vw, 24px)', color: '#2dd4bf', marginBottom: 6 }}
        >
          統合パーソナリティ分析
        </h2>
        <p style={{ fontSize: 12, color: '#4a6572', lineHeight: 1.7 }}>
          心理学的フレームワークに基づく、あなただけの深層分析
        </p>
      </div>

      {/* 信頼度メーター */}
      <div style={{ animation: 'staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.1s both' }}>
        <ConfidenceMeter
          confidence={analysis.confidence}
          confidenceLabel={analysis.confidenceLabel}
          completedCount={analysis.completedCount}
        />
      </div>

      {/* Big Five レーダーチャート */}
      <SectionCard
        title="Big Five パーソナリティ"
        reference="Big Five (OCEAN) モデル - Costa & McCrae, 1992"
        delay={0.15}
      >
        <BigFiveRadar bigFive={analysis.bigFive} />
        <p className="font-zen" style={{ fontSize: 13, color: '#4a6572', lineHeight: 1.8, marginTop: 12 }}>
          {analysis.bigFive.interpretation}
        </p>
      </SectionCard>

      {/* 総合人格プロファイル */}
      <SectionCard
        title="総合人格プロファイル"
        reference="Big Five, SDT, VIA, 愛着理論の統合分析"
        delay={0.2}
        blurred={isLowConfidence}
        blurMessage={unlockMessage}
      >
        <p className="font-zen" style={{ fontSize: 13, color: '#4a6572', lineHeight: 2 }}>
          {analysis.personalityProfile}
        </p>
      </SectionCard>

      {/* 性格の強みトップ5 */}
      <SectionCard
        title="性格の強み TOP 5"
        reference="VIA性格強み - Peterson & Seligman, 2004"
        delay={0.25}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {analysis.characterStrengths.map((strength, i) => (
            <div
              key={strength.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                background: 'rgba(45,212,191,0.06)',
                borderRadius: 12,
                border: '1px solid rgba(45,212,191,0.1)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2dd4bf, #38bdf8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1a2e3b' }}>{strength.name}</span>
                  <span style={{ fontSize: 12, color: '#2dd4bf', fontWeight: 700 }}>{strength.score}</span>
                </div>
                <p style={{ fontSize: 11, color: 'rgba(74,101,114,0.6)', lineHeight: 1.5 }}>
                  {strength.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 自己決定理論 */}
      <SectionCard
        title="基本心理欲求"
        reference="自己決定理論 (SDT) - Deci & Ryan, 2000"
        delay={0.3}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[
            { label: '自律性', value: analysis.selfDetermination.autonomy, emoji: '\u{1F3AF}' },
            { label: '有能感', value: analysis.selfDetermination.competence, emoji: '\u{1F4AA}' },
            { label: '関係性', value: analysis.selfDetermination.relatedness, emoji: '\u{1F91D}' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                textAlign: 'center',
                padding: '14px 8px',
                background: 'rgba(45,212,191,0.06)',
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{item.emoji}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#2dd4bf' }}>{item.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(74,101,114,0.6)', marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
        <p className="font-zen" style={{ fontSize: 13, color: '#4a6572', lineHeight: 1.8 }}>
          {analysis.selfDetermination.advice}
        </p>
      </SectionCard>

      {/* 対人スタイル（愛着理論） */}
      <SectionCard
        title="対人スタイル"
        reference="愛着理論 - Bowlby (1969), Hazan & Shaver (1987)"
        delay={0.35}
        blurred={isLowConfidence}
        blurMessage={unlockMessage}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(45,212,191,0.15)',
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 700,
            color: '#38bdf8',
            marginBottom: 12,
          }}
        >
          {analysis.attachmentStyle.type}
        </div>
        <p className="font-zen" style={{ fontSize: 13, color: '#4a6572', lineHeight: 1.8, marginBottom: 10 }}>
          {analysis.attachmentStyle.description}
        </p>
        <div
          style={{
            padding: '12px 14px',
            background: 'rgba(45,212,191,0.06)',
            borderRadius: 10,
            borderLeft: '3px solid #2dd4bf',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(74,101,114,0.7)', lineHeight: 1.7 }}>
            {analysis.attachmentStyle.advice}
          </p>
        </div>
      </SectionCard>

      {/* キャリアアンカー */}
      <SectionCard
        title="キャリアアンカー"
        reference="キャリアアンカー理論 - Schein, 1990"
        delay={0.4}
        blurred={isLowConfidence}
        blurMessage={unlockMessage}
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <span
            style={{
              padding: '6px 14px',
              background: 'rgba(45,212,191,0.15)',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              color: '#38bdf8',
            }}
          >
            {analysis.careerAnchor.primary}
          </span>
          <span
            style={{
              padding: '6px 14px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 20,
              fontSize: 13,
              color: 'rgba(74,101,114,0.7)',
            }}
          >
            {analysis.careerAnchor.secondary}
          </span>
        </div>
        <p className="font-zen" style={{ fontSize: 13, color: '#4a6572', lineHeight: 1.8 }}>
          {analysis.careerAnchor.description}
        </p>
      </SectionCard>

      {/* 発達段階アドバイス */}
      <SectionCard
        title="発達段階アドバイス"
        reference="心理社会的発達段階 - Erikson, 1950"
        delay={0.45}
      >
        <p className="font-zen" style={{ fontSize: 13, color: '#4a6572', lineHeight: 1.8 }}>
          {analysis.developmentalAdvice}
        </p>
      </SectionCard>

      {/* 人生のアドバイス */}
      <SectionCard
        title="人生のアドバイス"
        delay={0.5}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {analysis.lifeAdvice.map((advice, i) => (
            <div
              key={i}
              style={{
                padding: '16px',
                background: 'rgba(45,212,191,0.04)',
                borderRadius: 12,
                border: '1px solid rgba(45,212,191,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{advice.emoji}</span>
                <div>
                  <span
                    style={{
                      fontSize: 10,
                      color: '#2dd4bf',
                      background: 'rgba(45,212,191,0.1)',
                      padding: '2px 8px',
                      borderRadius: 10,
                    }}
                  >
                    {advice.category}
                  </span>
                </div>
              </div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1a2e3b', marginBottom: 6 }}>
                {advice.title}
              </h4>
              <p className="font-zen" style={{ fontSize: 12, color: 'rgba(74,101,114,0.7)', lineHeight: 1.8, marginBottom: 8 }}>
                {advice.content}
              </p>
              <p style={{ fontSize: 10, color: 'rgba(74,101,114,0.5)', fontStyle: 'italic' }}>
                {advice.reference}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* クロスリファレンス発見 */}
      {analysis.crossInsights.length > 0 && (
        <SectionCard
          title="クロスリファレンス発見"
          reference="複数の診断結果の相関分析"
          delay={0.55}
          blurred={isLowConfidence}
          blurMessage={unlockMessage}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {analysis.crossInsights.map((insight, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  background: insight.significance === 'high'
                    ? 'rgba(45,212,191,0.08)'
                    : insight.significance === 'medium'
                    ? 'rgba(45,212,191,0.04)'
                    : 'rgba(255,255,255,0.4)',
                  borderRadius: 10,
                  borderLeft: `3px solid ${
                    insight.significance === 'high'
                      ? '#2dd4bf'
                      : insight.significance === 'medium'
                      ? 'rgba(45,212,191,0.5)'
                      : 'rgba(45,212,191,0.2)'
                  }`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 8,
                      background:
                        insight.significance === 'high'
                          ? 'rgba(45,212,191,0.2)'
                          : 'rgba(45,212,191,0.08)',
                      color:
                        insight.significance === 'high'
                          ? '#38bdf8'
                          : 'rgba(74,101,114,0.6)',
                    }}
                  >
                    {insight.significance === 'high' ? '重要' : insight.significance === 'medium' ? '注目' : '参考'}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(74,101,114,0.7)', lineHeight: 1.7 }}>
                  {insight.insight}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* もっと診断を受ける誘導 */}
      {completedCount < 21 && (
        <div
          style={{
            textAlign: 'center',
            padding: '20px 16px',
            animation: 'staggeredFadeUp 0.6s cubic-bezier(0.25,1,0.5,1) 0.6s both',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(74,101,114,0.6)', marginBottom: 12 }}>
            診断を受けるほど分析精度が向上します
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'rgba(45,212,191,0.12)',
              border: '1px solid rgba(45,212,191,0.25)',
              borderRadius: 25,
              color: '#2dd4bf',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            他の診断を受ける
          </a>
        </div>
      )}
    </div>
  );
}
