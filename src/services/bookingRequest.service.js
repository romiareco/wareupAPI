const enums = require('../utils/enums');
 
class BookingRequestService {
  constructor(bookingRequestRepository, logRepository) {
    this.repository = bookingRequestRepository;
    this.log = logRepository; 
  }

  async create(bookingRequestToAdd) {
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let bookingRequest = null;
    
    try{ 
      bookingRequestToAdd.status = enums.depositRequestStatus.PENDING;
      bookingRequest = await this.repository.create(bookingRequestToAdd)

      //send email
      
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error creando la solicitud de booking.";
      this.log.create('Error in create: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, bookingRequest };
  }

  async update(bookingRequestToUpdate) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let bookingRequest = null;

    try{ 
        const bookingRequestDb = await this.repository.get(bookingRequestToUpdate.id);
        if(bookingRequestDb == null){
          message = 'Id no valido'; 
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
        }
        else{
          bookingRequestDb.status = bookingRequestToUpdate.status;
          await this.repository.update(bookingRequestDb);
          bookingRequest = await this.repository.get(bookingRequestDb.id);
        }
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error actualizando la solicitud de booking.";
      this.log.create('Error in update: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, bookingRequest };
  }



  async getByUser(userId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let bookingRequests = null;

    try{ 
      bookingRequests = await this.repository.getByUser(userId);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las solicitudes de booking del usuario';

      this.log.create('Error in getByUser: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, bookingRequests };
  } 

  async getByDeposit(depositId){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let bookingRequests = null;

    try{ 
      bookingRequests = await this.repository.getByDeposit(depositId);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las solicitudes de booking del deposito';

      this.log.create('Error in getByDeposit: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, bookingRequests };
  } 

  async getAll(){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let bookingRequests = null;

    try{ 
      bookingRequests = await this.repository.getAll(); 
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo las solicitudes de booking';

      this.log.create('Error in getAll: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, bookingRequests };
  } 

  async get(id){ 
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let bookingRequest = null;

    try{ 
      bookingRequest = await this.repository.get(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = 'Ha ocurrido un error obteniendo la solicitud de booking';

      this.log.create('Error in get: '+ error, enums.logsType.service);
    } 

    return { message, hasError, resultCode, bookingRequest };
  } 
}

module.exports = BookingRequestService;

