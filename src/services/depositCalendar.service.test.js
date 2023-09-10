const chai = require("chai");
const sinon = require("sinon");
const DepositCalendarRepository = require("../repositories/depositCalendar.repository");
const expect = chai.expect; 
const LogRepository = require("../repositories/log.repository");
const DepositCalendarService = require("./depositCalendar.service");
const { depositRepository } = require("../routes/dependency");

describe("DepositCalendarService", function() {

  describe("create", function() {
    const stubValue = {
      id: 1,
      dateFrom: '1/1/2023',
      dateTo: '1/2/2023',
      status: 2
    };

    it("should create", async function() {

      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository(logRepository);
      const stubCreated = sinon.stub(repository, "create").returns(stubValue); 
      sinon.stub(repository, "get").returns(stubValue)

      sinon.stub(depositRepository, "get").returns(stubValue)
      sinon.stub(repository, "getByDeposit").returns([{
        id: 1,
        dateFrom: '1/1/2024',
        dateTo: '1/2/2024',
        status: 2
      }]);
      
      
      const service = new DepositCalendarService(repository, logRepository, depositRepository);
      const result = await service.create(stubValue);

      //expect(result.hasError).to.equal(false);
      expect(result.message).to.equal(null);
    });

    it("calendario existente", async function() {

      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository(logRepository);
      const stubCreated = sinon.stub(repository, "create").returns(stubValue); 
      sinon.stub(repository, "get").returns(stubValue)

      sinon.stub(depositRepository, "get").returns(stubValue)
      sinon.stub(repository, "getByDeposit").returns([stubValue]);
      
      
      const service = new DepositCalendarService(repository, logRepository, depositRepository);
      const result = await service.create(stubValue);

      expect(result.hasError).to.equal(true);
      expect(result.message).to.equal("Ya hay un calendario existente");
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository();
      var stub = sinon.stub(repository, "get").throwsException();
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositCalendarService(repository, logRepository, depositRepository);
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
      const repository = new DepositCalendarRepository(logRepository);
      const stuUpdated = sinon.stub(repository, "update").returns(stubValue); 
      const stubCheck = sinon.stub(repository, "get").returns(stubValue);

      const service = new DepositCalendarService(repository, logRepository, depositRepository);
      const result = await service.update(stubValue);

      expect(stuUpdated.calledOnce).to.be.true; 
      expect(result.hasError).to.equal(false);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository();
      var stub = sinon.stub(repository, "get").throwsException();
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositCalendarService(repository, logRepository, depositRepository);
      const result = await service.update(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("delete", function() {
    const stubValue = {
      id: 1,
      dateFrom: '1/1/2023',
      dateTo: '1/2/2023',
      status: 2
    };

    it("should delete", async function() {

      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository(logRepository);
      const stubCreated = sinon.stub(repository, "update").returns(stubValue); 
      sinon.stub(repository, "get").returns(stubValue)

      sinon.stub(depositRepository, "get").returns(stubValue)
      
      const service = new DepositCalendarService(repository, logRepository, depositRepository);
      const result = await service.delete(stubValue);

      //expect(result.hasError).to.equal(false);
      expect(result.message).to.equal(null);
    });

    
    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository();
      var stub = sinon.stub(repository, "update").throwsException();

      sinon.stub(repository, "get").returns(stubValue)
      sinon.stub(logRepository, "create").returns();

      const service = new DepositCalendarService(repository, logRepository, depositRepository);
      const result = await service.delete(stubValue);

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
      const repository = new DepositCalendarRepository();
      const stub = sinon.stub(repository, "get").returns(stubValue);

      const service = new DepositCalendarService(repository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.depositCalendar.id).to.equal(stubValue.id);
      expect(result.depositCalendar.name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository();
      var stub = sinon.stub(repository, "get").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositCalendarService(repository, logRepository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("getByDeposit", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new DepositCalendarRepository();
      const stub = sinon.stub(repository, "getByDeposit").returns([stubValue]);

      const service = new DepositCalendarService(repository);
      const result = await service.getByDeposit(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.depositCalendars[0].id).to.equal(stubValue.id);
      expect(result.depositCalendars[0].name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositCalendarRepository();
      var stub = sinon.stub(repository, "getByDeposit").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositCalendarService(repository, logRepository);
      const result = await service.getByDeposit(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });
});
