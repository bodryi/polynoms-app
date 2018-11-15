import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter, map, takeUntil } from 'rxjs/internal/operators';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import { binToHex, hexToBin } from '../../utlis/convert-numbers.util';
import { Subject } from 'rxjs';
import * as digitalSignature from '../../store/digital-signature/actions';

@Component({
  selector: 'digital-signature',
  templateUrl: 'digital-signature.component.html',
  styleUrls: ['digital-signature.component.css'],
})
export class DigitalSignatureComponent implements OnInit, OnDestroy {
  digitalSignatureForm: FormGroup;
  componentNames: Array<string> = [];
  readonly m = 4;
  readonly charCodeSmallA = 97;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    for (let i = 0; i < this.m; i++) {
      this.componentNames.push(String.fromCharCode(this.charCodeSmallA + i));
    }

    this.digitalSignatureForm = new FormGroup({
      message: new FormControl('', Validators.required),
      Q: new FormControl(new Array(this.m).fill('')),
      NDS: new FormControl(new Array(this.m).fill('')),
      h1: new FormControl('', Validators.required),
      n1: new FormControl('', Validators.required),
      h2: new FormControl('', Validators.required),
      n2: new FormControl('', Validators.required),
      h3: new FormControl('', Validators.required),
      n3: new FormControl('', Validators.required),
      Er1: new FormControl(new Array(this.m).fill('')),
      Er2: new FormControl(new Array(this.m).fill('')),
      Er3: new FormControl(new Array(this.m).fill('')),
      T: new FormControl(new Array(this.m).fill('')),
      P: new FormControl(new Array(this.m).fill('')),
      L: new FormControl(new Array(this.m).fill('')),
      Y: new FormControl(new Array(this.m).fill('')),
      U: new FormControl(new Array(this.m).fill('')),
      R: new FormControl(new Array(this.m).fill('')),
      e: new FormControl('', Validators.required),
      s: new FormControl('', Validators.required),
      YTest: new FormControl(new Array(this.m).fill('')),
      UTest: new FormControl(new Array(this.m).fill('')),
      eTest: new FormControl('', Validators.required),
      sTest: new FormControl('', Validators.required),
      RWave: new FormControl(new Array(this.m).fill('')),
      eWave: new FormControl('', Validators.required),
    });

    this.connectFormToStore();
  }

  private connectFormToStore() {
    if (this.digitalSignatureForm.controls) {
      Object.keys(this.digitalSignatureForm.controls).forEach(key => {
        if (Array.isArray(this.digitalSignatureForm.get(key).value)) {
          this.store
            .pipe(
              select(
                fromRoot[`get${key.charAt(0).toUpperCase() + key.slice(1)}`],
              ),
              filter(v => !!v),
              takeUntil(this.ngUnsubscribe),
            )
            .subscribe((v: Array<string>) =>
              this.digitalSignatureForm
                .get(key)
                .setValue(v.map((str: string) => binToHex(str)), {
                  emitEvent: false,
                }),
            );

          this.digitalSignatureForm
            .get(key)
            .valueChanges.pipe(
              takeUntil(this.ngUnsubscribe),
              debounceTime(100),
              map((value: Array<string>) =>
                value.map((v: string) => hexToBin(v)),
              ),
            )
            .subscribe((value: Array<string>) =>
              this.store.dispatch(
                new digitalSignature.ArrayValueChange({
                  key,
                  value,
                }),
              ),
            );
        } else if (key !== 'message') {
          this.store
            .pipe(
              select(
                fromRoot[`get${key.charAt(0).toUpperCase() + key.slice(1)}`],
              ),
              takeUntil(this.ngUnsubscribe),
            )
            .subscribe((s: string) =>
              this.digitalSignatureForm.get(key).setValue(binToHex(s), {
                emitEvent: false,
              }),
            );

          this.digitalSignatureForm
            .get(key)
            .valueChanges.pipe(
              takeUntil(this.ngUnsubscribe),
              debounceTime(100),
              map((value: string) => hexToBin(value)),
            )
            .subscribe((value: string) =>
              this.store.dispatch(
                new digitalSignature.StringValueChange({
                  key,
                  value,
                }),
              ),
            );
        } else {
          this.store
            .pipe(select(fromRoot.getMessage), takeUntil(this.ngUnsubscribe))
            .subscribe((s: string) =>
              this.digitalSignatureForm.get('message').setValue(s, {
                emitEvent: false,
              }),
            );

          this.digitalSignatureForm
            .get('message')
            .valueChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100))
            .subscribe((value: string) =>
              this.store.dispatch(
                new digitalSignature.StringValueChange({
                  key: 'message',
                  value,
                }),
              ),
            );
        }
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
