/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} student
 * @returns {Promise<number>}
 */
const Login = async function(email, password, student)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-user-id',
        email: email,
        security_key: password,
        student: student
    };

    http.send(JSON.stringify(data));

    canLogin = false;

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            return response.USER_ID;
        }
        else
        {
            return null;
        }
    }
    else
    {
        return null;
    }
};

/**
 * 
 * @param {string} email
 * @param {string} password
 * @param {bool} isStudent
 */
const GetUserId = function(email, password, isStudent)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-user-id',
        email: email,
        security_key: password,
        is_student: Boolean(isStudent)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4)
    {
        if(http.status == 200)
        {
            return JSON.parse(http.responseText);
        }
        else
        {
            return {ok: false, error: http.status};
        }
    }
};

let loginButton = document.getElementsByTagName('button').namedItem('login-button');
loginButton.onclick = function()
{
    let loginModalCreateNewAccountButton = document.getElementsByTagName('button').namedItem('login-modal-create-new-account-button');

    loginButton.setAttribute('disabled', '');
    loginModalCreateNewAccountButton.setAttribute('disabled', '');

    let email = document.getElementsByTagName('input').namedItem('login-email')
    let password = document.getElementsByTagName('input').namedItem('login-password');
    let student = document.getElementsByTagName('input').namedItem('login-type-student');
    let emailValue = email.value;
    let passwordValue = password.value;
    let studentValue = student.checked;
    let response = GetUserId(emailValue, passwordValue, studentValue);

    if(response.ok)
    {
        if(response.RETURN == -1) // empty email
        {
            let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('empty-email-toast'));

            toast.show();
        }
        else if(response.RETURN == -2) // invalid email
        {
            let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('invalid-email-address-toast'));

            toast.show();
        }
        else if(response.RETURN == -3) // invalid password size
        {
            let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('invalid-password-size-toast'));

            toast.show();
        }
        else if(response.RETURN == -4) // email does not exist
        {
            let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('email-not-found-toast'));

            toast.show();
        }
        else if(response.RETURN == -5) // password does not match
        {
            let toast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('password-not-matched-toast'));

            toast.show();
        }
        else // success
        {
            localStorage.setItem('user_id', response.RETURN);
            localStorage.setItem('student', studentValue);
            location.reload();
        }

        loginButton.removeAttribute('disabled');
        loginModalCreateNewAccountButton.removeAttribute('disabled');
    }
};

let createNewAccountButton = document.getElementsByTagName('button').namedItem('create-new-account-button');
createNewAccountButton.onclick = function()
{
    let fullName = document.getElementsByTagName('input').namedItem('create-account-full-name');
    let email = document.getElementsByTagName('input').namedItem('create-account-email');
    let password = document.getElementsByTagName('input').namedItem('create-account-password');
    let dayOfBirth = document.getElementsByTagName('input').namedItem('create-account-day-of-birth');
    let monthOfBirth = document.getElementsByTagName('input').namedItem('create-account-month-of-birth');
    let yearOfBirth = document.getElementsByTagName('input').namedItem('create-account-month-of-birth');
    
};

let loginModal = document.getElementsByTagName('div').namedItem('login-modal');
let createAccountModal = document.getElementsByTagName('div').namedItem('create-account-modal');

if(loginModal != null)
{
    loginModal.addEventListener('show.bs.modal', (event)=>
    {
        let email = document.getElementsByTagName('input').namedItem('login-email');
        let password = document.getElementsByTagName('input').namedItem('login-password');
        let loginTypeStudent = document.getElementsByTagName('input').namedItem('login-type-student');

        email.value = '';
        password.value = '';
        loginTypeStudent.checked = true;
    });
}

if(createAccountModal != null)
{
    createAccountModal.addEventListener('show.bs.modal', (event)=>
    {
        let fullName = document.getElementsByTagName('input').namedItem('create-account-full-name');
        let email = document.getElementsByTagName('input').namedItem('create-account-email');
        let password = document.getElementsByTagName('input').namedItem('create-account-password');
        let day = document.getElementsByTagName('input').namedItem('create-account-day-of-birth');
        let month = document.getElementsByTagName('input').namedItem('create-account-month-of-birth');
        let year = document.getElementsByTagName('input').namedItem('create-account-year-of-birth');
        let typeStudent = document.getElementsByTagName('input').namedItem('create-account-type-radio-student');
        fullName.value = '';
        email.value = '';
        password.value = '';
        day.value = '';
        month.value = '';
        year.value = '';
        typeStudent.checked = true;
    });
}