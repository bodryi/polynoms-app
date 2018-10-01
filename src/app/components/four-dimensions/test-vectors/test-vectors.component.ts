import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'test-vectors',
  templateUrl: './test-vectors.component.html',
  styleUrls: ['./test-vectors.component.css'],
})
export class TestVectorsComponent implements OnInit {
  vectorsForm: FormGroup;
  componentNames: Array<string> = ['a', 'b', 'c', 'd']

  VECTOR_SIZE = 4;

  ngOnInit() {
    this.vectorsForm = new FormGroup({
      A: new FormControl(['', '', '', '']),
      B: new FormControl(['', '', '', '']),
      C: new FormControl(['', '', '', '']),
    });
  }
}
