const chai = require("chai");
const sinon = require("sinon");
const CompanyRepository = require("../repositories/company.repository");
const expect = chai.expect;
const LogRepository = require("../repositories/log.repository");
const CommonService = require("./common.service");
const { departmentRepository, cityRepository, logRepository } = require("../routes/dependency");

describe("CommonService", function() {

  describe("get", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new CommonService();
      const stub = sinon.stub(departmentRepository, "getAll").returns(stubValue);

      const service = new CommonService(departmentRepository, cityRepository, logRepository);
      const result = await service.getDepartments(stubValue.id);

      expect(stub.calledOnce).to.be.true;
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new CommonService();
      var stub = sinon.stub(departmentRepository, "getAll").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new CommonService(departmentRepository, cityRepository, logRepository);
      const result = await service.getDepartments(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });
});
