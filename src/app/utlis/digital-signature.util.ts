import {
  multiply,
  plus,
  pow,
  toBits,
  xgcd,
  plusMod,
  multiplyMod,
} from './polynoms-operations.util';
import { BigNumber } from 'bignumber.js';
import { multiplyVectors, vectorPow } from './matrix-operations.util';

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
  unit[1] = multiplyMod(
    plus(N[3], multiply(plus(N[0], multiply(N[3], coefficients[1])), nParsed)),
    invertedDivisor,
    parsedMod,
  ).join('');
  unit[2] = multiplyMod(
    plus(N[0], multiply(plus(N[0], multiply(N[3], coefficients[1])), hParsed)),
    invertedDivisor,
    parsedMod,
  ).join('');
  unit[3] = nParsed.join('');
  return unit;
}

export function calculateT(
  Er1: Array<string>,
  Q: Array<string>,
  mod: string,
  ...coefficients: Array<string>
): Array<string> {
  const invertedQ = invertedElement(Q, mod, ...coefficients);
  return multiplyVectors(Er1, invertedQ, matrix4, mod, ...coefficients);
}

export function calculateP(
  Er2: Array<string>,
  T: Array<string>,
  mod: string,
  ...coefficients: Array<string>
): Array<string> {
  const invertedT = invertedElement(T, mod, ...coefficients);
  return multiplyVectors(invertedT, Er2, matrix4, mod, ...coefficients);
}

export function calculateL(
  Er3: Array<string>,
  P: Array<string>,
  mod: string,
  ...coefficients: Array<string>
): Array<string> {
  const invertedP = invertedElement(P, mod, ...coefficients);
  return multiplyVectors(Er3, invertedP, matrix4, mod, ...coefficients);
}

export function calculateY(
  Q: Array<string>,
  NDS: Array<string>,
  T: Array<string>,
  power: string,
  mod: string,
  ...coefficients: Array<string>
): Array<string> {
  return multiplyVectors(
    multiplyVectors(
      Q,
      vectorPow(NDS, power, mod, matrix4, ...coefficients),
      matrix4,
      mod,
      ...coefficients,
    ),
    T,
    matrix4,
    mod,
    ...coefficients,
  );
}

export function calculateU(
  P: Array<string>,
  NDS: Array<string>,
  L: Array<string>,
  mod: string,
  ...coefficients: Array<string>
): Array<string> {
  return multiplyVectors(
    multiplyVectors(P, NDS, matrix4, mod, ...coefficients),
    L,
    matrix4,
    mod,
    ...coefficients,
  );
}

export function calculateR(
  Q: Array<string>,
  NDS: Array<string>,
  L: Array<string>,
  power: string,
  mod: string,
  ...coefficients: Array<string>
): Array<string> {
  return multiplyVectors(
    multiplyVectors(
      Q,
      vectorPow(NDS, power, mod, matrix4, ...coefficients),
      matrix4,
      mod,
      ...coefficients,
    ),
    L,
    matrix4,
    mod,
    ...coefficients,
  );
}

export function calculateE(
  message: string,
  R: Array<string>,
  mod: string,
  qMod: string,
): string {
  // return '1';
  return new BigNumber(
    plusMod(toBits(message), toBits(R[1]), toBits(mod)).join(''),
    2,
  )
    .mod(new BigNumber(qMod))
    .toString(10);
}

export function calculateS(
  randomK: string,
  e: string,
  randomX: string,
  mod: string,
  qMod: string,
): string {
  let s = new BigNumber(randomK).minus(
    new BigNumber(e)
      .multipliedBy(new BigNumber(randomX))
      .mod(new BigNumber(qMod)),
  );

  while (s.comparedTo(0) === -1) {
    s = s.plus(new BigNumber(qMod));
  }

  return s.toString(10);
}

export function calculateRWave(
  Y: Array<string>,
  U: Array<string>,
  eTest: string,
  sTest: string,
  mod: string,
  ...coefficients: Array<string>
): Array<string> {
  return multiplyVectors(
    vectorPow(Y, eTest, mod, matrix4, ...coefficients),
    vectorPow(
      sTest[0] === '-' ? invertedElement(U, mod, ...coefficients) : U,
      sTest[0] === '-' ? sTest.substr(1) : sTest,
      mod,
      matrix4,
      ...coefficients,
    ),
    matrix4,
    mod,
    ...coefficients,
  );
}

export function invertedElement(
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
