import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
})
export class TabComponent {
  @Input()
  tabTitle: string;
  @Input()
  active = false;
  @Input()
  template;
  @Input()
  dataContext;
}
