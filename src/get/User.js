/**
 * 
 * @param {number} userId 
 * @returns {User | null}
 */
const GetUserDetails = function(userId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-user-details',
        user_id: parseInt(userId)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            let user = new User();
            user.userId = response.user_id;
            user.fullName = response.full_name;
            user.bankId = response.bank_id;
            user.bio = response.bio;
            user.creditCardId = response.credit_card_id;
            user.dateOfBirth = response.date_of_birth;
            user.email = response.email;
            user.gender = response.gender;
            user.userType = response.user_type;

            return user;
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