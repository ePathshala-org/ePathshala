/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let isStudent = localStorage.getItem('student');

if(userId != null) // not null means already logged in
{
    if(isStudent) // redirect to student page
    {
        location.replace("student.html?user_id=" + userId);
    }
    else // redirect to teacher page
    {
        location.replace("teacher.html?user_id=" + userId)
    }
}

const loginButton = document.getElementsByTagName('button').namedItem('login-button');
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
                    location.replace('student.html?user_id=' + userId);
                }
                else // redirect to teacher page
                {
                    location.replace('teacher.html?user_id=' + userId);
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