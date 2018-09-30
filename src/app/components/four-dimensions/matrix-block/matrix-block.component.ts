import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'matrix-block',
  templateUrl: './matrix-block.component.html',
  styleUrls: ['./matrix-block.component.css'],
})
export class MatrixBlockComponent implements OnInit {
  matrixForm: FormGroup;

  MATRIX_SIZE = 4;

  ngOnInit() {
      // error with form group and from control name
    this.matrixForm = new FormGroup({
      matrix: new FormArray([
        new FormArray([
          new FormControl(''),
          new FormControl(''),
          new FormControl(''),
          new FormControl(''),
        ]),
        new FormArray([
          new FormControl(''),
          new FormControl(''),
          new FormControl(''),
          new FormControl(''),
        ]),
        new FormArray([
          new FormControl(''),
          new FormControl(''),
          new FormControl(''),
          new FormControl(''),
        ]),
        new FormArray([
          new FormControl(''),
          new FormControl(''),
          new FormControl(''),
          new FormControl(''),
        ]),
      ]),
    });
  }
  // this.matrixForm = new FormGroup({
  //   matrix: new FormControl([
  //     ['', '', '', ''],
  //     ['', '', '', ''],
  //     ['', '', '', ''],
  //     ['', '', '', ''],
  //   ]),
  // });
}
