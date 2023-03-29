const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
    //console.log(JSON.stringify(req.headers, null, 5)) //significant data from headers
    var data = req.headers
    userAgent = data['user-agent']
    userInfoArray = userAgent.split(" ");
    searchedFragement = userInfoArray[userInfoArray.length - 1]
    if (searchedFragement.indexOf("Firefox") == 0) {
        res.end('Twoj klient to Firefox')
    } else if (searchedFragement.indexOf("Chrome") == 0) {
        res.end('Twoj klient to Chrome')
    } else if (searchedFragement.indexOf("Safari") == 0) {
        res.end('Twoj klient to Safari')
    } else { res.end('Inny klient') }
    //res.writeHead(200, { "content-type": "application/json;charset=utf-8" })
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});