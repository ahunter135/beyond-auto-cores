import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-three',
  templateUrl: './team-three.component.html',
  styleUrls: ['./team-three.component.css']
})
export class TeamThreeComponent implements OnInit {

	teamlist: any[] = [
		{
			image: "agriculture/pic1.jpg",
			title: "Nashid Martines",
			position: "Director",
		},
		{
			image: "agriculture/pic2.jpg",
			title: "Konne Backfield",
			position: "Designer",
		},
		{
			image: "agriculture/pic3.jpg",
			title: "Hackson Willingham",
			position: "Developer",
		},
		{
			image: "agriculture/pic4.jpg",
			title: "Konne Backfield",
			position: "Manager",
		},
	]
		

  constructor() { }

  ngOnInit(): void {
  }

}
