const enums = require('../utils/enums');
 
class UserService {
  constructor(userRepository, logRepository, mailService) {
    this.userRepository = userRepository;
    this.log = logRepository;
    this.mailService = mailService;
  }

  async create(name, last_name, password, email) {
    let hasError = true;
    let message = null; 
    let resultCode = enums.resultCodes.genericError;
    let user = null;

    try{ 

        const userByEmail = await this.userRepository.getUserByEmail(email);
        if(userByEmail != null){
          message = 'El email ya se encuentra en uso.'; 
          return {message, hasError, resultCode, user};
        }
         
        user = await this.userRepository.create(name, last_name, password, email);
        if(user){
          message = 'El usuario se creo correctamente.';
          hasError = false;
          this.mailService.sendEmailUserCreated(email);    
        }            
    }
    catch (error) {
      message = 'Error al crear el usuario.';
      this.log.create('Error in userService - create: '+ error, enums.logsType.service);
    }
 
    return {message, hasError, resultCode, user};
  }

  
  async recoverPassword(email){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;

    if(email == null){
      message = 'El email es requerido.';
      hasError = true;
      resultCode = enums.resultCodes.requiredEmail;

      return {message, hasError, resultCode};
    }
  
    const user = await this.userRepository.getUserByEmail(email); 
    if(user == null){
      message = 'El email no es valido.';
      hasError = true;
      resultCode = enums.resultCodes.invaylidEmail; 
    }
    else{
      this.mailService.sendEmailPasswordRecovery(user);  
      message = 'Contrasena enviada correctamente.';
      hasError = false;
      resultCode = enums.resultCodes.OK;
    } 
         
    return {message, hasError, resultCode};
  }

  getUserByEmail(email) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{
      user = this.userRepository.getUserByEmail(email);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el usuario.';

      this.log.create('Error in userService - getUserByEmail: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, user };
  }
  
  getUser(id) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{
      user =  this.userRepository.getUser(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el usuario.';

      this.log.create('Error in userService - getUser: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, user };
  }

  getUsers() {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let users = null;

    try{
      users = this.userRepository.getUsers();
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los usuarios.';

      this.log.create('Error in userService - getUsers: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, user };
  }
}

module.exports = UserService;

