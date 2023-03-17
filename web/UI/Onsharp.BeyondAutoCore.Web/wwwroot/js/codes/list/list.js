"use strict";

var KTCodesList = function () {

    var formList;
    var datatable;
    var table
    var codesUrl = "/codes";

    var initCodesList = function () {

        $('#code-list-search').keypress(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });

        const tableRows = table.querySelectorAll('tbody tr');



        // This is what splits data into pages
        /*datatable = $(table).DataTable({
            info: false,
            order: [],
            columnDefs: [
                { orderable: false, targets: 0 },
                { orderable: false, targets: 6 },
            ],
            responsive: false
        });

        datatable.on('draw', function () {
            initToggleToolbar();
            handleUpdateRows();
            handleDeleteRows();
        });*/
    }

    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-code-table-filter="search"]');
        filterSearch.addEventListener('keyup', delay(function (e) {
            // Here we handle search
            console.log('I typed');
            const isGeneric = $.urlParam('isGeneric');
            const size = $.urlParam('size');
            const direction = $.urlParam('direction');
            const sortCol = $.urlParam('sortCol');

            redirectToCodesPage(
                size,
                "1",
                isGeneric,
                direction,
                filterSearch.value,
                sortCol
            );
        }, 2000));
    }

    var handleUpdateRows = () => {
        const updateButtons = table.querySelectorAll('[data-kt-code-table-filter="update_row"]');
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

        KTModalCodesAdd.ShowModal(id, parent);

        return;
    }

    // Delete code
    var handleDeleteRows = () => {
        
        const deleteButtons = table.querySelectorAll('[data-kt-code-table-filter="delete_row"]');

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
        const codeName = parent.querySelectorAll('td')[1].innerText;
        const codeId = parent.querySelectorAll('td')[0].innerText;

        Swal.fire({
            text: "Are you sure you want to delete " + codeName + "?",
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

                let deleteUrl = "/codes/delete?id=" + codeId;

                $.ajax({
                    cache: false,
                    type: "DELETE",
                    url: deleteUrl,
                    success: function (data) {

                        let resmessage = "You have deleted " + codeName + "!";
                        let resicon = "success";
                        if (data.data.success == 0) {
                            resmessage = data.data.message;
                            resicon = "warning";
                        }

                        Swal.fire({
                            text: resmessage,
                            icon: resicon,
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-warning"
                            }
                        }).then(function () {
                            if (data.data.success !== 0) {
                                // Remove current row
                                datatable.row($(parent)).remove().draw();
                            }
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

    // Init toggle toolbar
    var initToggleToolbar = () => {

        const showGeneric = formList.querySelector('#toggleShowGenerics');
        showGeneric.addEventListener('click', function () {
            
            let isCheck = "false";
            if ($('#toggleShowGenerics').is(':checked')) { isCheck = true; }
            const size = $.urlParam('size');
            const page = $.urlParam('page');
            const direction = $.urlParam('direction');
            const sortCol = $.urlParam('sortCol');
            const search = $.urlParam('search');

            redirectToCodesPage(
                size,
                page,
                isCheck,
                direction,
                search,
                sortCol
            );
        });

    }

    // Public methods
    return {
        init: function () {

            formList = document.querySelector('#kt_content_container');
            table = document.querySelector('#kt_codes_table');
            
            if (!table) {
                return;
            }

            initCodesList();
            initToggleToolbar();
            handleSearchDatatable();
            handleUpdateRows();
            handleDeleteRows();
            
            $("#side-menu-code").addClass('active');
            $("#side-menu-code .side-menu-title").addClass('title-active');
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTCodesList.init();
});

function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                    .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
}

function redirectToCodesPage(
    size,
    page,
    isGeneric,
    direction,
    search,
    sortCol
    ) {
        let queryStrinBuilder = `/codes?isGeneric=${isGeneric === false ? "true" : isGeneric}&search=${search === false || search == "0" ? "" : search}&page=${(page === false) ? "1" : page}&size=${size === false ? "10" : size}&direction=${direction === false ? "0" : direction}&sortCol=${sortCol === false ? "0" : sortCol}`;
        window.location = queryStrinBuilder;
    }
