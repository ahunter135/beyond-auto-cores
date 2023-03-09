//File Upload response from the server
Dropzone.options.dropzoneForm = {
    maxFiles: 2,
    init: function () {
        this.on("maxfilesexceeded", function (data) {
            var res = eval('(' + data.xhr.responseText + ')');
        });
        this.on("addedfile", function (file) {
            // Create the remove button
            var removeButton = Dropzone.createElement("<button>Remove file</button>");
            // Capture the Dropzone instance as closure.
            var _this = this;
            // Listen to the click event
            removeButton.addEventListener("click", function (e) {
                // Make sure the button click doesn't submit the form:
                e.preventDefault();
                e.stopPropagation();
                // Remove the file preview.
                _this.removeFile(file);
                // If you want to the delete the file on the server as well,
                // you can do the AJAX request here.
            });
            // Add the button to the file preview element.
            file.previewElement.appendChild(removeButton);
        });
    }
};

function readURL(input, image) {
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
}

function hideImage(image) {
    $('#' + image + '-file').val('');
    $('#' + image + '-container').hide();
    $('#' + image + '-customfile-upload-container').show();

    return;
}