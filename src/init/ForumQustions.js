/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let isStudent = localStorage.getItem('student');
 
SetupNavBar(userId);

let pfpButton = document.getElementsByTagName('a').namedItem('pfp-button');
let postInput = document.getElementsByTagName('input').namedItem('post-question-input');
let postButton = document.getElementsByTagName('button').namedItem('post-question-button');
postButton.onclick = function()
{
    
};