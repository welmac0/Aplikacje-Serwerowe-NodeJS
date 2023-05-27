const sharp = require("sharp");
const { getPhoto } = require('./controller')
const { fileArray } = require('./model')
const logger = require('tracer').colorConsole();

getPicData = async (id) => {
    //console.log(fileArray[id - 1].url);
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

getObj = (id) => {
    return fileArray[id - 1]
}

modifyPhoto = async (data) => {
    let method = data.method
    let photo = fileArray[data.id - 1]
    let url = photo.url
    let photoNameNoExt = photo.originalName.slice(0, photo.originalName.lastIndexOf('.'));

    switch (method) {
        case 'rotate':
            await sharp(url)
                .rotate(data.rotate)
                .toFile(url);
            break;
        case 'resize':
            await sharp(url)
                .resize({
                    width: data.width,
                    height: data.height
                })
                .toFile(url);
            break;
        case 'reformat':
            await sharp(url)
                .toFormat(data.newFormat)
                .toFile(photoNameNoExt + '.' + data.newFormat);
            break;
        case 'crop':
            await sharp(url)
                .extract({ width: data.height, height: data.width, left: data.left, top: data.right })
                .toFile(url);
            break;
        case 'grayscale':
            await sharp(url)
                .grayscale()
                .toFile(url);
            break
        case 'flip': //horizontally
            await sharp(url)
                .flip()
                .toFile(url);
            break;
        case 'flop': //vertically
            await sharp(url)
                .flop()
                .toFile(url);
            break;
        case 'negate':
            await sharp(url)
                .negate()
                .toFile(url);
            break;
        case 'tint':
            await sharp(url)
                .tint({ r: 255, g: 0, b: 0 })
                .toFile(url);
        default:
            console.log("Couldn't find method");
    }

    let newHistoryPost = {
        "status": "modified",
        "modification": method,
        "date": new Date().toISOString().split('T')[0]
    }

    photo.history.push(newHistoryPost)

    return photo
}


module.exports = { getPicData, modifyPhoto, getObj }