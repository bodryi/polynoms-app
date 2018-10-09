import { Action } from '@ngrx/store';

export const MATRIX_CHANGE = '[Matrix] Matrix Change';
export const OPEN_FILE = '[Matrix] Open File';
export const OPEN_FILE_SUCCESS = '[Matrix] Open File Success';
export const OPEN_FILE_FAILURE = '[Matrix] Open File Failure';
export const SAVE_FILE = '[Matrix] Save File';
export const SAVE_FILE_SUCCESS = '[Matrix] Save File Success';
export const SAVE_FILE_FAILURE = '[Matrix] Save File Failure';
export const COPY = '[Matrix] Copy';
export const PASTE = '[Matrix] Paste';
export const CLEAR = '[Matrix] Clear';
export const SET_DEFAULT = '[Matrix] Set Default';

export class MatrixChange implements Action {
  readonly type = MATRIX_CHANGE;

  constructor(public payload: Array<Array<string>>) {}
}

export class OpenFile implements Action {
  readonly type = OPEN_FILE;
}

export class OpenFileSuccess implements Action {
  readonly type = OPEN_FILE_SUCCESS;

  constructor(public payload: string) {}
}

export class OpenFileFailure implements Action {
  readonly type = OPEN_FILE_FAILURE;
}

export class SaveFile implements Action {
  readonly type = SAVE_FILE;
}

export class SaveFileSuccess implements Action {
  readonly type = SAVE_FILE_SUCCESS;
}

export class SaveFileFailure implements Action {
  readonly type = SAVE_FILE_FAILURE;
}

export class Copy implements Action {
  readonly type = COPY;
}

export class Paste implements Action {
  readonly type = PASTE;
}

export class Clear implements Action {
  readonly type = CLEAR;
}

export class SetDefault implements Action {
  readonly type = SET_DEFAULT;
}

export type Actions =
  | MatrixChange
  | OpenFile
  | OpenFileSuccess
  | OpenFileFailure
  | OpenFileFailure
  | SaveFile
  | SaveFileSuccess
  | SaveFileFailure
  | Copy
  | Paste
  | Clear
  | SetDefault;
