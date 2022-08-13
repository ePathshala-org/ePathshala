/**
 * 
 * @param {number} contentId 
 * @param {string[]} select
 */
const GetContentFromContentId = function(contentId, select)
{
    if(!Array.isArray(select))
    {
        select = [];
    }

    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-content-details',
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

/**
 * 
 * @param {number} contentId 
 * @param {string[]} select
 * @returns {any | null}
 */
const GetContentsFromCourseId = function(courseId, select)
{
    if(!Array.isArray(select))
    {
        select = [];
    }

    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-course-contents',
        course_id: parseInt(courseId),
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