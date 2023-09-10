const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const DepositModel = require("../models/deposit.model");
const LogModel = require("../models/log.model");
const DepositRepository = require("./deposit.repository");
const LogRepository = require("./log.repository");

describe("DepositRepository", function() {

  describe("create", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Deposit'
    };

    it("should add a new deposit to the db", async function() { 
      sinon.restore();
      stub = sinon.stub(DepositModel, "create").returns(stubValue);
      const depositRepository = new DepositRepository();
      const deposit = await depositRepository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.name).to.equal(stubValue.name);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepositModel, "create").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const depositRepository = new DepositRepository(logRepository);
      const deposit = await depositRepository.create(stubValue);

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

    it("should retrieve a deposit with specific id", async function() {

      sinon.restore();
      stub = sinon.stub(DepositModel, 'findOne').returns(stubValue);

      const depositRepository = new DepositRepository();
      const department = await depositRepository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(department.id).to.equal(stubValue.id);
      expect(department.title).to.equal(stubValue.title); 
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(DepositModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const depositRepository = new DepositRepository(logRepository);
      const department = await depositRepository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(department).to.equal(null);
    });
  });

  describe("getByCompany", function() {
    var stub;
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };

    it("should retrieve a deposit with specific id", async function() {

      sinon.restore();
      stub = sinon.stub(DepositModel, 'findAll').returns([stubValue]);

      const depositRepository = new DepositRepository();
      const deposits = await depositRepository.getByCompany(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(deposits[0].id).to.equal(stubValue.id);
      expect(deposits[0].title).to.equal(stubValue.title); 
      expect(deposits[0].visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(DepositModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const depositRepository = new DepositRepository(logRepository);
      const deposits = await depositRepository.getByCompany(1);

      expect(stub.calledOnce).to.be.true;
      expect(deposits).to.equal(null);
    });
  });

  describe("getAll", function() {
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true
    };
    it("should retrieve all deposits", async function() {
      sinon.restore();
      const stub = sinon.stub(DepositModel, "findAll").returns([stubValue]);
      const depositRepository = new DepositRepository();
      const deposits = await depositRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(deposits[0].id).to.equal(stubValue.id);
      expect(deposits[0].title).to.equal(stubValue.title);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepositModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const depositRepository = new DepositRepository(logRepository);
      const deposits = await depositRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(deposits).to.equal(null);
    });
  });
});
