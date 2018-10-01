import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorComponent } from './vector.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VectorComponent],
  exports: [VectorComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class VectorModule {}
