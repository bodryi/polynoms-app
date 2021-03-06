import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../store';
import { debounceTime, filter, takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';
import * as matrix from '../../../store/matrix/actions';

@Component({
  selector: 'matrix-block',
  templateUrl: './matrix-block.component.html',
  styleUrls: ['./matrix-block.component.css'],
})
export class MatrixBlockComponent implements OnInit, OnDestroy {
  @Input()
  m: number;
  matrixForm: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.matrixForm = new FormGroup({
      matrix: new FormControl(
        new Array(this.m).fill(null).map(() => new Array(this.m).fill('')),
      ),
    });

    this.store
      .pipe(
        select(fromRoot.getMatrix),
        filter(m => !!m),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((m: Array<Array<string>>) =>
        this.matrixForm.get('matrix').setValue(m, { emitEvent: false }),
      );

    this.matrixForm.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
      )
      .subscribe((value: { matrix: Array<Array<string>> }) =>
        this.store.dispatch(new matrix.MatrixChange(value.matrix)),
      );
  }

  onLoadChange(event: any) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () =>
      this.store.dispatch(new matrix.OpenFileSuccess(reader.result));
    reader.onerror = () => this.store.dispatch(new matrix.OpenFileFailure());
    try {
      reader.readAsText(input.files[0]);
      input.value = null;
    } catch (e) {
      console.log(e);
      this.store.dispatch(new matrix.OpenFileFailure());
    }
  }

  onSaveClick() {
    this.store.dispatch(new matrix.SaveFile());
  }

  onCopyClick() {
    this.store.dispatch(new matrix.Copy());
  }

  onPasteClick() {
    this.store.dispatch(new matrix.Paste());
  }

  onClearClick() {
    this.store.dispatch(new matrix.Clear());
  }

  onDefaultClick() {
    this.store.dispatch(new matrix.SetDefault());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
