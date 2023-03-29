const http = require("http");
const PORT = 3000;
const fs = require("fs");
const os = require("os")
const Datastore = require('nedb')
const path = require('path');
const server = http.createServer((req, res) => { //creates server
    console.log(req.method)

    function serverResponse(req, res) {
        let body = ''
        req.on('data', function (data) { // tutaj jest cala data (expressowe req.body)
            body += data.toString()
        })
        req.on('end', function () {
            console.log(body)
            console.log(req.url) //POST
            if (req.url == '/dane') {

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

    const saveSec = async () => {
        return new Promise((res, rej) => {
            try {
                setTimeout(() => {
                    const d = new Date()
                    let s = d.getSeconds()
                    console.log(s)

                    let mil = d.getMilliseconds()

                    const doc = {
                        s: s,
                        mil: mil,
                    }
                    coll1.insert(doc, function (err, newDoc) {
                        console.log(newDoc)
                        res(newDoc)
                    })
                }, 1000)
            } catch (err) { rej(err.message) }
        })
    }

    const zad1 = async () => {
        arr = []
        for (let i = 0; i < 5; i++) {
            one = await saveSec()
            arr.push(one)
        }
        console.log(arr)
    }

    const saveRecZ2 = async () => {
        return new Promise((res, rej) => {
            try {
                //console.log('saverec')
                setTimeout(() => {
                    let fname

                    let totalmem = process.memoryUsage().heapTotal//os.totalmem()
                    let freemem = process.memoryUsage().heapUsed//os.freemem()
                    // console.log(process.memoryUsage().heapTotal)
                    // console.log(process.memoryUsage().heapUsed)

                    let obj = {
                        totalmem: totalmem,
                        freemem: freemem
                    }

                    obj = JSON.stringify(obj)
                    obj = obj.toString()

                    const d = new Date()
                    let s = d.getSeconds()
                    let m = d.getMinutes()
                    let h = d.getHours()
                    fname = `log_${h}_${m}_${s}.log`
                    fs.writeFile(path.join(__dirname, 'zad2', fname), obj, (err) => {
                        if (err) throw err
                        //console.log("plik nadpisany");
                        res(fname)
                    })
                }, 1000)
            } catch (ex) {
                rej(ex)
            }
        })
    }

    const saveZ2 = async (time) => {
        // return new Promise((res, rej) => {
        //     try {
        fnameArr = []
        for (let i = 0; i < time; i++) {
            //console.log('petla nr' + i);
            fnameArr.push(await saveRecZ2())
            //console.log(fnameArr);
        }
        return fnameArr
        //     } catch (ex) {
        //         rej(ex)
        //     }
        // })
    }

    const zad2 = async () => {
        const savedLogs = await saveZ2(1) //savedLogs = fnameArr
        const readLogs = await readZ2(savedLogs)
        console.table(readLogs)
        return readLogs
    }

    const readZ2 = async (savedlogs) => {
        //console.log('savedlogs');
        //console.log(savedlogs)
        return new Promise((res, rej) => {
            try {
                newBody = []
                for (let i = 0; i < savedlogs.length; i++) {
                    fs.readFile(path.join(__dirname, 'zad2', savedlogs[i]), (err, data) => {
                        if (err) throw err
                        let newData = JSON.parse(data)
                        newBody.push(newData)
                        if (i + 1 == savedlogs.length) {
                            res(newBody)
                        }
                    })
                }
            } catch (ex) {
                rej(ex)
            }
        })
    }


    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/zad1.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data)
                    res.end()
                })
            }
            myFunction();
            async function myFunction() {
                if (req.url == '/dane') {
                    let logs = await zad2();
                    logs = JSON.stringify(logs)
                    console.log(logs);
                    res.setHeader("Content-Type", "application/json");
                    res.end(logs);
                }
            }
            break;
        case "POST":
            // odbiór posta
            serverResponse(req, res)
            break;
    }

})


server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});