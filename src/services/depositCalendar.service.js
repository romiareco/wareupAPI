var enums = require('../utils/enums');

class DepositCalendarService {
  constructor(depositCalendarRepository, logRepository, depositRepository){
    this.repository = depositCalendarRepository;
    this.log = logRepository;
    this.depositRepository=depositRepository;
  }
 

  async create(depositCalendarToAdd){
    var hasError = false;
    var message = null;
    var resultCode = enums.resultCodes.OK;
    var depositCalendar = null;

    try{
        const { depositId } = depositCalendarToAdd;
        const deposit = await this.depositRepository.get(depositId);
        if(deposit == null){
          message = 'Deposito no valida';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
        }
        else{
          var currentCalendars = await this.repository.getByDeposit(depositId);

          var sameRangeCalendars = currentCalendars.filter(c =>
            (new Date(depositCalendarToAdd.dateFrom).getTime() >= new Date(c.dateFrom).getTime() && new Date(depositCalendarToAdd.dateFrom).getTime() <= new Date(c.dateTo).getTime())
            || (new Date(depositCalendarToAdd.dateTo).getTime() >= new Date(c.dateFrom).getTime() && new Date(depositCalendarToAdd.dateTo).getTime() <= new Date(c.dateTo).getTime()));

          if(sameRangeCalendars != null && sameRangeCalendars.length > 0){
            message = 'Ya hay un calendario existente';
            resultCode = enums.resultCodes.invalidData;
            hasError = true;
          }
          else{
            depositCalendarToAdd.isDeleted=false;
            depositCalendar = await this.repository.create(depositCalendarToAdd);
          }
        }
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error creando el calendario de deposito.";
      this.log.create('Error in create: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, depositCalendar };
  }

  async update(depositCalendarToUpdate) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let depositCalendar = null;

    try{  
        let depositCalendarInDb = await this.repository.get(depositCalendarToUpdate.id);
        if(depositCalendarInDb == null){
          message = 'El calendario de deposito no existe.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, depositCalendar};
        }
        depositCalendarInDb.dateFrom = depositCalendarToUpdate.dateFrom; 
        depositCalendarInDb.dateTo = depositCalendarToUpdate.dateTo; 
        depositCalendarInDb.totalM3 = depositCalendarToUpdate.totalM3
        depositCalendarInDb.isDeleted = depositCalendarToUpdate.isDeleted;
      
        await this.repository.update(depositCalendarInDb);

        depositCalendar = await this.repository.get(depositCalendarInDb.id);
    }
    catch (error) {
      message = 'Error al actualizar el calendario del deposito.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in update: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, depositCalendar};
  }

  async get(id) {
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let depositCalendar = null;

    try{
      depositCalendar = await this.repository.get(id);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error consultando el calendario del deposito.";
      this.log.create('Error in get: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, depositCalendar };
  }

  async getByDeposit(depositId) {
    let hasError = false;
    let message = null;
    let resultCode = enums.resultCodes.OK;
    let depositCalendars = null;

    try{
      depositCalendars = await this.repository.getByDeposit(depositId);
    }
    catch (error) {
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      message = "Error consultando los calendarios del deposito.";
      this.log.create('Error in getByDeposit: '+ error, enums.logsType.service);
    }

    return { message, hasError, resultCode, depositCalendars };
  }

  async delete(id) {
    let hasError = false;
    let message = null; 
    let resultCode = enums.resultCodes.OK;
    let depositCalendar = null;

    try{  
        let depositCalendarInDb = await this.repository.get(id);
        if(depositCalendarInDb == null){
          message = 'El calendario del deposito no existe.';
          resultCode = enums.resultCodes.invalidData;
          hasError = true;
          return {message, hasError, resultCode, depositCalendar};
        }   
        depositCalendarInDb.isDeleted = true;

        await this.repository.update(depositCalendarInDb);
        depositCalendar = await this.repository.get(id);
    }
    catch (error) {
      message = 'Error al eliminar el calendario del deposito.';
      resultCode = enums.resultCodes.genericError;
      hasError = true;
      this.log.create('Error in delete: '+ error, enums.logsType.service);
    }

    return {message, hasError, resultCode, depositCalendar};
  }
}

module.exports = DepositCalendarService;

