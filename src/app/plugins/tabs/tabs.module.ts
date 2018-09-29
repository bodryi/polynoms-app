import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [TabComponent, TabsComponent],
  exports: [TabComponent, TabsComponent],
})
export class TabsModule {}
