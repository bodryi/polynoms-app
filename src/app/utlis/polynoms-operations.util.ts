import BigNumber from 'bignumber.js';

export function fillWithZeros(
  bin1: Array<number>,
  bin2: Array<number>,
  n: number = Math.max(bin1.length, bin2.length),
): { bin1: Array<number>; bin2: Array<number> } {
  // if (n > 300) {
  //   throw new Error('fillWithZeros: n is greater than 300');
  // }

  bin2 = bin2.concat(new Array(n - bin2.length).fill(0));
  bin1 = bin1.concat(new Array(n - bin1.length).fill(0));

  return { bin1, bin2 };
}

export function fillWithZerosOneNumber(
  bin: Array<number>,
  n: number,
): Array<number> {
  // if (n > 300) {
  //   throw new Error('fillWithZerosOneNumber: n is greater than 300');
  // }
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
  // TODO: don't call fill with zeros every time
  const { bin1: filledPolynom1, bin2: filledPolynom2 } = fillWithZeros(
    polynom1,
    polynom2,
  );
  return filledPolynom1.map((val, index) => filledPolynom2[index] ^ val);
}

export function plusMod(
  polynom1: Array<number>,
  polynom2: Array<number>,
  module: Array<number>,
): Array<number> {
  return mod(plus(polynom1, polynom2), module);
}

export function minus(
  polynom1: Array<number>,
  polynom2: Array<number>,
): Array<number> {
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

export function pow(polynom: Array<number>, power: BigNumber): Array<number> {
  let res: Array<number> = null;
  let tempC = [...polynom];
  let w = power;

  while (w.comparedTo(0) === 1) {
    if (w.mod(2).comparedTo(0)) {
      res = [...tempC];
      w = w.minus(1).div(2);
      tempC = multiply(tempC, tempC);

      if (!w.comparedTo(0)) {
        return res;
      } else {
        break;
      }
    } else {
      tempC = multiply(tempC, tempC);
      w = w.div(2);
    }
  }

  let vi = w;

  while (vi.comparedTo(0) > -1) {
    if (vi.mod(2).comparedTo(0)) {
      res = multiply(res, tempC);
      vi = vi.minus(1).div(2);
    } else {
      if (!vi.comparedTo(0)) {
        return res;
      } else {
        vi = vi.div(2);
      }
    }
    tempC = multiply(tempC, tempC);
  }
}

export function mod(
  dividend: Array<number>,
  divisor: Array<number>,
): Array<number> {
  const a = [...dividend].reverse();
  const b = [...divisor].reverse();
  while (a.length >= b.length && a) {
    if (a[0] === 1) {
      a.shift();
      for (let j = 0; j < b.length - 1; j++) {
        a[j] ^= b[j + 1];
      }
    } else {
      a.shift();
    }
  }
  return a.reverse();
}

export function multiplyMod(
  polynom1: Array<number>,
  polynom2: Array<number>,
  module: Array<number>,
): Array<number> {
  return mod(multiply(polynom1, polynom2), module);
}

export function powMod(
  polynom: Array<number>,
  power: BigNumber,
  module: Array<number>,
): Array<number> {
  let res: Array<number> = null;
  let tempC = [...polynom];
  let w = power;

  while (w.comparedTo(0) === 1) {
    if (w.mod(2).comparedTo(0)) {
      res = [...tempC];
      w = w.minus(1).div(2);
      tempC = multiplyMod(tempC, tempC, module);

      if (!w.comparedTo(0)) {
        return res;
      } else {
        break;
      }
    } else {
      tempC = multiplyMod(tempC, tempC, module);
      w = w.div(2);
    }
  }

  let vi = w;

  while (vi.comparedTo(0) > -1) {
    if (vi.mod(2).comparedTo(0)) {
      res = multiplyMod(res, tempC, module);
      vi = vi.minus(1).div(2);
    } else {
      if (!vi.comparedTo(0)) {
        return res;
      } else {
        vi = vi.div(2);
      }
    }
    tempC = multiplyMod(tempC, tempC, module);
  }
}
