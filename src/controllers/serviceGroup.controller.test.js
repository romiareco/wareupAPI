const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const ServiceGroupController = require("./serviceGroup.controller");
const ServiceGroupService = require("../services/serviceGroup.service");
const ServiceGroupRepository = require("../repositories/serviceGroup.repository");

describe("ServiceGroupController", function() {
  describe("get", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new ServiceGroupService(repository);
    });   
   
    it("should return a serviceGroup that matches the id param", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'service group'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "get").returns(stubValue);
      controller = new ServiceGroupController(service);
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
      service = new ServiceGroupService(repository);
    });   
   
    it("should return all serviceGroups", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        id: 1,
        name: 'service group'
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getAll").returns([stubValue]);
      controller = new ServiceGroupController(service);
      await controller.getAll(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 
});
