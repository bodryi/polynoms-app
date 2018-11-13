import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'matrix-view',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MatrixComponent),
    },
  ],
})
export class MatrixComponent implements ControlValueAccessor {
  value: Array<Array<string>> = null;
  private propagateChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(obj: Array<Array<string>>): void {
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

  onChange(event: any, rowIndex: number, itemIndex: number) {
    this.value[rowIndex][itemIndex] = event.target.value;
    this.propagateChange(this.value);
  }
}
