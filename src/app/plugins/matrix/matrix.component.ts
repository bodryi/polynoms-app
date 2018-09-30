import { Component, Input, forwardRef, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

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

  constructor(@Inject(DOCUMENT) private document: any) {}

  writeValue(obj: Array<Array<string>>): void {
    this.value = obj;
    this.value.length &&
      document.documentElement.style.setProperty(
        '--columns-number',
        this.value.length.toString(),
      );
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
    //InputEvent
    this.value[rowIndex][itemIndex] = event.target.value;
    this.propagateChange(this.value);
  }
}

// Keep for future validation purposes

//   @Input()
//   set matrix(m: Array<Array<string>>) {
//     if (m) {
//       const rows = m.length;
//       if (rows) {
//         const rowsLengthsEqual = m
//           .map(row => row.length)
//           .reduce(
//             (acc: boolean, curr: number, index: number, arr: Array<number>) =>
//               index ? acc && curr === arr[index - 1] : true,
//             true,
//           );
//         if (rowsLengthsEqual) {
//           if (m.length === m[0].length) {
//             this._matrix = m;
//             this.errorMessage = '';
//           } else {
//             this._matrix = null;
//             this.errorMessage = 'Длины строки и столбца не совпадают';
//           }
//         } else {
//           this._matrix = null;
//           this.errorMessage = 'Длины строк не совпадают';
//         }
//       } else {
//         this._matrix = null;
//         this.errorMessage = 'Матрица не содержит строки';
//       }
//     } else {
//       this._matrix = null;
//       this.errorMessage = 'Отсутствуют данные для отображения';
//     }
//   }

//   get matrix(): Array<Array<string>> {
//     return this._matrix;
//   }

//   private _matrix: Array<Array<string>> = null;
//   errorMessage: string = '';
