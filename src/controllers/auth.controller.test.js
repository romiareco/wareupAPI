const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const AuthController = require("./auth.controller"); 
const { depositService } = require("../routes/dependency");
const AuthService = require("../services/auth.service");

describe("AuthController", function() {
   
  describe("login", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new AuthService(repository);
    });   
   
    it("should login", async function() {
      const req = { body: { email : "1asdads", password: "adasdass"} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "login").returns(stubValue);
      controller = new AuthController(service);
      await controller.login(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  });  
  
  describe("refreshAccessToken", function() {
    let status, json, res, controller, service;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const repository = sinon.spy();
      service = new AuthService(repository);
    });   
   
    it("should refreshAccessToken", async function() {
      const req = { body: { token : "112121"} };

      const stubValue = {
        hasError: false
      };
      const mock = sinon.mock(res);
    
      const stub = sinon.stub(service, "refreshAccessToken").returns(stubValue);
      controller = new AuthController(service);
      await controller.refreshAccessToken(req, res);
          
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);  
      expect(json.calledOnce).to.be.true; 
      mock.verify();
    });
  });   
  
      

});
