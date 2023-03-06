let cardelementSubscription;
const hideForm = 'hide-form';

const loginUser = async () => {

	if (!$("#username").val()) {
		validationError('Please Enter Username');
		return false;
	}

	if (!$("#password").val()) {
		validationError('Please Password');
		return false;
	}

	const btnElement = '#login-button';
	let _swal = GLBSwal;

	loadingBase(_swal, 'Preparing Account', 'Please Wait...')
	loadingButton(btnElement, 'Loading...', true);
	jQuery.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		'type': 'POST',
		'url': `${API_URL}/users/login`,
		'data': JSON.stringify({
			"userName": $('#username').val(),
			"password": $('#password').val(),
			"validateSubscription": false

		}),
		'dataType': 'json',
		'success': function (response) {
			if (response && response.success == 1) {
				localStorage.setItem('access_token', JSON.stringify(response.data))
				window.location.href = `${window.location.origin}/account`;
			} else if (response && response.success == 0) {
				_swal.fire(
					'Error!',
					response.message,
					'error'
				)
			}

			loadingButton(btnElement, 'SUBMIT', false);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			_swal.fire(
				'Error!',
				"Something went wrong",
				'error'
			)
			loadingButton(btnElement, 'SUBMIT', false);
		}
	});

	return false;
}

const logoutUser = async () => {
	let _swal = GLBSwal;
	const token_info = JSON.parse(localStorage.getItem('access_token'));
	jQuery.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token_info.accessToken}`
		},
		'type': 'POST',
		'url': `${API_URL}/users/logout`,
		'data': '0',
		'dataType': 'json',
		'success': function (response) {
			localStorage.removeItem('access_token')
			localStorage.removeItem('currentUserInfo')
			redirectHome();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			_swal.fire(
				'Error!',
				"Something went wrong",
				'error'
			)
		}
	});

	return false;
}

const getUserInfo = async (userId) => {
	const token_info = JSON.parse(localStorage.getItem('access_token'));
	let _swal = GLBSwal;
	jQuery.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token_info.accessToken}`
		},
		'type': 'GET',
		'url': `${API_URL}/users/${userId ? userId : token_info.id}`,
		'dataType': 'json',
		'success': (response) => {
			if (response && response.success == 1) {
				localStorage.setItem('currentUserInfo', JSON.stringify(response.data))
				let btnEditProfile = document.querySelector('#btn-edit-profile');
				let fname = document.querySelector('.fname');
				let lname = document.querySelector('.lname');
				let email = document.querySelector('.email');
				let subscription = document.querySelector('.subscription');
				let gradeCredits = document.querySelector('#grade-credits');
				let displayAccountPhoto = document.querySelector('#display-account-photo');

				fname.textContent = response.data.firstName;
				lname.textContent = response.data.lastName;
				email.textContent = response.data.email;
				gradeCredits.textContent = response.data.gradeCredits;

				if (response.data.photo)
					displayAccountPhoto.src = response.data.fileUrl;

				if (response.data.subscription === 1)
					subscription.textContent = 'Premium Subscription'
				if (response.data.subscription === 2)
					subscription.textContent = 'Elite Subscription'
				if (response.data.subscription === 3)
					subscription.textContent = 'Lifetime Subscription'

				document.querySelector('#subscription').value = JSON.stringify(response.data.subscription)

				if (response.data.subscription === 3)
					document.querySelector('#change-sub-trigger').classList.add('hide-form')
				else
					document.querySelector('#change-sub-trigger').classList.remove('hide-form')

				let affEnabled = document.querySelector('#affiliate-btn-enable');
				let affiliate = document.querySelector('.affiliate > div');
				let affiliateInput = document.querySelector('#affiliate-link');
				let affiliateBtnShare = document.querySelector('#affiliate-btn-share');
				let affiliateBtnEnroll = document.querySelector('#affiliate-btn-enroll');

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

					$('#affiliate-btn-share').attr('disabled', 'disabled');
					$('#affiliate-btn-enroll').attr('disabled', 'disabled');
					if (!affiliateBtnShare.classList.contains('hide-form'))
						affiliateBtnShare.classList.add('hide-form');
					if (!affiliateBtnEnroll.classList.contains('hide-form'))
						affiliateBtnEnroll.classList.add('hide-form');
				} else {
					affEnabled.textContent = 'Disable'
					affiliate.textContent = response.data.affiliateLink ? 'Enrolled' : 'Not Enrolled'

					if (affEnabled.classList.contains('hide-form'))
						affEnabled.classList.remove('hide-form');
					
					$('#affiliate-btn-share').removeAttr('disabled');
					$('#affiliate-btn-enroll').removeAttr('disabled');
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

				let cancelBtn = document.querySelector('#cancel-sub-button');
				let enableBtn = document.querySelector('#enable-sub-button');
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
				_swal.fire(
					'Error!',
					response.message,
					'error'
				)
				return false;
			}
		},
		error: (xhr, ajaxOptions, thrownError) => {
			//_swal.fire(
			//	'Error!',
			//	"Something went wrong",
			//	'error'
			//);

			localStorage.removeItem('access_token')
			localStorage.removeItem('currentUserInfo')
			redirectHome();
		}
	});
	return false;
}

