const chai = require("chai");
const sinon = require("sinon");
const ServiceGroupRepository = require("../repositories/serviceGroup.repository");
const expect = chai.expect;
const ServiceGroupService = require("./serviceGroup.service");
const LogRepository = require("../repositories/log.repository");
const MailService = require("./mail.service");

describe("ServiceGroupService", function() {

  describe("get", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new ServiceGroupRepository();
      const stub = sinon.stub(repository, "get").returns(stubValue);

      const service = new ServiceGroupService(repository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.serviceGroup.id).to.equal(stubValue.id);
      expect(result.serviceGroup.name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new ServiceGroupRepository();
      var stub = sinon.stub(repository, "get").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new ServiceGroupService(repository, logRepository);
      const result = await service.get(stubValue.id);

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
      const repository = new ServiceGroupRepository();
      sinon.restore();
      const stub = sinon.stub(repository, "getAll").returns([stubValue]);

      const service = new ServiceGroupService(repository);
      const result = await service.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(result.serviceGroups[0].id).to.equal(stubValue.id);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new ServiceGroupRepository();
      sinon.stub(repository, "getAll").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new ServiceGroupService(repository, logRepository);
      const result = await service.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });
});
