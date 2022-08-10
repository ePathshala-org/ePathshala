const SetupNavBar = async function(userId, navBar)
{
    if(userId == null || userId == 0)
    {
        let loginStatusNotLoggedInUI = await GetUIText('ui/login_status_not_logged_in.html');
        document.getElementsByTagName('div').namedItem('login-status-ui').innerHTML = loginStatusNotLoggedInUI;
    }
    else
    {
        let loginStatusUI = await GetUIText('ui/login_status_ui_logged_in.html');
        let navBarLoginStatus = navBar.getElementsByTagName('div').namedItem('login-status-ui');
        navBarLoginStatus.innerHTML = loginStatusUI;
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