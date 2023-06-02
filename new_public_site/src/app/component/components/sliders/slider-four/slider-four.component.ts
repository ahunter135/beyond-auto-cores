import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-four',
  templateUrl: './slider-four.component.html',
  styleUrls: ['./slider-four.component.css']
})
export class SliderFourComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scroll(ev: Event, el: string) {
    ev.preventDefault();
    console.log(el);
    document.getElementById(el)?.scrollIntoView();
  }

}
