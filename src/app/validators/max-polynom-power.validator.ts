import { FormControl, ValidatorFn } from '@angular/forms';
import { hexToBin } from '../utlis/convert-numbers.util';

const LAST_ZEROES_REGEXP = /(0+)$/g;

export function maxPolynomPower(power: number): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    if (!control.value) {
      return { maxPolynomPower: false };
    }
    const binValue = hexToBin(control.value).replace(LAST_ZEROES_REGEXP, '');
    return binValue.length > power ? { maxPolynomPower: false } : null;
  };
}
