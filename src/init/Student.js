/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');
let params = new URLSearchParams(location.search);

if(userId == null || !params.has('user_id'))
{
    location.replace('index.html');
}

SetupNavBar(userId);

let studentDetails = GetStudentDetailsFromUserId(userId, ['USER_ID', 'FULL_NAME', 'EMAIL', 'DATE_OF_BIRTH', 'DATE_OF_JOIN', 'BIO', 'RANK_POINT']);
let studentPfp = document.getElementsByTagName('img').namedItem('student-pfp');
let studentName = document.getElementsByTagName('h2').namedItem('student-name');
let studentEmail = document.getElementsByTagName('h4').namedItem('student-email');
let dateOfJoin = document.getElementsByTagName('h6').namedItem('date-of-join').getElementsByTagName('span').item(0);
let dateOfBirth = document.getElementsByTagName('h6').namedItem('date-of-birth').getElementsByTagName('span').item(0);
let rank = document.getElementsByTagName('h6').namedItem('rank-point').getElementsByTagName('span').item(0);
// let interests = document.getElementsByTagName('h6').namedItem('interests').getElementsByTagName('span').item(0);
let bioContainer = document.getElementsByTagName('div').namedItem('bio-container');
let addBioButton = document.getElementsByTagName('a').namedItem('add-bio-button');

if(studentDetails.BIO == '')
{
    addBioButton.parentNode.removeChild(bioContainer);

    addBioButton.onclick = function()
    {

    };
}
else
{
    bioContainer.parentNode.removeChild(addBioButton);
    
    let bioCard = document.getElementsByTagName('div').namedItem('bio-card');
    bioCard.textContent = studentDetails.BIO;
}

studentName.textContent = studentDetails.FULL_NAME;
studentEmail.textContent = studentDetails.EMAIL;
studentPfp.src = 'pfp/' + studentDetails.USER_ID + '.png';
dateOfJoin.textContent = studentDetails.DATE_OF_JOIN;
dateOfBirth.textContent = studentDetails.DATE_OF_BIRTH;
rank.textContent = studentDetails.RANK_POINT;

// let studentInterests = GetStudentInterests(userId);

let coursesContainer = document.getElementsByTagName('div').namedItem('courses-list-container');
let coursesList = GetCoursesFromStudentId(userId, ['COURSE_ID', 'TITLE', 'DESCRIPTION']);

const SetupCourses = async function()
{
    if(Array.isArray(coursesList.courses))
    {
        
    }
    else
    {
        coursesContainer.innerHTML = ''
    }
};