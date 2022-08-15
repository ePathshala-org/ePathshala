/**
 * 
 * @param {number} userId 
 * @param {string[] | null}
 * @returns {any}
 */
const GetUserDetails = function(userId, select)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-user-details',
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
 * @param {string} fullName
 * @param {string} email
 * @param {string} bio
 * @param {string} dateOfBirth
 * @param {string} pfpBuffer
 */
const UpdateUserDetails = function(userId, fullName, email, password, bio, dateOfBirth)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'update-user-details',
        user_id: parseInt(userId),
        full_name: fullName,
        email: email,
        password: password,
        bio: bio,
        date_of_birth: dateOfBirth
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