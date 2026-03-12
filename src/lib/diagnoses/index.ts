/**
 * 診断レジストリ
 *
 * 全ての診断設定をここに登録する。
 * ポータルページと動的ルーティングで使用。
 *
 * 除外済み診断（ファイルは残存）:
 * talent, spirit, isekai, mental, money, job, learning, deathcause, torisetsu
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

// 有効な診断のみインポート
import { shadowDiagnosis } from './shadow';
import { pastlifeDiagnosis } from './pastlife';
import { stressDiagnosis } from './stress';
import { mbti128Diagnosis } from './mbti128';
import { godtypeDiagnosis } from './godtype';

/** 全診断の設定マップ（ID → 設定） */
export const DIAGNOSIS_REGISTRY: Record<string, DiagnosisConfig> = {
  shadow: shadowDiagnosis,
  pastlife: pastlifeDiagnosis,
  stress: stressDiagnosis,
  mbti128: mbti128Diagnosis,
  godtype: godtypeDiagnosis,
};

/** ポータル表示用の診断一覧（表示順制御） */
export const DIAGNOSIS_LIST: DiagnosisConfig[] = [
  mbti128Diagnosis,
  shadowDiagnosis,
  pastlifeDiagnosis,
  stressDiagnosis,
  godtypeDiagnosis,
];
