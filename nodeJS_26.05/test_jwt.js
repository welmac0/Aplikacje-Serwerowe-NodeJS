const jwt = require('jsonwebtoken');
let token = ''
 
const createToken = async () => {
    token = await jwt.sign(
        {
            email: "aaa@test.com",
            anyData: "123"
        },
        "verysecretkey", // powinno być w .env
        {
            expiresIn: "1s" // "1m", "1d", "24h"
        }
    );
    console.log({ token: token });
}
 
const verifyToken = async (token) => {
 
    try {
        let decoded = await jwt.verify(token, "verysecretkey")
        console.log({ decoded: decoded });
    }
    catch (ex) {
        console.log('di[a');
        console.log({ message: ex.message });
    }
}
 
 
const processToken = async () => {
    await createToken()
    console.log('1');
    await new Promise(r => setTimeout(r, 3000));
    console.log('2');
    await verifyToken(token)
}
 
processToken()