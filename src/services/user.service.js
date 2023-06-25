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

        const user = await this.userRepository.getUserByEmail(email);
        if(user != null){
          message = 'Email already in use'; 
          return {message, hasError};
        }
         
        let userWasCreated = await this.userRepository.create(name, last_name, password, email);
        if(userWasCreated){
          message = 'User created successfully';
          hasError = false;
          this.mailService.sendEmailUserCreated(email);    
        }            
        
        return {message, hasError};
    }
    catch (error) {
      this.log.create('Error in userService - create: '+ error, enums.logsType.service);
    }

    return {message, hasError};
  }

  
  async recoverPassword(email){ 
    let hasError = true;
    let message = 'Error int password recovery'; 

    if(email == null){
      message = 'Email required';
      return {message, hasError};
    }
  
    const user = await this.userRepository.getUserByEmail(email);
    if(user == null){
      message = 'Invalid email';
      return {message, hasError};
    }
      
    this.mailService.sendEmailPasswordRecovery(user);  
    message = 'Password sent successfully';
    hasError = false;
         
    return {message, hasError};
  }

  getUserByEmail(email) {
    return this.userRepository.getUserByEmail(email);
  }
  
  getUser(id) {
    return this.userRepository.getUser(id);
  }

  getUsers() {
    return this.userRepository.getUsers();
  }
}

module.exports = UserService;

