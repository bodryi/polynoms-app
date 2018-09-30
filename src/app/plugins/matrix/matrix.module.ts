import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixComponent } from './matrix.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MatrixComponent],
  exports: [MatrixComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class MatrixModule {}
