const chai = require("chai");
const sinon = require("sinon");
const BookingRequestRepository = require("../repositories/bookingRequest.repository");
const expect = chai.expect;
const LogRepository = require("../repositories/log.repository");
const BookingRequestService = require("./bookingRequest.service");
const { logRepository, userRepository} = require("../routes/dependency");

describe("BookingRequestService", function() {

  describe("update", function() {

    const stubValue = {
      id: 1,
      companyId: 1,
      RUT: "200",
      email: "asdadsa"
    };

    it("should update a bookingRequest", async function() {
      sinon.restore();
      const repository = new BookingRequestRepository();
      sinon.stub(repository, "update").returns(stubValue);
      sinon.stub(repository, "get").returns(stubValue);
      
      const service = new BookingRequestService(repository, logRepository, userRepository);
      const result = await service.update(stubValue);
 
      expect(result.hasError).to.equal(false); 
      expect(result.bookingRequest.id).to.equal(stubValue.id);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new BookingRequestRepository();
      var stub = sinon.stub(repository, "update").throwsException(); 
      var stubGeUser = sinon.stub(userRepository, "get").returns({ id: 1, });
      stub = sinon.stub(logRepository, "create").returns();
      //sinon.stub(repository, "getByRUT").returns(null);
      const service = new BookingRequestService(repository, logRepository, userRepository);
      const result = await service.update(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("create", function() {

    const stubValue = {
      id: 1,
      companyId: 1,
      RUT: "200"
    };

    it("should create a bookingRequest", async function() {
      sinon.restore();
      const repository = new BookingRequestRepository();
      var stubCreate = sinon.stub(repository, "create").returns(stubValue);
      var stubGeUser = sinon.stub(userRepository, "get").returns({ id: 1, });
      
      const service = new BookingRequestService(repository, logRepository, userRepository);
      const result = await service.create(stubValue);
 
      
      expect(result.hasError).to.equal(false)
      expect(stubCreate.calledOnce).to.be.true;
      expect(result.bookingRequest.id).to.equal(stubValue.id);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new BookingRequestRepository();
      var stub = sinon.stub(repository, "create").throwsException(); 
      var stubGeUser = sinon.stub(userRepository, "get").returns({ id: 1, });
      stub = sinon.stub(logRepository, "create").returns();

      const service = new BookingRequestService(repository, logRepository, userRepository);
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
      const repository = new BookingRequestRepository();
      const stub = sinon.stub(repository, "get").returns(stubValue);

      const service = new BookingRequestService(repository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.bookingRequest.id).to.equal(stubValue.id);
      expect(result.bookingRequest.name).to.equal(stubValue.name);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new BookingRequestRepository();
      var stub = sinon.stub(repository, "get").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new BookingRequestService(repository, logRepository);
      const result = await service.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("getByUser", function() {

    const stubValue = {
      id: 1,
      name: 'Certificacion'
    };

    it("should return a booking request that matches the provided id", async function() {
      const repository = new BookingRequestRepository();
      const stub = sinon.stub(repository, "getByUser").returns([stubValue]);

      const service = new BookingRequestService(repository);
      const result = await service.getByUser(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.bookingRequests[0].id).to.equal(stubValue.id);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new BookingRequestRepository();
      var stub = sinon.stub(repository, "getByUser").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new BookingRequestService(repository, logRepository);
      const result = await service.getByUser(stubValue.id);

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
      const repository = new BookingRequestRepository();
      const stub = sinon.stub(repository, "getAll").returns([stubValue]);

      const service = new BookingRequestService(repository);
      const result = await service.getAll(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.bookingRequests[0].id).to.equal(stubValue.id);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const repository = new BookingRequestRepository();
      var stub = sinon.stub(repository, "getAll").throwsException(); 
      stub = sinon.stub(logRepository, "create").returns();

      const service = new BookingRequestService(repository, logRepository);
      const result = await service.getAll(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });
});
