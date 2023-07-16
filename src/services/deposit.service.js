const enums = require('../utils/enums');
 
class DepositService {
  constructor(depositRepository, logRepository, companyRepository) {
    this.repository = depositRepository;
    this.log = logRepository; 
    this.companyRepository = companyRepository;
  }

  async create(depositToAdd) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;
    
    try{ 
      
        const { companyId } = depositToAdd;  
        const company = await this.companyRepository.get(companyId);
        if(company == null){
          message = 'Compania no valida'; 
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
        }
        else{
          depositToAdd.status = enums.depositStatus.PENDING;
          deposit = await this.repository.create(depositToAdd);   
        }      
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error creando el deposito.";
      this.log.create('Error in create: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, deposit };
  }

  async getByCompany(companyId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposits = null;

    try{ 
      deposits = await this.repository.getByCompany(companyId); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los depositos de la compania';

      this.log.create('Error in getByCompany: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, deposits };
  } 

  async getAll(){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposits = null;

    try{ 
      deposits = await this.repository.getAll(); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los depositos de la compania';

      this.log.create('Error in getAll: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, deposits };
  } 

  async get(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;

    try{ 
      deposit = await this.repository.get(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el deposit';

      this.log.create('Error in get: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, deposit };
  } 


  async addDepositServices(depositId, servicesId) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;
    
    try{ 
      
       deposit = this.repository.get(depositId);   
        
      if(deposit == null){
        message = 'Deposito no valida'; 
        resultCode = enums.resultCodes.invalidData;
        hasError = true;
      }
      else{
        //innsert depositId servicesId
  
      }      
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error asociando los servicios al deposito.";
      this.log.create('Error in create: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, deposit };
  }
}

module.exports = DepositService;