const confirmAffiliate = async (code) => {
	const token_info = JSON.parse(localStorage.getItem('access_token'));
	let gldSwlUI = GLBSwal, _swal = gldSwlUI;
	loadingBase(_swal, 'Affiliate Enrollment Processing', 'Please Wait...')
	await jQuery.ajax({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token_info.accessToken}`
		},
		'type': 'POST',
		'url': `${API_URL}/affiliates/confirm-join?stripeAccountId=${code}`,
		'dataType': 'json',
		'success': (response) => {
			_swal.close();
			if (response.data.success === 1) {
				_swal.fire(
					'Affiliated',
					"Enrollment Complete",
					'Success'
				)
				setTimeout(() => {
					window.location.href = '/account';
				}, 333)
			} else {
				_swal.fire(
					'Failed',
					"Enrollment Confirmation Failed.",
					'error'
				)
			}
		},
		error: (xhr, ajaxOptions, thrownError) => {
			let response = xhr ? JSON.parse(xhr.responseText) : null;
			_swal.close();
			_swal.fire(
				'Error!',
				response && response.errors && response.errors.id && response.errors.id[0] || "Something went wrong",
				'error'
			)
		}
	});
	return false;
}

const onEnrollAffiliate = (_getAffliate) => {
	confirmModal(null, "Confirm", `Are you sure you want to continue enrollment?`)
		.then(res => {
			const token_info = JSON.parse(localStorage.getItem('access_token'));
			const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
			let _swal = GLBSwal;

			loadingBase(_swal, 'Preparing affiliate enrollment', 'You will be redirected to enrollment form in just a moment, Please Wait...')
			jQuery.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token_info.accessToken}`
				},
				'type': 'POST',
				'url': `${API_URL}/affiliates/${currentUserInfo.id}/join`,
				'dataType': 'json',
				'success': (response) => {
					if (response && response.success == 1) {
						window.location.href = response.data.url;
					} else {
						_swal.fire(
							'Error!',
							response.message,
							'error'
						)
						return false;
					}
				},
				error: (xhr, ajaxOptions, thrownError) => {
					_swal.fire(
						'Error!',
						"Something went wrong",
						'error'
					)
				}
			});
		})

	return false;
}

const onToogleAccessAffiliate = () => {
	const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
	const token_info = JSON.parse(localStorage.getItem('access_token'));
	let postUrl = `${API_URL}/affiliates/${currentUserInfo.id}/enable?isenable=${!currentUserInfo.affiliateEnable}`;
	let _swalMain = Swal;

	loadingBase(_swalMain, `${currentUserInfo.affiliateEnable ? 'Disabling' : 'Enabling'} Affiliate Link`, 'Please Wait...')
	axios.post(postUrl, {}, {
		headers: {
			'Authorization': `Bearer ${token_info.accessToken}`
		}
	})
		.then(function (response) {
			getUserInfo();
			_swalMain.close();
		})
		.catch(function (error) {
			_swalMain.close();
		});
}

const editEnable = () => {
	const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
	let editContainer = document.querySelector(".edit-account-details");
	let viewContainer = document.querySelector(".view-account-details");
	if (editContainer.classList.contains('hide-form')) {
		editContainer.classList.remove('hide-form')
		$("#account-firstname").val(currentUserInfo.firstName);
		$("#account-lastname").val(currentUserInfo.lastName);
		$("#account-email").val(currentUserInfo.email);
		$("#account-image-display").attr('src', currentUserInfo.fileUrl);
		if (!viewContainer.classList.contains('hide-form')) {
			viewContainer.classList.add('hide-form')
		}
	}
}

