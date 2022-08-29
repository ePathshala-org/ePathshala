/**
 * 
 * @param {string} title
 * @param {number} courseId
 * @param {string} content
 */
const InsertPage = function(title, courseId, content)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'insert-page');
    
    let data = 
    {
        title: title,
        course_id: parseInt(courseId),
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