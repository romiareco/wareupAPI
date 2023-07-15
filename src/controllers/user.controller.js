class UserController {

    constructor(userService) {
      this.service = userService;
    }
  
    async register(req, res, next) {
      const { name, last_name, password, email } = req.body;
  
      if (!name || typeof name !== "string" || (!email || typeof email !== "string") 
        || (!last_name || typeof last_name !== "string") || (!password || typeof password !== "string")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);
      return res.status(201).json(result);
    }

    async recoverPassword(req, res, next) {
      const { email } = req.body;
  
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.recoverPassword(email);
      return res.status(200).json({data: result });
    }
  
    async get(req, res) {
      const { id } = req.params;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.get(id);
      return res.status(200).json(result);
    }

    async getAll(req, res) {  
      const result = await this.service.getAll();
      return res.status(200).json(result);
    }

    async getMe(req, res) {
      const { id } = req.user;
 
      if (!id || typeof id !== "number") {
        return res.status(400).json({ message: "Invalid Params" });
      } else {  
        const result = await this.service.get(id); 
        return res.status(200).json(result); 
      }
    }

    async contact(req, res) {
      const { email, phone, message } = req.body;
 
      if (!email || typeof email !== "string"  || !phone || typeof phone !== "string"
          || !message || typeof message !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      } else {  
        const result = await this.service.contact(req.body); 
        return res.status(200).json(result); 
      }
    }

    
}  

module.exports = UserController;
  