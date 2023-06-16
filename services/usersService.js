const mails = require('./mailsService');
const usersDAO = require('../dataAccess/usersDAO');
const logs = require('../dataAccess/logsDAO');
const enums = require('../utils/enums');

async function getMultiple(page = 1){
  const data = usersDAO.getMultiple(page);
  return data
}

async function get(userId){
  const data = usersDAO.get(userId);
  return data
}

async function create(user) {
    let hasError = true;
    let message = 'Error creating a user'; 
    try{ 
      const affectedRows = await usersDAO.insert(user); 
      if (affectedRows > 0) {
        message = 'User created successfully';
        hasError = false;
        mails.sendEmailCreatedUser(user);    
      }
    }
    catch (error) {
      logs.insert(error, enums.logsType.service);
    }

    return {message, hasError};
}

async function update(id, user){

    const affectedRows = usersDAO.update(id, user);  
    let message = 'Error updating a user';
  
    if (affectedRows > 0) {
      message = 'User updated successfully';
    }
  
    return {message};
}

async function recoverPassword(email){ 
  let hasError = true;
  if(email == null){
    message = 'Email required';
  }
  else{
    const user = await usersDAO.getByEmail(email); 
    if(user == null){
      message = 'Invalid email';
    }
    else{    
      mails.sendEmailPasswordRecovery(user);  
      message = 'Password sent succesfully';
      hasError= false;
    }   
  }
  return {message, hasError};
}

module.exports = {
  getMultiple,
  get,
  create,
  update,
  recoverPassword
}