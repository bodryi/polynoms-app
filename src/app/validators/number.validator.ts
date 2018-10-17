import { FormControl } from '@angular/forms';

export function number(control: FormControl): { [key: string]: any } | null {
  const value = control.value;

  if (!value || Number(value) && isFinite(Number(value))) {
    return null;
  } else {
    return {
      number: false,
    };
  }

}
