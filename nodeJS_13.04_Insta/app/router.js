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
    } else if (req.url == '/api/tasks' && req.method == 'GET') {

    }
}

module.exports = router