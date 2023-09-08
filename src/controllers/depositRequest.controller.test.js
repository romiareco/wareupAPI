const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const DepositRequestController = require("./depositRequest.controller");
const DepositRequestService = require("../services/depositRequest.service");
const DepositRequestRepository = require("../repositories/depositRequest.repository");

describe("DepositRequestController", function() {

  describe("register", function() {
    let status, json, res, userController, userService;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositRequestService(repository);
    });

    it("should not register a deposit request when some param is not provided", async function() {
      const req = { body: { email: 'Juan@email.com' } };

      await new DepositRequestController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
 
    it("should register a deposit request when all params are provided", async function() {
      const req = {
        body: { title: 'a', description: 'a', email: 'a', phone: 'a', address: 'a', companyId: 1, userId: 2 }
      }; 
   
      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com'
      };
      const stub = sinon.stub(service, "create").returns(stubValue);
      controller = new DepositRequestController(service);

      await controller.register(req, res);
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
      service = new DepositRequestService(repository);
    });   
   
    it("should return a DepositRequest that matches the id param", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'deposit name'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "get").returns(stubValue);
      controller = new DepositRequestController(service);
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
      service = new DepositRequestService(repository);
    });   
   
    it("should return all DepositRequest", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'deposit name'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getAll").returns([stubValue]);
      controller = new DepositRequestController(service);
      await controller.getAll(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 
});
