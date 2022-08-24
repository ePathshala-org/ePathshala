/**
 * @param {number} courseId
 * @param {string[]} select
 * @returns {any | null}
 */
const GetCourseFromCourseId = function(courseId, select)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-course-details',
        course_id: parseInt(courseId),
        select: select
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

/**
 * 
 * @param {number} userId 
 * @param {string[]} select 
 */
const GetCoursesFromStudentId = function(userId, select)
{
    if(!Array.isArray(select))
    {
        select = [];
    }

    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-courses-student',
        user_id: parseInt(userId),
        select: select
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
}

/**
 * 
 * @param {number} contentId 
 * @returns {Course | null}
 */
const GetCourseFromContentId = function(contentId)
{
    let content = null;

    while(content == null)
    {
        content = GetContentFromId(contentId);
    }

    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-course-details',
        course_id: parseInt(content.courseId)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            let course = new Course();
            course.courseId = response.course_id;
            course.title = response.title;
            course.description = response.description;
            course.dateOfCreation = response.date_of_creation;
            course.price = response.price;
            course.creatorId = response.creator_id;
            course.creatorName = response.creator_name;
            course.rate = response.rate;
            course.enrollCount = response.enroll_count;

            return course;
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

const GetCoursesPopular = function()
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-courses-popular',
        select: ['COURSE_ID', 'TITLE', 'DESCRIPTION', 'ENROLL_COUNT', 'RATE', 'PRICE']
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

/**
 * 
 * @param {number} userId 
 * @param {number} courseId 
 */
const CheckUserEnrolled = function(userId, courseId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'check-user-enrolled',
        user_id: parseInt(userId),
        course_id: parseInt(courseId)
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

/**
 * 
 * @param {number} teacherId
 * @param {string[]} select
 */
const GetCoursesFromTeacherId = function(teacherId, select)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-courses-teacher',
        teacher_id: parseInt(teacherId),
        select: select
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