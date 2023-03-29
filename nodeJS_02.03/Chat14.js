const http = require("http");
const PORT = 3000;
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        fs.readFile("static/chat.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data)
            res.end()
        })
    }

    if (req.url != "/") {
        requests(req.url)
    }

    function requests(requesturl) {
        staticFolder = 'static'
        filepath = decodeURI(requesturl)
        filepath = filepath.toString()
        ext = getExt(filepath)
        searchFile = staticFolder + filepath
        console.log(searchFile)

        const extArray = [
            { type: 'jpg', ContentType: 'image/jpeg' },
            { type: 'png', ContentType: 'image/png' },
            { type: 'css', ContentType: 'text/plain' },
            { type: 'html', ContentType: 'text/html' },
            { type: 'js', ContentType: 'application/javascript' },
            { type: 'json', ContentType: 'application/json' }
        ]

        if (ext) {
            fs.readFile(searchFile, function (error, data) {
                if (error) {
                    //console.log(error)
                    return;
                }
                const contentType = extArray.find(test => test.type == ext)
                //console.log(contentType)
                res.writeHead(200, { 'Content-Type': contentType.ContentType });
                res.write(data);
                res.end();
            })
        }
    }

    function getExt(path) {
        var n = path.split(".");
        return n[n.length - 1];
    }
})

const { Server } = require("socket.io")
const socketio = new Server(server)

socketio.on('connection', (client) => {
    client.on('sendmsg', (data) => {
        console.log(data)
        client.broadcast.emit('sendmsgemit', data)
    })

    client.on('join', (data) => {
        console.log(data)
        client.broadcast.emit('joinemit', data)
    })

    client.on("disconnect", (reason) => {
        console.log("klient się rozłącza", reason)
    })

    client.on('leave', (data) => {
        console.log('leave')
        client.broadcast.emit('leaveone', data)
    })
});

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});