let coursesSearchPage = 0, videosSearchPage = 0, pagesSearchPage = 0, quizesSearchPage = 0, studentsSearchPage = 0, teachersSearchPage = 0;

const SearchHTTPRequest = function(data)
{
    let http = new XMLHttpRequest();
    let response =
    {
        ok: false
    };

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(data));
    
    if(http.readyState == 4 && http.status == 200)
    {
        response = JSON.parse(http.responseText);

        return response;
    }
    else
    {
        return response;
    }
};

const SetupCoursesSearchResult = async function(response)
{
    let coursesSearchResultUl = root.getElementsByTagName('div').namedItem('accordion-card-body-courses');
    let coursesSearchResultUlUI = await fetch('ui/courses_search_result_ul.html');
    let coursesSearchResultUlUIText = await coursesSearchResultUlUI.text();

    if(Array.isArray(response.search_result_courses))
    {
        coursesSearchResultUl.innerHTML = coursesSearchResultUlUIText;        
        let coursesSearchResultList = coursesSearchResultUl.getElementsByTagName('ul').namedItem('courses-search-result-ul');
        let coursesSearchResultListItemUI = await fetch('ui/courses_search_result_list_item.html');
        let coursesSearchResultListItemUIText = await coursesSearchResultListItemUI.text();

        for(let i = 0; i < response.search_result_courses.length; ++i)
        {
            coursesSearchResultList.innerHTML += coursesSearchResultListItemUIText;

            coursesSearchResultList.getElementsByTagName('h5').item(i).innerText = response.search_result_courses[i].title;
            coursesSearchResultList.getElementsByTagName('p').item(i).innerText = response.search_result_courses[i].description;
        }

        let buttons = coursesSearchResultList.getElementsByTagName('button');

        for(let i = 0; i < buttons.length; ++i)
        {
            buttons.item(i).onclick = function()
            {
                console.log(response.search_result_courses[i].title);
            };
        }
    }
    else
    {
        coursesSearchResultUl.innerHTML = '<p>Wow, such empty</p>';
    }
};

const SetupVideosSearchResult = async function(response)
{
    let videosSearchResultUl = root.getElementsByTagName('div').namedItem('accordion-card-body-videos');
    let videosSearchResultUlUI = await fetch('ui/videos_search_result_ul.html');
    let videosSearchResultUlUIText = await videosSearchResultUlUI.text();

    if(Array.isArray(response.search_result_videos))
    {
        videosSearchResultUl.innerHTML = videosSearchResultUlUIText;        
        let videosSearchResultList = videosSearchResultUl.getElementsByTagName('ul').namedItem('videos-search-result-ul');
        let videosSearchResultListItemUI = await fetch('ui/videos_search_result_list_item.html');
        let videosSearchResultListItemUIText = await videosSearchResultListItemUI.text();

        for(let i = 0; i < response.search_result_videos.length; ++i)
        {
            videosSearchResultList.innerHTML += videosSearchResultListItemUIText;

            videosSearchResultList.getElementsByTagName('h5').item(i).innerText = response.search_result_videos[i].video_title;
            videosSearchResultList.getElementsByTagName('p').item(i).innerText = response.search_result_videos[i].course_title;
        }

        let buttons = videosSearchResultList.getElementsByTagName('button');

        for(let i = 0; i < buttons.length; ++i)
        {
            buttons.item(i).onclick = function()
            {
                console.log(response.search_result_videos[i].title);
            };
        }
    }
    else
    {
        videosSearchResultUl.innerHTML = '<p>Wow, such empty</p>';
    }
};

