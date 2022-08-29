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

let content = GetPageContent(contentId, contentDetails.COURSE_ID);

let editor = new Quill(document.getElementsByTagName('div').namedItem('editor'),
{
    modules:
    {
        toolbar: 
        [
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{size: []}, {color: []}, {font: []}, {align: []}],

        ]
    },
    theme: 'snow'
});

let pageTitle = document.getElementsByTagName('input').namedItem('page-title');
pageTitle.value = contentDetails.TITLE;
let saveButton = document.getElementsByTagName('button').namedItem('save-page-button');
let pageForm = document.getElementsByTagName('form').namedItem('page-title-form');
pageForm.onsubmit = function()
{
    saveButton.setAttribute('disabled', '');
    
    let response = UpdatePage(contentId, contentDetails.COURSE_ID, pageTitle.value, editor.getContents());

    if(response.return == 0)
    {
        location.href = 'customizecourse.html?course_id=' + contentDetails.COURSE_ID;
    }

    saveButton.removeAttribute('disabled');

    return false;
};

editor.setContents(content.content);