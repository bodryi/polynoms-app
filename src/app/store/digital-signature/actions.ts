import { Action } from '@ngrx/store';

export const STRING_VALUE_CHANGE = '[Digital Signature] String Value Change';
export const ARRAY_VALUE_CHANGE = '[Digital Signature] Array Value Change';
export const GENERATE_RANDOM_VECTOR =
  '[Digital Signature] Generate Random Vector ';
export const CLEAR_VECTOR = '[Digital Signature] Clear Vector ';
export const COPY_VECTOR = '[Digital Signature] Copy Vector ';
export const PASTE_VECTOR = '[Digital Signature] Paste Vector ';

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

export type Actions =
  | StringValueChange
  | ArrayValueChange
  | GenerateRandomVector
  | CopyVector
  | PasteVector
  | ClearVector;
