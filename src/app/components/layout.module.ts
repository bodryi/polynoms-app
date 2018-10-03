import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { TabsModule } from '../plugins/tabs/tabs.module';
import { MDimensionsModule } from './m-dimensions/m-dimensions.module';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [TabsModule, MDimensionsModule],
})
export class LayoutModule {}
