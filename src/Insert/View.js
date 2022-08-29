/**
 * 
 * @param {number} userId
 * @param {number} contentId
 */
const InsertView = function(userId, contentId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'insert-view');

    let data = 
    {
        user_id: parseInt(userId),
        content_id: parseInt(contentId)
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