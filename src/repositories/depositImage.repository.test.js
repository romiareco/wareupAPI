const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const DepositImageModel = require("../models/depositImage.model");
const LogModel = require("../models/log.model");
const DepositImageRepository = require("./depositImage.repository");
const LogRepository = require("./log.repository");
const { logRepository } = require("../routes/dependency");

describe("DepositImageRepository", function() {

  describe("create", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Deposit',
      title: "aaaa",
      companyId: 1,
      image: "aaa"
    };

    it("should add a new deposit request to the db", async function() { 
      sinon.restore();
      stub = sinon.stub(DepositImageModel, "create").returns(stubValue);
      const repository = new DepositImageRepository();
      const deposit = await repository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.name).to.equal(stubValue.name);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepositImageModel, "create").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const repository = new DepositImageRepository(logRepository);
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
      sinon.stub(DepositImageModel, 'findOne').returns(stubValue);

      const repository = new DepositImageRepository(logRepository);
      const department = await repository.get(stubValue.id);

      //expect(stub.calledOnce).to.be.true;
      expect(department.id).to.equal(stubValue.id);
      expect(department.title).to.equal(stubValue.title); 
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(DepositImageModel, "findOne").throwsException();
      sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new DepositImageRepository(logRepository);
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
      var stub = sinon.stub(DepositImageModel, 'findAll').returns(stubValue);

      const repository = new DepositImageRepository();
      const deposit = await repository.getByDeposit(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.title).to.equal(stubValue.title); 
      expect(deposit.visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      var stub = sinon.stub(DepositImageModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new DepositImageRepository(logRepository);
      const deposit = await repository.getByDeposit(1);

      expect(stub.calledOnce).to.be.true;
      expect(deposit).to.equal(null);
    });
  });
 
});
