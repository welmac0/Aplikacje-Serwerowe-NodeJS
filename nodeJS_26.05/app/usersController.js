const { User, userArray } = require('./usersModel')
const { createToken, verifyToken } = require('./createJWT')
const logger = require('tracer').colorConsole();

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

module.exports = {registerUser, checkIfActivatedInTime, listAll}