const UpdatePage = function(contentId, courseId, title, content)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'update-page');

    let data = 
    {
        content_id: parseInt(contentId),
        course_id: parseInt(courseId),
        title: title,
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