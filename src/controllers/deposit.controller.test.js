const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const DepositController = require("./deposit.controller");
const DepositService = require("../services/deposit.service");

describe("ServiceGroupController", function() {
  describe("get", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositService(repository);
    });   
   
    it("should return a deposit that matches the id param", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'service group'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "get").returns(stubValue);
      controller = new DepositController(service);
      await controller.get(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 
  

  describe("getImagesByDeposit", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositService(repository);
    });   
   
    it("should return all images", async function() {
      const req = { params: {depositId: "1"}  };

      const stubValue = {
        id: 1,
        name: 'service group'
      };
      const mock = sinon.mock(res); 
      sinon.stub(service, "getImagesByDeposit").returns([stubValue]);
      controller = new DepositController(service);
      await controller.getImagesByDeposit(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

  describe("getServicesByDeposit", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositService(repository);
    });   
   
    it("should return all deposits", async function() {
      const req = { params: {depositId: "1"}  };

      const stubValue = {
        id: 1,
        name: 'service group'
      };
      const mock = sinon.mock(res); 
      sinon.stub(service, "getServicesByDeposit").returns([stubValue]);
      controller = new DepositController(service);
      await controller.getServicesByDeposit(req, res);
          
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
      service = new DepositService(repository);
    });   
   
    it("should return all deposits", async function() {
      const req = { query: { applyFilter : "false"} };

      const stubValue = {
        id: 1,
        name: 'service group'
      };
      const mock = sinon.mock(res);
    
      sinon.stub(service, "getAll").returns([stubValue]);
      sinon.stub(service, "getByFilter").returns([stubValue]);
      controller = new DepositController(service);
      await controller.getAll(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

  describe("update", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositService(repository);
    });   
   
    it("should update", async function() {
      const req = { params: { id : "1"}, body: { id: 1,
        name: 'service group',
        dateFrom: "1/1/2023",
        dateTo: '2/1/2023',
        description: 'adsadsa',
        status: 1,
        cityId: 1,
        totalM3:100} };

        const stubValue = {
          hasError: false
        };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "update").returns([stubValue]);
      controller = new DepositController(service);
      await controller.update(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

  describe("register", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositService(repository);
    });   
   
    it("should create", async function() {
      const req = { body: { description: 'depositoooo',
      city: "Montevideo",
      cityId: 1,
      totalM3:100 }};

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "create").returns([stubValue]);
      controller = new DepositController(service);
      await controller.register(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

  describe("delete", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositService(repository);
    });   
   
    it("should delete", async function() {
      const req = { params: { id : "1"}, body: { id: 1,
        name: 'service group',
        dateFrom: "1/1/2023",
        dateTo: '2/1/2023',
        description: 'adsadsa',
        status: 1,
        cityId: 1,
        totalM3:100} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "delete").returns([stubValue]);
      controller = new DepositController(service);
      await controller.delete(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 


  describe("registerImages", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositService(repository);
    });   
   
    it("should registerImages", async function() {
      const req = { params: { id : "1"}, body: {  images: ['imagen1']} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "addDepositImages").returns([stubValue]);
      controller = new DepositController(service);
      await controller.registerImages(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 


  describe("getByCompany", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositService(repository);
    });   
   
    it("should return all deposits by company", async function() {
      const req = { params: { companyId : "1"} };

      const stubValue = {
        hasError: false 
      };
      const mock = sinon.mock(res);
    
      sinon.stub(service, "getByCompany").returns(stubValue);
      controller = new DepositController(service);
      await controller.getByCompany(req, res);
          
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
      service = new DepositService(repository);
    });   
   
    it("should return all deposits by company", async function() {
      const req = { params: { userId : "1"} };

      const stubValue = {
        hasError: false 
      };
      const mock = sinon.mock(res);
    
      sinon.stub(service, "getByUser").returns(stubValue);
      controller = new DepositController(service);
      await controller.getByUser(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

});
