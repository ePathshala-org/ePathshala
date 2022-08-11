/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');

SetupNavBar(userId);

const SetupCourses = async function()
{
    let response = null;
    
    while(response == null)
    {
        response = GetCoursesPopular();
    }
    
    let coursesList = document.getElementsByTagName('ul').namedItem('courses-list');
    let coursesListItemUI = await GetUIText('ui/ListItem/CourseListItem.html');
    coursesList.innerHTML = '';

    if(Array.isArray(response.courses))
    {
        for(let i = 0; i < response.courses.length; ++i)
        {
            let coursesListItemWrapper = document.createElement('div');
            coursesListItemWrapper.innerHTML = coursesListItemUI;
            let courseTitle = coursesListItemWrapper.getElementsByTagName('h3').item(0).getElementsByTagName('span').item(0);
            let courseDescription = coursesListItemWrapper.getElementsByTagName('h4').item(0).getElementsByTagName('span').item(0);
            let courseEnrollCount = coursesListItemWrapper.getElementsByClassName('course-enroll-count').item(0).getElementsByTagName('span').item(0);
            let courseRate = coursesListItemWrapper.getElementsByClassName('course-rate').item(0).getElementsByTagName('span').item(0);
            let coursePrice = coursesListItemWrapper.getElementsByClassName('course-price').item(0).getElementsByTagName('span').item(0);
            courseTitle.textContent = response.courses[i].TITLE;
            courseDescription.textContent = response.courses[i].DESCRIPTION;
            courseEnrollCount.textContent = response.courses[i].ENROLL_COUNT;
            courseRate.textContent = response.courses[i].RATE;
            coursePrice.textContent = response.courses[i].PRICE;

            coursesList.append(coursesListItemWrapper.firstChild);
        }
    }
};

SetupCourses();