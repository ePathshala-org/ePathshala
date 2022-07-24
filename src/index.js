const root = document.getElementsByTagName('div').namedItem('root');
let loginStatus = false;
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

document.getElementById('login-modal').addEventListener('show.bs.modal', (event)=>
{
    document.getElementsByTagName('button').namedItem('login-button').removeAttribute('disabled');
    document.getElementsByTagName('button').namedItem('login-modal-create-account-button').removeAttribute('disabled');
    document.getElementsByTagName("input").namedItem("login-floating-email").value = '';
    document.getElementsByTagName("input").namedItem("login-floating-password").value = '';
    document.getElementsByTagName('input').namedItem('student-teacher-login-student').checked = true;
});