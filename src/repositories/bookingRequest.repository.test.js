const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const BookingRequestModel = require("../models/city.model");
const LogModel = require("../models/log.model");
const BookingRequestRepository = require("./bookingRequest.repository");
const LogRepository = require("./log.repository");

describe("BookingRequestRepository", function() {

  describe("get", function() {
    var stub;
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };

    it("should retrieve a booking request with specific id", async function() {

      sinon.restore();
      stub = sinon.stub(BookingRequestModel, 'findOne').returns(stubValue);

      const repository = new BookingRequestRepository();
      const bookingRequest = await repository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequest.id).to.equal(stubValue.id);
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(BookingRequestModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new BookingRequestRepository(logRepository);
      const bookingRequest = await repository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequest).to.equal(null);
    });
  });

  describe("getAll", function() {
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };
    it("should retrieve all bookingRequest", async function() {
      const stub = sinon.stub(BookingRequestModel, "findAll").returns([stubValue]);
      const repository = new BookingRequestRepository();
      const bookingRequests = await repository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequests[0].id).to.equal(stubValue.id);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(BookingRequestModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new BookingRequestRepository(logRepository);
      const bookingRequests = await repository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequests).to.equal(null);
    });
  });
});
