/**
 * 
 * @param {number} userId
 * @param {string} interest
 */
const InsertInterest = function(userId, interest)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'insert-interest',
        student_id: parseInt(userId),
        interest: interest
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