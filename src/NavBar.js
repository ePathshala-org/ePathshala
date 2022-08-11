/**
 * 
 * @param {string} userId
 * @param {HTMLElement} navBar
 */
const SetupNavBar = async function(userId)
{
    if(userId != null)
    {
        let userDetails = null;

        while(userDetails == null)
        {
            userDetails = GetUserDetails(parseInt(userId), ['FULL_NAME', 'USER_TYPE']);
        }

        let loginStatusUI = await GetUIText('ui/LoginStatus.html');
        let loginStatusWrapper = document.createElement('div');
        loginStatusWrapper.innerHTML = loginStatusUI;
        let settingsButton = loginStatusWrapper.getElementsByTagName('a').namedItem('settings-button');
        let logoutButton = loginStatusWrapper.getElementsByTagName('a').namedItem('logout-button');
        let userNameButton = loginStatusWrapper.getElementsByTagName('button').namedItem('user-name');
        let loginStatus = document.getElementsByTagName('div').namedItem('login-status');
        loginStatus.innerHTML = '';
        loginStatus.append(loginStatusWrapper.firstChild);
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
            location.href = "settings?user_id=" + userId + "&type=" + userDetails.USER_TYPE;
        }

        userNameButton.textContent = userDetails.FULL_NAME;
    }
};