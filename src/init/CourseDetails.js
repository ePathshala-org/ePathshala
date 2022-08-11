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

const SetupContentsList = async function()
{
    let response = GetContentsFromCourseId(courseId, ['CONTENT_ID', 'TITLE', 'DESCRIPTION', 'VIEW_COUNT', 'CONTENT_TYPE']);
    let contentListItemUI = await GetUIText('ui/ListItem/ContentListItem.html');
    let contentsUl = document.getElementsByTagName('ul').namedItem('contents-list');

    if(Array.isArray(response.contents))
    {
        for(let i = 0; i < response.contents.length; ++i)
        {
            let contentListItemWrapper = document.createElement('div');
            contentListItemWrapper.innerHTML = contentListItemUI;

            let contentTitle = contentListItemWrapper.getElementsByTagName('h3').namedItem('content-title');
            let contentDescription = contentListItemWrapper.getElementsByTagName('h4').namedItem('content-description');
            let contentRate = contentListItemWrapper.getElementsByTagName('h6').namedItem('content-rate');
            let viewCount = contentListItemWrapper.getElementsByTagName('h6').namedItem('content-view-count').getElementsByTagName('span').item(0);
            let viewType = contentListItemWrapper.getElementsByTagName('h6').namedItem('content-view-count').getElementsByTagName('span').item(1);
            let contentImage = contentListItemWrapper.getElementsByTagName('img').item(0);
            contentTitle.textContent = response.contents[i].TITLE;
            contentDescription.textContent = response.contents[i].DESCRIPTION;
            viewCount.textContent = response.contents[i].VIEW_COUNT;
            contentRate.textContent = response.contents[i].RATE;

            if(response.contents[i].CONTENT_TYPE == 'VIDEO')
            {
                contentImage.src = 'assets/video.png';
            }
            else if(response.contents[i].CONTENT_TYPE == 'PAGE')
            {
                contentImage.src = 'assets/page.png';
                viewType.textContent = 'readers';
            }
            else
            {
                contentImage.src = 'assets/quiz.png';
                viewType.textContent = 'attemptees';
            }

            contentsUl.append(contentListItemWrapper.firstChild);
        }
    }
};

SetupContentsList();