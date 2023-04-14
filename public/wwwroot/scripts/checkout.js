// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = Stripe("pk_live_51LhJIXABDnBRLPxLjosZbu44szycf2Vyg5ttg4NHAZSCSE5jnspO4xVC0feeS0pFHLiqVAyXlRpeCiEBWu0LL2SU00GG3gYgX4");
let cardelement;

// Fetches a payment intent and captures the client secret
async function initialize() {
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

		cardelement = elements.create("card", { style: style });
		cardelement.mount("#card-element");

		cardelement.on("change", function (event) {
			document.querySelector("#payment-message").textContent = event.error ? event.error.message : "";
		});
	}
}

async function postPayment() {
	let data = {
		"userName": $("#email").val(),
		"firstName": $("#firstname").val(),
		"middleName": '',
		"lastName": $("#lastname").val(),
		"email": $("#email").val(),
		"subscription": parseInt($("#subscription").val())
	}

	if ($("#affiliation").val()) {
		data['affiliateCode'] = $("#affiliation").val();
	}

	if (!$("#subscription").val()) {
		validationError('Please Select Type of Subscription');
		return false;
	}
	if (!$("#firstname").val()) {
		validationError('Please Enter Firstname');
		return false;
	}
	if (!$("#lastname").val()) {
		validationError('Please Enter Lastname');
		return false;
	}
	if (!$("#email").val()) {
		validationError('Please Enter Email Address');
		return false;
	}

	if(document.querySelector("#payment-message").textContent) {
		validationError(document.querySelector("#payment-message").textContent);
		return false;
	}

	confirmModal(null, "Confirm", `You are about to submit subscription application.`)
		.then(res => {
			let postUrl = `${API_URL}/registrations`;
			const btnElement = '#pay-button';
			loadingButton(btnElement, 'Loading...', true);

			let _swal = GLBSwal
			loadingBase(_swal, 'Processing Payment', 'Please Wait...')

			jQuery.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				'type': 'POST',
				'url': postUrl,
				'data': JSON.stringify(data),
				'dataType': 'json',
				'success': function (response) {
					if (response.success === 1) {
						let clientSecret = response.data.clientSecret;
						let registrationCode = response.data.registrationCode;
						confirmPayment(registrationCode, clientSecret, btnElement);
					} else {
						_swal.fire(
							'Error!',
							response.message,
							'error'
						)
						loadingButton(btnElement, 'SUBMIT', false);
						return false;
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					loadingButton(btnElement, 'SUBMIT', false);
					document.querySelector("#payment-message").textContent = GENERAL_UNKNOWN_ERROR_MESSAGE;
					GLBSwal.close();
				}
			});
		});

	return false;
}

