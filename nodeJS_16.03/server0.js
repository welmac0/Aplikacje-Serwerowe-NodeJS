const http = require("http");
const PORT = 3000;
const fs = require("fs");
const Datastore = require('nedb')
const server = http.createServer((req, res) => { //creates server
    console.log(req.method)

    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index0.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data)
                    show()
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
    ///

    const coll1 = new Datastore({
        filename: 'static/kolekcja.db',
        autoload: true
    });

    const getAll = async () => {
        return new Promise((resolve, reject) => {
            try {
                
                coll1.find({}, (err, docs) => {
                    resolve(docs)
                });
            } catch (error) {
                reject(error.message)
            }
        })
    }


    const show = async () => {
        console.log("pobieram dane 1 raz");
        let x = await getAll()
        console.log(x);
        console.log("pobieram dane 2 raz");
        let y = await getAll()
        console.log(y);
    }


    ///
})


server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});