const jwt = require('jsonwebtoken');
require('dotenv').config();
//proccess.env.JWT_KEY

const createToken = async (mail, id) => {
    console.log(`JWT mail: ${mail}`)
    console.log(`JWT id: ${id}`);
    let token = await jwt.sign(
        {
            email: mail,
            id: id
        },
        process.env.JWT_KEY,
        {
            expiresIn: "24h"
        }
    )
    return token
}

const verifyToken = async (token) => {
    try {
        let decoded = await jwt.verify(token, process.env.JWT_KEY)
        return {success: decoded}
    }
    catch (ex) {
        return { error: ex.message }
    }
}

module.exports = { createToken, verifyToken }