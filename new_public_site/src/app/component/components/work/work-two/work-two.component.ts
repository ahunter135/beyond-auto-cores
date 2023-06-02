import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-work-two',
  templateUrl: './work-two.component.html',
  styleUrls: ['./work-two.component.css']
})
export class WorkTwoComponent implements OnInit {
	
	customOptions: OwlOptions = {
		loop:true,
		autoplay:true,
		margin:0,
		nav:true,
		dots: false,
		navText: ['<i class="la la-long-arrow-alt-left"></i>', '<i class="la la-long-arrow-alt-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:2
			},			
			
			767:{
				items:2
			},
			1000:{
				items:3
				
			}
		}
	}
	
	slideStore = [
		{
			name: "Cookies",
			image: "pic3.jpg",
		},
		{
			name: "Burger",
			image: "pic2.jpg",
		},
		{
			name: "Bear cup",
			image: "pic1.jpg",
		},
		{
			name: "Cookies",
			image: "pic3.jpg",
		},
		{
			name: "Burger",
			image: "pic2.jpg",
		},
		{
			name: "Bear cup",
			image: "pic1.jpg",
		},
		{
			name: "Cookies",
			image: "pic3.jpg",
		},
		{
			name: "Burger",
			image: "pic2.jpg",
		},
		{
			name: "Bear cup",
			image: "pic1.jpg",
		}
		
	]

  constructor() { }

  ngOnInit(): void {
  }

}
