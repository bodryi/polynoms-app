import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as fromRoot from '../../store';
import { UpperCasePipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxPolynomPower, number } from '../../validators';
import { binToHex, hexToBin } from '../../utlis/convert-numbers.util';
import { debounceTime, map, takeUntil } from 'rxjs/internal/operators';
import * as polynoms from '../../store/polynoms/actions';

@Component({
  selector: 'polynoms',
  templateUrl: 'polynoms.component.html',
  styleUrls: ['polynoms.component.css'],
})
export class PolynomsComponent implements OnInit, OnDestroy {
  polynomsForm: FormGroup;
  polynomAValid$: Observable<boolean>;
  polynomBValid$: Observable<boolean>;
  polynomCValid$: Observable<boolean>;
  powerValid$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    private upperCasePipe: UpperCasePipe,
  ) {
  }

  ngOnInit() {
    this.polynomsForm = new FormGroup({
      A: new FormControl('', Validators.required),
      B: new FormControl('', Validators.required),
      C: new FormControl('', Validators.required),
      power: new FormControl('', [
        Validators.required,
        Validators.min(1),
        number,
      ]),
      result: new FormControl(''),
    });

    this.store
      .pipe(select(fromRoot.getPolynomA), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.polynomsForm
          .get('A')
          .setValue(this.upperCasePipe.transform(binToHex(s)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(select(fromRoot.getPolynomB), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.polynomsForm
          .get('B')
          .setValue(this.upperCasePipe.transform(binToHex(s)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(select(fromRoot.getPolynomC), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.polynomsForm
          .get('C')
          .setValue(this.upperCasePipe.transform(binToHex(s)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(select(fromRoot.getPolynomResult), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.polynomsForm
          .get('result')
          .setValue(this.upperCasePipe.transform(binToHex(s)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(select(fromRoot.getPolynomPower), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.polynomsForm.get('power').setValue(s, {
          emitEvent: false,
        }),
      );

    this.polynomsForm
      .get('A')
      .valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(100),
      map((value: string) => hexToBin(value)),
    )
      .subscribe((value: string) =>
        this.store.dispatch(new polynoms.PolynomAChange(value)),
      );

    this.polynomsForm
      .get('B')
      .valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(100),
      map((value: string) => hexToBin(value)),
    )
      .subscribe((value: string) =>
        this.store.dispatch(new polynoms.PolynomBChange(value)),
      );

    this.polynomsForm
      .get('C')
      .valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(100),
      map((value: string) => hexToBin(value)),
    )
      .subscribe((value: string) =>
        this.store.dispatch(new polynoms.PolynomCChange(value)),
      );

    this.polynomsForm
      .get('result')
      .valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(100),
      map((value: string) => hexToBin(value)),
    )
      .subscribe((value: string) =>
        this.store.dispatch(new polynoms.PolynomResultChange(value)),
      );

    this.polynomsForm
      .get('power')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
      .subscribe((value: string) =>
        this.store.dispatch(new polynoms.PolynomPowerChange(value)),
      );

    this.polynomAValid$ = this.store.pipe(select(fromRoot.getPolynomAValid));
    this.polynomBValid$ = this.store.pipe(select(fromRoot.getPolynomBValid));
    this.polynomCValid$ = this.store.pipe(select(fromRoot.getPolynomCValid));
    this.powerValid$ = this.store.pipe(select(fromRoot.getPowerValid));

    this.polynomsForm.get('A').statusChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
      )
      .subscribe((val: 'VALID' | 'INVALID') => this.store.dispatch(new polynoms.PolynomAValidityChange(val === 'VALID')));

    this.polynomsForm.get('B').statusChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
      )
      .subscribe((val: 'VALID' | 'INVALID') => this.store.dispatch(new polynoms.PolynomBValidityChange(val === 'VALID')));

    this.polynomsForm.get('C').statusChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
      )
      .subscribe((val: 'VALID' | 'INVALID') => this.store.dispatch(new polynoms.PolynomCValidityChange(val === 'VALID')));

    this.polynomsForm.get('power').statusChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
      )
      .subscribe((val: 'VALID' | 'INVALID') => this.store.dispatch(new polynoms.PolynomPowerValidityChange(val === 'VALID')));
  }

  aPlusB() {
    this.store.dispatch(new polynoms.APlusBModC());
  }

  aMultiplyB() {
    this.store.dispatch(new polynoms.AMultiplyBModC());
  }

  aPowMinusOne() {
    this.store.dispatch(new polynoms.AInverseModC());
  }

  aPowN() {
    this.store.dispatch(new polynoms.APowerNModC());
  }

  gcdAB() {
    this.store.dispatch(new polynoms.GCDAB());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
