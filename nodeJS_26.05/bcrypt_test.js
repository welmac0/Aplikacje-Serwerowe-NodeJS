const bcrypt = require('bcryptjs');

const pass = "moje tajne hasło"

const encryptPass = async (password) => {

    let encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword
}

const decryptPass = async (userpass, encrypted) => {

    let decrypted = await bcrypt.compare(userpass, encrypted)
    console.log(decrypted);

}

encryptPass(pass)
    .then(encryptedPassword => {
        decryptPass(pass, encryptedPassword)
    })