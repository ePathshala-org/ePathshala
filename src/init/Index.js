/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let isStudent = localStorage.getItem('student');

if(userId != null) // not null means already logged in
{
    if(isStudent) // redirect to student page
    {
        location.replace("student.html?user_id=" + userId);
    }
    else // redirect to teacher page
    {
        location.replace("teacher.html?user_id=" + userId)
    }
}