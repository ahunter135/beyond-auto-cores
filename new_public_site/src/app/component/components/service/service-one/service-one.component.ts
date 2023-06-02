import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-one',
  templateUrl: './service-one.component.html',
  styleUrls: ['./service-one.component.css']
})
export class ServiceOneComponent implements OnInit {
	
	serviceList: any[] = [
		{
			title: "Building Construction",
			image: "icon1.png",
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry..",
		},
		{
			title: "Building Renovation",
			image: "icon2.png",
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry..",
		},
		{
			title: "Architecture Design",
			image: "icon3.png",
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry..",
		},
		
	]

  constructor() { }

  ngOnInit(): void {
  }

}
