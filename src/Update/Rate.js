/**
 * @param {number} userId
 * @param {number} contentId
 * @param {number} rate
 */
const UpdateContentRate = function(userId, contentId, rate)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'update-content-rate');

    let data = 
    {
        user_id: parseInt(userId),
        content_id: parseInt(contentId),
        rate: parseInt(rate)
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