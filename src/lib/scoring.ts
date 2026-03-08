/**
 * トキメキ診断 スコアリングモジュール
 *
 * 8次元の回答スコアから恋愛タイプを判定する。
 * 次元の順序: [Passion, Anx, Avo, Pragma, Agape, Storge, Growth, Ludus]
 */

import { QUESTIONS } from './questions';
import { TYPES, type LoveType } from './types';

/**
 * 8次元の正規化スコア（各0-100）からタイプスコアを計算する。
 * 各タイプ固有の重み付け式により、そのタイプへの適合度を数値化する。
 *
 * @param norm - 正規化済み8次元スコア [Passion, Anx, Avo, Pragma, Agape, Storge, Growth, Ludus]
 * @param typeId - タイプ識別子（例: 'EROS', 'STORGE' など）
 * @returns タイプスコア（高いほどそのタイプに近い）
 */
export function calcTypeScore(norm: number[], typeId: string): number {
  const [P, A, Av, Pr, Ag, St, Gr, Lu] = norm;

  switch (typeId) {
    // 情熱型: 強い情熱、低不安、低回避、高献身
    case 'EROS':
      return P * 3 + (100 - A) * 0.5 + (100 - Av) * 0.5 + Ag * 0.5;
    // 友情型: 高安定、低不安、成長志向、非遊戯的
    case 'STORGE':
      return St * 3 + (100 - A) * 0.8 + Gr * 0.8 + (100 - Lu) * 0.5;
    // 実利型: 高実利、低不安、成長志向、非遊戯的
    case 'PRAGMA':
      return Pr * 3 + (100 - A) * 0.5 + Gr * 0.5 + (100 - Lu) * 0.5;
    // 献身型: 高献身、低回避、高安定、非遊戯的
    case 'AGAPE':
      return Ag * 3 + (100 - Av) * 0.8 + St * 0.5 + (100 - Lu) * 0.5;
    // 狂気型: 高不安、高情熱、低回避
    case 'MANIA':
      return A * 3 + P * 1.2 + (100 - Av) * 0.5;
    // 遊戯型: 高遊戯、高回避、低不安、低献身
    case 'LUDUS':
      return Lu * 3 + Av * 1.2 + (100 - A) * 0.8 + (100 - Ag) * 0.5;
    // 成長型: 高成長、高安定、実利的、情熱的
    case 'GROWTH':
      return Gr * 3 + St * 0.8 + Pr * 0.5 + P * 0.5;
    // 回避型: 高回避、高遊戯、低不安、低献身
    case 'AVOIDANT':
      return Av * 3 + Lu * 0.8 + (100 - A) * 1.2 + (100 - Ag) * 0.5;
    // 相補型: 低回避、高献身、高成長、高情熱
    case 'COMPLEMENT':
      return (100 - Av) * 0.8 + Ag * 1.2 + Gr * 1.2 + P * 0.8;
    // 理想型: 高情熱、高成長、低実利、やや不安
    case 'IDEALIST':
      return P * 1.2 + Gr * 1.5 + (100 - Pr) * 0.5 + A * 0.5;
    // 安定型: 低不安、低回避、高安定、高献身
    case 'SECURE':
      return (100 - A) * 2 + (100 - Av) * 1.5 + St * 1.2 + Ag * 0.8;
    // 知性型: 高成長、高実利、高安定、低不安
    case 'INTELLECTUAL':
      return Gr * 2 + Pr * 1.2 + St * 0.8 + (100 - A) * 0.5;
    default:
      return 0;
  }
}

/**
 * rawスコア（回答の重み合計）を0-100の範囲に正規化する。
 * 各次元の理論上の最大値・最小値を質問の重みから自動計算し、線形変換する。
 *
 * @param scores - 8次元のrawスコア配列
 * @returns 0-100に正規化された8次元スコア配列
 */
export function normalizeScores(scores: number[]): number[] {
  // 各次元の理論上の最大値・最小値を質問の重みから計算
  // 各質問は1-5の5段階で回答されるため、重みが正なら最大5倍、負なら最小5倍
  const maxP = new Array(8).fill(0);
  const minP = new Array(8).fill(0);

  QUESTIONS.forEach((q) => {
    q.weights.forEach((w, i) => {
      if (w > 0) maxP[i] += w * 5;
      if (w < 0) minP[i] += w * 5;
    });
  });

  return scores.map((s, i) => {
    const range = maxP[i] - minP[i];
    // 理論上ありえないが、範囲が0なら中間値を返す
    if (range === 0) return 50;
    return Math.round(((s - minP[i]) / range) * 100);
  });
}

/**
 * 正規化済み8次元スコアから、最も適合する恋愛タイプを判定する。
 * 全タイプのスコアを計算し、最高スコアのタイプを返す。
 *
 * @param norm - 正規化済み8次元スコア（各0-100）
 * @returns 最も適合するLoveType オブジェクト
 */
export function findBestType(norm: number[]): LoveType {
  const typeScores = TYPES.map((t) => ({
    type: t,
    score: calcTypeScore(norm, t.id),
  }));

  // スコアの高い順にソート
  typeScores.sort((a, b) => b.score - a.score);

  return typeScores[0].type;
}
