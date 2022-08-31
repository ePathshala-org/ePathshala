/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');
let params = new URLSearchParams(location.search);

if(userId == null || !params.has('content_id') || student == 'false')
{
    location.replace('index.html');
}

SetupNavBar(userId);
let contentCourse = GetContentFromContentId(params.get('content_id'), ['COURSE_ID']);
let studentCourses = GetCoursesFromStudentId(userId, ['COURSE_ID']);

if(Array.isArray(studentCourses.courses))
{
    let found = false;

    for(let i = 0; i < studentCourses.courses.length; ++i)
    {
        if(studentCourses.courses[i].COURSE_ID == contentCourse.COURSE_ID)
        {
            found = true;

            break;
        }
    }

    if(!found)
    {
        location.replace('index.html');    
    }
}
else
{
    location.replace('index.html');
}

InsertView(userId, params.get('content_id'));
 
let contentDetails = GetContentFromContentId(params.get('content_id'), ['CONTENT_ID','TITLE', 'DESCRIPTION', 'COURSE_ID', 'COURSE_NAME', 'RATE', 'VIEW_COUNT', 'DATE_OF_CREATION']);
let commenteSelected = 0;
let rate = document.getElementsByTagName('span').namedItem('rate-span');
rate.textContent = contentDetails.RATE;

const SetupVideoPlayer = async function()
{
    let videoTitle = document.getElementsByTagName('h3').namedItem('video-title');
    let viewCount = document.getElementsByTagName('h6').namedItem('video-view-count').getElementsByTagName('span').item(0);
    let videoDateOfCreation = document.getElementsByTagName('h6').namedItem('video-date-of-creation');
    let videoRate = document.getElementsByTagName('button').namedItem('video-rate-button').getElementsByTagName('span').item(0);
    let videoCourseButton = document.getElementsByTagName('a').namedItem('video-course-button');
    let videoCourseName = videoCourseButton.getElementsByTagName('h4').item(0);
    let videoDescription = document.getElementsByTagName('div').namedItem('video-description');
    videoTitle.textContent = contentDetails.TITLE;
    viewCount.textContent = contentDetails.VIEW_COUNT;
    videoDateOfCreation.textContent = contentDetails.DATE_OF_CREATION;
    videoRate.textContent = contentDetails.RATE;
    videoCourseName.textContent = contentDetails.COURSE_NAME;
    videoDescription.textContent = contentDetails.DESCRIPTION;
    let videoPlayer = document.getElementsByTagName('video').namedItem('video-player');
    videoCourseButton.onclick = function()
    {
        location.href = 'coursedetails.html?course_id=' + contentDetails.COURSE_ID;
    };
    
    videoPlayer.src = 'contents/videos/' + contentDetails.COURSE_ID + '/' + contentDetails.CONTENT_ID + '.mp4';

    videoPlayer.load();

    videoPlayer.onload = function()
    {
        videoPlayer.play();  
    };

    videoPlayer.onended = function()
    {
        CompleteView(userId, contentDetails.CONTENT_ID);
    };
};

SetupVideoPlayer();

let commentTextArea = document.getElementsByTagName('input').namedItem('new-comment-text');
let commentForm = document.getElementsByTagName('form').namedItem('post-comment-form');

