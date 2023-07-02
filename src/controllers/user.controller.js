class UserController {

    constructor(userService) {
      this.userService = userService;
    }
  
    async register(req, res, next) {
      const { name, last_name, password, email } = req.body;
  
      if (!name || typeof name !== "string" || (!email || typeof email !== "string") 
        || (!last_name || typeof last_name !== "string") || (!password || typeof password !== "string")) {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.userService.create(name, last_name, password, email);
      return res.status(201).json(result);
    }

    async recoverPassword(req, res, next) {
      const { email } = req.body;
  
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Invalid Params" });
      }
      const result = await this.userService.recoverPassword(email);
      return res.status(201).json({data: result });
    }
  
    async getUser(req, res) {
      const { id } = req.params;
  
      const result = await this.userService.getUser(id);
      return res.json(result);
    }

    async getUsers(req, res) {
      const { id } = req.params;
  
      const result = await this.userService.getUsers();
      return res.json(result);
    }

    async getMe(req, res) {
      const { id } = req.user;
    
      const result = await this.userService.getUser(id); 
      if (!result) {
        res.status(400).send({ msg: "No se ha encontrado usuario" });
      } else {
        res.status(201).send(result);
      }
    }
    
}  

module.exports = UserController;
  