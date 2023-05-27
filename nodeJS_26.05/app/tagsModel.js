const logger = require('tracer').colorConsole();

class Tag {
    constructor(name, popularity) {
        this.id = tagArray.length + 1
        if (popularity) {
            this.popularity = popularity
        } else {
            this.popularity = 0
        }
        this.name = name
        this.addToArray()
        this.addToList()
    }

    addToArray() {
        tagArray.push(this)
    }

    addToList() {
        tagList.push(this.name)
    }
}

let tagList = ["#love",
    "#instagood",
    "#fashion",
    "#photooftheday",
    "#art",
    "#photography",
    "#instagram",
    "#beautiful",
    "#picoftheday", "#nature", "#happy", "#cute", "#travel", "#style", "#followme", "#tbt", "#instadaily", "#repost", "#like4like", "#summer", "#beauty", "#fitness", "#food", "#selfie", "#me", "#instalike", "#girl", "#friends",
    "#fun"]

function starter() {
    for (let i = 0; i < 29; i++) {
        let newTag = new Tag(tagList[i])
    }
    logger.info('Default tags have been created');
}

let tagArray = []

module.exports = { Tag, tagList, tagArray, starter }