import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../index';
import * as actions from './actions';
import * as resultVectors from '../result-vectors/actions';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import { toBits, plus } from '../../utlis/polynoms-operations.util';

@Injectable()
export class ActionsEffects {
  constructor(private store: Store<fromRoot.State>, private actions$: Actions) {
  }

  private testVectorA$ = this.store.pipe(
    select(fromRoot.getTestVectorA),
  );

  private testVectorB$ = this.store.pipe(
    select(fromRoot.getTestVectorB),
  );

  private testVectorC$ = this.store.pipe(
    select(fromRoot.getTestVectorC),
  );

  private n$ = this.store.pipe(
    select(fromRoot.getN),
  );

  @Effect() addAB$: Observable<any> = this.actions$.pipe(
    ofType(actions.ADD_A_B),
    withLatestFrom(this.testVectorA$, this.testVectorB$),
    switchMap(([action, testVectorA, testVectorB]: [any, Array<string>, Array<string>]) => {
      const testVectorABitwised: Array<Array<number>> = testVectorA.map((c: string) => toBits(c));
      const testVectorBBitwised: Array<Array<number>> = testVectorB.map((c: string) => toBits(c));
      const resultVector: Array<string> = testVectorABitwised.map(
        (c: Array<number>, index: number) => plus(c, testVectorBBitwised[index]).join(''),
      );
      return of(new resultVectors.SetResult(resultVector));
    }),
  );

  @Effect() multiplyAB$: Observable<any> = this.actions$.pipe(
    ofType(actions.MULTIPLY_A_B),
    withLatestFrom(this.testVectorA$, this.testVectorB$),
    switchMap(([action, testVectorA, testVectorB]: [any, Array<string>, Array<string>]) => {
      // const testVectorABitwised: Array<Array<number>> = testVectorA.map((c: string) => toBits(c));
      // const testVectorBBitwised: Array<Array<number>> = testVectorB.map((c: string) => toBits(c));
      // operations

      const resultVector: Array<string> = [];
      return of(new resultVectors.SetResult(resultVector));
    }),
  );

  @Effect() multiplyBC$: Observable<any> = this.actions$.pipe(
    ofType(actions.MULTIPLY_B_C),
    withLatestFrom(this.testVectorB$, this.testVectorC$),
    switchMap(([action, testVectorB, testVectorC]: [any, Array<string>, Array<string>]) => {
      // const testVectorBBitwised: Array<Array<number>> = testVectorB.map((c: string) => toBits(c));
      // const testVectorCBitwised: Array<Array<number>> = testVectorC.map((c: string) => toBits(c));
      // operations

      const resultVector: Array<string> = [];
      return of(new resultVectors.SetResult(resultVector));
    }),
  );

  @Effect() leftMultiply$: Observable<any> = this.actions$.pipe(
    ofType(actions.LEFT_MULTIPLY),
    withLatestFrom(this.testVectorA$, this.testVectorB$, this.testVectorC$),
    switchMap(([action, testVectorA, testVectorB, testVectorC]: [any, Array<string>, Array<string>, Array<string>]) => {
      // const testVectorABitwised: Array<Array<number>> = testVectorA.map((c: string) => toBits(c));
      // const testVectorBBitwised: Array<Array<number>> = testVectorB.map((c: string) => toBits(c));
      // const testVectorCBitwised: Array<Array<number>> = testVectorC.map((c: string) => toBits(c));
      // operations

      const resultVector: Array<string> = [];
      return of(new resultVectors.SetResult(resultVector));
    }),
  );

  @Effect() rightMultiply$: Observable<any> = this.actions$.pipe(
    ofType(actions.RIGHT_MULTIPLY),
    withLatestFrom(this.testVectorA$, this.testVectorB$, this.testVectorC$),
    switchMap(([action, testVectorA, testVectorB, testVectorC]: [any, Array<string>, Array<string>, Array<string>]) => {
      // const testVectorABitwised: Array<Array<number>> = testVectorA.map((c: string) => toBits(c));
      // const testVectorBBitwised: Array<Array<number>> = testVectorB.map((c: string) => toBits(c));
      // const testVectorCBitwised: Array<Array<number>> = testVectorC.map((c: string) => toBits(c));
      // operations

      const resultVector: Array<string> = [];
      return of(new resultVectors.SetResult(resultVector));
    }),
  );

  @Effect() aPowerN$: Observable<any> = this.actions$.pipe(
    ofType(actions.A_POWER_N),
    withLatestFrom(this.testVectorA$, this.n$),
    switchMap(([action, testVectorA, n]: [any, Array<string>, number]) => {
      // const testVectorABitwised: Array<Array<number>> = testVectorA.map((c: string) => toBits(c));
      // operations

      const resultVector: Array<string> = [];
      return of(new resultVectors.SetResult(resultVector));
    }),
  );
}
