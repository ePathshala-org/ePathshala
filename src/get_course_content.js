class Content
{
    constructor()
    {
        /**
         * @type {number}
         */
        this.contentId = 0;
        /**
         * @type {string}
         */
        this.title = '';
        /**
         * @type {string}
         */
        this.description = '';
        /**
         * @type {number}
         */
        this.rate = -1;
        /**
         * @type {string}
         */
        this.dateOfCreation = '1970-01-01';
        /**
         * @type {string}
         */
        this.contentType = '';
        /**
         * @type {string}
         */
        this.viewCount = -1;
    }
}

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