import { Action } from '@ngrx/store';

export const SET_ACTIVE_RESULT_VECTOR =
  '[Result Vectors] Set Active Result Vector';
export const SET_RESULT = '[Result Vectors] SET_RESULT';
export const COPY = '[Result Vectors] Copy';
export const PASTE = '[Result Vectors] Paste';
export const CLEAR = '[Result Vectors] Clear';


export class SetActiveResultVector implements Action {
  readonly type = SET_ACTIVE_RESULT_VECTOR;

  constructor(public payload: number) {}
}

export class SetResult implements Action {
  readonly type = SET_RESULT;

  constructor(public payload: Array<string>) {}
}

export class Copy implements Action {
  readonly type = COPY;

  constructor(public payload: number) {}
}

export class Paste implements Action {
  readonly type = PASTE;

  constructor(public payload: number) {}
}

export class Clear implements Action {
  readonly type = CLEAR;

  constructor(public payload: number) {}
}

export type Actions = SetActiveResultVector | SetResult | Copy | Paste | Clear;
