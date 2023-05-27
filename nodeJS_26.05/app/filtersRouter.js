const controller = require('./filtersController')
const getBodyRequestData = require('./getRequestData')
const fs = require('fs')

const router = async (req, res) => {
    if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && req.method == 'GET') {
        const matches = req.url.matchAll(/\/api\/filters\/metadata\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        res.writeHead(200).end(JSON.stringify(await controller.getPicData(id)))
    } else if (req.url == '/api/filters' && req.method == 'PATCH') {
        let data = JSON.parse(await getBodyRequestData(req))
        res.writeHead(200).end(JSON.stringify(await controller.modifyPhoto(data)))
    } else if (req.url.match(/\/api\/getfile\/([0-9]+)/) && req.method == "GET") {
        const matches = req.url.matchAll(/\/api\/getfile\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        let obj = controller.getObj(id)
        const extArray = [
            { type: 'jpeg', contentType: 'image/jpeg' },
            { type: 'jpg', contentType: 'image/jpeg' },
            { type: 'png', contentType: 'image/png' }
        ]

        ext = obj.originalName.split('.').pop();
        console.log(ext);
        if (ext) {
            fs.readFile(obj.url, function (error, data) {
                if (error) {
                    console.log(error)
                    return;
                }
                const contentType = extArray.find(test => test.type.toLowerCase() === ext).contentType;
                console.log(contentType);
                res.writeHead(200, { 'Content-Type': contentType });
                res.write(data);
                res.end();
            })
        }

    } else if (req.url.match(/\/api\/getfile\/([0-9]+)\/filtername/) && req.method == 'PATCH') {
        res.writeHead(200).end(JSON.stringify('Unused.'))
    }
}

module.exports = router