import {
  invert,
  isNull,
  minus,
  mod,
  multiply,
  multiplyMod,
  plus,
  plusMod,
  pow,
  powMod,
  quo,
  toBits,
  xgcd,
} from '../polynoms-operations.util';
import BigNumber from 'bignumber.js';

describe('Polynoms Operations Util', () => {
  it('plus', () => {
    expect(plus([1, 1], [1, 1])).toEqual([0, 0]);
    expect(plus([1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 0, 0, 0, 1])).toEqual([
      0,
      0,
      1,
      1,
      0,
      0,
      1,
      1,
    ]);
  });

  it('minus', () => {
    expect(minus([1, 1], [1, 1])).toEqual([0, 0]);
    expect(minus([1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 0, 0, 0, 1])).toEqual([
      0,
      0,
      1,
      1,
      0,
      0,
      1,
      1,
    ]);
  });

  it('plus mod', () => {
    expect(
      plusMod(
        '1100101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '1101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '101010111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '1101000'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      plusMod(
        '10101010111101011110101010010101110101010111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '1010101010101110111101011110101010010101110101010111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '1010101111111101011'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '110111100110110111'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );
  });

  it('multiply', () => {
    expect(
      multiply(
        '1100101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '1101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '1011011001'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );
    expect(
      multiply(
        '1100101101010100101011111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '110111111111111001'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '101111110100110010011111100001000011110111'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );
    expect(
      multiply(
        '110010110101010010101111111001011010101001010111111100101101010100101011111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '110111111111111001110111111111111001110111111111111001'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '10111111010011001011000000001000101101111000110111000010110100111000010100101010100000000101010010011111101000100001000011110111'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );
  });

  it('multiply mod', () => {
    expect(
      multiplyMod(
        '1100101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '1101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '101010111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '01110111'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      multiplyMod(
        '1100101101010100101011111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '110111111111111001'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '1010101111010101111111101010011'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '101011011010010010101100001100'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    // expect(
    //   multiplyMod(
    //     '110010110101010010101111111001011010101001010111111100101101010100101011111'
    //       .split('')
    //       .reverse()
    //       .map(n => parseInt(n, 10)),
    //     '110111111111111001110111111111111001110111111111111001'
    //       .split('')
    //       .reverse()
    //       .map(n => parseInt(n, 10)),
    //     '101010111101010111111110101001111101011'
    //       .split('')
    //       .reverse()
    //       .map(n => parseInt(n, 10)),
    //   ),
    // ).toEqual(
    //   '10000001101100010110001010111001010010'
    //     .split('')
    //     .reverse()
    //     .map(n => parseInt(n, 10)),
    // );
  });

  it('mod', () => {
    expect(
      mod(
        '10111111010011001011000000001000101101111000110111000010110100111000010100101010'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '101010111101010111111110101001111101011'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '10000001101100010110001010111001010010'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      mod(
        '10111111010011001011000000001000101101111000110111000010110100111000010100101010'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '110111111111111001110111111111111001110111111111111001'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '00111101001101111111000000100011100100100011011111101'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      mod(
        '110010110101010010101111111001011010101001010111111100101101010100101011111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '101010111101010111111110101001111101011'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '11110011001010000110111001100100000101'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      mod(
        '10111111010011001011000000001000101101111000110111000010110100111000010100101010'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '101010111101010111111110101001111101011'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '10000001101100010110001010111001010010'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );
  });

  it('quo', () => {
    expect(
      quo(
        '10111111010011001011000000001000101101111000110111000010110100111000010100101010'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '101010111101010111111110101001111101011'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '100100011001100001011010000111001011101000'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      quo(
        '10111111010011001011000000001000101101111000110111000010110100111000010100101010'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '110111111111111001110111111111111001110111111111111001'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '110010110101010010101111111'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      quo(
        '110010110101010010101111111001011010101001010111111100101101010100101011111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '101010111101010111111110101001111101011'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '1111100001001111111100011011011100110'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      quo(
        '10111111010011001011000000001000101101111000110111000010110100111000010100101010'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        '101010111101010111111110101001111101011'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '100100011001100001011010000111001011101000'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );
  });

  it('pow', () => {
    expect(
      pow(
        '1100101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        new BigNumber(2),
      ),
    ).toEqual(
      '1010000010001'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      pow(
        '1010000010001'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        new BigNumber(5),
      ),
    ).toEqual(
      '1010000000101000100010000000000010100000100010001010000010001'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      pow(
        '11'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        new BigNumber(15),
      ),
    ).toEqual(
      '1111111111111111'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );
  });

  it('pow mod', () => {
    expect(
      powMod(
        '11'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        new BigNumber(15),
        '1111111111111111'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '000000000000000'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(
      powMod(
        '1100101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
        new BigNumber(2),
        '11101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '0011'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );
  });

  it('invert', () => {
    expect(
      invert(
        '1100101'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(
      '0011010'
        .split('')
        .reverse()
        .map(n => parseInt(n, 10)),
    );

    expect(invert('1010000010001'.split('').map(n => parseInt(n, 10)))).toEqual(
      '0101111101110'.split('').map(n => parseInt(n, 10)),
    );
  });

  it('to bits', () => {
    expect(
      toBits('1010000000101000100010000000000010100000100010001010000010001'),
    ).toEqual(
      '1010000000101000100010000000000010100000100010001010000010001'
        .split('')
        .map(n => parseInt(n, 10)),
    );

    expect(toBits('000101001100')).toEqual(
      '000101001100'.split('').map(n => parseInt(n, 10)),
    );
  });

  it('is null', () => {
    expect(
      isNull(
        '11'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(false);

    expect(
      isNull(
        '000000'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(true);

    expect(
      isNull(
        '0'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(true);

    expect(
      isNull(
        '0000000000000000000000000000000000000000000000000000001'
          .split('')
          .reverse()
          .map(n => parseInt(n, 10)),
      ),
    ).toEqual(false);
  });

  // it('xgcd', () => {
  //   expect(
  //     xgcd(
  //       '101011'
  //         .split('')
  //         .reverse()
  //         .map(n => parseInt(n, 10)),
  //       '11011110101'
  //         .split('')
  //         .reverse()
  //         .map(n => parseInt(n, 10)),
  //     ),
  //   ).toEqual({
  //     gcd: '101011'
  //       .split('')
  //       .reverse()
  //       .map(n => parseInt(n, 10)),
  //     x: '111010'
  //       .split('')
  //       .reverse()
  //       .map(n => parseInt(n, 10)),
  //     y: '1'
  //       .split('')
  //       .reverse()
  //       .map(n => parseInt(n, 10)),
  //   });
  // });
});
