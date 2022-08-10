/**
 * @param {number} courseId
 * @returns {Course | null}
 */
const GetCourseFromId = function(courseId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-course-details',
        course_id: parseInt(courseId)
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