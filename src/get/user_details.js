const GetUserDetails = function(userId, accountType)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-user-details',
        user_id: parseInt(userId)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        return JSON.parse(http.responseText);
    }
    else
    {
        return null;
    }
};