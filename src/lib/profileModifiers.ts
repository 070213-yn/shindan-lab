export interface Profile {
  gender: 'female' | 'male' | 'other' | null;
  realAge: number;
  exp: 'none' | 'little' | 'some' | 'rich' | null;
}

// 8次元: [D0:Passion, D1:Anx, D2:Avo, D3:Pragma, D4:Agape, D5:Storge, D6:Growth, D7:Ludus]
export function applyProfileModifiers(norm: number[], profile: Profile): number[] {
  const n = [...norm];
  const { gender, realAge, exp } = profile;

  // 性別補正 (Buss 1989/1994 進化心理学)
  if (gender === 'female') {
    n[3] = Math.min(100, n[3] + 8);  // Pragma +
    n[4] = Math.min(100, n[4] + 5);  // Agape +
    n[7] = Math.max(0, n[7] - 5);    // Ludus -
  } else if (gender === 'male') {
    n[0] = Math.min(100, n[0] + 6);  // Passion +
    n[2] = Math.min(100, n[2] + 5);  // Avoidant +
    n[7] = Math.min(100, n[7] + 4);  // Ludus +
  }

  // 年齢補正 (Erikson 発達段階)
  if (realAge <= 17) {
    n[0] = Math.min(100, n[0] + 7);
    n[1] = Math.min(100, n[1] + 7);
    n[3] = Math.max(0, n[3] - 8);
  } else if (realAge <= 24) {
    n[6] = Math.min(100, n[6] + 5);
    n[7] = Math.min(100, n[7] + 4);
  } else if (realAge <= 35) {
    n[3] = Math.min(100, n[3] + 6);
    n[5] = Math.min(100, n[5] + 4);
  } else {
    n[4] = Math.min(100, n[4] + 6);
    n[2] = Math.min(100, n[2] + 4);
    n[1] = Math.max(0, n[1] - 5);
  }

  // 恋愛経験補正
  if (exp === 'none') {
    n[1] = Math.min(100, n[1] + 6);
    n[3] = Math.min(100, n[3] + 4);
  } else if (exp === 'little') {
    n[5] = Math.min(100, n[5] + 4);
  } else if (exp === 'some') {
    n[6] = Math.min(100, n[6] + 4);
    n[1] = Math.max(0, n[1] - 4);
  } else if (exp === 'rich') {
    n[7] = Math.min(100, n[7] + 5);
    n[2] = Math.min(100, n[2] + 4);
    n[1] = Math.max(0, n[1] - 6);
  }

  return n;
}
