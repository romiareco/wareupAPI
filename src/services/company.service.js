const enums = require('../utils/enums');
 
class CompanyService {
  constructor(companyRepository, logRepository, userRepository) {
    this.companyRepository = companyRepository;
    this.log = logRepository; 
    this.userRepository = userRepository;
  }

  async create(companyToAdd) {
    let hasError = true;
    let message = 'Error creando la compania'; 
    let resultCode = enums.resultCodes.genericError;
    let company = null;
    try{ 
       const {userId, RUT } = companyToAdd;  

        const user = await this.userRepository.getUser(userId);
        if(user == null){
          message = 'Usuario invalido'; 
          resultCode = enums.resultCodes.invalidData;
          return {message, hasError, resultCode};
        } 

        const companyByRut = await this.companyRepository.getCompanyByRUT(RUT);
        if(companyByRut != null){
          message = 'El RUT ya se encuentra registrado'; 
          resultCode = enums.resultCodes.genericError;
          return {message, hasError, resultCode};
        }  

        companyToAdd.status = enums.companyStatus.PENDING;

        let company = await this.companyRepository.create(companyToAdd);
        if(company){
          message = 'compania creada correctamente.';
          hasError = false;
          resultCode = enums.resultCodes.OK;   
        }            
        
        return { message, hasError, resultCode, company };
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      this.log.create('Error in companyService - create: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, company};
  }

  async getCompaniesByUser(userId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let companies = null;

    try{ 
      companies =  await this.companyRepository.getCompanyByUser(userId);
    }
      catch (error) {
        resultCode = enums.resultCodes.genericError;
        hasError = true;
        message = 'Ha ocurrido un error obteniendo las companias';
  
        this.log.create('Error in companyService - getCompaniesByUser: '+ error, enums.logsType.service);
      } 
  
      return { message, hasError, resultCode, companies };
  } 

  async getCompanies(){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let companies = null;

    try{ 
      companies =  await this.companyRepository.getCompanies();
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las companias';

      this.log.create('Error in companyService - getCompanies: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, companies };
  } 

  async getCompany(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let company = null;

    try{ 
      company = await this.companyRepository.getCompany(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo la compania';

      this.log.create('Error in companyService - getCompany: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, company };
  } 
}

module.exports = CompanyService;

