const URL = "https://api.github.com/users/Furiza31/repos";
let data;

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

data = JSON.parse(httpGet(URL));

console.log(data);