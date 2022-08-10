const InitNotLoggedIn = async function()
{
    let loginStatusNotLoggedInUI = await fetch('ui/login_status_not_logged_in.html');
    let loginStatusNotLoggedInUIText = await loginStatusNotLoggedInUI.text();
    document.getElementsByTagName('div').namedItem('login-status-ui').innerHTML = loginStatusNotLoggedInUIText;    
    let http = new XMLHttpRequest();

    http.open("POST", "/", false);
    http.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify(
    {
        type: "init-not-logged-in"
    });

    http.send(data);

    if(http.readyState == 4 && http.status == 200)
    {
        let responseObject = JSON.parse(http.responseText);

        if(responseObject.ok)
        {
            let popularCoursesUI = await fetch('ui/not_logged_in_home.html');
            root.innerHTML = await popularCoursesUI.text();
            let coursesUl = root.getElementsByTagName('ul').namedItem('popular-courses-ul');

            if(Array.isArray(responseObject.query_top_courses))
            {
                let popularCoursesListItemUI = await fetch('ui/courses_list_item.html');
                let popularCoursesListItemUIText = await popularCoursesListItemUI.text();;

                for(let i = 0; i < responseObject.query_top_courses.length; ++i)
                {
                    coursesUl.innerHTML += popularCoursesListItemUIText;

                    coursesUl.getElementsByTagName('h5').item(i).innerText = responseObject.query_top_courses[i].title;
                    coursesUl.getElementsByTagName('p').item(i).innerText = responseObject.query_top_courses[i].description;
                }

                let buttons = coursesUl.getElementsByTagName('button');

                for(let i = 0; i < buttons.length; ++i)
                {
                    buttons.item(i).onclick = function()
                    {
                        location.href = 'course.html?course_id=' + responseObject.query_top_courses[i].course_id;
                    };
                }
            }

            let cardGroup = root.getElementsByTagName('div').namedItem('popular-videos-card-group');

            if(Array.isArray(responseObject.query_top_videos))
            {
                let popularVideosCardUI = await fetch('ui/videos_card.html');
                let popularVideosCardUIText = await popularVideosCardUI.text();

                for(let i = 0; i < responseObject.query_top_videos.length; ++i)
                {
                    cardGroup.innerHTML += popularVideosCardUIText;

                    cardGroup.getElementsByTagName('h5').item(i).innerText = responseObject.query_top_videos[i].title;
                    cardGroup.getElementsByTagName('p').item(i).innerText = responseObject.query_top_videos[i].description;
                }

                let buttons = cardGroup.getElementsByTagName('button');

                for(let i = 0; i < buttons.length; ++i)
                {
                    buttons.item(i).onclick = function()
                    {
                        console.log(i);;
                    }
                }
            }
        }
    }
};