const SetupPagesSearchResult = async function(response)
{
    let pagesSearchResultUl = root.getElementsByTagName('div').namedItem('accordion-card-body-pages');
    let pagesSearchResultUlUI = await fetch('ui/pages_search_result_ul.html');
    let pagesSearchResultUlUIText = await pagesSearchResultUlUI.text();

    if(Array.isArray(response.search_result_pages))
    {
        pagesSearchResultUl.innerHTML = pagesSearchResultUlUIText;        
        let pagesSearchResultList = pagesSearchResultUl.getElementsByTagName('ul').namedItem('pages-search-result-ul');
        let pagesSearchResultListItemUI = await fetch('ui/pages_search_result_list_item.html');
        let pagesSearchResultListItemUIText = await pagesSearchResultListItemUI.text();

        for(let i = 0; i < response.search_result_pages.length; ++i)
        {
            pagesSearchResultList.innerHTML += pagesSearchResultListItemUIText;

            pagesSearchResultList.getElementsByTagName('h5').item(i).innerText = response.search_result_pages[i].page_title;
            pagesSearchResultList.getElementsByTagName('p').item(i).innerText = response.search_result_pages[i].course_title;
        }

        let buttons = pagesSearchResultList.getElementsByTagName('button');

        for(let i = 0; i < buttons.length; ++i)
        {
            buttons.item(i).onclick = function()
            {
                console.log(response.search_result_pages[i].title);
            };
        }
    }
    else
    {
        pagesSearchResultUl.innerHTML = '<p>Wow, such empty</p>';
    }
};

const SetupQuizesSearchResult = async function(response)
{
    let quizesSearchResultUl = root.getElementsByTagName('div').namedItem('accordion-card-body-quizes');
    let quizesSearchResultUlUI = await fetch('ui/quizes_search_result_ul.html');
    let quizesSearchResultUlUIText = await quizesSearchResultUlUI.text();

    if(Array.isArray(response.search_result_quizes))
    {
        quizesSearchResultUl.innerHTML = quizesSearchResultUlUIText;        
        let quizesSearchResultList = quizesSearchResultUl.getElementsByTagName('ul').namedItem('quizes-search-result-ul');
        let quizesSearchResultListItemUI = await fetch('ui/quizes_search_result_list_item.html');
        let quizesSearchResultListItemUIText = await quizesSearchResultListItemUI.text();

        for(let i = 0; i < response.search_result_quizes.length; ++i)
        {
            quizesSearchResultList.innerHTML += quizesSearchResultListItemUIText;

            quizesSearchResultList.getElementsByTagName('h5').item(i).innerText = response.search_result_quizes[i].quiz_title;
            quizesSearchResultList.getElementsByTagName('p').item(i).innerText = response.search_result_quizes[i].course_title;
        }

        let buttons = quizesSearchResultList.getElementsByTagName('button');

        for(let i = 0; i < buttons.length; ++i)
        {
            buttons.item(i).onclick = function()
            {
                console.log(response.search_result_quizes[i].title);
            };
        }
    }
    else
    {
        quizesSearchResultUl.innerHTML = '<p>Wow, such empty</p>';
    }
};

const SetupStudentsSearchResult = async function(response)
{
    let studentsSearchResultUl = root.getElementsByTagName('div').namedItem('accordion-card-body-students');
    let studentsSearchResultUlUI = await fetch('ui/students_search_result_ul.html');
    let studentsSearchResultUlUIText = await studentsSearchResultUlUI.text();

    if(Array.isArray(response.search_result_students))
    {
        studentsSearchResultUl.innerHTML = studentsSearchResultUlUIText;        
        let studentsSearchResultList = studentsSearchResultUl.getElementsByTagName('ul').namedItem('students-search-result-ul');
        let studentsSearchResultListItemUI = await fetch('ui/students_search_result_list_item.html');
        let studentsSearchResultListItemUIText = await studentsSearchResultListItemUI.text();

        for(let i = 0; i < response.search_result_students.length; ++i)
        {
            studentsSearchResultList.innerHTML += studentsSearchResultListItemUIText;

            studentsSearchResultList.getElementsByTagName('h5').item(i).innerText = response.search_result_students[i].full_name;
            studentsSearchResultList.getElementsByTagName('p').item(i).innerText = response.search_result_students[i].rank_name;
        }

        let buttons = studentsSearchResultList.getElementsByTagName('button');

        for(let i = 0; i < buttons.length; ++i)
        {
            buttons.item(i).onclick = function()
            {
                console.log(response.search_result_students[i].title);
            };
        }
    }
    else
    {
        studentsSearchResultUl.innerHTML = '<p>Wow, such empty</p>';
    }
};

