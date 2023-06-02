import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var TradeZone: any;
@Component({
  selector: 'app-blog-list-two',
  templateUrl: './blog-list-two.component.html',
  styleUrls: ['./blog-list-two.component.css']
})
export class BlogListTwoComponent implements OnInit {
	
	banner : any = {
		
		pagetitle: "Confirm",
		bg_image: "bnr2.jpg",
		title: "Subscription",
	}
	

  constructor(private router: Router) { }

  ngOnInit(): void {
	  TradeZone.init();
  }

  async confirmRegistration(e: Event) {
	e.preventDefault();
	const pattern = /^.{8,}$/; // At least 8 characters
	const queryString = window.location.search;
	const registrationCode = queryString.replace('?registrationCode=', '')
	if (!registrationCode) {
		alert('Invalid registration code!');
		return false;
	} else if ((document.getElementById("password") as any).value.length == 0 && (document.getElementById("confirmPassword") as any).value.length == 0) {
		alert(
			'Missing Password and Confirm Password!');
		return false;
	} else if ((document.getElementById("password") as any).value !== (document.getElementById("confirmPassword") as any).value) {
		alert(
			'Kindly check your password. must match',
			)
		return false;
	} else if (!(document.getElementById("password") as any).value.match(pattern)) {
		alert(
			'Kindly make sure you follow password requirement',
			)
		return false;
	}

	let data = {
		"registrationCode": registrationCode,
		"password": (document.getElementById("password") as any).value,
		"confirmPassword": (document.getElementById("confirmPassword") as any).value
	}

	let postUrl = `https://bac-api.azurewebsites.net/api/v1/registrations/confirm`;
	
	let resp: any = await fetch(postUrl, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({ 'content-type': 'application/json' }),
	});
	resp = await resp.json();
	if (resp.success == 0) {
		alert(resp.data.message);
		return false;
	} else if (resp.success == 1) {
		alert(resp.data.message)
		localStorage.setItem('access_token', JSON.stringify(resp.data));

		// Do redirect to account here
		this.router.navigateByUrl('account');
		return false;
	}

	return false;}

}
