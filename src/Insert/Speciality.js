/**
 * 
 * @param {number} userId 
 * @param {string} speciality 
 */
const InsertSpeciality = function(userId, speciality)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'insert-speciality',
        teacher_id: parseInt(userId),
        speciality: speciality
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