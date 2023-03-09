"use strict";

// Class definition
var KTModalPartnersAdd = function () {
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
                    'partnername': {
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

						savePartner();
						   						
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
		$("#partnername").val('');
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

	function savePartner() {

		let uploadUrl = "/partners/createupdate";

		let id = $("#id").val();
		let partnername = $("#partnername").val();
		let website = $("#website").val();

		let data = new FormData();
		let isLogoExists = false;
		let filename = "";
		jQuery.each(jQuery('#image-logo')[0].files, function (i, file) {
			isLogoExists = true;
			filename = file.name;
			data.append('file-' + i, file);
		});

		if (isLogoExists == false) {
			data.append('file-0', null);
		}
		
		data.append('id', id);
		data.append('partnerName', partnername);
		data.append('website', website);
		data.append('isUpdateLogo', $('#image1-isdeleted').val());

		$.ajax({
			url: uploadUrl,
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (response) {
				if (response.success) {

					Swal.fire({
						text: "Partner successfully saved!",
						icon: "success",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning"
						}
					}).then(function (result) {
						if (result.isConfirmed) {
							if (id != null && id != undefined && parseFloat(id) > 0) {
								currentParentRow.querySelectorAll('td')[1].innerText = partnername;
								currentParentRow.querySelectorAll('td')[2].innerText = website;
								currentParentRow.querySelectorAll('td')[3].innerText = filename;

								$('#kt_modal_add_update_partner').modal('hide');
							}
							else {

								let urlRedirect = form.getAttribute("data-kt-redirect");
								window.location = urlRedirect;
							}
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
            modal = new bootstrap.Modal(document.querySelector('#kt_modal_add_update_partner'));

			form = document.querySelector('#kt_modal_add_update_partner_form');
			submitButton = form.querySelector('#kt_modal_add_update_partner_submit');
            cancelButton = form.querySelector('#kt_modal_add_update_partner_cancel');
			closeButton = form.querySelector('#kt_modal_add_update_partner_close');

			handleForm();
		},

		ShowModal: function (id, parentRow) {
			swalLoader(true)
			currentParentRow = parentRow;
			let getByIdUrl = "/partners/" + id;

			$.ajax({
				cache: false,
				type: "GET",
				url: getByIdUrl,
				success: function (data) {

					$("#id").val(data.id);
					$("#partnername").val(data.partnerName);
					$("#website").val(data.website);
					

					if (data.fileUrl != null && data.fileUrl != undefined && data.fileUrl.length > 0) {
						$('#image1-isdeleted').val('false');
						$("#image1").prop("src", data.fileUrl);
						$('#image1-container').show();
						$('#image1-customfile-upload-container').hide();
					}
					else {
						KTModalPartnersAdd.hideImage('image1');
					}

					$('#kt_modal_add_update_partner').modal('show');
					swalLoader();
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
		},
		readURL: function (input, image) {

			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function (e) {
					$('#' + image)
						.attr('src', e.target.result)
						.width('auto')
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
	KTModalPartnersAdd.init();
});
