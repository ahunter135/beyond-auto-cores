import { Component, OnInit } from '@angular/core';
declare var TradeZone: any;
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
	  TradeZone.init();
  }

}
