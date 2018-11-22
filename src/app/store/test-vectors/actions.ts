import { Action } from '@ngrx/store';

export const TEST_VECTOR_A_CHANGE = '[Test Vectors] Test Vector A Change';
export const TEST_VECTOR_B_CHANGE = '[Test Vectors] Test Vector B Change';
export const TEST_VECTOR_C_CHANGE = '[Test Vectors] Test Vector C Change';
export const GENERATE_RANDOM_TEST_VECTOR =
  '[Test Vectors] Generate Random Test Vector';
export const COPY = '[Test Vectors] Copy';
export const COPY_VECTOR = '[Test Vectors] Copy Vector';
export const PASTE = '[Test Vectors] Paste';
export const CLEAR = '[Test Vectors] Clear';
export const REVERT_A = '[Test Vectors] Revert A';

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

export class CopyVector implements Action {
  readonly type = COPY_VECTOR;

  constructor(public payload: Array<string>) {}
}

export class Paste implements Action {
  readonly type = PASTE;

  constructor(public payload: string) {}
}

export class Clear implements Action {
  readonly type = CLEAR;

  constructor(public payload: string) {}
}

export class GenerateRandomTestVector implements Action {
  readonly type = GENERATE_RANDOM_TEST_VECTOR;

  constructor(public payload: string) {}
}

export class RevertA implements Action {
  readonly type = REVERT_A
}

export type Actions =
  | TestVectorAChange
  | TestVectorBChange
  | TestVectorCChange
  | Copy
  | CopyVector
  | Paste
  | GenerateRandomTestVector
  | RevertA
  | Clear;
