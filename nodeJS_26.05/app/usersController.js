const { User, userArray } = require('./usersModel')
const logger = require('tracer').colorConsole();
const bcrypt = require('bcryptjs');
const { createToken, verifyToken } = require('./createJWT')

registerUser = async (name, mail, password) => {
    let user = new User(name, mail, password)
    return user.message.then((message) => {
        logger.info('User has been created')
        return message
    })
}

checkIfActivatedInTime = async (token) => {
    let result = await verifyToken(token)
    if (result.success) {
        let id = result.success.id
        userArray[id - 1].confirmed = true
        delete userArray[id - 1].message
        logger.info('User has been actviated')
        return userArray[id - 1]
    } else {
        logger.info('User\'s token is not valid anymore')
        return result.error
    }
}

listAll = () => {
    return userArray
}

authorizeCredentials = async (mail, password) => {
    let foundUser = userArray.find(user => user.email == mail)
    if (foundUser) {
        let result = await decryptPass(password, foundUser.password)
        if (result == true) {
            let token = await createToken(foundUser.email, foundUser.id)
            return token
        }
    }
}

const decryptPass = async (userpass, encrypted) => {
    let decrypted = await bcrypt.compare(userpass, encrypted)
    return decrypted
}

module.exports = { registerUser, checkIfActivatedInTime, listAll, authorizeCredentials }