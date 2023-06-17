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
      const user = await this.userService.create(name, last_name, password, email);
      return res.status(201).json({data: user });
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
  
      const user = await this.userService.getUser(id);
      return res.json({
        data: user
      });
    }

    async getUsers(req, res) {
      const { id } = req.params;
  
      const users = await this.userService.getUsers();
      return res.json({
        data: users
      });
    }
}  
module.exports = UserController;
  