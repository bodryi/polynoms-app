import { toBits, multiply, plus, invert } from './polynoms-operations.util';

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
  const parsedMod = parseInt(mod, 10);
  const vectorSize = v1.length;
  const resultVector = new Array(vectorSize).fill('0');

  v1.forEach((comp1: string, index1: number) => {
    v2.forEach((comp2: string, index2: number) => {
      let firstCoefsMultiplicationResult: Array<number> = multiply(
        toBits(comp1),
        toBits(comp2),
      );
      if (firstCoefsMultiplicationResult.length > parsedMod) {
        firstCoefsMultiplicationResult = firstCoefsMultiplicationResult.slice(
          0,
          parsedMod,
        );
      }
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
          const res = multiply(acc, currVector);
          return res.length > parsedMod ? res.slice(0, parsedMod) : res;
        },
        firstCoefsMultiplicationResult,
      );
      const basisVectorIndex = getRowOrColumnNumberByBasisVector(
        basisVectorsMultiplyResult[
          findVectorIndexInString(basisVectorsMultiplyResult)
        ],
      );
      if (resultVector[basisVectorIndex]) {
        resultVector[basisVectorIndex] = plus(
          toBits(resultVector[basisVectorIndex]),
          multiplyResult,
        ).join('');
      } else {
        resultVector[basisVectorIndex] = multiplyResult.join('');
      }
    });
  });

  return resultVector;
}
