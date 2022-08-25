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

let fileSelect = document.getElementsByTagName('input').namedItem('video-file');
let modalElement = document.getElementsByTagName('div').namedItem('upload-state-modal');
let uploadStateModal = new bootstrap.Modal(modalElement);
let progressBar = document.getElementsByTagName('div').namedItem('upload-progress-bar');

let uploadForm = document.getElementsByTagName('form').item(0);
uploadForm.onsubmit = function()
{
    uploadStateModal.show();

    let fileFormData = new FormData();

    fileFormData.append('file', fileSelect.files.item(0));

    let http = new XMLHttpRequest();
    
    http.open('POST', '/server-test', false);
    http.setRequestHeader('Incoming', 'video-file');

    http.upload.onprogress = function(ev)
    {
        console.log('again hehe ' + ev.loaded + ' ' + ev.total);
        console.log(String(parseInt((ev.loaded / ev.total) * 100)));
        progressBar.style.width = String(parseInt((ev.loaded / ev.total) * 100)) + '%';
    };

    http.send(fileFormData);

    return false;
}