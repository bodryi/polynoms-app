import { toBits, fillWithZerosOneNumber, fillWithZerosOneNumberInFront } from './polynoms-operations.util';
import { FOUR_SYMBOLS_REGEXP } from '../constants/app.constants';


export function binToHex(bin: string): string {
  const filledBin = fillWithZerosOneNumber(
    toBits(bin),
    bin.length % 4 ?
      bin.length + 4 - (bin.length % 4) : bin.length,
  )
    .reverse()
    .join('');
  return bin && (filledBin.match(FOUR_SYMBOLS_REGEXP) || [])
    .map((q: string) => parseInt(q, 2).toString(16))
    .join('');
}

export function hexToBin(hex: string) {
  return hex && (hex.split('') || [])
    .map((h: string) => {
      const shortRealBin = parseInt(h, 16).toString(2);
      return fillWithZerosOneNumberInFront(
        toBits(shortRealBin),
        shortRealBin.length % 4 ?
          shortRealBin.length + 4 - (shortRealBin.length % 4) : shortRealBin.length)
        .join('');
    })
    .join('')
    .split('')
    .reverse()
    .join('');
}
