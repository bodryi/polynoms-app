import { binToHex, hexToBin } from '../convert-numbers.util';

describe('Convert Numbers Util', () => {
  it('should convert hex to bin (reversed in state)', () => {
    expect(hexToBin('0')).toEqual('0000');
    expect(hexToBin('1')).toEqual('1000');
    expect(hexToBin('2')).toEqual('0100');
    expect(hexToBin('3')).toEqual('1100');
    expect(hexToBin('4')).toEqual('0010');
    expect(hexToBin('5')).toEqual('1010');
    expect(hexToBin('6')).toEqual('0110');
    expect(hexToBin('7')).toEqual('1110');
    expect(hexToBin('8')).toEqual('0001');
    expect(hexToBin('9')).toEqual('1001');
    expect(hexToBin('a')).toEqual('0101');
    expect(hexToBin('b')).toEqual('1101');
    expect(hexToBin('c')).toEqual('0011');
    expect(hexToBin('d')).toEqual('1011');
    expect(hexToBin('e')).toEqual('0111');
    expect(hexToBin('f')).toEqual('1111');

    expect(hexToBin('1ebf')).toEqual(
      ['1000', '0111', '1101', '1111'].reverse().join(''),
    );
  });

  it('should convert bin (reversed in state) to hex', () => {
    expect(binToHex('0000')).toEqual('0');
    expect(binToHex('1000')).toEqual('1');
    expect(binToHex('0100')).toEqual('2');
    expect(binToHex('1100')).toEqual('3');
    expect(binToHex('0010')).toEqual('4');
    expect(binToHex('1010')).toEqual('5');
    expect(binToHex('0110')).toEqual('6');
    expect(binToHex('1110')).toEqual('7');
    expect(binToHex('0001')).toEqual('8');
    expect(binToHex('1001')).toEqual('9');
    expect(binToHex('0101')).toEqual('a');
    expect(binToHex('1101')).toEqual('b');
    expect(binToHex('0011')).toEqual('c');
    expect(binToHex('1011')).toEqual('d');
    expect(binToHex('0111')).toEqual('e');
    expect(binToHex('1111')).toEqual('f');

    expect(binToHex('1111110101111000')).toEqual('1ebf');
  });
});
