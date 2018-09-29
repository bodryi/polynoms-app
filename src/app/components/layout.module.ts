import { LayoutComponent } from './layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabsModule } from '../plugins/tabs/tabs.module';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [BrowserModule, TabsModule],
})
export class LayoutModule {}
