const enums = require('../utils/enums');
 
class CommonService {
  constructor(departmentRepository, cityRepository, logRepository) {
    this.departmentRepository = departmentRepository;
    this.cityRepository = cityRepository;
    this.log = logRepository;  
  }  

  async getDepartments(){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let departments = null;

    try{ 
      departments = await this.departmentRepository.getAll(); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo los departamentos';

      this.log.create('Error in getAllDepartments: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, departments };
  } 

  async getDepartment(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let department = null;

    try{ 
      department = await this.departmentRepository.get(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo el departamento';

      this.log.create('Error in getDepartment: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, department };
  }  

  async getCitiesByDepartment(departmentId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let cities = null;

    try{ 
      cities = await this.cityRepository.getByDepartment(departmentId); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las ciudades.';

      this.log.create('Error in getCitiesByDepartment: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, cities };
  } 
}

module.exports = CommonService;

