/*
TODO
PATCH /api/filters // użycie konkretnego filtra, dane o nim przekazujemy w jsonie
GET /api/getfile/1681671564412 // get image file by id -> static expressowy
GET /api/getfile/1681671564412/filtername //zmienione zdjęcie by id
*/
const controller = require('./filtersController')
const getBodyRequestData = require('./getRequestData')

const router = async (req, res) => {
    if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && req.method == 'GET') {
        const matches = req.url.matchAll(/\/api\/filters\/metadata\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        res.writeHead(200).end(JSON.stringify(await controller.getPicData(id)))
    } else if (req.url == '/api/filters' && req.method == 'PATCH') {

    } else if (req.url.match(/\/api\/getfile\/([0-9]+)/) && req.method == "GET") {

    } else if (req.url.match(/\/api\/getfile\/([0-9]+)\/filtername/) && req.method == 'PATCH') {

    }
}

module.exports = router