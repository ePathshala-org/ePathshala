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

/**
 * 
 * @param {Content[]} contents 
 * @param {string} courseName
 */
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

/**
 * 
 * @param {Content} content
 * @param {Course} course
 */
const SetupVideoDetails = function(content, course)
{
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
};

/**
 * 
 * @param {ContentComment[]} comments 
 */
const SetupComments = async function(comments)
{
    let commentListItemUI = await GetUIText('ui/list_item/comment.html');
    let commentsUl = root.getElementsByTagName('ul').namedItem('comments-list');

    for(let i = 0; i < comments.length; ++i)
    {
        let commentWrapper = document.createElement('div');
        commentWrapper.innerHTML = commentListItemUI;
        let commentDescription = commentWrapper.getElementsByTagName('h6').namedItem('comment-description');
        commentDescription.textContent = comments[i].description;
        let commenterName = commentWrapper.getElementsByTagName('h4').namedItem('commenter-name');
        commenterName.textContent = comments[i].commenterName;
        let commentRate = commentWrapper.getElementsByTagName('p').namedItem('comment-rate');
        commentRate.textContent = 'Rate: ' + comments[i].rate + '/5';
        let commentRateButton = commentWrapper.getElementsByTagName('button').namedItem('comment-rate-button');
        commentRateButton.onclick = function()
        {
            console.log('comment rate');
        };

        commentsUl.append(commentWrapper.firstChild);
    }
};

if(params.has('content_id'))
{
    let content = null;

    while(content == null)
    {
        content = GetContentFromId(params.get('content_id'));
    }

    let contents = null;

    while(contents == null)
    {
        contents = GetContentsFromCourseId(content.courseId);
    }

    let course = null;

    while(course == null)
    {
        course = GetCourseFromContentId(content.contentId);
    }

    let comments = null;

    while(comments == null)
    {
        comments = GetCommentsFromContentId(content.contentId);
    }

    SetupContentsList(contents, course.title);
    SetupVideoDetails(content, course);
    SetupComments(comments);
}
else
{
    // go home :)
}