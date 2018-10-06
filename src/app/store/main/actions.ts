import { Action } from '@ngrx/store';

export const SET_MATRIX_SIZE = '[Main] Set Matrix Size';

export class SetMatrixSize implements Action {
  readonly type = SET_MATRIX_SIZE;

  constructor(public payload: number) {}
}

export type Actions = SetMatrixSize;
