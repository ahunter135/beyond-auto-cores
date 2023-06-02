import { Component, OnInit } from '@angular/core';
declare var TradeZone: any;
@Component({
  selector: 'app-counter-one',
  templateUrl: './counter-one.component.html',
  styleUrls: ['./counter-one.component.css']
})
export class CounterOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
	  TradeZone.init();
  }

}
