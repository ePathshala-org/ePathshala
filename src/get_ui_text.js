/**
 * 
 * @param {string} path 
 * @returns {Promise<string>}
 */
const GetUIText = async function(path)
{
    let ui = await fetch(path);
    return ui.text();
}