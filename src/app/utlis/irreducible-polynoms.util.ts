import { BigNumber } from 'bignumber.js';
import { powMod } from './polynoms-operations.util';

const ITERATIONS_COUNT = 30;
const MAX_FACTORIZED_POWER = 62;
const MAX_GENERATE_TRIES = 10;

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

export function generateRandomPolynom(maxPow: number): Array<number> {
  if (!maxPow) {
    return [];
  }
  const pow = Math.floor(Math.random() * 255) % maxPow;
  return new Array(pow || maxPow - 1)
    .fill(null)
    .map(() => Math.floor(Math.random() * 65535) % 2);
}

export function isPolynomEqualsOne(polynom: Array<number>): boolean {
  if (!polynom.length || polynom[0] !== 1) {
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

export function testPolynom(polynomParam: string): boolean {
  // trim last zeros for correct power picking
  if (!polynomParam) {
    return false;
  }
  const polynom = polynomParam.replace(/(0+)$/g, '');
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
  const primes: Array<BigNumber> = primeFactorization(powForTests);

  const distinctPrimes = Array.from(new Set(primes.map(p => p.toString()))).map(
    p => new BigNumber(p),
  );

  let c = 1;
  while (c < ITERATIONS_COUNT) {
    const randomPolynom = generateRandomPolynom(polynom.length);
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
  maxPow: number = MAX_FACTORIZED_POWER,
): Promise<Array<number>> {
  return new Promise((resolve, reject) => {
    let c = 0;
    while (c < MAX_GENERATE_TRIES) {
      const polynom = generateRandomPolynom(maxPow);
      if (polynom.length > 1 && testPolynom(polynom.join(''))) {
        resolve(polynom);
      }

      c++;
    }

    resolve(null);
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
