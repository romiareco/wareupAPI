const chai = require("chai");
const sinon = require("sinon");
const DepositRequestRepository = require("../repositories/depositRequest.repository");
const expect = chai.expect; 
const LogRepository = require("../repositories/log.repository");
const DepositRequestService = require("./depositRequest.service");
const { companyRepository } = require("../routes/dependency");

describe("DepositRequestService", function() {

  
  describe("create", function() {
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      lastName: 'Perez',
      status: 2,
      role: 2
    };

    it("should create", async function() {

      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository(logRepository);
      const stubCreated = sinon.stub(repository, "create").returns(stubValue); 
      const stubCheck = sinon.stub(companyRepository, "get").returns(stubValue);

      const service = new DepositRequestService(repository, logRepository, companyRepository);
      const result = await service.create(stubValue);

      expect(stubCreated.calledOnce).to.be.true; 
      expect(result.hasError).to.equal(false);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository();
      var stub = sinon.stub(repository, "get").throwsException();
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositRequestService(repository, logRepository, companyRepository);
      const result = await service.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("update", function() {
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      lastName: 'Perez',
      status: 2,
      role: 2
    };

    it("should update", async function() {

      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository(logRepository);
      const stuUpdated = sinon.stub(repository, "update").returns(stubValue); 
      const stubCheck = sinon.stub(repository, "get").returns(stubValue);

      const service = new DepositRequestService(repository, logRepository, companyRepository);
      const result = await service.update(stubValue);

      expect(stuUpdated.calledOnce).to.be.true; 
      expect(result.hasError).to.equal(false);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository();
      var stub = sinon.stub(repository, "get").throwsException();
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositRequestService(repository, logRepository, companyRepository);
      const result = await service.update(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });


  describe("get", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new DepositRequestRepository();
      const stub = sinon.stub(repository, "get").returns(stubValue);

      const service = new DepositRequestService(repository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.depositRequest.id).to.equal(stubValue.id);
      expect(result.depositRequest.name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository();
      var stub = sinon.stub(repository, "get").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositRequestService(repository, logRepository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("getByUser", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new DepositRequestRepository();
      const stub = sinon.stub(repository, "getByUser").returns([stubValue]);

      const service = new DepositRequestService(repository);
      const result = await service.getByUser(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.depositRequests[0].id).to.equal(stubValue.id);
      expect(result.depositRequests[0].name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository();
      var stub = sinon.stub(repository, "getByUser").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositRequestService(repository, logRepository);
      const result = await service.getByUser(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("getByCompany", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new DepositRequestRepository();
      const stub = sinon.stub(repository, "getByCompany").returns([stubValue]);

      const service = new DepositRequestService(repository);
      const result = await service.getByCompany(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.depositRequests[0].id).to.equal(stubValue.id);
      expect(result.depositRequests[0].name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository();
      var stub = sinon.stub(repository, "getByCompany").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositRequestService(repository, logRepository);
      const result = await service.getByCompany(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("getAll", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new DepositRequestRepository();
      const stub = sinon.stub(repository, "getAll").returns([stubValue]);

      const service = new DepositRequestService(repository);
      const result = await service.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(result.depositRequests[0].id).to.equal(stubValue.id);
      expect(result.depositRequests[0].name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository();
      var stub = sinon.stub(repository, "getAll").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositRequestService(repository, logRepository);
      const result = await service.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });
});
