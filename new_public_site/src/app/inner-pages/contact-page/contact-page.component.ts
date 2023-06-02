import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var TradeZone: any;
declare let Stripe: any;
const stripe = Stripe('pk_live_51LhJIXABDnBRLPxLjosZbu44szycf2Vyg5ttg4NHAZSCSE5jnspO4xVC0feeS0pFHLiqVAyXlRpeCiEBWu0LL2SU00GG3gYgX4');
@Component({
	selector: 'app-contact-page',
	templateUrl: './contact-page.component.html',
	styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
	banner: any = {

		pagetitle: "Registration",
		bg_image: "bnr2.jpg",
		title: "Buy a Subscription",
	}
	cardelement: any;
	sub: any;
	affiliation: any;
	loading: boolean = false;
	constructor(private route: ActivatedRoute) {
		this.route.queryParams.subscribe(params => {
			this.sub = params.subscription;
			this.affiliation = params.affiliatecode;
		});
	}

	ngOnInit(): void {
		TradeZone.init();
		setTimeout(() => {
			console.log(this.sub);
			(document.getElementById("subscription") as any).value = this.sub;

			let inputAffContainer: any = document.getElementById('affiliation-section')
			let inputAffInput: any = document.getElementById('affiliation')

			if (this.affiliation) {
				if (inputAffContainer.classList.contains('hide-form')) inputAffContainer.classList.remove('hide-form');
				inputAffInput.value = this.affiliation;
			} else {
				if (!inputAffContainer.classList.contains('hide-form')) inputAffContainer.classList.add('hide-form');
			}
			this.accessDisplayList();
			let cardEl = document.getElementById('card-element');
			if (cardEl) {
				const elements = stripe.elements();

				let style = {
					base: {
						color: "black",
						fontFamily: 'Poppins, sans-serif',
						fontSmoothing: "antialiased",
						fontSize: "16px",
						"::placeholder": {
							color: "#ddd"
						},
						font: 'normal normal 100 48px/72px Poppins'
					},
					invalid: {
						fontFamily: 'Poppins, sans-serif',
						color: "#fa755a",
						iconColor: "#fa755a",
						font: 'normal normal 100 48px/72px Poppins'
					}
				};

				this.cardelement = elements.create("card", { style: style });
				this.cardelement.mount("#card-element");

				this.cardelement.on("change", function (event: any) {
					(document.querySelector("#payment-message") as any).textContent = event.error ? event.error.message : "";
				});
			}
		}, 550);
	}

	async postPayment(e: Event) {
		e.preventDefault();
		let firstname = (document.getElementById('firstname') as any).value;
		let lastname = (document.getElementById('lastname') as any).value;
		let email = (document.getElementById('email') as any).value;

		let data: any = {
			"userName": email,
			"firstName": firstname,
			"middleName": '',
			"lastName": lastname,
			"email": email,
			"subscription": parseInt((document.getElementById("subscription") as any).value)
		}
		if ((document.getElementById("affiliation") as any).value) {
			data['affiliateCode'] = (document.getElementById("affiliation") as any).value;
		}

		if ((!document.getElementById("subscription") as any).value) {
			alert('Please Select Type of Subscription');
			return false;
		}
		if ((document.getElementById("firstname") as any).value.length == 0) {
			alert('Please enter a first name');
			return false;
		}
		if ((document.getElementById("lastname") as any).value.length == 0) {
			alert('Please ener a last name');
			return false;
		}
		if ((document.getElementById("email") as any).value.length == 0) {
			alert('Please enter an email');
			return false;
		}

		this.loading = true;

		let token = await stripe.createToken(this.cardelement);

		try {
			if (!token.token.id) {
				alert('Card is Not Valid');
				this.loading = false;
				return false;
			} else {
				data['token'] = token.token.id;
			}
		} catch (error) {
			alert('Card is Not Valid');
			this.loading = false;
			return false;
		}
		let conf = confirm("You are about to submit a purchase");
		const postUrl = "https://bac-api.azurewebsites.net/api/v1/registrations";

		if (conf) {
			let resp: any = await fetch(postUrl, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: new Headers({ 'content-type': 'application/json' }),
			});
			resp = await resp.json();

			if (resp.success == 0) {
				alert(resp.message);
				this.loading = false;
				return false;
			} else if (resp.success == 1) {
				let clientSecret = resp.data.clientSecret;
				let registrationCode = resp.data.registrationCode;
				let customer = resp.data.stripeCustomerId
				this.confirmPayment(registrationCode, clientSecret, customer, token);
			}
		}
		return true;
	}

	accessDisplayList() {
		const className = 'show-sub'
		let e = document.getElementById("subscription") as any;
		let value = e.value;
		let goPremium = document.querySelector(".go-premium") as any;
		let goPremiumTotal = document.querySelector(".go-premium-total") as any;
		let goLifetime = document.querySelector(".go-lifetime") as any;
		let goLifetimeTotal = document.querySelector(".go-lifetime-total") as any;
		let goElite = document.querySelector(".go-elite") as any;
		let goEliteTotal = document.querySelector(".go-elite-total") as any;

		if (value === '1') {
			if (!goPremium.classList.contains(className)) {
				goPremium.classList.add(className)
				goPremiumTotal.classList.add(className)

				goLifetime.classList.remove(className)
				goLifetimeTotal.classList.remove(className)

				goElite.classList.remove(className)
				goEliteTotal.classList.remove(className)
			}
		} else if (value === '3') {
			if (!goLifetime.classList.contains(className)) {
				goLifetime.classList.add(className)
				goLifetimeTotal.classList.add(className)

				goPremium.classList.remove(className)
				goPremiumTotal.classList.remove(className)

				goElite.classList.remove(className)
				goEliteTotal.classList.remove(className)
			}
		} else if (value === '2') {
			if (!goElite.classList.contains(className)) {
				goElite.classList.add(className)
				goEliteTotal.classList.add(className)

				goLifetime.classList.remove(className)
				goLifetimeTotal.classList.remove(className)

				goPremium.classList.remove(className)
				goPremiumTotal.classList.remove(className)
			}
		}
	}

	async confirmPayment(registrationCode: any, clientSecret: any, customer: any, token: any) {
		let result;
		if (clientSecret) {
			result = await stripe.confirmCardPayment(clientSecret, {
				receipt_email: (document.getElementById('email') as any).value,
				payment_method: {
					card: this.cardelement
				}
			});
		}
		let data;

		if (clientSecret) {
			if (!result) {
				alert(
					'Something went wrong processing your payment.');
				this.loading = false;
				return false;
			}
			data = {
				"registrationCode": registrationCode,
				"paymentIntentId": result.paymentIntent.id,
				"status": result.paymentIntent.status
			}

			let postUrl = `https://bac-api.azurewebsites.net/api/v1/registrations/confirm-payment`;
			let resp: any = await fetch(postUrl, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: new Headers({ 'content-type': 'application/json' }),
			});
			resp = await resp.json();
			console.log(resp);
			if (resp.success == 1) {
				alert(resp.message);
				(document.querySelector("#payment-message-success") as any).textContent = "Payment posted, please check your email to accept invitation.";
				(document.querySelector("#subcription-label") as any).textContent = 'SUBSCRIPTION PREVIEW';
				(document.querySelector("#payment-message-success") as any).classList.remove('hide-form');
				(document.querySelector("#card-element") as any).classList.add('hide-form');
				(document.querySelector("#card-element-submit") as any).classList.add('hide-form');
			}

			this.loading = false;
		} else {
			try {
				data = {
					"registrationCode": registrationCode,
					"customer": customer,
					"token": token.token.id,
					"paymentIntentId": "null",
					"status": "null"
				}
			} catch (error) {
				console.log(error);
				alert(
					'Something went wrong processing your payment. Kindly check card details or make sure you have suffecient funds.',
				);
				this.loading = false;
				return false;
			}
			let postUrl = `https://bac-api.azurewebsites.net/api/v1/registrations/confirm-payment`;
			let resp: any = await fetch(postUrl, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: new Headers({ 'content-type': 'application/json' }),
			});
			resp = await resp.json();
			console.log(resp);
			if (resp.success == 1) {
				alert(resp.message);
				(document.querySelector("#payment-message-success") as any).textContent = "Payment posted, please check your email to accept invitation.";
				(document.querySelector("#subcription-label") as any).textContent = 'SUBSCRIPTION PREVIEW';
				(document.querySelector("#payment-message-success") as any).classList.remove('hide-form');
				(document.querySelector("#card-element") as any).classList.add('hide-form');
				(document.querySelector("#card-element-submit") as any).classList.add('hide-form');
			}

			this.loading = false;
		}

		return true;
	}
}
