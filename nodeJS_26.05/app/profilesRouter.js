const controller = require('./profilesController')
const getBodyRequestData = require('./getRequestData')
const { createToken, verifyToken } = require('./createJWT')

// a) GET /api/profile // pobranie danych usera do wyświetlenia w profilu
// b) PATCH /api/profile // aktualizacja danych usera w jego profilu
// c) POST /api/profile // wysłanie zdjęcia profilowego
// d) GET /api/logout // wylogowanie

// mam token w bibliotece
const router = async (req, res) => {
    if ((req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
        let token = req.headers.authorization.split(" ")[1]
        let result = await verifyToken(token)
        console.log(result)
        if (req.url == '/api/profile' && req.method == 'GET') {

        } else if (req.url == '/api/profile' && req.method == 'PATCH') {

        } else if (req.url == '/api/profile' && req.method == 'POST') {

        } else if (req.url == '/api/profile/logout' && req.method == 'GET') {

        }
    }

}

module.exports = router