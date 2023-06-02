import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-three',
  templateUrl: './footer-three.component.html',
  styleUrls: ['./footer-three.component.css']
})
export class FooterThreeComponent implements OnInit {
	
	about_title = "Company";
	
	serviceList : any = [
		{list: "About Us"},
		{list: "Blog"},
		{list: "Services"},
		{list: "Privacy Polic"},
		{list: "Projects"},
	]
	
	link_title = "Useful Link";
	
	linkList : any = [
		{list: "Help Desk"},
		{list: "Shop"},
		{list: "Contact"},
		{list: "Portfolio"},
		{list: "Team"},
	]

  constructor() { }

  ngOnInit(): void {
  }

}
