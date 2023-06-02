import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-one',
  templateUrl: './about-one.component.html',
  styleUrls: ['./about-one.component.css']
})
export class AboutOneComponent implements OnInit {
	content = [
		{
			id: "web-design-1", 
			text: "ABOUT INDUSTRY",
			title: "We design and build innovative platforms for inspiring brand",
			image: "logo.png",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\n" +
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."
		},
		{
			id: "graphic-design-1", 
			text: "Tradezone",
			title: "We design and build innovative platforms for inspiring brand",
			image: "logo.png",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\n" +
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."
		},
		{
			id: "developement-1", 
			text: "ABOUT History",
			title: "We design and build innovative platforms for inspiring brand",
			image: "logo.png",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\n" +
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."
		}
	]
	tabList = [
		{id: "web-design-1",count: "1",},
		{id: "graphic-design-1",count: "2",},
		{id: "developement-1",count: "3",}
	]
	
  constructor() { }

  ngOnInit(): void {
  }

}
