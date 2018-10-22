import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as polynoms from './actions';
import * as fromRoot from '../index';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import { multiplyMod, plusMod, powMod, toBits } from '../../utlis/polynoms-operations.util';
import BigNumber from 'bignumber.js';

@Injectable()
export class MatrixEffects {
  private polynomA$ = this.store.pipe(select(fromRoot.getPolynomA));
  private polynomB$ = this.store.pipe(select(fromRoot.getPolynomB));
  private polynomC$ = this.store.pipe(select(fromRoot.getPolynomC));
  private power$ = this.store.pipe(select(fromRoot.getPolynomPower));

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {
  }

  @Effect()
  aPlusBModC$: Observable<any> = this.actions$.pipe(
    ofType(polynoms.A_PLUS_B_MOD_C),
    withLatestFrom(this.polynomA$, this.polynomB$, this.polynomC$),
    switchMap(([action, A, B, C]: [any, string, string, string]) => {
      const result = plusMod(toBits(A), toBits(B), toBits(C));
      return of(new polynoms.PolynomResultChange(result.join('')));
    }),
  );

  @Effect()
  aMultiplyBModC$: Observable<any> = this.actions$.pipe(
    ofType(polynoms.A_MULTIPLY_B_MOD_C),
    withLatestFrom(this.polynomA$, this.polynomB$, this.polynomC$),
    switchMap(([action, A, B, C]: [any, string, string, string]) => {
      const result = multiplyMod(toBits(A), toBits(B), toBits(C));
      return of(new polynoms.PolynomResultChange(result.join('')));
    }),
  );

  @Effect()
  aPowerNModC$: Observable<any> = this.actions$.pipe(
    ofType(polynoms.A_POWER_N_MOD_C),
    withLatestFrom(this.polynomA$, this.power$, this.polynomC$),
    switchMap(([action, A, power, C]: [any, string, string, string]) => {
      const result = powMod(toBits(A), new BigNumber(power), toBits(C));
      return of(new polynoms.PolynomResultChange(result.join('')));
    }),
  );
}
