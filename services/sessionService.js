const clientsDAO = require('../dataAccess/clientsDAO');


async function signup(sessionInfo){ 
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