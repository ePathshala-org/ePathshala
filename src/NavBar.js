/**
 * 
 * @param {User} user
 * @param {HTMLElement} navBar
 */
const SetupNavBar = async function(user, navBar)
{
    if(user == null)
    {
        let loginStatusNotLoggedInUI = await GetUIText('ui/login_status_not_logged_in.html');
        document.getElementsByTagName('div').namedItem('login-status-ui').innerHTML = loginStatusNotLoggedInUI;
    }
    else
    {
        let loginStatusUI = await GetUIText('ui/login_status_ui_logged_in.html');
        let navBarLoginStatus = navBar.getElementsByTagName('div').namedItem('login-status-ui');
        let loginStatusWrapper = document.createElement('div');
        loginStatusWrapper.innerHTML = loginStatusUI;
        let settingsButton = loginStatusWrapper.getElementsByTagName('button').namedItem('settings-button');
        let logoutButton = loginStatusWrapper.getElementsByTagName('button').namedItem('logout-button');
        navBarLoginStatus.innerHTML = loginStatusUI;
        let userNameButton = loginStatusWrapper.getElementsByTagName('button').namedItem('user-name-drop-button');
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
        settingsButton.onclick = function()
        {
            location.href = "?user_id=" + user.userId + "&type=" + user.userType;
        }

        userNameButton.textContent = userDetails.full_name;
    }
};