import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var TradeZone: any;

@Component({
  selector: 'app-index-steel-plant',
  templateUrl: './index-steel-plant.component.html',
  styleUrls: ['./index-steel-plant.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexSteelPlantComponent implements OnInit {
	
	
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
		{title: "Stats", section_id: "stats",},
		{title: "Services", section_id: "services",},
		{title: "Team", section_id: "team",},
		{title: "Client Says", section_id: "client",},
		{title: "Blog", section_id: "blog",},
	]
	
	theme : any = {
		color: "text-white",
	}
	
	
	slideStore : any[] = [
		{
			date: "10Aug 2016",
			name: "HENRY HUNTER",
			categorie: "Sheet Cutting",
			title: "Understand The Background Of Steel Industry Now.",
			image: "steel/pic3.jpg",
			testimonial_image: "pic1.jpg",
		},
		{
			date: "10Aug 2016",
			name: "OSCAR WESTON",
			categorie: "Structural Steel",
			title: "Things That Make You Love And Hate Steel Industry.",
			image: "steel/pic2.jpg",
			testimonial_image: "pic2.jpg",
		},
		{
			date: "10Aug 2016",
			name: "RUBIN SANTRO",
			categorie: "Pipe & Pipeline",
			title: "How To Learn About Steel Industry In Only 10 Days.",
			image: "steel/pic4.jpg",
			testimonial_image: "pic3.jpg",
		}
	]

  constructor() { }

  ngOnInit(): void {
	  TradeZone.init();
	  
  }

}
