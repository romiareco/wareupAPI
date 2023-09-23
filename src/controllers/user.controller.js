class UserController {

    constructor(userService) {
      this.service = userService;
    }

    async register(req, res, next) {
      const { name, lastName, password, email } = req.body;

      if (!name || typeof name !== "string" || (!email || typeof email !== "string") 
        || (!lastName || typeof lastName !== "string") || (!password || typeof password !== "string")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.create(req.body);
      return res.status(200).json(result);
    }

    async update(req, res, next) {
      const { name, lastName, email } = req.body;
      const { id } = req.params;
  
      if (!id || !name || typeof name !== "string" || (!email || typeof email !== "string") 
        || (!lastName || typeof lastName !== "string")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      let user = req.body;
      user.id = id;
      const result = await this.service.update(user);
      return res.status(200).json(result);
    }

    async updatePassword(req, res, next) {

      const { linkEncrypt, password } = req.body; 
 
      if(!linkEncrypt || typeof linkEncrypt !== "string" || !password || typeof password !== "string") {
        return res.status(401).json({ message: "Invalid Params" });
      }
      const result = await this.service.updatePassword(linkEncrypt, password);
      return res.status(200).json(result);
    }

    async recoverPassword(req, res, next) {
      const { email } = req.body;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.service.recoverPassword(email);
      return res.status(200).json(result);
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
      const { status } = req.query;

      if(!status){
        const result = await this.service.getAll();
        return res.status(200).json(result);
      }
      else{ 
        const result = await this.service.getByStatus(status)
        return res.status(200).json(result);
      }
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

    async delete(req, res, next) {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Invalid Params" });
      }   
 
      const result = await this.service.delete(id);
      return res.status(200).json(result);
    }
}

module.exports = UserController;