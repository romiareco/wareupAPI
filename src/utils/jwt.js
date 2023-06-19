const jwt = require("jsonwebtoken");
const {JWT_SECRET_TOKEN} = require("../../constants");

function createAccessToken(user) {
    const tokenExpirationDate = new Date();
    tokenExpirationDate.setHours(tokenExpirationDate.getHours() + 3);

    const payload = {
        token_type : "access",
        user_id: user.id,
        iat: Date.now(),
        exp: tokenExpirationDate.getTime()
    };

    return jwt.sign(payload, JWT_SECRET_TOKEN);
}

function refreshToken(user) {
    const tokenExpirationDate = new Date();
    tokenExpirationDate.getMonth(tokenExpirationDate.getMonth + 1);

    const payload = {
        token_type : "access",
        user_id: user.id,
        iat: Date.now(),
        exp: tokenExpirationDate.getTime()
    };

    return jwt.sign(payload, JWT_SECRET_TOKEN);
}

//Devuelve datos del token decodificado
function decoded(token){
    return jwt.decode(token, JWT_SECRET_TOKEN, true);
}

module.exports = {
    createAccessToken,
    refreshToken,
    decoded,
}
