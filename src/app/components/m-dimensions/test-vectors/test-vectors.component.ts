import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as fromRoot from '../../../store';
import { select, Store } from '@ngrx/store';
import * as testVectors from '../../../store/test-vectors/actions';
import { debounceTime, filter, map, takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';
import { binToHex, hexToBin } from '../../../utlis/convert-numbers.util';

@Component({
  selector: 'test-vectors',
  templateUrl: './test-vectors.component.html',
  styleUrls: ['./test-vectors.component.css'],
})
export class TestVectorsComponent implements OnInit, OnDestroy {
  @Input() m: number;

  vectorsForm: FormGroup;
  componentNames: Array<string> = [];
  readonly charCodeSmallA = 97;
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    for (let i = 0; i < this.m; i++) {
      this.componentNames.push(String.fromCharCode(this.charCodeSmallA + i));
    }

    this.vectorsForm = new FormGroup({
      A: new FormControl(new Array(this.m).fill('')),
      B: new FormControl(new Array(this.m).fill('')),
      C: new FormControl(new Array(this.m).fill('')),
    });

    this.store
      .pipe(
        select(fromRoot.getTestVectorA),
        filter(v => !!v),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((v: Array<string>) =>
        this.vectorsForm
          .get('A')
          .setValue(v.map((str: string) => binToHex(str)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(
        select(fromRoot.getTestVectorB),
        filter(v => !!v),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((v: Array<string>) =>
        this.vectorsForm
          .get('B')
          .setValue(v.map((str: string) => binToHex(str)), {
            emitEvent: false,
          }),
      );

    this.store
      .pipe(
        select(fromRoot.getTestVectorC),
        filter(v => !!v),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((v: Array<string>) =>
        this.vectorsForm
          .get('C')
          .setValue(v.map((str: string) => binToHex(str)), {
            emitEvent: false,
          }),
      );

    this.vectorsForm
      .get('A')
      .valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(100),
      map((value: Array<string>) => value.map((v: string) => hexToBin(v),
      )),
    )
      .subscribe((value: Array<string>) =>
        this.store.dispatch(new testVectors.TestVectorAChange(value)),
      );

    this.vectorsForm
      .get('B')
      .valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(100),
      map((value: Array<string>) => value.map((v: string) => hexToBin(v))),
    )
      .subscribe((value: Array<string>) =>
        this.store.dispatch(new testVectors.TestVectorBChange(value)),
      );

    this.vectorsForm
      .get('C')
      .valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(100),
      map((value: Array<string>) => value.map((v: string) => hexToBin(v))),
    )
      .subscribe((value: Array<string>) =>
        this.store.dispatch(new testVectors.TestVectorCChange(value)),
      );
  }

  onCopyClick(vectorName: string) {
    this.store.dispatch(new testVectors.Copy(vectorName));
  }

  onPasteClick(vectorName: string) {
    this.store.dispatch(new testVectors.Paste(vectorName));
  }

  onClearClick(vectorName: string) {
    this.store.dispatch(new testVectors.Clear(vectorName));
  }

  onRandomClick(vectorName: string) {
    this.store.dispatch(new testVectors.GenerateRandomTestVector(vectorName));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
