import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
	
	contactList : any = [
		{
			icon: "fa fa-map-marker",
			title: "Address", 
			description: "123 West Street, Melbourne Victoria 3000 Australia",
		},
		{
			icon: "fa fa-envelope-o",
			title: "Email", 
			description: "info@example.com",
		},
		{
			icon: "fa fa-phone",
			title: "Phone", 
			description: "+61 3 8376 6284",
		},
	]

  constructor() { }

  ngOnInit(): void {
  }

}
