import {
  multiplyMod,
  plus,
  plusMod,
  quo,
  toBits,
} from './polynoms-operations.util';

export function localRightSideUnit(
  NDS: Array<string>,
  h: string,
  n: string,
  mod: string,
  ...coefficientsStrings: Array<string>
): Array<string> {
  const N = NDS.map(s => toBits(s));
  const coefficients = coefficientsStrings.map(s => toBits(s));
  const parsedMod = toBits(mod);
  const nParsed = toBits(n);
  const hParsed = toBits(h);
  const unit = new Array(4).fill('');
  unit[0] = hParsed.join('');
  const divisor = plusMod(
    multiplyMod(N[0], coefficients[0], parsedMod),
    N[3],
    parsedMod,
  );
  unit[1] = plusMod(
    quo(N[3], divisor),
    multiplyMod(
      quo(plus(N[0], multiplyMod(N[3], coefficients[1], parsedMod)), divisor),
      nParsed,
      parsedMod,
    ),
    parsedMod,
  ).join('');
  unit[2] = plusMod(
    quo(N[0], divisor),
    multiplyMod(
      hParsed,
      quo(plus(N[0], multiplyMod(N[3], coefficients[1], parsedMod)), divisor),
      parsedMod,
    ),
    parsedMod,
  ).join('');
  unit[3] = nParsed.join('');
  return unit;
}
