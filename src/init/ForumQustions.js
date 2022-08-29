/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let isStudent = localStorage.getItem('student');
 
SetupNavBar(userId);

// let loginModal = new bootstrap.Modal(document.getElementsByTagName('div').namedItem('login-modal'));

let editor = new Quill(document.getElementsByTagName('div').namedItem('post-editor'),
{
    modules:
    {
        toolbar: [['bold', 'italic', 'underline'], ['link', 'image']]
    },
    theme: 'snow'
});

/**
 * @type {string[]}
 */
let tags = [];
let addTagInput = document.getElementsByTagName('input').namedItem('add-tag-input');
let addTagForm = document.getElementsByTagName('form').namedItem('add-tag-form');
let tagsList = document.getElementsByTagName('div').namedItem('new-post-tags-list');
let pfpButton = document.getElementsByTagName('a').namedItem('pfp-button');
let postTitleInput = document.getElementsByTagName('input').namedItem('post-question-input');
let postButton = document.getElementsByTagName('button').namedItem('confirm-question-post-button');
let questionModalElement = document.getElementsByTagName('div').namedItem('question-modal');
let questionModal = new bootstrap.Modal(questionModalElement);
let postForm = document.getElementsByTagName('form').namedItem('question-form');
let confirmQuestionButton = document.getElementsByTagName('button').namedItem('confirm-question-post-button');
postForm.onsubmit = function()
{
    tags = [];

    if(userId == null)
    {
        loginModal.show();
    }
    else
    {
        questionModal.show();
    }

    return false;
};

confirmQuestionButton.onclick = function()
{
    confirmQuestionButton.setAttribute('disabled','');

    let response = InsertForumQuestion(userId, postTitleInput.value, tags, editor.getContents());

    if(response.return != -1)
    {
        location.reload();
    }

    questionModal.hide();
    confirmQuestionButton.removeAttribute('disabled');

    postTitleInput.value = '';
};

addTagForm.onsubmit = function()
{
    let tagDiv = document.createElement('div');
    tagDiv.classList.add('d-flex', 'justify-content-center');
    let tag = document.createElement('span');
    tag.classList.add('me-1');
    let link = document.createElement('a');
    let image = document.createElement('img');
    link.href = 'javascript:';
    image.src = 'assets/16x16/cancel.png';

    link.append(image);    
    tagDiv.classList.add('border', 'rounded', 'p-2', 'border-success', 'question-tag', 'me-1');
    
    tag.textContent = addTagInput.value;

    hasTag = false;

    for(let i = 0; i < tags.length; ++i)
    {
        if(tags[i] == addTagInput.value)
        {
            hasTag = true;

            break;
        }
    }

    if(!hasTag)
    {
        tags.push(addTagInput.value);
        tagDiv.append(tag, link);
        tagsList.append(tagDiv);

        link.onclick = function()
        {
            tags.splice(tags.indexOf(addTagInput.value));
            tagDiv.remove();
        };
    }

    addTagInput.value = '';

    return false;
};

questionModalElement.addEventListener('shown.bs.modal', (event)=>
{
    tagsList.innerHTML = '';
    addTagInput.value = '';
    editor.setContents(null);
});

let questionsUl = document.getElementsByTagName('ul').namedItem('questions-list');

const SetupQuestions = async function()
{
    let questionsResponse = GetQuestions(['QUESTION_ID', 'TITLE', 'ASKER_ID', 'ASKER_NAME', 'DATE_OF_ASK', 'RATE']);
    let questionListItemUIText = await GetUIText('ui/ListItem/ForumQuestion.html');

    if(Array.isArray(questionsResponse.questions))
    {
        for(let i = 0; i < questionsResponse.questions.length; ++i)
        {
            let questionListItemWrapper = document.createElement('div');
            questionListItemWrapper.innerHTML = questionListItemUIText;
            let titleButton = questionListItemWrapper.getElementsByClassName('question-title-button').item(0);
            let title = titleButton.getElementsByTagName('h2').item(0);
            let askerName = questionListItemWrapper.getElementsByClassName('asker-h5').item(0);
            let rate = questionListItemWrapper.getElementsByClassName('rate').item(0);
            let date = questionListItemWrapper.getElementsByClassName('date').item(0);
            title.textContent = questionsResponse.questions[i].TITLE;
            askerName.textContent = questionsResponse.questions[i].ASKER_NAME;
            rate.textContent = questionsResponse.questions[i].RATE;
            date.textContent = questionsResponse.questions[i].DATE_OF_ASK;

            questionsUl.append(questionListItemWrapper.firstChild);

        }
    }
    else
    {

    }
};

SetupQuestions();