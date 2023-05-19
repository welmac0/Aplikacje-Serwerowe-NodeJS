const { File, fileArray } = require('./model')

addPhoto = (name, album, url) => {
    let file = new File(name, album, url)
    return file
}

deletePhoto = (id) => {
    delete fileArray[id - 1]
}

isNull = (id) => {
    if (fileArray[id - 1] == null) {
        return true
    } else {
        return false
    }
}

getPhoto = (id) => {
    return fileArray[id - 1]
}

getAllPhotos = () => {
    return fileArray
}

updatePhoto = () => {
    // * to narazie pomijamy bo nie wiadomo jakie parametry tu beda zmieniane
}

getArrayLength = () => {
    return fileArray.length
}

getPhotoTags = (id) => {
    return fileArray[id - 1].tags
}

module.exports = { addPhoto, deletePhoto, getPhoto, getAllPhotos, updatePhoto, getArrayLength, isNull, getPhotoTags }