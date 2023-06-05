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

getArrayLength = () => {
    return fileArray.length
}

getPhotoTags = (id) => {
    return fileArray[id - 1].tags
}

updatePhotoTags = (id, tags) => {
    fileArray[id - 1].tags.push(tags)
    return fileArray[id - 1]
}

module.exports = { addPhoto, deletePhoto, getPhoto, getAllPhotos, updatePhotoTags, getArrayLength, isNull, getPhotoTags }