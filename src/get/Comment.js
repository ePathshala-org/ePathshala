/**
 * 
 * @param {number} contentId
 * @param {string[]} select
 */
const GetCommentsFromContentId = function(contentId, select)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data =
    {
        type: 'get-comments',
        content_id: parseInt(contentId),
        select: select
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            return response;
        }
        else
        {
            return null;
        }
    }
    else
    {
        return null;
    }
};