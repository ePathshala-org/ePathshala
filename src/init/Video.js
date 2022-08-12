/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');
let params = new URLSearchParams(location.search);

if(userId == null || !params.has('content_id'))
{
    location.replace('index.html');
}

SetupNavBar(userId);

let contentDetails = GetContentFromContentId(params.get('content_id'), ['CONTENT_ID','TITLE', 'DESCRIPTION', 'COURSE_ID', 'COURSE_NAME', 'RATE', 'VIEW_COUNT', 'DATE_OF_CREATION']);
let videoTitle = document.getElementsByTagName('h3').namedItem('video-title');
let viewCount = document.getElementsByTagName('h6').namedItem('video-view-count').getElementsByTagName('span').item(0);
let videoDateOfCreation = document.getElementsByTagName('h6').namedItem('video-date-of-creation');
let videoRate = document.getElementsByTagName('button').namedItem('video-rate-button').getElementsByTagName('span').item(0);
let videoCourseName = document.getElementsByTagName('a').namedItem('video-course-button').getElementsByTagName('h4').item(0);
let videoDescription = document.getElementsByTagName('div').namedItem('video-description');
videoTitle.textContent = contentDetails.TITLE;
viewCount.textContent = contentDetails.VIEW_COUNT;
videoDateOfCreation.textContent = contentDetails.DATE_OF_CREATION;
videoRate.textContent = contentDetails.RATE;
videoCourseName.textContent = contentDetails.COURSE_NAME;
videoDescription.textContent = contentDetails.DESCRIPTION;
let videoPlayer = document.getElementsByTagName('video').namedItem('video-player');
videoPlayer.src = 'contents/videos/' + contentDetails.COURSE_ID + '/' + contentDetails.CONTENT_ID + '.mp4';
videoPlayer.load();