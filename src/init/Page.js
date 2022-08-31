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
let editorElement = document.getElementsByTagName('div').namedItem('editor');
let editor = new Quill(editorElement,
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
let rate = document.getElementsByTagName('span').namedItem('rate-span');
rate.textContent = contentDetails.RATE;
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
    let emptyCard = document.createElement('div');

    emptyCard.classList.add('card', 'card-body');
    emptyCard.id = 'empty-card';

    emptyCard.textContent = 'Wow! Such empty';

    if(Array.isArray(response.comments))
    {
        for(let i = 0; i < response.comments.length; ++i)
        {
            if(commentsListUl.style.visibility == 'hidden')
            {
                commentsListUl.style.visibility = 'visible';

                let card = commentsContainer.getElementsByTagName('div').namedItem('empty-card');

                card.remove();
            }

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
        commentsListUl.remove();
        
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
let pageRate = document.getElementsByTagName('input').namedItem('page-rate-input');
let pageRateForm = document.getElementsByTagName('form').namedItem('page-rate-form');
let pageRateModalElement = document.getElementsByTagName('div').namedItem('page-rate-modal');
let pageRateModal = new bootstrap.Modal(pageRateModalElement);

pageRateModalElement.addEventListener('show.bs.modal', (event)=>
{
    pageRate.value = individualContentRate.rate;
});

pageRateForm.onsubmit = function()
{
    pageRateModal.hide();
    UpdateContentRate(userId, contentDetails.CONTENT_ID, pageRate.value);
    
    let contentRate = GetContentFromContentId(contentDetails.CONTENT_ID, ['RATE']);
    contentDetails.RATE = contentRate.RATE;
    individualContentRate.rate = contentRate.RATE;
    let pageRateTemp = document.getElementsByTagName('button').namedItem('page-rate-button').getElementsByTagName('span').item(0);
    pageRateTemp.textContent = contentDetails.RATE;

    return false;
};

CompleteView(userId, params.get('content_id'));