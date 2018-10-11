import { toBits, fillWithZerosOneNumber } from './polynoms-operations.util';

const FOUR_SYMBOLS_REGEXP = /.{1,4}/g;

export function binToHex(bin: string): string {
  const filledBin = fillWithZerosOneNumber(
    toBits(bin),
    bin.length + bin.length % 4,
  )
    .reverse()
    .join('');
  return (filledBin.match(FOUR_SYMBOLS_REGEXP) || [])
    .map((q: string) => parseInt(q, 2).toString(16))
    .join('');
}

export function hexToBin(hex: string) {
  return (hex.split('') || [])
    .map((h: string) => parseInt(h, 16).toString(2))
    .join('')
    .split('')
    .reverse()
    .join('');
}
