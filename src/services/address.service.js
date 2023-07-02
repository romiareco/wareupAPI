const enums = require('../utils/enums');
 
class AddressService {
  constructor(addressRepository, logRepository, companyRepository) {
    this.addressRepository = addressRepository;
    this.log = logRepository; 
    this.companyRepository = companyRepository;
  }

  async create(city, street, postalCode, phone, type, companyId) {
    let hasError = true;
    let message = 'Error creating address'; 
    let resultCode = enums.resultCodes.genericError;
    let address = null;
    try{ 
        const company = await this.companyRepository.getCompany(companyId);
        if(company == null){
          message = 'Invalid company'; 
          resultCode = enums.resultCodes.invalidUser;
          return {message, hasError, resultCode, address};
        }
        
        address = await this.addressRepository.create(city, street, postalCode, phone, type, companyId);
        
        if(address){
          message = 'Address created successfully';
          hasError = false;
          resultCode = enums.resultCodes.OK;   
        }             
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      this.log.create('Error in addressService - create: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, address };
  }

  async getAddressesByCompany(companyId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let addresses = null;

    try{ 
      addresses = await this.addressRepository.getAddressesByCompany(companyId); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las direcciones de la compania';

      this.log.create('Error in addressService - getAddressesByCompany: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, addresses };
  } 

  async getAddress(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let address = null;

    try{ 
      address = await this.addressRepository.getAddress(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo la direccion';

      this.log.create('Error in addressService - getAddress: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, address };
  } 
}

module.exports = AddressService;

