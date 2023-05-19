const { Tag, tagList, tagArray } = require('./tagsModel')

addTag = (name) => {
    let found = tagList.find(element => element == name)
    if (!found) {
        let tag = new Tag(name)
        return tag
    }
}

getAllTagsRaw = () => {
    return tagList
}

getAllTags = () => {
    return tagArray
}

getTag = (id) => {
    return tagArray[id - 1]
}


module.exports = { addTag, getAllTagsRaw, getAllTags, getTag }