import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'result-vectors',
  templateUrl: 'result-vectors.component.html',
  styleUrls: ['result-vectors.component.css'],
})
export class ResultVectorsComponent implements OnInit {
  @Input() m: number;

  vectorsForm: FormGroup;
  componentNames: Array<string> = [];
  readonly charCodeSmallA = 97;

  ngOnInit() {
    for (let i = 0; i < this.m; i++) {
      this.componentNames.push(String.fromCharCode(this.charCodeSmallA + i));
    }

    this.vectorsForm = new FormGroup({
      res_1: new FormControl(new Array(this.m).fill('')),
      res_2: new FormControl(new Array(this.m).fill('')),
      res_3: new FormControl(new Array(this.m).fill('')),
      res_4: new FormControl(new Array(this.m).fill('')),
      res_5: new FormControl(new Array(this.m).fill('')),
      res_6: new FormControl(new Array(this.m).fill('')),
    });
  }
}
