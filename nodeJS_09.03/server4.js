const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((req, res) => { //creates server
    console.log(req.method)

    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index4.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data)
                    res.end()
                })
            }
            break;
        case "POST":
            // odbiór posta
            serverResponse(req, res)
            break;
    }


    function serverResponse(req, res) {
        let body = ''
        req.on('data', function (data) { // tutaj jest cala data (expressowe req.body)
            body += data.toString()
        })
        req.on('end', function () {
            console.log(body)
            console.log(req.url) //POST
            if (req.url == '/kolor') {
                console.log(body)
                body = JSON.parse(body)
            }
        })
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});