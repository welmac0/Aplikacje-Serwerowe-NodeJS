// a) POST /api/user/register // register usera 
// b) GET /api/user/confirm/<token> // user potwierdza rejestrację konta z użyciem tokena
// c) POST /api/user/login // logowanie z odesłaniem tokena po zalogowaniu - od tej pory każde żądanie zawiera token
// d) GET /api/user // json all users - funkcja pomocnicza dla testów
const controller = require('./usersController')
const getBodyRequestData = require('./getRequestData')

const router = async (req, res) => {
    if (req.url == '/api/user/register' && req.method == "POST") {
        let data = JSON.parse(await getBodyRequestData(req));
        let result = await controller.registerUser(data.name, data.email, data.password);
        let responseBody = result ? JSON.stringify(result) : '';
        res.writeHead(200).end(responseBody);
            
    } else if (req.url.match(/\/api\/user\/confirm\/(.+)/) && req.method == "GET") {
        const matches = req.url.matchAll(/\/api\/user\/confirm\/(.+)/g);
        let token = Array.from(matches)[0][1] //<-- kradnie
        let request = await controller.checkIfActivatedInTime(token)
        console.log(request)
        res.writeHead(200).end(JSON.stringify(request))
    } else if (req.url == '/api/user/login' && req.method == "POST") {
        let data = JSON.parse(await getBodyRequestData(req))
        let result = await controller.authorizeCredentials(data.mail, data.password)
        // nie dziala
        console.log(result)
    } else if (req.url == '/api/user' && req.method == "GET") {
        res.writeHead(200).end(JSON.stringify(controller.listAll()))
    }
}

module.exports = router