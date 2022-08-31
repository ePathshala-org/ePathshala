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

let questionDetails = GetQuestionDetails(params.get('question_id'), ['QUESTION_ID', 'TITLE', 'ASKER_ID', 'ASKER_NAME',  'DATE_OF_ASK', 'RATE', 'CONTENT']);
let answerSelected = 0;
let questionTitle = document.getElementsByTagName('h2').namedItem('question-title');
let questionAskerName = document.getElementsByTagName('h4').namedItem('question-asker-name');
let rateButton = document.getElementsByTagName('button').namedItem('question-rate-button');
let rateSpan = rateButton.getElementsByTagName('span').item(0);
questionTitle.textContent = questionDetails.TITLE;
questionAskerName.textContent = questionDetails.ASKER_NAME;
rateSpan.textContent = questionDetails.RATE;
let question = new Quill(document.getElementsByTagName('div').namedItem('question'),
{
    modules:
    {
        toolbar: null
    },
    theme: 'snow'
});

question.setContents(questionDetails.CONTENT);
question.enable(false);

let editButton = document.getElementsByTagName('button').namedItem('question-edit-button');
let deleteButton = document.getElementsByTagName('button').namedItem('question-delete-button');

if(userId == null || questionDetails.ASKER_ID != userId)
{
    editButton.remove();
    deleteButton.remove();
}
else
{
    editButton.onclick = function()
    {

    };

    deleteButton.onclick = function()
    {

    };
}

let answerTextArea = document.getElementsByTagName('input').namedItem('new-answer-text');
let answerForm = document.getElementsByTagName('form').namedItem('post-answer-form');

const SetupAnswers = async function()
{
    answerTextArea.value = '';

    let answersContainer = document.getElementsByTagName('div').namedItem('answers-container');
    let answersListUl = document.getElementsByTagName('ul').namedItem('answers-list');
    answersListUl.innerHTML = '';
    let answerListItemUI = await GetUIText('ui/ListItem/ForumAnswer.html');
    let response = GetAnswersFromQuestionId(questionDetails.QUESTION_ID, ['ANSWER_ID', 'QUESTION_ID', 'ANSWERER_ID', 'ANSWERER_NAME', 'ANSWER', 'TIME_OF_ANSWER', 'DATE_OF_ANSWER', 'RATE']);
    
    if(Array.isArray(response.answers))
    {
        for(let i = 0; i < response.answers.length; ++i)
        {
            let answerListItemWrapper = document.createElement('div');
            answerListItemWrapper.innerHTML = answerListItemUI;
            let answererPfp = answerListItemWrapper.getElementsByTagName('img').item(0);
            let answererName = answerListItemWrapper.getElementsByClassName('answerer-name').item(0);
            let answerDescription = answerListItemWrapper.getElementsByClassName('answer-description').item(0);
            let answerTime = answerListItemWrapper.getElementsByClassName('answer-time').item(0);
            let answerDate = answerListItemWrapper.getElementsByClassName('answer-date').item(0)
            let answerRateButton = answerListItemWrapper.getElementsByClassName('answer-rate-button').item(0);
            let answerRate = answerRateButton.getElementsByTagName('span').item(0);
            answererPfp.src = 'pfp/' + response.answers[i].ANSWERER_ID + '.png';
            answererName.textContent = response.answers[i].ANSWERER_NAME;
            answerDescription.textContent = response.answers[i].ANSWER;
            answerTime.textContent = response.answers[i].TIME_OF_ANSWER;
            answerDate.textContent = response.answers[i].DATE_OF_ANSWER;
            answerRate.textContent = response.answers[i].RATE;
            let menus = answerListItemWrapper.getElementsByClassName('menus').item(0);

            if(response.answers[i].ANSWERER_ID == userId)
            {
                let answerEdit = answerListItemWrapper.getElementsByClassName('answer-edit-button').item(0);
                let answerDelete = answerListItemWrapper.getElementsByClassName('answer-delete-button').item(0);

                answerEdit.onclick = function()
                {
                    answerSelected = response.answers[i].ANSWER_ID;
                    let answerEditModalInput = document.getElementsByTagName('input').namedItem('answer-edit-input');
                    answerEditModalInput.value = response.answers[i].ANSWER;
                };

                answerDelete.onclick = function()
                {
                    DeleteAnswer(response.answers[i].ANSWER_ID);
                    SetupAnswers();
                };
            }
            else
            {
                menus.setAttribute('disabled', '');
                
                menus.style.opacity = '0';
            }

            answerRateButton.onclick = function()
            {
                answerSelected = response.answers[i].ANSWER_ID;
                let answerRateModalInput = document.getElementsByTagName('input').namedItem('answer-rate-input');
                answerRateModalInput.value = response.answers[i].RATE;
            };

            answersListUl.append(answerListItemWrapper.firstChild);
        }
    }
    else
    {
        let card = document.createElement('div');

        card.classList.add('card', 'card-body');
        card.textContent = 'Wow! Such empty';

        answersContainer.append(card);
    }
};

SetupAnswers();

answerForm.onsubmit = function()
{
    let answerValue = answerTextArea.value;

    PostAnswer(userId, questionDetails.QUESTION_ID, answerValue);
    SetupAnswers();

    return false;
};

let answerEditModalElement = document.getElementsByTagName('div').namedItem('answer-edit-modal');
let answerEditModalInput = document.getElementsByTagName('input').namedItem('answer-edit-input');
let answerEditButton = document.getElementsByTagName('button').namedItem('answer-edit-button');
let answerEditModalForm = document.getElementsByTagName('form').namedItem('answer-edit-modal-form');
let answerEditModal = new bootstrap.Modal(document.getElementsByTagName('div').namedItem('answer-edit-modal'));

answerEditModalForm.onsubmit = function()
{
    answerEditModal.hide();
    UpdateAnswer(answerSelected, answerEditModalInput.value);
    SetupAnswers();

    return false;
};