import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-five',
  templateUrl: './footer-five.component.html',
  styleUrls: ['./footer-five.component.css']
})
export class FooterFiveComponent implements OnInit {
	
	about_title = "Registered Office Address";
	about_desc = "Demo address #8901 marmora road chi minh city, vietnam demo address #8901 marmora road chi minh city, vietnam";
	
	
	socialList : any = [
		{social: "facebook", icon: "fa fa-facebook"},
		{social: "linkedin", icon: "fa fa-linkedin"},
		{social: "twitter", icon: "fa fa-twitter"},
		{social: "instagram", icon: "fa fa-instagram"},
		{social: "whatsapp", icon: "fa fa-whatsapp"},
	]
	

  constructor() { }

  ngOnInit(): void {
  }

}
