import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-team-two',
  templateUrl: './team-two.component.html',
  styleUrls: ['./team-two.component.css']
})
export class TeamTwoComponent implements OnInit {
	
	customOptions: OwlOptions = {
		loop:true,
		autoplay:true,
		center: true,
		margin:30,
		nav:true,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
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
				items:4
			}
		}
	}
	
	slideStore = [
		{
			image: "member-1.jpg",
			name: "George Carson, <span>Graphic Designer</span>",
			list: [
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-facebook'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-linkedin'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-instagram'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-twitter'></i></a>"},
			]
		},
		{
			image: "member-2.jpg",
			name: "Harry Parker, <span>CEO</span>",
			list: [
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-facebook'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-linkedin'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-instagram'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-twitter'></i></a>"},
			]
		},
		{
			image: "member-3.jpg",
			name: "Jack Ronan, <span>Manager</span>",
			list: [
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-facebook'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-linkedin'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-instagram'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-twitter'></i></a>"},
			]
		},
		{
			image: "member-4.jpg",
			name: "Jacob Tucker, <span>Product Designer</span>",
			list: [
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-facebook'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-linkedin'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-instagram'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-twitter'></i></a>"},
			]
		},
		{
			image: "member-3.jpg",
			name: "Jack Ronan, <span>Manager</span>",
			list: [
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-facebook'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-linkedin'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-instagram'></i></a>"},
				{icon:  "<a href='#' class='site-button circle white'><i class ='fa fa-twitter'></i></a>"},
			]
		}
	]
		

  constructor() { }

  ngOnInit(): void {
  }

}
