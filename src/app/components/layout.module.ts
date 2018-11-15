import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { TabsModule } from '../plugins/tabs/tabs.module';
import { MDimensionsModule } from './m-dimensions/m-dimensions.module';
import { PolynomsModule } from './polynoms/polynoms.module';
import { DigitalSignatureModule } from './digital-signature/digital-signature.module';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [
    TabsModule,
    MDimensionsModule,
    PolynomsModule,
    DigitalSignatureModule,
  ],
})
export class LayoutModule {}
