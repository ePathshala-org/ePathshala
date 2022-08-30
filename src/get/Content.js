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

/**
 * 
 * @param {number} userId 
 * @param {number} courseId
 */
const GetCourseRemainingContentCountOfUser = function(userId, courseId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-course-remain-content-count',
        user_id: parseInt(userId),
        course_id: parseInt(courseId)
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
 * @param {number} courseId
 */
const GetPageContent = function(contentId, courseId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'get-page-content');

    let data = 
    {
        content_id: parseInt(contentId),
        course_id: parseInt(courseId)
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

/**
 * 
 * @param {number} userId
 * @param {number} contenId
 */
const GetIndividualContentRate = function(userId, contenId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'get-individual-content-rate');

    let data = 
    {
        user_id: parseInt(userId),
        content_id: parseInt(contenId)
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
}