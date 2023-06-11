const mails = require('./mailsService');
const clientsDAO = require('../dataAccess/clientsDAO');

async function getMultiple(page = 1){
  const data = clientsDAO.getMultiple(page);
  return data
}

async function get(clientId){
  const data = clientsDAO.get(clientId);
  return data
}

async function create(client) {
    let hasError = true;
    let message = 'Error creating a client'; 

    const affectedRows = clientsDAO.insert(client);

    if (affectedRows > 0) {
      message = 'Client created successfully';
      hasError = false;
      mails.sendEmailCreatedClient(client);    
    }

    return {message, hasError};
}

async function update(id, client){

    const affectedRows = clientsDAO.update(id, client);  
    let message = 'Error updating a client';
  
    if (affectedRows > 0) {
      message = 'Client updated successfully';
    }
  
    return {message};
}

async function recoverPassword(email){ 
  let hasError = true;
  if(email == null){
    message = 'Email required';
  }
  else{
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

module.exports = {
  getMultiple,
  get,
  create,
  update,
  recoverPassword
}