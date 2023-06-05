const sharp = require("sharp");
const { getPhoto } = require('./controller')
const { fileArray } = require('./model')
const logger = require('tracer').colorConsole();

getPicData = async (id) => {
    console.log(fileArray[id - 1].url);
    let meta = await getMeta(fileArray[id - 1].url)
    logger.info('Meta data downloaded.')
    return meta
}

getMeta = async (path) => {
    try {
        if (path) {
            let meta = await sharp(path)
                .metadata()
            return (meta)
        }
        else {
            return ("url_not_found")
        }
    } catch (err) {
        return (err.mesage)
    }
}

module.exports = { getPicData }