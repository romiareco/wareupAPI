const jwt = require("jsonwebtoken");
const config = require('../../config');

function createAccessToken(user) {
    const tokenExpirationDate = new Date();
    tokenExpirationDate.setHours(tokenExpirationDate.getHours + 3);

    const payload = {
        token_type : "access",
        user_id: user._id,
        iat: Date.now(),
        exp: tokenExpirationDate.getTime()
    };

    return jwt.sign(payload, config.jwtSecretToken);
}

function refreshToken(user) {
    const tokenExpirationDate = new Date();
    tokenExpirationDate.getMonth(tokenExpirationDate.getMonth + 1);

    const payload = {
        token_type : "access",
        user_id: user._id,
        iat: Date.now(),
        exp: tokenExpirationDate.getTime()
    };

    return jwt.sign(payload, config.jwtSecretToken);
}

//Devuelve datos del token decodificado
function decoded(token){
    return jwt.decode(token, config.jwtSecretToken, true);
}

module.exports = {
    createAccessToken,
    refreshToken,
    decoded,
}
