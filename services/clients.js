const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, last_name,  password, email, status
    FROM clients LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  //const meta = {page};

  return data
}

async function create(client){
    let hasError = true;
    const result = await db.query(
      `INSERT INTO clients 
      (name, last_name, password, email, status) 
      VALUES ('${client.name}', '${client.lastname}', '${client.password}', '${client.email}', 1)`
    );
  
    let message = 'Error in creating a client';
    if (result.affectedRows) {
      message = 'Client created successfully';
      hasError = false;
    }

    return {message, hasError};
}

async function update(id, client){
    const result = await db.query(
      `UPDATE clients 
        SET name="${client.name}", last_name=${client.last_name},  
        password=${client.password}, status=${client.status} , email=${client.email}
        WHERE id=${id}` 
    );
  
    let message = 'Error in updating clients';
  
    if (result.affectedRows) {
      message = 'Clients updated successfully';
    }
  
    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM clients WHERE id=${id}`
    );
  
    let message = 'Error in deleting client';
  
    if (result.affectedRows) {
      message = 'Client deleted successfully';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  create,
  update,
  remove
}