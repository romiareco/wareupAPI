const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const UserController = require("./user.controller");
const UserService = require("../services/user.service");
const UserRepository = require("../repositories/user.repository");

describe("UserController", function() {
  describe("register", function() {
    let status, json, res, userController, userService;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      userService = new UserService(userRepo);
    });
    it("should not register a user when name param is not provided", async function() {
      const req = { body: { email: 'Juan@email.com' } };

      await new UserController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });

    it("should not register a user when password param is not provided", async function() {
      const req = { body: { name:'Juan', email: 'Juan@email.com' } };

      await new UserController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });

    it("should not register a user when lastname param is not provided", async function() {
      const req = { body: { name:'Juan', email: 'Juan@email.com', passowrd:'Pass123' } };

      await new UserController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });

    it("should not register a user when email param is not provided", async function() {
      const req = { body: { name: 'Juan' } };

      await new UserController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });

    it("should not register a user when params are not provided", async function() {
      const req = { body: {} };

      await new UserController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });

   
    it("should register a user when email, password, lastname and name params are provided", async function() {
      const req = {
        body: { name: 'Juan', lastName: 'Perez', password: 'Pass123', email: 'Juan@email.com' }
      };

      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        lastName: 'Perez',
        status: 2,
        role: 2
      };
      const stub = sinon.stub(userService, "create").returns(stubValue);
      userController = new UserController(userService);

      await userController.register(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);   
    }); 
  }); 

  describe("update", function() {
    let status, json, res, userController, userService;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      userService = new UserService(userRepo);
    });

    it("should not register a user when params are not provided", async function() {
      const req = { body: {},
      params: {id: 1} };

      await new UserController().update(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
   
    it("should update a use", async function() {
      const req = {
        body: { name: 'Juan', lastName: 'Perez', password: 'Pass123', email: 'Juan@email.com' },
        params: {id: 1}
      };

      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        lastName: 'Perez',
        status: 2,
        role: 2
      };
      const stub = sinon.stub(userService, "update").returns(stubValue);
      userController = new UserController(userService);

      await userController.update(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);   
    }); 
  }); 


  describe("update", function() {
    let status, json, res, userController, userService;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      userService = new UserService(userRepo);
    });

    it("should not register a user when params are not provided", async function() {
      const req = { body: {},
      params: {id: 1} };

      await new UserController().updatePassword(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
   
    it("should update the password", async function() {
      const req = {
        body: { linkEncrypt: 'Juan', password: 'Perez' },
        params: {id: 1}
      };

      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        lastName: 'Perez',
        status: 2,
        role: 2
      };
      const stub = sinon.stub(userService, "updatePassword").returns(stubValue);
      userController = new UserController(userService);

      await userController.updatePassword(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);   
    }); 
  }); 



  describe("get", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new UserService(repository);
    });   
   
    it("should return a user that matches id", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'Juan'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "get").returns(stubValue);
      controller = new UserController(service);
      await controller.get(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 




  describe("getMe", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new UserService(repository);
    });   
   
    it("should return a user that matches id", async function() {
      const req = { user: { id : 1} };

      const stubValue = {
        id: 1,
        name: 'Juan'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "get").returns(stubValue);
      controller = new UserController(service);
      await controller.getMe(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 


  describe("getAll", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new UserService(repository);
    });   
   
    it("should return all users by status", async function() {
      const req = { params: { id : "1"}, query: {status: 1} };

      const stubValue = {
        id: 1,
        name: 'Juan'
      };
      const mock = sinon.mock(res);
    
      sinon.stub(service, "getAll").returns([stubValue]);
      sinon.stub(service, "getByStatus").returns([stubValue]);
      controller = new UserController(service);
      await controller.getAll(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });

    it("should return all users", async function() {
      const req = { params: { id : "1"}, query: {status:null} };

      const stubValue = {
        id: 1,
        name: 'Juan'
      };
      const mock = sinon.mock(res);
    
      sinon.stub(service, "getAll").returns([stubValue]);
      sinon.stub(service, "getByStatus").returns([stubValue]);
      controller = new UserController(service);
      await controller.getAll(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

  describe("recoverPassword", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new UserService(repository);
    });   
   
    it("should recoverPassword password", async function() {
      const req = { body: { id : "1", email: 'email@email.com'} };

      const stubValue = {
        id: 1,
        name: 'Juan'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "recoverPassword").returns(stubValue);
      controller = new UserController(service);
      await controller.recoverPassword(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 



  describe("contact", function() {
    let status, json, res, userController, userService;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      userService = new UserService(userRepo);
    });

    it("should not contact when params are not provided", async function() {
      const req = { body: {},
      params: {id: 1} };

      await new UserController().contact(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
   
    it("should contact", async function() {
      const req = {
        body: { email: 'Juan', phone: 'Perez' , message: 'Mi mensajeee'}
      };

      const stubValue = {
        hasError: true,
        messag:null
      };

      const stub = sinon.stub(userService, "contact").returns(stubValue);
      userController = new UserController(userService);

      await userController.contact(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);   
    }); 
  }); 

  describe("delete", function() {
    let status, json, res, userController, userService;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      userService = new UserService(userRepo);
    });

    it("should not delete when params are not provided", async function() {
      const req = { params: { id: null} };

      await new UserController().delete(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
   
    it("should delete", async function() {
      const req = {
        body: { email: 'Juan', phone: 'Perez' , message: ''},
        params: {id: 1}
      };

      const stubValue = {
        hasError: false,
        messag:null
      };
      
      const stub = sinon.stub(userService, "delete").returns(stubValue);
      userController = new UserController(userService);

      await userController.delete(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);   
    }); 
  }); 

});
