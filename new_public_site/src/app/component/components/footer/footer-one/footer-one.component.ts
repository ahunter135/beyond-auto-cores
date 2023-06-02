import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.css']
})
export class FooterOneComponent implements OnInit {
	
	about_title = "ABOUT US";
	description = "Contrary to popular belief, Lorem simply random text. It has roots in a piece of classical Latin literature.";
	
	schedule_title = "OPENING HOURS";
	
	contactList : any = [
		{
			icon: "ti ti-location-pin",
			address: "Address 20 , New York 10010",
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
	

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openTerms(ev: Event) {
	ev.preventDefault();
	this.router.navigate(['terms']);
  }

  openPrivacy(ev: Event) {}

}
