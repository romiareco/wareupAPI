var enums = require('../utils/enums');

class DepositService {
  constructor(depositRepository, logRepository, companyRepository, depositServiceRepository, 
    depositImagesRepository, cityRepository){
    this.repository = depositRepository;
    this.log = logRepository;
    this.companyRepository = companyRepository;
    this.depositServiceRepository = depositServiceRepository;
    this.depositImagesRepository = depositImagesRepository;
    this.cityRepository = cityRepository;
  }
 

  async create(depositToAdd){
    var hasError = false;
    var message = null;
    var resultCode = enums.resultCodes.OK;
    var deposit = null;

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
          depositToAdd.userId = company.userId;

          var city = await this.cityRepository.get(depositToAdd.cityId); 
          depositToAdd.title = city.title + ' ' + depositToAdd.totalM3 + ' m3';

          deposit = await this.repository.create(depositToAdd);

          var depositId = deposit.id;
          if(!!depositToAdd.servicesId){
            depositToAdd.servicesId.forEach((serviceId) => {
              this.depositServiceRepository.create({depositId, serviceId});
           });
          }
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

  async update(depositToUpdate) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;

    try{  
        let depositInDb = await this.repository.get(depositToUpdate.id);
        if(depositInDb == null){
          message = 'El deposito no existe.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, deposit};
        }

        var city = await this.cityRepository.get(depositToUpdate.cityId); 
        depositInDb.title = city.title + ' ' + depositToUpdate.totalM3 + ' M3';
 
        depositInDb.status = depositToUpdate.status; 
        depositInDb.cityId = depositToUpdate.cityId; 
        depositInDb.description = depositToUpdate.description;
        depositInDb.totalM3 = depositToUpdate.totalM3;
        depositInDb.currency = depositToUpdate.currency;
        depositInDb.minimumBusinessPeriod = depositToUpdate.minimumBusinessPeriod;
        depositInDb.minimumBusinessVolume = depositToUpdate.minimumBusinessVolume;
        depositInDb.expectedPrice = depositToUpdate.expectedPrice;
     
        await this.repository.update(depositInDb);

        //Update services
        let depositId = depositToUpdate.id;
        if(!!depositToUpdate.servicesId){
          depositToUpdate.servicesId.forEach(async (serviceId) => {
            await this.depositServiceRepository.create({depositId, serviceId});
         });
        }

        if(!!depositInDb.depositServices){
          depositInDb.depositServices.forEach(async (depositService) => {
            if(!depositToUpdate.servicesId || !depositToUpdate.servicesId.find(s=>s == depositService.serviceId)){
              let serviceId = depositService.serviceId;
              await this.depositServiceRepository.delete({depositId, serviceId});
            }
         });
        }

        deposit = await this.repository.get(depositToUpdate.id);
    }
    catch (error) {
      message = 'Error al actualizar el deposito.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in update: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, deposit};
  }

  async getByUser(userId){
    var hasError = false;
    var message = null;
    var resultCode = enums.resultCodes.OK;
    var deposits = null;

    try{
      deposits = await this.repository.getByUser(userId);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los depositos del usuario';

      this.log.create('Error in getByUser: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, deposits };
  } 

  async getByCompany(companyId){
    var hasError = false;
    var message = null;
    var resultCode = enums.resultCodes.OK;
    var deposits = null;

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

  async getByFilter(filterOptions){
    var hasError = false;
    var message = null;
    var resultCode = enums.resultCodes.OK;
    var deposits = null;

    try{
      console.log(filterOptions);
      deposits = await this.repository.getByFilter(filterOptions);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los depositos de la compañia';

      this.log.create('Error in getByFilter: '+ error, enums.logsType.service);
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

  async addDepositImages(depositId, images) {
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let deposit = null;

    try{

      deposit = await this.repository.get(depositId);

      if(deposit == null){
        message = 'Deposito no valido';
        resultCode = enums.resultCodes.invalidData;
        hasError = true;
      }
      else{
        images.forEach(async image => {
           await this.depositImagesRepository.create({depositId, image});
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

  async getImagesByDeposit(depositId) {
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let depositImages = null;
    try{
      let deposit = await this.repository.get(depositId);
      if(deposit == null){
        message = 'Deposito no valido';
        resultCode = enums.resultCodes.invalidData;
        hasError = true;
      }
      else{
        depositImages = await this.depositImagesRepository.getByDeposit(depositId);
      }
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error consultando las imagenes del deposito.";
      this.log.create('Error in getImagesByDeposit: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, depositImages };
  }

  async delete(id) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;

    try{  
        let depositInDb = await this.repository.get(id);
        if(depositInDb == null){
          message = 'El deposito no existe.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, deposit};
        }   
        depositInDb.status = enums.depositStatus.DELETED;

        await this.repository.update(depositInDb);
        deposit = await this.repository.get(id);
    }
    catch (error) {
      message = 'Error al eliminar el deposito.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in delete: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, deposit};
  }

  async deleteByCompany(companyId) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let deposit = null;

    try{  
        let depositsInDb = await this.repository.getByCompany(companyId);
        depositsInDb.forEach(async depositInDb => {
          depositInDb.status =  enums.depositStatus.DELETED;
          await this.repository.update(depositInDb)
        });
    }
    catch (error) {
      message = 'Error al eliminar los depositos.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in delete: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, deposit};
  }
}

module.exports = DepositService;

