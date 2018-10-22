import { NgModule } from '@angular/core';

import { PolynomsComponent } from './polynoms.component';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PolynomsComponent],
  declarations: [PolynomsComponent],
  providers: [UpperCasePipe],
})
export class PolynomsModule {
}
