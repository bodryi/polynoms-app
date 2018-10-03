import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'test-vectors',
  templateUrl: './test-vectors.component.html',
  styleUrls: ['./test-vectors.component.css'],
})
export class TestVectorsComponent implements OnInit {
  @Input() m: number;

  vectorsForm: FormGroup;
  componentNames: Array<string> = [];
  readonly charCodeSmallA = 97;

  ngOnInit() {
    for (let i = 0; i < this.m; i++) {
      this.componentNames.push(String.fromCharCode(this.charCodeSmallA + i));
    }

    this.vectorsForm = new FormGroup({
      A: new FormControl(new Array(this.m).fill('')),
      B: new FormControl(new Array(this.m).fill('')),
      C: new FormControl(new Array(this.m).fill('')),
    });
  }
}
