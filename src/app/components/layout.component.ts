import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store';
import * as main from '../store/main/actions';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private store: Store<fromRoot.State>,
  ) {}

  onTabSelect(m: number) {
    this.store.dispatch(new main.SetMatrixSize(m));
    document.documentElement.style.setProperty(
      '--columns-number',
      m.toString(),
    );
  }
}
