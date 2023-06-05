const fs = require("fs")
const logger = require('tracer').colorConsole();
const path = require('path');

class File {
    constructor(name, album, url) {
        this.id = fileArray.length + 1
        this.album = album
        this.originalName = name
        this.url = path.join(__dirname, 'userdata', album, name)
        this.lastChange = 'original'
        this.history = [
            {
                status: 'original',
                lastModifiedDate: '01-01-1970'
            }
        ]
        this.tags = [
        ]

        this.addToArray()
        this.changeDir(url)
    }

    addToArray() {
        fileArray.push(this)
    }

    changeDir(url) {
        fs.rename(url, this.url, (err, data) => {
            if (err) throw err
            else {
                logger.info('Photo has been uploaded successfuly');
            }
        })
    }
}

let fileArray = [
]

module.exports = { File, fileArray }