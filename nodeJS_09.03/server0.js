const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((req, res) => { //creates server
    console.log(req.method)

    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index.html", function (error, data) {
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
        req.on("data", function (data) {
            console.log("data: " + data)
            body += data.toString();
        })
        // req.on("end", function (data) {
        //     console.log(body)
        //     res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        //     res.end(body);
        // })
        req.on("end", function () {
            console.log(body)
            const params = new URLSearchParams(body);
            const finishObj = Object.fromEntries(params);
            console.log(finishObj)
            res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
            res.end(JSON.stringify(finishObj, null, 5));

        })
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});