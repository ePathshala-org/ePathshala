/**
 * 
 * @param {string} term
 */
const GetCoursesResult = function(term)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'search-course');

    let data = 
    {
        term: decodeURI(term)
    };

    http.send(JSON.stringify(data));

    if(http.status == 200)
    {
        return JSON.parse(http.responseText);
    }
    else
    {
        return {ok: false, error: http.error};
    }
};