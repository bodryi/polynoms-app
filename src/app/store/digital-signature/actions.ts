import { Action } from '@ngrx/store';

export const STRING_VALUE_CHANGE = '[Digital Signature] String Value Change';
export const ARRAY_VALUE_CHANGE = '[Digital Signature] Array Value Change';

export class StringValueChange implements Action {
  readonly type = STRING_VALUE_CHANGE;

  constructor(public payload: { key: string; value: string; valid: boolean }) {}
}

export class ArrayValueChange implements Action {
  readonly type = ARRAY_VALUE_CHANGE;

  constructor(public payload: { key: string; value: Array<any> }) {}
}

export type Actions = StringValueChange | ArrayValueChange;
