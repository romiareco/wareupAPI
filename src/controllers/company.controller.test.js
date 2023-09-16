const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const CompanyController = require("./company.controller");
const CompanyService = require("../services/company.service"); 
const { depositService } = require("../routes/dependency");
const DepositService = require("../services/deposit.service");

describe("CompanyController", function() {
   
  describe("update", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      service = new CompanyService(userRepo);
    });

    it("should not update a user when params are not provided", async function() {
      const req = { body: {},
      params: {id: 1} };

      await new CompanyController().update(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
   
    it("should update a use", async function() {
      const req = {
        body: { email: 'Juan', phone: 'Perez', businessName: 'Pass123', contactName: 'contactName',
          RUT: "11212121", status: 1 }, 
        params: {id: 1}
      };

      const stubValue = {
       hasError: false
      };
      const stub = sinon.stub(service, "update").returns(stubValue);
      controller = new CompanyController(service);

      await controller.update(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);   
    }); 
  }); 

  describe("register", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      service = new CompanyService(userRepo);
    });

    it("should not register a user when params are not provided", async function() {
      const req = { body: {},
      params: {id: 1} };

      await new CompanyController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
   
    it("should register a use", async function() {
      const req = {
        body: { email: 'Juan', phone: 'Perez', businessName: 'Pass123', contactName: 'contactName',
          RUT: "11212121", status: 1, userId: 1 }, 
        params: {id: 1}
      };

      const stubValue = {
       hasError: false
      };
      const stub = sinon.stub(service, "create").returns(stubValue);
      controller = new CompanyController(service);

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
      service = new CompanyService(repository);
    });   
   
    it("should return a user that matches id", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'Juan'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "get").returns(stubValue);
      controller = new CompanyController(service);
      await controller.get(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

  describe("getByUser", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new CompanyService(repository);
    });   
   
    it("should return a user that matches id", async function() {
      const req = { params: { userId : "1"}};

      const stubValue = {
        id: 1,
        name: 'Juan'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getByUser").returns(stubValue);
      controller = new CompanyController(service);
      await controller.getByUser(req, res);
          
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
      service = new CompanyService(repository);
    });   
   
    it("should return all users by status", async function() {
      const req = { params: { id : "1"}, query: {status: 1} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      sinon.stub(service, "getAll").returns(stubValue); 
      controller = new CompanyController(service);
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
      controller = new CompanyController(service);
      await controller.getAll(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 
 


 

  describe("delete", function() {
    let status, json, res, controller, service, depositService;
    beforeEach(() => {
      sinon.restore();
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      service = new CompanyService(userRepo);
      depositService = new DepositService();
    });

    it("should not delete when params are not provided", async function() {
      const req = { params: { id: null} };

      await new CompanyController().delete(req, res);

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
      
      const stub = sinon.stub(depositService, "deleteByCompany").returns(stubValue);
      sinon.stub(service, "delete").returns(stubValue);
      controller = new CompanyController(service, depositService);

      await controller.delete(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);   
    }); 
  }); 

});
