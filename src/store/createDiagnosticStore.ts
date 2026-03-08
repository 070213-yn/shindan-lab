/**
 * 汎用診断ストアファクトリ
 *
 * 任意の診断設定から、Zustandストアを動的に生成する。
 * 質問数・次元数は診断ごとに異なるため、引数で受け取る。
 */

import { create } from 'zustand';

export interface GenericDiagState {
  // プロフィール
  profileData: Record<string, string | number | null>;
  setProfileField: (key: string, value: string | number | null) => void;

  // 回答・スコア
  answers: (number | null)[];
  scores: number[];
  setAnswer: (index: number, value: number, weights: number[]) => void;

  // 画面遷移
  currentStep: 'landing' | 'profile' | 'quiz' | 'loading' | 'result';
  profileStep: number;
  setCurrentStep: (step: GenericDiagState['currentStep']) => void;
  setProfileStep: (step: number) => void;

  // リセット
  reset: () => void;
}

/**
 * 診断ストアを生成する
 * @param questionCount - 質問数
 * @param dimensionCount - スコアリング次元数
 */
export function createDiagnosticStore(questionCount: number, dimensionCount: number) {
  return create<GenericDiagState>((set) => ({
    // プロフィール
    profileData: {},
    setProfileField: (key, value) =>
      set((state) => ({
        profileData: { ...state.profileData, [key]: value },
      })),

    // 回答・スコア
    answers: Array(questionCount).fill(null),
    scores: Array(dimensionCount).fill(0),

    setAnswer: (index, value, weights) =>
      set((state) => {
        const newAnswers = [...state.answers];
        const newScores = [...state.scores];
        const prev = newAnswers[index];

        // 前の回答分を差し引く
        if (prev !== null) {
          weights.forEach((w, i) => {
            newScores[i] -= w * prev;
          });
        }

        // 新しい回答を加算
        weights.forEach((w, i) => {
          newScores[i] += w * value;
        });

        newAnswers[index] = value;
        return { answers: newAnswers, scores: newScores };
      }),

    // 画面遷移
    currentStep: 'landing',
    profileStep: 0,
    setCurrentStep: (step) => set({ currentStep: step }),
    setProfileStep: (step) => set({ profileStep: step }),

    // リセット
    reset: () =>
      set({
        profileData: {},
        answers: Array(questionCount).fill(null),
        scores: Array(dimensionCount).fill(0),
        currentStep: 'landing',
        profileStep: 0,
      }),
  }));
}
