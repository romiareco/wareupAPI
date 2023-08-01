const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const ServiceGroupModel = require("../models/serviceGroups.model");
const LogModel = require("../models/log.model");
const ServiceGroupRepository = require("./serviceGroup.repository");
const LogRepository = require("./log.repository");

describe("ServiceGroupRepository", function() {

  describe("get", function() {
    var stub;
    const stubValue = {
      id: 1,
      title: 'Certificado',
    };

    it("should retrieve a serviceGroup with specific id", async function() {

      sinon.restore();
      stub = sinon.stub(ServiceGroupModel, 'findOne').returns(stubValue);

      const repository = new ServiceGroupRepository();
      const department = await repository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(department.id).to.equal(stubValue.id);
      expect(department.title).to.equal(stubValue.title); 
      expect(department.visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(ServiceGroupModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new ServiceGroupRepository(logRepository);
      const department = await repository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(department).to.equal(null);
    });
  }); 

  describe("getAll", function() {
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true
    };
    it("should retrieve all service grouos", async function() {
      sinon.restore();
      var stub = sinon.stub(ServiceGroupModel, "findAll").returns([stubValue]);
      const repository = new ServiceGroupRepository();
      const deposits = await repository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(deposits[0].id).to.equal(stubValue.id);
      expect(deposits[0].title).to.equal(stubValue.title);
    });

    it("should return error", async function() {
      sinon.restore();
      var stub = sinon.stub(ServiceGroupModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const repository = new ServiceGroupRepository(logRepository);
      const deposits = await repository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(deposits).to.equal(null);
    });
  });
});
