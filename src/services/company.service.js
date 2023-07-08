const enums = require('../utils/enums');
 
class CompanyService {
  constructor(companyRepository, logRepository, userRepository) {
    this.companyRepository = companyRepository;
    this.log = logRepository; 
    this.userRepository = userRepository;
  }

  async create(userId, RUT, name, businessName, email, phone, contactName, contactPhone, contactEmail, status) {
    let hasError = true;
    let message = 'Error creating company'; 
    let resultCode = enums.resultCodes.genericError;
    let company = null;
    
    try{ 
        const user = await this.userRepository.getUser(userId);
        if(user == null){
          message = 'Invalid user'; 
          resultCode = enums.resultCodes.invalidUser;
          return {message, hasError, resultCode};
        } 

        let company = await this.companyRepository.create(userId, RUT, name, businessName, email, phone, contactName, contactPhone, contactEmail, status);
        if(company){
          message = 'Company created successfully';
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

