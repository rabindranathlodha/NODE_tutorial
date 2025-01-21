const jwt = require('jsonwebtoken')
const secret = "Rabindra@250704"

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret)
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('Invalid token', err);
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
};