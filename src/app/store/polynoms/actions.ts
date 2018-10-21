import { Action } from '@ngrx/store';

export const POLYNOM_A_CHANGE = '[Polynoms] Polynom A Change';
export const POLYNOM_B_CHANGE = '[Polynoms] Polynom B Change';
export const POLYNOM_C_CHANGE = '[Polynoms] Polynom C Change';
export const POLYNOM_RESULT_CHANGE = '[Polynoms] Polynom Result Change';
export const POLYNOM_POWER_CHANGE = '[Polynoms] Polynom Power Change';

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

export type Actions = PolynomAChange | PolynomBChange | PolynomCChange | PolynomResultChange | PolynomPowerChange;
