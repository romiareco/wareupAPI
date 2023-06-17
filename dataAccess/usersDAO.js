
const helper = require('../utils/helper');
const config = require('../config');
const logs = require('./logsDAO');
const db = require('./db');
const enums = require('../utils/enums');

async function insert(user) {

  try {
    const result = await db.query(
      `INSERT INTO users 
      (name, last_name, password, email, status, role) 
      VALUES ('${user.name}', '${user.lastname}', '${user.password}', '${user.email}',  
      '${enums.userStatus.active}',  '${enums.role.client}')` 
    ); 
   
    return result.affectedRows;
  }
  catch (error) {
    logs.insert('Error in usersDAO - insert: '+error, 1);
  }
}

async function update(id, user){
    const result = await db.query(
      `UPDATE users 
        SET name="${user.name}", last_name=${user.last_name},  
        password=${user.password}, status=${user.status} , email=${user.email}
        WHERE id=${id}` 
    );
  
    return result.affectedRows;
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM users WHERE id=${id}`
    );

    return result.affectedRows;
}  

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT id, name, last_name,  password, email, status
      FROM users LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    return data
}

async function get(userId){
    const row = await db.query(
      `SELECT id, name, last_name,  password, email, status
      FROM users WHERE id=${userId}`
    );
    const data = row;
    return data
}

async function getByEmail(email){
  const rows = await db.query(
    `SELECT id, name, last_name,  password, email, status
    FROM users WHERE email='${email}' LIMIT 1`
  ); 

  if(rows.length > 0){ 
    return rows[0];
  }
  return null;
}

module.exports = {
  getMultiple,
  get,
  getByEmail,
  insert,
  update,
  remove
}