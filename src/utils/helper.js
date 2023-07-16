function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}


 

function encrypt(text){
  var crypto = require('crypto');
  var cipher = crypto.createCipher('aes-256-cbc', "mySecretKey")
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;  
}

function decrypt(text){ 
   var crypto = require('crypto');
   var decipher = crypto.createDecipher('aes-256-cbc',"mySecretKey")
   var dec = decipher.update(text,'hex','utf8') 
   dec += decipher.final('utf8');
   return dec;  
}

module.exports = {
    getOffset,
    emptyOrRows,
    encrypt,
    decrypt
}