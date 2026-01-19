const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = (payload) => {
    const token =jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token;
}

const hashGenerator = (password) => {
    const  hash=bcrypt.hashSync(password,10);
    return hash;
}
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}
module.exports = {generateToken, hashGenerator, comparePassword};