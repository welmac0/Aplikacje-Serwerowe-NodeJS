/*
*/
const controller = require('./tagsController')
const getBodyRequestData = require('./getRequestData')
const photoController = require('./controller')

const router = async (req, res) => {
    if (req.url == '/api/tags/raw' && req.method == "GET") {

        res.writeHead(200).end(JSON.stringify(controller.getAllTagsRaw()))

    } else if (req.url == '/api/tags' && req.method == "GET") {

        res.writeHead(200).end(JSON.stringify(controller.getAllTags()))

    } else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {

        const matches = req.url.matchAll(/\/api\/tags\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        res.writeHead(200).end(JSON.stringify(controller.getTag(id)))

    } else if (req.url == '/api/tags' && req.method == 'POST') {
        let data = JSON.parse(await getBodyRequestData(req))
        tagName = data.name
        popularity = data.popularity
        res.writeHead(200).end(JSON.stringify(controller.addTag(tagName, popularity)))

    }
}

module.exports = router