/**
 * 
 * @param {number} askerId
 * @param {string} title
 * @param {string[]} tags
 * @param {string} content
 */
const InsertForumQuestion = function(askerId, title, tags, content)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'insert-question');

    let data = 
    {
        asker_id: parseInt(askerId),
        title: title,
        tags: tags,
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