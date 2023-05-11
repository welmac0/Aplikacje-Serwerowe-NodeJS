/*
|__ app
|   |__ model.js   // dane dla aplikacji
|   |__ jsonController.js   // modyfikacje jsona opisującego stan plików
|   |__ fileController.js   // modyfikacje samych plików (zapis/usunięcie/inne)
|   |__ router.js   // endpointy aplikacji get/post/patch/delete
|   |__ getRequestData.js   // odbiór body jak zwykle - > dzisiaj na początku nie używane, bo mamy formidable 
|
|__ index.js
*/
const formidable = require('formidable')
const controller = require('./controller')
const getBodyRequestData = require('./getRequestData')

const router = async (req, res) => {
    if (req.url == '/api/photos' && req.method == "POST") {
        let form = formidable({})
        form.uploadDir = __dirname + '/userdata/incoming/'
        form.keepExtensions = true
        form.parse(req, function (err, fields, files) {
            let name = files.file.name
            let album = fields.album
            let url = files.file.path
            let photo = controller.addPhoto(name, album, url)
            res.end(JSON.stringify(photo))
        })
    } else if (req.url == '/api/photos' && req.method == 'GET') {
        res.end(JSON.stringify(controller.getAllPhotos()))
    } else if (req.url.match(/\/api\/photos\/([0-9]+)/g) && req.method == "GET") {
        const matches = req.url.matchAll(/\/api\/photos\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        if (id > controller.getArrayLength() || id == 0) {
            res.end('There\'s no photo with given id')
        } else {
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(controller.getPhoto(id)))
        }
    } else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
        const matches = req.url.matchAll(/\/api\/photos\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        if (id > controller.getArrayLength() || id == 0) {
            res.end('There\'s no photo with given id')
        } else {
            controller.deletePhoto(id)
            res.end('Photo successfuly deleted')
        }
    } else if (req.url == '/api/photos' && req.method == 'PATCH') {
        let data = JSON.parse(await getBodyRequestData(req))
        console.log(data);
        // * updatePhoto -> kiedy bedzie to robione to bedzie zmieniane
    } else {
        res.end('API not found');
    }
}

module.exports = router