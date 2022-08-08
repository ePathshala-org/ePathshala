const SetupStudentsAllCourses = async function()
{
    let studentsAllCoursesUI = await fetch('ui/students_all_courses.html');
    let studentsAllCoursesUIText = await studentsAllCoursesUI.text();
    root.innerHTML = studentsAllCoursesUIText;
    let studentCoursesRequestdata = 
    {
        type: 'get-student-all-courses',
        user_id: parseInt(userId)
    };
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(studentCoursesRequestdata));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            if(Array.isArray(response.query_user_courses))
            {
                let coursesUl = root.getElementsByTagName('ul').namedItem('student-enrolled-courses-ul');
                let userCoursesListItemUI = await fetch('ui/courses_list_item.html');
                let userCoursesListItemUIText = await userCoursesListItemUI.text();

                for(let i = 0; i < response.query_user_courses.length; ++i)
                {
                    coursesUl.innerHTML += userCoursesListItemUIText;

                    coursesUl.getElementsByTagName('h5').item(i).innerText = response.query_user_courses[i].title;
                    coursesUl.getElementsByTagName('p').item(i).innerText = response.query_user_courses[i].description;
                }

                let buttons = coursesUl.getElementsByTagName('button');

                for(let i = 0; i < buttons.length; ++i)
                {
                    buttons.item(i).onclick = function()
                    {
                        console.log(location.hostname);
                    }
                }
            }
        }
    }
};

const SetupAllCourses = async function()
{
    let allCoursesUI = await fetch('ui/all_courses.html');
    let allCoursesUIText = await allCoursesUI.text();
    root.innerHTML = allCoursesUIText;
    let allCoursesRequestData =
    {
        type: 'get-all-courses'
    };
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(allCoursesRequestData));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            if(Array.isArray(response.courses))
            {
                let coursesUl = root.getElementsByTagName('ul').namedItem('all-courses-ul');
                let userCoursesListItemUI = await fetch('ui/courses_list_item.html');
                let userCoursesListItemUIText = await userCoursesListItemUI.text();

                for(let i = 0; i < response.query_user_courses.length; ++i)
                {
                    coursesUl.innerHTML += userCoursesListItemUIText;

                    coursesUl.getElementsByTagName('h5').item(i).innerText = response.query_user_courses[i].title;
                    coursesUl.getElementsByTagName('p').item(i).innerText = response.query_user_courses[i].description;
                }

                let buttons = coursesUl.getElementsByTagName('button');

                for(let i = 0; i < buttons.length; ++i)
                {
                    buttons.item(i).onclick = function()
                    {
                        console.log(i);
                    }
                }
            }
        }
    }
};