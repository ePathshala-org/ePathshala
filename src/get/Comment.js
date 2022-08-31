/**
 * 
 * @param {number} contentId
 * @param {string[]} select
 */
const GetCommentsFromContentId = function(contentId, select)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data =
    {
        type: 'get-comments',
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
 * @param {number} userId
 * @param {number} contentId
 */
const PostComment = function(userId, contentId, description)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'post-comment',
        user_id: parseInt(userId),
        content_id: parseInt(contentId),
        description: description
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
}

/**
 * 
 * @param {number} commentId 
 */
const DeleteComment = function(commentId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'delete-comment',
        comment_id: parseInt(commentId)
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

/**
 * 
 * @param {number} commentId 
 * @param {number} rate 
 */
const UpdateCommentRate = function(userId, commentId, rate)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'update-comment-rate',
        user_id: parseInt(userId),
        comment_id: parseInt(commentId),
        rate: parseInt(rate)
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
 * @param {number} commentId
 * @param {string} description
 */
const UpdateComment = function(commentId, description)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'update-comment',
        comment_id: parseInt(commentId),
        description: description
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

/**
 * 
 * @param {number} userId 
 * @param {number} commentId 
 */
const GetIndividualCommentRate = function(userId, commentId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'get-individual-comment-rate');

    let data = 
    {
        user_id: parseInt(userId),
        comment_id: parseInt(commentId)
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