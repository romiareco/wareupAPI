const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const BookingRequestModel = require("../models/bookingRequest.model");
const LogModel = require("../models/log.model");
const BookingRequestRepository = require("./bookingRequest.repository");
const LogRepository = require("./log.repository");
const { bookingRequestRepository } = require("../routes/dependency");

describe("BookingRequestRepository", function() {

  describe("create", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Deposit'
    };

    it("should add a new deposit request to the db", async function() { 
      sinon.restore();
      stub = sinon.stub(BookingRequestModel, "create").returns(stubValue);
      const repository = new BookingRequestRepository();
      const deposit = await repository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.name).to.equal(stubValue.name);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(BookingRequestModel, "create").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const repository = new BookingRequestRepository(logRepository);
      const deposit = await repository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit).to.equal(null);
    });
  });

  describe("update", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Deposit'
    };

    it("should update a new deposit request to the db", async function() { 
      sinon.restore();
      stub = sinon.stub(BookingRequestModel, "update").returns(stubValue);
      const repository = new BookingRequestRepository();
      const deposit = await repository.update(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit.id).to.equal(stubValue.id);
      expect(deposit.name).to.equal(stubValue.name);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(BookingRequestModel, "update").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const repository = new BookingRequestRepository(logRepository);
      const deposit = await repository.update(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(deposit).to.equal(null);
    });
  });

  describe("get", function() {
    
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2,
      user: {
        id:1,
      },
      deposit: {
        id:1,
        userId: 1,
        user: {
          id:1
        }
      }
    };

    it("should retrieve a booking request with specific id", async function() {

      sinon.restore();
      var stub = sinon.stub(BookingRequestModel, 'findOne').returns(stubValue);

      const logRepository = new LogRepository();
      const repository = new BookingRequestRepository(logRepository);
      const bookingRequest = await repository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequest.id).to.equal(stubValue.id);
    });

    it("should return error", async function() {

      sinon.restore();
      sinon.stub(BookingRequestModel, "findOne").throwsException();
      var stub = sinon.stub(LogModel, "create").returns();
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

  describe("getByUser", function() {
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };
    it("should retrieve all bookingRequest", async function() {

      sinon.restore();
      const stub = sinon.stub(BookingRequestModel, "findAll").returns([stubValue]);
      const repository = new BookingRequestRepository();
      const bookingRequests = await repository.getByUser(1);

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequests[0].id).to.equal(stubValue.id);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(BookingRequestModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new BookingRequestRepository(logRepository);
      const bookingRequests = await repository.getByUser();

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequests).to.equal(null);
    });
  });

  describe("getByDeposit", function() {
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };
    it("should retrieve all bookingRequest", async function() {

      sinon.restore();
      const stub = sinon.stub(BookingRequestModel, "findAll").returns([stubValue]);
      const repository = new BookingRequestRepository();
      const bookingRequests = await repository.getByDeposit(1);

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequests[0].id).to.equal(stubValue.id);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(BookingRequestModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new BookingRequestRepository(logRepository);
      const bookingRequests = await repository.getByDeposit();

      expect(stub.calledOnce).to.be.true;
      expect(bookingRequests).to.equal(null);
    });
  });
});
