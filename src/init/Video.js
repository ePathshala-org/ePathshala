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

const SetupVideoPlayer = async function()
{
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
};

const SetupComments = async function()
{
    let commentsListUl = document.getElementsByTagName('ul').namedItem('comments-list');
    commentsListUl.innerHTML = '';
    let commentListItemUI = await GetUIText('ui/ListItem/CommentListItem.html');
    let response = GetCommentsFromContentId(contentDetails.CONTENT_ID, ['COMMENT_ID', 'COMMENTER_ID', 'COMMENTER_NAME', 'DESCRIPTION', 'TIME', 'DATE', 'RATE']);

    if(Array.isArray(response.comments))
    {
        for(let i = 0; i < response.comments.length; ++i)
        {
            let commentListItemWrapper = document.createElement('div');
            commentListItemWrapper.innerHTML = commentListItemUI;
            let commenterPfp = commentListItemWrapper.getElementsByTagName('img').item(0);
            let commenterName = commentListItemWrapper.getElementsByClassName('commenter-name').item(0);
            let commentDescription = commentListItemWrapper.getElementsByClassName('comment-description').item(0);
            let commentTime = commentListItemWrapper.getElementsByClassName('comment-time').item(0);
            let commentDate = commentListItemWrapper.getElementsByClassName('comment-date').item(0)
            let commentRateButton = commentListItemWrapper.getElementsByClassName('comment-rate-button').item(0);
            let commentRate = commentRateButton.getElementsByTagName('span').item(0);
            commenterPfp.src = 'pfp/' + response.comments[i].COMMENTER_ID + '.png';
            commenterName.textContent = response.comments[i].COMMENTER_NAME;
            commentDescription.textContent = response.comments[i].DESCRIPTION;
            commentTime.textContent = response.comments[i].TIME;
            commentDate.textContent = response.comments[i].DATE;
            commentRate.textContent = response.comments[i].RATE;

            commentsListUl.append(commentListItemWrapper.firstChild);
        }
    }
};

SetupVideoPlayer();
SetupComments();