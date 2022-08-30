/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');

if(userId == null || student == 'true')
{
    location.replace('index.html');
}

SetupNavBar(userId);

let params = new URLSearchParams(location.search);

if(!params.has('course_id'))
{
    location.replace('teacher.html');
}

let courseId = params.get('course_id');
let courseDetails = GetCourseFromCourseId(courseId, ['COURSE_ID', 'TITLE', 'DESCRIPTION', 'PRICE', 'CREATOR_ID']);

if(courseDetails.CREATOR_ID != userId)
{
    location.replace('teacher.html');
}

let courseTitle = document.getElementsByTagName('input').namedItem('course-title');
let courseDescription = document.getElementsByTagName('textarea').namedItem('course-description');
let coursePrice = document.getElementsByTagName('input').namedItem('course-price');
courseTitle.value = courseDetails.TITLE;
courseDescription.value = courseDetails.DESCRIPTION;
coursePrice.value = courseDetails.PRICE;

const SetupContents = async function()
{
    let response = GetContentsFromCourseId(courseId, ['CONTENT_ID', 'TITLE', 'DESCRIPTION', 'VIEW_COUNT', 'CONTENT_TYPE']);
    let contentsUl = document.getElementsByTagName('ul').namedItem('contents-list');
    contentsUl.innerHTML = '';
    let contentListItemUI = await GetUIText('ui/ListItem/ContentListItem.html');

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
            let contentTitleButton = contentListItemWrapper.getElementsByTagName('a').namedItem('content-title-button');
            contentTitle.textContent = response.contents[i].TITLE;
            contentDescription.textContent = response.contents[i].DESCRIPTION;
            viewCount.textContent = response.contents[i].VIEW_COUNT;
            contentRate.textContent = response.contents[i].RATE;

            if(response.contents[i].CONTENT_TYPE == 'VIDEO')
            {
                contentImage.src = 'assets/96x96/video.png';
                contentTitleButton.onclick = function()
                {
                    location.href = 'customizevideo.html?content_id=' + response.contents[i].CONTENT_ID;
                };
            }
            else if(response.contents[i].CONTENT_TYPE == 'PAGE')
            {
                contentImage.src = 'assets/96x96/page.png';
                viewType.textContent = 'readers';
                contentTitleButton.onclick = function()
                {
                    location.href = 'editpage.html?content_id=' + response.contents[i].CONTENT_ID;
                };
            }
            else
            {
                contentImage.src = 'assets/96x96/quiz.png';
                viewType.textContent = 'attemptees';
            }

            let deleteButton = contentListItemWrapper.getElementsByClassName('delete-content-button').item(0);
            deleteButton.onclick = function()
            {
                DeleteContent(response.contents[i].CONTENT_ID);
                SetupContents();
            };

            contentsUl.append(contentListItemWrapper.firstChild);
        }
    }
};

SetupContents();

let addContentTypeSelect = document.getElementsByTagName('select').namedItem('content-type-select');
let addContentButton = document.getElementsByTagName('button').namedItem('add-content-button');
addContentButton.onclick = function()
{
    if(addContentTypeSelect.selectedIndex == 0)
    {
        location.href = 'uploadvideo.html?course_id=' + courseId;
    }
    else if(addContentTypeSelect.selectedIndex == 1)
    {
        location.href = 'makepage.html?course_id=' + courseId;
    }
    else
    {

    }
};

let courseDetailsForm = document.getElementsByTagName('form').item(0);
courseDetailsForm.onsubmit = function()
{
    UpdateCourse(courseId, courseTitle.value, courseDescription.value, coursePrice.value);

    location.href = 'teacher.html?user_id' + userId;

    return false;
};