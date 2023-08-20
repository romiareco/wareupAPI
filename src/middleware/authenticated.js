const jwt = require("../utils/jwt")
 
function validateAuth(req, res, next) {
    if(!req.headers.authorization || req.headers.authorization == null) {
        res.status(402).send({msg: "Usuario no autorizado"});
    }
   
    const token = req.headers.authorization.replace("Bearer ", "").trim();
    try {
        const payload = jwt.decoded(token);
        const { exp } = payload;
        const currentDate = new Date().getDate();

        if (exp <= currentDate) {
            return res.status(400).send({msg: "Token expirado."});
        }

        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send({msg: "Token inválido"});
    }
}

module.exports = {
    validateAuth
}