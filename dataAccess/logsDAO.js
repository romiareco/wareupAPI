
const helper = require('../utils/helper');
const config = require('../config');
const db = require('./db');

async function insert(error, type){

  try {

    if(config.mode == 'dev'){
      console.log(error);
    }
    
    const result = await db.query(
      `INSERT INTO logs 
      (description, type) 
      VALUES ("${error}", '${type}')` 
    ); 
   
    return result.affectedRows;
  }
  catch (error) {
    console.error(error);
  }
} 

module.exports = {
  insert
}