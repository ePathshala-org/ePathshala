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
    location.replace('index.html');
}

let courseId = params.get('course_id');
let courseDetails = GetCourseFromCourseId(courseId, ['CREATOR_ID']);

if(courseDetails.CREATOR_ID != userId)
{
    location.replace('index.html');
}

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
let pageForm = document.getElementsByTagName('form').namedItem('page-title-form');
pageForm.onsubmit = function()
{
    InsertPage(pageTitle.value, courseId, editor.getContents());

    location.href = 'customizecourse.html?course_id=' + courseId;

    return false;
};