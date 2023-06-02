import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-two',
  templateUrl: './footer-two.component.html',
  styleUrls: ['./footer-two.component.css']
})
export class FooterTwoComponent implements OnInit {
	
	title_about = "About Industry";
	description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.";
	link_title = "Usefull Link";
	form_title ="Subscribe Now";
	form_description = "If you have any questions. Subscribe to our newsletter to get our latest products.";
	
	itemList : any = [
		{list: "About Us"},
		{list: "Services"},
		{list: "Privacy Policy"},
		{list: "Projects"},
		{list: "Help Desk"},
		{list: "Shop"},
		{list: "Contact"},
	]
	

  constructor() { }

  ngOnInit(): void {
  }

}
