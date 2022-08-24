/**
 * 
 * @param {number} userId 
 * @param {File} file 
 */
const UpdatePfp = async function(userId, file)
{
    let fileArrayBuffer = await file.arrayBuffer();
    let fileDataArray = Array.from(new Uint8Array(fileArrayBuffer));

    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let data = 
    {
        type: 'update-pfp',
        file_data_array: fileDataArray,
        user_id: parseInt(userId)
    }

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