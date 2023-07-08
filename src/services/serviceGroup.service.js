const enums = require('../utils/enums');
 
class ServiceGroupService {
  constructor(serviceGroupRepository, logRepository) {
    this.serviceGroupRepository = serviceGroupRepository;
    this.log = logRepository;  
  }
   
  async getServiceGroups(){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let serviceGroups = null;

    try{ 
      serviceGroups =  await this.serviceGroupRepository.getServiceGroups();
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los service groups';

      this.log.create('Error in serviceGroupRepository - getServiceGroups: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, serviceGroups };
  }

  async getServiceGroup(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let serviceGroup = null;

    try{ 
      serviceGroup =  await this.serviceGroupRepository.getServiceGroup(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los service groups';

      this.log.create('Error in serviceGroupRepository - getServiceGroup: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, serviceGroup };
  }
}

module.exports = ServiceGroupService;

