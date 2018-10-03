import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'matrix-block',
  templateUrl: './matrix-block.component.html',
  styleUrls: ['./matrix-block.component.css'],
})
export class MatrixBlockComponent implements OnInit {
  @Input() m: number;
  matrixForm: FormGroup;

  ngOnInit() {
    // console.log()
    // error with form group and from control name
    this.matrixForm = new FormGroup({
      matrix: new FormControl(
        new Array(this.m).fill(new Array(this.m).fill('')),
      ),
    });
  }
}
