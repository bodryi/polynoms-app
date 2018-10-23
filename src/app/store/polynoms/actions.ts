import { Action } from '@ngrx/store';

export const POLYNOM_A_CHANGE = '[Polynoms] Polynom A Change';
export const POLYNOM_B_CHANGE = '[Polynoms] Polynom B Change';
export const POLYNOM_C_CHANGE = '[Polynoms] Polynom C Change';
export const POLYNOM_RESULT_CHANGE = '[Polynoms] Polynom Result Change';
export const POLYNOM_POWER_CHANGE = '[Polynoms] Polynom Power Change';
export const A_PLUS_B_MOD_C = '[Polynoms] A Plus B Mod C';
export const A_POWER_N_MOD_C = '[Polynoms] A Power N Mod C';
export const GCD_A_B = '[Polynoms] GCD A B';
export const A_INVERSE_MOD_C = '[Polynoms] A Inverse Mod C';
export const A_MULTIPLY_B_MOD_C = '[Polynoms] A Multiply B Mod C';
export const POLYNOM_A_VALIDITY_CHANGE = '[Polynoms] Polynom A Validity Change';
export const POLYNOM_B_VALIDITY_CHANGE = '[Polynoms] Polynom B Validity Change';
export const POLYNOM_C_VALIDITY_CHANGE = '[Polynoms] Polynom C Validity Change';
export const POLYNOM_POWER_VALIDITY_CHANGE = '[Polynoms] Polynom Power Validity Change';

export class PolynomAChange implements Action {
  readonly type = POLYNOM_A_CHANGE;

  constructor(public payload: string) {
  }
}

export class PolynomBChange implements Action {
  readonly type = POLYNOM_B_CHANGE;

  constructor(public payload: string) {
  }
}

export class PolynomCChange implements Action {
  readonly type = POLYNOM_C_CHANGE;

  constructor(public payload: string) {
  }
}

export class PolynomResultChange implements Action {
  readonly type = POLYNOM_RESULT_CHANGE;

  constructor(public payload: string) {
  }
}

export class PolynomPowerChange implements Action {
  readonly type = POLYNOM_POWER_CHANGE;

  constructor(public payload: string) {
  }
}

export class APlusBModC implements Action {
  readonly type = A_PLUS_B_MOD_C;
}

export class APowerNModC implements Action {
  readonly type = A_POWER_N_MOD_C;
}

export class GCDAB implements Action {
  readonly type = GCD_A_B;
}

export class AInverseModC implements Action {
  readonly type = A_INVERSE_MOD_C;
}

export class AMultiplyBModC implements Action {
  readonly type = A_MULTIPLY_B_MOD_C;
}

export class PolynomAValidityChange implements Action {
  readonly type = POLYNOM_A_VALIDITY_CHANGE;

  constructor(public payload: boolean) {
  }
}

export class PolynomBValidityChange implements Action {
  readonly type = POLYNOM_B_VALIDITY_CHANGE;

  constructor(public payload: boolean) {
  }
}

export class PolynomCValidityChange implements Action {
  readonly type = POLYNOM_C_VALIDITY_CHANGE;

  constructor(public payload: boolean) {
  }
}

export class PolynomPowerValidityChange implements Action {
  readonly type = POLYNOM_POWER_VALIDITY_CHANGE;

  constructor(public payload: boolean) {
  }
}

export type Actions =
  PolynomAChange
  | PolynomBChange
  | PolynomCChange
  | PolynomResultChange
  | PolynomPowerChange
  | APlusBModC
  | GCDAB
  | AInverseModC
  | AMultiplyBModC
  | PolynomAValidityChange
  | PolynomBValidityChange
  | PolynomCValidityChange
  | PolynomPowerValidityChange
  | APowerNModC;
