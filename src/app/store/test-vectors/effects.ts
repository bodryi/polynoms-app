import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as testVectors from './actions';
import * as fromRoot from '../index';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import {
  generateRandomPolynom,
} from '../../utlis/irreducible-polynoms.util';
import { MAX_FACTORIZED_POWER } from '../../constants/app.constants';

@Injectable()
export class TestVectorsEffects {
  private matrixSize$: Observable<number> = this.store.pipe(
    select(fromRoot.getMatrixSize),
  );

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {}

  @Effect()
  generateRandomTestVector$: Observable<any> = this.actions$.pipe(
    ofType(testVectors.GENERATE_RANDOM_TEST_VECTOR),
    withLatestFrom(this.matrixSize$),
    switchMap(([action, matrixSize]: [{ payload: string }, number]) => {
      const randomVector = [];
      for (let i = 0; i < matrixSize; i++) {
        randomVector.push(generateRandomPolynom(MAX_FACTORIZED_POWER).join(''));
      }
      switch (action.payload) {
        case 'A':
          return of(new testVectors.TestVectorAChange(randomVector));

        case 'B':
          return of(new testVectors.TestVectorBChange(randomVector));

        case 'C':
          return of(new testVectors.TestVectorCChange(randomVector));

        default:
          throw new Error(
            'generateRandomTestVector$ Effect: Unknown Vector Name',
          );
      }
    }),
  );
}
