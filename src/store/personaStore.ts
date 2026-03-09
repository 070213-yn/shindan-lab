/**
 * ペルソナストア
 *
 * 全診断の結果をlocalStorageに永続化する。
 * ペルソナカード生成時に全結果を統合して使用。
 */

import { create } from 'zustand';

/** 1つの診断結果 */
export interface DiagnosisResult {
  diagnosisId: string;
  diagnosisTitle: string;
  typeId: string;
  typeName: string;
  typeEmoji: string;
  typeColor: string;
  typeTag: string;
  typeDescription: string;
  typeTraits: string[];
  scores: number[];         // 正規化済みスコア
  dimensionLabels: string[];
  dimensionColors: string[];
  completedAt: number;
}

/** グローバルプロフィール（全診断で使い回す年齢・性別） */
export interface GlobalProfile {
  gender: string | null;
  age: number | null;
}

interface PersonaState {
  results: Record<string, DiagnosisResult>; // diagnosisId → result
  saveResult: (result: DiagnosisResult) => void;
  removeResult: (diagnosisId: string) => void;
  clearAll: () => void;
  getCompletedCount: () => number;

  // グローバルプロフィール
  globalProfile: GlobalProfile;
  setGlobalProfile: (gender: string | null, age: number | null) => void;
}

/** localStorageキー */
const STORAGE_KEY = 'tokimeki-lab-persona';

/** グローバルプロフィール用localStorageキー */
const PROFILE_STORAGE_KEY = 'tokimeki-lab-global-profile';

/** localStorageから復元 */
function loadFromStorage(): Record<string, DiagnosisResult> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/** グローバルプロフィールをlocalStorageから復元 */
function loadProfileFromStorage(): GlobalProfile {
  if (typeof window === 'undefined') return { gender: null, age: null };
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return { gender: null, age: null };
    return JSON.parse(raw);
  } catch {
    return { gender: null, age: null };
  }
}

/** グローバルプロフィールをlocalStorageに保存 */
function saveProfileToStorage(profile: GlobalProfile) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // 容量超過時は無視
  }
}

/** localStorageに保存 */
function saveToStorage(results: Record<string, DiagnosisResult>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // localStorage容量超過時は無視
  }
}

export const usePersonaStore = create<PersonaState>((set, get) => ({
  results: loadFromStorage(),

  saveResult: (result) =>
    set((state) => {
      const newResults = { ...state.results, [result.diagnosisId]: result };
      saveToStorage(newResults);
      return { results: newResults };
    }),

  removeResult: (diagnosisId) =>
    set((state) => {
      const newResults = { ...state.results };
      delete newResults[diagnosisId];
      saveToStorage(newResults);
      return { results: newResults };
    }),

  clearAll: () => {
    saveToStorage({});
    set({ results: {} });
  },

  getCompletedCount: () => Object.keys(get().results).length,

  // グローバルプロフィール
  globalProfile: loadProfileFromStorage(),

  setGlobalProfile: (gender, age) => {
    const newProfile: GlobalProfile = { gender, age };
    saveProfileToStorage(newProfile);
    set({ globalProfile: newProfile });
  },
}));
