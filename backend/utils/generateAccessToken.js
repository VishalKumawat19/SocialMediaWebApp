const jwt = require('jsonwebtoken')

const generateAccessToken = (id) =>{
    const accessToken = jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    return accessToken;
}

module.exports = generateAccessToken