const root = document.getElementsByTagName('div').namedItem('root');
const navBar = document.getElementsByTagName('nav').namedItem('navbar-video');
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
//let userDetails = GetUserDetails(userId, accountType);
let userDetails = null;

SetupNavBar(userDetails, navBar);

const SetupContentsList = async function(contents, courseName)
{
    root.getElementsByTagName('h3').namedItem('course-title').textContent = courseName;
    let contentsUl = root.getElementsByTagName('ul').namedItem('content-list');
    let h5LinkListItemUIText = await GetUIText('ui/h5_link_list_item.html');

    for(let i = 0; i < contents.length; ++i)
    {
        let listItemWrapper = document.createElement('div');
        listItemWrapper.innerHTML = h5LinkListItemUIText;
        let h5 = listItemWrapper.getElementsByTagName('h5').namedItem('h5-link-list-item-text-content');
        h5.textContent = contents[i].title;
        let button = listItemWrapper.getElementsByTagName('a').namedItem('h5-link');
        button.onclick = function()
        {
            console.log(contents[i].contentId);
        };

        contentsUl.append(listItemWrapper.firstChild);
    }
};

if(params.has('content_id'))
{
    if(accountType == 'student')
    {
        if(studentInCourse)
        {
            
        }
        else
        {
            
        }
    }
    else
    {
        let content = null;

        while(content == null)
        {
            content = GetContentFromId(params.get('content_id'));
        }

        let contents = null;

        while(contents == null)
        {
            contents = GetCourseContents(content.courseId);
        }

        let course = null;

        while(course == null)
        {
            course = GetCourseFromContentId(content.contentId);
        }

        SetupContentsList(contents, course.title);

        let videoPlayer = root.getElementsByTagName('video').namedItem('video-player');
        videoPlayer.src = 'contents/videos/' + course.courseId + '/' + content.contentId + '.mp4';
        videoPlayer.load();

        let videoTitle = root.getElementsByTagName('h2').namedItem('video-title');
        videoTitle.textContent = content.title;
        let videoDescription = root.getElementsByTagName('p').namedItem('video-description');
        videoDescription.textContent = content.description;
        let videoRate = root.getElementsByTagName('p').namedItem('video-rate');
        videoRate.textContent = 'Rate: ' + content.rate + '/5';
        let videoRateButton = root.getElementsByTagName('button').namedItem('rate-button');
        videoRateButton.onclick = function()
        {
            console.log('rate video');
        };
    }
}
else
{
    // go home :)
}