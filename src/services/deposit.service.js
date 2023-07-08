const enums = require('../utils/enums');
 
class DepositService {
  constructor(depositRepository, logRepository, companyRepository) {
    this.depositRepository = depositRepository;
    this.log = logRepository; 
    this.companyRepository = companyRepository;
  }

  async create(depositToAdd) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;
    
    try{ 
      
        const {companyId } = depositToAdd;  
        const company = await this.companyRepository.getCompany(companyId);
        if(company == null){
          message = 'Compania no valida'; 
          resultCode = enums.resultCodes.invalidUser;
          hasError = true;
        }
        else{
          depositToAdd.status = enums.depositStatus.PENDING;
          deposit = await this.depositRepository.create(depositToAdd);   
        }      
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error creando el deposito.";
      this.log.create('Error in depositService - create: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, deposit };
  }

  async getDepositsByCompany(companyId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposits = null;

    try{ 
      deposits = await this.depositRepository.getDepositsByCompany(companyId); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los depositos de la compania';

      this.log.create('Error in depositService - getDepositsByCompany: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, deposits };
  } 

  async getDeposits(){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposits = null;

    try{ 
      deposits = await this.depositRepository.getDeposits(); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los depositos de la compania';

      this.log.create('Error in depositService - getDeposits: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, deposits };
  } 

  async getDeposit(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;

    try{ 
      deposit = await this.depositRepository.getDeposit(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el deposit';

      this.log.create('Error in depositService - getDeposit: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, deposit };
  } 
}

module.exports = DepositService;

