import { FormControl, ValidatorFn } from '@angular/forms';
import { hexToBin } from '../utlis/convert-numbers.util';
import { trimPolynomLastZeros } from '../utlis/irreducible-polynoms.util';
import { LAST_ZEROES_REGEXP } from '../constants/app.constants';

export function maxPolynomPower(power: number): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    if (!control.value) {
      return { maxPolynomPower: false };
    }
    const binValue = hexToBin(control.value).replace(LAST_ZEROES_REGEXP, '');
    const binValueTrimed = trimPolynomLastZeros(binValue);
    return binValueTrimed.length - 1 > power
      ? { maxPolynomPower: false }
      : null;
  };
}
