import {
  toBits,
  multiply,
  plus,
  invert,
  multiplyMod,
  plusMod,
} from './polynoms-operations.util';

const CHAR_CODE_SMALL_A = 97;
const CHAR_CODE_CAPITAL_A = 65;

const SMALL_LATIN_CHARS_REGEXP = /[a-z]/;
const CAPITAL_LATIN_CHARS_REGEXP = /[A-Z]/;
const MINUS_REGEXP = /[-]/;

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

function hasMinus(str: string) {
  return MINUS_REGEXP.test(str);
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
        (acc: Array<number>, curr: number, index: number) => {
          let currVector = toBits(coefficients[curr]);
          if (!index && hasMinus(basisVectorsMultiplyResult)) {
            currVector = invert(currVector);
          }
          return multiplyMod(acc, currVector, parsedMod);
        },
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
  const parsedPow = parseInt(pow, 10);

  let res: Array<string> = null;
  let tempC = [...v];
  let w = parsedPow;

  while (w > 0) {
    if (w % 2) {
      res = [...tempC];
      w = (w - 1) / 2;
      tempC = multiplyVectors(
        tempC,
        tempC,
        multiplyMatrix,
        mod,
        ...coefficients,
      );

      if (!w) {
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
      w /= 2;
    }
  }

  let vi = w;

  while (vi >= 0) {
    if (vi % 2) {
      res = multiplyVectors(res, tempC, multiplyMatrix, mod, ...coefficients);
      vi = (vi - 1) / 2;
    } else {
      if (!vi) {
        return res;
      } else {
        vi /= 2;
      }
    }
    tempC = multiplyVectors(tempC, tempC, multiplyMatrix, mod, ...coefficients);
  }
}
