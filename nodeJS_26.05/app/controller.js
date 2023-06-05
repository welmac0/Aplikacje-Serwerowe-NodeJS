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

updatePhotoTags = (id, addedTags) => {
    fileArray[id - 1].tags.push(...addedTags)
    return fileArray[id - 1]
}

deletePhotoTags = (id) => {
    fileArray[id - 1].tags = []
    return fileArray[id - 1]
}

getPhotosOfUser = (user) => {
    result = fileArray.filter(obj => obj.album == user).map(obj => obj.id)
    return result
}

module.exports = { getPhotosOfUser, addPhoto, deletePhoto, getPhoto, getAllPhotos, updatePhotoTags, getArrayLength, isNull, getPhotoTags }