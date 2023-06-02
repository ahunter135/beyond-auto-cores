import { Component, OnInit } from '@angular/core';
declare var TradeZone: any;
declare let Stripe: any;
const stripe = Stripe('pk_live_51LhJIXABDnBRLPxLjosZbu44szycf2Vyg5ttg4NHAZSCSE5jnspO4xVC0feeS0pFHLiqVAyXlRpeCiEBWu0LL2SU00GG3gYgX4');

@Component({
	selector: 'app-blog-list-one',
	templateUrl: './blog-list-one.component.html',
	styleUrls: ['./blog-list-one.component.css']
})
export class BlogListOneComponent implements OnInit {

	banner: any = {

		pagetitle: "Account",
		bg_image: "bnr1.jpg",
		title: "Account",
	}
	files: any;
	cardelement: any;
	cardelementTwo: any;
	
	total: any;
	constructor() { }

	ngOnInit(): void {
		TradeZone.init();
		setTimeout(() => {

			console.log(localStorage.getItem('access_token'));
			if (localStorage.getItem('access_token')) {
				this.getUserInfo();
			} else {
				window.location.href = `${window.location.origin}/`;
			}

			if (true) {
				const queryString = window.location.search;
				const affiliateCode = queryString.replace('?confirmaffiliate=', '');
				setTimeout(() => {
					this.confirmAffiliate(affiliateCode);
				}, 1000)
			}

			(document.querySelector('img#account-image-display') as any)
				.addEventListener('click', function () {
					(document.querySelector('input#account-image-uploader[type="file"]') as any).click()
				});

			this.initialize();

			(document.querySelector('#subscription') as any).addEventListener('change', (targetElement: any) => {
				let currentUserInfo = localStorage.getItem('currentUserInfo') as string;
				currentUserInfo = JSON.parse(currentUserInfo);
				const className = 'hide-form'
				let e = document.getElementById("subscription") as any;
				let value = e.value;
				let goPremium = document.querySelector(".subpremium") as any;
				let goLifetime = document.querySelector(".sublifetime") as any;
				let goElite = document.querySelector(".subelite") as any;

				if (value === '1') {
					goPremium.classList.remove(className)
					goLifetime.classList.add(className)
					goElite.classList.add(className)
				} else if (value === '3') {
					goLifetime.classList.remove(className)
					goPremium.classList.add(className)
					goElite.classList.add(className)
				} else if (value === '2') {
					goElite.classList.remove(className)
					goLifetime.classList.add(className)
					goPremium.classList.add(className)
				}
			})

		}, 500);
	}

	photoChange() {
		let totalDisplay: any = document.querySelector('#totalDisplay');
		let photoGrade = document.querySelector('#photoGrade') as any;
		let e = photoGrade;
		let total: number = 0;
		if (e.value == 1) total = 2;
		else if (e.value == 5) total = 8.75;
		else if (e.value == 10) total = 15;
		else if (e.value == 50) total = 60;
		else if (e.value == 100) total = 110;
		this.total = total;
		totalDisplay.textContent = `Total: ${new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(total)}`;
	}