const InitLoggedIn = async function()
{
    let loginStatusUI = await fetch('ui/login_status_ui_logged_in.html');
    let loginStatusUIText = await loginStatusUI.text();
    let navBarLoginStatus = document.getElementsByTagName('div').namedItem('login-status-ui');
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
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let getUserdata = null;

    if(accountType == 'student')
    {
        let loggedInUI = await fetch('ui/logged_in_student_home.html');
        let loggedInUIText = await loggedInUI.text();
        root.innerHTML = loggedInUIText;

        let studentHomeAllCoursesButton = root.getElementsByTagName('button').namedItem('student-home-all-courses-button');

        studentHomeAllCoursesButton.onclick = function()
        {
            SetupAllCourses();
        };

        getUserdata =
        {
            type: 'get-student-details-home',
            user_id: parseInt(userId),
            password: password
        };

        http.send(JSON.stringify(getUserdata));

        if(http.readyState == 4 && http.status == 200)
        {
            let response = JSON.parse(http.responseText);

            if(response.ok)
            {
                userNameDropdownButton.textContent = response.full_name;
                let fullNameH3 = root.getElementsByTagName('h3').namedItem('student-home-full-name-h3');
                let emailH5 = root.getElementsByTagName('h5').namedItem('student-home-email-card-title');
                fullNameH3.textContent = response.full_name;
                emailH5.textContent = response.email;

                if(response.bio != '')
                {
                    let studentCardBody = root.getElementsByTagName('div').namedItem('student-home-card-body');
                    let studentBio = document.createElement('p');
                    studentBio.textContent = response.bio;
                    studentCardBody.append(studentBio);
                }

                let rankPoint = root.getElementsByTagName('p').namedItem('student-home-rank-name');
                rankPoint.textContent = response.rank_point;
            }
        }
        let userCourseUl = root.getElementsByTagName('ul').namedItem('student-home-courses-ul');

        http = new XMLHttpRequest();

        http.open('POST', '/', false);
        http.setRequestHeader('Content-Type', 'application/json');

        let getUserCoursesData = 
        {
            type: 'get-student-courses',
            user_id: parseInt(userId)
        };

        http.send(JSON.stringify(getUserCoursesData));

        if(http.readyState == 4 && http.status == 200)
        {
            let response = JSON.parse(http.responseText);

            if(response.ok)
            {
                if(Array.isArray(response.query_user_courses))
                {
                    let userCoursesListItemUI = await fetch('ui/courses_list_item.html');
                    let userCoursesListItemUIText = await userCoursesListItemUI.text();

                    for(let i = 0; i < response.query_user_courses.length; ++i)
                    {
                        userCourseUl.innerHTML += userCoursesListItemUIText;

                        userCourseUl.getElementsByTagName('h5').item(i).innerText = response.query_user_courses[i].title;
                        userCourseUl.getElementsByTagName('p').item(i).innerText = response.query_user_courses[i].description;
                    }

                    let buttons = userCourseUl.getElementsByTagName('button');

                    for(let i = 0; i < buttons.length; ++i)
                    {
                        buttons.item(i).onclick = function()
                        {
                            location.href = 'course.html?course_id=' + response.query_user_courses[i].course_id;
                        };
                    }
                }
            }
        }
    }
    else
    {
        let loggedInUI = await fetch('ui/logged_in_teacher_home.html');
        let loggedInUIText = await loggedInUI.text();
        root.innerHTML = loggedInUIText;

        getUserdata =
        {
            type: 'get-teacher-details-home',
            user_id: parseInt(userId),
            password: password
        };

        http.send(JSON.stringify(getUserdata));

        if(http.readyState == 4 && http.status == 200)
        {
            let response = JSON.parse(http.responseText);

            if(response.ok)
            {
                userNameDropdownButton.textContent = response.full_name;
                let fullNameH3 = root.getElementsByTagName('h3').namedItem('teacher-home-full-name-h3');
                let emailH5 = root.getElementsByTagName('h5').namedItem('teacher-home-email-card-title');
                fullNameH3.textContent = response.full_name;
                emailH5.textContent = response.email;

                if(response.bio != '')
                {
                    let teacherCardBody = root.getElementsByTagName('div').namedItem('teacher-home-card-body');
                    let teacherBio = document.createElement('p');
                    teacherBio.textContent = response.bio;
                    teacherCardBody.append(teacherBio);
                }

                let rate = root.getElementsByTagName('p').namedItem('teacher-home-rate');
                rate.textContent = parseFloat(response.rate).toFixed(2);
            }
        }

        let userCourseUl = root.getElementsByTagName('ul').namedItem('teacher-home-courses-ul');

        http = new XMLHttpRequest();

        http.open('POST', '/', false);
        http.setRequestHeader('Content-Type', 'application/json');

        let getUserCoursesData = 
        {
            type: 'get-teacher-courses',
            user_id: parseInt(userId)
        };

        http.send(JSON.stringify(getUserCoursesData));

        if(http.readyState == 4 && http.status == 200)
        {
            let response = JSON.parse(http.responseText);

            if(response.ok)
            {
                if(Array.isArray(response.query_user_courses))
                {
                    let userCoursesListItemUI = await fetch('ui/courses_list_item.html');
                    let userCoursesListItemUIText = await userCoursesListItemUI.text();

                    for(let i = 0; i < response.query_user_courses.length; ++i)
                    {
                        userCourseUl.innerHTML += userCoursesListItemUIText;

                        userCourseUl.getElementsByTagName('h5').item(i).innerText = response.query_user_courses[i].title;
                        userCourseUl.getElementsByTagName('p').item(i).innerText = response.query_user_courses[i].description;
                    }

                    let buttons = userCourseUl.getElementsByTagName('button');

                    for(let i = 0; i < buttons.length; ++i)
                    {
                        buttons.item(i).onclick = function()
                        {
                            console.log(i);
                        };
                    }
                }
            }
        }
    }
};

const GoHome = function()
{
    if(userId == null)
    {
        InitNotLoggedIn();
    }
    else
    {
        InitLoggedIn();
    }
};

GoHome();

document.getElementsByTagName('a').namedItem('navbar-home-anchor').onclick = function()
{
    GoHome();
};

document.getElementsByTagName('button').namedItem('login-modal-create-account-button').onclick = function()
{

    let loginModal = document.getElementById('login-modal');
    let createAccountModal = document.getElementById('create-account-modal');
    let loginModalInstance = bootstrap.Modal.getInstance(loginModal);
    let createAccountModalInstance = bootstrap.Modal.getInstance(createAccountModal);

    console.log(loginModalInstance);
    console.log(createAccountModalInstance);
};