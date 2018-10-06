import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import * as fromRoot from '../../../store';
import * as actions from '../../../store/actions/actions';
import { select, Store } from '@ngrx/store';
import { debounceTime, takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'actions-block',
  templateUrl: 'actions-block.component.html',
  styleUrls: ['actions-block.component.css'],
})
export class ActionsBlockComponent implements OnInit, OnDestroy {
  powerForm: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.powerForm = new FormGroup({
      power: new FormControl(''),
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
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
