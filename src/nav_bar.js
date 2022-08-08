const SetupNavBar = async function(userDetails, navBar)
{
    if(userDetails == null || !userDetails.ok)
    {
        let loginStatusNotLoggedInUI = await fetch('ui/login_status_not_logged_in.html');
        let loginStatusNotLoggedInUIText = await loginStatusNotLoggedInUI.text();
        document.getElementsByTagName('div').namedItem('login-status-ui').innerHTML = loginStatusNotLoggedInUIText;
    }
    else
    {
        let loginStatusUI = await fetch('ui/login_status_ui_logged_in.html');
        let loginStatusUIText = await loginStatusUI.text();
        let navBarLoginStatus = navBar.getElementsByTagName('div').namedItem('login-status-ui');
        navBarLoginStatus.innerHTML = loginStatusUIText;
        let userNameDropdownButton = navBarLoginStatus.getElementsByTagName('button').namedItem('user-name-drop-button');
        let logoutButton = navBarLoginStatus.getElementsByTagName('button').namedItem('logout-button');
        logoutButton.onclick = function()
        {
            loginStatus = false;
            userId = null;
            password = null;
            accountType = null;

            localStorage.removeItem('user_id');
            localStorage.removeItem('password');
            localStorage.removeItem('account_type');
            location.href = 'index.html';
        };

        userNameDropdownButton.textContent = userDetails.full_name;
    }
};