import { BigNumber } from 'bignumber.js';
import { powMod, shiftNulls } from './polynoms-operations.util';
import {
  ITERATIONS_COUNT,
  LAST_ZEROES_REGEXP,
  MAX_FACTORIZED_POWER,
  MAX_GENERATE_TRIES,
} from '../constants/app.constants';

export function primeFactorization(number: BigNumber, res?: Array<BigNumber>) {
  const result = res || [];
  const root = number.sqrt();
  let x = new BigNumber(2);
  if (number.mod(x).comparedTo(0)) {
    x = new BigNumber(3);

    while (
      number.mod(x).comparedTo(0) &&
      (x = x.plus(2)).comparedTo(root) === -1
    ) {}
  }

  x = x.comparedTo(root) !== 1 ? x : number;

  result.push(x);

  return x === number ? result : primeFactorization(number.div(x), result);
}

export function generateRandomPolynom(
  maxPow: number,
  exact?: boolean,
): Array<number> {
  if (!maxPow) {
    return [];
  }
  const pow = exact ? maxPow : Math.floor(Math.random() * 65535) % maxPow + 1;
  let result = null;
  if (exact) {
    while (shiftNulls(result).length !== maxPow) {
      result = new Array(pow || maxPow)
        .fill(null)
        .map(() => Math.floor(Math.random() * 65535) % 2);
    }
  } else {
    result = new Array(pow || maxPow)
      .fill(null)
      .map(() => Math.floor(Math.random() * 65535) % 2);
  }
  return shiftNulls(result);
}

export function isPolynomEqualsOne(polynom: Array<number>): boolean {
  if (!polynom || !polynom.length || polynom[0] !== 1) {
    return false;
  } else {
    return !polynom.find((el, index) => el === 1 && !!index);
  }
}

function condition1(
  randomPolynom: Array<number>,
  testingPolynom: Array<number>,
  power: BigNumber,
): boolean {
  return isPolynomEqualsOne(powMod(randomPolynom, power, testingPolynom));
}

function condition2(
  randomPolynom: Array<number>,
  testingPolynom: Array<number>,
  power: BigNumber,
  primes: Array<BigNumber>,
): boolean {
  for (let i = 0; i < primes.length; i++) {
    if (
      isPolynomEqualsOne(
        powMod(randomPolynom, power.div(primes[i]), testingPolynom),
      )
    ) {
      return false;
    }
  }
  return true;
}

export function trimPolynomLastZeros(polynom: string): string {
  return polynom.replace(LAST_ZEROES_REGEXP, '');
}

export function testPolynom(
  polynomParam: string,
  primeMultipliers?: Array<BigNumber>,
): boolean {
  // trim last zeros for correct power picking
  if (!polynomParam) {
    return false;
  }
  const polynom = trimPolynomLastZeros(polynomParam);
  if (polynom.length === 1) {
    return false;
  }
  if (polynom && polynom.length === 2 && polynom[1] === '1') {
    // x, x + 1
    return true;
  }
  const polynomPower: number = polynom.length - 1;
  const polynomParsed: Array<number> = polynom
    .split('')
    .map(n => parseInt(n, 10));
  const powForTests: BigNumber = new BigNumber(2).pow(polynomPower).minus(1);
  const primes: Array<BigNumber> =
    primeMultipliers || primeFactorization(powForTests);

  const distinctPrimes = Array.from(new Set(primes.map(p => p.toString()))).map(
    p => new BigNumber(p),
  );

  let c = 1;
  while (c < ITERATIONS_COUNT) {
    const randomPolynom = generateRandomPolynom(polynomPower);
    if (
      randomPolynom.length &&
      condition1(randomPolynom, polynomParsed, powForTests) &&
      condition2(randomPolynom, polynomParsed, powForTests, distinctPrimes)
    ) {
      return true;
    }
    c++;
  }
  return false;
}

export function generateIrreduciblePolynom(
  maxPow?: number,
  primeMultipliers?: Array<BigNumber>,
): Promise<Array<number>> {
  return new Promise((resolve, reject) => {
    let end = false;
    while (!end) {
      const polynom = generateRandomPolynom(
        maxPow || MAX_FACTORIZED_POWER,
        !!maxPow,
      );
      if (
        polynom.length > 1 &&
        testPolynom(polynom.join(''), primeMultipliers)
      ) {
        end = true;
        resolve(polynom);
      }
    }
  });
}

/**
 *
 * @deprecated Since using big numbers. Use primeFactorization instead
 */
export function primeFactorization53(number: number, res?: Array<number>) {
  const result = res || [];
  const root = Math.sqrt(number);
  let x = 2;

  if (number % x) {
    x = 3;

    while (number % x && (x = x + 2) < root) {}
  }

  x = x <= root ? x : number;

  result.push(x);

  return x === number ? result : primeFactorization53(number / x, result);
}
