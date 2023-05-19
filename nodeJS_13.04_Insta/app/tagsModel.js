class Tag {
    constructor(name) {
        this.id = tagArray.length + 1
        this.popularity = 0
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

starter()

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
    for (let i = 0; i < tagList.length; i++) {
        let newTag = new Tag(tagList[i])
    }
    console.log(console.log(tagArray));
}

let tagArray = []

module.exports = { Tag, tagList, tagArray }