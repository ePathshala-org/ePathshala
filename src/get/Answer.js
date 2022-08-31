/**
 * 
 * @param {number} questionId
 * @param {string[]} select
 * @returns
 */
const GetAnswersFromQuestionId = function(questionId, select)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'get-answers');

    let data =
    {
        question_id: parseInt(questionId),
        select: select
    };

    http.send(JSON.stringify(data));

    if(http.status == 200)
    {
        return JSON.parse(http.responseText);
    }
    else
    {
        return {ok: false, error: http.status};
    }
};

const PostAnswer = function(userId, questionId, answer)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'post-answer');

    let data = 
    {
        user_id: parseInt(userId),
        question_id: parseInt(questionId),
        answer: answer
    };

    http.send(JSON.stringify(data));

    if(http.status == 200)
    {
        return JSON.parse(http.responseText);
    }
    else
    {
        return {ok: false, error: http.status};
    }
}