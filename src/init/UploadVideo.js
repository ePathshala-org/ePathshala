/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');

if(userId == null || student == 'true')
{
    location.replace('index.html');
}

SetupNavBar(userId);

let params = new URLSearchParams(location.search);

if(!params.has('course_id'))
{
    location.replace('teacher.html');
}

let courseId = params.get('course_id');
let courseDetails = GetCourseFromCourseId(courseId, ['CREATOR_ID']);

if(courseDetails.CREATOR_ID != userId)
{
    location.replace('teacher.html');
}

let title = document.getElementsByTagName('input').namedItem('video-title');
let description = document.getElementsByTagName('textarea').namedItem('video-description');
let fileSelect = document.getElementsByTagName('input').namedItem('video-file');
let modalElement = document.getElementsByTagName('div').namedItem('upload-state-modal');
let uploadStateModal = new bootstrap.Modal(modalElement);
let progressBar = document.getElementsByTagName('div').namedItem('upload-progress-bar');
let progressValue = document.getElementsByTagName('span').namedItem('upload-progress-value');
let uploadCancelButton = document.getElementsByTagName('button').namedItem('cancel-video-upload-button');
let uploadForm = document.getElementsByTagName('form').item(0);
uploadForm.onsubmit = function()
{
    if(uploadForm.checkValidity())
    {
        uploadStateModal.show();

        let fileFormData = new FormData();

        fileFormData.append('file', fileSelect.files.item(0));

        let http = new XMLHttpRequest();
        
        http.open('POST', '/');
        http.setRequestHeader('incoming', 'video-file');
        http.setRequestHeader('course_id', courseId);
        http.setRequestHeader('title', title.value);
        http.setRequestHeader('description', description.value);

        http.upload.onprogress = function(ev)
        {
            let value = String(parseInt((ev.loaded / ev.total) * 100)) + '%';
            progressBar.style.width = value;
            progressValue.textContent = value;
        };

        http.onreadystatechange = function(ev)
        {
            if(this.readyState == 4)
            {
                let response = JSON.parse(this.responseText);

                if(response.ok)
                {
                    uploadStateModal.hide();
                    
                    location.href = 'customizecourse.html?course_id=' + courseId;
                }
            }
        }

        http.send(fileFormData);
    }

    return false;
}