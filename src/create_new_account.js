let createNewAccountButton = document.getElementsByTagName('button').namedItem('create-new-account-create-button');
createNewAccountButton.onclick = function()
{
    let newAccountUserName = document.getElementsByTagName('input').namedItem('create-account-floating-full-name');
    let newAccountEmail = document.getElementsByTagName('input').namedItem('create-account-floating-email');
    let newAccountPassword = document.getElementsByTagName('input').namedItem('create-account-floating-password');
    let newAccountGenderMale = document.getElementsByTagName('input').namedItem('create-account-gender-radio-male');
    let newAccountTypeStudent = document.getElementsByTagName('input').namedItem('create-account-type-radio-student');
    let newAccountDateOfBirthDate = document.getElementsByTagName('input').namedItem('create-account-date-of-birth-date');
    let newAccountDateOfBirthMonth = document.getElementsByTagName('input').namedItem('create-account-date-of-birth-month');
    let newAccountDateOfBirthYear = document.getElementsByTagName('input').namedItem('create-account-date-of-birth-year');

    /**
     * 
     * @param {number} year 
     * @returns {boolean}
     */
    const IsLeapYear = function(year)
    {
        return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
    };

    /**
     * 
     * @param {number} date 
     * @param {number} month 
     * @param {number} year
     * @returns {boolean}
     */
    const IsValidDate = function(date, month, year)
    {
        if(month == 2)
        {
            if(IsLeapYear(year))
            {
                return date <= 29;
            }
            else
            {
                return date <= 28;
            }
        }
    
        // Months of April, June,
        // Sept and Nov must have
        // number of days less than
        // or equal to 30.
        if (month == 4 || month == 6 || month == 9 || month == 11)
        {
            return date <= 30;
        }
    
        return true;
    };

    let validInputs = true;

    if(newAccountUserName.value === '')
    {
        newAccountUserName.className = 'form-control is-invalid';
        validInputs = false;
        let emptyNameToast = new bootstrap.Toast(document.getElementById('empty-name-toast'));

        emptyNameToast.show();
    }

    if(newAccountEmail.value === '')
    {
        newAccountEmail.className = 'form-control is-invalid';
        validInputs = false;
        let emptyEmailToast = new bootstrap.Toast(document.getElementById('empty-email-toast'));

        emptyEmailToast.show();
    }
    else
    {
        if(!newAccountEmail.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        {
            newAccountEmail.className = 'form-control is-invalid';
            validInputs = false;
            let invalidEmailAddressToast = new bootstrap.Toast(document.getElementsByTagName('div').namedItem('invalid-email-address-toast'));

            invalidEmailAddressToast.show();
        }
    }

    if(newAccountPassword.value.length < 8 || newAccountPassword.value.length > 32)
    {
        newAccountPassword.className = 'form-control is-invalid';
        validInputs = false;
        let invalidPasswordToast = new bootstrap.Toast(document.getElementById('invalid-password-toast'));

        invalidPasswordToast.show();
    }

    if(newAccountDateOfBirthDate.value === '' ||
        newAccountDateOfBirthMonth.value === '' ||
        newAccountDateOfBirthYear.value === '' ||
        !IsValidDate(newAccountDateOfBirthDate.value, newAccountDateOfBirthMonth.value, newAccountDateOfBirthYear.value))
    {
        newAccountDateOfBirthDate.className = 'form-control is-invalid';
        newAccountDateOfBirthMonth.className = 'form-control is-invalid';
        newAccountDateOfBirthYear.className = 'form-control is-invalid';
        validInputs = false;
        let invalidDateToast = new bootstrap.Toast(document.getElementById('invalid-date-toast'));

        invalidDateToast.show();
    }

    if(validInputs)
    {
        document.getElementsByTagName('button').namedItem('create-new-account-create-button').setAttribute('disabled', '');

        let data = 
        {
            type: 'create-new-account',
            student: Boolean(newAccountTypeStudent.checked),
            male: Boolean(newAccountGenderMale.checked),
            name: newAccountUserName.value,
            email: newAccountEmail.value,
            password: newAccountPassword.value,
            date_of_birth:
            {
                date: newAccountDateOfBirthDate.value,
                month: newAccountDateOfBirthMonth.value,
                year: newAccountDateOfBirthYear.value
            }
        };
        let http = new XMLHttpRequest();

        http.open("POST", "/", false);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(data));

        if(http.readyState == 4 && http.status == 200)
        {
            let responseObject = JSON.parse(http.responseText);

            if(responseObject.ok)
            {
                if(!responseObject.email_exists)
                {
                    userId = responseObject.user_id;
                    password = responseObject.password;
                    accountType = responseObject.account_type;
                    let createAccountModal = bootstrap.Modal.getInstance(document.getElementById('create-account-modal'));

                    createAccountModal.hide();
                    InitLoggedIn();
                    localStorage.setItem('user_id', userId);
                    localStorage.setItem('password', password);
                    localStorage.setItem('account_type', accountType);
                }
                else
                {
                    document.getElementsByTagName('button').namedItem('create-new-account-create-button').removeAttribute('disabled');

                    let emailAlreadyExistsToast = new bootstrap.Toast(document.getElementById('email-already-exists-toast'));

                    emailAlreadyExistsToast.show();
                }
            }
        }
    }
    else
    {
        createAccountModalTimeout = setTimeout(()=>
        {
            newAccountUserName.className = 'form-control';
            newAccountEmail.className = 'form-control';
            newAccountPassword.className = 'form-control';
            newAccountDateOfBirthDate.className = 'form-control';
            newAccountDateOfBirthMonth.className = 'form-control';
            newAccountDateOfBirthYear.className = 'form-control';
        }, 5000);
    }
};