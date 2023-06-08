const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const logger = require('tracer').colorConsole();

class User {
    constructor(name, email, password) {
        this.id = userArray.length + 1
        this.name = name
        this.email = email
        this.password = this.encryptPassword(password)
        this.confirmed = false
        //tutaj tworzenie albumu
        
        if (this.whetherNameExists(name) != true) {
            this.addToArray()
            this.createAlbum(this.name)
        }
    }

    async encryptPassword(passwordText) {
        let encryptedPassword = await bcrypt.hash(passwordText, 10)
        return encryptedPassword
    }

    addToArray() {
        userArray.push(this)
    }

    createAlbum(name) {

    }

    whetherNameExists(name) {

    }
}

let userArray = []