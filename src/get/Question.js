/**
 * 
 * @param {string[]} select
 */
const GetQuestions = function(select)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'get-questions');

    let data = 
    {
        select: select
    }

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

/**
 * 
 * @param {number} questionId 
 * @param {string[]} select 
 */
const GetQuestionDetails = function(questionId, select)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'get-question-details');

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

const GetIndividualQuestionRate = function(userId, questionId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'get-individual-question-rate');

    let data = 
    {
        user_id: parseInt(userId),
        question_id: parseInt(questionId)
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