import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var TradeZone: any;

@Component({
	selector: 'app-index-agriculture',
	templateUrl: './index-agriculture.component.html',
	styleUrls: ['./index-agriculture.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class IndexAgricultureComponent implements OnInit {

	menuList: any[] = [
		{
			title: "Home",
			//section_id: "home",
			navList: [
				{ "title": "construction", "url": "/" },
				{ "title": "Home Food Industry", "url": "/index-food-factory" },
				{ "title": "Home Agriculture", "url": "/index-agriculture" },
				{ "title": "Home Steel Plant", "url": "/index-steel-plant" },
				{ "title": "Home Solar Plant", "url": "/index-solar-plant" },
			]
		},
		{ title: "Services", section_id: "services", },
		{ title: "About Us", section_id: "about-us", },
		{ title: "Client Says", section_id: "client", },
		{ title: "Projects", section_id: "projects", },
		{ title: "Team", section_id: "team", },
		{ title: "News", section_id: "news", },

	]

	constructor() { }

	ngOnInit(): void {
		//TradeZone.init();
	}

	async loginUser(e: Event) {
		e.preventDefault();
		if ((document.getElementById("username") as any).value.length == 0) {
			alert('Please Enter Username');
			return false;
		}

		if ((document.getElementById("password") as any).value.length == 0) {
			alert('Please Password');
			return false;
		}

		const btnElement = '#login-button';
		let response: any = await fetch(`https://bac-api.azurewebsites.net/api/v1/users/login`, {
			method: "POST",
			body: JSON.stringify({
				"userName": (document.getElementById("username") as any).value,
				"password": (document.getElementById("password") as any).value,
				"validateSubscription": false
			}),
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
		});
		response = await response.json();

		if (response && response.success == 1) {
			localStorage.setItem('access_token', JSON.stringify(response.data))
			window.location.href = `${window.location.origin}/account`;
		} else if (response && response.success == 0) {
			alert(response.message);
		}


		return false;
	}

}
