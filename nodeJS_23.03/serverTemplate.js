const fs = require("fs");
const { ServerResponse } = require("http");
const PORT = 3000;


const server = http.createServer((req, response) => {
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index.html", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                })
            }
            break;
        case "POST":
            let body = "";

            req.on("data", function (data) {
                console.log("data: " + data)
                body += data.toString();
            })
            req.on("end", function (data) {
                console.log(body)
                res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
                res.end(body);
            })
            break;


    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});

