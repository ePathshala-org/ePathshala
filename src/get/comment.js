/**
 * 
 * @param {number} contentId 
 * @returns {ContentComment[] | null}
 */
const GetCommentsFromContentId = function(contentId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data =
    {
        type: 'get-comments',
        content_id: parseInt(contentId)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            let comments = [];

            if(Array.isArray(response.comments))
            {
                for(let i = 0; i < response.comments.length; ++i)
                {
                    let comment = new ContentComment();
                    comment.commentId = response.comments[i].comment_id;
                    comment.contentId = response.comments[i].content_id;
                    comment.commenterId = response.comments[i].commenter_id;
                    comment.commenterName = response.comments[i].commenter_name;
                    comment.description = response.comments[i].description;
                    comment.timeOfComment = response.comments[i].time_of_comment;
                    comment.dateOfComment = response.comments[i].date_of_comment;
                    comment.rate = response.comments[i].rate;

                    comments.push(comment);
                }
            }

            return comments;
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