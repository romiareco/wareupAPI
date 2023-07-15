const enums = require('../utils/enums'); 
const bcrypt = require("bcryptjs")

class UserService {
  constructor(userRepository, logRepository, mailService) {
    this.repository = userRepository;
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

        const userByEmail = await this.repository.getByEmail(email);
        if(userByEmail != null){
          message = 'El email ya se encuentra en uso.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, user};
        }
 
        const salt = bcrypt.genSaltSync(10);
        userToAdd.password = bcrypt.hashSync(userToAdd.password, salt);
        userToAdd.email = userToAdd.email.toLowerCase()
         
        user = await this.repository.create(userToAdd);
        if(user){  
          this.mailService.sendEmailUserCreated(email);    
        }            
    }
    catch (error) {
      message = 'Error al crear el usuario.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in create: '+ error, enums.logsType.service);
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
  
    const user = await this.repository.getByEmail(email); 
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

  async contact(contactForm){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;

    const { email, phone } = contactForm;
    if(email == null){
      message = 'El email es requerido.';
      hasError = true;
      resultCode = enums.resultCodes.requiredData;
    }
    else if(phone == null){
      message = 'El telefono  es requerido.';
      hasError = true;
      resultCode = enums.resultCodes.requiredData;
    }
     
    this.mailService.sendContactForm(contactForm);  
      
    return {message, hasError, resultCode};
  }

  async getByEmail(email) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{
      user = await this.repository.getByEmail(email);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el usuario.';

      this.log.create('Error in getByEmail: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, user };
  }
  
  async get(id) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{
      user = await this.repository.get(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el usuario.';

      this.log.create('Error in get: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, user };
  }

  async getAll() {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let users = null;

    try{
      users = await this.repository.getAll();
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los usuarios.';

      this.log.create('Error in getAll: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, users };
  }
}

module.exports = UserService;

