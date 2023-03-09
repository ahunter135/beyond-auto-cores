"use strict";

// Class definition
var KTLotsList = function () {
    // Define shared variables
    var datatable;
    var table
    var tableInvoice;

    // Private functions
    var initLotsList = function () {
        // Set date data order

        $('#lots-list-search').keypress(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });

        const tableRows = table.querySelectorAll('tbody tr');

        tableRows.forEach(row => {
            const dateRow = row.querySelectorAll('td');
            const realDate = moment(dateRow[5].innerHTML, "DD MMM YYYY, LT").format(); // select date from 5th column in table
            dateRow[5].setAttribute('data-order', realDate);
        });

        datatable = $(table).DataTable({
            info: false,
            order: [],
            columnDefs: [
                { orderable: false, targets: 6 }, // Disable ordering on column 6 (actions)
            ],
            responsive: false
        });

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        datatable.on('draw', function () {
            initToggleToolbar();
            handleDetailListRows();
            handleDeleteRows();
        });

        $("#kt_modal_lots_invoice_close").click(function () {
            $('#kt_modal_lots_invoice').modal('hide');
            return;
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-lots-table-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Filter Datatable
    var handleFilterDatatable = () => {
        
    }

    var handleDetailListRows = () => {
        
        const detailButtons = table.querySelectorAll('[data-kt-lots-table-filter="detail_list_row"]');

        detailButtons.forEach(d => {
            d.removeEventListener('click', detailListEvent);
        });

        detailButtons.forEach(d => {
            d.addEventListener('click', detailListEvent);
        });

        return;
    }

    function detailListEvent(e) {
        e.preventDefault();

        const parent = e.target.closest('tr');
        const id = parent.querySelectorAll('td')[0].innerText;

        ShowModal(id, parent);

        return;
    }

    function ShowModal(id, parentRow) {
        swalLoader(true);
        let getByIdUrl = "/lots/invoice?lotId=" + id;
        $.ajax({
            cache: false,
            type: "GET",
            url: getByIdUrl,
            success: function (data) {

                $(tableInvoice).dataTable().fnDestroy();
                tableInvoice = $('#invoice-list-table').dataTable({
                    "bAutoWidth": false,
                    "aaData": data,
                    "responsive": true,
                    "iDisplayLength": 100,
                    "columns": [
                        { "data": "lotItemFullnessId" },
                        { "data": "converterName" },
                        { "data": "unitPrice", render: $.fn.dataTable.render.number(',', '.', 0, '') },
                        { "data": "quantity", render: $.fn.dataTable.render.number(',', '.', 0, '') },
                        { "data": "total", render: $.fn.dataTable.render.number(',', '.', 0, '') }
                    ],
                    'columnDefs': [{
                        "targets": 0,
                        "className": "text-center",
                        "width": "10%"
                    }, {
                        "targets": 1,
                        "className": "text-left"
                    }, {
                        "targets": 2,
                        "className": "text-center",
                        "width": "20%"
                    }, {
                        "targets": 3,
                        "className": "text-center",
                        "width": "20%"
                    }, {
                        "targets": 4,
                        "className": "text-center",
                        "width": "20%"
                        }
                    ],
                    footerCallback: function (row, data, start, end, display) {
                        var api = this.api();

                        // Remove the formatting to get integer data for summation
                        var intVal = function (i) {
                            return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                        };

                        // Total over all pages
                        let total = api
                            .column(4)
                            .data()
                            .reduce(function (a, b) {
                                return parseFloat(a) + parseFloat(b);
                            }, 0);

                        //// Total over this page
                        //let pageTotal = api
                        //    .column(4, { page: 'current' })
                        //    .data()
                        //    .reduce(function (a, b) {
                        //        return intVal(a) + intVal(b);
                        //    }, 0);

                        // Update footer
                        if (total > 0) {
                            $(api.column(3).footer()).html('<b> Grand Total: </b>');
                            $(api.column(4).footer()).html('<b> $' + total.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b>');
                        }
                        else {
                            $(api.column(3).footer()).html('');
                            $(api.column(4).footer()).html('');
                        }
                    }
                });

                // re-initialize row click event
                $('#invoice-list-table tbody').off("click").on('click', 'tr', function () {
                    if (!$(this).hasClass('selected-invoice')) {
                        tableInvoice.$('tr.selected').removeClass('selected-invoice');
                        $(this).addClass('selected-invoice');
                    };
                });

                $('#kt_modal_lots_invoice').modal('show');
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
            },
            complete: function () {
            }
        });
    }

    // Delete lot
    var handleDeleteRows = () => {

        const deleteButtons = table.querySelectorAll('[data-kt-lots-table-filter="delete_row"]');

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
        const lotName = parent.querySelectorAll('td')[1].innerText;
        const lotId = parent.querySelectorAll('td')[0].innerText;

        Swal.fire({
            text: "Are you sure you want to delete " + lotName + "?",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            allowOutsideClick: false,
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel",
            customClass: {
                confirmButton: "btn btn-warning",
                cancelButton: "btn btn-active-light"
            }
        }).then(function (result) {
            if (result.value) {

                let deleteUrl = "/lots/delete?id=" + lotId;

                $.ajax({
                    cache: false,
                    type: "DELETE",
                    url: deleteUrl,
                    success: function (data) {

                        let resmessage = "You have deleted " + lotName + "!";
                        let resicon = "success";
                        if (data.success == 0) {
                            resmessage = data.message;
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
                            if (data.success !== 0) {
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

    // Reset Filter
    var handleResetForm = () => {
        
    }

    // Init toggle toolbar
    var initToggleToolbar = () => {
        
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_lots_table');
            //tableInvoice = document.querySelector('#invoice-list-table');

            if (!table) {
                return;
            }

            initLotsList();
            initToggleToolbar();
            handleSearchDatatable();
            handleFilterDatatable();
            handleDetailListRows();
            handleDeleteRows();
            handleResetForm();

            $("#side-menu-lot").addClass('active');
            $("#side-menu-lot .side-menu-title").addClass('title-active');
        },
        deleteInvoice: function (lotItemFullnessId) {
            deleteInvoice(lotItemFullnessId);
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTLotsList.init();
});