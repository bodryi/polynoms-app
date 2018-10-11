export function fillWithZeros(
  bin1: Array<number>,
  bin2: Array<number>,
  n: number = Math.max(bin1.length, bin2.length),
): { bin1: Array<number>; bin2: Array<number> } {
  if (n > 300) {
    throw new Error('fillWithZeros: n is greater than 300');
  }

  bin2 = bin2.concat(new Array(n - bin2.length).fill(0));
  bin1 = bin1.concat(new Array(n - bin1.length).fill(0));

  return { bin1, bin2 };
}

export function fillWithZerosOneNumber(
  bin: Array<number>,
  n: number,
): Array<number> {
  if (n > 300) {
    throw new Error('fillWithZerosOneNumber: n is greater than 300');
  }
  if (n > bin.length) {
    bin = bin.concat(new Array(n - bin.length).fill(0));
  }
  return bin;
}

export function fillWithZerosOneNumberInFront(
  bin: Array<number>,
  n: number,
): Array<number> {
  if (n > 300) {
    throw new Error('fillWithZerosOneNumber: n is greater than 300');
  }
  if (n > bin.length) {
    bin = new Array(n - bin.length).fill(0).concat(bin);
  }
  return bin;
}

export function plus(
  polynom1: Array<number>,
  polynom2: Array<number>,
): Array<number> {
  // проверка какая-нибудь, чтобы не вызывать каждый раз fill with zeroes каждый раз
  const { bin1: filledPolynom1, bin2: filledPolynom2 } = fillWithZeros(
    polynom1,
    polynom2,
  );
  return filledPolynom1.map((val, index) => filledPolynom2[index] ^ val);
}

export function minus(polynom1, polynom2) {
  return plus(polynom1, polynom2);
}

export function multiply(
  polynom1: Array<number>,
  polynom2: Array<number>,
): Array<number> {
  const m = polynom1.length;
  const n = polynom2.length;
  const prod = new Array(m + n - 1).fill(0);

  for (let j = 0; j < m; j++) {
    for (let k = 0; k < n; k++) {
      prod[j + k] ^= polynom1[j] & polynom2[k];
    }
  }

  return prod;
}

export function invert(bin: Array<number>): Array<number> {
  return bin.map(v => v ^ 1);
}

function shiftLeftCyclic(arr: Array<any>): Array<any> {
  const res = [...arr];
  const shifted = res.shift();
  res.push(shifted);
  return res;
}

export function toBits(string: string): Array<number> {
  const result: Array<number> = [];

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '1') {
      result.push(1);
    } else if (string[i] === '0') {
      result.push(0);
    }
  }

  return result;
}
