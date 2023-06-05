const sharp = require("sharp");
const { getPhoto } = require('./controller')
const { fileArray } = require('./model')
const logger = require('tracer').colorConsole();
const fs = require('fs')
const path = require('path')

sharp.cache(false);

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
    let photoPath = url.slice(0, photo.url.lastIndexOf('/'))
    let photoNameNoExt = photo.originalName.slice(0, photo.originalName.lastIndexOf('.'));

    switch (method) {
        case 'rotate':
            await sharp(url)
                .rotate(data.rotate)
                .toBuffer(function (err, buffer) {
                    fs.writeFile(url, buffer, function (e) {
                    })
                });
            break;
        case 'resize':
            await sharp(url)
                .resize({
                    width: data.width,
                    height: data.height
                })
                .toBuffer(function (err, buffer) {
                    fs.writeFile(url, buffer, function (e) {
                    })
                });
            break;
        case 'reformat':
            let newName = photoNameNoExt + '.' + data.newFormat
            let reformattedPath = path.join(photoPath, newName)
            await sharp(url)
                .toFormat(data.newFormat)
                .toBuffer(function (err, buffer) {
                    fs.writeFile(reformattedPath, buffer, function (e) {
                    })
                });
            photo.url = reformattedPath
            photo.originalName = newName
            break;
        case 'crop':
            await sharp(url)
                .extract({ width: data.height, height: data.width, left: data.left, top: data.right })
                .toBuffer(function (err, buffer) {
                    fs.writeFile(url, buffer, function (e) {
                    })
                });
            break;
        case 'grayscale':
            await sharp(url)
                .grayscale()
                .toBuffer(function (err, buffer) {
                    fs.writeFile(url, buffer, function (e) {
                    })
                });
            break
        case 'flip': //horizontally
            await sharp(url)
                .flip()
                .toBuffer(function (err, buffer) {
                    fs.writeFile(url, buffer, function (e) {
                    })
                });
            break;
        case 'flop': //vertically
            await sharp(url)
                .flop()
                .toBuffer(function (err, buffer) {
                    fs.writeFile(url, buffer, function (e) {
                    })
                });
            break;
        case 'negate':
            await sharp(url)
                .negate()
                .toBuffer(function (err, buffer) {
                    fs.writeFile(url, buffer, function (e) {
                    })
                });
            break;
        case 'tint':
            await sharp(url)
                .tint({ r: 255, g: 0, b: 0 })
                .toBuffer(function (err, buffer) {
                    fs.writeFile(url, buffer, function (e) {
                    })
                });
            //.toFile(url);
            break;
        default:
            console.log("Couldn't find method");
    }

    let newHistoryPost = {
        "status": "modified",
        "modification": method,
        "date": new Date().toISOString().split('T')[0]
    }

    photo.history.push(newHistoryPost)

    logger.info('Photo has been altered.')
    return photo
}


module.exports = { getPicData, modifyPhoto, getObj }