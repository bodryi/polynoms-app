import { toBits, multiplyMod, plusMod } from './polynoms-operations.util';
import {
  CAPITAL_LATIN_CHARS_REGEXP,
  CHAR_CODE_CAPITAL_A,
  CHAR_CODE_SMALL_A,
  SMALL_LATIN_CHARS_REGEXP,
} from '../constants/app.constants';
import { BigNumber } from 'bignumber.js';

function findVectorIndexInString(str: string): number {
  return str.split('').findIndex(c => SMALL_LATIN_CHARS_REGEXP.test(c));
}

function getRowOrColumnNumberByBasisVector(str: string): number {
  if (str.length !== 1) {
    throw new Error(
      'getRowOrColumnNumberByBasisVector: you must pass a single char',
    );
  }

  return str.charCodeAt(0) - CHAR_CODE_SMALL_A;
}

function getCoefficientNumberByName(str: string): number {
  if (str.length !== 1) {
    throw new Error('getCoefficientNumberByName: you must pass a single char');
  }

  return str.charCodeAt(0) - CHAR_CODE_CAPITAL_A;
}

function getCoefficientNumbersFromString(str: string): Array<number> {
  return str
    .split('')
    .filter(c => CAPITAL_LATIN_CHARS_REGEXP.test(c))
    .map(c => getCoefficientNumberByName(c));
}

export function multiplyVectors(
  v1: Array<string>,
  v2: Array<string>,
  multiplyMatrix: Array<Array<string>>,
  mod: string,
  ...coefficients: Array<string>
): Array<string> {
  if (v1.length !== v2.length) {
    throw new Error('multiplyVectors: vectors must have equal length');
  }
  const parsedMod = toBits(mod);
  const vectorSize = v1.length;
  const resultVector = new Array(vectorSize).fill('0');

  v1.forEach((comp1: string, index1: number) => {
    v2.forEach((comp2: string, index2: number) => {
      const firstCoefsMultiplicationResult: Array<number> = multiplyMod(
        toBits(comp1),
        toBits(comp2),
        parsedMod,
      );
      const basisVectorsMultiplyResult: string = multiplyMatrix[index1][index2];
      const coefficientsNumbers: Array<
        number
      > = getCoefficientNumbersFromString(basisVectorsMultiplyResult);
      const multiplyResult: Array<number> = coefficientsNumbers.reduce(
        (acc: Array<number>, curr: number, index: number) =>
          multiplyMod(acc, toBits(coefficients[curr]), parsedMod),
        firstCoefsMultiplicationResult,
      );
      const basisVectorIndex = getRowOrColumnNumberByBasisVector(
        basisVectorsMultiplyResult[
          findVectorIndexInString(basisVectorsMultiplyResult)
        ],
      );
      if (resultVector[basisVectorIndex]) {
        resultVector[basisVectorIndex] = plusMod(
          toBits(resultVector[basisVectorIndex]),
          multiplyResult,
          parsedMod,
        ).join('');
      } else {
        resultVector[basisVectorIndex] = multiplyResult.join('');
      }
    });
  });

  return resultVector;
}

export function vectorPow(
  v: Array<string>,
  pow: string,
  mod: string,
  multiplyMatrix: Array<Array<string>>,
  ...coefficients: Array<string>
) {
  const parsedPow = new BigNumber(pow);

  let res: Array<string> = null;
  let tempC = [...v];
  let w = parsedPow;

  while (w.comparedTo(0) === 1) {
    if (w.mod(2).comparedTo(0) === 1) {
      res = [...tempC];
      w = w.minus(1).div(2);
      tempC = multiplyVectors(
        tempC,
        tempC,
        multiplyMatrix,
        mod,
        ...coefficients,
      );

      if (!w.comparedTo(0)) {
        return res;
      } else {
        break;
      }
    } else {
      tempC = multiplyVectors(
        tempC,
        tempC,
        multiplyMatrix,
        mod,
        ...coefficients,
      );
      w = w.div(2);
    }
  }

  let vi = new BigNumber(w);

  while (vi.comparedTo(0) !== -1) {
    if (vi.mod(2).comparedTo(0) === 1) {
      res = multiplyVectors(res, tempC, multiplyMatrix, mod, ...coefficients);
      vi = vi.minus(1).div(2);
    } else {
      if (!vi.comparedTo(0)) {
        return res;
      } else {
        vi = vi.div(2);
      }
    }
    tempC = multiplyVectors(tempC, tempC, multiplyMatrix, mod, ...coefficients);
  }
}
