

class AuthController {
    constructor(authService) {
        this.authService = authService;
      }

      async login(req, res) {
        const{email, password} = req.body;
    
        if(!email){
            return res.status(400).json({ message: "El email es obligatorio"});
        }
        if(!password){
            return res.status(400).json({ message: "La contraseña es obligatoria"});
        } 
    
        const result = await this.authService.login(email, password);
        return res.status(200).json(result); 
    }

    async refreshAccessToken(req, res) {
        const { token } = req.body; 
        if(!token) {
            return res.status(400).json({ message: "Invalid Params" });
        } else {
            const result = await this.authService.refreshAccessToken(token);
            return res.status(200).json(result); 
        }
    }
}

module.exports = AuthController;