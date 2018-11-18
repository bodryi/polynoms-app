import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as digitalSignatureActions from './actions';
import * as fromRoot from '../index';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import { generateRandomPolynom } from '../../utlis/irreducible-polynoms.util';
import { MAX_FACTORIZED_POWER } from '../../constants/app.constants';
import {
  calculateE,
  calculateL,
  calculateP,
  calculateR,
  calculateS,
  calculateT,
  calculateU,
  calculateY,
  localRightSideUnit,
} from '../../utlis/digital-signature.util';

@Injectable()
export class DigitalSignatureEffects {
  private NDS$ = this.store.pipe(select(fromRoot.getNDS));
  private Q$ = this.store.pipe(select(fromRoot.getQ));
  private T$ = this.store.pipe(select(fromRoot.getT));
  private P$ = this.store.pipe(select(fromRoot.getP));
  private L$ = this.store.pipe(select(fromRoot.getL));
  private R$ = this.store.pipe(select(fromRoot.getR));
  private Er1$ = this.store.pipe(select(fromRoot.getEr1));
  private Er2$ = this.store.pipe(select(fromRoot.getEr2));
  private Er3$ = this.store.pipe(select(fromRoot.getEr3));
  private h1$ = this.store.pipe(select(fromRoot.getH1));
  private h2$ = this.store.pipe(select(fromRoot.getH2));
  private h3$ = this.store.pipe(select(fromRoot.getH3));
  private n1$ = this.store.pipe(select(fromRoot.getN1));
  private n2$ = this.store.pipe(select(fromRoot.getN2));
  private n3$ = this.store.pipe(select(fromRoot.getN3));
  private e$ = this.store.pipe(select(fromRoot.getE));
  private message$ = this.store.pipe(select(fromRoot.getMessage));
  private randomX$ = this.store.pipe(select(fromRoot.getRandomX));
  private randomK$ = this.store.pipe(select(fromRoot.getRandomK));
  private mod$ = this.store.pipe(select(fromRoot.getMod));
  private coefficientA$ = this.store.pipe(select(fromRoot.getA));
  private coefficientB$ = this.store.pipe(select(fromRoot.getB));
  // private coefficientC$ = this.store.pipe(select(fromRoot.getC));

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {}

