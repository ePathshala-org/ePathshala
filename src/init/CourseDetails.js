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
let courseDetails = GetCourseFromCourseId(courseId, ['COURSE_ID', 'TITLE', 'DESCRIPTION', 'CREATOR_NAME', 'RATE', 'PRICE', 'CREATOR_ID', 'ENROLL_COUNT']);
let enrolledResponse = CheckUserEnrolled(userId, courseDetails.COURSE_ID);
let buyCourseCourseModalElement = document.getElementsByTagName('div').namedItem('buy-course-modal');
let buyCoursesModal = new bootstrap.Modal(buyCourseCourseModalElement);

const SetupCourseDetails = function()
{
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

    if(userId != null)
    {
        if(student == 'false' || enrolledResponse.ENROLLED)
        {
            enrollButton.remove();
        }
        else
        {
            enrollButton.setAttribute('data-bs-target', '#buy-course-modal');

            let buyCourseForm = document.getElementsByTagName('form').namedItem('buy-course-form');
            let buyButton = document.getElementsByTagName('button').namedItem('buy-course-button');
            let creditCardId = document.getElementsByTagName('input').namedItem('credit-card-id');
            let creditCardPassword = document.getElementsByTagName('input').namedItem('credit-card-password');
            let bank = document.getElementsByTagName('select').namedItem('select-bank');

            buyCourseCourseModalElement.addEventListener('show.bs.modal', ()=>
            {
                creditCardId.classList.remove('is-invalid');
                creditCardPassword.classList.remove('is-invalid');
                buyButton.removeAttribute('disabled');
            });

            buyCourseForm.onsubmit = function()
            {
                buyButton.setAttribute('disabled', '');
                creditCardId.classList.remove('is-invalid');
                creditCardPassword.classList.remove('is-invalid');

                let response = BuyCourse(userId, courseId, creditCardId.value, creditCardPassword.value, bank.value, courseDetails.PRICE);

                if(response.return == 1)
                {
                    creditCardPassword.classList.add('is-invalid');
                }
                else if(response.return == 2)
                {
                    creditCardId.classList.add('is-invalid');
                }
                else
                {
                    location.reload();
                }

                buyButton.removeAttribute('disabled');

                return false;
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
                    if(student == 'true')
                    {
                        if(enrolledResponse.ENROLLED)
                        {
                            location.href = 'video.html?content_id=' + response.contents[i].CONTENT_ID;
                        }
                        else
                        {
                            buyCoursesModal.show();
                        }
                    }
                    else
                    {
                        let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('login-student-toast'));

                        toast.show();
                    }
                };
            }
            else if(response.contents[i].CONTENT_TYPE == 'PAGE')
            {
                contentImage.src = 'assets/96x96/page.png';
                viewType.textContent = 'readers';
                contentTitleButton.onclick = function()
                {
                    if(student == 'true')
                    {
                        if(enrolledResponse.ENROLLED)
                        {
                            location.href = 'page.html?content_id=' + response.contents[i].CONTENT_ID;
                        }
                        else
                        {
                            buyCoursesModal.show();
                        }
                    }
                    else
                    {
                        let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('login-student-toast'));

                        toast.show();
                    }
                };
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