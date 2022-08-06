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

let loginModalTimeout = null;
let createAccountModalTimeout = null;

document.getElementById('login-modal').addEventListener('show.bs.modal', (event)=>
{
    document.getElementsByTagName('button').namedItem('login-button').removeAttribute('disabled');
    document.getElementsByTagName('button').namedItem('login-modal-create-account-button').removeAttribute('disabled');
    document.getElementsByTagName("input").namedItem("login-floating-email").value = '';
    document.getElementsByTagName("input").namedItem("login-floating-password").value = '';
    document.getElementsByTagName('input').namedItem('student-teacher-login-student').checked = true;
    document.getElementsByTagName("input").namedItem("login-floating-email").className = 'form-control';
    document.getElementsByTagName("input").namedItem("login-floating-password").className = 'form-control';
    
    clearTimeout(loginModalTimeout);
});

document.getElementsByTagName('div').namedItem('create-account-modal').addEventListener('show.bs.modal', (event)=>
{
    document.getElementsByTagName('button').namedItem('create-new-account-create-button').removeAttribute('disbaled');
    document.getElementsByTagName('input').namedItem('create-account-floating-full-name').value = '';
    document.getElementsByTagName('input').namedItem('create-account-floating-email').value = '';
    document.getElementsByTagName('input').namedItem('create-account-floating-password').value = '';
    document.getElementsByTagName('input').namedItem('create-account-gender-radio-male').checked = true;
    document.getElementsByTagName('input').namedItem('create-account-type-radio-student').checked = true;
    document.getElementsByTagName('input').namedItem('create-account-date-of-birth-date').value = '';
    document.getElementsByTagName('input').namedItem('create-account-date-of-birth-month').value = '';
    document.getElementsByTagName('input').namedItem('create-account-date-of-birth-year').value = '';
    document.getElementsByTagName('input').namedItem('create-account-floating-full-name').className = 'form-control';
    document.getElementsByTagName('input').namedItem('create-account-floating-email').className = 'form-control';
    document.getElementsByTagName('input').namedItem('create-account-floating-password').className = 'form-control';
    document.getElementsByTagName('input').namedItem('create-account-date-of-birth-date').className = 'form-control';
    document.getElementsByTagName('input').namedItem('create-account-date-of-birth-month').className = 'form-control';
    document.getElementsByTagName('input').namedItem('create-account-date-of-birth-year').className = 'form-control';

    clearTimeout(createAccountModalTimeout)
});