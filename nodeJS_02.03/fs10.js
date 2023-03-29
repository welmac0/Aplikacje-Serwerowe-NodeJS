const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((req, res) => {
    fs.readFile("static/index.html", function (error, data) {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
        }

        else {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.write(data);
            res.end();
        }
    });
})


server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});