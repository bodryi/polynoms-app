import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../index';
import * as coefficients from './actions';
import { debounceTime, switchMap, withLatestFrom } from 'rxjs/internal/operators';
import {
  generateIrreduciblePolynom,
  testPolynom,
} from '../../utlis/irreducible-polynoms.util';

@Injectable()
export class CoefficientsEffects {
  private mod$ = this.store.pipe(select(fromRoot.getMod));

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {}

  @Effect()
  testPolynom$: Observable<any> = this.actions$.pipe(
    ofType(coefficients.TEST_POLYNOM),
    withLatestFrom(this.mod$),
    switchMap(([action, mod]: [{ payload: string }, string]) => {
      const res = testPolynom(action.payload || mod);
      return of(new coefficients.TestPolynomSuccess(res));
    }),
  );

  @Effect()
  generatePolynom$: Observable<any> = this.actions$.pipe(
    ofType(coefficients.GENERATE_IRREDUCIBLE_POLYNOM),
    debounceTime(100), // for interface disabling
    switchMap(() =>
      generateIrreduciblePolynom().then(
        res =>
          res
            ? new coefficients.GenerateIrreduciblePolynomSuccess(res.join(''))
            : new coefficients.GenerateIrreduciblePolynomFailure(),
      ),
    ),
  );
}
