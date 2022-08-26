/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} student
 */
const Login = function(email, password, student)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'login');

    let data = 
    {
        email: email,
        password: password,
        student: Boolean(student)
    };

    http.send(JSON.stringify(data));

    if(http.status == 200)
    {
        return JSON.parse(http.responseText);
    }
    else
    {
        return {error: http.status};
    }
};

let loginEmail = document.getElementsByTagName('input').namedItem('login-email');
let loginPassword = document.getElementsByTagName('input').namedItem('login-password');
let loginStudent = document.getElementsByTagName('input').namedItem('student-login');
let loginModal = document.getElementsByTagName('div').namedItem('login-modal');
loginModal.addEventListener('show.bs.modal', (event)=>
{
    loginEmail.classList.remove('is-invalid');
    loginPassword.classList.remove('is-invalid');
});

let createAccountModalButton = document.getElementsByTagName('button').namedItem('create-account-modal-button');
let loginButton = document.getElementsByTagName('button').namedItem('login-button');
let loginForm = document.getElementsByTagName('form').namedItem('login-form');
loginForm.onsubmit = function()
{
    loginButton.setAttribute('disabled', '');
    createAccountModalButton.setAttribute('disabled', '');

    let student = loginStudent.checked;
    let response = Login(loginEmail.value, loginPassword.value, student);

    if(response.return == -1) // no email
    {
        loginEmail.classList.add('is-invalid');
    }
    else if(response.return == -2) // password not matched
    {
        loginPassword.classList.add('is-invalid');
    }
    else
    {
        localStorage.setItem('user_id', response.return);
        localStorage.setItem('student', student);

        if(student)
        {
            location.href = 'student.html';
        }
        else
        {
            location.href = 'teacher.html';
        }
    }

    loginButton.removeAttribute('disabled');
    createAccountModalButton.removeAttribute('disabled');

    return false;
};

let fullName = document.getElementsByTagName('input').namedItem('create-account-full-name');
let createAccountEmail = document.getElementsByTagName('input').namedItem('create-account-email');
let createAccountPassword = document.getElementsByTagName('input').namedItem('create-account-password');
let dateOfBirth = document.getElementsByTagName('input').namedItem('date-of-birth');
let createStudentAccount = document.getElementsByTagName('input').namedItem('create-account-type-radio-student');
let createAccountModal = document.getElementsByTagName('div').namedItem('create-account-modal');
createAccountModal.addEventListener('show.bs.modal', (event)=>
{
    createAccountEmail.classList.remove('is-invalid');
});

let createAccountButton = document.getElementsByTagName('button').namedItem('create-new-account-button');
createAccountButton.onclick = function()
{
    createAccountButton.setAttribute('disabled', '');

    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'create-new-account');

    let dateOfBirthString = dateOfBirth.valueAsDate.getFullYear() + '-' + (dateOfBirth.valueAsDate.getMonth() + 1).toString() + '-' + dateOfBirth.valueAsDate.getDate();

    let data = 
    {
        full_name: fullName.value,
        email: createAccountEmail.value,
        password: createAccountPassword.value,
        date_of_birth: dateOfBirthString,
        student: Boolean(createStudentAccount.checked)
    };

    http.send(JSON.stringify(data));

    if(http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.return == 0)
        {
            let response = Login(data.email, data.password, data.student);

            localStorage.setItem('user_id', response.return);
            localStorage.setItem('student', data.student);

            if(data.student)
            {
                location.href = 'student.html';
            }
            else
            {
                location.href = 'teacher.html';
            }
        }
        else
        {
            email.classList.add('is-invalid');
        }
    }

    createAccountButton.removeAttribute('disabled');
};