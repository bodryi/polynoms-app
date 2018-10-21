import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'polynoms',
  templateUrl: 'polynoms.component.html',
  styleUrls: ['polynoms.component.css'],
})

export class PolynomsComponent implements OnInit, OnDestroy {
  constructor() {
  }

  ngOnInit() {
    console.log('created')
  }

  ngOnDestroy() {
    console.log('destroyed')
  }
}
