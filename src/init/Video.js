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
let commenteSelected = 0;

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

SetupVideoPlayer();

let commentTextArea = document.getElementsByTagName('input').namedItem('new-comment-text');
let commentPostButton = document.getElementsByTagName('button').namedItem('post-comment-button');

commentTextArea.addEventListener('input', (event)=>
{
    if(event.target.value == '')
    {
        commentPostButton.setAttribute('disabled', '');
    }
    else
    {
        commentPostButton.removeAttribute('disabled');
    }
});

commentPostButton.onclick = function()
{
    let commentValue = commentTextArea.value;

    PostComment(userId, contentDetails.CONTENT_ID, commentValue);

    SetupComments();
};

const SetupComments = async function()
{
    commentTextArea.value = '';

    commentPostButton.setAttribute('disabled', '');

    let commentsListUl = document.getElementsByTagName('ul').namedItem('comments-list');
    commentsListUl.innerHTML = '';
    let commentListItemUI = await GetUIText('ui/ListItem/CommentListItem.html');
    let response = GetCommentsFromContentId(contentDetails.CONTENT_ID, ['COMMENT_ID', 'COMMENTER_ID', 'COMMENTER_NAME', 'DESCRIPTION', 'TIME_OF_COMMENT', 'DATE_OF_COMMENT', 'RATE']);

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
            commentTime.textContent = response.comments[i].TIME_OF_COMMENT;
            commentDate.textContent = response.comments[i].DATE_OF_COMMENT;
            commentRate.textContent = response.comments[i].RATE;
            let commentEdit = commentListItemWrapper.getElementsByClassName('comment-edit-button').item(0);
            let commentDelete = commentListItemWrapper.getElementsByClassName('comment-delete-button').item(0);

            commentRateButton.onclick = function()
            {
                commenteSelected = response.comments[i].COMMENT_ID;
                let commentRateModalInput = document.getElementsByTagName('input').namedItem('comment-rate-input');
                commentRateModalInput.value = response.comments[i].RATE;
            };

            commentEdit.onclick = function()
            {
                commenteSelected = response.comments[i].COMMENT_ID;
                let commentEditModalInput = document.getElementsByTagName('input').namedItem('comment-edit-input');
                commentEditModalInput.value = response.comments[i].DESCRIPTION;
            };

            commentDelete.onclick = function()
            {
                DeleteComment(response.comments[i].COMMENT_ID);

                SetupComments();
            };

            commentsListUl.append(commentListItemWrapper.firstChild);
        }
    }
};

let commentRateModal = document.getElementsByTagName('div').namedItem('comment-rate-modal')
let commentRateModalInput = document.getElementsByTagName('input').namedItem('comment-rate-input');
let commentRateUpdateButton = document.getElementsByTagName('button').namedItem('comment-rate-update-button');

commentRateModalInput.addEventListener('input', (event)=>
{
    if(commentRateModalInput.value == '')
    {
        commentRateUpdateButton.setAttribute('disabled', '');
    }
    else
    {
        commentRateUpdateButton.removeAttribute('disabled');
    }
});

commentRateUpdateButton.onclick = function()
{
    UpdateCommentRate(commenteSelected, commentRateModalInput.value);
    SetupComments();
};

let commentEditModal = document.getElementsByTagName('div').namedItem('comment-edit-modal');
let commentEditModalInput = document.getElementsByTagName('input').namedItem('comment-edit-input');
let commentEditButton = document.getElementsByTagName('button').namedItem('comment-edit-button');

commentEditModalInput.addEventListener('input', (event)=>
{
    if(commentEditModalInput.value == '')
    {
        commentEditButton.setAttribute('disabled', '');
    }
    else
    {
        commentEditButton.removeAttribute('disabled');
    }
});

commentEditButton.onclick = function()
{
    UpdateComment(commenteSelected, commentEditModalInput.value);
    SetupComments();
};

SetupComments();