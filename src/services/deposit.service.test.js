const chai = require("chai");
const sinon = require("sinon");
const DepositRepository = require("../repositories/deposit.repository");
const expect = chai.expect; 
const LogRepository = require("../repositories/log.repository");
const DepositService = require("./deposit.service");
const { logRepository, companyRepository, cityRepository } = require("../routes/dependency");

describe("DepositService", function() {

  describe("create", function() {

    const stubValue = {
      id: 1,
      cityId: 1,
      totalM3: "200"
    };

    it("should create a deposit", async function() {
      const repository = new DepositRepository();
      var stubCreate = sinon.stub(repository, "create").returns(stubValue);
      var stubGetCompany = sinon.stub(companyRepository, "get").returns({ id: 1, });
      var stubGetCity = sinon.stub(cityRepository, "get").returns({title: "city"});

      const service = new DepositService(repository, logRepository, companyRepository);
      const result = await service.create(stubValue);
 
      
      expect(result.hasError).to.equal(false);
      expect(stubGetCompany.calledOnce).to.be.true;
      expect(stubGetCity.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(result.deposit.id).to.equal(stubValue.id);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRepository();
      var stub = sinon.stub(repository, "create").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositService(repository, logRepository);
      const result = await service.create(stubValue.id);

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
      const repository = new DepositRepository();
      const stub = sinon.stub(repository, "get").returns(stubValue);

      const service = new DepositService(repository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.deposit.id).to.equal(stubValue.id);
      expect(result.deposit.name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRepository();
      var stub = sinon.stub(repository, "get").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositService(repository, logRepository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });
});
