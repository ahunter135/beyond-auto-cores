import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-five',
  templateUrl: './header-five.component.html',
  styleUrls: ['./header-five.component.css']
})
export class HeaderFiveComponent implements OnInit {
	
	//pageSlug : any = this.router.url;

	leftMenu: any[] = [
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
		{title: "Portfolio", section_id: "portfolio",},
	]
	
	rightMenu: any[] = [
		{title: "Client Says", section_id: "client"},
		{title: "Team", section_id: "team"},
		{title: "News", section_id: "news"},
	]
	
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
