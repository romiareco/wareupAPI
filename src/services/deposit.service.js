const enums = require('../utils/enums');

class DepositService {
  constructor(depositRepository, logRepository, companyRepository, depositServiceRepository, depositImagesRepository){
    this.repository = depositRepository;
    this.log = logRepository;
    this.companyRepository = companyRepository;
    this.depositServiceRepository = depositServiceRepository;
    this.depositImagesRepository = depositImagesRepository;
  }

  
  getDepositTitle(deposit) {
    var title = '';

    return title;
  }
  

  async create(depositToAdd){
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let deposit = null;

    try{
        const { companyId } = depositToAdd;
        const company = await this.companyRepository.get(companyId);
        if(company == null){
          message = 'Compañia no valida';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
        }
        else{
          depositToAdd.status = enums.depositStatus.PENDING;
          depositToAdd.title = getDepositTitle(depositToAdd);

          deposit = await this.repository.create(depositToAdd);

          const depositId = deposit.id;
          depositToAdd.servicesId.forEach(serviceId => {
            this.depositServiceRepository.create({depositId, serviceId});
         });
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
      message = 'Ha ocurrido un error obteniendo los depositos de la compañia';

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
      message = 'Ha ocurrido un error obteniendo los depositos de la compañia';

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
      message = 'Ha ocurrido un error obteniendo el depositO';

      this.log.create('Error in get: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, deposit };
  } 


  /*async addDepositServices(depositId, servicesId) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;
    
    try{ 
      
       deposit = this.repository.get(depositId);   
        
      if(deposit == null){
        message = 'Deposito no valido'; 
        resultCode = enums.resultCodes.invalidData;
        hasError = true;
      }
      else{ 
        servicesId.forEach(serviceId => {
           this.depositServiceRepository.create({depositId, serviceId});
        });
      }      
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error asociando los servicios al deposito.";
      this.log.create('Error in addDepositServices: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, deposit };
  }*/

  async addDepositImages(depositId, images) {
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let deposit = null;

    try{

      deposit = this.repository.get(depositId);

      if(deposit == null){
        message = 'Deposito no valido';
        resultCode = enums.resultCodes.invalidData;
        hasError = true;
      }
      else{
        images.forEach(image => {
           this.depositImagesRepository.create({depositId, image});
        });
      }
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error asociando las imagenes al deposito.";
      this.log.create('Error in addDepositImages: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, deposit };
  }

  async getServicesByDeposit(depositId) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let depositServices = null;
    
    try{  
      let deposit = await this.repository.get(depositId);   
      if(deposit == null){
        message = 'Deposito no valido'; 
        resultCode = enums.resultCodes.invalidData;
        hasError = true;
      }
      else{ 
        depositServices = await this.depositServiceRepository.getByDeposit(depositId);   
      }
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error consultando los servicios del deposito.";
      this.log.create('Error in getServicesByDeposit: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, depositServices };
  }
}

module.exports = DepositService;