const cancelEdit = () => {
	let editContainer = document.querySelector(".edit-account-details");
	let viewContainer = document.querySelector(".view-account-details");
	loadingButton('#btn-cancel-edit-profile', 'Cancel', false);
	loadingButton('#btn-edit-save-profile', 'Save', false);
	if (viewContainer.classList.contains('hide-form')) {
		viewContainer.classList.remove('hide-form')
		if (!editContainer.classList.contains('hide-form')) {
			editContainer.classList.add('hide-form')
		}
	}
}

const saveEdit = async () => {
	if (!$("#account-firstname").val()) {
		validationError(
			'Kindly enter your firstname.',
			'Missing Firstname!')
		return false;
	}

	if (!$("#account-lastname").val()) {
		validationError(
			'Kindly enter your lastname.',
			'Missing lastname!')
		return false;
	}

	if (!$("#account-email").val()) {
		validationError(
			'Kindly enter your email.',
			'Missing email!')
		return false;
	} else {
		let mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!$("#account-email").val().match(mailformat)) {
			validationError(
				'Kindly check your email.',
				'Email seems to be invalid!')
			return false;
		}
	}

	confirmModal(null, "Confirm", `Are you sure you want to proceed with your changes?`)
		.then(res => {
			const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
			const token_info = JSON.parse(localStorage.getItem('access_token'));
			let img = document.querySelector('input#account-image-uploader');
			let editForm = document.querySelector('#edit-account-form');

			let data = {
				id: currentUserInfo.id,
				firstName: $("#account-firstname").val(),
				lastName: $("#account-lastname").val(),
				email: $("#account-email").val(),
				role: currentUserInfo.role,
				subscription: currentUserInfo.subscription,
				tier1AdminEnabled: currentUserInfo.tier1AdminEnabled,
				tier1PercentLevel: currentUserInfo.tier1PercentLevel,
				tier1UserEnabled: currentUserInfo.tier1UserEnabled,
				isUpdatePhoto: (img && img.files && img.files[0]) ? true : false,
			}

			if (currentUserInfo.margin)
				data.margin = currentUserInfo.margin;

			let postUrl = `${API_URL}/users?${new URLSearchParams(data).toString()}`;
			let formData = new FormData(editForm);

			if (img && img.files && img.files[0])
				formData.append('photo', img.files[0]);
			else
				formData.append('photo', '');

			let _swal = GLBSwal;
			let _swalMain = Swal;

			loadingBase(_swal, 'Saving Account Details', 'Please Wait...')
			loadingButton('#btn-cancel-edit-profile', 'Loading...', true);
			loadingButton('#btn-edit-save-profile', 'Loading...', true);

			jQuery.ajax({
				'type': 'PUT',
				'method': 'PUT',
				'url': postUrl,
				'body': formData,
				'processData': false,
				'contentType': false,
				'headers': {
					'Authorization': `Bearer ${token_info.accessToken}`,
					'Content-Type': `multipart/form-data`,
				},
				'success': (response) => {
					if (response && response.success === 0) {
						_swal.fire(
							'Error!',
							response.message || response.data.message,
							'error'
						)
						loadingButton('#btn-cancel-edit-profile', 'Cancel', false);
						loadingButton('#btn-edit-save-profile', 'Save', false);
						return false;
					} else if (response && response.success == 1) {
						if (img && img.files && img.files[0]) saveAvatar(formData);
						localStorage.setItem('currentUserInfo', JSON.stringify(response.data))
						getUserInfo();
						cancelEdit();
						return false;
					}
					_swalMain.close();
				},
				'error': (xhr, ajaxOptions, thrownError) => {
					_swalMain.close();
					loadingButton('#btn-cancel-edit-profile', 'Cancel', false);
					loadingButton('#btn-edit-save-profile', 'Save', false);
				}
			});

			_swalMain.close();
		})

	return false;
}

const saveAvatar = async (formData) => {
	const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
	const token_info = JSON.parse(localStorage.getItem('access_token'));
	let postUrl = `${API_URL}/users/uploadphoto?userId=${currentUserInfo.id}`;
	let _swalMain = Swal;

	axios.post(postUrl, formData, {
		headers: {
			'Authorization': `Bearer ${token_info.accessToken}`
		}
	})
		.then(function (response) {
			getUserInfo();
			cancelEdit();
			_swalMain.close();
		})
		.catch(function (error) {
			_swalMain.close();
		});
}

