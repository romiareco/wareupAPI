const helper = require('../utils/helper');
const config = require('../config');
const mails = require('./mailsService');
const clientStatus = require('../utils/enums');
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
    let message = 'Error in creating a client'; 

    const affectedRows = clientsDAO.insert(client);

    if (affectedRows) {
      message = 'Client created successfully';
      hasError = false;
      mails.sendEmailCreatedClient(client);    
    }

    return {message, hasError};
}

async function update(id, client){

    const affectedRows = clientsDAO.update(id, client);  
    let message = 'Error in updating clients';
  
    if (affectedRows) {
      message = 'Clients updated successfully';
    }
  
    return {message};
}

module.exports = {
  getMultiple,
  get,
  create,
  update,
}