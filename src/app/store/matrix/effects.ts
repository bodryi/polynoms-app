import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as matrix from './actions';
import * as fromRoot from '../index';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators';

@Injectable()
export class MatrixEffects {
  constructor(private store: Store<fromRoot.State>, private actions$: Actions) {
  }

  @Effect() saveFile$: Observable<any> = this.actions$.pipe(
    ofType(matrix.SAVE_FILE),
    switchMap(() => {
      // FileSaver will return promise from util
      return of(new matrix.SaveFileSuccess());
    }),
  );

  @Effect() openFile$: Observable<any> = this.actions$.pipe(
    ofType(matrix.OPEN_FILE),
    switchMap(() => {
      // open file with promise
      const result: Array<Array<string>> = null;
      return of(new matrix.MatrixChange(result));
    }),
  );
}
