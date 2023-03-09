const swalLoader = (isDismissLoader) => {
    if(!isDismissLoader) {
        Swal.close();
    } else {
        Swal.fire({
            title: 'Processing Request',
            html: 'Loading, Please wait...',
            backdrop: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading()
            }
        })
    }
}