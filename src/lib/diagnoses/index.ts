/**
 * 診断レジストリ
 *
 * 全ての診断設定をここに登録する。
 * ポータルページと動的ルーティングで使用。
 */

import type { DiagnosisConfig } from '../diagnosticTypes';

// 各診断データの遅延ロード（コード分割のため dynamic import 用にも使える）
import { talentDiagnosis } from './talent';
import { spiritDiagnosis } from './spirit';
import { isekaiDiagnosis } from './isekai';
import { mentalDiagnosis } from './mental';
import { shadowDiagnosis } from './shadow';
import { pastlifeDiagnosis } from './pastlife';
import { stressDiagnosis } from './stress';
import { moneyDiagnosis } from './money';
import { jobDiagnosis } from './job';
import { learningDiagnosis } from './learning';
import { mbti128Diagnosis } from './mbti128';
import { torisetsuDiagnosis } from './torisetsu';
import { deathcauseDiagnosis } from './deathcause';

/** 全診断の設定マップ（ID → 設定） */
export const DIAGNOSIS_REGISTRY: Record<string, DiagnosisConfig> = {
  talent: talentDiagnosis,
  spirit: spiritDiagnosis,
  isekai: isekaiDiagnosis,
  mental: mentalDiagnosis,
  shadow: shadowDiagnosis,
  pastlife: pastlifeDiagnosis,
  stress: stressDiagnosis,
  money: moneyDiagnosis,
  job: jobDiagnosis,
  learning: learningDiagnosis,
  mbti128: mbti128Diagnosis,
  torisetsu: torisetsuDiagnosis,
  deathcause: deathcauseDiagnosis,
};

/** ポータル表示用の診断一覧（表示順制御） */
export const DIAGNOSIS_LIST: DiagnosisConfig[] = [
  talentDiagnosis,
  spiritDiagnosis,
  isekaiDiagnosis,
  mentalDiagnosis,
  shadowDiagnosis,
  pastlifeDiagnosis,
  stressDiagnosis,
  moneyDiagnosis,
  jobDiagnosis,
  learningDiagnosis,
  mbti128Diagnosis,
  torisetsuDiagnosis,
  deathcauseDiagnosis,
];
