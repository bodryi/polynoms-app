import {
  isPolynomEqualsOne,
  primeFactorization,
  testPolynom,
} from '../irreducible-polynoms.util';
import BigNumber from 'bignumber.js';

describe('Irreducible Polynoms Util', () => {
  it('should test is polynome equals one', () => {
    expect(
      isPolynomEqualsOne('10000'.split('').map(n => parseInt(n, 10))),
    ).toBeTruthy();
    expect(
      isPolynomEqualsOne('10000000000'.split('').map(n => parseInt(n, 10))),
    ).toBeTruthy();
    expect(
      isPolynomEqualsOne('1'.split('').map(n => parseInt(n, 10))),
    ).toBeTruthy();

    expect(
      isPolynomEqualsOne('0'.split('').map(n => parseInt(n, 10))),
    ).toBeFalsy();
    expect(
      isPolynomEqualsOne(
        '10000000000000001000'.split('').map(n => parseInt(n, 10)),
      ),
    ).toBeFalsy();
    expect(
      isPolynomEqualsOne(
        '00000000000000001001'.split('').map(n => parseInt(n, 10)),
      ),
    ).toBeFalsy();
    expect(
      isPolynomEqualsOne(
        '00000000000000000001'.split('').map(n => parseInt(n, 10)),
      ),
    ).toBeFalsy();
    expect(isPolynomEqualsOne([])).toBeFalsy();
  });

  it('should do correct prime factorization', () => {
    expect(primeFactorization(new BigNumber(2))).toEqual([new BigNumber(2)]);
    expect(primeFactorization(new BigNumber(127))).toEqual([
      new BigNumber(127),
    ]);
    expect(primeFactorization(new BigNumber(8388607))).toEqual([
      new BigNumber(47),
      new BigNumber(178481),
    ]);
    expect(primeFactorization(new BigNumber(17592186044415))).toEqual([
      new BigNumber(3),
      new BigNumber(5),
      new BigNumber(23),
      new BigNumber(89),
      new BigNumber(397),
      new BigNumber(683),
      new BigNumber(2113),
    ]);
    expect(primeFactorization(new BigNumber('4503599627370495'))).toEqual([
      new BigNumber(3),
      new BigNumber(5),
      new BigNumber(53),
      new BigNumber(157),
      new BigNumber(1613),
      new BigNumber(2731),
      new BigNumber(8191),
    ]);
  });

  it('should correctly test polynoms for irreducibility', () => {
    expect(testPolynom('11')).toBeTruthy();
    expect(testPolynom('01')).toBeTruthy();
    expect(testPolynom('111')).toBeTruthy();
    expect(testPolynom('1101')).toBeTruthy();
    expect(testPolynom('1011')).toBeTruthy();
    expect(testPolynom('11001')).toBeTruthy();
    expect(testPolynom('11111')).toBeTruthy();
    expect(testPolynom('10011')).toBeTruthy();
    expect(testPolynom('101001')).toBeTruthy();
    expect(testPolynom('111101')).toBeTruthy();
    expect(testPolynom('100101')).toBeTruthy();
    expect(testPolynom('110111')).toBeTruthy();
    expect(testPolynom('101111')).toBeTruthy();
    expect(testPolynom('111011')).toBeTruthy();

    expect(testPolynom('1')).toBeFalsy();
    expect(testPolynom('101')).toBeFalsy();
    expect(testPolynom('1111')).toBeFalsy();
    expect(testPolynom('111111')).toBeFalsy();
  });
});
