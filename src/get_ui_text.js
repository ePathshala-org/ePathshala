/**
 * 
 * @param {string} path 
 * @returns {string}
 */
const GetUIText = async function(path)
{
    let ui = await fetch(path);
    return ui.text();
}