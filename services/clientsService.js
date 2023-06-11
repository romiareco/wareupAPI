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

module.exports = {
  getMultiple,
  get,
  create,
  update,
}