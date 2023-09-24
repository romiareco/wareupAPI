
class BookingRequestController {

    constructor(bookingRequestService) {
      this.service = bookingRequestService;
    }
  
    async register(req, res, next) {
  
      const { userId, depositId} = req.body;
   
      if ( (!userId || typeof userId !== "number")
        || (!depositId || typeof depositId !== "number")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);
      return res.status(200).json(result);
    }

    async update(req, res, next) {
  
      const { status } = req.body;
      const { id } = req.params;

      if (!status || typeof status !== "number" ) {
        return res.status(400).json({ message: "Invalid Params" });
      }

      const depositRequest = req.body;
      depositRequest.id = id;

      const result = await this.service.update(depositRequest);
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

    async getByUser(req, res, next) {
      const { userId } = req.params; 
      if (!userId) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.getByUser(userId);
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
    
    async getAll(req, res, next) { 
      const result = await this.service.getAll();
      return res.status(200).json(result);
    }  
}  

module.exports = BookingRequestController;
  