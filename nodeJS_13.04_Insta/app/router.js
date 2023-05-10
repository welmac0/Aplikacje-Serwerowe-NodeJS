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

const router = async (req, res) => {
    if (req.url == '/api/photos' && req.method == "POST") {
        let form = formidable({})
        console.log(__dirname)
        form.uploadDir = __dirname + '/userdata/'
        form.keepExtensions = true
        form.parse(req, function (err, fields, files) {
            console.log(fields);
            console.log(files);
        })
    }
}

module.exports = router