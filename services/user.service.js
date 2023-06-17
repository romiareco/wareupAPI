const enums = require('../utils/enums');
 
class UserService {
  constructor(userRepository, logRepository, mailService) {
    this.userRepository = userRepository;
    this.log = logRepository;
    this.mailService = mailService;
  }

  async create(name, last_name, password, email) {
    let hasError = true;
    let message = 'Error creating a user'; 
    
    try{ 
        let userCreated = await this.userRepository.create(name, last_name, password, email);
        if(userCreated){
          message = 'User created successfully';
          hasError = false;
          this.mailService.sendEmailUserCreated(email);    
        }      
    }
    catch (error) {
      this.log.create('Error in userService - create: '+ error, enums.logsType.service);
    }

    return {message, hasError};
  }

  
  async recoverPassword(email){ 
    let hasError = true;
    if(email == null){
      message = 'Email required';
    }
    else{
      const user = await this.userRepository.getUserByEmail(email);
      if(user == null){
        message = 'Invalid email';
      }
      else{    
        this.mailService.sendEmailPasswordRecovery(user);  
        message = 'Password sent succesfully';
        hasError= false;
      }   
    }
    return {message, hasError};
  }

  getUser(id) {
    return this.userRepository.getUser(id);
  }

  getUsers(page = 1) {
    return this.userRepository.getUsers(page);
  }
}

module.exports = UserService;

