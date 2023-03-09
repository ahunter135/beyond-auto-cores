"use strict";

var KTModalLogout = function () {

	return {
		// Public functions
		signOut: function () {

            Swal.fire({
                text: "Continue signout?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes!",
                cancelButtonText: "No",
                customClass: {
                    confirmButton: "btn fw-bold btn-danger",
                    cancelButton: "btn fw-bold btn-active-light-primary"
                }
            }).then(function (result) {
                if (result.value) {

                    let signoutUrl = "/users/signout";

                    $.ajax({
                        cache: false,
                        type: "POST",
                        url: signoutUrl,
                        success: function (response) {
                            window.location.href = response.redirectToUrl;
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
                        }
                    });


                } 
            });

            return;
		}
	};


}();

