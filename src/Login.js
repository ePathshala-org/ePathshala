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
    let validInput = true;

    if(emailValue === "")
    {
        //email.className = "form-control is-invalid";
        validInputs = false;
        let emptyEmailToast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('empty-email-toast'));

        emptyEmailToast.show();
    }
    else
    {
        if(!emailValue.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        {
            //emailInput.className = "form-control is-invalid";
            validInputs = false;
            let invalidEmailAddressToast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('invalid-email-address-toast'));

            invalidEmailAddressToast.show();
        }
    }

    if(passwordValue.length < 8 || passwordValue.length > 32)
    {
        //password.className = "form-control is-invalid";
        validInputs = false;
        let invalidPasswordToast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('invalid-password-toast'));

        invalidPasswordToast.show();
    }

    if(validInput)
    {
        let userIdPromise = null;

        while(userIdPromise == null)
        {
            userIdPromise = Login(emailValue, passwordValue, studentValue);
        }

        userIdPromise.then((promised_userId)=>
        {
            userId = promised_userId;

            if(userId > 0) // 0 means account available
            {
                localStorage.setItem('user_id', userId);
                localStorage.setItem('student', studentValue);

                if(student.checked) // redirect to student page
                {
                    location.reload();
                }
                else // redirect to teacher page
                {
                    location.reload();
                }
            }
            else
            {
                loginButton.removeAttribute('disabled');
                loginModalCreateNewAccountButton.removeAttribute('disabled');
            }
        });
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