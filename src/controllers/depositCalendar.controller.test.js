const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const DepositCalendarController = require("./depositCalendar.controller");
const DepositCalendarService = require("../services/depositCalendar.service");

describe("ServiceGroupController", function() {
  describe("get", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositCalendarService(repository);
    });   
   
    it("should return a serviceGroup that matches the id param", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'service group'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "get").returns(stubValue);
      controller = new DepositCalendarController(service);
      await controller.get(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

  describe("getByDeposit", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new DepositCalendarService(repository);
    });   
   
    it("should return all deposit calendar by deposit", async function() {
      const req = { params: { depositId : "1"} };

      const stubValue = {
        id: 1,
        name: 'service group'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getByDeposit").returns([stubValue]);
      controller = new DepositCalendarController(service);
      await controller.getByDeposit(req, res);
          
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
      service = new DepositCalendarService(repository);
    });   
   
    it("should update", async function() {
      const req = { params: { id : "1"}, body: { id: 1,
        name: 'service group',
        dateFrom: "1/1/2023",
        dateTo: '2/1/2023',
        totalM3:100} };

      const stubValue = {
        id: 1,
        name: 'service group',
        dateFrom: "1/1/2023",
        dateTo: '2/1/2023',
        totalM3:100
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "update").returns([stubValue]);
      controller = new DepositCalendarController(service);
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
      service = new DepositCalendarService(repository);
    });   
   
    it("should create", async function() {
      const req = { body: { name: 'service group',
      dateFrom: "1/1/2023",
      dateTo: '2/1/2023',
      totalM3:100,
      depositId: 1} };

      const stubValue = {
        name: 'service group',
        dateFrom: "1/1/2023",
        dateTo: '2/1/2023',
        totalM3:100,
        depositId: 1
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "create").returns([stubValue]);
      controller = new DepositCalendarController(service);
      await controller.register(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 
});
