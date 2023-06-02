import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonial-four',
  templateUrl: './testimonial-four.component.html',
  styleUrls: ['./testimonial-four.component.css']
})
export class TestimonialFourComponent implements OnInit {
	
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
			name: "James Logan",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
			image: "pic1.jpg",
		},
		{
			name: "Noah Baldon",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
			image: "pic2.jpg",
		},
		{
			name: "Oscar Weston",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
			image: "pic3.jpg",
		},
		{
			name: "David Matin",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
			image: "pic1.jpg",
		},
		{
			name: "David Matin",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
			image: "pic2.jpg",
		},
		{
			name: "David Matin",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
			image: "pic3.jpg",
		},
		{
			name: "David Matin",
			position: "Engineering Manager, Soft Solution.",
			description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
			image: "pic1.jpg",
		}
	]

  constructor() { }

  ngOnInit(): void {
  }

}
