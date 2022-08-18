/**
 * @type {string | null}
 */
let userId = localStorage.getItem('user_id');
/**
 * @type {string | null}
 */
let student = localStorage.getItem('student');

if(userId == null)
{
    location.replace('index.html');
}

SetupNavBar(userId);

let interestsContainer = document.getElementsByTagName('div').namedItem('interests-container');
let specialitiesContainer = document.getElementsByTagName('div').namedItem('specialities-container');
let addTeacherButton = document.getElementsByTagName('button').namedItem('teacher-button');
let addStudentButton = document.getElementsByTagName('button').namedItem('student-button');

if(student == 'true')
{
    specialitiesContainer.remove();
    addStudentButton.remove();
}
else
{
    interestsContainer.remove();
    addTeacherButton.remove();
}

let userDetails = GetUserDetails(userId, ['FULL_NAME', 'EMAIL', 'SECURITY_KEY', 'BIO', 'DATE_OF_BIRTH', 'PFP']);
let fullName = document.getElementsByTagName('input').namedItem('full-name');
let email = document.getElementsByTagName('input').namedItem('email');
let password = document.getElementsByTagName('input').namedItem('password');
let bio = document.getElementsByTagName('textarea').namedItem('bio');
let pfp = document.getElementsByTagName('img').namedItem('pfp');
let pfpFile = document.getElementsByTagName('input').namedItem('pfp-file');
let dateOfBirth = document.getElementsByTagName('input').namedItem('date-of-birth');
fullName.value = userDetails.FULL_NAME;
email.value = userDetails.EMAIL;
password.value = userDetails.SECURITY_KEY;
bio.value = userDetails.BIO;
dateOfBirth.valueAsDate = new Date(userDetails.DATE_OF_BIRTH);

if(userDetails.PFP == 't')
{
    pfp.src = 'pfp/' + userId + '.png';
}

let saveButton = document.getElementsByTagName('button').namedItem('save-button');
saveButton.onclick = async function()
{
    saveButton.setAttribute('disabled', '');

    let fullNameValue = fullName.value;
    let emailValue = email.value;
    let passwordValue = password.value;
    let bioValue = bio.value;
    let dateValue = dateOfBirth.valueAsDate.getFullYear() + '-' + (dateOfBirth.valueAsDate.getMonth() + 1).toString() + '-' + dateOfBirth.valueAsDate.getDate();
    let imageUploadSuccess = false;

    if(pfpFile.files.length > 0)
    {
        let file = pfpFile.files.item(0);

        let pfpResponse = await UpdatePfp(userId, file);

        if(pfpResponse.pfp_updated)
        {
            imageUploadSuccess = true;
        }
    }

    if(imageUploadSuccess)
    {
        let response = UpdateUserDetails(userId, fullNameValue, emailValue, passwordValue, bioValue, dateValue);

        if(response.return == 0)
        {
            if(student == 'true')
            {
                location.href = 'student.html';
            }
            else
            {
                location.href = 'teacher.html';
            }
        }
        else if(response.return == 1)
        {
            // empty full name
        }
        else if(response.return == 2)
        {
            // empty email
        }
        else if(response.return == 3)
        {
            //invalid email
        }
        else
        {
            // invalid password size
        }
    }
    else
    {
        // invalid pfp
    }
}