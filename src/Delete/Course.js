/**
 * 
 * @param {number} courseId
 */
const DeleteCourse = function(courseId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'delete-course',
        course_id: parseInt(courseId)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4)
    {
        if(http.status == 200)
        {
            return http.response;
        }
        else
        {
            return {ok: false, error: http.status};
        }
    }
};