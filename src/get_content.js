/**
 * 
 * @param {number} contentId 
 * @returns {Content}
 */
const GetContentFromId = function(contentId)
{
    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'get-content-details',
        content_id: parseInt(contentId)
    };

    http.send(JSON.stringify(data));

    if(http.readyState == 4 && http.status == 200)
    {
        let response = JSON.parse(http.responseText);

        if(response.ok)
        {
            let content = new Content();
            content.contentId = response.content_id;
            content.dateOfCreation = response.date_of_Creation;
            content.contentType = response.content_type;
            content.rate = response.rate;
            content.title = response.title;
            content.description = response.description;
            content.courseId = response.course_id;
            content.viewCount = response.viewer_count;

            return content;
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
 * @returns {Content[] | null}
 */
 const GetCourseContents = function(courseId)
 {
     let http = new XMLHttpRequest();
 
     http.open('POST', '/', false);
     http.setRequestHeader('Content-Type', 'application/json');
 
     let data = 
     {
         type: 'get-course-contents',
         course_id: parseInt(courseId)
     };
 
     http.send(JSON.stringify(data));
 
     if(http.readyState == 4 && http.status == 200)
     {
         let response = JSON.parse(http.responseText);
 
         if(response.ok)
         {
             let contents = [];

             if(Array.isArray(response.contents))
             {
                for(let i = 0; i < response.contents.length; ++i)
                {
                    let content = new Content();
                    content.contentId = response.contents[i].content_id;
                    content.title = response.contents[i].title;
                    content.description = response.contents[i].description;
                    content.rate = response.contents[i].rate;
                    content.dateOfCreation = response.contents[i].date_of_creation;
                    content.contentType = response.contents[i].content_type;
                    content.viewCount = response.contents[i].view_count;
    
                    contents.push(content);
                }
             }
 
             return contents;
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