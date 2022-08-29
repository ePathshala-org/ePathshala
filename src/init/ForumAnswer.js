/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let isStudent = localStorage.getItem('student');

SetupNavBar(userId);

let params = new URLSearchParams(location.search);

if(!params.has('question_id'))
{
    location.replace('forumquestions.html');
}

let questionDetails = GetQuestionDetails(params.get('question_id'), ['TITLE', 'ASKER_ID', 'ASKER_NAME',  'DATE_OF_ASK', 'RATE', 'CONTENT']);
let questionTitle = document.getElementsByTagName('h2').namedItem('question-title');
let questionAskerName = document.getElementsByTagName('h4').namedItem('question-asker-name');
let rateButton = document.getElementsByTagName('button').namedItem('question-rate-button');
let rateSpan = rateButton.getElementsByTagName('span').item(0);
questionTitle.textContent = questionDetails.TITLE;
questionAskerName.textContent = questionDetails.ASKER_NAME;
rateSpan.textContent = questionDetails.RATE;
let editor = new Quill(document.getElementsByTagName('div').namedItem('editor'),
{
    modules:
    {
        toolbar: null
    },
    theme: 'snow'
});

editor.setContents(questionDetails.CONTENT);
editor.enable(false);

let editButton = document.getElementsByTagName('button').namedItem('edit-question-button');
let deleteButton = document.getElementsByTagName('button').namedItem('delete-question-button');
deleteButton.onclick = function()
{
    
};

if(userId == null || questionDetails.ASKER_ID != userId)
{
    editButton.remove();
    deleteButton.remove();
}