const SetupComments = async function()
{
    commentTextArea.value = '';

    let commentsContainer = document.getElementsByTagName('div').namedItem('comments-container');
    let commentsListUl = document.getElementsByTagName('ul').namedItem('comments-list');
    commentsListUl.innerHTML = '';
    let commentListItemUI = await GetUIText('ui/ListItem/CommentListItem.html');
    let response = GetCommentsFromContentId(contentDetails.CONTENT_ID, ['COMMENT_ID', 'COMMENTER_ID', 'COMMENTER_NAME', 'DESCRIPTION', 'TIME_OF_COMMENT', 'DATE_OF_COMMENT', 'RATE']);
    let emptyCard = document.createElement('div');

    emptyCard.classList.add('card', 'card-body');
    emptyCard.id = 'empty-card';

    emptyCard.textContent = 'Wow! Such empty';

    if(Array.isArray(response.comments))
    {
        if(commentsListUl.style.visibility == 'hidden')
        {
            commentsListUl.style.visibility = 'visible';

            let card = commentsContainer.getElementsByTagName('div').namedItem('empty-card');

            card.remove();
        }

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
            let menus = commentListItemWrapper.getElementsByClassName('menus').item(0);

            if(response.comments[i].COMMENTER_ID == userId)
            {
                let commentEdit = commentListItemWrapper.getElementsByClassName('comment-edit-button').item(0);
                let commentDelete = commentListItemWrapper.getElementsByClassName('comment-delete-button').item(0);

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
            }
            else
            {
                menus.setAttribute('disabled', '');
                
                menus.style.opacity = '0';
            }

            commentRateButton.onclick = function()
            {
                commenteSelected = response.comments[i].COMMENT_ID;
                let individualCommentRate = GetIndividualCommentRate(userId, commenteSelected);
                let commentRateModalInput = document.getElementsByTagName('input').namedItem('comment-rate-input');
                commentRateModalInput.value = individualCommentRate.rate;
            };

            commentsListUl.append(commentListItemWrapper.firstChild);
        }
    }
    else
    {
        commentsListUl.style.visibility = 'hidden';
        
        commentsContainer.append(emptyCard);
    }
};

commentForm.onsubmit = function()
{
    let commentValue = commentTextArea.value;

    PostComment(userId, contentDetails.CONTENT_ID, commentValue);
    SetupComments();

    return false;
};

let commentEditModalElement = document.getElementsByTagName('div').namedItem('comment-edit-modal');
let commentEditModalInput = document.getElementsByTagName('input').namedItem('comment-edit-input');
let commentEditButton = document.getElementsByTagName('button').namedItem('comment-edit-button');
let commentEditModalForm = document.getElementsByTagName('form').namedItem('comment-edit-modal-form');
let commentEditModal = new bootstrap.Modal(document.getElementsByTagName('div').namedItem('comment-edit-modal'));

commentEditModalForm.onsubmit = function()
{
    commentEditModal.hide();
    UpdateComment(commenteSelected, commentEditModalInput.value);
    SetupComments();

    return false;
};

let commentRateModalElement = document.getElementsByTagName('div').namedItem('comment-rate-modal');
let commentRateModalInput = document.getElementsByTagName('input').namedItem('comment-rate-input');
let commentRateUpdateButton = document.getElementsByTagName('button').namedItem('comment-rate-update-button');
let commentRateUpdateForm = document.getElementsByTagName('form').namedItem('comment-rate-update-form');
let commentRateModal = new bootstrap.Modal(commentRateModalElement);

commentRateUpdateForm.onsubmit = function()
{
    commentRateModal.hide();
    UpdateCommentRate(userId, commenteSelected, commentRateModalInput.value);
    SetupComments();

    return false;
};

SetupComments();

let individualContentRate = GetIndividualContentRate(userId, contentDetails.CONTENT_ID);
let videoRate = document.getElementsByTagName('input').namedItem('video-rate-input');
let videoRateForm = document.getElementsByTagName('form').namedItem('video-rate-form');
let videoRateModalElement = document.getElementsByTagName('div').namedItem('video-rate-modal');
let videoRateModal = new bootstrap.Modal(videoRateModalElement);

videoRateModalElement.addEventListener('show.bs.modal', (event)=>
{
    videoRate.value = individualContentRate.rate;
});

videoRateForm.onsubmit = function()
{
    videoRateModal.hide();
    UpdateContentRate(userId, contentDetails.CONTENT_ID, videoRate.value);

    let contentRate = GetContentFromContentId(contentDetails.CONTENT_ID, ['RATE']);
    contentDetails.RATE = contentRate.RATE;
    individualContentRate.rate = contentRate.RATE;
    let videoRateTemp = document.getElementsByTagName('button').namedItem('video-rate-button').getElementsByTagName('span').item(0);
    videoRateTemp.textContent = contentDetails.RATE;

    return false;
};