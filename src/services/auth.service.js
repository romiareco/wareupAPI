const enums = require('../utils/enums');
const jwt = require("../utils/jwt");
const bcrypt = require("bcryptjs");

class AuthService {
  constructor(userRepository, logRepository) {
    this.userRepository = userRepository;
    this.log = logRepository; 
  }
   
  
  async compareAsync(param1, param2) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(param1, param2, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
  }


  async login(email, password) {
   
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let tokens = null;
    let user = null;

    if(!email || !password){
      message = 'Los datos son requeridos.';
      hasError = true;
      resultCode = enums.resultCodes.requiredValue; 
      return {message, hasError, resultCode, tokens};
    }

    let userFound = await this.userRepository.getByEmail(email); 
    if (!userFound) {
      message = 'El email no es valido.';
      hasError = true;
      resultCode = enums.resultCodes.requiredValue; 
      return {message, hasError, resultCode, tokens}; 
    } 
    
    const success = await this.compareAsync(password, userFound.password);
    if(!success) { 
      message = 'Contraseña incorrecta.';
      hasError = true;    
      console.log(message);
    } else { 
      tokens = {
          access: jwt.createAccessToken(userFound),
          refresh: jwt.refreshToken(userFound)
      }; 
    } 
      
    return {message, hasError, resultCode, tokens};
}


async refreshAccessToken(token){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let accessToken = null;

    if(!token){
      message = 'El token es requerido.';
      hasError = true;
      resultCode = enums.resultCodes.requiredValue;

      return {message, hasError, resultCode, accessToken};
    }
  
    const { id } = jwt.decoded(token);  
    const userFound = await this.userService.get(id); 
    if (userFound == null) {
      message = 'El token no es valido.';
      hasError = true;
      resultCode = enums.resultCodes.invavlidValue; 
    } 
    else{  
      accessToken = jwt.createAccessToken(userFound)
      message = ' ';
      hasError = false;
      resultCode = enums.resultCodes.OK;
    } 
         
    return {message, hasError, resultCode, accessToken};
  } 
}

module.exports = AuthService;

