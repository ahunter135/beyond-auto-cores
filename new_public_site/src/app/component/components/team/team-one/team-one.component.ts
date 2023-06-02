import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-one',
  templateUrl: './team-one.component.html',
  styleUrls: ['./team-one.component.css']
})
export class TeamOneComponent implements OnInit {
	
	subtitle = "OUR EXPERTS";
	title = "Meet The Team";
	
	team : any = [
		{
			image: "pic7.jpg",
			title: "Nashid Martines",
			sociallist: [
				{icon: "<a class='site-button fa fa-facebook' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-twitter' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-linkedin' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-pinterest' href='javascript:void(0);'></a>"},
			]
		},
		{
			image: "pic4.jpg",
			title: "Konne Backfield",
			sociallist: [
				{icon: "<a class='site-button fa fa-facebook' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-twitter' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-linkedin' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-pinterest' href='javascript:void(0);'></a>"},
			]
		},
		{
			image: "pic5.jpg",
			title: "Hackson Willingham",
			sociallist: [
				{icon: "<a class='site-button fa fa-facebook' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-twitter' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-linkedin' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-pinterest' href='javascript:void(0);'></a>"},
			]
		},
		{
			image: "pic6.jpg",
			title: "Konne Backfield",
			sociallist: [
				{icon: "<a class='site-button fa fa-facebook' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-twitter' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-linkedin' href='javascript:void(0);'></a>"},
				{icon: "<a class='site-button fa fa-pinterest' href='javascript:void(0);'></a>"},
			]
		}
	]

  constructor() { }

  ngOnInit(): void {
  }

  async emailTo(ev: Event) {
	ev.preventDefault();
	let name = (document.getElementById('contact-mail-name') as any).value;
	let senderMail = (document.getElementById('contact-mail-email') as any).value;
	let content = (document.getElementById('contact-mail-content') as any).value;

	let postUrl = `https://bac-api.azurewebsites.net/api/v1/supports/send-message`
	let response: any = await fetch(postUrl, {
		method: "POST",
		body: JSON.stringify({
			name: name,
			email: senderMail,
			message: content,
		}),
		headers: new Headers({ 'Content-Type': 'application/json' })
	});
	response = await response.json();
	if (response.success == 1) {
		alert("Message Sent");
	} else {
		alert("Failed submission");
	}
  }

}
