import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
})
export class TabComponent {
  @Input() tabTitle: string;
  @Input()
  set active(v: boolean) {
    this._active = v;
    if (this._active) {
      this.tabSelected.emit();
    }
  }

  get active(): boolean {
    return this._active;
  }

  @Input() template;
  @Input() dataContext;
  @Output() tabSelected: EventEmitter<void> = new EventEmitter();

  private _active = false;
}
