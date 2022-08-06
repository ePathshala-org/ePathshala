let createNewAccountButton = document.getElementsByTagName('button').namedItem('create-new-account-create-button');
createNewAccountButton.onclick = function()
{
    let newAccountUserName = document.getElementsByTagName('input').namedItem('create-account-floating-full-name');
    let newAccountEmail = document.getElementsByTagName('input').namedItem('create-account-floating-email');
    let newAccountPassword = document.getElementsByTagName('input').namedItem('create-account-floating-password');
    let newAccountGenderMale = document.getElementsByTagName('input').namedItem('create-account-gender-radio-male');
    let newAccountGenderFemale = document.getElementsByTagName('input').namedItem('create-account-gender-radio-female');

    console.log(newAccountGenderMale.checked);
    console.log(newAccountGenderFemale.checked);
};