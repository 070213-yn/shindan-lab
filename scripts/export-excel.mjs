/**
 * 全診断データをExcelファイルにエクスポートするスクリプト
 *
 * 使い方: node scripts/export-excel.mjs
 * 出力先: C:\Tokimeki_lab\全診断データ一覧.xlsx
 */

import * as fs from 'fs';
import * as path from 'path';
import XLSX from 'xlsx';

const DIAGNOSES_DIR = path.resolve('src/lib/diagnoses');
const QUESTIONS_FILE = path.resolve('src/lib/questions.ts');
const SCORING_FILE = path.resolve('src/lib/scoring.ts');
const OUTPUT_FILE = 'C:\\Tokimeki_lab\\全診断データ一覧.xlsx';

// TypeScriptファイルからデータを抽出するヘルパー
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

// 質問を抽出する正規表現パーサー
function extractQuestions(content) {
  const questions = [];
  // sidとtextを抽出
  const questionRegex = /\{\s*sid:\s*(\d+)\s*,\s*sectionName:\s*'([^']*)'\s*,\s*emoji:\s*'([^']*)'\s*,\s*text:\s*'([^']*)'\s*,\s*source:\s*'([^']*)'\s*,\s*weights:\s*\[([^\]]*)\]\s*[,}]/g;
  let match;
  while ((match = questionRegex.exec(content)) !== null) {
    questions.push({
      sid: parseInt(match[1]),
      sectionName: match[2],
      emoji: match[3],
      text: match[4],
      source: match[5],
      weights: match[6].split(',').map(w => parseFloat(w.trim())),
    });
  }
  return questions;
}

// 結果タイプを抽出
function extractResultTypes(content) {
  const types = [];

  // パターン1: advice → traits の順（talent, spirit等）
  const regex1 = /\{\s*id:\s*'([^']*)'\s*,\s*emoji:\s*'([^']*)'\s*,\s*name:\s*'([^']*)'\s*,\s*tag:\s*'([^']*)'\s*,\s*color:\s*'([^']*)'\s*,\s*description:\s*\n?\s*'([\s\S]*?)'\s*,\s*advice:\s*\n?\s*'([\s\S]*?)'\s*,\s*traits:\s*\[([^\]]*)\]\s*,\s*scoreWeights:\s*\[([^\]]*)\]/g;
  let match;
  while ((match = regex1.exec(content)) !== null) {
    types.push({
      id: match[1],
      emoji: match[2],
      name: match[3],
      tag: match[4],
      color: match[5],
      description: match[6].replace(/\\'/g, "'").replace(/\n\s*/g, ' ').trim(),
      advice: match[7].replace(/\\'/g, "'").replace(/\n\s*/g, ' ').trim(),
      traits: match[8].replace(/'/g, '').split(',').map(t => t.trim()).filter(Boolean),
      scoreWeights: match[9].split(',').map(w => parseFloat(w.trim())),
    });
  }

  // パターン2: traits → advice の順（deathcause, torisetsu等）
  const regex2 = /\{\s*id:\s*'([^']*)'\s*,\s*emoji:\s*'([^']*)'\s*,\s*name:\s*'([^']*)'\s*,\s*tag:\s*'([^']*)'\s*,\s*color:\s*'([^']*)'\s*,\s*description:\s*\n?\s*'([\s\S]*?)'\s*,\s*traits:\s*\[([^\]]*)\]\s*,\s*advice:\s*\n?\s*'([\s\S]*?)'\s*,\s*scoreWeights:\s*\[([^\]]*)\]/g;
  while ((match = regex2.exec(content)) !== null) {
    types.push({
      id: match[1],
      emoji: match[2],
      name: match[3],
      tag: match[4],
      color: match[5],
      description: match[6].replace(/\\'/g, "'").replace(/\n\s*/g, ' ').trim(),
      advice: match[8].replace(/\\'/g, "'").replace(/\n\s*/g, ' ').trim(),
      traits: match[7].replace(/'/g, '').split(',').map(t => t.trim()).filter(Boolean),
      scoreWeights: match[9].split(',').map(w => parseFloat(w.trim())),
    });
  }

  return types;
}

// 診断の基本情報を抽出
function extractDiagnosisInfo(content) {
  const info = {};
  const titleMatch = content.match(/title:\s*'([^']*)'/);
  const subtitleMatch = content.match(/subtitle:\s*'([^']*)'/);
  const descMatch = content.match(/description:\s*\n?\s*'([\s\S]*?)(?:(?<!\\)')/);
  const emojiMatch = content.match(/emoji:\s*'([^']*)'/);
  const countMatch = content.match(/questionCount:\s*(\d+)/);
  const minMatch = content.match(/estimatedMinutes:\s*(\d+)/);

  info.title = titleMatch ? titleMatch[1] : '';
  info.subtitle = subtitleMatch ? subtitleMatch[1] : '';
  info.description = descMatch ? descMatch[1].replace(/\\'/g, "'").replace(/\n\s*/g, ' ') : '';
  info.emoji = emojiMatch ? emojiMatch[1] : '';
  info.questionCount = countMatch ? parseInt(countMatch[1]) : 0;
  info.estimatedMinutes = minMatch ? parseInt(minMatch[1]) : 0;

  // 次元を抽出
  const dimRegex = /\{\s*key:\s*'([^']*)'\s*,\s*label:\s*'([^']*)'\s*,\s*color:\s*'([^']*)'\s*\}/g;
  info.dimensions = [];
  let dimMatch;
  while ((dimMatch = dimRegex.exec(content)) !== null) {
    info.dimensions.push({ key: dimMatch[1], label: dimMatch[2] });
  }

  // セクションを抽出
  const secRegex = /(\d+):\s*'([^']*)'/g;
  info.sections = {};
  let secMatch;
  // sectionsオブジェクト部分だけを検索
  const secBlock = content.match(/sections:\s*\{([\s\S]*?)\}/);
  if (secBlock) {
    while ((secMatch = secRegex.exec(secBlock[1])) !== null) {
      info.sections[secMatch[1]] = secMatch[2];
    }
  }

  return info;
}

