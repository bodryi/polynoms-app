import { Action } from '@ngrx/store';

export const MOD_CHANGE = '[Coefficients] Mod Change';
export const COEFFICIENT_A_CHANGE = '[Coefficients] Coefficient A Change';
export const COEFFICIENT_B_CHANGE = '[Coefficients] Coefficient B Change';
export const COEFFICIENT_C_CHANGE = '[Coefficients] Coefficient C Change';

export class ModChange implements Action {
  readonly type = MOD_CHANGE;

  constructor(public payload: string) {}
}

export class CoefficientAChange implements Action {
  readonly type = COEFFICIENT_A_CHANGE;

  constructor(public payload: string) {}
}

export class CoefficientBChange implements Action {
  readonly type = COEFFICIENT_B_CHANGE;

  constructor(public payload: string) {}
}

export class CoefficientCChange implements Action {
  readonly type = COEFFICIENT_C_CHANGE;

  constructor(public payload: string) {}
}

export type Actions =
  | ModChange
  | CoefficientAChange
  | CoefficientBChange
  | CoefficientCChange;
