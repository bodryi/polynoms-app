import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../index';
import * as coefficients from './actions';
import { switchMap } from 'rxjs/internal/operators';
import { testPolynom } from '../../utlis/irreducible-polynoms.util';

@Injectable()
export class CoefficientsEffects {
  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {
  }

  @Effect()
  testPolynom$: Observable<any> = this.actions$.pipe(
    ofType(coefficients.TEST_POLYNOM),
    switchMap((action: { payload: string }) => {
      const res = testPolynom(action.payload);
      console.log(res)
      return of(new coefficients.TestPolynomSuccess(res));
    }),
  );
}