// 恋愛診断の質問を抽出
function extractLoveQuestions(content) {
  const questions = [];
  const regex = /\{\s*sid:\s*(\d+)\s*,\s*phaseName:\s*"([^"]*)"\s*,\s*emoji:\s*"([^"]*)"\s*,\s*text:\s*"([^"]*)"\s*,\s*source:\s*"([^"]*)"\s*,\s*weights:\s*\[([^\]]*)\]\s*[,}]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    questions.push({
      sid: parseInt(match[1]),
      sectionName: match[2],
      emoji: match[3],
      text: match[4],
      source: match[5],
      weights: match[6].split(',').map(w => parseFloat(w.trim())),
    });
  }
  return questions;
}

// 恋愛診断の結果タイプを抽出
function extractLoveTypes(content) {
  const types = [];
  const regex = /\{\s*id:\s*"([^"]*)"\s*,\s*emoji:\s*"([^"]*)"\s*,\s*name:\s*"([^"]*)"\s*,[\s\S]*?description:\s*"([\s\S]*?)"\s*,\s*advice:\s*"([\s\S]*?)"\s*,/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    types.push({
      id: match[1],
      emoji: match[2],
      name: match[3],
      description: match[4].replace(/\\"/g, '"').replace(/\n\s*/g, ' ').trim(),
      advice: match[5].replace(/\\"/g, '"').replace(/\n\s*/g, ' ').trim(),
    });
  }
  return types;
}

