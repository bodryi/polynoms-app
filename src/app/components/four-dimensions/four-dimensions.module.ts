import { NgModule, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatrixModule } from '../../plugins/matrix/matrix.module';
import { FourDimensionsComponent } from './four-dimensions.component';
import { MatrixBlockComponent } from './matrix-block/matrix-block.component';

@NgModule({
  declarations: [FourDimensionsComponent, MatrixBlockComponent],
  exports: [FourDimensionsComponent],
  imports: [CommonModule, MatrixModule, ReactiveFormsModule],
})
export class FourDimensionsModule {}
