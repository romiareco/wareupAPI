const chai = require("chai");
const sinon = require("sinon");
const DepositRequestRepository = require("../repositories/depositRequest.repository");
const expect = chai.expect; 
const LogRepository = require("../repositories/log.repository");
const DepositRequestService = require("./depositRequest.service");

describe("DepositRequestService", function() {

  describe("get", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a service group that matches the provided id", async function() {
      const repository = new DepositRequestRepository();
      const stub = sinon.stub(repository, "get").returns(stubValue);

      const service = new DepositRequestService(repository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.depositRequest.id).to.equal(stubValue.id);
      expect(result.depositRequest.name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new DepositRequestRepository();
      var stub = sinon.stub(repository, "get").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new DepositRequestService(repository, logRepository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });
});
