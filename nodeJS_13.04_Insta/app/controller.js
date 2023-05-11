const { File, fileArray } = require('./model')

addPhoto = (name, album, url) => {
    let file = new File(name, album, url)
    return file
}

deletePhoto = (id) => {
    delete fileArray[id - 1]
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

module.exports = { addPhoto, deletePhoto, getPhoto, getAllPhotos, updatePhoto, getArrayLength }