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

let teacherDetails = GetTeacherDetailsFromUserId(userId, ['USER_ID', 'FULL_NAME', 'EMAIL', 'DATE_OF_BIRTH', 'DATE_OF_JOIN', 'BIO', 'RATE']);
let teacherPfp = document.getElementsByTagName('img').namedItem('teacher-pfp');
let teacherName = document.getElementsByTagName('h2').namedItem('teacher-name');
let teacherEmail = document.getElementsByTagName('h4').namedItem('teacher-email');
let dateOfJoin = document.getElementsByTagName('h6').namedItem('date-of-join').getElementsByTagName('span').item(0);
let dateOfBirth = document.getElementsByTagName('h6').namedItem('date-of-birth').getElementsByTagName('span').item(0);
let rate = document.getElementsByTagName('h6').namedItem('rate').getElementsByTagName('span').item(0);
let bioContainer = document.getElementsByTagName('div').namedItem('bio-container');
let addBioButton = document.getElementsByTagName('a').namedItem('add-bio-button');

if(teacherDetails.BIO == '')
{
    addBioButton.parentNode.removeChild(bioContainer);
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
rate.textContent = teacherDetails.RATE;
let specialitiesH6 = document.getElementsByTagName('h6').namedItem('specialities');
let specialitiesSpan = specialitiesH6.getElementsByTagName('span').item(0);
let specialities = GetTeacherSpecialities(userId);

if(Array.isArray(specialities.specialities))
{
    specialitiesSpan.textContent = '';

    for(let i = 0; i < specialities.specialities.length; ++i)
    {
        if(i == 0)
        {
            specialitiesSpan.textContent += specialities.specialities[i];
        }
        else
        {
            specialitiesSpan.textContent += ', ' + specialities.specialities[i];
        }
    }
}
else
{
    specialitiesH6.remove();

    let bulletsBeforeSpecialities = document.getElementsByTagName('span').namedItem('bullet-before-specialities');

    bulletsBeforeSpecialities.remove();
}

let coursesContainer = document.getElementsByTagName('div').namedItem('courses-list-container');
let coursesList = GetCoursesFromTeacherId(userId, ['COURSE_ID', 'TITLE', 'DESCRIPTION', 'RATE', 'ENROLL_COUNT', 'PRICE']);

const SetupCourses = async function()
{
    let coursesUl = document.getElementsByTagName('ul').namedItem('courses-list');

    if(Array.isArray(coursesList.courses))
    {
        let courseListItemUI = await GetUIText('ui/ListItem/CourseListItem.html');
        coursesUl.innerHTML = '';

        for(let i = 0; i < coursesList.courses.length; ++i)
        {
            let courseListItemWrapper = document.createElement('div');
            courseListItemWrapper.innerHTML = courseListItemUI;
            let courseTitleButton = courseListItemWrapper.getElementsByClassName('course-title-button').item(0);
            let courseTitle = courseListItemWrapper.getElementsByClassName('course-title').item(0);
            let courseDescription = courseListItemWrapper.getElementsByClassName('course-description').item(0);
            let rate = courseListItemWrapper.getElementsByClassName('course-rate').item(0).getElementsByTagName('span').item(0);
            let enrollCount = courseListItemWrapper.getElementsByClassName('course-enroll-count').item(0).getElementsByTagName('span').item(0);
            let price = courseListItemWrapper.getElementsByClassName('course-price').item(0).getElementsByTagName('span').item(0);
            let courseDeleteButton = courseListItemWrapper.getElementsByClassName('delete-course-button').item(0);

            courseTitle.textContent = coursesList.courses[i].TITLE;
            courseDescription.textContent = coursesList.courses[i].DESCRIPTION;
            rate.textContent = coursesList.courses[i].RATE;
            enrollCount.textContent = coursesList.courses[i].ENROLL_COUNT;
            price.textContent = coursesList.courses[i].PRICE;

            courseTitleButton.onclick = function()
            {
                location.href = 'customizecourse.html?course_id=' + coursesList.courses[i].COURSE_ID;
            };

            courseDeleteButton.onclick = function()
            {
                DeleteCourse(coursesList.courses[i].COURSE_ID);
                location.reload();
            };

            coursesUl.append(courseListItemWrapper.firstChild);
        }
    }
    else
    {
        coursesUl.remove();

        let alert = document.createElement('div');

        alert.classList.add('alert', 'alert-secondary');
        alert.setAttribute('role', 'alert');

        alert.textContent = 'Wow! Such empty. Create some courses';

        coursesContainer.append(alert);
    }
};

SetupCourses();

document.getElementsByTagName('div').namedItem('new-course-modal').addEventListener('show.bs.modal', ()=>
{
    let courseTitle = document.getElementsByTagName('input').namedItem('new-course-title');
    let courseDescription = document.getElementsByTagName('textarea').namedItem('new-course-description');
    let coursePrice = document.getElementsByTagName('input').namedItem('new-course-price');
    courseTitle.value = '';
    courseDescription.value = '';
    coursePrice.value = '';
});

let addCourse = document.getElementsByTagName('button').namedItem('add-course-button');

addCourse.onclick = function()
{
    addCourse.setAttribute('disabled', '');

    let courseTitle = document.getElementsByTagName('input').namedItem('new-course-title');
    let courseDescription = document.getElementsByTagName('textarea').namedItem('new-course-description');
    let coursePrice = document.getElementsByTagName('input').namedItem('new-course-price');
    let response = InsertNewCourse(userId, courseTitle.value, courseDescription.value, coursePrice.value);

    addCourse.removeAttribute('disabled');

    if(response.return == 0)
    {
        location.reload();
    }
    else
    {
        let toast = new bootstrap.Toast(document.getElementById('empty-title-toast'));

        toast.show();
    }
};