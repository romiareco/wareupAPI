const enums = require('../utils/enums');
 
class CompanyService {
  constructor(companyRepository, logRepository, userRepository) {
    this.repository = companyRepository;
    this.log = logRepository; 
    this.userRepository = userRepository;
  }

  async create(companyToAdd) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let company = null;

    try{ 
       const { userId, RUT } = companyToAdd;  

        const user = await this.userRepository.get(userId);
        if(user == null){
          message = 'Usuario invalido'; 
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode};
        } 

        const companyByRut = await this.repository.getByRUT(RUT);
        if(companyByRut != null){
          message = 'El RUT ya se encuentra registrado'; 
          resultCode = enums.resultCodes.genericError;
          hasError = true;
          return {message, hasError, resultCode};
        }  

        companyToAdd.status = enums.companyStatus.ACTIVE; 
        company = await this.repository.create(companyToAdd); 
    }
    catch (error) {

      hasError = true;
      resultCode = enums.resultCodes.genericError;
      message = 'Ocurrio un error al intentar crear la compañia'
      this.log.create('Error in create: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, company};
  }

  async update(companyToUpdate) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let company = null;

    try{  
        let companyInDb = await this.repository.get(companyToUpdate.id);
        if(companyInDb == null){
          message = 'La compania no existe.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, company};
        } 
        companyInDb.email = companyToUpdate.email.toLowerCase();
        companyInDb.phone = companyToUpdate.phone; 
        companyInDb.status = companyToUpdate.status; 
        companyInDb.businessName = companyToUpdate.businessName; 
        companyInDb.contactName = companyToUpdate.contactName; 
        companyInDb.RUT = companyToUpdate.RUT; 
        companyInDb.position = companyToUpdate.position; 
        companyInDb.cityId = companyToUpdate.cityId; 
        companyInDb.address = companyToUpdate.address; 
        companyInDb.postalCode = companyToUpdate.postalCode; 

        await this.repository.update(companyInDb);
        company = await this.repository.get(companyToUpdate.id);
    }
    catch (error) {
      message = 'Error al actualizar la compania.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in update: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, company};
  }

  async delete(id) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let company = null;

    try{  
        let companyInDb = await this.repository.get(id);
        if(companyInDb == null){
          message = 'La compania no existe.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, company};
        }   
        companyInDb.status = enums.companyStatus.DELETED;

        await this.repository.update(companyInDb);
        company = await this.repository.get(id);
    }
    catch (error) {
      message = 'Error al eliminar la compania.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in delete: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, company};
  }

  async getByUser(userId, status){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let companies = null;

    try{ 
      companies =  await this.repository.getByUser(userId, status);
    }
      catch (error) {
        resultCode = enums.resultCodes.genericError;
        hasError = true;
        message = 'Ha ocurrido un error obteniendo las compañias';
  
        this.log.create('Error in getByUser: '+ error, enums.logsType.service);
      } 
  
      return { message, hasError, resultCode, companies };
  } 


  async getAll(status){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let companies = null;

    try{ 
        companies =  await this.repository.getAll(status);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las compañias';

      this.log.create('Error in getAll: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, companies };
  } 

  async get(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let company = null;

    try{ 
      company = await this.repository.get(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo la compañia';

      this.log.create('Error in get: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, company };
  } 
}

module.exports = CompanyService;

