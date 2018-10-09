import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as matrixActions from './actions';
import * as fromRoot from '../index';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import { saveToFile } from '../../utlis/work-with-files.util';

@Injectable()
export class MatrixEffects {
  private matrix$ = this.store.pipe(select(fromRoot.getMatrix));

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {
  }

  @Effect()
  saveFile$: Observable<any> = this.actions$.pipe(
    ofType(matrixActions.SAVE_FILE),
    withLatestFrom(this.matrix$),
    switchMap(([action, matrix]: [any, Array<Array<string>>]) =>
      saveToFile(matrix)
        .then(() => new matrixActions.SaveFileSuccess())
        .catch(() => new matrixActions.SaveFileFailure()),
    ),
  );

  @Effect()
  openFile$: Observable<any> = this.actions$.pipe(
    ofType(matrixActions.OPEN_FILE_SUCCESS),
    switchMap((action: { payload: string }) => {
      const rows: Array<string> = action.payload.split('\n');
      const matrix: Array<Array<string>> = rows.map(
        (row: string) => row.split(/\s+/).map(
          (cell: string) => cell === '_' ? '' : cell,
        ),
      );
      console.log(matrix);
      return of(new matrixActions.MatrixChange(matrix));
    }),
  );
}
