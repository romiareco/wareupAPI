const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const DepositServiceModel = require("../models/depositService.model");
const LogModel = require("../models/log.model");
const DepositServiceRepository = require("./depositService.repository");
const LogRepository = require("./log.repository");
const { logRepository } = require("../routes/dependency");

describe("DepositServiceRepository", function() {

  describe("create", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Deposit',
      serviceId: 1,
      depositId: 1
    };

    it("should add a new deposit service to the db", async function() { 
      sinon.restore();
      stub = sinon.stub(DepositServiceModel, "findOrCreate").returns(stubValue);
      const repository = new DepositServiceRepository();
      const deposit = await repository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.name).to.equal(stubValue.name);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepositServiceModel, "findOrCreate").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const repository = new DepositServiceRepository(logRepository);
      const deposit = await repository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit).to.equal(null);
    });
  });

  

  describe("get", function() {
    var stub;
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };

    it("should retrieve a deposit request with specific id", async function() {

      sinon.restore();
      sinon.stub(DepositServiceModel, 'findOne').returns(stubValue);

      const repository = new DepositServiceRepository(logRepository);
      const department = await repository.get(stubValue.id);

      //expect(stub.calledOnce).to.be.true;
      expect(department.id).to.equal(stubValue.id);
      expect(department.title).to.equal(stubValue.title); 
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(DepositServiceModel, "findOne").throwsException();
      sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new DepositServiceRepository(logRepository);
      const department = await repository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(department).to.equal(null);
    });
  });

  describe("getByDeposit", function() { 
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };

    it("should retrieve a deposit request with specific deposit id", async function() {

      sinon.restore();
      var stub = sinon.stub(DepositServiceModel, 'findAll').returns(stubValue);

      const repository = new DepositServiceRepository();
      const deposit = await repository.getByDeposit(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.title).to.equal(stubValue.title); 
      expect(deposit.visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      var stub = sinon.stub(DepositServiceModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new DepositServiceRepository(logRepository);
      const deposit = await repository.getByDeposit(1);

      expect(stub.calledOnce).to.be.true;
      expect(deposit).to.equal(null);
    });
  });

  
});