  @Effect()
  generateRandomVector$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.GENERATE_RANDOM_VECTOR),
    switchMap((action: { payload: string }) => {
      const randomVector = [];
      for (let i = 0; i < 4; i++) {
        randomVector.push(generateRandomPolynom(MAX_FACTORIZED_POWER).join(''));
      }
      return of(
        new digitalSignatureActions.ArrayValueChange({
          key: action.payload,
          value: randomVector,
        }),
      );
    }),
  );

  @Effect()
  calculateEr1$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_ER1),
    withLatestFrom(
      this.NDS$,
      this.h1$,
      this.n1$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, NDS, h, n, mod, A, B]: [
        any,
        Array<string>,
        string,
        string,
        string,
        string,
        string
      ]) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'Er1',
            value: localRightSideUnit(NDS, h, n, mod, A, B),
          }),
        ),
    ),
  );

  @Effect()
  calculateEr2$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_ER2),
    withLatestFrom(
      this.NDS$,
      this.h2$,
      this.n2$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, NDS, h, n, mod, A, B]: [
        any,
        Array<string>,
        string,
        string,
        string,
        string,
        string
      ]) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'Er2',
            value: localRightSideUnit(NDS, h, n, mod, A, B),
          }),
        ),
    ),
  );

  @Effect()
  calculateEr3$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_ER3),
    withLatestFrom(
      this.NDS$,
      this.h3$,
      this.n3$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, NDS, h, n, mod, A, B]: [
        any,
        Array<string>,
        string,
        string,
        string,
        string,
        string
      ]) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'Er3',
            value: localRightSideUnit(NDS, h, n, mod, A, B),
          }),
        ),
    ),
  );

  @Effect()
  calculateT$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_T),
    withLatestFrom(
      this.Q$,
      this.Er1$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, Q, Er1, mod, A, B]: [
        any,
        Array<string>,
        Array<string>,
        string,
        string,
        string
      ]) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'T',
            value: calculateT(Q, Er1, mod, A, B),
          }),
        ),
    ),
  );

  @Effect()
  calculateP$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_P),
    withLatestFrom(
      this.T$,
      this.Er2$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, T, Er2, mod, A, B]: [
        any,
        Array<string>,
        Array<string>,
        string,
        string,
        string
      ]) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'P',
            value: calculateP(T, Er2, mod, A, B),
          }),
        ),
    ),
  );

  @Effect()
  calculateL$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_L),
    withLatestFrom(
      this.P$,
      this.Er3$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, P, Er3, mod, A, B]: [
        any,
        Array<string>,
        Array<string>,
        string,
        string,
        string
      ]) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'L',
            value: calculateL(P, Er3, mod, A, B),
          }),
        ),
    ),
  );

  @Effect()
  calculateY$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_Y),
    withLatestFrom(
      this.Q$,
      this.NDS$,
      this.T$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, Q, N, T, mod, A, B]: [
        any,
        Array<string>,
        Array<string>,
        Array<string>,
        string,
        string,
        string
      ]) => {
        const modPower = mod.length - 1;
        const power =
          modPower > 0
            ? (Math.floor(Math.random() * 65535) % modPower) + 1
            : null;
        if (!power) {
          throw new Error('Calculate Y Effect: mod must have power > 0');
        } else {
          this.store.dispatch(
            new digitalSignatureActions.StringValueChange({
              key: 'randomX',
              value: power.toString(),
            }),
          );
        }
        return of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'Y',
            value: calculateY(Q, N, T, power.toString(), mod, A, B),
          }),
        );
      },
    ),
  );

  @Effect()
  calculateU$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_U),
    withLatestFrom(
      this.P$,
      this.NDS$,
      this.L$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, P, N, L, mod, A, B]: [
        any,
        Array<string>,
        Array<string>,
        Array<string>,
        string,
        string,
        string
      ]) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'U',
            value: calculateU(P, N, L, mod, A, B),
          }),
        ),
    ),
  );

  @Effect()
  calculateR$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_R),
    withLatestFrom(
      this.Q$,
      this.NDS$,
      this.L$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      ([_, Q, N, L, mod, A, B]: [
        any,
        Array<string>,
        Array<string>,
        Array<string>,
        string,
        string,
        string
      ]) => {
        const modPower = mod.length - 1;
        const power =
          modPower > 0
            ? (Math.floor(Math.random() * 65535) % modPower) + 1
            : null;
        if (!power) {
          throw new Error('Calculate R Effect: mod must have power > 0');
        } else {
          this.store.dispatch(
            new digitalSignatureActions.StringValueChange({
              key: 'randomK',
              value: power.toString(),
            }),
          );
        }
        return of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'R',
            value: calculateR(Q, N, L, power.toString(), mod, A, B),
          }),
        );
      },
    ),
  );

  @Effect()
  calculateE$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_E),
    withLatestFrom(this.message$, this.R$, this.mod$),
    switchMap(([_, message, R, mod]: [any, string, Array<string>, string]) =>
      of(
        new digitalSignatureActions.StringValueChange({
          key: 'e',
          value: calculateE(message, R, mod),
        }),
      ),
    ),
  );

  @Effect()
  calculateS$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_S),
    withLatestFrom(this.randomK$, this.e$, this.randomX$, this.mod$),
    switchMap(([_, k, e, x, mod]: [any, string, string, string, string]) =>
      of(
        new digitalSignatureActions.StringValueChange({
          key: 's',
          value: calculateS(k, e, x, mod),
        }),
      ),
    ),
  );
}
