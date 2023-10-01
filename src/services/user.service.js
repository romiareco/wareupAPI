const enums = require('../utils/enums'); 
const bcrypt = require("bcryptjs")
const helper = require("../utils/helper")

 
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

  async update(userToUpdate) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{  
        let userInDb = await this.repository.get(userToUpdate.id);
        if(userInDb == null){
          message = 'El usuario no existe.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, user};
        }

        userInDb.email = userToUpdate.email.toLowerCase();
        userInDb.name = userToUpdate.nam;
        userInDb.lastName = userToUpdate.lastName;
        userInDb.industry = userToUpdate.industry;

        await this.repository.update(userInDb);
        user = await this.repository.get(userToUpdate.id);
    }
    catch (error) {
      message = 'Error al actualizar el usuario.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in update: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, user};
  }

  async updatePassword(linkEncrypt, password) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{ 

      const values = helper.decrypt(linkEncrypt);
      const userId = values.split(" ")[0];
      const email = values.split(" ")[1];

      let userInDb = await this.repository.get(userId);       

      if(userInDb == null){
        message = 'El usuario no existe.';
        resultCode = enums.resultCodes.invalidData;
        hasError = true;
        return {message, hasError, resultCode, user};
      } else if(userInDb.email != email){
        message = 'La informacion no es valida.';
        resultCode = enums.resultCodes.invalidData;
        hasError = true;
        return {message, hasError, resultCode, user};
      }

      const salt = bcrypt.genSaltSync(10); 
      userInDb.password = bcrypt.hashSync(password, salt);

      await this.repository.update(userInDb);
      user = await this.repository.get(userId);
    }
    catch (error) {
      message = 'Error al actualizar la password del usuario.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in updatePassword: '+ error, enums.logsType.service);
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

    let user = await this.repository.getByEmail(email);
    if(user == null){
      message = 'El email no es valido.';
      hasError = true;
      resultCode = enums.resultCodes.invalidData; 
    }
    else{ 
      const linkEncrypt = helper.encrypt(user.id + " " + user.email );
      this.mailService.sendEmailPasswordRecovery(user, linkEncrypt);
      message = 'Mail enviado correctamente.';
      hasError = false;
      resultCode = enums.resultCodes.OK;
    } 
         
    return {message, hasError, resultCode};
  }

  async contact(contactForm){ 
   
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;

   try{
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
        
    } catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error.';

      this.log.create('Error in contact: '+ error, enums.logsType.service);
    }
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

  async getByStatus(status) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let users = null;

    try{
      users = await this.repository.getByStatus(status);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los usuarios.';

      this.log.create('Error in getActive: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, users };
  }

  async delete(id) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let user = null;

    try{  
        let userInDb = await this.repository.get(id);
        if(userInDb == null){
          message = 'El usuario no existe.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, user};
        }   
        userInDb.status = enums.userStatus.DELETED;

        await this.repository.update(userInDb);
        user = await this.repository.get(id);
    }
    catch (error) {
      message = 'Error al eliminar el usuario.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in delete: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, user};
  }
}

module.exports = UserService;

