"use strict";
    
// Class definition
var KTPhotoGradesList = function () {

    var datatable;
    var table
    var currentParentRow;

    let btnSubmit;

    var onDissmissDisablesAndLoaders = () => {
        btnSubmit.removeAttribute('data-kt-indicator');
        btnSubmit.disabled = false;
    }

    // Private functions
    var initPhotoGradesList = function () {

        $('#photogrades-list-search').keypress(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });

        const tableRows = table.querySelectorAll('tbody tr');

        tableRows.forEach(row => {
            const dateRow = row.querySelectorAll('td');
            const realDate = moment(dateRow[3].innerHTML, "DD MMM YYYY, LT").format();
            dateRow[1].setAttribute('data-order', realDate);
        });

        datatable = $(table).DataTable({
            info: false,
            order: [],
            columnDefs: [
                { orderable: false, targets: 0 },
                { orderable: false, targets: 4 },
            ],
            responsive: false
        });

        datatable.on('draw', function () {
            initToggleToolbar();
            handleUpdateRows();
            handleDeleteRows();
        });


        $("#kt_modal_update_photograde_cancel, #kt_modal_update_photograde_close").click(function () {
            $('#kt_modal_update_photogridstatus').modal('hide');
        });

        // Action buttons
        btnSubmit.addEventListener('click', function (e) {
            e.preventDefault();

            btnSubmit.setAttribute('data-kt-indicator', 'on');
            savePhotoGradeStatus();
            return;

        });

        $("#kt_modal_photo_carousel_close").click(function () {

            $("#image0").removeAttr("src");
            $("#image1").removeAttr("src");
            $("#image2").removeAttr("src");
            $("#imgslidephoto").removeAttr("src");

            $('#kt_modal_photo_carousel').modal('hide');
            return;
        });

        $('#previous').click(function () {
            SelectImage('previous');
            return;
        });

        $('#next').click(function () {
            SelectImage('next');
            return;
        });

        $('#photoList img').click(function () {
            imageCounter = $(this).attr('thumbnailposition');
            SelectImage('');
            return;
        });

        $('#codeList').select2(
            {
                allowClear: true,
                dropdownParent: $("#kt_modal_update_photogridstatus"),
                ajax: {
                    url: "/codes/jsonlist",
                    dataType: "json",
                    cache: false,
                    type: "GET",
                    initialValue: 50,
                    data: function (params) {

                        var queryParameters = {
                            search: params.term
                        }
                        return queryParameters;
                    },
                    processResults: function (data) {
                        return {
                            results: $.map(data, function (item) {
                                if (item.id != '9999')
                                return {
                                    text: item.converterName,
                                    id: item.id,
                                    selected: true,
                                    price: item.price
                                }
                            })
                        };
                    }
                }
            }

        );
        $("#codeList").select2('data', { id: "9999", text: "No Code"});
        $('#codeList').on('select2:select', function (e) {
            var data = e.params.data;
            $("#price").val(data.price);
        });
        $(".select2-selection__clear").on('click', function () {
            $("#codeList").val('').change();
        });
        
    }

    var imageCounter = 0;
    function SelectImage(action)
    {
        if (action == 'next') {
            imageCounter = imageCounter + 1;
            if (imageCounter > 2) { imageCounter = 2; return; }
        }
        else if (action == 'previous') {
            imageCounter = imageCounter - 1;
            if (imageCounter < 0) { imageCounter = 0; return; }
        }

        $("#imgslidephoto").prop("src", $("#image" + imageCounter).attr('src'));
        $('#slideshow').fadeOut(10).fadeIn(500);

        return;
    }

    function savePhotoGradeStatus() {

        let updateUrl = "/photogrades/update";
        let id = $("#selPhotogradeId").val();
        let codeId = $("#codeList").val();
        let price = $("#price").val();
        let photoGradeStatus = $("#photoGridStatus").val();
        let comments = $("#comments").val();

        if (photoGradeStatus == 1 && codeId == 0) {
            Swal.fire({
                text: "Code is required if the status is approved.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                    confirmButton: "btn btn-warning"
                }
            }).then(function (result) {
                onDissmissDisablesAndLoaders();               
            });
            return;
        }


        let data = {
            id: id,
            codeId: codeId,
            photoGradeStatus: photoGradeStatus,
            price: parseFloat(price),
            comments: comments
        };

        btnSubmit.setAttribute('data-kt-indicator', 'on');
        btnSubmit.disabled = true;

        $.ajax({
            cache: false,
            type: "PUT",
            url: updateUrl,
            data: data,
            success: function (response) {

                if (response.success) {
                    Swal.fire({
                        text: "Converter successfully updated!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-warning"
                        }
                    }).then(function (result) {
                        if (result.isConfirmed) {
                           
                            if (response.data.photoGradeStatus == 0)
                                currentParentRow.querySelectorAll('td')[3].innerText = "Pending";
                            else if (response.data.photoGradeStatus == 1)
                                currentParentRow.querySelectorAll('td')[3].innerText = "Approved";
                            else
                                datatable.row($(currentParentRow)).remove().draw();
                                
                            $('#kt_modal_update_photogridstatus').modal('hide');
                            onDissmissDisablesAndLoaders();
                        }
                    }).catch(e => {
                        onDissmissDisablesAndLoaders()
                    });
                }

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

    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-photograde-table-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    var handleUpdateRows = () => {
        // Select all delete buttons
        const updateButtons = table.querySelectorAll('[data-kt-photograde-table-filter="update_row"]');

        updateButtons.forEach(d => {
            d.removeEventListener('click', updateEvent);
        });

        updateButtons.forEach(d => {
            d.addEventListener('click', updateEvent);
        });

        return;
    }

    function updateEvent(e) {

        e.preventDefault();

        const parent = e.target.closest('tr');
        const id = parent.querySelectorAll('td')[0].innerText;

        ShowModal(id, parent);

        return;
    }

    function ShowModal(id, parentRow) {
        swalLoader(true)
        
        currentParentRow = parentRow;
        let getByIdUrl = "/photogrades/" + id;
        var photogradeId;
        $.ajax({
            cache: false,
            type: "GET",
            url: getByIdUrl,
            success: function (data) {

                let newOption = null;
                if (data.converterName != null && data.converterName != undefined && data.converterName.length > 0) {
                    newOption = new Option('' + data.converterName, data.codeId, true, true);
                }
                else {
                    newOption = new Option('No code', '9999', true, true);
                }

                $('#codeList').append(newOption).trigger('change');

                $("#selPhotogradeId").val(data.id);
                $("#price").val(data.price);
                $("#photoGridStatus").select2("val", '' + data.photoGradeStatus);
                $("#comments").val('' + data.comments);

                $('#kt_modal_update_photogridstatus').modal('show');
                photogradeId = data.id;

                ShowPhotoCarousel(data);
                //btnSubmit = $('#kt_modal_update_photograde_submit');
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
            },
            complete: function () {

            }
        });
    }

    var handleDeleteRows = () => {

        const deleteButtons = table.querySelectorAll('[data-kt-photograde-table-filter="delete_row"]');

        deleteButtons.forEach(d => {
            d.removeEventListener('click', deleteEvent);
        });

        deleteButtons.forEach(d => {
            d.addEventListener('click', deleteEvent);
        });

        return;
    }

    function deleteEvent(e) {
        e.preventDefault();

        const parent = e.target.closest('tr');
        const photogradename = parent.querySelectorAll('td')[1].innerText;
        const photogradeId = parent.querySelectorAll('td')[0].innerText;

        Swal.fire({
            text: "Are you sure you want to delete " + photogradename + "?",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel",
            customClass: {
                confirmButton: "btn btn-warning",
                cancelButton: "btn btn-active-light"
            }
        }).then(function (result) {
            if (result.value) {

                let deleteUrl = "/photogrades/DeleteByStatusUpdate?id=" + photogradeId;

                $.ajax({
                    cache: false,
                    type: "DELETE",
                    url: deleteUrl,
                    success: function (data) {

                        Swal.fire({
                            text: "You have deleted " + photogradename + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-warning",
                                cancelButton: "btn btn-active-light"
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });

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

    function ShowPhotoCarousel(data) {

        $("#image0").removeAttr("src");
        $("#image0").hide();
        $("#image1").removeAttr("src");
        $("#image1").hide();
        $("#image2").removeAttr("src");
        $("#image2").hide();
        $("#imgslidephoto").removeAttr("src");


        if (data.photoGradeItems[0] != null && data.photoGradeItems[0] != undefined && data.photoGradeItems[0].fileUrl != null && data.photoGradeItems[0].fileUrl != undefined) {
            $("#image0").prop("src", data.photoGradeItems[0].fileUrl);
            $("#image0").show();
        }

        if (data.photoGradeItems[1] != null && data.photoGradeItems[1] != undefined && data.photoGradeItems[1].fileUrl != null && data.photoGradeItems[1].fileUrl != undefined) {
            $("#image1").prop("src", data.photoGradeItems[1].fileUrl);
            $("#image1").show();
        }

        if (data.photoGradeItems[2] != null && data.photoGradeItems[2] != undefined && data.photoGradeItems[2].fileUrl != null && data.photoGradeItems[2].fileUrl != undefined) {
            $("#image2").prop("src", data.photoGradeItems[2].fileUrl);
            $("#image2").show();
        }
                
        imageCounter = 0;
        SelectImage('');

        return;
    }

    // Reset Filter
    var handleResetForm = () => {
        
    }

    // Init toggle toolbar
    var initToggleToolbar = () => {
        
    }

    return {
        init: function () {
            table = document.querySelector('#kt_photograde_table');
            btnSubmit = document.querySelector('#kt_modal_update_photograde_submit');
            
            if (!table) {
                return;
            }

            initPhotoGradesList();
            initToggleToolbar();
            handleSearchDatatable();
            handleUpdateRows();
            handleDeleteRows();
            handleResetForm();

            $("#side-menu-photogrades").addClass('active');
            $("#side-menu-photogrades .side-menu-title").addClass('title-active');
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTPhotoGradesList.init();
});