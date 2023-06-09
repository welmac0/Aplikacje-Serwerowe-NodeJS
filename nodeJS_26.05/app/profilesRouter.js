const getBodyRequestData = require('./getRequestData')
const { createToken, verifyToken } = require('./createJWT')
const { userArray } = require('./usersModel')
const formidable = require('formidable')
const path = require('path')
const sharp = require("sharp");
const controller = require('./controller')
const filtersController = require('./filtersController')

// a) GET /api/profile // pobranie danych usera do wyświetlenia w profilu
// b) PATCH /api/profile // aktualizacja danych usera w jego profilu
// c) POST /api/profile // wysłanie zdjęcia profilowego
// d) GET /api/logout // wylogowanie

// mam token w bibliotece
const router = async (req, res) => {
    //----------------TESTS------------------
    //----------------SERVER------------------
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token = req.headers.authorization.split(" ")[1]
        let result = await verifyToken(token)
        let user = userArray[result.success.id - 1]
        
        if (req.url == '/api/profile' && req.method == 'GET') {
            toSend = {
                name: user.name,
                firstName: user.firstName,
                surname: user.surname,
                mail: user.email,
                desc: user.description
            }
            console.log(toSend);
            res.writeHead(200).end(JSON.stringify(toSend))
            
        } else if (req.url == '/api/profile' && req.method == 'PATCH') {
            let data = JSON.parse(await getBodyRequestData(req))
            user.name = data.name
            user.firstName = data.firstName
            user.surname = data.surname
            user.description = data.desc
            res.writeHead(200).end(JSON.stringify('User data has been changed'))
            
        } else if (req.url == '/api/profile' && req.method == 'POST') {
                let form = formidable({})
                form.uploadDir = path.join(__dirname, 'userdata', 'incoming')
                form.keepExtensions = true
                form.parse(req, function (err, fields, files) {
                    console.log(fields);
                    let name = 'profile_photo.jpg'//files.file.name
                    let album = fields.album
                    let url = files.file.path
                    let photo = controller.addPhoto(name, album, url)
                    res.writeHead(200).end(JSON.stringify(photo))
                })
        } else if (req.url == '/api/profile/logout' && req.method == 'GET') {
            res.writeHead(200).end(JSON.stringify('User has been logged out'))
        }
    }

}

module.exports = router