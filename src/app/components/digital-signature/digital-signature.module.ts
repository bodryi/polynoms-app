import { NgModule } from '@angular/core';
import { DigitalSignatureComponent } from './digital-signature.component';
import { CommonModule } from '@angular/common';
import { VectorModule } from '../../plugins/vector/vector.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, VectorModule, ReactiveFormsModule],
  exports: [DigitalSignatureComponent],
  declarations: [DigitalSignatureComponent],
  providers: [],
})
export class DigitalSignatureModule {}
