/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');

if(userId == null)
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
let interestsH6 = document.getElementsByTagName('h6').namedItem('interests');
let interestsSpan = interestsH6.getElementsByTagName('span').item(0);
let interestsResponse = GetStudentInterests(userId);

if(Array.isArray(interestsResponse.interests))
{
    interestsSpan.textContent = '';

    for(let i = 0; i < interestsResponse.interests.length; ++i)
    {
        if(i == 0)
        {
            interestsSpan.textContent += interestsResponse.interests[i];
        }
        else
        {
            interestsSpan.textContent += ', ' + interestsResponse.interests[i];
        }
    }
}
else
{
    interestsH6.remove();
    
    let bulletsBeforeInterests = document.getElementsByTagName('span').namedItem('bullet-before-interests');

    bulletsBeforeInterests.remove();
}

let coursesContainer = document.getElementsByTagName('div').namedItem('courses-list-container');
let coursesList = GetCoursesFromStudentId(userId, ['COURSE_ID', 'TITLE', 'DESCRIPTION', 'RATE']);

const SetupCourses = async function()
{
    let coursesUl = document.getElementsByTagName('ul').namedItem('courses-list');

    if(Array.isArray(coursesList.courses))
    {
        let courseListItemUI = await GetUIText('ui/ListItem/CourseListItem.html');

        for(let i = 0; i < coursesList.courses.length; ++i)
        {
            let courseListItemWrapper = document.createElement('div');
            courseListItemWrapper.innerHTML = courseListItemUI;
            let courseTitleButton = courseListItemWrapper.getElementsByClassName('course-title-button').item(0);
            let courseTitle = courseListItemWrapper.getElementsByClassName('course-title').item(0);
            let courseDescription = courseListItemWrapper.getElementsByClassName('course-description').item(0);
            let rate = courseListItemWrapper.getElementsByClassName('course-rate').item(0).getElementsByTagName('span').item(0);
            let enrollCount = courseListItemWrapper.getElementsByClassName('course-enroll-count').item(0);
            let price = courseListItemWrapper.getElementsByClassName('course-price').item(0);
            let right = courseListItemWrapper.getElementsByClassName('right').item(0);
            let remain = document.createElement('h6');
            let remainSpan = document.createElement('span');
            remain.textContent = 'Remaining: ';
            let contentCountResponse = GetCourseRemainingContentCountOfUser(userId, coursesList.courses[i].COURSE_ID);
            remainSpan.textContent = contentCountResponse.CONTENT_COUNT;

            remain.append(remainSpan);
            right.append(remain);

            price.remove();
            enrollCount.remove();

            courseTitle.textContent = coursesList.courses[i].TITLE;
            courseDescription.textContent = coursesList.courses[i].DESCRIPTION;
            rate.textContent = coursesList.courses[i].RATE;

            courseTitleButton.onclick = function()
            {
                location.href = 'coursedetails.html?course_id=' + coursesList.courses[i].COURSE_ID;
            };

            let deleteCourseContainer = courseListItemWrapper.getElementsByClassName('delete-container').item(0);
            deleteCourseContainer.remove();

            coursesUl.append(courseListItemWrapper.firstChild);
        }
    }
    else
    {
        coursesUl.remove();

        let alert = document.createElement('div');

        alert.classList.add('alert', 'alert-secondary');
        alert.setAttribute('role', 'alert');

        alert.textContent = 'Wow! Such empty. Checkout some courses';

        coursesContainer.append(alert);
    }
};

SetupCourses();