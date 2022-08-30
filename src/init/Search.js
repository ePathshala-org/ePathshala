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

SetupNavBar(userId);

const SetupCoursesResult = async function()
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
            link.textContent = coursesResult.courses[i].TITLE;
            link.onclick = function()
            {
                location.href = 'coursedetails.html?course_id=' + coursesResult.courses[i].COURSE_ID;
            };
            let listItem = document.createElement('li');

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

const SetupVideosResult = async function()
{
    let videosResult = GetVideosResult(term);
    let videosResultContainer = document.getElementsByTagName('div').namedItem('videos-result');
    let videosUl = document.getElementsByTagName('ul').namedItem('videos-list');
    videosUl.innerHTML = '';
    let enrolledCourses = {ok: false, courses: null};
    let teachingCourses = {ok: false, course: null};

    if(userId != null && isStudent == 'true')
    {
        enrolledCourses = GetCoursesFromStudentId(userId, ['COURSE_ID']);
    }

    if(userId != null && isStudent == 'false')
    {
        teachingCourses = GetCoursesFromTeacherId(userId, ['COURSE_ID']);
    }

    if(Array.isArray(videosResult.videos))
    {
        for(let i = 0; i < videosResult.videos.length; ++i)
        {
            let link = document.createElement('a');
            link.classList.add('text-decoration-none');
            link.href = 'javascript:';
            link.textContent = videosResult.videos[i].TITLE;
            link.onclick = function()
            {
                if(userId == null)
                {
                    let loginModal = new bootstrap.Modal(document.getElementsByTagName('div').namedItem('login-modal'));

                    loginModal.show();
                }
                else
                {
                    if(isStudent == 'true')
                    {
                        if(Array.isArray(enrolledCourses.courses))
                        {
                            let found = false;

                            for(let j = 0; j < enrolledCourses.courses.length; ++j)
                            {
                                if(enrolledCourses.courses[j].COURSE_ID == videosResult.videos[i].COURSE_ID)
                                {
                                    found = true;

                                    break;
                                }
                            }

                            if(found)
                            {
                                location.href = 'video.html?content_id=' + videosResult.videos[i].CONTENT_ID;
                            }
                            else
                            {
                                location.href = 'coursedetails.html?course_id=' + videosResult.videos[i].COURSE_ID;    
                            }
                        }
                        else
                        {
                            location.href = 'coursedetails.html?course_id=' + videosResult.videos[i].COURSE_ID;
                        }
                    }
                    else
                    {
                        if(Array.isArray(teachingCourses.courses))
                        {
                            let found = false;

                            for(let j = 0; j < teachingCourses.courses.length; ++j)
                            {
                                if(teachingCourses.courses[j].COURSE_ID == videosResult.videos[i].COURSE_ID)
                                {
                                    found = true;

                                    break;
                                }
                            }

                            if(found)
                            {
                                location.href = 'customizevideo.html?content_id=' + videosResult.videos[i].CONTENT_ID;
                            }
                            else
                            {
                                location.href = 'coursedetails.html?course_id=' + videosResult.videos[i].COURSE_ID;    
                            }
                        }
                        else
                        {
                            location.href = 'coursedetails.html?course_id=' + videosResult.videos[i].COURSE_ID;
                        }
                    }
                }
            };
            let listItem = document.createElement('li');

            listItem.classList.add('list-group-item');
            listItem.append(link);
            videosUl.append(listItem);
        }
    }
    else
    {
        let card = document.createElement('div');

        card.classList.add('card', 'card-body');
        card.textContent = 'Wow! Such empty';

        videosResultContainer.append(card);
    }
};

const SetupPagesResult = async function()
{
    let pagesResult = GetPagesResult(term);
    let pagesResultContainer = document.getElementsByTagName('div').namedItem('pages-result');
    let pagesUl = document.getElementsByTagName('ul').namedItem('pages-list');
    pagesUl.innerHTML = '';
    let enrolledCourses = {ok: false, courses: null};
    let teachingCourses = {ok: false, course: null};

    if(userId != null && isStudent == 'true')
    {
        enrolledCourses = GetCoursesFromStudentId(userId, ['COURSE_ID']);
    }

    if(userId != null && isStudent == 'false')
    {
        teachingCourses = GetCoursesFromTeacherId(userId, ['COURSE_ID']);
    }

    if(Array.isArray(pagesResult.pages))
    {
        for(let i = 0; i < pagesResult.pages.length; ++i)
        {
            let link = document.createElement('a');
            link.classList.add('text-decoration-none');
            link.href = 'javascript:';
            link.textContent = pagesResult.pages[i].TITLE;
            link.onclick = function()
            {
                if(userId == null)
                {
                    let loginModal = new bootstrap.Modal(document.getElementsByTagName('div').namedItem('login-modal'));

                    loginModal.show();
                }
                else
                {
                    if(isStudent == 'true')
                    {
                        if(Array.isArray(enrolledCourses.courses))
                        {
                            let found = false;

                            for(let j = 0; j < enrolledCourses.courses.length; ++j)
                            {
                                if(enrolledCourses.courses[j].COURSE_ID == pagesResult.pages[i].COURSE_ID)
                                {
                                    found = true;

                                    break;
                                }
                            }

                            if(found)
                            {
                                location.href = 'page.html?content_id=' + pagesResult.pages[i].CONTENT_ID;
                            }
                            else
                            {
                                location.href = 'coursedetails.html?course_id=' + pagesResult.pages[i].COURSE_ID;    
                            }
                        }
                        else
                        {
                            location.href = 'coursedetails.html?course_id=' + pagesResult.pages[i].COURSE_ID;
                        }
                    }
                    else
                    {
                        if(Array.isArray(teachingCourses.courses))
                        {
                            let found = false;

                            for(let j = 0; j < teachingCourses.courses.length; ++j)
                            {
                                if(teachingCourses.courses[j].COURSE_ID == pagesResult.pages[i].COURSE_ID)
                                {
                                    found = true;

                                    break;
                                }
                            }

                            if(found)
                            {
                                location.href = 'customizepage.html?content_id=' + pagesResult.pages[i].CONTENT_ID;
                            }
                            else
                            {
                                location.href = 'coursedetails.html?course_id=' + pagesResult.pages[i].COURSE_ID;    
                            }
                        }
                        else
                        {
                            location.href = 'coursedetails.html?course_id=' + pagesResult.pages[i].COURSE_ID;
                        }
                    }
                }
            };
            let listItem = document.createElement('li');

            listItem.classList.add('list-group-item');
            listItem.append(link);
            pagesUl.append(listItem);
        }
    }
    else
    {
        let card = document.createElement('div');

        card.classList.add('card', 'card-body');
        card.textContent = 'Wow! Such empty';

        pagesResultContainer.append(card);
    }
};

SetupCoursesResult();
SetupVideosResult();
SetupPagesResult();