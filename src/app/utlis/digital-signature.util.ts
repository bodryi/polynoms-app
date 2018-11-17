import {
  multiply,
  plus,
  pow,
  toBits,
  mod as modulo,
  xgcd,
} from './polynoms-operations.util';
import { BigNumber } from 'bignumber.js';
import { multiplyVectors } from './matrix-operations.util';

const matrix4 = [
  ['a', 'Ad', 'Aa', 'd'],
  ['Bc', 'b', 'c', 'Bb'],
  ['c', 'Ab', 'Ac', 'b'],
  ['Ba', 'd', 'a', 'Bd'],
];

export function localRightSideUnit(
  NDS: Array<string>,
  h: string,
  n: string,
  mod: string,
  ...coefficientsStrings: Array<string>
): Array<string> {
  const N = NDS.map(s => toBits(s));
  const coefficients = coefficientsStrings.map(s => toBits(s));
  const parsedMod = toBits(mod);
  const nParsed = toBits(n);
  const hParsed = toBits(h);
  const unit = new Array(4).fill('');
  unit[0] = hParsed.join('');
  const divisor = plus(multiply(N[0], coefficients[0]), N[3]);
  const invertedDivisor = xgcd(divisor, parsedMod).x;
  unit[1] = plus(
    multiply(N[3], invertedDivisor),
    multiply(
      multiply(plus(N[0], multiply(N[3], coefficients[1])), invertedDivisor),
      nParsed,
    ),
  ).join('');
  unit[2] = plus(
    multiply(N[0], invertedDivisor),
    multiply(
      hParsed,
      multiply(plus(N[0], multiply(N[3], coefficients[1])), invertedDivisor),
    ),
  ).join('');
  unit[3] = nParsed.join('');
  return unit;
}

export function calculateT(
  Er1: Array<string>,
  Q: Array<string>,
  mod: string,
  ...coefficients: Array<string>
) {
  const invertedQ = invertedElement(Q, mod, ...coefficients);
  return multiplyVectors(Er1, invertedQ, matrix4, mod, ...coefficients);
}

function invertedElement(
  Q: Array<string>,
  mod: string,
  ...coefficientsStrings: Array<string>
): Array<string> {
  const parsedQ = Q.map(s => toBits(s));
  const parsedMod = toBits(mod);
  const coefficients = coefficientsStrings.map(s => toBits(s));
  const divisor = multiply(
    pow(
      plus(multiply(coefficients[0], coefficients[1]), [1]),
      new BigNumber('2'),
    ),
    plus(multiply(parsedQ[0], parsedQ[1]), multiply(parsedQ[2], parsedQ[3])),
  );
  const invertedDivisor = xgcd(divisor, parsedMod).x;

  return [
    calculateInvertedVectorComponent1(
      parsedQ,
      invertedDivisor,
      ...coefficients,
    ),
    calculateInvertedVectorComponent2(
      parsedQ,
      invertedDivisor,
      ...coefficients,
    ),
    calculateInvertedVectorComponent3(
      parsedQ,
      invertedDivisor,
      ...coefficients,
    ),
    calculateInvertedVectorComponent4(
      parsedQ,
      invertedDivisor,
      ...coefficients,
    ),
  ];
}

function calculateInvertedVectorComponent1(
  Q: Array<Array<number>>,
  invertedDivisor: Array<number>,
  ...coefficients: Array<Array<number>>
): string {
  const divided = plus(
    plus(multiply(Q[0], multiply(coefficients[0], coefficients[1])), Q[1]),
    plus(multiply(Q[2], coefficients[0]), multiply(Q[3], coefficients[1])),
  );

  return multiply(divided, invertedDivisor).join('');
}

function calculateInvertedVectorComponent2(
  Q: Array<Array<number>>,
  invertedDivisor: Array<number>,
  ...coefficients: Array<Array<number>>
): string {
  const divided = plus(
    plus(Q[0], multiply(Q[1], multiply(coefficients[0], coefficients[1]))),
    plus(multiply(Q[2], coefficients[0]), multiply(Q[3], coefficients[1])),
  );

  return multiply(divided, invertedDivisor).join('');
}

function calculateInvertedVectorComponent3(
  Q: Array<Array<number>>,
  invertedDivisor: Array<number>,
  ...coefficients: Array<Array<number>>
): string {
  const divided = plus(
    multiply(
      coefficients[1],
      plus(plus(Q[0], Q[1]), multiply(Q[3], coefficients[1])),
    ),
    Q[2],
  );

  return multiply(divided, invertedDivisor).join('');
}

function calculateInvertedVectorComponent4(
  Q: Array<Array<number>>,
  invertedDivisor: Array<number>,
  ...coefficients: Array<Array<number>>
): string {
  const divided = plus(
    multiply(
      coefficients[0],
      plus(plus(Q[0], Q[1]), multiply(Q[2], coefficients[0])),
    ),
    Q[3],
  );

  return multiply(divided, invertedDivisor).join('');
}
