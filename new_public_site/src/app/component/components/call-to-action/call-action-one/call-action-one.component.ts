import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-action-one',
  templateUrl: './call-action-one.component.html',
  styleUrls: ['./call-action-one.component.css']
})
export class CallActionOneComponent implements OnInit {
	
  constructor() { }

  ngOnInit(): void {
  }

  open(type: string) {
    if (type == 'ios') {
      window.open("https://apps.apple.com/us/app/catalytic-mastermind/id6443473134", "_blank")
    } else {
      window.open("https://play.google.com/store/apps/details?id=org.catalyticmastermind.beyondautocore", "_blank")
    }
  }

}
