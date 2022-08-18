/**
 * 
 * @param {number} teacherId 
 * @param {string} courseTitle 
 * @param {string} courseDescription 
 * @param {number} coursePrice 
 */
const InsertNewCourse = function(teacherId, courseTitle, courseDescription, coursePrice)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'insert-new-course',
        teacher_id: parseInt(teacherId),
        title: courseTitle,
        description: courseDescription,
        price: parseInt(coursePrice)
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