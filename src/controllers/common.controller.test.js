const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const CommonController = require("./common.controller");
const CompanyService = require("../services/company.service"); 
const { depositService } = require("../routes/dependency");
const CommonService = require("../services/common.service");

describe("CommonController", function() {
   
   
 

  describe("getDepartments", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new CommonService(repository);
    });   
   
    it("should return a user that matches id", async function() {
      const req = { params: { id : "1"} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "getDepartments").returns(stubValue);
      controller = new CommonController(service);
      await controller.getDepartments(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  }); 

  describe("getCitiesByDepartment", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new CommonService(repository);
    });   
   
    it("should return all users by status", async function() {
      const req = { params: { departmentId : "1"}, query: {status: 1} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      sinon.stub(service, "getCitiesByDepartment").returns(stubValue); 
      controller = new CommonController(service);
      await controller.getCitiesByDepartment(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
 
  });  
});
