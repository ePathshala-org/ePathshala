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
let courseDetails = GetCourseFromCourseId(courseId, ['COURSE_ID', 'TITLE', 'DESCRIPTION', 'CREATOR_NAME', 'RATE', 'PRICE', 'CREATOR_ID', 'ENROLL_COUNT']);
let courseTitle = document.getElementsByTagName('h1').namedItem('course-title');
let courseCreatorName = document.getElementsByTagName('h4').namedItem('course-creator-name').getElementsByTagName('span').item(0);
let courseDescription = document.getElementsByTagName('h6').namedItem('course-description');
let enrollCount = document.getElementsByTagName('h6').namedItem('enroll-count').getElementsByTagName('span').item(0);
let courseRate = document.getElementsByTagName('h6').namedItem('course-rate').getElementsByTagName('span').item(0);
let coursePrice = document.getElementsByTagName('h6').namedItem('course-price').getElementsByTagName('span').item(0);
courseTitle.textContent = courseDetails.TITLE;
courseCreatorName.textContent = courseDetails.CREATOR_NAME;
courseDescription.textContent = courseDetails.DESCRIPTION;
enrollCount.textContent = courseDetails.ENROLL_COUNT;
courseRate.textContent = courseDetails.RATE;
coursePrice.textContent = courseDetails.PRICE;