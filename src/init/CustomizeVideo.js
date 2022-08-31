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

if(!params.has('content_id'))
{
    location.replace('teacher.html');
}

let contentId = params.get('content_id');
let contentDetails = GetContentFromContentId(contentId, ['TITLE', 'DESCRIPTION', 'COURSE_ID']);
let courseDetails = GetCourseFromCourseId(contentDetails.COURSE_ID, ['CREATOR_ID']);

if(courseDetails.CREATOR_ID != userId)
{
    location.replace('teacher.html');
}

let videoPlayer = document.getElementsByTagName('video').namedItem('video-player');
let title = document.getElementsByTagName('input').namedItem('video-title');
let description = document.getElementsByTagName('textarea').namedItem('video-description');
videoPlayer.src = 'contents/videos/' + contentDetails.COURSE_ID + '/' + contentId + '.mp4';
title.value = contentDetails.TITLE;
description.value = contentDetails.DESCRIPTION;
let fileSelect = document.getElementsByTagName('input').namedItem('video-file');
let modalElement = document.getElementsByTagName('div').namedItem('upload-state-modal');
let uploadStateModal = new bootstrap.Modal(modalElement);
let progressBar = document.getElementsByTagName('div').namedItem('upload-progress-bar');
let progressValue = document.getElementsByTagName('span').namedItem('upload-progress-value');
let saveButton = document.getElementsByTagName('button').namedItem('save-video-button');
let updateVideoForm = document.getElementsByTagName('form').namedItem('update-video-form');
updateVideoForm.onsubmit = function()
{
    saveButton.setAttribute('disabled', '');

    let uploadCancelButton = document.getElementsByTagName('button').namedItem('current-upload-cancel-button');
    let response = UpdateVideo(contentId, title.value, description.value, fileSelect.files.item(0), uploadStateModal, progressBar, progressValue, uploadCancelButton);

    saveButton.removeAttribute('disabled');

    if(response.return == 0)
    {
        location.href = 'customizecourse.html?course_id=' + contentDetails.COURSE_ID;
    }
    else
    {
        let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('duplicate-title-toast'));

        toast.show();
    }

    return false;
};

videoPlayer.src = 'contents/videos/' + contentDetails.COURSE_ID + '/' + contentId + '.mp4';

videoPlayer.load();

videoPlayer.onload = function()
{
    videoPlayer.play();
};