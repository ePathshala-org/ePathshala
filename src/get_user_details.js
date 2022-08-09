const GetUserDetails = function(userId, accountType)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: '',
        user_id: parseInt(userId)
    };

    if(accountType == 'student')
    {
        data.type = 'get-student-details';
    }
    else
    {
        data.type = 'get-teacher-details';
    }

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