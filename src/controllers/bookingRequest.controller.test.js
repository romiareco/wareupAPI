const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const BookoingRequestController = require("./bookingRequest.controller"); 
const { depositService } = require("../routes/dependency");
const BookingRequestService = require("../services/bookingRequest.service");

describe("BookoingRequestController", function() {
   
  describe("getByDeposit", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new BookingRequestService(repository);
    });   
   
    it("should return all booking request", async function() {
      const req = { params: { depositId : "1"} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getByDeposit").returns(stubValue);
      controller = new BookoingRequestController(service);
      await controller.getByDeposit(req, res);
          
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
      service = new BookingRequestService(repository);
    });   
   
    it("should return all booking request", async function() {
      const req = { params: { userId : "1"} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getByUser").returns(stubValue);
      controller = new BookoingRequestController(service);
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
      service = new BookingRequestService(repository);
    });   
   
    it("should return all booking request", async function() {
      const req = { params: { userId : "1"} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getAll").returns(stubValue);
      controller = new BookoingRequestController(service);
      await controller.getAll(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
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
      service = new BookingRequestService(repository);
    });   
   
    it("should return a booking request", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "get").returns(stubValue);
      controller = new BookoingRequestController(service);
      await controller.get(req, res);
          
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
      service = new BookingRequestService(repository);
    });   
   
    it("should register a booking request", async function() {
      const req = { params: { userId : "1"}, body: {userId: 1, depositId: 1}};

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "create").returns(stubValue);
      controller = new BookoingRequestController(service);
      await controller.register(req, res);
          
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
      service = new BookingRequestService(repository);
    });   
   
    it("should register a booking request", async function() {
      const req = { params: { id : "1"}, body: {userId: 1, depositId: 1, status: 1}};

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "update").returns(stubValue);
      controller = new BookoingRequestController(service);
      await controller.update(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

});
