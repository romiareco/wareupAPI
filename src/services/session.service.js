const clientsDAO = require('../dataAccess/clientsDAO');

class SessionService {
  constructor(userRepository, logRepository) {
    this.userRepository = userRepository;
    this.mailService = mailService;
  }

  async signup(sessionInfo){ 
    let hasError = true;
    if (sessionInfo.email == null) {
      message = 'Email required';
    }
    else {
      const client = await clientsDAO.getByEmail(email); 
      if(client == null){
        message = 'Invalid email';
      }
      else{    
        mails.sendEmailPasswordRecovery(client);  
        message = 'Password sent succesfully';
        hasError= false;
      }   
    }
    return {message, hasError};
  }
}

module.exports = SessionService;
