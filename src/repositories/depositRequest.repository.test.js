const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const DepositRequestModel = require("../models/depositRequest.model");
const LogModel = require("../models/log.model");
const DepositRequestRepository = require("./depositRequest.repository");
const LogRepository = require("./log.repository");
const { logRepository } = require("../routes/dependency");

describe("DepositRequestRepository", function() {

  describe("create", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Deposit'
    };

    it("should add a new deposit request to the db", async function() { 
      sinon.restore();
      stub = sinon.stub(DepositRequestModel, "create").returns(stubValue);
      const depositRequestRepository = new DepositRequestRepository();
      const deposit = await depositRequestRepository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.name).to.equal(stubValue.name);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepositRequestModel, "create").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const depositRequestRepository = new DepositRequestRepository(logRepository);
      const deposit = await depositRequestRepository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit).to.equal(null);
    });
  });

  describe("update", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Deposit'
    };

    it("should update a new deposit request to the db", async function() { 
      sinon.restore();
      stub = sinon.stub(DepositRequestModel, "update").returns(stubValue);
      const depositRequestRepository = new DepositRequestRepository();
      const deposit = await depositRequestRepository.update(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.name).to.equal(stubValue.name);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepositRequestModel, "update").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const depositRequestRepository = new DepositRequestRepository(logRepository);
      const deposit = await depositRequestRepository.update(stubValue);

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
      sinon.stub(DepositRequestModel, 'findOne').returns(stubValue);

      const depositRequestRepository = new DepositRequestRepository(logRepository);
      const department = await depositRequestRepository.get(stubValue.id);

      //expect(stub.calledOnce).to.be.true;
      expect(department.id).to.equal(stubValue.id);
      expect(department.title).to.equal(stubValue.title); 
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(DepositRequestModel, "findOne").throwsException();
      sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const depositRequestRepository = new DepositRequestRepository(logRepository);
      const department = await depositRequestRepository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(department).to.equal(null);
    });
  });

  describe("getByCompany", function() { 
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };

    it("should retrieve a deposit request with specific company id", async function() {

      sinon.restore();
      var stub = sinon.stub(DepositRequestModel, 'findOne').returns(stubValue);

      const depositRequestRepository = new DepositRequestRepository();
      const deposit = await depositRequestRepository.getByCompany(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.title).to.equal(stubValue.title); 
      expect(deposit.visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      var stub = sinon.stub(DepositRequestModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const depositRequestRepository = new DepositRequestRepository(logRepository);
      const deposit = await depositRequestRepository.getByCompany(1);

      expect(stub.calledOnce).to.be.true;
      expect(deposit).to.equal(null);
    });
  });

  describe("getAll", function() {
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true
    };
    it("should retrieve all deposit requests", async function() {
      sinon.restore();
      var stub = sinon.stub(DepositRequestModel, "findAll").returns([stubValue]);
      const depositRequestRepository = new DepositRequestRepository();
      const deposits = await depositRequestRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(deposits[0].id).to.equal(stubValue.id);
      expect(deposits[0].title).to.equal(stubValue.title);
    });

    it("should return error", async function() {
      sinon.restore();
      var stub = sinon.stub(DepositRequestModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const depositRequestRepository = new DepositRequestRepository(logRepository);
      const deposits = await depositRequestRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(deposits).to.equal(null);
    });
  });
});