const checkAffiliateCode = (code) => {
	let postUrl = `${API_URL}/affiliates/code?code=${code}`;
	let _swalMain = Swal;
	let gldSwlUI = GLBSwal, _swal = gldSwlUI;
	let inputAffContainer = document.getElementById('affiliation-section')
	let inputAffInput = document.getElementById('affiliation')

	loadingBase(_swalMain, 'Checking affiliate code validity', 'Please Wait...')
	return new Promise((resolve, reject) => {
		axios.get(postUrl)
			.then(function (response) {
				_swalMain.close();
				if (response.data?.data === false) {
					_swal.fire(
						'Affiliate Link Failed',
						"Affiliate code is invalid.",
						'info'
					)

					if (!inputAffContainer.classList.contains('hide-form'))
						inputAffContainer.classList.add('hide-form');
					inputAffInput.value = '';
				}
			})
			.catch(function (error) {
				_swalMain.close();
				if (!inputAffContainer.classList.contains('hide-form'))
					inputAffContainer.classList.add('hide-form');
				inputAffInput.value = '';
			});
	})
}

const onCancelUpdateSubscription = () => {
	let elCont = document.getElementById('mod-subscription');
	let elContDisplay = document.querySelector('.subscription-display-ui');

	if (elContDisplay.classList.contains('hide-form')) {
		elContDisplay.classList.remove('hide-form');
		elCont.classList.add('hide-form');
	}
}

const onChangeSubsriptionToogle = () => {
	const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
	let elCont = document.getElementById('mod-subscription');
	let elContDisplay = document.querySelector('.subscription-display-ui');
	let elSub = document.getElementById('subscription');

	if (elCont.classList.contains('hide-form')) {
		elCont.classList.remove('hide-form');
		elContDisplay.classList.add('hide-form');
	}

	elSub.value = JSON.stringify(currentUserInfo.subscription)
	const className = 'hide-form'
	let ggoPremium = document.querySelector(".subpremium");
	let ggoLifetime = document.querySelector(".sublifetime");
	let ggoElite = document.querySelector(".subelite");

	if (elSub.value === '1') {
		ggoPremium.classList.remove(className)
		ggoLifetime.classList.add(className)
		ggoElite.classList.add(className)
	} else if (elSub.value === '3') {
		ggoLifetime.classList.remove(className)
		ggoPremium.classList.add(className)
		ggoElite.classList.add(className)
	} else if (elSub.value === '2') {
		ggoElite.classList.remove(className)
		ggoLifetime.classList.add(className)
		ggoPremium.classList.add(className)
	}

	if (JSON.stringify(currentUserInfo.subscription) === elSub.value) {
		// DISABLED PROCEED
		loadingButton("#upgrade-sub-submit-button", 'PROCEED', true);
	}

	setTimeout(() => {
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

		const elements = stripe.elements();
		cardelementSubscription = elements.create("card", { style: style });
		cardelementSubscription.mount("#card-element-subscription");

		cardelementSubscription.on("change", function (event) {
			document.querySelector("#payment-sub-message").textContent = event.error ? event.error.message : "";
		});
	}, 2000);
}

