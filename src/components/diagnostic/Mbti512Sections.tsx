"use client";

/**
 * MBTI-512 実用セクションコンポーネント
 *
 * 512タイプ診断結果に面接対策・キャリア適性・人間関係アドバイスなどの
 * 実用的な情報セクションを追加表示する。
 * 対象: 日本の高校生・大学生
 */

import { useState, useCallback, useMemo } from "react";
import { determineModifiers, type ModifierResult } from "@/lib/mbti512-modifiers";
import {
  INTERVIEW_TRAIT_MAP,
  INTERVIEW_QA_TEMPLATES,
  CAREER_MAP,
  LEARNING_STYLE_MAP,
  GROUP_ROLE_MAP,
  FRIEND_ADVICE_MAP,
  CIRCLE_ADVICE_MAP,
} from "@/lib/mbti512-content";

// === 型定義 ===

interface Mbti512SectionsProps {
  /** 基本タイプ情報 */
  bestType: {
    id: string;
    name: string;
    tag: string;
    emoji: string;
    color: string;
    description: string;
    advice: string;
    traits: string[];
    scoreWeights: number[];
  };
  /** 正規化済み9次元スコア (0-100) */
  normalizedScores: number[];
  /** テーマカラー */
  themeColor: string;
}

// === 共通スタイル定数 ===

/** 次元ラベル（日本語表示用） */
const DIMENSION_LABELS = [
  "外向性↔内向性",
  "感覚↔直感",
  "思考↔感情",
  "判断↔知覚",
  "果断↔慎重",
  "熱意↔クール",
  "安定↔反応",
  "自己主張度",
  "適応柔軟性",
];

// === ユーティリティ関数 ===

/** bestType.idからベースMBTI 4文字を取得する */
function extractBaseMbti(typeId: string): string {
  // 例: "intj-a-h-s" → "INTJ"
  return typeId.split("-")[0].toUpperCase();
}

/** hex色をrgba形式に変換 */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// === サブコンポーネント ===

/** アコーディオンセクションのヘッダー */
function SectionHeader({
  title,
  subtitle,
  isOpen,
  onToggle,
  themeColor,
}: {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  themeColor: string;
}) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            color: themeColor,
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "13px",
              color: "#888",
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <span
        style={{
          fontSize: "20px",
          color: themeColor,
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          flexShrink: 0,
          marginLeft: "12px",
        }}
      >
        ▼
      </span>
    </button>
  );
}

/** カード型ラッパー */
function SectionCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        overflow: "hidden",
        marginTop: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** タグチップ */
function TagChip({
  label,
  themeColor,
}: {
  label: string;
  themeColor: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        margin: "4px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: 500,
        color: themeColor,
        background: hexToRgba(themeColor, 0.1),
        fontFamily: "'Zen Maru Gothic', sans-serif",
      }}
    >
      {label}
    </span>
  );
}

// === メインコンポーネント ===

