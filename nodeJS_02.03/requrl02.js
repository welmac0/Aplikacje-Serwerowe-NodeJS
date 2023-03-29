const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => { //req.url to dowolny adres w oknie url
    console.log(`adres żądania: ${req.url}`)
    res.writeHead(200, { "content-type": "application/json" })
    //res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    res.end(`<h1>adres url żądania to: ${req.url}</h1>`)
})

//req.url -> url

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});