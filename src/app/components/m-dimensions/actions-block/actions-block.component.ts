import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromRoot from '../../../store';
import * as actions from '../../../store/actions/actions';
import { select, Store } from '@ngrx/store';
import { debounceTime, takeUntil } from 'rxjs/internal/operators';
import { number } from '../../../validators';

@Component({
  selector: 'actions-block',
  templateUrl: 'actions-block.component.html',
  styleUrls: ['actions-block.component.css'],
})
export class ActionsBlockComponent implements OnInit, OnDestroy {
  powerForm: FormGroup;
  matrixValid$: Observable<boolean>;
  testVectorAValid$: Observable<boolean>;
  testVectorBValid$: Observable<boolean>;
  testVectorCValid$: Observable<boolean>;
  modValid$: Observable<boolean>;
  coefficientsValid$: Observable<boolean>;
  nValid$: Observable<boolean>;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.powerForm = new FormGroup({
      power: new FormControl('', [Validators.required, Validators.min(1), number]),
    });

    this.store
      .pipe(select(fromRoot.getN), takeUntil(this.ngUnsubscribe))
      .subscribe((n: string) =>
        this.powerForm.get('power').setValue(n, { emitEvent: false }),
      );

    this.powerForm
      .get('power')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
      .subscribe((value: string) =>
        this.store.dispatch(new actions.SetN(value)),
      );

    this.powerForm
      .get('power')
      .statusChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
      .subscribe((val: 'VALID' | 'INVALID') => this.store.dispatch(new actions.SetNValidity(val === 'VALID')));

    this.testVectorAValid$ = this.store.pipe(select(fromRoot.getIsValidTestVectorA));
    this.testVectorBValid$ = this.store.pipe(select(fromRoot.getIsValidTestVectorB));
    this.testVectorCValid$ = this.store.pipe(select(fromRoot.getIsValidTestVectorC));
    this.matrixValid$ = this.store.pipe(select(fromRoot.getIsMatrixValid));
    this.modValid$ = this.store.pipe(select(fromRoot.getModValid));
    this.coefficientsValid$ = this.store.pipe(select(fromRoot.getCoefficientsValid));
    this.nValid$ = this.store.pipe(select(fromRoot.getNValid));
  }

  multiplyAB() {
    this.store.dispatch(new actions.MultiplyAB());
  }

  multiplyBC() {
    this.store.dispatch(new actions.MultiplyBC());
  }

  leftMultiply() {
    this.store.dispatch(new actions.LeftMultiply());
  }

  rightMultiply() {
    this.store.dispatch(new actions.RightMultiply());
  }

  addAB() {
    this.store.dispatch(new actions.AddAB());
  }

  power() {
    this.store.dispatch(new actions.APowerN());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
