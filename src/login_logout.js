let loginButton = document.getElementsByTagName("button").namedItem("login-button");
loginButton.onclick = function()
{
    let emailInput = document.getElementsByTagName("input").namedItem("login-floating-email");
    let passwordInput = document.getElementsByTagName("input").namedItem("login-floating-password");
    let validInputs = true;

    if(emailInput.value === "")
    {
        emailInput.className = "form-control is-invalid";
        validInputs = false;
        let emptyEmailToast = new bootstrap.Toast(document.getElementById('empty-email-toast'));

        emptyEmailToast.show();
    }
    else
    {
        if(!emailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        {
            emailInput.className = "form-control is-invalid";
            validInputs = false;
            let invalidEmailAddressToast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('invalid-email-address-toast'));

            invalidEmailAddressToast.show();
        }
    }

    if(passwordInput.value.length < 8 || passwordInput.value.length > 32)
    {
        passwordInput.className = "form-control is-invalid";
        validInputs = false;
        let invalidPasswordToast = new bootstrap.Toast(document.getElementById('invalid-password-toast'));

        invalidPasswordToast.show();
    }

    if(validInputs)
    {
        document.getElementsByTagName('button').namedItem('login-button').setAttribute('disabled', '');
        document.getElementsByTagName('button').namedItem('login-modal-create-account-button').setAttribute('disabled', '');

        let http = new XMLHttpRequest();

        http.open("POST", "/", false);
        http.setRequestHeader("Content-Type", "application/json");

        let data = 
        {
            type: "login",
            email: emailInput.value,
            password: passwordInput.value,
            account_type: 'teacher'
        };

        if(document.getElementsByTagName('input').namedItem('student-teacher-login-student').checked)
        {
            data.account_type = 'student'
        }

        http.send(JSON.stringify(data));

        if(http.readyState == 4 && http.status == 200)
        {
            let responseObject = JSON.parse(http.responseText);

            if(responseObject.ok)
            {
                if(responseObject.email_found)
                {
                    if(responseObject.password_matched)
                    {
                        userId = responseObject.user_id;
                        password = responseObject.password;
                        accountType = responseObject.account_type;

                        let loginModal = bootstrap.Modal.getInstance(document.getElementById('login-modal'));

                        loginModal.hide();
                        InitLoggedIn();

                        localStorage.setItem('user_id', userId);
                        localStorage.setItem('password', password);
                        localStorage.setItem('account_type', accountType);
                    }
                    else
                    {
                        document.getElementsByTagName('button').namedItem('login-button').removeAttribute('disabled');
                        document.getElementsByTagName('button').namedItem('login-modal-create-account-button').removeAttribute('disabled');

                        let passwordNotMatchedToast = new bootstrap.Toast(document.getElementById('password-not-matched-toast'));

                        passwordNotMatchedToast.show();
                    }
                }
                else
                {
                    document.getElementsByTagName('button').namedItem('login-button').removeAttribute('disabled');
                    document.getElementsByTagName('button').namedItem('login-modal-create-account-button').removeAttribute('disabled');

                    let emailNotFoundToast = new bootstrap.Toast(document.getElementById('email-not-found-toast'));

                    emailNotFoundToast.show();
                }
            }
        }
    }
    else
    {
        setTimeout(() =>
        {
            emailInput.className = "form-control";
            passwordInput.className = "form-control";
        }, 5000);
    }
};