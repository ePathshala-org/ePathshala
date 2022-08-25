/**
 * @param {number} userId
 * @param {string[]} select
 */
const GetStudentDetailsFromUserId = function(userId, select)
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
        type: 'get-student-details',
        user_id: parseInt(userId),
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
 */
const GetStudentInterests = function(userId)
{
    let http = new XMLHttpRequest();
    
    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-interests',
        user_id: parseInt(userId)
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