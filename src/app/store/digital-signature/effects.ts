import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as digitalSignatureActions from './actions';
import * as fromRoot from '../index';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import { generateRandomPolynom } from '../../utlis/irreducible-polynoms.util';
import { MAX_FACTORIZED_POWER } from '../../constants/app.constants';

@Injectable()
export class DigitalSignatureEffects {
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
}
