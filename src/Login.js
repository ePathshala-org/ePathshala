/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} student
 * @returns {Promise<number>}
 */
const Login = async function(email, password, student)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-user-id',
        email: email,
        security_key: password,
        student: student
    };

    http.send(JSON.stringify(data));

    canLogin = false;

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            return response.user_id;
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
}