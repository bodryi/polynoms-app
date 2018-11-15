import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'digital-signature',
  templateUrl: 'digital-signature.component.html',
  styleUrls: ['digital-signature.component.css'],
})
export class DigitalSignatureComponent implements OnInit {
  digitalSignatureForm: FormGroup;
  componentNames: Array<string> = [];
  readonly m = 4;
  readonly charCodeSmallA = 97;

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.m; i++) {
      this.componentNames.push(String.fromCharCode(this.charCodeSmallA + i));
    }

    this.digitalSignatureForm = new FormGroup({
      message: new FormControl('', Validators.required),
      Q: new FormControl(new Array(this.m).fill('')),
      N: new FormControl(new Array(this.m).fill('')),
      h1: new FormControl('', Validators.required),
      n1: new FormControl('', Validators.required),
      h2: new FormControl('', Validators.required),
      n2: new FormControl('', Validators.required),
      h3: new FormControl('', Validators.required),
      n3: new FormControl('', Validators.required),
      Er1: new FormControl(new Array(this.m).fill('')),
      Er2: new FormControl(new Array(this.m).fill('')),
      Er3: new FormControl(new Array(this.m).fill('')),
      T: new FormControl(new Array(this.m).fill('')),
      P: new FormControl(new Array(this.m).fill('')),
      L: new FormControl(new Array(this.m).fill('')),
      Y: new FormControl(new Array(this.m).fill('')),
      U: new FormControl(new Array(this.m).fill('')),
      R: new FormControl(new Array(this.m).fill('')),
      e: new FormControl('', Validators.required),
      s: new FormControl('', Validators.required),
      YTest: new FormControl(new Array(this.m).fill('')),
      UTest: new FormControl(new Array(this.m).fill('')),
      eTest: new FormControl('', Validators.required),
      sTest: new FormControl('', Validators.required),
      RWave: new FormControl(new Array(this.m).fill('')),
      eCheck: new FormControl('', Validators.required),
    });
  }
}
