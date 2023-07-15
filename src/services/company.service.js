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
       const {userId, RUT } = companyToAdd;  

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

        companyToAdd.status = enums.companyStatus.PENDING; 
        await this.repository.create(companyToAdd); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      this.log.create('Error in create: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, company};
  }

  async getByUser(userId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let companies = null;

    try{ 
      companies =  await this.repository.getByUser(userId);
    }
      catch (error) {
        resultCode = enums.resultCodes.genericError;
        hasError = true;
        message = 'Ha ocurrido un error obteniendo las companias';
  
        this.log.create('Error in getByUser: '+ error, enums.logsType.service);
      } 
  
      return { message, hasError, resultCode, companies };
  } 

  async getAll(){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let companies = null;

    try{ 
      companies =  await this.repository.getAll();
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las companias';

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
      message = 'Ha ocurrido un error obteniendo la compania';

      this.log.create('Error in get: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, company };
  } 
}

module.exports = CompanyService;

