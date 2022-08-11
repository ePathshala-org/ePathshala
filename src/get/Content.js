/**
 * 
 * @param {number} contentId 
 * @returns {Content}
 */
const GetContentFromId = function(contentId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-content-details',
        content_id: parseInt(contentId)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            let content = new Content();
            content.contentId = response.content_id;
            content.dateOfCreation = response.date_of_Creation;
            content.contentType = response.content_type;
            content.rate = response.rate;
            content.title = response.title;
            content.description = response.description;
            content.courseId = response.course_id;
            content.viewCount = response.viewer_count;

            return content;
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
    if(select == null)
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