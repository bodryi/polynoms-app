import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-dimensions',
  templateUrl: './m-dimensions.component.html',
  styleUrls: ['./m-dimensions.component.css'],
})
export class MDimensionsComponent {
  @Input() m: number;
}
