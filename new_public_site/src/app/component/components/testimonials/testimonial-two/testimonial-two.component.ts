import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonial-two',
  templateUrl: './testimonial-two.component.html',
  styleUrls: ['./testimonial-two.component.css']
})
export class TestimonialTwoComponent implements OnInit {
	customOptions: OwlOptions = {
		loop:true,
		autoplay:true,
		margin:30,
		nav:true,
		dots: false,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:2
			},			
			
			991:{
				items:2
			},
			1000:{
				items:3
			}
		}
	}
	
	slideStore = [
		{
			description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
			name: "Jacob Tucker",
			position: "Product Provider",
			image: "pic1.jpg",
		},
		{
			description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
			name: "David Matin",
			position: "Product Dealer",
			image: "pic1.jpg",
		},
		{
			description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
			name: "Muhammad Clay",
			position: "Store Manager",
			image: "pic1.jpg",
		},
		{
			description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
			name: "Jacob Tucker",
			position: "Product Provider",
			image: "pic1.jpg",
		},
		{
			description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
			name: "David Matin",
			position: "Product Dealer",
			image: "pic1.jpg",
		},
		{
			description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
			name: "Muhammad Clay",
			position: "Store Manager",
			image: "pic1.jpg",
		}
	]

  constructor() { }

  ngOnInit(): void {
  }

}
