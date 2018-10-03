import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'coefficients',
  templateUrl: 'coefficients.component.html',
  styleUrls: ['coefficients.component.css'],
})

export class CoefficientsComponent implements OnInit {

  coefficientsForm: FormGroup;

  ngOnInit() {
    this.coefficientsForm = new FormGroup({
      mod: new FormControl(''),
      A: new FormControl(''),
      B: new FormControl(''),
      C: new FormControl(''),
    });
  }
}
