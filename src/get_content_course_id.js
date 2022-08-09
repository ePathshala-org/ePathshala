/**
 * 
 * @param {number} contentId 
 * @returns {number | null}
 */
const GetContentCourseId = function(contentId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-content-course-id',
        content_id: parseInt(contentId)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            return parseInt(response.course_id);
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