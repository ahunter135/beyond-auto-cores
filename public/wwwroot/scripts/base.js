// Constants
const PAYMENT_SUCCESS_MESSAGE = 'Payment posted, please check your email to accept invitation.'
const PAYMENT_SUCCESS_MESSAGE_GRADES = 'Purchase Complete.'
const GENERAL_UNKNOWN_ERROR_MESSAGE = 'Something went wrong please try again.'

const alertError = (message = 'Error Occured.') => {
	alert(message)
	return
}

const GLBSwal = Swal.mixin({
	customClass: {
		confirmButton: 'btn btn-warning margin-left-sm',
		cancelButton: 'btn btn-outline-warning',
	},
	buttonsStyling: false,
})

const validationError = (message = 'Error Occured.', header) => {
	GLBSwal.fire(header ? header : 'Warning!', message, 'warning')
}

const enableDisableElement = (el, disabled) => {
	el.disabled = disabled
}

const validator = (type, message) => {
	validationError(message)
}

const loadingButton = (el, label, status) => {
	if (el) {
		let element = document.querySelector(el)
		if (element) {
			element.textContent = label
			enableDisableElement(element, status)
		}
	}
}

const redirectHome = () => {
	window.location.href = `${window.location.origin}/`
}

const redirectRoute = (path) => {
	window.location.href = `${window.location.origin}/${path}`
}

const identifyUser = () => {
	return !!localStorage.getItem('access_token')
}

const copyAffiliateLink = () => {
	navigator.clipboard.writeText($('#affiliate-link').val())
	GLBSwal.fire('Copied!', 'Share affiliate link copied.', 'info')
}

const checkUrlQuery = (field) => {
	let url = window.location.search
	return !!(url.indexOf('?' + field + '=') != -1 || url.indexOf('&' + field + '=') != -1)
}

const loadingBase = (sw, title, html) => {
	GLBSwal.fire({
		title: title,
		html: html,
		allowEscapeKey: false,
		allowOutsideClick: false,
		didOpen: () => {
			sw.showLoading()
		},
	})
}

const confirmModal = (sw, title, html) => {
	return new Promise((resolve, rejected) => {
		GLBSwal.fire({
			title: title,
			text: html,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Proceed',
			cancelButtonText: 'Cancel',
			allowEscapeKey: false,
			allowOutsideClick: false,
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				resolve()
			} else if (result.dismiss === GLBSwal.DismissReason.cancel) {
				rejected()
			}
		})
	})
}

const emailTo = async () => {
	let name = $('#contact-mail-name').val()
	let senderMail = $('#contact-mail-email').val()
	let content = $('#contact-mail-content').val()

	let _swalMain = Swal
	let gldSwlUI = GLBSwal,
		_swal = gldSwlUI

	let postUrl = `${API_URL}/supports/send-message`
	loadingBase(_swal, 'Processing', 'Please Wait...')
	await axios
		.post(
			postUrl,
			JSON.stringify({
				name: name,
				email: senderMail,
				message: content,
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		)
		.then(function (response) {
			_swalMain.close()
			$('#contact-mail-name').val(null)
			$('#contact-mail-email').val(null)
			$('#contact-mail-content').val(null)
			_swal.fire('Success', 'Message Sent', 'success')
		})
		.catch(function (error) {
			_swalMain.close()
			_swal.fire('Failed Submission', 'Message failed to send, please try again.', 'error')
		})
}

const getBinaryFromFile = (file, cb) => {
	const reader = new FileReader()

	reader.addEventListener('load', cb.bind(this, reader.result))

	reader.readAsBinaryString(file)
}
