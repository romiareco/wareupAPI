const enums = require('../utils/enums');

class DepositCalendarController {

    constructor(depositCalendarService) {
      this.service = depositCalendarService;
    }
  
    async register(req, res, next) {
  
      const { dateFrom,dateTo, totalM3, depositId } = req.body;
   
      if (!dateFrom || typeof dateFrom !== "string" || !dateTo || (typeof dateTo !== "string")
        || (!totalM3 || typeof totalM3 !== "number")
        || (!depositId || typeof depositId !== "number")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);
      return res.status(200).json(result);
    }

    async update(req, res, next) {
  
      const { dateFrom, dateTo, totalM3, isDeleted } = req.body;
      const { id } = req.params;

      if (!dateFrom || !dateTo || (!totalM3 || typeof totalM3 !== "number")) {
        return res.status(400).json({ message: "Invalid Params" });
      }

      let depositCalendar = req.body;
      depositCalendar.id = id;
      const result = await this.service.update(depositCalendar);
      return res.status(200).json(result);
    }

    async getByDeposit(req, res, next) {
      const { depositId } = req.params; 
      if (!depositId) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.getByDeposit(depositId);
      return res.status(200).json(result);
    }

    async get(req, res, next) {
  
      const { id } = req.params;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const result = await this.service.get(id);
      return res.status(200).json(result);
    }
}  

module.exports = DepositCalendarController;
  