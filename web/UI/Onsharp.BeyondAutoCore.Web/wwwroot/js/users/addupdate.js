"use strict";

// Class definition
var KTModalUsersAdd = function () {
    var submitButton;
    var cancelButton;
	var closeButton;
    var validator;
    var form;
    var modal;
	var currentParentRow;

    // Init form inputs
    var handleForm = function () {
        
		validator = FormValidation.formValidation(
			form,
			{
				fields: {
                    'username': {
						validators: {
							notEmpty: {
								message: 'Partner name is required'
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

						saveUser();
						   						
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

		closeButton.addEventListener('click', function(e){
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
		$("#username").val('');
		$("#website").val('');
		$('#image-logo').val('');
		$('#image1-isdeleted').val('false');

		$("#image1").prop("src", '');

		$('#image1-isdeleted').val('true');
		$('#image1-file').val('');
		$('#image1-container').hide();
		$('#image1-customfile-upload-container').show();

		return;
	}

	function saveUser() {

		let data = new FormData();
		let isLogoExists = false;
		let filename = "";
		let uploadUrl = "/users/update";
	
		jQuery.each(jQuery('#image-logo')[0].files, function (i, file) {
			isLogoExists = true;
			filename = file.name;
			data.append('file-' + i, file);
		});

		if (isLogoExists == false) {
			data.append('file-0', null);
		}

		let id = $("#id").val();
		let firstname = $("#firstname").val();
		let lastname = $("#lastname").val();
		let email = $("#email").val();
		let role = $("#userpermission").val();
		let subscription = $("#subscription").val();
		let margin = $("#margin").val();
		let tierPercent = $("#tier1percentage").val();
		let tier1UserEnabled = $("#tier1UserEnabled").val();

		let tierAdminEnable = false;
		if ($('#toggleTier1Setting').is(':checked')) { tierAdminEnable = true; }
		
		data.append('id', id);
		data.append('firstName', firstname);
		data.append('lastName', lastname);
		data.append('email', email);
		data.append('role', role);
		data.append('subscription', subscription);
		//data.append('tier', tier);
		data.append('tier1AdminEnabled', tierAdminEnable);
		data.append('tier1PercentLevel', tierPercent);
		data.append('tier1UserEnabled', tier1UserEnabled);
		data.append('margin', margin);
		data.append('isUpdatePhoto', $('#image1-isdeleted').val());

		$.ajax({
			url: uploadUrl,
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			method: 'PUT',
			type: 'PUT', // For jQuery < 1.9
			success: function (response) {
				if (response.success) {

					Swal.fire({
						text: "User successfully saved!",
						icon: "success",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning"
						}
					}).then(function (result) {
						if (result.isConfirmed) {

							currentParentRow.querySelectorAll('td')[1].innerText = firstname;
							currentParentRow.querySelectorAll('td')[2].innerText = lastname;
							currentParentRow.querySelectorAll('td')[3].innerText = email;

							if (subscription == 1)
								currentParentRow.querySelectorAll('td')[4].innerText = "Premium";
							else if (subscription == 2)
								currentParentRow.querySelectorAll('td')[4].innerText = "Elite";
							else
								currentParentRow.querySelectorAll('td')[4].innerText = "Lifetime";

							$('#kt_modal_add_update_user').modal('hide');

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

	function showHideTierPercentage(enable) {
		if (enable == true) {
			$('#tier1percentagelabel').show();
			$('#tier1percentage').show();
		}
		else {
			$('#tier1percentagelabel').hide();
			$('#tier1percentage').hide();
		}
	}

	var initToggleToolbar = () => {

		const tier1SettingToggle = form.querySelector('#toggleTier1Setting');
		tier1SettingToggle.addEventListener('click', function () {
			if ($('#toggleTier1Setting').is(':checked'))
				showHideTierPercentage(true);
			else
				showHideTierPercentage(false);
		});

	}

    return {
        // Public functions
        init: function () {
            // Elements
            modal = new bootstrap.Modal(document.querySelector('#kt_modal_add_update_user'));

			form = document.querySelector('#kt_modal_add_update_user_form');
			submitButton = form.querySelector('#kt_modal_add_update_user_submit');
            cancelButton = form.querySelector('#kt_modal_add_update_user_cancel');
			closeButton = form.querySelector('#kt_modal_add_update_user_close');

			handleForm();
			initToggleToolbar();
		},

		ShowModal: function (id, parentRow) {
			swalLoader(true)
			currentParentRow = parentRow;
			let getByIdUrl = "/users/" + id;

			$.ajax({
				cache: false,
				type: "GET",
				url: getByIdUrl,
				success: function (data) {

					$("#id").val(data.id);
					$("#firstname").val(data.firstName);
					$("#lastname").val(data.lastName);
					$("#email").val(data.email);
					$("#subscription").val(data.subscription);
					$("#margin").val(data.margin);
					$("#tier1percentage").val(data.tier1PercentLevel);
					$("#tier1UserEnabled").val(data.tier1UserEnabled);
					$("#userpermission").val(data.role);

					showHideTierPercentage(data.tier1AdminEnabled);

					if (data.tier1AdminEnabled) { $("#toggleTier1Setting").prop("checked", true); } else { $("#toggleTier1Setting").prop("checked", false); }
					
					if (data.fileUrl != null && data.fileUrl != undefined && data.fileUrl.length > 0) {
						$('#image1-isdeleted').val('false');
						$("#image1").prop("src", data.fileUrl);
						$('#image1-container').show();
						$('#image1-customfile-upload-container').hide();
					}
					else {
						KTModalUsersAdd.hideImage('image1');
					}

					$('#kt_modal_add_update_user').modal('show');
					swalLoader()

				},
				error: function (xhr, ajaxOptions, thrownError) {
					swalLoader()
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
		},
		readURL: function (input, image) {

			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function (e) {
					$('#' + image)
						.attr('src', e.target.result)
						.width('100%')
						.height('100%');

					$('#' + image + '-container').show();
					$('#' + image + '-customfile-upload-container').hide();
				};

				reader.readAsDataURL(input.files[0]);
			}

			return;
		},
		hideImage: function (image) {

			$('#' + image + '-isdeleted').val('true');
			$('#' + image + '-file').val('');
			$('#' + image + '-container').hide();
			$('#' + image + '-customfile-upload-container').show();

			return;
		}
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTModalUsersAdd.init();
});
