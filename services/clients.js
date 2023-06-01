const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, last_name, user_name, password, email, status, display_name
    FROM clients LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(client){
    const result = await db.query(
      `INSERT INTO clients 
      (name, last_name, user_name, password, status, email, display_name, created_date) 
      VALUES 
      (${client.name}, ${client.last_name}, ${client.user_name}, ${client.password}, ${client.status}, ${client.email}, 
        ${client.display_name}, ${client.created_date})`
    );
  
    let message = 'Error in creating a client';
  
    if (result.affectedRows) {
      message = 'Client created successfully';
    }
  
    return {message};
}

async function update(id, client){
    const result = await db.query(
      `UPDATE client 
        SET name="${client.name}", last_name=${client.last_name}, user_name=${client.user_name}, 
        password=${client.password}, status=${client.status} , email=${client.email} , display_name=${client.display_name}
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