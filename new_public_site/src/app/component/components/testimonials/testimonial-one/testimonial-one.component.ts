import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonial-one',
  templateUrl: './testimonial-one.component.html',
  styleUrls: ['./testimonial-one.component.css']
})
export class TestimonialOneComponent implements OnInit {
	
	customOptions: OwlOptions = {
		loop:true,
		autoplay:true,
		margin:30,
		nav:false,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive:{
			0: {
				items: 1
			},
			400: {
				items: 2
			},
			740: {
				items: 2
			},
			940: {
				items: 2
			}
		}
	}
	
	slideStore = [
		{
			name: "David Matin",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
		},
		{
			name: "George Carson",
			position: "CEO, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
		},
		{
			name: "David Matin",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
		},
		{
			name: "George Carson",
			position: "CEO, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
		},
		{
			name: "David Matin",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
		},
		{
			name: "George Carson",
			position: "CEO, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
		}
	]

  constructor() { }

  ngOnInit(): void {
  }

}
