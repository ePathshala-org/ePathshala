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

let contentDetails = GetContentFromContentId(params.get('content_id'), ['CONTENT_ID','TITLE', 'DESCRIPTION', 'COURSE_ID', 'COURSE_NAME', 'COURSE_NAME', 'RATE', 'VIEW_COUNT', 'DATE_OF_CREATION']);
let studentCourses = GetCoursesFromStudentId(userId, ['COURSE_ID']);

if(Array.isArray(studentCourses.courses))
{
    let found = false;

    for(let i = 0; i < studentCourses.courses.length; ++i)
    {
        if(studentCourses.courses[i].COURSE_ID == contentDetails.COURSE_ID)
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

let editor = new Quill(document.getElementsByTagName('div').namedItem('editor'),
{
    modules:
    {
        toolbar: null
    },
    theme: 'snow'
});

let pageTitle = document.getElementsByTagName('h2').namedItem('page-title');
let courseTitleButton = document.getElementsByTagName('a').namedItem('course-title-button');
let courseTitle = courseTitleButton.getElementsByTagName('h4').item(0);
pageTitle.textContent = contentDetails.TITLE;
courseTitle.textContent = contentDetails.COURSE_NAME;
let readerCount = document.getElementsByTagName('h6').namedItem('page-read-count').getElementsByTagName('span').item(0);
let dateOfCreation = document.getElementsByTagName('h6').namedItem('page-date-of-creation');
readerCount.textContent = contentDetails.VIEW_COUNT;
dateOfCreation.textContent = contentDetails.DATE_OF_CREATION;
let content = GetPageContent(contentDetails.CONTENT_ID, contentDetails.COURSE_ID);

courseTitleButton.onclick = function()
{
    location.href = 'coursedetails.html?course_id=' + contentDetails.COURSE_ID;
};

const SetupEditor = async function(editor)
{
    editor.enable(false);
    editor.setContents(content.content);
};

SetupEditor(editor);

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
    else
    {
        commentsListUl.remove();
        let card = document.createElement('div');

        card.classList.add('card', 'card-body');

        card.textContent = 'Wow! Such empty';
        
        commentsContainer.append(card);
    }
};

commentForm.onsubmit = function()
{
    let commentValue = commentTextArea.value;

    PostComment(userId, contentDetails.CONTENT_ID, commentValue);
    SetupComments();

    return false;
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

SetupComments();