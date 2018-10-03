import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(@Inject(DOCUMENT) private document: any) {}

  onTabSelect(m: number) {
    document.documentElement.style.setProperty(
      '--columns-number',
      m.toString(),
    );
  }
}
