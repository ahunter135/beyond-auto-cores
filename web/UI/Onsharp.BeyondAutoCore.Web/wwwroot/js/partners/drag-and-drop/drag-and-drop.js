"use strict";

var DragAndDrop = function () {
    var init = function () {
        // ************************ Drag and drop ***************** //
        let dropAreas = document.getElementsByClassName("drop-area");
        dropAreas.forEach(function (obj, idx) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                obj.addEventListener(eventName, preventDefaults, false)
                document.body.addEventListener(eventName, preventDefaults, false)
            });

            // Highlight drop area when item is dragged over it
            ['dragenter', 'dragover'].forEach(eventName => {
                obj.addEventListener(eventName, highlight, false)
            });

            ['dragleave', 'drop'].forEach(eventName => {
                obj.addEventListener(eventName, unhighlight, false)
            });

            // Handle dropped files
            obj.addEventListener('drop', handleDrop, false);

            // Prevent default drag behaviors
            function preventDefaults(e) {
                e.preventDefault()
                e.stopPropagation()
            }

            function highlight(e) {
                obj.classList.add('highlight')
            }

            function unhighlight(e) {
                obj.classList.remove('highlight')
            }

            function handleDrop(e) {
                var dt = e.dataTransfer
                var files = dt.files

                handleFiles(files)
            }

            let uploadProgress = []

            function initializeProgress(numFiles) {
                uploadProgress = []

                for (let i = numFiles; i > 0; i--) {
                    uploadProgress.push(0)
                }
            }

            function handleFiles(files) {
                var inputFile = $(obj).find('input[type=file]');
                inputFile[0].files = files;
                files = [...files]
                initializeProgress(files.length)
                files.forEach(uploadFile)
                files.forEach(previewFile)
            }

            function previewFile(file) {
                let reader = new FileReader()

                reader.onload = function (e) {
                    var image = $(obj).find('input[type=file]').attr("data-input-id");
                  
                    $('#' + image)
                        .attr('src', e.target.result)
                        .width('auto')
                        .height('100%');
                    if (image.includes("-")) {
                        image = image.split("-")[0];
                    }
                    $('#' + image + '-container').show();
                    $('#' + image + '-customfile-upload-container').hide();
                };

                reader.readAsDataURL(file)
            }


            function uploadFile(file, i) {
                var formData = new FormData()
                formData.append('file', file)
            }

        });
         
        
       

    }

    return {
        init: function () {
            init();
        }
    }
}();
KTUtil.onDOMContentLoaded(function () {
    DragAndDrop.init();
});