import { Component, OnInit, ViewEncapsulation } from '@angular/core';


declare var TradeZone : any;


@Component({
  selector: 'app-index-food-factory',
  templateUrl: './index-food-factory.component.html',
  styleUrls: ['./index-food-factory.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexFoodFactoryComponent implements OnInit {
	
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
		{title: "News", section_id: "news",},
		{title: "Client Says", section_id: "client",},
	]
	
	
	constructor() { }

	ngOnInit(): void {
		TradeZone.init();
	
	}

}