const SetupTeachersSearchResult = async function(response)
{
    let teachersSearchResultUl = root.getElementsByTagName('div').namedItem('accordion-card-body-teachers');
    let teachersSearchResultUlUI = await fetch('ui/teachers_search_result_ul.html');
    let teachersSearchResultUlUIText = await teachersSearchResultUlUI.text();

    if(Array.isArray(response.search_result_teachers))
    {
        teachersSearchResultUl.innerHTML = teachersSearchResultUlUIText;        
        let teachersSearchResultList = teachersSearchResultUl.getElementsByTagName('ul').namedItem('teachers-search-result-ul');
        let teachersSearchResultListItemUI = await fetch('ui/teachers_search_result_list_item.html');
        let teachersSearchResultListItemUIText = await teachersSearchResultListItemUI.text();

        for(let i = 0; i < response.search_result_teachers.length; ++i)
        {
            teachersSearchResultList.innerHTML += teachersSearchResultListItemUIText;

            teachersSearchResultList.getElementsByTagName('h5').item(i).innerText = response.search_result_teachers[i].full_name;
            teachersSearchResultList.getElementsByTagName('p').item(i).innerText = response.search_result_teachers[i].rate;
        }

        let buttons = teachersSearchResultList.getElementsByTagName('button');

        for(let i = 0; i < buttons.length; ++i)
        {
            buttons.item(i).onclick = function()
            {
                console.log(response.search_result_teachers[i].title);
            };
        }
    }
    else
    {
        teachersSearchResultUl.innerHTML = '<p>Wow, such empty</p>';
    }
};

