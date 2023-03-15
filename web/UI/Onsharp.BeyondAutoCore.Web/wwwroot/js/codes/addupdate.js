"use strict";

// Class definition
var KTModalCodesAdd = function () {
	var submitButton;
	var cancelButton;
	var closeButton;
	var validator;
	var form;
	var modal;
	var currentParentRow;

	var onDissmissDisablesAndLoaders = () => {
		submitButton.removeAttribute('data-kt-indicator');
		submitButton.disabled = false;
	}

	// Init form inputs
	var handleForm = function () {

		validator = FormValidation.formValidation(
			form,
			{
				fields: {
					'convertername': {
						validators: {
							notEmpty: {
								message: 'Converter name is required'
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

						let id = $("#id").val();
						let convertername = $("#convertername").val();
						let originalprice = $("#originalprice").val();
						let margin = $("#margin").val();
						let platinum = $("#platinum").val();
						let palladium = $("#palladium").val();
						let rhodium = $("#rhodium").val();
						let make = $("#make").val();

						let isCustom = "false";
						if ($('#radnongeneric').is(':checked')) { isCustom = "true"; }

						let postUrl = "/codes/createupdate";
						let data = {
							id: id,
							ConverterName: convertername,
							IsCustom: isCustom,
							OriginalPrice: parseFloat(originalprice),
							Margin: parseFloat(margin),
							PlatinumPrice: parseFloat(platinum),
							PalladiumPrice: parseFloat(palladium),
							RhodiumPrice: parseFloat(rhodium),
							Make: make
						};

						$.ajax({
							cache: false,
							type: "POST",
							url: postUrl,
							data: data,
							success: function (data) {
								CreateCodePhotoGrade(data.id, data.photoGradeId);
							},
							error: function (xhr, ajaxOptions, thrownError) {
								onDissmissDisablesAndLoaders();
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

					} else {
						onDissmissDisablesAndLoaders();
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
				}).catch(e => {
					onDissmissDisablesAndLoaders();
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
					$("#kt_modal_add_code_header h2").html('Add a Code');
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
					$("#kt_modal_add_code_header h2").html('Add a Code');
					ClearFields();
					modal.hide();
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

	function CreateCodePhotoGrade(id, photoGradeId) {

		let data = new FormData();
		jQuery.each(jQuery('#image1-file')[0].files, function (i, file) {
			data.append('file-' + i, file);
		});
		jQuery.each(jQuery('#image2-file')[0].files, function (i, file) {
			data.append('file-' + i, file);
		});
		jQuery.each(jQuery('#image3-file')[0].files, function (i, file) {
			data.append('file-' + i, file);
		});

		if (id == undefined || id == null)
			id = 0;

		let img1IsDeleted = $('#image1-isdeleted').val();
		let img2IsDeleted = $('#image2-isdeleted').val();
		let img3IsDeleted = $('#image3-isdeleted').val();

		let deleteItemIds = '';

		if (img1IsDeleted == 'true')
			deleteItemIds = $('#image1-id').val();
		if (img2IsDeleted == 'true') {
			if (deleteItemIds != '' && deleteItemIds != undefined)
				deleteItemIds = deleteItemIds + ',';

			deleteItemIds = deleteItemIds + $('#image2-id').val();
		}

		if (img3IsDeleted == 'true') {
			if (deleteItemIds != '' && deleteItemIds != undefined)
				deleteItemIds = deleteItemIds + ',';

			deleteItemIds = deleteItemIds + $('#image3-id').val();
		}

		data.append('photoGradeId', photoGradeId);
		data.append('photoGradeItemsToDelete', deleteItemIds);

		let uploadUrl = "/codes/" + id + "/create-update-photo-grade";
		$.ajax({
			url: uploadUrl,
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (data) {

				submitButton.removeAttribute('data-kt-indicator');

				if (data.success) {
					Swal.fire({
						text: "Form has been successfully submitted!",
						icon: "success",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning"
						}
					}).then(function (result) {
						if (result.isConfirmed) {
							modal.hide();

							onDissmissDisablesAndLoaders();

							let urlRedirect = form.getAttribute("data-kt-redirect");
							let isGeneric = $("#viewBagIsGeneric").val();
							const pageSize = $('select[name="kt_codes_table_length"]').find(":selected").val();
							console.log(pageSize);

							window.location = urlRedirect + "?isGeneric=" + isGeneric + "&size=" + pageSize;
						}
					}).catch(e => {
						onDissmissDisablesAndLoaders();
					});

					ClearFields();
				} else {
					onDissmissDisablesAndLoaders();
					Swal.fire({
						text: "Sorry, looks like there are some errors detected, please try again. Error: " + data.message,
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-warning"
						}
					});
				}

				return;
			},
			error: function (xhr, ajaxOptions, thrownError) {
				onDissmissDisablesAndLoaders();

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

	function ClearFields(imageOnly) {

		$("#id").val('0');
		$("#convertername").val('');

		$("#originalprice").val('');
		$("#margin").val('');
		$("#platinum").val('');
		$("#palladium").val('');
		$("#rhodium").val('');
		$("#make").val('');

		$("#image1").prop("src", '');
		$("#image2").prop("src", '');
		$("#image3").prop("src", '');

		$('#image1-id').val('0');
		$('#image1-isdeleted').val('');
		$('#image1-file').val('');
		$('#image1-container').addClass('hidden-file');
		$('#image1-customfile-upload-container').show();

		$('#image2-id').val('0');
		$('#image2-isdeleted').val('');
		$('#image2-file').val('');
		$('#image2-container').addClass('hidden-file');
		$('#image2-customfile-upload-container').show();

		$('#image3-id').val('0');
		$('#image3-isdeleted').val('');
		$('#image3-file').val('');
		$('#image3-container').addClass('hidden-file');
		$('#image3-customfile-upload-container').show();

		let isCheck = false;
		if ($('#toggleShowGenerics').is(':checked')) { isCheck = true; }
		if (isCheck) {
			$("#radgeneric").prop("checked", true);
		} else {
			$("#radnongeneric").prop("checked", true);
		}

		return;
	}

	function ShowCodePhotoGrade(id) {

		let getByIdUrl = "/photogrades/" + id;

		$.ajax({
			cache: false,
			type: "GET",
			url: getByIdUrl,
			success: function (data) {
				if (!data) return;
				if (data.photoGradeItems[0] != null && data.photoGradeItems[0] != undefined && data.photoGradeItems[0].fileUrl != null && data.photoGradeItems[0].fileUrl != undefined) {
					$('#image1-id').val(data.photoGradeItems[0].id);
					$('#image1-isdeleted').val('');
					$("#image1").prop("src", data.photoGradeItems[0].fileUrl);
					$("#image1").show();

					$('#image1-container').removeClass('hidden-file');
					$('#image1-customfile-upload-container').hide();
				}


				if (data.photoGradeItems[1] != null && data.photoGradeItems[1] != undefined && data.photoGradeItems[1].fileUrl != null && data.photoGradeItems[1].fileUrl != undefined) {
					$('#image2-id').val(data.photoGradeItems[1].id);
					$('#image2-isdeleted').val('');
					$("#image2").prop("src", data.photoGradeItems[1].fileUrl);
					$("#image2").show();

					$('#image2-container').removeClass('hidden-file');
					$('#image2-customfile-upload-container').hide();
				}


				if (data.photoGradeItems[2] != null && data.photoGradeItems[2] != undefined && data.photoGradeItems[2].fileUrl != null && data.photoGradeItems[2].fileUrl != undefined) {
					$('#image3-id').val(data.photoGradeItems[2].id);
					$('#image3-isdeleted').val('');
					$("#image3").prop("src", data.photoGradeItems[2].fileUrl);
					$("#image3").show();

					$('#image3-container').removeClass('hidden-file');
					$('#image3-customfile-upload-container').hide();
				}

				Swal.hideLoading();
				return;

			},
			error: function (xhr, ajaxOptions, thrownError) {
				Swal.hideLoading();
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
			modal = new bootstrap.Modal(document.querySelector('#kt_modal_add_code'));

			form = document.querySelector('#kt_modal_add_code_form');
			submitButton = form.querySelector('#kt_modal_add_code_submit');
			cancelButton = form.querySelector('#kt_modal_add_code_cancel');
			closeButton = form.querySelector('#kt_modal_add_code_close');

			handleForm();
		},
		ShowModal: function (id, parentRow) {

			ClearFields();
			swalLoader(true);

			currentParentRow = parentRow;
			let getByIdUrl = "/codes/" + id;

			$.ajax({
				cache: false,
				type: "GET",
				url: getByIdUrl,
				success: function (data) {

					$("#kt_modal_add_code_header h2").html('Edit Code');

					$("#id").val(data.id);
					$("#convertername").val(data.converterName);
					$("#originalprice").val(data.originalPrice);
					$("#margin").val(data.margin);
					$("#platinum").val(data.platinumPrice);
					$("#palladium").val(data.palladiumPrice);
					$("#rhodium").val(data.rhodiumPrice);
					$("#make").val(data.make);

					if (data.isCustom) { $("#radnongeneric").prop("checked", true); } else { $("#radgeneric").prop("checked", true); }


					ShowCodePhotoGrade(data.photoGradeId);

					$('#kt_modal_add_code').modal('show');
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

			return;
		},
		readURL: function (input, image) {

			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function (e) {
					$('#' + image)
						.attr('src', e.target.result)
						.width('100%')
						.height('100%');

					$('#' + image + '-container').removeClass('hidden-file');
					$('#' + image + '-customfile-upload-container').hide();
				};

				reader.readAsDataURL(input.files[0]);
			}

			return;
		},
		hideImage: function (image) {
			$('#' + image + '-isdeleted').val('true');
			$('#' + image + '-file').val('');
			$('#' + image + '-container').addClass('hidden-file');
			$('#' + image + '-customfile-upload-container').show();

			return;
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
	KTModalCodesAdd.init();
});