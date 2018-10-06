import { Action } from '@ngrx/store';

export const TEST_VECTOR_A_CHANGE = '[Test Vectors] Test Vector A Change';
export const TEST_VECTOR_B_CHANGE = '[Test Vectors] Test Vector B Change';
export const TEST_VECTOR_C_CHANGE = '[Test Vectors] Test Vector C Change';
export const COPY = '[Test Vectors] Copy';
export const PASTE = '[Test Vectors] Paste';
export const CLEAR = '[Test Vectors] Clear';

export class TestVectorAChange implements Action {
  readonly type = TEST_VECTOR_A_CHANGE;

  constructor(public payload: Array<string>) {}
}

export class TestVectorBChange implements Action {
  readonly type = TEST_VECTOR_B_CHANGE;

  constructor(public payload: Array<string>) {}
}

export class TestVectorCChange implements Action {
  readonly type = TEST_VECTOR_C_CHANGE;

  constructor(public payload: Array<string>) {}
}

export class Copy implements Action {
  readonly type = COPY;

  constructor(public payload: string) {}
}

export class Paste implements Action {
  readonly type = PASTE;

  constructor(public payload: string) {}
}

export class Clear implements Action {
  readonly type = CLEAR;

  constructor(public payload: string) {}
}

export type Actions =
  | TestVectorAChange
  | TestVectorBChange
  | TestVectorCChange
  | Copy
  | Paste
  | Clear;
