
const helper = require('../utils/helper');
const config = require('../config');
const db = require('./db');

async function insert(client){

    const result = await db.query(
      `INSERT INTO clients 
      (name, last_name, password, email, status) 
      VALUES ('${client.name}', '${client.lastname}', '${client.password}', '${client.email}', 1)` //TODO: cambiar a enumerado o constante...
    ); 
   
    return result.affectedRows;
}

async function update(id, client){
    const result = await db.query(
      `UPDATE clients 
        SET name="${client.name}", last_name=${client.last_name},  
        password=${client.password}, status=${client.status} , email=${client.email}
        WHERE id=${id}` 
    );
  
    return result.affectedRows;
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM clients WHERE id=${id}`
    );

    return result.affectedRows;
}  

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT id, name, last_name,  password, email, status
      FROM clients LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    return data
}

async function get(clientId){
    const row = await db.query(
      `SELECT id, name, last_name,  password, email, status
      FROM clients WHERE id=${clientId}`
    );
    const data = row;
    return data
}

module.exports = {
  getMultiple,
  get,
  insert,
  update,
  remove
}