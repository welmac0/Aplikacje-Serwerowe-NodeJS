const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const logger = require('tracer').colorConsole();
const { createToken, verifyToken } = require('./createJWT')

class User {
    constructor(name, email, password) {
        this.id = userArray.length + 1
        this.name = name
        this.email = email
        this.setPass(password)
        this.firstName = ''
        this.surname = ''
        this.description = ''

        this.confirmed = false
        if (this.whetherNameExists(name) != true) {
            this.message = new Promise(async (res) => {
                {
                    this.addToArray()
                    this.createAlbum(this.name)
                    await this.provideToken()
                    res(this.message)
                }
            })
        } else {
            this.message = new Promise(async (res) => {
                res(this.message = 'Takie konto juz istnieje')
            })
        }
    }

    setPass = async (password) => {
        this.password = await this.encryptPassword(password);
    };

    provideToken = async () => {
        let token = await createToken(this.email, this.id)
        this.message = `skopiuj poniższy link do przeglądarki http://localhost:4200/api/user/confirm/${token} w celu potwierdzenia konta\nUwaga: link jest ważny przez godzinę`
    }

    async encryptPassword(passwordText) {
        let encryptedPassword = await bcrypt.hash(passwordText, 10)
        return encryptedPassword
    }

    addToArray() {
        userArray.push(this)
    }

    createAlbum(name) {
        let url = path.join(__dirname, 'userdata', name)
        if (!fs.existsSync(url)) {
            fs.mkdir(url, (err) => {
                if (err) throw err
                console.log("jest");
            })
        }
    }

    whetherNameExists(name) {
        let found = userArray.find(element => element.name == name)
        if (found) {
            return true
        } else {
            return false
        }
    }
}

let userArray = []

module.exports = { User, userArray }