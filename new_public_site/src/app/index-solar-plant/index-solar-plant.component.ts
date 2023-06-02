import { Component, OnInit } from '@angular/core';

declare var TradeZone : any;

@Component({
  selector: 'app-index-solar-plant',
  templateUrl: './index-solar-plant.component.html',
  styleUrls: ['./index-solar-plant.component.css']
})
export class IndexSolarPlantComponent implements OnInit {
	

	
	slideStore : any[] = [
		{
			date: "10Aug 2016",
			name: "RUBIN SANTRO",
			categorie: "Wind Turbines",
			title: "Quiz: How Much Do You Know about Solar Plant?",
			image: "solar/pic3.jpg",
			testimonial_image: "pic1.jpg",
		},
		{
			date: "10Aug 2016",
			name: "OSCAR WESTON",
			categorie: "Green Equipment",
			title: "Seven Innovative Approaches To Improve Your Solar Plant.",
			image: "solar/pic2.jpg",
			testimonial_image: "pic2.jpg",
		},
		{
			date: "10Aug 2016",
			name: "HENRY HUNTER",
			categorie: "Solar Panels",
			title: "Five Important Facts That You Should Know About Solar Plant.",
			image: "solar/pic1.jpg",
			testimonial_image: "pic3.jpg",
		}
	]

  constructor() { }

  ngOnInit(): void {
	  TradeZone.init();
  }

}
