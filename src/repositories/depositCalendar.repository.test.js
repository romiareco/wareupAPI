const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const DepositCalendarModel = require("../models/depositCalendar.model");
const LogModel = require("../models/log.model");
const DepositCalendarRepository = require("./depositCalendar.repository");
const LogRepository = require("./log.repository");

describe("DepositCalendarRepository", function() {

  describe("create", function() {

    var stub;
    const stubValue = {
      id: 1,
    };

    it("should add a new deposit to the db", async function() { 
      sinon.restore();
      stub = sinon.stub(DepositCalendarModel, "create").returns(stubValue);
      const repository = new DepositCalendarRepository();
      const deposit = await repository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.name).to.equal(stubValue.name);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepositCalendarModel, "create").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository(logRepository);
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

    it("should retrieve a deposit with specific id", async function() {

      sinon.restore();
      stub = sinon.stub(DepositCalendarModel, 'findOne').returns(stubValue);

      const repository = new DepositCalendarRepository();
      const department = await repository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(department.id).to.equal(stubValue.id);
      expect(department.title).to.equal(stubValue.title); 
      expect(department.visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(DepositCalendarModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new DepositCalendarRepository(logRepository);
      const department = await repository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(department).to.equal(null);
    });
  });

  describe("getByDeposit", function() {
    var stub;
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };

    it("should retrieve a deposit with specific id", async function() {

      sinon.restore();
      stub = sinon.stub(DepositCalendarModel, 'findAll').returns([stubValue]);

      const repository = new DepositCalendarRepository();
      const deposits = await repository.getByDeposit(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(deposits[0].id).to.equal(stubValue.id);
      expect(deposits[0].title).to.equal(stubValue.title); 
      expect(deposits[0].visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(DepositCalendarModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new DepositCalendarRepository(logRepository);
      const deposits = await repository.getByDeposit(1);

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
      const stub = sinon.stub(DepositCalendarModel, "findAll").returns([stubValue]);
      const repository = new DepositCalendarRepository();
      const deposits = await repository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(deposits[0].id).to.equal(stubValue.id);
      expect(deposits[0].title).to.equal(stubValue.title);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepositCalendarModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new DepositCalendarRepository(logRepository);
      const deposits = await repository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(deposits).to.equal(null);
    });
  });
});
