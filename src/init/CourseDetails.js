/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');
let params = new URLSearchParams(location.search);

if(!params.has('course_id'))
{
    location.replace('course.html');
}

SetupNavBar(userId);

document.getElementsByTagName('div').namedItem('buy-course-modal').addEventListener('show.bs.modal', (event)=>
{
    let creditCardId = document.getElementsByTagName('input').namedItem('credit-card-id');
    let password = document.getElementsByTagName('input').namedItem('credit-card-password');
    let bank = document.getElementsByTagName('select').namedItem('select-bank');

    creditCardId.value = '';
    password.value = '';
    bank.selectedIndex = 0;
});

let courseId = parseInt(params.get('course_id'));

const SetupCourseDetails = function()
{
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
    let enrollButton = document.getElementsByTagName('button').namedItem('enroll-button');
    let buyButton = document.getElementsByTagName('button').namedItem('buy-course-button');

    buyButton.removeAttribute('disabled');

    if(userId != null)
    {
        let enrolledResponse = CheckUserEnrolled(userId, courseDetails.COURSE_ID);

        if(student == 'false' || enrolledResponse.ENROLLED)
        {
            enrollButton.remove();
        }
        else
        {
            enrollButton.setAttribute('data-bs-target', '#buy-course-modal');

            buyButton.onclick = function()
            {
                buyButton.setAttribute('disbled', '');

                let creditCardId = document.getElementsByTagName('input').namedItem('credit-card-id');
                let creditCardPassword = document.getElementsByTagName('input').namedItem('credit-card-password');
                let bank = document.getElementsByTagName('select').namedItem('select-bank');
                let creditCardIdValue = creditCardId.value;
                let creditCardPasswordValue = creditCardPassword.value;
                let bankValue = bank.value;
                let response = BuyCourse(userId, courseId, creditCardIdValue, creditCardPasswordValue, bankValue, courseDetails.PRICE);

                if(response.return == 1)
                {
                    buyButton.removeAttribute('disabled');

                    let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('invalid-creds-toast'));

                    toast.show();
                }
                else if(response.return == 2)
                {
                    buyButton.removeAttribute('disabled');

                    let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('insufficient-credits-toast'));

                    toast.show();
                }
                else
                {
                    location.reload();
                }
            };
        }
    }
};

const SetupContentsList = async function()
{
    let response = GetContentsFromCourseId(courseId, ['CONTENT_ID', 'TITLE', 'DESCRIPTION', 'VIEW_COUNT', 'CONTENT_TYPE', 'RATE']);
    let contentListItemUI = await GetUIText('ui/ListItem/ContentListItem.html');
    let contentsUl = document.getElementsByTagName('ul').namedItem('contents-list');
    let contentsContainer = document.getElementsByTagName('div').namedItem('contents-container');

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
                    location.href = 'video.html?content_id=' + response.contents[i].CONTENT_ID;
                };
            }
            else if(response.contents[i].CONTENT_TYPE == 'PAGE')
            {
                contentImage.src = 'assets/96x96/page.png';
                viewType.textContent = 'readers';
            }
            else
            {
                contentImage.src = 'assets/96x96/quiz.png';
                viewType.textContent = 'attemptees';
            }

            let deleteContainer = contentListItemWrapper.getElementsByClassName('delete-container').item(0);

            deleteContainer.remove();
            contentsUl.append(contentListItemWrapper.firstChild);
        }
    }
    else
    {
        contentsUl.remove();

        let alert = document.createElement('div');

        alert.classList.add('alert', 'alert-secondary');
        alert.setAttribute('role', 'alert');

        alert.textContent = 'Wow! Such empty';

        contentsContainer.append(alert);
    }
};

SetupCourseDetails();
SetupContentsList();