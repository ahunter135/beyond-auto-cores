import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonial-five',
  templateUrl: './testimonial-five.component.html',
  styleUrls: ['./testimonial-five.component.css']
})
export class TestimonialFiveComponent implements OnInit {
	
	customOptions: OwlOptions = {
		loop:true,
		autoplay:true,
		margin:30,
		nav:true,
		dots: true,
		navText: ['<i class="ti ti-arrow-left"></i>', '<i class="ti ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			
			480:{
				items:1
			},			
			
			767:{
				items:1
			},
			1000:{
				items:1
			}
		}
	}
	
	
	slideStore = [
		{
			name: "Oliver Acker",
			position: "CLIENT",
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets conta",
			image:  "pic1.jpg",
		},
		{
			name: "David Matin",
			position: "CLIENT",
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets conta",
			image:  "pic2.jpg",
		},
		{
			name: "Noah Baldon",
			position: "CLIENT",
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets conta",
			image:  "pic3.jpg",
		}
	]
  constructor() { }

  ngOnInit(): void {
  }

}
