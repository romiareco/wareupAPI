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
      expect(status.args[0][0]).to.equal(201);   
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
   
    it("should return all users", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'Juan'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getAll").returns([stubValue]);
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
});
