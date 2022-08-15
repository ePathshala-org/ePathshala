/**
 * 
 * @param {File} file
 * @param {string} task
 * @param {any} data
 * @param {string} path
 */
const UploadFile = async function(file, path, task, data)
{
    let fileBuffer = await file.arrayBuffer();
    let fileUint8Array = new Uint8Array(fileBuffer);

    let http = new XMLHttpRequest();

    http.open('POST', '/', false);
    http.setRequestHeader('Content-Type', 'application/json');

    let requestData = 
    {
        type: 'start-download',
        path: path
    }

    http.send(JSON.stringify(requestData));

    let response = null

    if(http.readyState == 4 && http.status == 200)
    {
        response = JSON.parse(http.responseText);
    }

    if(response.index != null)
    {
        let index = response.index;
        let length = parseInt(fileUint8Array.length / 10000);

        if(fileUint8Array.length % 10000 != 0)
        {
            ++length;
        }
        
        for(let i = 0; i < length && response.next; ++i)
        {
            let endIndex = i * 10000 + 10000;

            if(endIndex > fileUint8Array.length)
            {
                endIndex = fileUint8Array.length;
            }

            let subarray = fileUint8Array.subarray(i * 10000, endIndex);

            requestData = 
            {
                type: 'continue-download',
                content: Array.from(subarray),
                index: index
            }

            // for(let j = i * 100000; j <= endIndex; ++j)
            // {
            //     requestData.content.push();
            // }

            http = new XMLHttpRequest();

            http.open('POST', '/', false);
            http.setRequestHeader('Content-Type', 'application/json');
            http.send(JSON.stringify(requestData));

            response = JSON.parse(http.responseText);
        }

        requestData = 
        {
            type: 'end-download',
            task: task,
            data: data
        }

        http = new XMLHttpRequest();

        http.open('POST', '/', false);
        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify(requestData));

        response = JSON.parse(http.responseText);

        return response;
    }
};