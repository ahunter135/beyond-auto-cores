"use strict";

// Class definition
var KTModalPasswordUpdate = function () {
	var submitButton;
	var cancelButton;
	var closeButton;
	var validator;
	var form;
	var modal;

	// Init form inputs
	var handleForm = function () {

		validator = FormValidation.formValidation(
			form,
			{
				fields: {
					'oldpassword': {
						validators: {
							notEmpty: {
								message: 'Old Password is required'
							}
						}
					},
					'newpassword': {
						validators: {
							notEmpty: {
								message: 'New Password is required'
							}
						}
					},
					'confirmpassword': {
						validators: {
							notEmpty: {
								message: 'Confirm Password is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
						eleInvalidClass: '',
						eleValidClass: ''
					})
				}
			}
		);

		// Action buttons
		submitButton.addEventListener('click', function (e) {
			e.preventDefault();

			// Validate form before submit
			if (validator) {
				validator.validate().then(function (status) {

					if (status == 'Valid') {
						submitButton.setAttribute('data-kt-indicator', 'on');

						// Disable submit button whilst loading
						submitButton.disabled = true;

						savePassword();

					} else {
						Swal.fire({
							text: "Sorry, looks like there are some errors detected, please try again.",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn btn-warning"
							}
						});
					}
				});
			}

		});

		cancelButton.addEventListener('click', function (e) {
			e.preventDefault();
			ClearFields();
			modal.hide();
		});

		closeButton.addEventListener('click', function (e) {
			e.preventDefault();

			ClearFields();
			modal.hide();
		})
	}

	function ClearFields() {
		$("#oldpassword").val('');
		$("#newpassword").val('');
		$("#confirmpassword").val('');
		return;
	}

	function savePassword() {

		let uploadUrl = "/users/update-password";

		let oldpassword = $("#oldpassword").val();
		let newpassword = $("#newpassword").val();
		let confirmpassword = $("#confirmpassword").val();

		let data = {
			id: 0,
			oldPassword: oldpassword,
			newPassword: newpassword,
			confirmPassword: confirmpassword
		};

		if (newpassword != confirmpassword) {
			Swal.fire({
				text: "New and confirm password is not equal.",
				icon: "error",
				buttonsStyling: false,
				confirmButtonText: "Ok, got it!",
				customClass: {
					confirmButton: "btn btn-warning"
				}
			});

			submitButton.removeAttribute('data-kt-indicator');
			submitButton.disabled = false;

			return;
		}

		$.ajax({
			url: uploadUrl,
			data: data,
			cache: false,
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (response) {

				if (response.success) {
					Swal.fire({
						text: "Password successfully updated!",
						icon: "success",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning"
						}
					}).then(function (result) {
						if (result.isConfirmed) {
							submitButton.removeAttribute('data-kt-indicator');
							submitButton.disabled = false;
							$('#kt_modal_update_password').modal('hide');
						}
					});

					ClearFields();
					
				} else {
					let message = response.message;
					if (response.data.message != undefined && response.data.message != null && response.data.message.length > 0)
						message = response.data.message;
					Swal.fire({
						text: message,
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning"
						}
					}).then(function (result) {
						if (result.isConfirmed) {
							submitButton.removeAttribute('data-kt-indicator');
							submitButton.disabled = false;
							return;
						}
					});
				}

				return;
			},
			error: function (xhr, ajaxOptions, thrownError) {

				submitButton.removeAttribute('data-kt-indicator');
				submitButton.disabled = false;

				Swal.fire({
					text: "Sorry, looks like there are some errors detected, please try again.",
					icon: "error",
					buttonsStyling: false,
					confirmButtonText: "Ok, got it!",
					customClass: {
						confirmButton: "btn btn-warning"
					}
				});

			}
		});
	}

	return {
		// Public functions
		init: function () {

			// Elements
			modal = new bootstrap.Modal(document.querySelector('#kt_modal_update_password'));

			form = document.querySelector('#kt_modal_update_password_form');
			submitButton = form.querySelector('#kt_modal_update_password_submit');
			cancelButton = form.querySelector('#kt_modal_update_password_cancel');
			closeButton = form.querySelector('#kt_modal_update_password_close');

			handleForm();
		},
		ShowPasswordDialog: function () {

			//ClearFields();
			$('#kt_modal_update_password').modal('show');
			return;
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTModalPasswordUpdate.init();
});
