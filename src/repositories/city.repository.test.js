const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const CityModel = require("../models/city.model");
const LogModel = require("../models/log.model");
const CityRepository = require("./city.repository");
const LogRepository = require("./log.repository");

describe("CityRepository", function() {

  describe("getByDepartment", function() {

    var stub;
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };

    it("should retrieve a user with specific department", async function() {

      sinon.restore();
      stub = sinon.stub(CityModel, 'findAll').returns([stubValue]);

      const cityRepository = new CityRepository();
      const cities = await cityRepository.getByDepartment(1);

      expect(stub.calledOnce).to.be.true;
      expect(cities[0].id).to.equal(stubValue.id);
      expect(cities[0].title).to.equal(stubValue.title);
      expect(cities[0].departmentId).to.equal(stubValue.departmentId);
      expect(cities[0].visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() { 
      sinon.restore();
      stub = sinon.stub(CityModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const cityRepository = new CityRepository(logRepository);
      const cities = await cityRepository.getByDepartment(1);

      expect(stub.calledOnce).to.be.true;
      expect(cities).to.equal(null);
    });
  });

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
      stub = sinon.stub(CityModel, 'findOne').returns(stubValue);

      const cityRepository = new CityRepository();
      const city = await cityRepository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(city.id).to.equal(stubValue.id);
      expect(city.title).to.equal(stubValue.title);
      expect(city.departmentId).to.equal(stubValue.departmentId);
      expect(city.visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {

      sinon.restore();
      stub = sinon.stub(CityModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const cityRepository = new CityRepository(logRepository);
      const city = await cityRepository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(city).to.equal(null);
    });
  });

  describe("getAll", function() {
    const stubValue = {
      id: 1,
      title: 'Montevideo',
      visible: true,
      departmentId: 2
    };
    it("should retrieve all cities", async function() {
      const stub = sinon.stub(CityModel, "findAll").returns([stubValue]);
      const cityRepository = new CityRepository();
      const cities = await cityRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(cities[0].id).to.equal(stubValue.id);
      expect(cities[0].title).to.equal(stubValue.title);
      expect(cities[0].departmentId).to.equal(stubValue.departmentId);
      expect(cities[0].visible).to.equal(stubValue.visible);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(CityModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const cityRepository = new CityRepository(logRepository);
      const cities = await cityRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(cities).to.equal(null);
    });
  });
});
