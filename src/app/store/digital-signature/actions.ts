import { Action } from '@ngrx/store';

export const STRING_VALUE_CHANGE = '[Digital Signature] String Value Change';
export const ARRAY_VALUE_CHANGE = '[Digital Signature] Array Value Change';
export const GENERATE_RANDOM_VECTOR =
  '[Digital Signature] Generate Random Vector';
export const CLEAR_VECTOR = '[Digital Signature] Clear Vector';
export const COPY_VECTOR = '[Digital Signature] Copy Vector';
export const PASTE_VECTOR = '[Digital Signature] Paste Vector';
export const CALCULATE_ER1 = '[Digital Signature] Calculate Er1';
export const CALCULATE_ER2 = '[Digital Signature] Calculate Er2';
export const CALCULATE_ER3 = '[Digital Signature] Calculate Er3';
export const CALCULATE_T = '[Digital Signature] Calculate T';
export const CALCULATE_P = '[Digital Signature] Calculate P';
export const CALCULATE_L = '[Digital Signature] Calculate L';
export const CALCULATE_Y = '[Digital Signature] Calculate Y';
export const CALCULATE_U = '[Digital Signature] Calculate U';
export const CALCULATE_R = '[Digital Signature] Calculate R';
export const CALCULATE_E = '[Digital Signature] Calculate E';
export const CALCULATE_S = '[Digital Signature] Calculate S';

export class StringValueChange implements Action {
  readonly type = STRING_VALUE_CHANGE;

  constructor(public payload: { key: string; value: string }) {}
}

export class ArrayValueChange implements Action {
  readonly type = ARRAY_VALUE_CHANGE;

  constructor(public payload: { key: string; value: Array<any> }) {}
}

export class GenerateRandomVector implements Action {
  readonly type = GENERATE_RANDOM_VECTOR;

  constructor(public payload: string) {}
}

export class ClearVector implements Action {
  readonly type = CLEAR_VECTOR;

  constructor(public payload: string) {}
}

export class CopyVector implements Action {
  readonly type = COPY_VECTOR;

  constructor(public payload: string) {}
}

export class PasteVector implements Action {
  readonly type = PASTE_VECTOR;

  constructor(public payload: string) {}
}

export class CalculateEr1 implements Action {
  readonly type = CALCULATE_ER1;
}

export class CalculateEr2 implements Action {
  readonly type = CALCULATE_ER2;
}

export class CalculateEr3 implements Action {
  readonly type = CALCULATE_ER3;
}

export class CalculateT implements Action {
  readonly type = CALCULATE_T;
}

export class CalculateL implements Action {
  readonly type = CALCULATE_L;
}

export class CalculateP implements Action {
  readonly type = CALCULATE_P;
}

export class CalculateY implements Action {
  readonly type = CALCULATE_Y;
}

export class CalculateU implements Action {
  readonly type = CALCULATE_U;
}

export class CalculateR implements Action {
  readonly type = CALCULATE_R;
}

export class CalculateE implements Action {
  readonly type = CALCULATE_E;
}

export class CalculateS implements Action {
  readonly type = CALCULATE_S;
}

export type Actions =
  | StringValueChange
  | ArrayValueChange
  | GenerateRandomVector
  | CopyVector
  | PasteVector
  | CalculateEr1
  | CalculateEr2
  | CalculateEr3
  | CalculateT
  | CalculateL
  | CalculateP
  | CalculateY
  | CalculateR
  | CalculateE
  | CalculateS
  | ClearVector;
