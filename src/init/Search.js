/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let isStudent = localStorage.getItem('student');
let params = new URLSearchParams(location.search);

if(!params.has('term'))
{
    location.replace('index.html');
}

let term = params.get('term');

const SetupCourseResult = async function()
{
    let coursesResult = GetCoursesResult(term);
    let coursesResultContainer = document.getElementsByTagName('div').namedItem('courses-result');
    let coursesUl = document.getElementsByTagName('ul').namedItem('courses-list');
    coursesUl.innerHTML = '';

    if(Array.isArray(coursesResult.courses))
    {
        for(let i = 0; i < coursesResult.courses.length; ++i)
        {
            let link = document.createElement('a');
            link.classList.add('text-decoration-none');
            link.href = 'javascript:';
            link.textContent = coursesResult.courses.TITLE;
            link.onclick = function()
            {
                location.href = 'coursedetails.html?course_id=' + coursesResult.courses[i].COURSE_ID;
            };
            let listItem = document.createElement('div');

            listItem.classList.add('list-group-item');
            listItem.append(link);
            coursesUl.append(listItem);
        }
    }
    else
    {
        let card = document.createElement('div');

        card.classList.add('card', 'card-body');
        card.textContent = 'Wow! Such empty';

        coursesResultContainer.append(card);
    }
};