export default function Mbti512Sections({
  bestType,
  normalizedScores,
  themeColor,
}: Mbti512SectionsProps) {
  // モディファイアの判定
  const modifier: ModifierResult = useMemo(
    () => determineModifiers(normalizedScores),
    [normalizedScores]
  );

  // ベースMBTI 4文字
  const baseMbti = useMemo(() => extractBaseMbti(bestType.id), [bestType.id]);

  // 512タイプのフルネーム
  const fullTypeName = `${bestType.name} - ${modifier.subtitle} ${modifier.label}型`;

  // アコーディオンの開閉状態（AIプロフィールのみ初期展開）
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    aiProfile: true,
    interview: false,
    career: false,
    relationship: false,
  });

  // コピーボタンの状態
  const [copied, setCopied] = useState(false);

  /** セクションの開閉をトグル */
  const toggleSection = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // === 派生データの計算 ===

  // E/I判定 (norm[0] > 50 = E)
  const isExtraverted = normalizedScores[0] > 50;
  // S/N判定 (norm[1] > 50 = S)
  const isSensing = normalizedScores[1] > 50;
  // T/F判定 (norm[2] > 50 = T)
  const isThinking = normalizedScores[2] > 50;
  // J/P判定 (norm[3] > 50 = J)
  const isJudging = normalizedScores[3] > 50;
  // H/C判定 (norm[5] > 50 = H)
  const isHot = normalizedScores[5] > 50;
  // assert判定 (norm[7] > 50 = high)
  const isHighAssert = normalizedScores[7] > 50;
  // flex判定 (norm[8] > 50 = high)
  const isHighFlex = normalizedScores[8] > 50;

  // 面接QAパターン
  const interviewPattern = `${isExtraverted ? "E" : "I"}${isThinking ? "T" : "F"}`;
  // 学習スタイルパターン
  const learningPattern = `${isSensing ? "S" : "N"}${isJudging ? "J" : "P"}`;
  // グループワークパターン
  const groupPattern = `${isExtraverted ? "E" : "I"}-${isHighAssert ? "high" : "low"}`;
  // 友達づくりパターン
  const friendPattern = `${isExtraverted ? "E" : "I"}${isHot ? "H" : "C"}`;
  // サークルパターン
  const circlePattern = `${isHighAssert ? "high" : "low"}-${isHighFlex ? "high" : "low"}`;

  // 全特性リスト（ベース + モディファイア）
  const allTraits = [...bestType.traits, ...modifier.traits];

  // === AIプロフィールテキスト生成 ===

  const profileText = useMemo(() => {
    const descSnippet = bestType.description.slice(0, 200);
    const traitsStr = allTraits.join("、");
    const weaknessLines = modifier.weaknesses
      .map((w) => `  ・${w.raw} → ${w.reframed}`)
      .join("\n");
    const scoreLines = normalizedScores
      .map((s, i) => `  ${DIMENSION_LABELS[i]}: ${Math.round(s)}/100`)
      .join("\n");

    return `【あなたの性格プロフィール（MBTI-512診断結果）】

■ タイプ: ${bestType.emoji} ${fullTypeName}
■ キャッチフレーズ: ${bestType.tag}

■ 基本性格:
${descSnippet}
${modifier.description}

■ 9次元スコア:
${scoreLines}

■ 強み: ${traitsStr}
■ 弱みとポジティブな言い換え:
${weaknessLines}

■ コミュニケーションスタイル: ${modifier.communicationStyle}
■ ストレス耐性: ${modifier.stressProfile}
■ リーダーシップ傾向: ${modifier.leadershipStyle}

※ この情報を元に、面接対策・自己PR・志望動機の作成をお願いします。`;
  }, [bestType, modifier, normalizedScores, fullTypeName, allTraits]);

  /** クリップボードにコピー */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profileText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // フォールバック: テキストエリア経由でコピー
      const textarea = document.createElement("textarea");
      textarea.value = profileText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [profileText]);

  // === 面接用データ ===

  // 特性→面接フレーズのマッピング
  const interviewTraits = allTraits
    .map((trait) => ({
      trait,
      phrase: INTERVIEW_TRAIT_MAP[trait] || null,
    }))
    .filter((item) => item.phrase !== null);

  // 自己PRテンプレート（最初の2つの特性を使用）
  const prTemplate = useMemo(() => {
    const t1 = interviewTraits[0];
    const t2 = interviewTraits[1];
    if (!t1) return null;
    let text = `私の強みは${t1.trait}です。${t1.phrase}`;
    if (t2) {
      text += `また、${t2.trait}も強みで、${t2.phrase}`;
    }
    return text;
  }, [interviewTraits]);

  // 面接QA
  const qaTemplates = INTERVIEW_QA_TEMPLATES[interviewPattern] || [];

  // === キャリアデータ ===
  const careerData = CAREER_MAP[baseMbti];
  const learningData = LEARNING_STYLE_MAP[learningPattern];
  const groupData = GROUP_ROLE_MAP[groupPattern];

  // === 人間関係データ ===
  const friendData = FRIEND_ADVICE_MAP[friendPattern];
  const circleData = CIRCLE_ADVICE_MAP[circlePattern];

  // === レンダリング ===

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "0 16px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
      }}
    >
      {/* ========================================
          セクション1: 512タイプ名バナー
          ======================================== */}
      <div
        style={{
          marginTop: "24px",
          padding: "28px 24px",
          borderRadius: "20px",
          background: `linear-gradient(135deg, ${themeColor}, ${hexToRgba(themeColor, 0.7)})`,
          color: "#fff",
          textAlign: "center",
          boxShadow: `0 8px 32px ${hexToRgba(themeColor, 0.3)}`,
        }}
      >
        <div
          style={{
            fontSize: "40px",
            marginBottom: "8px",
          }}
        >
          {bestType.emoji}
        </div>
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: "14px",
            fontWeight: 500,
            opacity: 0.9,
            letterSpacing: "2px",
            fontFamily: "'Stick', sans-serif",
          }}
        >
          {baseMbti}
        </h2>
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "24px",
            fontWeight: 800,
            lineHeight: 1.3,
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          {bestType.name} - {modifier.subtitle}
        </h1>
        <div
          style={{
            display: "inline-block",
            padding: "4px 16px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.2)",
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "'Stick', sans-serif",
          }}
        >
          {modifier.label}型
        </div>
        <p
          style={{
            margin: "12px 0 0",
            fontSize: "13px",
            opacity: 0.85,
            lineHeight: 1.6,
          }}
        >
          {bestType.tag}
        </p>
      </div>

      {/* ========================================
          セクション2: AIコピペ用プロフィール
          ======================================== */}
      <SectionCard>
        <SectionHeader
          title="AI活用プロフィール"
          subtitle="ChatGPTやClaudeに貼り付けて、面接対策・自己PR作成に使えます"
          isOpen={openSections.aiProfile}
          onToggle={() => toggleSection("aiProfile")}
          themeColor={themeColor}
        />
        {openSections.aiProfile && (
          <div style={{ padding: "0 20px 20px" }}>
            {/* プロフィールテキスト表示エリア */}
            <div
              style={{
                position: "relative",
                background: "#f8f9fa",
                border: "1px solid #e9ecef",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
              }}
            >
              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: "12px",
                  lineHeight: 1.7,
                  color: "#333",
                  fontFamily: "'Zen Maru Gothic', monospace",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {profileText}
              </pre>
            </div>

            {/* コピーボタン */}
            <button
              onClick={handleCopy}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: copied ? "#28a745" : themeColor,
                color: "#fff",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.3s ease",
                fontFamily: "'Zen Maru Gothic', sans-serif",
              }}
            >
              {copied ? "コピーしました！" : "コピーする"}
            </button>
          </div>
        )}
      </SectionCard>

      {/* ========================================
          セクション3: 面接対策セクション
          ======================================== */}
      <SectionCard>
        <SectionHeader
          title="面接対策ガイド"
          subtitle="入試・就活・バイト面接で使える自己PR"
          isOpen={openSections.interview}
          onToggle={() => toggleSection("interview")}
          themeColor={themeColor}
        />
        {openSections.interview && (
          <div style={{ padding: "0 20px 20px" }}>
            {/* --- a. 自己PRテンプレート --- */}
            <h4
              style={{
                margin: "0 0 12px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#333",
              }}
            >
              自己PRテンプレート
            </h4>

            {/* 特性→面接フレーズ一覧 */}
            <ul
              style={{
                margin: "0 0 16px",
                paddingLeft: "20px",
                listStyle: "disc",
              }}
            >
              {interviewTraits.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#444",
                    marginBottom: "8px",
                  }}
                >
                  <strong style={{ color: themeColor }}>{item.trait}</strong>
                  ：{item.phrase}
                </li>
              ))}
              {/* 特性がマップにない場合のフォールバック表示 */}
              {interviewTraits.length === 0 && (
                <li
                  style={{
                    fontSize: "13px",
                    color: "#888",
                  }}
                >
                  {allTraits.join("、")}
                </li>
              )}
            </ul>

            {/* 組み合わせ自己PR文 */}
            {prTemplate && (
              <div
                style={{
                  background: hexToRgba(themeColor, 0.06),
                  border: `1px solid ${hexToRgba(themeColor, 0.15)}`,
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "24px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: themeColor,
                  }}
                >
                  自己PR例文
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: 1.8,
                    color: "#333",
                  }}
                >
                  {prTemplate}
                </p>
              </div>
            )}

            {/* --- b. 弱みの伝え方 --- */}
            <h4
              style={{
                margin: "0 0 12px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#333",
              }}
            >
              弱みの伝え方
            </h4>
            <div style={{ marginBottom: "24px" }}>
              {modifier.weaknesses.map((w, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "10px",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#444",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      color: themeColor,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}.
                  </span>
                  <div>
                    <span style={{ color: "#888" }}>「{w.raw}」</span>
                    <br />
                    <span style={{ color: themeColor, fontWeight: 600 }}>
                      → 面接では「{w.reframed}」と伝えましょう
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* --- c. 想定質問と回答ヒント --- */}
            <h4
              style={{
                margin: "0 0 12px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#333",
              }}
            >
              想定質問と回答ヒント
            </h4>
            {qaTemplates.map((qa, i) => (
              <div
                key={i}
                style={{
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "12px",
                  borderLeft: `3px solid ${themeColor}`,
                }}
              >
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  Q. {qa.question}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#666",
                  }}
                >
                  {qa.hint}
                </p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* ========================================
          セクション4: 学業・キャリア適性
          ======================================== */}
      <SectionCard>
        <SectionHeader
          title="学業・キャリア適性"
          isOpen={openSections.career}
          onToggle={() => toggleSection("career")}
          themeColor={themeColor}
        />
        {openSections.career && (
          <div style={{ padding: "0 20px 20px" }}>
            {/* --- a. 向いている学部・職種 --- */}
            {careerData && (
              <>
                <h4
                  style={{
                    margin: "0 0 12px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  向いている学部・職種
                </h4>

                <div style={{ marginBottom: "8px" }}>
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#555",
                    }}
                  >
                    おすすめ学部
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {careerData.departments.map((dept) => (
                      <TagChip key={dept} label={dept} themeColor={themeColor} />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <p
                    style={{
                      margin: "8px 0",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#555",
                    }}
                  >
                    おすすめ職種
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {careerData.jobs.map((job) => (
                      <TagChip key={job} label={job} themeColor={themeColor} />
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    margin: "0 0 24px",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#666",
                    background: "#f8f9fa",
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  {careerData.reason}
                </p>
              </>
            )}

            {/* --- b. 学習スタイル --- */}
            {learningData && (
              <>
                <h4
                  style={{
                    margin: "0 0 12px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  あなたの学習スタイル
                </h4>
                <div
                  style={{
                    background: hexToRgba(themeColor, 0.06),
                    borderRadius: "12px",
                    padding: "14px 16px",
                    marginBottom: "24px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: themeColor,
                    }}
                  >
                    {learningData.style}
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "18px",
                      listStyle: "disc",
                    }}
                  >
                    {learningData.tips.map((tip, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.7,
                          color: "#444",
                          marginBottom: "4px",
                        }}
                      >
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* --- c. グループワーク役割 --- */}
            {groupData && (
              <>
                <h4
                  style={{
                    margin: "0 0 12px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  グループワークでの役割
                </h4>
                <div
                  style={{
                    borderRadius: "12px",
                    border: `1px solid ${hexToRgba(themeColor, 0.2)}`,
                    padding: "14px 16px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 6px",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: themeColor,
                    }}
                  >
                    {groupData.role}
                  </p>
                  <p
                    style={{
                      margin: "0 0 12px",
                      fontSize: "13px",
                      lineHeight: 1.7,
                      color: "#555",
                    }}
                  >
                    {groupData.description}
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "18px",
                      listStyle: "disc",
                    }}
                  >
                    {groupData.tips.map((tip, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.7,
                          color: "#444",
                          marginBottom: "4px",
                        }}
                      >
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </SectionCard>

      {/* ========================================
          セクション5: 人間関係アドバイス
          ======================================== */}
      <SectionCard>
        <SectionHeader
          title="人間関係のコツ"
          isOpen={openSections.relationship}
          onToggle={() => toggleSection("relationship")}
          themeColor={themeColor}
        />
        {openSections.relationship && (
          <div style={{ padding: "0 20px 20px" }}>
            {/* --- a. 友達づくり --- */}
            {friendData && (
              <>
                <h4
                  style={{
                    margin: "0 0 12px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  友達づくり
                </h4>
                <div
                  style={{
                    background: hexToRgba(themeColor, 0.06),
                    borderRadius: "12px",
                    padding: "14px 16px",
                    marginBottom: "24px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: themeColor,
                    }}
                  >
                    {friendData.style}
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "18px",
                      listStyle: "disc",
                    }}
                  >
                    {friendData.tips.map((tip, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.7,
                          color: "#444",
                          marginBottom: "4px",
                        }}
                      >
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* --- b. サークル・部活での立ち回り --- */}
            {circleData && (
              <>
                <h4
                  style={{
                    margin: "0 0 12px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  サークル・部活での立ち回り
                </h4>
                <div
                  style={{
                    borderRadius: "12px",
                    border: `1px solid ${hexToRgba(themeColor, 0.2)}`,
                    padding: "14px 16px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 6px",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: themeColor,
                    }}
                  >
                    {circleData.position}
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "18px",
                      listStyle: "disc",
                    }}
                  >
                    {circleData.tips.map((tip, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.7,
                          color: "#444",
                          marginBottom: "4px",
                        }}
                      >
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </SectionCard>

      {/* 下部スペーサー */}
      <div style={{ height: "40px" }} />
    </div>
  );
}
