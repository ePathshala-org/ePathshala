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
let userDetails = GetUserDetails(userId, accountType);

SetupNavBar(userDetails, navBar);

if(params.has('course_id'))
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-course-details',
        course_id: parseInt(params.get('course_id'))
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);
        let courseTitle = root.getElementsByTagName('h3').namedItem('course-name-h3');
        let courseCreator = root.getElementsByTagName('h5').namedItem('course-creator-name');
        let courseDescription = root.getElementsByTagName('h6').namedItem('course-description');
        let enrollCount = root.getElementsByTagName('p').namedItem('course-number-of-enrolls');
        let rate = root.getElementsByTagName('p').namedItem('course-rate');
        courseTitle.textContent = response.title;
        courseDescription.textContent = response.description;
        courseCreator.textContent = response.creator_name;
        enrollCount.textContent = response.enroll_count + ' enrolls';
        rate.textContent = 'Rate: ' + response.rate + '/5';
    }

    data = 
    {
        type: 'get-course-contents',
        course_id: parseInt(params.get('course_id'))
    };

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            if(Array.isArray(response.contents))
            {
                let videoListItemUI = await fetch('ui/video_list_item.html');
                let pageListItemUI = await fetch('ui/page_list_item.html');
                let quizListUI = await fetch('ui/quiz_list_item.html');
                let videoListItemUIText = await videoListItemUI.text();
                let pageListItemUIText = await pageListItemUI.text();
                let quizListItemUIText = await quizListUI.text();
                let contentsList = root.getElementsByTagName('ul').namedItem('contents-ul');

                for(let i = 0; i < response.contents.length; ++i)
                {
                    if(response.contents[i].content_type.trim() == 'VIDEO')
                    {
                        let videoItemWrapper = document.createElement('div');
                        videoItemWrapper.innerHTML = videoListItemUIText;
                        videoItemWrapper.getElementsByTagName('img').item(0).src = 'assets/video.png';
                        videoItemWrapper.getElementsByTagName('h5').namedItem('video-title').textContent = response.contents[i].title;
                        videoItemWrapper.getElementsByTagName('h6').namedItem('video-description').textContent = response.contents[i].description;
                        videoItemWrapper.getElementsByTagName('a').item(0).onclick = function()
                        {
                            console.log(response.contents[i].content_id);
                        };

                        contentsList.append(videoItemWrapper.firstChild);
                    }
                    else if(response.contents[i].content_type.trim() == 'PAGE')
                    {
                        let pageItemWrapper = document.createElement('div');
                        pageItemWrapper.innerHTML = pageListItemUIText;
                        pageItemWrapper.getElementsByTagName('img').item(0).src = 'assets/page.png';
                        pageItemWrapper.getElementsByTagName('h5').namedItem('page-title').textContent = response.contents[i].title;
                        pageItemWrapper.getElementsByTagName('h6').namedItem('page-description').textContent = response.contents[i].description;
                        pageItemWrapper.getElementsByTagName('a').item(0).onclick = function()
                        {
                            console.log(response.contents[i].content_id);
                        };

                        contentsList.append(pageItemWrapper.firstChild);
                    }
                    else
                    {
                        let quizItemWrapper = document.createElement('div');
                        quizItemWrapper.innerHTML = quizListItemUIText;
                        quizItemWrapper.getElementsByTagName('img').item(0).src = 'assets/quiz.png';
                        quizItemWrapper.getElementsByTagName('h5').namedItem('quiz-title').textContent = response.contents[i].title;
                        quizItemWrapper.getElementsByTagName('h6').namedItem('quiz-description').textContent = response.contents[i].description;
                        quizItemWrapper.getElementsByTagName('a').item(0).onclick = function()
                        {
                            console.log(response.contents[i].content_id);
                        };

                        contentsList.append(quizItemWrapper.firstChild);
                    }
                }
            }
        }
    }
}
else
{
    // show all courses
}