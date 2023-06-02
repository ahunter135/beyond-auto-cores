import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-four',
  templateUrl: './footer-four.component.html',
  styleUrls: ['./footer-four.component.css']
})
export class FooterFourComponent implements OnInit {
	
	about_title = "ABOUT US";
	about_desc = "Contrary to popular belief, Lorem simply random text. It has roots in a piece of classical Latin literature.";
	
	schedule_title = "OPENING HOURS";
	
	contactList : any = [
		{
			icon: "ti ti-location-pin",
			address: "Address20 , New York 10010",
		},
		{
			icon: "ti ti-mobile",
			address: "Phone 0800-123456",
		},
		{
			icon: "ti ti-email",
			address: "Email info@example.com",
		},
	]
	
	post_title = "LATEST POST";
	latestPost : any = [
		{
			image: "pic1.jpg",
			title: "Helping you and your house become better.",
			author_name :"By <a href='javascript:void(0);'>Jone</a>",
			comment: "28",
		},
		{
			image: "pic1.jpg",
			title: "Creating quality urban lifestyles.",
			author_name :"By <a href='javascript:void(0);'>Jone</a>",
			comment: "28",
		},
	]
	
	company_title = "COMPANY";
	serviceList: any = [
		{title: "About Us"},
		{title: "Blog"},
		{title: "Services"},
		{title: "Privacy Policy"},
		{title: "Projects"},
	]

  constructor() { }

  ngOnInit(): void {
  }

}
