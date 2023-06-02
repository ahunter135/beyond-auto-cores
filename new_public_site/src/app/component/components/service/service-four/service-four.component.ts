import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-four',
  templateUrl: './service-four.component.html',
  styleUrls: ['./service-four.component.css']
})
export class ServiceFourComponent implements OnInit {
	
	serviceList: any[] = [
		{
			image: "pic1.jpg",
			icon: "icon1.png",
			title: "Machine Welding",
		},
		{
			image: "pic6.jpg",
			icon: "icon2.png",
			title: "Flanging & Advanced",
		},
		{
			image: "pic3.jpg",
			icon: "icon3.png",
			title: "Metal Sheet Cutting",
		},
		{
			image: "pic4.jpg",
			icon: "icon4.png",
			title: "Structural Steel",
		},
		{
			image: "pic5.jpg",
			icon: "icon5.png",
			title: "Pipe & Pipeline",
		},
		{
			image: "pic2.jpg",
			icon: "icon6.png",
			title: "Structural Fabrication",
		},
	]
	

  constructor() { }

  ngOnInit(): void {
  }

}
