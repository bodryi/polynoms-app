import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as testVectors from './actions';
import * as fromRoot from '../index';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import { generateRandomPolynom } from '../../utlis/irreducible-polynoms.util';
import { MAX_FACTORIZED_POWER } from '../../constants/app.constants';
import * as resultVectors from '../result-vectors/actions';
import { invertedElement } from '../../utlis/digital-signature.util';

@Injectable()
export class TestVectorsEffects {
  private matrixSize$: Observable<number> = this.store.pipe(
    select(fromRoot.getMatrixSize),
  );

  private testA$: Observable<any> = this.store.pipe(
    select(fromRoot.getTestVectorA),
  );

  private mod$: Observable<any> = this.store.pipe(select(fromRoot.getMod));

  private A$: Observable<any> = this.store.pipe(select(fromRoot.getA));

  private B$: Observable<any> = this.store.pipe(select(fromRoot.getB));

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

  @Effect()
  revertA$: Observable<any> = this.actions$.pipe(
    ofType(testVectors.REVERT_A),
    withLatestFrom(this.testA$, this.mod$, this.A$, this.B$),
    switchMap(
      ([_, testA, mod, A, B]: [any, Array<string>, string, string, string]) => {
        return of(
          new resultVectors.SetResult({
            vector: invertedElement(testA, mod, A, B),
            index: 2,
          }),
        );
      },
    ),
  );
}