	async getUserInfo(userId: any = null) {
		const token_info = JSON.parse(localStorage.getItem('access_token') as string);
		let postUrl = `https://bac-api.azurewebsites.net/api/v1/users/${userId ? userId : token_info.id}`
		let response: any = await fetch(postUrl, {
			method: 'GET',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token_info.accessToken}`
			}),
		});
		response = await response.json();

		if (response && response.success == 1) {
			localStorage.setItem('currentUserInfo', JSON.stringify(response.data))
			let btnEditProfile = document.querySelector('#btn-edit-profile') as any;
			let fname = document.querySelector('.fname') as any;
			let lname = document.querySelector('.lname') as any;
			let email = document.querySelector('.email') as any;
			let subscription = document.querySelector('.subscription') as any;
			let gradeCredits = document.querySelector('#grade-credits') as any;
			let displayAccountPhoto = document.querySelector('#display-account-photo') as any;

			fname.textContent = response.data.firstName;
			lname.textContent = response.data.lastName;
			email.textContent = response.data.email;
			gradeCredits.textContent = response.data.gradeCredits;

			if (response.data.photo)
				displayAccountPhoto.src = response.data.fileUrl;

			if (response.data.subscription === 1)
				subscription.textContent = 'Premium Subscription';
			if (response.data.subscription === 2)
				subscription.textContent = 'Elite Subscription';
			if (response.data.subscription === 3)
				subscription.textContent = 'Platinum Subscription';

			(document.querySelector('#subscription') as any).value = JSON.stringify(response.data.subscription);


			(document.querySelector('#change-sub-trigger') as any).classList.remove('hide-form');

			let affEnabled = document.querySelector('#affiliate-btn-enable') as any;
			let affiliate = document.querySelector('.affiliate > div') as any;
			let affiliateInput = document.querySelector('#affiliate-link') as any;
			let affiliateBtnShare = document.querySelector('#affiliate-btn-share') as any;
			let affiliateBtnEnroll = document.querySelector('#affiliate-btn-enroll') as any;

			affiliateInput.value = response.data.affiliateLink;

			if (!response.data.uuid) {
				affiliate.textContent = 'Not Enrolled'
				if (!affiliateBtnShare.classList.contains('hide-form'))
					affiliateBtnShare.classList.add('hide-form');
				if (!affEnabled.classList.contains('hide-form'))
					affEnabled.classList.add('hide-form');
				if (affiliateBtnEnroll.classList.contains('hide-form'))
					affiliateBtnEnroll.classList.remove('hide-form');
			} else if (response.data.uuid && !response.data.affiliateEnable) {
				affEnabled.textContent = 'Enable'
				affiliate.textContent = 'Feature Disabled'

				if (affEnabled.classList.contains('hide-form'))
					affEnabled.classList.remove('hide-form');

				//$('#affiliate-btn-share').attr('disabled', 'disabled');
				//$('#affiliate-btn-enroll').attr('disabled', 'disabled');
				if (!affiliateBtnShare.classList.contains('hide-form'))
					affiliateBtnShare.classList.add('hide-form');
				if (!affiliateBtnEnroll.classList.contains('hide-form'))
					affiliateBtnEnroll.classList.add('hide-form');
			} else {
				affEnabled.textContent = 'Disable';
				affEnabled.style.display = 'none';
				affiliate.textContent = response.data.affiliateLink ? 'Enrolled' : 'Not Enrolled'

				if (affEnabled.classList.contains('hide-form'))
					affEnabled.classList.remove('hide-form');

				//	$('#affiliate-btn-share').removeAttr('disabled');
				//$('#affiliate-btn-enroll').removeAttr('disabled');
				if (response.data.affiliateLink) {
					affiliateBtnShare.classList.remove('hide-form');
					if (!affiliateBtnEnroll.classList.contains('hide-form'))
						affiliateBtnEnroll.classList.add('hide-form');
				} else {
					affiliateBtnEnroll.classList.remove('hide-form');
					if (!affiliateBtnShare.classList.contains('hide-form'))
						affiliateBtnShare.classList.add('hide-form');
				}
			}
			const hideForm = 'hide-form';

			let cancelBtn = document.querySelector('#cancel-sub-button') as any;
			let enableBtn = document.querySelector('#enable-sub-button') as any;
			if (response.data.subscriptionIsCancel === true) {
				if (!cancelBtn.classList.contains(hideForm))
					cancelBtn.classList.add(hideForm)
				if (cancelBtn.classList.contains(hideForm))
					enableBtn.classList.remove(hideForm)
			} else {
				if (cancelBtn.classList.contains(hideForm))
					cancelBtn.classList.remove(hideForm)
				if (!cancelBtn.classList.contains(hideForm))
					enableBtn.classList.add(hideForm)
			}

			btnEditProfile.classList.remove(hideForm)
			return Promise.resolve(response.data)
		} else {
			if (response.ErrorCode == 403) {
				alert(response.Message);

				window.localStorage.clear();
				window.location.href = `${window.location.origin}/`;
				return false
			}
			alert(response.Message);

			return false;
		}
	}

	async confirmAffiliate(code: any) {
		const token_info = JSON.parse(localStorage.getItem('access_token') as any);
		let response: any = await fetch(`https://bac-api.azurewebsites.net/api/v1/affiliates/confirm-join?stripeAccountId=${code})`,
			{
				method: 'POST',
				headers: new Headers({
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token_info.accessToken}`
				}),
			});
		response = await response.json();
		console.log(response);
		if (response.data.success === 1) {
			alert("Success");
			setTimeout(() => {
				window.location.href = '/account';
			}, 333)
		}
		return false;
	}

	openStripeEdit() {
		window.open('https://billing.stripe.com/p/login/8wM8yW5E821V4x23cc');
	}

	async initialize() {
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
	}

	async postPaymentPhotoGrades(ev: Event) {
		ev.preventDefault();
		if ((document.querySelector('#photoGrade') as any).value) {
			let conf = await confirm("Are you sure you would like to proceed with the purchase?");
			const token_info = JSON.parse(localStorage.getItem('access_token') as string);

			let postUrl = `https://bac-api.azurewebsites.net/api/v1/users/grade-credit`;
			if (conf) {
				let response: any = await fetch(postUrl, {
					method: 'POST',
					headers: new Headers({
						'Accept': 'application/json',
						'Authorization': `Bearer ${token_info.accessToken}`,
						'Content-Type': 'application/json'
					}),
					body: JSON.stringify((document.querySelector('#photoGrade') as any).value)
				});

				response = await response.json();
				if (response.success === 1) {
					let clientSecret = response.data.clientSecret;
					const token_info = JSON.parse(localStorage.getItem('access_token') as string);
					const result = await stripe.confirmCardPayment(clientSecret, {
						payment_method: {
							card: this.cardelement
						}
					});

					if (!result || !result.paymentIntent || !result.paymentIntent.id) {

						alert(
							'Something went wrong processing your payment. Kindly check card details or make sure you have suffecient funds.',
						)
						return false;
					}

					let data = {
						"numberOfGradeCredit": parseInt((document.querySelector('#photoGrade') as any).value),
						"paymentIntentId": result.paymentIntent.id,
						"status": result.paymentIntent.status
					}

					let postUrl = `https://bac-api.azurewebsites.net/api/v1/users/confirm-grade-credit`;
					response = await fetch(postUrl, {
						method: 'POST',
						headers: new Headers({
							'Accept': 'application/json',
							'Authorization': `Bearer ${token_info.accessToken}`,
							'Content-Type': 'application/json'
						}),
						body: JSON.stringify(data)
					});

					response = await response.json();
					if (response.success == 1) {
						(document.querySelector("#photoGrade") as any).value = '';
						(document.querySelector('#totalDisplay') as any).textContent = `Total: $0.00`;
						(document.querySelector("#payment-message-success") as any).textContent = "Purchase Complete";
						(document.querySelector("#payment-message-success") as any).classList.remove('hide-form');
						setTimeout(() => {
							(document.querySelector("#payment-message-success") as any).classList.add('hide-form');
						}, 1000)
					} else {
						alert(response.message);
					}
				} else {
					alert(response.message);
				}
			}
		} else {
			alert("Please select a photo grade amount")
		}
		return false;
	}

	async copyAffiliateLink(ev: Event) {
		let affLink = (document.getElementById('affiliate-link') as any).value;
		console.log(affLink);
		await navigator.clipboard.writeText(affLink);
		alert("Share Code Copied");
	}

	async onCancelSubscription(flag: boolean, ev: Event) {
		let conf = await confirm("Are you sure you would like to cancel your subscription?");

		if (conf) {
			const token_info = JSON.parse(localStorage.getItem('access_token') as string);
			const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo') as string);
			let postUrl = `https://bac-api.azurewebsites.net/api/v1/registrations/${currentUserInfo.id}/enable-subscription?enable=${flag}`;
			let response: any = await fetch(postUrl, {
				method: "PUT",
				body: JSON.stringify({ enable: flag }),
				headers: new Headers({
					'Authorization': `Bearer ${token_info.accessToken}`,
					'Content-Type': 'application/json'
				})
			});
			response = await response.json();
			console.log(response);
			if (response.success === 1) {
				this.getUserInfo();
			} else {
				alert("Something went wrong");
			}
		}
	}

	async onChangeSubsriptionToogle() {
		const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo') as string);
		let elCont = document.getElementById('mod-subscription') as any;
		if (elCont.classList.contains('hide-form')) {
			elCont.classList.remove('hide-form');
		} else {
			elCont.classList.add('hide-form');
		}
	}

	async onUpdateSubscription(ev: Event) {
		ev.preventDefault()
		let conf = await confirm("Are you sure you want to continue purchase?");
		if (conf) {
			const token_info = JSON.parse(localStorage.getItem('access_token') as string);
			let postUrl = `https://bac-api.azurewebsites.net/api/v1/registrations/subscription`;
			let subscription = (document.getElementById("subscription") as any).value;
			let data = parseFloat(subscription);
			let response: any = await fetch(postUrl, {
				method: "PUT",
				body: JSON.stringify(data),
				headers: new Headers({
					'Authorization': `Bearer ${token_info.accessToken}`,
					'Content-Type': 'application/json'
				})
			});
			response = await response.json();
			if (response.success === 1) {
				alert("Subscription Changed!");
				this.onChangeSubsriptionToogle();
				window.location.reload();
			} else {
				alert("Something went wrong");
			}
		}
	}

}
