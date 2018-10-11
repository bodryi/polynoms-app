import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as resultVectors from '../../../store/result-vectors/actions';
import { debounceTime, map, takeUntil } from 'rxjs/internal/operators';
import { Observable, Subject } from 'rxjs';
import { binToHex, hexToBin } from '../../../utlis/convert-numbers.util';

@Component({
  selector: 'result-vectors',
  templateUrl: 'result-vectors.component.html',
  styleUrls: ['result-vectors.component.css'],
})
export class ResultVectorsComponent implements OnInit, OnDestroy {
  @Input() m: number;

  vectorsForm: FormGroup;
  componentNames: Array<string> = [];
  activeResult$: Observable<number>;
  readonly charCodeSmallA = 97;
  readonly RESULTS_COUNT = 6;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    for (let i = 0; i < this.m; i++) {
      this.componentNames.push(String.fromCharCode(this.charCodeSmallA + i));
    }

    this.vectorsForm = new FormGroup({
      results: new FormArray(
        new Array(this.RESULTS_COUNT)
          .fill('')
          .map(() => new FormControl(new Array(this.m).fill(''))),
      ),
    });

    this.activeResult$ = this.store.pipe(
      select(fromRoot.getActiveResult),
      takeUntil(this.ngUnsubscribe),
    );

    this.store
      .pipe(select(fromRoot.getResult), takeUntil(this.ngUnsubscribe))
      .subscribe((r: Array<Array<string>>) =>
        r.map((v: Array<string>, index: number) =>
          this.vectorsForm
            .get('results')
            .get(`${index}`)
            .setValue(v.map((str: string) => binToHex(str)), {
              emitEvent: false,
            }),
        ),
      );

    (this.vectorsForm.get('results') as FormArray).controls.forEach(
      (control: FormControl, index: number) => {
        control.valueChanges
          .pipe(
            takeUntil(this.ngUnsubscribe),
            debounceTime(100),
            map((value: Array<string>) =>
              value.map((v: string) => hexToBin(v)),
            ),
          )
          .subscribe((value: Array<string>) =>
            this.store.dispatch(
              new resultVectors.SetResult({ vector: value, index }),
            ),
          );
      },
    );
  }

  activeResultChange(newActiveResult: number) {
    this.store.dispatch(
      new resultVectors.SetActiveResultVector(newActiveResult),
    );
  }

  onCopyClick(index: number) {
    this.store.dispatch(new resultVectors.Copy(index));
  }

  onPasteClick(index: number) {
    this.store.dispatch(new resultVectors.Paste(index));
  }

  onClearClick(index: number) {
    this.store.dispatch(new resultVectors.Clear(index));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
