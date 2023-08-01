const chai = require("chai");
const sinon = require("sinon");
const CompanyRepository = require("../repositories/company.repository");
const expect = chai.expect;
const LogRepository = require("../repositories/log.repository");
const CompanyService = require("./company.service");

describe("CompanyService", function() {

  describe("get", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new CompanyRepository();
      const stub = sinon.stub(repository, "get").returns(stubValue);

      const service = new CompanyService(repository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.company.id).to.equal(stubValue.id);
      expect(result.company.name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new CompanyRepository();
      var stub = sinon.stub(repository, "get").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new CompanyService(repository, logRepository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });
});
