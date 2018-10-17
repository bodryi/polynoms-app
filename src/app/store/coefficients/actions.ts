import { Action } from '@ngrx/store';

export const MOD_CHANGE = '[Coefficients] Mod Change';
export const COEFFICIENT_A_CHANGE = '[Coefficients] Coefficient A Change';
export const COEFFICIENT_B_CHANGE = '[Coefficients] Coefficient B Change';
export const COEFFICIENT_C_CHANGE = '[Coefficients] Coefficient C Change';
export const TEST_POLYNOM = '[Coefficients] Test Polynom';
export const TEST_POLYNOM_SUCCESS = '[Coefficients] Test Polynom Success';
export const TEST_POLYNOM_RESULT_RESET =
  '[Coefficients] Test Polynom Result Reset';
export const GENERATE_IRREDUCIBLE_POLYNOM =
  '[Coefficients] Generate Irreducible Polynom';
export const GENERATE_IRREDUCIBLE_POLYNOM_SUCCESS =
  '[Coefficients] Generate Irreducible Polynom Success';
export const GENERATE_IRREDUCIBLE_POLYNOM_FAILURE =
  '[Coefficients] Generate Irreducible Polynom Failure';

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

export class TestPolynom implements Action {
  readonly type = TEST_POLYNOM;

  constructor(public payload?: string) {}
}

export class TestPolynomSuccess implements Action {
  readonly type = TEST_POLYNOM_SUCCESS;

  constructor(public payload: boolean) {}
}

export class TestPolynomResetResult implements Action {
  readonly type = TEST_POLYNOM_RESULT_RESET;
}

export class GenerateIrreduciblePolynom implements Action {
  readonly type = GENERATE_IRREDUCIBLE_POLYNOM;
}

export class GenerateIrreduciblePolynomSuccess implements Action {
  readonly type = GENERATE_IRREDUCIBLE_POLYNOM_SUCCESS;

  constructor(public payload: string) {}
}

export class GenerateIrreduciblePolynomFailure implements Action {
  readonly type = GENERATE_IRREDUCIBLE_POLYNOM_FAILURE;
}

export type Actions =
  | ModChange
  | CoefficientAChange
  | CoefficientBChange
  | CoefficientCChange
  | TestPolynom
  | TestPolynomResetResult
  | TestPolynomSuccess
  | GenerateIrreduciblePolynom
  | GenerateIrreduciblePolynomSuccess
  | GenerateIrreduciblePolynomFailure;
