const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async(password) => {
    return await bcrypt.hash(password, saltRounds)
}

const checkPasswordUser = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

const checkEmailUser = (users, email) => {
    return users.find(user => user.email === email)
}

module.exports = {
    hashPassword,
    checkPasswordUser,
    checkEmailUser
}


