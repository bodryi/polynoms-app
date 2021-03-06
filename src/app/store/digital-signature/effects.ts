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
  calculateRWave,
  localRightSideUnit,
} from '../../utlis/digital-signature.util';
import {
  multiplyMod,
  shiftNulls,
  toBits,
  xgcd,
} from '../../utlis/polynoms-operations.util';
import * as testVectorsActions from '../test-vectors/actions';
import { BigNumber } from 'bignumber.js';

@Injectable()
export class DigitalSignatureEffects {
  private NDS$ = this.store.pipe(select(fromRoot.getNDS));
  private Q$ = this.store.pipe(select(fromRoot.getQ));
  private qMod$ = this.store.pipe(select(fromRoot.getQMod));
  private T$ = this.store.pipe(select(fromRoot.getT));
  private P$ = this.store.pipe(select(fromRoot.getP));
  private L$ = this.store.pipe(select(fromRoot.getL));
  private R$ = this.store.pipe(select(fromRoot.getR));
  private RWave$ = this.store.pipe(select(fromRoot.getRWave));
  private Y$ = this.store.pipe(select(fromRoot.getY));
  private U$ = this.store.pipe(select(fromRoot.getU));
  private YTest$ = this.store.pipe(select(fromRoot.getYTest));
  private UTest$ = this.store.pipe(select(fromRoot.getUTest));
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
  private eTest$ = this.store.pipe(select(fromRoot.getETest));
  private sTest$ = this.store.pipe(select(fromRoot.getSTest));
  private message$ = this.store.pipe(select(fromRoot.getMessage));
  private randomX$ = this.store.pipe(select(fromRoot.getRandomX));
  private randomK$ = this.store.pipe(select(fromRoot.getRandomK));
  private mod$ = this.store.pipe(select(fromRoot.getMod));
  private coefficientA$ = this.store.pipe(select(fromRoot.getA));
  private coefficientB$ = this.store.pipe(select(fromRoot.getB));
  private digitalSignatureBuffer$ = this.store.pipe(
    select(fromRoot.getDigitalSignatureBuffer),
  );
  private buffer$ = this.store.pipe(select(fromRoot.getVectorBuffer));
  // private coefficientC$ = this.store.pipe(select(fromRoot.getC));

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) {}

  @Effect()
  copyVector$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.COPY_VECTOR),
    switchMap(() => of(new digitalSignatureActions.CopyVectorToMainBuffer())),
  );

  @Effect()
  copyVectorToMainBuffer$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.COPY_VECTOR_TO_MAIN_BUFFER),
    withLatestFrom(this.digitalSignatureBuffer$),
    switchMap(([_, buffer]: [any, Array<string>]) =>
      of(new testVectorsActions.CopyVector(buffer)),
    ),
  );

  @Effect()
  pasteVector$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.PASTE_VECTOR),
    withLatestFrom(this.buffer$),
    switchMap(([action, buffer]: [{ payload: string }, Array<string>]) =>
      of(
        new digitalSignatureActions.PasteVectorFromMainBuffer({
          key: action.payload,
          value: buffer,
        }),
      ),
    ),
  );

  @Effect()
  calculateQMod$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_Q_MOD),
    withLatestFrom(this.mod$),
    switchMap(([_, mod]: [any, string]) => {
      const modPower = shiftNulls(toBits(mod)).length - 1;
      return of(
        new digitalSignatureActions.StringValueChange({
          key: 'qMod',
          value: new BigNumber('2')
            .pow(modPower)
            .minus(1)
            .toString(10),
        }),
      );
    }),
  );

  @Effect()
  generateRandomVectorN$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.GENERATE_RANDOM_VECTOR_N),
    withLatestFrom(this.mod$),
    switchMap(([action, mod]: [{ payload: string }, string]) => {
      const randX1 = generateRandomPolynom(MAX_FACTORIZED_POWER);
      const randX2 = generateRandomPolynom(MAX_FACTORIZED_POWER);
      const randX3 = generateRandomPolynom(MAX_FACTORIZED_POWER);
      const parsedMod = toBits(mod);
      const multiplication = multiplyMod(randX1, randX2, parsedMod);
      const invertedX3 = xgcd(randX3, parsedMod).x;
      const x4 = multiplyMod(multiplication, invertedX3, parsedMod);

      return of(
        new digitalSignatureActions.ArrayValueChange({
          key: action.payload,
          value: [
            randX1.join(''),
            randX2.join(''),
            randX3.join(''),
            x4.join(''),
          ],
        }),
      );
    }),
  );

  @Effect()
  generateRandomVectorQ$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.GENERATE_RANDOM_VECTOR_Q),
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
      (
        [_, NDS, h, n, mod, A, B]: [
          any,
          Array<string>,
          string,
          string,
          string,
          string,
          string
        ],
      ) =>
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
      (
        [_, NDS, h, n, mod, A, B]: [
          any,
          Array<string>,
          string,
          string,
          string,
          string,
          string
        ],
      ) =>
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
      (
        [_, NDS, h, n, mod, A, B]: [
          any,
          Array<string>,
          string,
          string,
          string,
          string,
          string
        ],
      ) =>
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
      (
        [_, Q, Er1, mod, A, B]: [
          any,
          Array<string>,
          Array<string>,
          string,
          string,
          string
        ],
      ) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'T',
            value: calculateT(Er1, Q, mod, A, B),
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
      (
        [_, T, Er2, mod, A, B]: [
          any,
          Array<string>,
          Array<string>,
          string,
          string,
          string
        ],
      ) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'P',
            value: calculateP(Er2, T, mod, A, B),
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
      (
        [_, P, Er3, mod, A, B]: [
          any,
          Array<string>,
          Array<string>,
          string,
          string,
          string
        ],
      ) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'L',
            value: calculateL(Er3, P, mod, A, B),
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
      this.randomX$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      (
        [_, Q, N, T, x, mod, A, B]: [
          any,
          Array<string>,
          Array<string>,
          Array<string>,
          string,
          string,
          string,
          string
        ],
      ) => {
        return of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'Y',
            value: calculateY(Q, N, T, x, mod, A, B),
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
      (
        [_, P, N, L, mod, A, B]: [
          any,
          Array<string>,
          Array<string>,
          Array<string>,
          string,
          string,
          string
        ],
      ) =>
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
      this.randomK$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      (
        [_, Q, N, L, k, mod, A, B]: [
          any,
          Array<string>,
          Array<string>,
          Array<string>,
          string,
          string,
          string,
          string
        ],
      ) => {
        return of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'R',
            value: calculateR(Q, N, L, k, mod, A, B),
          }),
        );
      },
    ),
  );

  @Effect()
  calculateE$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_E),
    withLatestFrom(this.message$, this.R$, this.mod$, this.qMod$),
    switchMap(
      (
        [_, message, R, mod, qMod]: [
          any,
          string,
          Array<string>,
          string,
          string
        ],
      ) =>
        of(
          new digitalSignatureActions.StringValueChange({
            key: 'e',
            value: calculateE(message, R, mod, qMod),
          }),
        ),
    ),
  );

  @Effect()
  calculateS$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_S),
    withLatestFrom(
      this.randomK$,
      this.e$,
      this.randomX$,
      this.mod$,
      this.qMod$,
    ),
    switchMap(
      (
        [_, k, e, x, mod, qMod]: [any, string, string, string, string, string],
      ) =>
        of(
          new digitalSignatureActions.StringValueChange({
            key: 's',
            value: calculateS(k, e, x, mod, qMod),
          }),
        ),
    ),
  );

  @Effect()
  calculateRWave$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_R_WAVE),
    withLatestFrom(
      this.YTest$,
      this.UTest$,
      this.eTest$,
      this.sTest$,
      this.mod$,
      this.coefficientA$,
      this.coefficientB$,
    ),
    switchMap(
      (
        [_, Y, U, e, s, mod, A, B]: [
          any,
          Array<string>,
          Array<string>,
          string,
          string,
          string,
          string,
          string
        ],
      ) =>
        of(
          new digitalSignatureActions.ArrayValueChange({
            key: 'RWave',
            value: calculateRWave(Y, U, e, s, mod, A, B),
          }),
        ),
    ),
  );

  @Effect()
  calculateEWave$: Observable<any> = this.actions$.pipe(
    ofType(digitalSignatureActions.CALCULATE_E_WAVE),
    withLatestFrom(this.message$, this.RWave$, this.mod$, this.qMod$),
    switchMap(
      (
        [_, message, R, mod, qMod]: [
          any,
          string,
          Array<string>,
          string,
          string
        ],
      ) =>
        of(
          new digitalSignatureActions.StringValueChange({
            key: 'eWave',
            value: calculateE(message, R, mod, qMod),
          }),
        ),
    ),
  );
}