const onCancelSubscription = async (isEnabled = false) => {
	await confirmModal(null, "Confirm", `Are you sure you want to ${!isEnabled ? 'cancel' : 'enable'} subscription?`)
		.then(res => {
			const token_info = JSON.parse(localStorage.getItem('access_token'));
			const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
			let postUrl = `${API_URL}/registrations/${currentUserInfo.id}/enable-subscription?enable=${isEnabled}`;
			let _swalMain = Swal;

			loadingBase(_swalMain, 'Processing Request', 'Please Wait...')
			loadingButton("#cancel-sub-submit-button", 'Loading...', true);
			axios.put(postUrl, JSON.stringify({
				enable: isEnabled
			}), {
				headers: {
					'Authorization': `Bearer ${token_info.accessToken}`,
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				if (response.data.success === 1) {
					getUserInfo();
					_swalMain.fire(
						'Successfully Updated',
						isEnabled ? 'Enabled Subscription Complete' : 'Cancelled Subscription Complete',
						'success'
					)
				} else {
					_swalMain.close();
					_swalMain.fire(
						'Transaction Denied',
						"Something went wrong, please try again later.",
						'error'
					)
				}
				loadingButton("#cancel-sub-submit-button", 'CANCEL SUBSCRIPTION', false);
			}).catch(function (err) {
				loadingButton("#cancel-sub-submit-button", 'CANCEL SUBSCRIPTION', false);
				_swalMain.close();
				_swalMain.fire(
					'Failed Transaction',
					"Something went wrong, please try again later.",
					'error'
				)
			});
		});
}

const onUpdateSubscription = async () => {
	await confirmModal(null, "Confirm", `Are you sure you want to continue purchase?`)
		.then(res => {
			const token_info = JSON.parse(localStorage.getItem('access_token'));
			let postUrl = `${API_URL}/registrations/subscription`;
			let _swalMain = Swal;

			loadingBase(_swalMain, 'Processing Upgrade', 'Please Wait...')
			loadingButton("#upgrade-sub-cancel-button", 'Loading...', true);
			loadingButton("#upgrade-sub-submit-button", 'Loading...', true);

			let subscription = $("#subscription").val();
			let data = parseFloat(subscription);

			axios.put(postUrl, JSON.stringify(data), {
				headers: {
					'Authorization': `Bearer ${token_info.accessToken}`,
					'Content-Type': 'application/json'
				}
			})
				.then(function (response) {
					if (response.data.success === 1) {
						let clientSecret = response.data.clientSecret;
						confirmSubscriptionPayment(clientSecret || null)
					} else {
						loadingButton("#upgrade-sub-cancel-button", 'CANCEL', false);
						loadingButton("#upgrade-sub-submit-button", 'PROCEED', false);
						_swalMain.close();
						_swalMain.fire(
							'Failed Transaction',
							"Something went wrong, please try again later.",
							'error'
						)
					}
				})
				.catch(function (error) {
					loadingButton("#upgrade-sub-cancel-button", 'CANCEL', false);
					loadingButton("#upgrade-sub-submit-button", 'PROCEED', false);
					document.querySelector("#payment-sub-message").textContent = GENERAL_UNKNOWN_ERROR_MESSAGE;
					_swalMain.close();
				});
		});
}

const confirmSubscriptionPayment = async (clientSecret) => {
	let _swalMain = Swal;
	let gldSwlUI = GLBSwal, _swal = gldSwlUI;

	if (!clientSecret) {
		_swalMain.close();
		getUserInfo();
		onCancelUpdateSubscription();
		_swal.fire(
			'Purchase Completed',
			"Updated Subcription",
			'Success'
		)
		loadingButton("#upgrade-sub-cancel-button", 'CANCEL', false);
		loadingButton("#upgrade-sub-submit-button", 'PROCEED', false);
		return false;
	}

	const result = await stripe.confirmCardPayment(clientSecret, {
		payment_method: {
			card: cardelement
		},
		setup_future_usage: 'off_session',
		save_payment_method: true
	});

	if (result.error) {
		_swal.fire(
			'Invalid',
			result.error.message,
			'error'
		)
		document.querySelector("#payment-sub-message").textContent = result.error.message;
		loadingButton("#upgrade-sub-cancel-button", 'CANCEL', false);
		loadingButton("#upgrade-sub-submit-button", 'PROCEED', false);
		return false;
	}

	let postUrl = `${API_URL}/registrations/confirm-onetime-subscription`;
	let subscription = $("#subscription").val();

	let data = {
		"newSubscription": parseInt(subscription),
		"paymentIntentId": result.paymentIntent.id,
		"status": result.paymentIntent.status
	}

	await axios.post(postUrl, JSON.stringify(data), {
		headers: {
			'Authorization': `Bearer ${token_info.accessToken}`
		}
	})
		.then(function (response) {
			getUserInfo();
			onCancelUpdateSubscription();
			_swal.fire(
				'Purchase Completed',
				"Updated Subcription",
				'Success'
			)
			loadingButton("#upgrade-sub-cancel-button", 'CANCEL', false);
			loadingButton("#upgrade-sub-submit-button", 'PROCEED', false);
			_swalMain.close();
		})
		.catch(function (error) {
			loadingButton("#upgrade-sub-cancel-button", 'CANCEL', false);
			loadingButton("#upgrade-sub-submit-button", 'PROCEED', false);
			_swalMain.close();
		});
}

const getSubscriptionOptions = () => {
	let postUrl = `${API_URL}/prices/subscriptions`;
	
	return new Promise((resolve, reject) => {
		axios.get(postUrl)
			.then(function (response) {
				//console.log(response.data.data[0].amount)
				document.querySelector("#premium-price").textContent = `$${response.data.data[0].amount}`
				document.querySelector("#premium-name").textContent = `${response.data.data[0].name}`
				document.querySelector("#elite-price").textContent = `$${response.data.data[2].amount}`
				document.querySelector("#elite-name").textContent = `${response.data.data[2].name}`
				document.querySelector("#lifetime-price").textContent = `$${response.data.data[1].amount}`
				document.querySelector("#lifetime-name").textContent = `${response.data.data[1].name}`
				_swalMain.close();
			})
			.catch(function (error) {
				_swalMain.close();
			});
	})
}