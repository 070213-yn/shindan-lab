/**
 * トキメキ診断 状態管理ストア
 *
 * Zustand v5 形式。診断の全状態（プロフィール・回答・スコア・画面遷移）を管理する。
 * スコアはリアルタイムに加算・差分修正される。
 */

import { create } from 'zustand';
import { Profile } from '@/lib/profileModifiers';
import { QUESTIONS } from '@/lib/questions';

/** 次元数（Passion, Anx, Avo, Pragma, Agape, Storge, Growth, Ludus） */
const DIM = 8;

/** 質問数 */
const Q_COUNT = QUESTIONS.length; // 43

/** プロフィールの初期値 */
const INITIAL_PROFILE: Profile = {
  gender: null,
  realAge: 18,
  mentalAge: 18,
  exp: null,
  status: null,
};

// ---------- 型定義 ----------

export interface QuizState {
  // プロフィール
  profile: Profile;
  setGender: (gender: Profile['gender']) => void;
  setRealAge: (age: number) => void;
  setMentalAge: (age: number) => void;
  setExp: (exp: Profile['exp']) => void;
  setStatus: (status: Profile['status']) => void;

  // 診断の回答とスコア
  answers: (number | null)[]; // 43問の回答 (1-5 or null)
  scores: number[];           // 8次元の生スコア
  setAnswer: (index: number, value: number) => void;

  // 好きな人の名前
  crushName: string;
  setCrushName: (name: string) => void;

  // 画面状態
  currentStep: 'landing' | 'profile' | 'quiz' | 'name' | 'loading' | 'result';
  profileStep: number; // 0-4
  setCurrentStep: (step: QuizState['currentStep']) => void;
  setProfileStep: (step: number) => void;

  // 全状態リセット
  reset: () => void;
}

// ---------- ストア本体 ----------

export const useQuizStore = create<QuizState>((set) => ({
  // --- プロフィール ---
  profile: { ...INITIAL_PROFILE },

  setGender: (gender) =>
    set((state) => ({ profile: { ...state.profile, gender } })),

  setRealAge: (age) =>
    set((state) => ({ profile: { ...state.profile, realAge: age } })),

  setMentalAge: (age) =>
    set((state) => ({ profile: { ...state.profile, mentalAge: age } })),

  setExp: (exp) =>
    set((state) => ({ profile: { ...state.profile, exp } })),

  setStatus: (status) =>
    set((state) => ({ profile: { ...state.profile, status } })),

  // --- 診断 ---
  answers: Array<number | null>(Q_COUNT).fill(null),
  scores: Array<number>(DIM).fill(0),

  /**
   * 回答をセットし、スコアをリアルタイム更新する。
   * 既に回答済みの場合は、前の回答分を差し引いてから新しい値を加算する。
   */
  setAnswer: (index, value) =>
    set((state) => {
      const newAnswers = [...state.answers];
      const newScores = [...state.scores];
      const weights = QUESTIONS[index].weights;
      const prev = newAnswers[index];

      // 前の回答があれば差分を戻す
      if (prev !== null) {
        weights.forEach((w, i) => {
          newScores[i] -= w * prev;
        });
      }

      // 新しい回答のスコアを加算
      weights.forEach((w, i) => {
        newScores[i] += w * value;
      });

      newAnswers[index] = value;

      return { answers: newAnswers, scores: newScores };
    }),

  // --- 好きな人の名前 ---
  crushName: '',
  setCrushName: (name) => set({ crushName: name }),

  // --- 画面状態 ---
  currentStep: 'landing',
  profileStep: 0,

  setCurrentStep: (step) => set({ currentStep: step }),
  setProfileStep: (step) => set({ profileStep: step }),

  // --- リセット ---
  reset: () =>
    set({
      profile: { ...INITIAL_PROFILE },
      answers: Array<number | null>(Q_COUNT).fill(null),
      scores: Array<number>(DIM).fill(0),
      crushName: '',
      currentStep: 'landing',
      profileStep: 0,
    }),
}));
