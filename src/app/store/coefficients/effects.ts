import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../index';
import * as coefficients from './actions';
import { debounceTime, switchMap, withLatestFrom } from 'rxjs/internal/operators';
import {
  generateIrreduciblePolynom, MAX_FACTORIZED_POWER,
  testPolynom,
} from '../../utlis/irreducible-polynoms.util';
import { BigNumber } from 'bignumber.js';

@Injectable()
export class CoefficientsEffects {
  private mod$ = this.store.pipe(select(fromRoot.getMod));
  private modPower$ = this.store.pipe(select(fromRoot.getModPower));
  private multipliers$ = this.store.pipe(select(fromRoot.getMultipliers));

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {
  }

  @Effect()
  testPolynom$: Observable<any> = this.actions$.pipe(
    ofType(coefficients.TEST_POLYNOM),
    withLatestFrom(this.mod$, this.multipliers$),
    switchMap(([action, mod, multipliers]: [{ payload: string }, string, string]) => {
      // TODO: multipliers ,,,, and power > 62 => ERROR

      // TODO: disable "test" button if REAL power of mod > 62 and multipliers ,,,,
      const parsedMultipliers = multipliers.split(',')
        .map((s: string) => s.trim())
        .filter(s => !!s)
        .map(num => new BigNumber(num));
      const res = testPolynom(
        action.payload || mod,
        parsedMultipliers.length ? parsedMultipliers : undefined,
      );
      return of(new coefficients.TestPolynomSuccess(res));
    }),
  );

  @Effect()
  generatePolynom$: Observable<any> = this.actions$.pipe(
    ofType(coefficients.GENERATE_IRREDUCIBLE_POLYNOM),
    debounceTime(100), // for interface disabling
    withLatestFrom(this.modPower$, this.multipliers$),
    switchMap(([_, modPower, multipliers]: [any, string, string]) => {
        const parsedPower = parseInt(modPower, 10);
        let parsedMultipliers;
        if (modPower) {
          parsedMultipliers = multipliers.split(',')
            .map((s: string) => s.trim())
            .filter(s => !!s)
            .map(num => new BigNumber(num));
        }
        const multipliersValid = parsedMultipliers && parsedMultipliers.length;
        return (parsedPower > MAX_FACTORIZED_POWER && multipliersValid) || parsedPower <= MAX_FACTORIZED_POWER ?
          generateIrreduciblePolynom(
            parsedPower,
            multipliersValid ? parsedMultipliers : undefined,
          )
            .then(
              res =>
                res
                  ? new coefficients.GenerateIrreduciblePolynomSuccess(res.join(''))
                  : new coefficients.GenerateIrreduciblePolynomFailure(),
            ) : of(new coefficients.GenerateIrreduciblePolynomFailure());
      },
    ),
  );
}
