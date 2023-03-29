const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((req, res) => { //creates server
    console.log(req.method)

    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index3.html", function (error, data) {
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
            console.log(req.url)
            if (req.url == "/obliczenia") {
                console.log(body)
                body = JSON.parse(body)
                //const params = new URLSearchParams(body);
                //const finishObj = Object.fromEntries(params);
                console.log(body.a)
                console.log(body.b)
                console.log(body.typ)
                res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(dzialanie(body)))
                console.log(JSON.stringify(dzialanie(body)))
            }
            if (req.url == '/kolor') {
                console.log(body)
                body = JSON.parse(body)
                end = `rgba(${body.r}, ${body.g}, ${body.b}, ${body.a / 100})`
                console.log(end)
                res.end(JSON.stringify(end))
            }
        })
    }
})

function dzialanie(finishObj) {
    let dzialanie;
    switch (finishObj.typ) {
        case "suma":
            dzialanie = parseInt(finishObj.a) + parseInt(finishObj.b)
            break;
        case "roznica":
            dzialanie = parseInt(finishObj.a) - parseInt(finishObj.b)
            break;
        case "iloczyn":
            dzialanie = parseInt(finishObj.a) * parseInt(finishObj.b)
            break;
        case "iloraz":
            dzialanie = parseInt(finishObj.a) / parseInt(finishObj.b)
            break;
        case "wszystko":
            let arr = [parseInt(finishObj.a) + parseInt(finishObj.b), parseInt(finishObj.a) - parseInt(finishObj.b), dzialanie = parseInt(finishObj.a) * parseInt(finishObj.b), dzialanie = parseInt(finishObj.a) / parseInt(finishObj.b)]
            dzialanie = arr
            break;
    }
    console.log(dzialanie)
    return dzialanie;
}

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});