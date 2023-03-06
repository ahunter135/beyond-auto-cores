"use strict";

// Class definition
var KTModalMasterMarginUpdate = function () {
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
					'mastermargin': {
						validators: {
							notEmpty: {
								message: 'Master Margin is required'
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

						saveMasterMargin();

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

			Swal.fire({
				text: "Are you sure you would like to cancel?",
				icon: "warning",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Yes, cancel it!",
				cancelButtonText: "No, return",
				customClass: {
					confirmButton: "btn btn-warning",
					cancelButton: "btn btn-active-light"
				}
			}).then(function (result) {
				if (result.value) {
					ClearFields();
					modal.hide(); // Hide modal				
				} else if (result.dismiss === 'cancel') {
					Swal.fire({
						text: "Your form has not been cancelled!.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning",
						}
					});
				}
			});
		});

		closeButton.addEventListener('click', function (e) {
			e.preventDefault();

			Swal.fire({
				text: "Are you sure you would like to cancel?",
				icon: "warning",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Yes, cancel it!",
				cancelButtonText: "No, return",
				customClass: {
					confirmButton: "btn btn-warning",
					cancelButton: "btn btn-active-light"
				}
			}).then(function (result) {
				if (result.value) {

					ClearFields();
					modal.hide(); // Hide modal				
				} else if (result.dismiss === 'cancel') {
					Swal.fire({
						text: "Your form has not been cancelled!.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning",
						}
					});
				}
			});
		})
	}

	function ClearFields() {
		$("#id").val('0');
		$("#mastermargin").val('');
		return;
	}

	function saveMasterMargin() {

		let uploadUrl = "/mastermargin/createupdate";

		let id = $("#id").val();
		let margin = $("#mastermargin").val();

		let data = {
			id : parseInt(id),
			margin: parseFloat(margin)
		};

		$.ajax({
			url: uploadUrl,
			data: data,
			cache: false,
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (response) {
				if (response.success) {

					Swal.fire({
						text: "Master margin successfully saved!",
						icon: "success" ,
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning"
						}
					}).then(function (result) {
						if (result.isConfirmed) {
							$('#kt_modal_update_mastermargin').modal('hide');
						}
					});

					ClearFields();
				}

				submitButton.removeAttribute('data-kt-indicator');
				submitButton.disabled = false;

				return;
			},
			error: function (xhr, ajaxOptions, thrownError) {
				Swal.fire({
					text: "Sorry, looks like there are some errors detected, please try again.",
					icon: "error",
					buttonsStyling: false,
					confirmButtonText: "Ok, got it!",
					customClass: {
						confirmButton: "btn btn-warning"
					}
				});

				submitButton.removeAttribute('data-kt-indicator');
				submitButton.disabled = false;
			}
		});
	}

	return {
		// Public functions
		init: function () {

			// Elements
			modal = new bootstrap.Modal(document.querySelector('#kt_modal_update_mastermargin'));

			form = document.querySelector('#kt_modal_update_mastermargin_form');
			submitButton = form.querySelector('#kt_modal_update_mastermargin_submit');
			cancelButton = form.querySelector('#kt_modal_update_mastermargin_cancel');
			closeButton = form.querySelector('#kt_modal_update_mastermargin_close');

			handleForm();
		},
		ShowMasterMarginDialog: function () {

			ClearFields();

			let getmastermargin = "/mastermargin";

			swalLoader(true)
			$.ajax({
				cache: false,
				type: "GET",
				url: getmastermargin,
				success: function (data) {

					$("#id").val(data.id);
					$("#mastermargin").val(data.margin);

					$('#kt_modal_update_mastermargin').modal('show');
					swalLoader()
				},
				error: function (xhr, ajaxOptions, thrownError) {
					swalLoader();
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
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTModalMasterMarginUpdate.init();
});
