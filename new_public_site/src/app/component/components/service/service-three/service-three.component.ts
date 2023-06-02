import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-three',
  templateUrl: './service-three.component.html',
  styleUrls: ['./service-three.component.css']
})
export class ServiceThreeComponent implements OnInit {
	
	serviceList: any[] = [
		{
			image: "pic1.jpg",
			icon: "icon1.png",
			title: "Organic Agriculture",
		},
		{
			image: "pic2.jpg",
			icon: "icon2.png",
			title: "Increased Biodiversity",
		},
		{
			image: "pic3.jpg",
			icon: "icon3.png",
			title: "Better Habitat",
		},
		{
			image: "pic4.jpg",
			icon: "icon4.png",
			title: "Improved Symbiosis",
		},
		{
			image: "pic5.jpg",
			icon: "icon5.png",
			title: "Livestock Farming",
		},
		{
			image: "pic6.jpg",
			icon: "icon6.png",
			title: "Interdependent Culture",
		}
	]

  constructor() { }

  ngOnInit(): void {
  }

}
