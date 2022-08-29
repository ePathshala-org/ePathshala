/**
 * 
 * @param {number} contentId
 * @param {string} title
 * @param {string} description
 * @param {File} file
 * @param {Modal} uploadModal
 * @param {HTMLDivElement} progressBar
 * @param {HTMLSpanElement} progressValue
 * @param {HTMLButtonElement} uploadCancelButton
 */
const UpdateVideo = function(contentId, title, description, file, uploadModal, progressBar, progressValue, uploadCancelButton)
{
    let fileFormData = new FormData();

    fileFormData.append('file', file);

    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('type', 'update-video');
    http.setRequestHeader('content_id', contentId);
    http.setRequestHeader('title', title);
    http.setRequestHeader('description', description);

    let modalShown = false;

    if(file == null)
    {
        http.setRequestHeader('file_changed', false);
    }
    else
    {
        http.setRequestHeader('file_changed', true);
        uploadModal.show();

        modalShown = true;
    }

    http.upload.onprogress = function(ev)
    {
        if(modalShown)
        {
            let value = String(parseInt((ev.loaded / ev.total) * 100)) + '%';
            progressBar.style.width = value;
            progressValue.textContent = value;
        }
    };

    uploadCancelButton.onclick = function()
    {
        http.abort();
    };

    http.send(fileFormData);
    uploadModal.hide();

    if(http.status == 200)
    {
        return JSON.parse(http.responseText);
    }
    else
    {
        return {error: http.status};
    }
}