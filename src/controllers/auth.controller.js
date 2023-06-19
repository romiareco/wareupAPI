const jwt = require("../utils/jwt");
const bcrypt = require("bcryptjs");

class AuthController {
    constructor(userService) {
        this.userService = userService;
      }

      async login(req, res) {
        const{email, password} = req.body;
    
        if(!email) res.status(400).send({msg: "El email es obligatorio"});
        if(!password) res.status(400).send({msg: "La contraseña es obligatoria"});
    
        const emailLowerCase = email.toLowerCase();        

        const userFound = await this.userService.getUserByEmail(emailLowerCase);

        if (!userFound) {
            res.status(404).send( {msg: "Email no existe"});
        } else {
            bcrypt.compare(password, userFound.password, (bcriptError, success) => {
                if(bcriptError) {
                    res.status(500).send({ msg: "Error del servidor"}); 
                } else if(!success) {
                    res.status(400).send({msg: "Contraseña incorrecta"});
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userFound),
                        refresh: jwt.refreshToken(userFound)
                    });
                }
            });
        }
    }

    async refreshAccessToken(req, res) {
        const { token } = req.body;

        if(!token) {
            res.status(400).send({msg: "Token requerido"});
        } else {
            const { id } = jwt.decoded(token);
        
            const userFound = await this.userService.getUser(id);
    
            if (userFound) {
                res.status(200).send({
                    accessToken: jwt.createAccessToken(userFound)
                })
            } else {
                res.status(500).send({msg: "Error del servidor al refrescar access token"});
            }
        }
    }
}

module.exports = AuthController;