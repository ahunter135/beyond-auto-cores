"use strict";
    
// Class definition
var KTPartnersList = function () {

    var datatable;
    var table
    var currentParentRow;

    // Private functions
    var initPartnersList = function () {

        $('#partners-list-search').keypress(function (event) {
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
                { orderable: true, targets: 1 },
            ],
            responsive: false
        });

        datatable.on('draw', function () {
            initToggleToolbar();
            handleUpdateRows();
            handleDeleteRows();
        });


        $("#kt_modal_add_partner_cancel, #kt_modal_add_partner_close").click(function () {
            $('#kt_modal_add_update_partner').modal('hide');
        });
    }

    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-partner-table-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    var handleUpdateRows = () => {

        const updateButtons = table.querySelectorAll('[data-kt-partner-table-filter="update_row"]');

        updateButtons.forEach(d => {
            d.removeEventListener('click', UpdateEvent);
        });

        updateButtons.forEach(d => {
            d.addEventListener('click', UpdateEvent);
        });
    }

    function UpdateEvent(e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest('tr');
        const id = parent.querySelectorAll('td')[0].innerText;

        KTModalPartnersAdd.ShowModal(id, parent);

        return;
    }

    var handleDeleteRows = () => {

        const deleteButtons = table.querySelectorAll('[data-kt-partner-table-filter="delete_row"]');

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
        const partnername = parent.querySelectorAll('td')[1].innerText;
        const partnerId = parent.querySelectorAll('td')[0].innerText;

        Swal.fire({
            text: "Are you sure you want to delete " + partnername + "?",
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

                let deleteUrl = "/partners/Delete?id=" + partnerId;

                $.ajax({
                    cache: false,
                    type: "DELETE",
                    url: deleteUrl,
                    success: function (data) {

                        Swal.fire({
                            text: "You have deleted " + partnername + "!.",
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

    // Reset Filter
    var handleResetForm = () => {
        
    }

    // Init toggle toolbar
    var initToggleToolbar = () => {
        
    }

    return {
        init: function () {
            table = document.querySelector('#kt_partner_table');
            
            if (!table) {
                return;
            }

            initPartnersList();
            initToggleToolbar();
            handleSearchDatatable();
            handleUpdateRows();
            handleDeleteRows();
            handleResetForm();

            $("#side-menu-partners").addClass('active');
            $("#side-menu-partners .side-menu-title").addClass('title-active');
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTPartnersList.init();
});