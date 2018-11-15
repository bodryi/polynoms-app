import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as digitalSignatureActions from './actions';
import * as fromRoot from '../index';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import { generateRandomPolynom } from '../../utlis/irreducible-polynoms.util';
import { MAX_FACTORIZED_POWER } from '../../constants/app.constants';
import { localRightSideUnit } from '../../utlis/digital-signature.util';

@Injectable()
export class DigitalSignatureEffects {
  private NDS$ = this.store.pipe(select(fromRoot.getNDS));
  private h1$ = this.store.pipe(select(fromRoot.getH1));
  private h2$ = this.store.pipe(select(fromRoot.getH2));
  private h3$ = this.store.pipe(select(fromRoot.getH3));
  private n1$ = this.store.pipe(select(fromRoot.getN1));
  private n2$ = this.store.pipe(select(fromRoot.getN2));
  private n3$ = this.store.pipe(select(fromRoot.getN3));
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
}
