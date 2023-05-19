/*
GET /api/tags/raw // pobranie wszystkich tagów bez konwersji na obiekty
GET /api/tags // pobranie wszystkich tagów z konwersją na obiekty
GET /api/tags/1 // pobranie jednego taga
POST /api/tags // utworzenie nowego taga

TODO ponizsze funkcje jako metody w controller.js
PATCH /api/photos/tags  // aktualizacja danych zdjęcia o nowy tag
PATCH /api/photos/tags/mass // aktualizacja danych zdjęcia o tablicę nowych tag-ów
GET /api/photos/tags/12345 // pobranie tagów danego zdjęcia
*/
const controller = require('./tagsController')
const getBodyRequestData = require('./getRequestData')
const photoController = rquire('./controller')

const router = async (req, res) => {
    if (req.url == '/api/tags/raw' && req.method == "GET") {
        res.writeHead(200).end(JSON.stringify(controller.getAllTagsRaw()))
    } else if (req.url == '/api/tags' && req.method == "GET") {
        res.writeHead(200).end(JSON.stringify(controller.getAllTags))
    } else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
        res.writeHead(200).end(JSON.stringify(controller.getTag))
    } else if (req.url == '/api/tags' && req.method == 'POST') {
        let data = JSON.parse(await getBodyRequestData(req))
        console.log(data)
        res.writeHead(200).end(JSON.stringify(controller.addTag(name)))
    } else if (req.url == '/api/photos/tags' && req.method == 'PATCH') {
        //id, tag
    } else if (req.url == '/api/photos/tags/mass' && req.method == 'PATCH') {
        //id, tablica tagow
    } else if (req.url.match(/\/api\/photo\/tags\/([0-9]+)/) && req.method == 'PATCH') {
        const matches = req.url.matchAll(/\/api\/photo\/tags\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        res.writeHead(200).end(JSON.stringify(photoController.getPhotoTags(id)))
    }
}

module.exports = router