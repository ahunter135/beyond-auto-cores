import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-four',
  templateUrl: './about-four.component.html',
  styleUrls: ['./about-four.component.css']
})
export class AboutFourComponent implements OnInit {
	
		subtitle= "Five Ugly Truth About Steel Industry.";
		title= "About Steel Industry";
		description= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

		itemList: any[] = [
			{list: "This Is How Steel Industry Will Look Like In 10 Years Time."},
			{list: "The Rank Of Steel Industry In Consumer's Market."},
			{list: "You Will Never Believe These Bizarre Truth Of Steel Industry."},
		]

  constructor() { }

  ngOnInit(): void {
  }

}
