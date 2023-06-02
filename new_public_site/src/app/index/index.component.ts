import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

declare var TradeZone : any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
	
	menuList: any[] = [
		{
		title: "Home",
		//section_id: "home",
		navList: [
			{"title": "construction", "url": "/"},
			{"title": "Home Food Industry", "url": "/index-food-factory"},
			{"title": "Home Agriculture", "url": "/index-agriculture"},
			{"title": "Home Steel Plant", "url": "/index-steel-plant"},
			{"title": "Home Solar Plant", "url": "/index-solar-plant"},
		]
		},
		{title: "About Us", section_id: "about-us",},
		{title: "Services", section_id: "services",},
		{title: "Projects", section_id: "projects",},
		{title: "Team", section_id: "team",},
		{title: "Client Says", section_id: "client",},
		{title: "Blog", section_id: "blog",},
	];
	
	
	
	theme : any = {
		color: "text-black",
	}


	slideStore : any[] = [
		{
			date: "10Aug 2016",
			name: "HENRY HUNTER",
			categorie: "Electricity",
			title: "Creating quality urban lifestyles, building stronger.",
			image: "construct/pic3.jpg",
			testimonial_image: "pic1.jpg",
		},
		{
			date: "10Aug 2016",
			name: "OSCAR WESTON",
			categorie: "Construction",
			title: "We’ll nail your next project, because nobody wants!",
			image: "construct/pic2.jpg",
			testimonial_image: "pic2.jpg",
		},
		{
			date: "10Aug 2016",
			name: "RUBIN SANTRO",
			categorie: "Renovation",
			title: "Helping you and your house become better.",
			image: "construct/pic4.jpg",
			testimonial_image: "pic3.jpg",
		}
	]
	
  constructor() { }

  ngOnInit(): void {
	  TradeZone.init();
  }

}
