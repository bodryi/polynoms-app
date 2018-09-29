import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/shared-styles/variables.style.css',
    '../assets/shared-styles/base.style.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
