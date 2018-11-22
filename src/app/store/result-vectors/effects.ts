import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as resultVectorsActions from './actions';
import * as fromRoot from '../index';
import * as testVectorsActions from '../test-vectors/actions';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';

@Injectable()
export class ResultVectorEffects {
  private result$ = this.store.pipe(select(fromRoot.getResult));
  private buffer$ = this.store.pipe(select(fromRoot.getVectorBuffer));

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {}

  @Effect()
  copyVector$: Observable<any> = this.actions$.pipe(
    ofType(resultVectorsActions.COPY),
    withLatestFrom(this.result$),
    switchMap(([action, result]: [{ payload: number }, Array<Array<string>>]) =>
      of(new testVectorsActions.CopyVector(result[action.payload])),
    ),
  );

  @Effect()
  pasteVector$: Observable<any> = this.actions$.pipe(
    ofType(resultVectorsActions.PASTE),
    withLatestFrom(this.buffer$),
    switchMap(([action, buffer]: [{ payload: number }, Array<string>]) =>
      of(
        new resultVectorsActions.SetResult({
          vector: buffer,
          index: action.payload,
        }),
      ),
    ),
  );
}
