/**
 * 
 * @param {number} courseId
 * @param {string} title
 * @param {string} description
 * @param {number} price
 */
const UpdateCourse = function(courseId, title, description, price)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'update-course',
        course_id: parseInt(courseId),
        title: title,
        description: description,
        price: parseInt(price)
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