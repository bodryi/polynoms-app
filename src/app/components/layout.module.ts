import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { TabsModule } from '../plugins/tabs/tabs.module';
import { FourDimensionsModule } from './four-dimensions/four-dimensions.module';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [TabsModule, FourDimensionsModule],
})
export class LayoutModule {}
