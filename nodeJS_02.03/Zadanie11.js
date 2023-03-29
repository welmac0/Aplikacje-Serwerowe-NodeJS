const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((req, res) => {
    if (req.url == "/index.html") {

        fs.readFile("static/index.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url == "/second") {

        fs.readFile("static/second", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(data);
            res.end();
        })
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>404 - brak takiej strony</h1>");
        res.end();

    }
})


server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});