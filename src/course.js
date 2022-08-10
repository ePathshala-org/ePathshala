const root = document.getElementsByTagName('div').namedItem('root');
const navBar = document.getElementsByTagName('nav').namedItem('navbar-course');
const params = new URLSearchParams(location.search);
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

SetupNavBar(userId, navBar);

/**
 * 
 * @param {Course} course 
 */
const SetupCourseDetails = function(course)
{
    let courseName = root.getElementsByTagName('h3').namedItem('course-name');
    let creatorName = root.getElementsByTagName('h5').namedItem('course-creator-name');
    let courseDescription = root.getElementsByTagName('h6').namedItem('course-description');
    let numberOfEnrolls = root.getElementsByTagName('p').namedItem('course-number-of-enrolls');
    let rate = root.getElementsByTagName('p').namedItem('course-rate');
    courseName.textContent = course.title;
    courseDescription.textContent = course.description;
    creatorName.textContent = course.creatorName;
    numberOfEnrolls.textContent = course.enrollCount + ' enrolls';
    rate.textContent = 'Rate: ' + course.rate;
};

/**
 * 
 * @param {Content[]} contents
 */
const SetupContents = async function(contents)
{
    let videoListItemUI = await GetUIText('ui/list_item/video.html');
    let pageListItemUI = await GetUIText('ui/list_item/page.html');
    let quizListItemUI = await GetUIText('ui/list_item/quiz.html');
    let contentsList = root.getElementsByTagName('ul').namedItem('contents-ul');

    for(let i = 0; i < contents.length; ++i)
    {
        if(contents[i].contentType == 'VIDEO')
        {
            let videoItemWrapper = document.createElement('div');
            videoItemWrapper.innerHTML = videoListItemUI;
            videoItemWrapper.getElementsByTagName('img').item(0).src = 'assets/video.png';
            videoItemWrapper.getElementsByTagName('h5').namedItem('video-title').textContent = contents[i].title;
            videoItemWrapper.getElementsByTagName('h6').namedItem('video-description').textContent = contents[i].description;
            videoItemWrapper.getElementsByTagName('a').item(0).onclick = function()
            {
                location.href = 'video.html?content_id=' + contents[i].contentId;
            };

            contentsList.append(videoItemWrapper.firstChild);
        }
        else if(contents[i].contentType == 'PAGE')
        {
            let pageItemWrapper = document.createElement('div');
            pageItemWrapper.innerHTML = pageListItemUI;
            pageItemWrapper.getElementsByTagName('img').item(0).src = 'assets/page.png';
            pageItemWrapper.getElementsByTagName('h5').namedItem('page-title').textContent = contents[i].title;
            pageItemWrapper.getElementsByTagName('h6').namedItem('page-description').textContent = contents[i].description;
            pageItemWrapper.getElementsByTagName('a').item(0).onclick = function()
            {
                console.log(contents[i].contentId);
            };

            contentsList.append(pageItemWrapper.firstChild);
        }
        else
        {
            let quizItemWrapper = document.createElement('div');
            quizItemWrapper.innerHTML = quizListItemUI;
            quizItemWrapper.getElementsByTagName('img').item(0).src = 'assets/quiz.png';
            quizItemWrapper.getElementsByTagName('h5').namedItem('quiz-title').textContent = contents[i].title;
            quizItemWrapper.getElementsByTagName('h6').namedItem('quiz-description').textContent = contents[i].description;
            quizItemWrapper.getElementsByTagName('a').item(0).onclick = function()
            {
                console.log(contents[i].content_id);
            };

            contentsList.append(quizItemWrapper.firstChild);
        }
    }
};

if(params.has('course_id'))
{
    let course = null;

    while(course == null)
    {
        course = GetCourseFromId(params.get('course_id'));
    }

    let contents = null;

    while(contents == null)
    {
        contents = GetContentsFromCourseId(course.courseId);
    }

    SetupCourseDetails(course);
    SetupContents(contents);
}
else
{
    // show all courses
}