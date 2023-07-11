const enums = require('../utils/enums');
 
class UserService {
  constructor(userRepository, logRepository, mailService) {
    this.userRepository = userRepository;
    this.log = logRepository;
    this.mailService = mailService;
  }

  async create(userToAdd) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{ 
        const { email } = userToAdd;  

        const userByEmail = await this.userRepository.getUserByEmail(email);
        if(userByEmail != null){
          message = 'El email ya se encuentra en uso.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, user};
        }
         
        user = await this.userRepository.create(userToAdd);
        if(user){  
          this.mailService.sendEmailUserCreated(email);    
        }            
    }
    catch (error) {
      message = 'Error al crear el usuario.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
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
      resultCode = enums.resultCodes.requiredData;

      return {message, hasError, resultCode};
    }
  
    const user = await this.userRepository.getUserByEmail(email); 
    if(user == null){
      message = 'El email no es valido.';
      hasError = true;
      resultCode = enums.resultCodes.invalidData; 
    }
    else{
      this.mailService.sendEmailPasswordRecovery(user);  
      message = 'Contrasena enviada correctamente.';
      hasError = false;
      resultCode = enums.resultCodes.OK;
    } 
         
    return {message, hasError, resultCode};
  }

  async getUserByEmail(email) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{
      user = await this.userRepository.getUserByEmail(email);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el usuario.';

      this.log.create('Error in userService - getUserByEmail: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, user };
  }
  
  async getUser(id) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{
      user = await this.userRepository.getUser(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el usuario.';

      this.log.create('Error in userService - getUser: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, user };
  }

  async getUsers() {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let users = null;

    try{
      users = await this.userRepository.getUsers();
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los usuarios.';

      this.log.create('Error in userService - getUsers: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, users };
  }
}

module.exports = UserService;

