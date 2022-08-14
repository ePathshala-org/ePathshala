/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let teacher = localStorage.getItem('teacher');

if(userId == null)
{
    location.replace('index.html');
}

SetupNavBar(userId);

let teacherDetails = GetTeacherDetailsFromUserId(userId, ['USER_ID', 'FULL_NAME', 'EMAIL', 'DATE_OF_BIRTH', 'DATE_OF_JOIN', 'BIO', 'RANK_POINT']);
let teacherPfp = document.getElementsByTagName('img').namedItem('teacher-pfp');
let teacherName = document.getElementsByTagName('h2').namedItem('teacher-name');
let teacherEmail = document.getElementsByTagName('h4').namedItem('teacher-email');
let dateOfJoin = document.getElementsByTagName('h6').namedItem('date-of-join').getElementsByTagName('span').item(0);
let dateOfBirth = document.getElementsByTagName('h6').namedItem('date-of-birth').getElementsByTagName('span').item(0);
let rank = document.getElementsByTagName('h6').namedItem('rank-point').getElementsByTagName('span').item(0);
// let interests = document.getElementsByTagName('h6').namedItem('interests').getElementsByTagName('span').item(0);
let bioContainer = document.getElementsByTagName('div').namedItem('bio-container');
let addBioButton = document.getElementsByTagName('a').namedItem('add-bio-button');

if(teacherDetails.BIO == '')
{
    addBioButton.parentNode.removeChild(bioContainer);

    addBioButton.onclick = function()
    {
        // add bio
    };
}
else
{
    bioContainer.parentNode.removeChild(addBioButton);
    
    let bioCard = document.getElementsByTagName('div').namedItem('bio-card');
    bioCard.textContent = teacherDetails.BIO;
}

teacherName.textContent = teacherDetails.FULL_NAME;
teacherEmail.textContent = teacherDetails.EMAIL;
teacherPfp.src = 'pfp/' + teacherDetails.USER_ID + '.png';
dateOfJoin.textContent = teacherDetails.DATE_OF_JOIN;
dateOfBirth.textContent = teacherDetails.DATE_OF_BIRTH;
rank.textContent = teacherDetails.RANK_POINT;

// let teacherInterests = GetStudentInterests(userId);

let coursesContainer = document.getElementsByTagName('div').namedItem('courses-list-container');
let coursesList = GetCoursesFromTeacherId(userId, ['COURSE_ID', 'TITLE', 'DESCRIPTION', 'RATE']);

const SetupCourses = async function()
{
    if(Array.isArray(coursesList.courses))
    {
        let courseListItemUI = await GetUIText('ui/ListItem/CourseListItem.html');
        let coursesUl = document.getElementsByTagName('ul').namedItem('courses-list');

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

            coursesUl.append(courseListItemWrapper.firstChild);
        }
    }
    else
    {
        coursesContainer.innerHTML = '';
    }
};

SetupCourses();