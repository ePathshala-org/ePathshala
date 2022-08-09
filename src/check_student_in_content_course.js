/**
 * 
 * @param {number} userId 
 * @param {number} contentId 
 */
 const IsStudentInContentCourse = function(userId, contentId)
 {
     let http = new XMLHttpRequest();
 
     http.open('POST', '/', false);
     http.setRequestHeader('Content-Type', 'application/json');
 
     let data = 
     {
         type: 'check-student-in-content-course',
         user_id: parseInt(userId),
         content_id: parseInt(contentId)
     };
 
     http.send(JSON.stringify(data));
 
     if(http.readyState == 4 && http.status == 200)
     {
         let response = JSON.parse(http.responseText);
 
         if(response.ok)
         {
             return response.check_result;
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