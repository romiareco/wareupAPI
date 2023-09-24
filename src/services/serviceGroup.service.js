const enums = require('../utils/enums');

class ServiceGroupService {
  constructor(serviceGroupRepository, logRepository) {
    this.repository = serviceGroupRepository;
    this.log = logRepository;
  }
   
  async getAll(){ 
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let serviceGroups = null;

    try{ 
      serviceGroups =  await this.repository.getAll();
      serviceGroups.sort((a,b) => a.order - b.order);
      serviceGroups.array.forEach(element => {
        element.services.sort((a,b) => a.order - b.order)
      });
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los service groups';

      this.log.create('Error in getAll: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, serviceGroups };
  }

  async get(id){ 
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let serviceGroup = null;

    try{
      serviceGroup =  await this.repository.get(id);
      serviceGroup.services.sort((a,b) => a.order - b.order);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los service groups ';
      this.log.create('Error in get: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, serviceGroup};
  }
}

module.exports = ServiceGroupService;

