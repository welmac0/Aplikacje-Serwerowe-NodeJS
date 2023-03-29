const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log("nagłowki żądania:")
    console.log(JSON.stringify(req.rawHeaders, null, 5)) //all data
    console.log(JSON.stringify(req.headers, null, 5)) //significant data from headers
    res.writeHead(200, { "content-type": "application/json;charset=utf-8" })
    res.end(JSON.stringify(req.url, null, 5))
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});