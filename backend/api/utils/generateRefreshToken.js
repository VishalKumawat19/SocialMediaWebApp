const jwt = require('jsonwebtoken')

const generateRefreshToken = (id) =>{
    const refreshToken = jwt.sign({id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
    return refreshToken;
}

module.exports = generateRefreshToken