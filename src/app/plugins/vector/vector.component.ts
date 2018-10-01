import {
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'vector-view',
  templateUrl: 'vector.component.html',
  styleUrls: ['vector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => VectorComponent),
    },
  ],
})
export class VectorComponent implements ControlValueAccessor {
  @Input() componentNames: Array<string> = [];
  value: Array<string> = null;
  private propagateChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(obj: Array<string>): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  onChange(event: any, rowIndex: number) {
    //InputEvent
    this.value[rowIndex] = event.target.value;
    this.propagateChange(this.value);
  }
}
