import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-two',
  templateUrl: './about-two.component.html',
  styleUrls: ['./about-two.component.css']
})
export class AboutTwoComponent implements OnInit {
	
		subtitle= "ABOUT COMPANY";
		title= "Quality Products With Sweet eggs a breads";
		description= "<div class='m-b20'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div> Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
	

  constructor() { }

  ngOnInit(): void {
  }

}
