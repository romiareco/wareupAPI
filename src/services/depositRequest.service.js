const enums = require('../utils/enums');
 
class DepositRequestService {
  constructor(depositRequestRepository, logRepository, companyRepository) {
    this.repository = depositRequestRepository;
    this.log = logRepository; 
    this.companyRepository = companyRepository;
  }

  async create(depositRequestToAdd) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let depositRequest = null;
    
    try{ 
      
      console.log('asdadsadss');
        const { companyId } = depositRequestToAdd;  
        const company = await this.companyRepository.get(companyId);
        if(company == null){
          message = 'Compania no valida'; 
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
        }
        else{
          depositRequestToAdd.status = enums.depositRequestStatus.PENDING;
          depositRequest = await this.repository.create(depositRequestToAdd);   
        }  
        
        console.log(depositRequest);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error creando la solicitud de ingreso de deposito.";
      this.log.create('Error in create: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, depositRequest };
  }

  async update(depositRequestToUpdate) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let depositRequest = null;
    
    try{ 
      
        const { companyId } = depositRequestToUpdate;  
        const company = await this.companyRepository.get(companyId);
        if(company == null){
          message = 'Compania no valida'; 
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
        }
        else{ 
          depositRequest = await this.repository.update(depositRequestToUpdate);   
        }      
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error actualizando la solicitud de ingreso de deposito.";
      this.log.create('Error in update: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, depositRequest };
  }

  async getByCompany(companyId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let depositRequests = null;

    try{ 
      depositRequests = await this.repository.getByCompany(companyId); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las solicitudes de depositos de la compania';

      this.log.create('Error in getByCompany: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, depositRequests };
  } 

  async getAll(){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let depositRequests = null;

    try{ 
      depositRequests = await this.repository.getAll(); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las solicitudes de depositos';

      this.log.create('Error in getAll: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, depositRequests };
  } 

  async get(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let depositRequest = null;

    try{ 
      depositRequest = await this.repository.get(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo la solicitud de deposito';

      this.log.create('Error in get: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, depositRequest };
  } 
}

module.exports = DepositRequestService;

