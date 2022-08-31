/**
 * 
 * @param {nummber} questionId 
 * @param {any} content 
 */
const UpdateQuestion = function(questionId, content)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'update-question');

    let data = 
    {
        question_id: parseInt(questionId),
        content: content
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

const UpdateQuestionRate = function(userId, questionId, rate)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'update-question-rate');

    let data = 
    {
        user_id: parseInt(userId),
        question_id: parseInt(questionId),
        rate: parseInt(rate)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4)
    {
        if(http.status == 200)
        {
            return JSON.parse(http.responseText);
        }
        else
        {
            return {ok: false, error: http.status};
        }
    }
};