import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-work-three',
  templateUrl: './work-three.component.html',
  styleUrls: ['./work-three.component.css']
})
export class WorkThreeComponent implements OnInit {
	
	customOptions: OwlOptions = {
		loop:true,
		autoplay:true,
		margin:30,
		nav:false,
		dots: false,
		navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2,
				margin:15
			},
			700:{
				items:2,
				margin:15
			},		
			1024:{
				items:3
			},
			1200:{
				items:3
			}
		}
	}


	slideStore = [
		{
			title: "Solar Panels",
			image: "pic1.jpg",
		},
		{
			title: "Wind Turbines",
			image: "pic6.jpg",
		},
		{
			title: "Green Equipment",
			image: "pic3.jpg",
		}
	]
	
  constructor() { }

  ngOnInit(): void {
  }

}
