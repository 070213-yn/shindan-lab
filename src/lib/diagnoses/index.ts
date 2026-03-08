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
import { commuDiagnosis } from './commu';
import { oshiDiagnosis } from './oshi';
import { careerDiagnosis } from './career';
import { shadowDiagnosis } from './shadow';
import { snsDiagnosis } from './sns';
import { pastlifeDiagnosis } from './pastlife';

/** 全診断の設定マップ（ID → 設定） */
export const DIAGNOSIS_REGISTRY: Record<string, DiagnosisConfig> = {
  talent: talentDiagnosis,
  spirit: spiritDiagnosis,
  isekai: isekaiDiagnosis,
  mental: mentalDiagnosis,
  commu: commuDiagnosis,
  oshi: oshiDiagnosis,
  career: careerDiagnosis,
  shadow: shadowDiagnosis,
  sns: snsDiagnosis,
  pastlife: pastlifeDiagnosis,
};

/** ポータル表示用の診断一覧（表示順制御） */
export const DIAGNOSIS_LIST: DiagnosisConfig[] = [
  talentDiagnosis,
  spiritDiagnosis,
  isekaiDiagnosis,
  mentalDiagnosis,
  commuDiagnosis,
  oshiDiagnosis,
  careerDiagnosis,
  shadowDiagnosis,
  snsDiagnosis,
  pastlifeDiagnosis,
];
