import { Action } from '@ngrx/store';

export const MULTIPLY_A_B = '[Actions] Multiply A B';
export const MULTIPLY_B_C = '[Actions] Multiply B C';
export const LEFT_MULTIPLY = '[Actions] Left Multiply';
export const RIGHT_MULTIPLY = '[Actions] Right Multiply';
export const ADD_A_B = '[Actions] Add A B';
export const A_POWER_N = '[Actions] A Power N';
export const SET_N = '[Actions] Set N';
export const SET_N_VALIDITY = '[Actions] Set N Validity';

export class MultiplyAB implements Action {
  readonly type = MULTIPLY_A_B;
}

export class MultiplyBC implements Action {
  readonly type = MULTIPLY_B_C;
}

export class LeftMultiply implements Action {
  readonly type = LEFT_MULTIPLY;
}

export class RightMultiply implements Action {
  readonly type = RIGHT_MULTIPLY;
}

export class AddAB implements Action {
  readonly type = ADD_A_B;
}

export class APowerN implements Action {
  readonly type = A_POWER_N;
}

export class SetN implements Action {
  readonly type = SET_N;

  constructor(public payload: string) {}
}

export class SetNValidity implements Action {
  readonly type = SET_N_VALIDITY;

  constructor(public payload: boolean) {}
}

export type Actions =
  | MultiplyAB
  | MultiplyBC
  | LeftMultiply
  | RightMultiply
  | AddAB
  | APowerN
  | SetNValidity
  | SetN;