async function postPaymentPhotoGrades() {
	if (!$("#photoGrade").val()) {
		validationError('Please select photo grade purchase');
		return false;
	}

	if(document.querySelector("#payment-message").textContent) {
		validationError(document.querySelector("#payment-message").textContent);
		return false;
	}

	confirmModal(null, "Confirm", `Are you sure you want to purchase ${$("#photoGrade").val()} Photo Grades.`)
		.then(res => {
			const token_info = JSON.parse(localStorage.getItem('access_token'));

			let postUrl = `${API_URL}/users/grade-credit`;

			const btnElement = '#pay-button';
			loadingButton(btnElement, 'Loading...', true);

			let _swal = GLBSwal
			loadingBase(_swal, 'Processing Photo Grade Purchase', 'Please Wait...')

			jQuery.ajax({
				headers: {
					'Accept': 'application/json',
					'Authorization': `Bearer ${token_info.accessToken}`,
					'Content-Type': 'application/json'
				},
				'type': 'POST',
				'url': postUrl,
				'data': JSON.stringify($("#photoGrade").val()),
				'dataType': 'json',
				'success': function (response) {
					if (response.success === 1) {
						let clientSecret = response.data.clientSecret;
						confirmGradePayment(clientSecret, btnElement);
					} else {
						_swal.fire(
							'Error!',
							response.message,
							'error'
						)
						loadingButton(btnElement, 'SUBMIT', false);
						return false;
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					loadingButton(btnElement, 'SUBMIT', false);
					document.querySelector("#payment-message").textContent = GENERAL_UNKNOWN_ERROR_MESSAGE;
					GLBSwal.close();
				}
			});
		})

	return false;
}

async function confirmGradePayment(clientSecret, buttonEl) {
	let _swalMain = Swal;
	const token_info = JSON.parse(localStorage.getItem('access_token'));
	const result = await stripe.confirmCardPayment(clientSecret, {
		payment_method: {
			card: cardelement
		}
	});

	if (!result || !result.paymentIntent || !result.paymentIntent.id) {
		_swalMain.close();
		loadingButton(buttonEl, 'SUBMIT', false);
		validationError(
			'Something went wrong processing your payment. Kindly check card details or make sure you have suffecient funds.',
			'Failed Payment Process.')
		return false;
	}

	let data = {
		"numberOfGradeCredit": parseInt($("#photoGrade").val()),
		"paymentIntentId": result.paymentIntent.id,
		"status": result.paymentIntent.status
	}

	let postUrl = `${API_URL}/users/confirm-grade-credit`;
	await jQuery.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token_info.accessToken}`,
		},
		'type': 'POST',
		'url': postUrl,
		'data': JSON.stringify(data),
		'dataType': 'json',
		'success': function (response) {
			initialize();
			document.querySelector("#photoGrade").value = '';
			document.querySelector('#totalDisplay').textContent = `Total: $0.00`;
			document.querySelector("#payment-message-success").textContent = PAYMENT_SUCCESS_MESSAGE_GRADES;
			document.querySelector("#payment-message-success").classList.remove('hide-form');
			_swalMain.close();

			setTimeout(() => {
				document.querySelector("#payment-message-success").classList.add('hide-form');
				loadingButton(buttonEl, 'SUBMIT', false);
			}, 1000)
		},
		error: function (xhr, ajaxOptions, thrownError) {
			loadingButton(buttonEl, 'SUBMIT', false);
			_swalMain.close();
		}
	});

	getUserInfo();
	_swalMain.close();
}

async function confirmPayment(registrationCode, clientSecret, btnElement) {
	let _swalMain = Swal;
	const result = await stripe.confirmCardPayment(clientSecret, {
		receipt_email: document.getElementById('email').value,
		payment_method: {
			card: cardelement
		}
	});

	if(!result || !result.paymentIntent || !result.paymentIntent.id) {
		_swalMain.close();
		loadingButton(btnElement, 'SUBMIT', false);
		validationError(
			'Something went wrong processing your payment.',
			'Failed Payment Process.')
		return false;
	}

	let data = {
		"registrationCode": registrationCode,
		"paymentIntentId": result.paymentIntent.id,
		"status": result.paymentIntent.status
	}

	let postUrl = `${API_URL}/registrations/confirm-payment`;

	jQuery.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		'type': 'POST',
		'url': postUrl,
		'data': JSON.stringify(data),
		'dataType': 'json',
		'success': function (response) {
			document.querySelector("#payment-message-success").textContent = PAYMENT_SUCCESS_MESSAGE;
			document.querySelector("#subcription-label").textContent = 'SUBSCRIPTION PREVIEW';
			document.querySelector("#payment-message-success").classList.remove('hide-form');
			document.querySelector("#card-element").classList.add('hide-form');
			document.querySelector("#card-element-submit").classList.add('hide-form');

			// Disable all element post success payment.
			$("#email").prop("disabled", true);
			$("#firstname").prop("disabled", true);
			$("#lastname").prop("disabled", true);
			$("#email").prop("disabled", true);
			$("#subscription").prop("disabled", true);
			_swalMain.close();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			loadingButton(btnElement, 'SUBMIT', false);
			_swalMain.close();
		}
	});

	_swalMain.close();
}

async function confirmRegistration() {
	const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const queryString = window.location.search;
	const registrationCode = queryString.replace('?registrationCode=', '')

	if (!registrationCode) {
		GLBSwal.fire(
			'Invalid registration code!',
			'Kindly check your email for invitation.',
			'error'
		)
		return false;
	} else if (!$("#password").val() && !$("#confirmPassword").val()) {
		validationError(
			'Kindly set up your password.',
			'Missing Password and Confirm Password!')
		return false;
	} else if ($("#password").val() !== $("#confirmPassword").val()) {
		validationError(
			'Kindly check your password. must match',
			'Missmatch Password!')
		return false;
	} else if (!$("#password").val().match(pattern)) {
		validationError(
			'Kindly make sure you follow password requirement',
			'Password Requirements!')
		return false;
	}

	let data = {
		"registrationCode": registrationCode,
		"password": $("#password").val(),
		"confirmPassword": $("#confirmPassword").val()
	}

	let postUrl = `${API_URL}/registrations/confirm`;
	let _swal = GLBSwal;
	let _swalMain = Swal;

	loadingBase(_swal, 'Confirming Account Registration', 'Please Wait...')

	jQuery.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		'type': 'POST',
		'url': postUrl,
		'data': JSON.stringify(data),
		'dataType': 'json',
		'success': function (response) {
			if (response && response.success === 0) {
				_swal.fire(
					'Error!',
					response.data.message,
					'error'
				)
				return false;
			} else if (response && response.success == 1) {
				localStorage.setItem('access_token', JSON.stringify(response.data))
				window.location.href = `${window.location.origin}/account`;
				_swalMain.close();
				return false;
			}
			_swalMain.close();

		},
		error: function (xhr, ajaxOptions, thrownError) {
			_swalMain.close();
			_swal.fire(
				'Error!',
				'Something went wrong during confirmation, please contact administrator.',
				'error'
			);
		}
	});

	_swalMain.close();
	return false;
}