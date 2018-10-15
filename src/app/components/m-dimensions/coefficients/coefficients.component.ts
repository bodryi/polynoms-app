import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import * as coefficients from '../../../store/coefficients/actions';
import { select, Store } from '@ngrx/store';
import { debounceTime, map, takeUntil } from 'rxjs/internal/operators';
import * as fromRoot from '../../../store';
import { binToHex, hexToBin } from '../../../utlis/convert-numbers.util';

@Component({
  selector: 'coefficients',
  templateUrl: 'coefficients.component.html',
  styleUrls: ['coefficients.component.css'],
})
export class CoefficientsComponent implements OnInit, OnDestroy {
  coefficientsForm: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.coefficientsForm = new FormGroup({
      mod: new FormControl(''),
      A: new FormControl(''),
      B: new FormControl(''),
      C: new FormControl(''),
    });

    this.store
      .pipe(select(fromRoot.getMod), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm.get('mod').setValue(s, { emitEvent: false }),
      );

    this.store
      .pipe(select(fromRoot.getA), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm
          .get('A')
          .setValue(binToHex(s), { emitEvent: false }),
      );

    this.store
      .pipe(select(fromRoot.getB), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm
          .get('B')
          .setValue(binToHex(s), { emitEvent: false }),
      );

    this.store
      .pipe(select(fromRoot.getC), takeUntil(this.ngUnsubscribe))
      .subscribe((s: string) =>
        this.coefficientsForm
          .get('C')
          .setValue(binToHex(s), { emitEvent: false }),
      );

    this.coefficientsForm
      .get('mod')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
      .subscribe((value: string) =>
        this.store.dispatch(new coefficients.ModChange(value)),
      );

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
  }

  testPolynom() {
    this.store.dispatch(new coefficients.TestPolynom(this.coefficientsForm.get('mod').value));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
