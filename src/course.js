const root = document.getElementsByTagName('div').namedItem('root');
const navBar = document.getElementsByTagName('nav').namedItem('navbar-course');
const params = new URLSearchParams(window.location.search);
let loginStatus = false;
/**
 * @type {number | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let password = localStorage.getItem('password');
/**
 * @type {string | null}
 */
let accountType = localStorage.getItem('account_type');
let userDetails = null;

if(userId != null)
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
        userDetails = JSON.parse(http.responseText);
    }
}

SetupNavBar(userDetails, navBar);

if(params.has('course_id'))
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', true);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-course-details',
        course_id: parseInt(params.get('course_id'))
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);
        let courseTitle = root.getElementsByTagName('h3').namedItem('course-name-h3');
        let courseCreator = root.getElementsByTagName('h5').namedItem('course-creator-name');
        let courseDescription = root.getElementsByTagName('h6').namedItem('course-description');
        let enrollCount = root.getElementsByTagName('p').namedItem('course-number-of-enrolls');
        let rate = root.getElementsByTagName('p').namedItem('course-rate');
        courseTitle.textContent = respone.title;
        courseDescription.textContent = response.description;
        courseCreator.textContent = response.creator_name;
        enrollCount.textContent = response.enroll_count + ' enrolls';
        rate.textContent = 'Rate: ' + response.rate + '/5';
    }
}
else
{
    // show all courses
}