/**
 * 
 * @param {number} userId
 */
const InsertTeacher = function(userId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'insert-teacher',
        user_id: parseInt(userId)
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