document.getElementsByTagName('button').namedItem('navbar-search-button').onclick = async function()
{
    let navBarSearchInput = document.getElementsByTagName('input').namedItem('navbar-search-input');
    let query = navBarSearchInput.value;

    if(query === '')
    {
        navBarSearchInput.className = 'form-control is-invalid';

        setTimeout(()=>
        {
            navBarSearchInput.className = 'form-control';
        }, 5000);
    }
    else
    {
        navBarSearchInput.className = 'form-control';
        let uiResponse = await fetch('ui/search_result.html');
        root.innerHTML = await uiResponse.text();

        coursesSearchPage = 0;
        let coursesPreviousPageItem = root.getElementsByTagName('li').namedItem('courses-search-result-previous-page-item');
        let coursesNextPageItem = root.getElementsByTagName('li').namedItem('courses-search-result-next-page-item');
        let coursesPreviousButton = coursesPreviousPageItem.getElementsByTagName('button').namedItem('courses-search-result-previous-button');
        let coursesNextButton = coursesNextPageItem.getElementsByTagName('button').namedItem('courses-search-result-next-button');
        let coursesData = 
        {
            type: 'search',
            search_type: 'courses',
            search_query: query,
            page: coursesSearchPage
        };
        let coursesSearchResponse = SearchHTTPRequest(coursesData);
        const ManageCoursesSearchResultPageIndex = function()
        {
            if(coursesSearchResponse.max_page_count == 0)
            {
                coursesPreviousPageItem.className = 'page-item disabled';
                coursesNextPageItem.className = 'page-item disabled';
            }
            else
            {
                if(coursesSearchPage <= 0)
                {
                    coursesPreviousPageItem.className = 'page-item disabled';
                }
                else
                {
                    coursesPreviousPageItem.className = 'page-item';
                }

                if(coursesSearchPage >= coursesSearchResponse.max_page_count - 1)
                {
                    coursesNextPageItem.className = 'page-item disabled';
                }
                else
                {
                    coursesNextPageItem.className = 'page-item';
                }
            }
        }

        if(coursesSearchResponse.ok)
        {
            coursesSearchPage = coursesSearchResponse.returned_page;

            ManageCoursesSearchResultPageIndex();
            SetupCoursesSearchResult(coursesSearchResponse);

            coursesPreviousButton.onclick = function()
            {
                --coursesSearchPage
                coursesData.page = coursesSearchPage;
                coursesSearchResponse = SearchHTTPRequest(coursesData);

                if(coursesSearchResponse.ok)
                {
                    coursesSearchPage = coursesSearchResponse.returned_page;

                    ManageCoursesSearchResultPageIndex();
                    SetupCoursesSearchResult(coursesSearchResponse);
                }
            };

            coursesNextButton.onclick = function()
            {
                ++coursesSearchPage;
                coursesData.page = coursesSearchPage;
                coursesSearchResponse = SearchHTTPRequest(coursesData);
                
                if(coursesSearchResponse.ok)
                {
                    coursesSearchPage = coursesSearchResponse.returned_page;

                    ManageCoursesSearchResultPageIndex();
                    SetupCoursesSearchResult(coursesSearchResponse);
                }
            };
        }

        videosSearchPage = 0;
        let videosPreviousPageItem = root.getElementsByTagName('li').namedItem('videos-search-result-previous-page-item');
        let videosNextPageItem = root.getElementsByTagName('li').namedItem('videos-search-result-next-page-item');
        let videosPreviousButton = videosPreviousPageItem.getElementsByTagName('button').namedItem('videos-search-result-previous-button');
        let videosNextButton = videosNextPageItem.getElementsByTagName('button').namedItem('videos-search-result-next-button');
        let videosData = 
        {
            type: 'search',
            search_type: 'videos',
            search_query: query,
            page: videosSearchPage
        };
        let videosSearchResponse = SearchHTTPRequest(videosData);
        const ManageVideosSearchResultPageIndex = function()
        {
            if(videosSearchResponse.max_page_count == 0)
            {
                videosPreviousPageItem.className = 'page-item disabled';
                videosNextPageItem.className = 'page-item disabled';
            }
            else
            {
                if(videosSearchPage == 0)
                {
                    videosPreviousPageItem.className = 'page-item disabled';
                }
                else
                {
                    videosPreviousPageItem.className = 'page-item';
                }

                if(videosSearchPage == videosSearchResponse.max_page_count - 1)
                {
                    videosNextPageItem.className = 'page-item disabled';
                }
                else
                {
                    videosNextPageItem.className = 'page-item';
                }
            }
        }

        if(videosSearchResponse.ok)
        {
            videosSearchPage = videosSearchResponse.returned_page;

            ManageVideosSearchResultPageIndex();
            SetupVideosSearchResult(videosSearchResponse);

            videosPreviousButton.onclick = function()
            {
                --videosSearchPage
                videosData.page = videosSearchPage;
                videosSearchResponse = SearchHTTPRequest(videosData);

                if(videosSearchResponse.ok)
                {
                    videosSearchPage = videosSearchResponse.returned_page;

                    ManageVideosSearchResultPageIndex();
                    SetupVideosSearchResult(videosSearchResponse);
                }
            };

            videosNextButton.onclick = function()
            {
                ++videosSearchPage;
                videosData.page = videosSearchPage;
                videosSearchResponse = SearchHTTPRequest(videosData);
                
                if(videosSearchResponse.ok)
                {
                    videosSearchPage = videosSearchResponse.returned_page;

                    ManageVideosSearchResultPageIndex();
                    SetupVideosSearchResult(videosSearchResponse);
                }
            };
        }

        pagesSearchPage = 0;
        let pagesPreviousPageItem = root.getElementsByTagName('li').namedItem('pages-search-result-previous-page-item');
        let pagesNextPageItem = root.getElementsByTagName('li').namedItem('pages-search-result-next-page-item');
        let pagesPreviousButton = pagesPreviousPageItem.getElementsByTagName('button').namedItem('pages-search-result-previous-button');
        let pagesNextButton = pagesNextPageItem.getElementsByTagName('button').namedItem('pages-search-result-next-button');
        let pagesData = 
        {
            type: 'search',
            search_type: 'pages',
            search_query: query,
            page: pagesSearchPage
        };
        let pagesSearchResponse = SearchHTTPRequest(pagesData);
        const ManagePagesSearchResultPageIndex = function()
        {
            if(pagesSearchResponse.max_page_count == 0)
            {
                pagesPreviousPageItem.className = 'page-item disabled';
                pagesNextPageItem.className = 'page-item disabled';
            }
            else
            {
                if(pagesSearchPage == 0)
                {
                    pagesPreviousPageItem.className = 'page-item disabled';
                }
                else
                {
                    pagesPreviousPageItem.className = 'page-item';
                }

                if(pagesSearchPage == pagesSearchResponse.max_page_count - 1)
                {
                    pagesNextPageItem.className = 'page-item disabled';
                }
                else
                {
                    pagesNextPageItem.className = 'page-item';
                }
            }
        }

        if(pagesSearchResponse.ok)
        {
            pagesSearchPage = pagesSearchResponse.returned_page;

            ManagePagesSearchResultPageIndex();
            SetupPagesSearchResult(pagesSearchResponse);

            pagesPreviousButton.onclick = function()
            {
                --pagesSearchPage
                pagesData.page = pagesSearchPage;
                pagesSearchResponse = SearchHTTPRequest(pagesData);

                if(pagesSearchResponse.ok)
                {
                    pagesSearchPage = pagesSearchResponse.returned_page;

                    ManagePagesSearchResultPageIndex();
                    SetupPagesSearchResult(pagesSearchResponse);
                }
            };

            pagesNextButton.onclick = function()
            {
                ++pagesSearchPage;
                pagesData.page = pagesSearchPage;
                pagesSearchResponse = SearchHTTPRequest(pagesData);
                
                if(pagesSearchResponse.ok)
                {
                    pagesSearchPage = pagesSearchResponse.returned_page;

                    ManagePagesSearchResultPageIndex();
                    SetupPagesSearchResult(pagesSearchResponse);
                }
            };
        }

        quizesSearchPage = 0;
        let quizesPreviousPageItem = root.getElementsByTagName('li').namedItem('quizes-search-result-previous-page-item');
        let quizesNextPageItem = root.getElementsByTagName('li').namedItem('quizes-search-result-next-page-item');
        let quizesPreviousButton = quizesPreviousPageItem.getElementsByTagName('button').namedItem('quizes-search-result-previous-button');
        let quizesNextButton = quizesNextPageItem.getElementsByTagName('button').namedItem('quizes-search-result-next-button');
        let quizesData = 
        {
            type: 'search',
            search_type: 'quizes',
            search_query: query,
            page: quizesSearchPage
        };
        let quizesSearchResponse = SearchHTTPRequest(quizesData);
        const ManageQuizesSearchResultPageIndex = function()
        {
            if(quizesSearchResponse.max_page_count == 0)
            {
                quizesPreviousPageItem.className = 'page-item disabled';
                quizesNextPageItem.className = 'page-item disabled';
            }
            else
            {
                if(quizesSearchPage == 0)
                {
                    quizesPreviousPageItem.className = 'page-item disabled';
                }
                else
                {
                    quizesPreviousPageItem.className = 'page-item';
                }

                if(quizesSearchPage == quizesSearchResponse.max_page_count - 1)
                {
                    quizesNextPageItem.className = 'page-item disabled';
                }
                else
                {
                    quizesNextPageItem.className = 'page-item';
                }
            }
        }

        if(quizesSearchResponse.ok)
        {
            quizesSearchPage = quizesSearchResponse.returned_page;

            ManageQuizesSearchResultPageIndex();
            SetupQuizesSearchResult(quizesSearchResponse);

            quizesPreviousButton.onclick = function()
            {
                --quizesSearchPage
                quizesData.page = quizesSearchPage;
                quizesSearchResponse = SearchHTTPRequest(quizesData);

                if(quizesSearchResponse.ok)
                {
                    quizesSearchPage = quizesSearchResponse.returned_page;

                    ManageQuizesSearchResultPageIndex();
                    SetupQuizesSearchResult(quizesSearchResponse);
                }
            };

            quizesNextButton.onclick = function()
            {
                ++quizesSearchPage;
                quizesData.page = quizesSearchPage;
                quizesSearchResponse = SearchHTTPRequest(quizesData);
                
                if(quizesSearchResponse.ok)
                {
                    quizesSearchPage = quizesSearchResponse.returned_page;

                    ManageQuizesSearchResultPageIndex();
                    SetupQuizesSearchResult(quizesSearchResponse);
                }
            };
        }

        studentsSearchPage = 0;
        let studentsPreviousPageItem = root.getElementsByTagName('li').namedItem('students-search-result-previous-page-item');
        let studentsNextPageItem = root.getElementsByTagName('li').namedItem('students-search-result-next-page-item');
        let studentsPreviousButton = studentsPreviousPageItem.getElementsByTagName('button').namedItem('students-search-result-previous-button');
        let studentsNextButton = studentsNextPageItem.getElementsByTagName('button').namedItem('students-search-result-next-button');
        let studentsData = 
        {
            type: 'search',
            search_type: 'students',
            search_query: query,
            page: studentsSearchPage
        };
        let studentsSearchResponse = SearchHTTPRequest(studentsData);
        const ManageStudentsSearchResultPageIndex = function()
        {
            if(studentsSearchResponse.max_page_count == 0)
            {
                studentsPreviousPageItem.className = 'page-item disabled';
                studentsNextPageItem.className = 'page-item disabled';
            }
            else
            {
                if(studentsSearchPage == 0)
                {
                    studentsPreviousPageItem.className = 'page-item disabled';
                }
                else
                {
                    studentsPreviousPageItem.className = 'page-item';
                }

                if(studentsSearchPage == studentsSearchResponse.max_page_count - 1)
                {
                    studentsNextPageItem.className = 'page-item disabled';
                }
                else
                {
                    studentsNextPageItem.className = 'page-item';
                }
            }
        }

        if(studentsSearchResponse.ok)
        {
            studentsSearchPage = studentsSearchResponse.returned_page;

            ManageStudentsSearchResultPageIndex();
            SetupStudentsSearchResult(studentsSearchResponse);

            studentsPreviousButton.onclick = function()
            {
                --studentsSearchPage
                studentsData.page = studentsSearchPage;
                studentsSearchResponse = SearchHTTPRequest(studentsData);

                if(studentsSearchResponse.ok)
                {
                    studentsSearchPage = studentsSearchResponse.returned_page;

                    ManageStudentsSearchResultPageIndex();
                    SetupStudentsSearchResult(studentsSearchResponse);
                }
            };

            studentsNextButton.onclick = function()
            {
                ++studentsSearchPage;
                studentsData.page = studentsSearchPage;
                studentsSearchResponse = SearchHTTPRequest(studentsData);
                
                if(studentsSearchResponse.ok)
                {
                    studentsSearchPage = studentsSearchResponse.returned_page;

                    ManageStudentsSearchResultPageIndex();
                    SetupStudentsSearchResult(studentsSearchResponse);
                }
            };
        }

        teachersSearchPage = 0;
        let teachersPreviousPageItem = root.getElementsByTagName('li').namedItem('teachers-search-result-previous-page-item');
        let teachersNextPageItem = root.getElementsByTagName('li').namedItem('teachers-search-result-next-page-item');
        let teachersPreviousButton = teachersPreviousPageItem.getElementsByTagName('button').namedItem('teachers-search-result-previous-button');
        let teachersNextButton = teachersNextPageItem.getElementsByTagName('button').namedItem('teachers-search-result-next-button');
        let teachersData = 
        {
            type: 'search',
            search_type: 'teachers',
            search_query: query,
            page: teachersSearchPage
        };
        let teachersSearchResponse = SearchHTTPRequest(teachersData);
        const ManageTeachersSearchResultPageIndex = function()
        {
            if(teachersSearchResponse.max_page_count == 0)
            {
                teachersPreviousPageItem.className = 'page-item disabled';
                teachersNextPageItem.className = 'page-item disabled';
            }
            else
            {
                if(teachersSearchPage == 0)
                {
                    teachersPreviousPageItem.className = 'page-item disabled';
                }
                else
                {
                    teachersPreviousPageItem.className = 'page-item';
                }

                if(teachersSearchPage == teachersSearchResponse.max_page_count - 1)
                {
                    teachersNextPageItem.className = 'page-item disabled';
                }
                else
                {
                    teachersNextPageItem.className = 'page-item';
                }
            }
        }

        if(teachersSearchResponse.ok)
        {
            teachersSearchPage = teachersSearchResponse.returned_page;

            ManageTeachersSearchResultPageIndex();
            SetupTeachersSearchResult(teachersSearchResponse);

            teachersPreviousButton.onclick = function()
            {
                --teachersSearchPage
                teachersData.page = teachersSearchPage;
                teachersSearchResponse = SearchHTTPRequest(teachersData);

                if(teachersSearchResponse.ok)
                {
                    teachersSearchPage = teachersSearchResponse.returned_page;

                    ManageTeachersSearchResultPageIndex();
                    SetupTeachersSearchResult(teachersSearchResponse);
                }
            };

            teachersNextButton.onclick = function()
            {
                ++teachersSearchPage;
                teachersData.page = teachersSearchPage;
                teachersSearchResponse = SearchHTTPRequest(teachersData);
                
                if(teachersSearchResponse.ok)
                {
                    teachersSearchPage = teachersSearchResponse.returned_page;

                    ManageTeachersSearchResultPageIndex();
                    SetupTeachersSearchResult(teachersSearchResponse);
                }
            };
        }
    }
};