const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((request, response) => { //creates server

    if (request.url) {
        requests(request.url)
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
                response.writeHead(200, { 'Content-Type': contentType.ContentType });
                response.write(data);
                response.end();
            })
        }
    }

    function getExt(path) {
        var n = path.split(".");
        return n[n.length - 1];

    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});