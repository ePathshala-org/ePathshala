/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');
let params = new URLSearchParams(location.search);

if(userId == null || !params.has('course_id'))
{
    location.replace('course.html');
}

SetupNavBar(userId);

let courseId = parseInt(params.get('course_id'));