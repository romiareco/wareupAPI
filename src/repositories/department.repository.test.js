const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const DepartmentModel = require("../models/department.model");
const LogModel = require("../models/log.model");
const DepartmentRepository = require("./department.repository");
const LogRepository = require("./log.repository");

describe("DepartmentRepository", function() {
   
  describe("get", function() {
    var stub;
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };

    it("should retrieve a city with specific id", async function() {

      sinon.restore();
      stub = sinon.stub(DepartmentModel, 'findOne').returns(stubValue);

      const departmentRepository = new DepartmentRepository();
      const department = await departmentRepository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(department.id).to.equal(stubValue.id);
      expect(department.title).to.equal(stubValue.title); 
      expect(department.visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(DepartmentModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const departmentRepository = new DepartmentRepository(logRepository);
      const department = await departmentRepository.get(1);

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
    it("should retrieve all departments", async function() {
      const stub = sinon.stub(DepartmentModel, "findAll").returns([stubValue]);
      const departmentRepository = new DepartmentRepository();
      const departments = await departmentRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(departments[0].id).to.equal(stubValue.id);
      expect(departments[0].title).to.equal(stubValue.title);
      expect(departments[0].departmentId).to.equal(stubValue.departmentId);
      expect(departments[0].visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(DepartmentModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const departmentRepository = new DepartmentRepository(logRepository);
      const departments = await departmentRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(departments).to.equal(null);
    });
  });
});
