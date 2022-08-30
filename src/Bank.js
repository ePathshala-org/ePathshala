/**
 * 
 * @param {number} userId
 * @param {number} courseId
 * @param {number} creditCardId
 * @param {string} creditCardPassword
 * @param {number} bank
 * @param {number} price
 */
const BuyCourse = function(userId, courseId, creditCardId, creditCardPassword, bank, price)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'buy-course',
        user_id: parseInt(userId),
        course_id: parseInt(courseId),
        credit_card_id: parseInt(creditCardId),
        password: creditCardPassword,
        bank: parseInt(bank),
        price: parseInt(price)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            return response;
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

const CollectCredit = function(userId, creditCardId, creditCardPassword, bank)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('type', 'collect-credit');

    let data = 
    {
        user_id: parseInt(userId),
        credit_card_id: parseInt(creditCardId),
        password: creditCardPassword,
        bank: parseInt(bank)
    };

    http.send(JSON.stringify(data));

    if(http.status == 200)
    {
        return JSON.parse(http.responseText);
    }
    else
    {
        return {ok: false, error: http.status};
    }
};