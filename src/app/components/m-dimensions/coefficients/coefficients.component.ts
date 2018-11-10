import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as coefficients from '../../../store/coefficients/actions';
import { select, Store } from '@ngrx/store';
import { debounceTime, map, takeUntil } from 'rxjs/internal/operators';
import * as fromRoot from '../../../store';
import { binToHex, hexToBin } from '../../../utlis/convert-numbers.util';
import { number } from '../../../validators';
import { UpperCasePipe } from '@angular/common';
import {
  MAX_FACTORIZED_POWER,
  trimPolynomLastZeros,
} from '../../../utlis/irreducible-polynoms.util';

@Component({
  selector: 'coefficients',
  templateUrl: 'coefficients.component.html',
  styleUrls: ['coefficients.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoefficientsComponent implements OnInit, OnDestroy {
  coefficientsForm: FormGroup;
  polynomTestResult$: Observable<boolean>;
  testLoading$: Observable<boolean>;
  MAX_FACTORIZED_POWER = MAX_FACTORIZED_POWER;
  private timeoutToClearTestResult: any;
  private ngUnsubscribe: Subject<void> = new Subject();
  private MULTIPLIERS_REGEXP = /^[0-9,\s]+$/;

  constructor(
    private store: Store<fromRoot.State>,
    private upperCasePipe: UpperCasePipe,
  ) {}

  ngOnInit() {
    this.coefficientsForm = new FormGroup({
      mod: new FormControl('', Validators.required), //, maxPolynomPower(62)
      A: new FormControl('', Validators.required),
      B: new FormControl('', Validators.required),
      C: new FormControl('', Validators.required),
      power: new FormControl('', number),
      multipliers: new FormControl(
        '',
        Validators.pattern(this.MULTIPLIERS_REGEXP),
      ),
    });

    this.store
      .pipe(select(fromRoot.getMod), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm
          .get('mod')
          .setValue(this.upperCasePipe.transform(binToHex(s)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(select(fromRoot.getModPower), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm.get('power').setValue(s, { emitEvent: false }),
      );

    this.store
      .pipe(select(fromRoot.getMultipliers), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm
          .get('multipliers')
          .setValue(s, { emitEvent: false }),
      );

    this.store
      .pipe(select(fromRoot.getA), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm
          .get('A')
          .setValue(this.upperCasePipe.transform(binToHex(s)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(select(fromRoot.getB), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm
          .get('B')
          .setValue(this.upperCasePipe.transform(binToHex(s)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(select(fromRoot.getC), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm
          .get('C')
          .setValue(this.upperCasePipe.transform(binToHex(s)), {
            emitEvent: false,
          }),
      );

    this.coefficientsForm
      .get('mod')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
        map((value: string) => hexToBin(value)),
      )
      .subscribe((value: string) => {
        this.timeoutToClearTestResult &&
          clearTimeout(this.timeoutToClearTestResult);
        this.store.dispatch(new coefficients.TestPolynomResetResult());
        this.store.dispatch(new coefficients.ModChange(value));
      });

    this.coefficientsForm
      .get('A')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
        map((value: string) => hexToBin(value)),
      )
      .subscribe((value: string) =>
        this.store.dispatch(new coefficients.CoefficientAChange(value)),
      );

    this.coefficientsForm
      .get('B')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
        map((value: string) => hexToBin(value)),
      )
      .subscribe((value: string) =>
        this.store.dispatch(new coefficients.CoefficientBChange(value)),
      );

    this.coefficientsForm
      .get('C')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
        map((value: string) => hexToBin(value)),
      )
      .subscribe((value: string) =>
        this.store.dispatch(new coefficients.CoefficientCChange(value)),
      );

    this.coefficientsForm
      .get('power')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
      .subscribe((value: string) =>
        this.store.dispatch(new coefficients.ModPowerChange(value)),
      );

    this.coefficientsForm
      .get('multipliers')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
      .subscribe((value: string) =>
        this.store.dispatch(new coefficients.MultipliersChange(value)),
      );

    this.coefficientsForm
      .get('mod')
      .statusChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
      .subscribe((val: 'VALID' | 'INVALID') =>
        this.store.dispatch(new coefficients.SetModValidity(val === 'VALID')),
      );

    combineLatest(
      this.coefficientsForm.get('A').statusChanges,
      this.coefficientsForm.get('B').statusChanges,
      this.coefficientsForm.get('C').statusChanges,
    )
      .pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
      .subscribe(([aStatus, bStatus, cStatus]) =>
        this.store.dispatch(
          new coefficients.SetCoefficientsValidity(
            aStatus === 'VALID' && bStatus === 'VALID' && cStatus === 'VALID',
          ),
        ),
      );

    this.polynomTestResult$ = this.store.pipe(
      select(fromRoot.getPolynomTestResult),
      takeUntil(this.ngUnsubscribe),
    );

    this.testLoading$ = this.store.pipe(
      select(fromRoot.getTestLoading),
      takeUntil(this.ngUnsubscribe),
    );

    this.polynomTestResult$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        if (value !== null) {
          clearTimeout(this.timeoutToClearTestResult);
          this.timeoutToClearTestResult = setTimeout(() => {
            this.store.dispatch(new coefficients.TestPolynomResetResult());
          }, 10000);
        }
      });
  }

  onLoadChange(event: any) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () =>
      this.store.dispatch(new coefficients.OpenFileSuccess(reader.result));
    reader.onerror = () =>
      this.store.dispatch(new coefficients.OpenFileFailure());
    try {
      reader.readAsText(input.files[0]);
      input.value = null;
    } catch (e) {
      console.log(e);
      this.store.dispatch(new coefficients.OpenFileFailure());
    }
  }

  testPolynom() {
    this.store.dispatch(new coefficients.TestPolynom());
  }

  generatePolynom() {
    this.store.dispatch(new coefficients.GenerateIrreduciblePolynom());
  }

  getPolynomPower(): number {
    return (
      trimPolynomLastZeros(hexToBin(this.coefficientsForm.get('mod').value))
        .length - 1
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