// メイン処理
function main() {
  const wb = XLSX.utils.book_new();

  // 診断ID一覧（恋愛診断以外）
  const diagIds = ['mbti128', 'torisetsu', 'shadow', 'mental', 'stress', 'talent', 'learning', 'job', 'money', 'spirit', 'isekai', 'pastlife', 'deathcause'];

  // === シート1: 全診断一覧（サマリー） ===
  const summaryRows = [['診断ID', 'タイトル', '絵文字', '問題数', '所要時間(分)', '次元数', '結果タイプ数', '説明']];

  for (const id of diagIds) {
    let filePath;
    if (id === 'mbti128') {
      filePath = path.join(DIAGNOSES_DIR, 'mbti128.ts');
    } else {
      filePath = path.join(DIAGNOSES_DIR, `${id}.ts`);
    }

    if (!fs.existsSync(filePath)) continue;
    const content = readFile(filePath);
    const info = extractDiagnosisInfo(content);

    // MBTI128の結果タイプ数は128
    let typeCount = 0;
    if (id === 'mbti128') {
      typeCount = 128;
    } else {
      typeCount = extractResultTypes(content).length;
    }

    summaryRows.push([
      id,
      info.title,
      info.emoji,
      info.questionCount,
      info.estimatedMinutes,
      info.dimensions.length,
      typeCount,
      info.description.substring(0, 200),
    ]);
  }

  // 恋愛診断を追加
  summaryRows.push(['love', '恋愛性格診断', '💕', 43, 10, 8, '(別構造)', '愛着理論×進化心理学に基づく恋愛性格分析']);

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
  summarySheet['!cols'] = [
    { width: 12 }, { width: 30 }, { width: 6 }, { width: 8 },
    { width: 10 }, { width: 8 }, { width: 10 }, { width: 60 },
  ];
  XLSX.utils.book_append_sheet(wb, summarySheet, '全診断一覧');

  // === 各診断の質問シートと結果シートを作成 ===
  for (const id of diagIds) {
    let content;
    if (id === 'mbti128') {
      content = readFile(path.join(DIAGNOSES_DIR, 'mbti128.ts'));
    } else {
      content = readFile(path.join(DIAGNOSES_DIR, `${id}.ts`));
    }

    const info = extractDiagnosisInfo(content);
    const questions = extractQuestions(content);

    // 質問シート
    const dimLabels = info.dimensions.map(d => d.label);
    const qHeaders = ['No.', 'セクション', '絵文字', '質問文', '参考文献', ...dimLabels];
    const qRows = [qHeaders];

    questions.forEach((q, idx) => {
      qRows.push([
        idx + 1,
        q.sectionName,
        q.emoji,
        q.text,
        q.source,
        ...q.weights,
      ]);
    });

    // シート名は31文字制限
    const qSheetName = `${info.title || id}_質問`.substring(0, 31);
    const qSheet = XLSX.utils.aoa_to_sheet(qRows);
    qSheet['!cols'] = [
      { width: 5 }, { width: 18 }, { width: 5 }, { width: 50 }, { width: 40 },
      ...dimLabels.map(() => ({ width: 10 })),
    ];
    XLSX.utils.book_append_sheet(wb, qSheet, qSheetName);

    // 結果タイプシート
    let types = [];
    if (id === 'mbti128') {
      // 4ファイルから結合
      for (const suffix of ['types1', 'types2', 'types3', 'types4']) {
        const typeContent = readFile(path.join(DIAGNOSES_DIR, `mbti128-${suffix}.ts`));
        types.push(...extractResultTypes(typeContent));
      }
    } else {
      types = extractResultTypes(content);
    }

    const rHeaders = ['ID', '絵文字', 'タイプ名', 'タグ', 'カラー', '説明文', 'アドバイス', '特徴', ...dimLabels.map(d => `重み:${d}`)];
    const rRows = [rHeaders];

    types.forEach(t => {
      rRows.push([
        t.id,
        t.emoji,
        t.name,
        t.tag,
        t.color,
        t.description,
        t.advice,
        t.traits.join(', '),
        ...t.scoreWeights,
      ]);
    });

    const rSheetName = `${info.title || id}_結果`.substring(0, 31);
    const rSheet = XLSX.utils.aoa_to_sheet(rRows);
    rSheet['!cols'] = [
      { width: 18 }, { width: 5 }, { width: 20 }, { width: 25 }, { width: 10 },
      { width: 80 }, { width: 80 }, { width: 40 },
      ...dimLabels.map(() => ({ width: 10 })),
    ];
    XLSX.utils.book_append_sheet(wb, rSheet, rSheetName);
  }

  // === 恋愛診断シート ===
  const loveQContent = readFile(QUESTIONS_FILE);
  const loveQuestions = extractLoveQuestions(loveQContent);

  if (loveQuestions.length > 0) {
    const loveDims = ['Passion', 'Anx', 'Avo', 'Pragma', 'Agape', 'Storge', 'Growth', 'Ludus'];
    const loveQHeaders = ['No.', 'セクション', '絵文字', '質問文', '参考文献', ...loveDims];
    const loveQRows = [loveQHeaders];

    loveQuestions.forEach((q, idx) => {
      loveQRows.push([
        idx + 1,
        q.sectionName,
        q.emoji,
        q.text,
        q.source,
        ...q.weights,
      ]);
    });

    const loveQSheet = XLSX.utils.aoa_to_sheet(loveQRows);
    loveQSheet['!cols'] = [
      { width: 5 }, { width: 18 }, { width: 5 }, { width: 50 }, { width: 40 },
      ...loveDims.map(() => ({ width: 10 })),
    ];
    XLSX.utils.book_append_sheet(wb, loveQSheet, '恋愛性格診断_質問');
  }

  // 恋愛診断の結果タイプ（types.tsから取得）
  const typesFilePath = path.resolve('src/lib/types.ts');
  if (fs.existsSync(typesFilePath)) {
    const typesContent = readFile(typesFilePath);

    // types.tsからタイプを抽出（シングルクォートとダブルクォート両対応）
    const loveTypes = [];
    const loveTypeRegex = /\{\s*id:\s*'([^']*)'\s*,\s*emoji:\s*'([^']*)'\s*,\s*name:\s*'([^']*)'\s*,\s*tag:\s*'([^']*)'\s*,\s*color:\s*'([^']*)'\s*,\s*desc:\s*'([\s\S]*?)'\s*,\s*advice:\s*'([\s\S]*?)'\s*,\s*cheer:\s*'([^']*)'\s*,\s*cheerm:\s*'([^']*)'\s*,\s*cheers:\s*'([^']*)'/g;
    let loveMatch;
    while ((loveMatch = loveTypeRegex.exec(typesContent)) !== null) {
      loveTypes.push({
        id: loveMatch[1],
        emoji: loveMatch[2],
        name: loveMatch[3],
        tag: loveMatch[4],
        color: loveMatch[5],
        desc: loveMatch[6].replace(/\\'/g, "'"),
        advice: loveMatch[7].replace(/\\'/g, "'"),
        cheerm: loveMatch[9],
        cheers: loveMatch[10],
      });
    }

    if (loveTypes.length > 0) {
      const loveRHeaders = ['ID', '絵文字', 'タイプ名', 'タグ', 'カラー', '説明文', 'アドバイス', '応援メッセージ(中)', '応援メッセージ(短)'];
      const loveRRows = [loveRHeaders];

      loveTypes.forEach(t => {
        loveRRows.push([t.id, t.emoji, t.name, t.tag, t.color, t.desc, t.advice, t.cheerm, t.cheers]);
      });

      const loveRSheet = XLSX.utils.aoa_to_sheet(loveRRows);
      loveRSheet['!cols'] = [
        { width: 15 }, { width: 5 }, { width: 18 }, { width: 30 }, { width: 10 },
        { width: 80 }, { width: 80 }, { width: 50 }, { width: 50 },
      ];
      XLSX.utils.book_append_sheet(wb, loveRSheet, '恋愛性格診断_結果');
    } else {
      console.log('注意: 恋愛タイプデータが抽出できませんでした');
    }
  }

  // Excelファイルを出力
  XLSX.writeFile(wb, OUTPUT_FILE);

  // 統計表示
  console.log(`===== エクスポート完了 =====`);
  console.log(`出力先: ${OUTPUT_FILE}`);
  console.log(`シート数: ${wb.SheetNames.length}`);
  console.log(`シート一覧:`);
  wb.SheetNames.forEach(name => console.log(`  - ${name}`));
}

main();
