import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatrixModule } from '../../plugins/matrix/matrix.module';
import { FourDimensionsComponent } from './four-dimensions.component';
import { MatrixBlockComponent } from './matrix-block/matrix-block.component';
import { TestVectorsComponent } from './test-vectors/test-vectors.component';
import { VectorModule } from '../../plugins/vector/vector.module';
import { CoefficientsComponent } from './coefficients/coefficients.component';
import { ActionsBlockComponent } from './actions-block/actions-block.component';

@NgModule({
  declarations: [
    FourDimensionsComponent,
    MatrixBlockComponent,
    TestVectorsComponent,
    CoefficientsComponent,
    ActionsBlockComponent,
  ],
  exports: [FourDimensionsComponent],
  imports: [CommonModule, MatrixModule, ReactiveFormsModule, VectorModule],
})
export class FourDimensionsModule {
}
