import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-five',
  templateUrl: './team-five.component.html',
  styleUrls: ['./team-five.component.css']
})
export class TeamFiveComponent implements OnInit {

	teamlist: any[] = [
		{
			image: "solar/pic1.jpg",
			title: "Nashid Martines",
			position: "Director",
		},
		{
			image: "solar/pic2.jpg",
			title: "Konne Backfield",
			position: "Designer",
		},
		{
			image: "solar/pic3.jpg",
			title: "Hackson Willingham",
			position: "Developer",
		},
		{
			image: "solar/pic4.jpg",
			title: "Konne Backfield",
			position: "Manager",
		},
	]

  constructor() { }

  ngOnInit(): void {
  }

}
