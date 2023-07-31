const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const CompanyModel = require("../models/company.model");
const LogModel = require("../models/log.model");
const CompanyRepository = require("./company.repository");
const LogRepository = require("./log.repository");

describe("CompanyRepository", function() {
  const stubValue = {
    id: 1,
    name: 'Juan',
    email: 'Juan@email.com',
    password: 'Pass123',
    last_name: 'Perez',
    status: 2,
    role: 2
  };


  describe("create", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      last_name: 'Perez',
      status: 2,
      role: 2
    };

    it("should add a new company to the db", async function() {
      
      sinon.restore();
      stub = sinon.stub(CompanyModel, "create").returns(stubValue);
      const companyRepository = new CompanyRepository();
      const company = await companyRepository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(company.id).to.equal(stubValue.id);
      expect(company.name).to.equal(stubValue.name);
      expect(company.email).to.equal(stubValue.email);
      expect(company.role).to.equal(stubValue.role);
      expect(company.status).to.equal(stubValue.status);
    }); 
 

    it("should return error", async function() { 
      sinon.restore();
      stub = sinon.stub(CompanyModel, "create").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();
      const companyRepository = new CompanyRepository(logRepository);
      const company = await companyRepository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(company).to.equal(null);
    });
  });

  describe("getByRUT", function() {

    var stub; 
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      last_name: 'Perez',
      status: 2,
      role: 2
    };

    it("should retrieve a user with specific RUT", async function() { 
      sinon.restore();
      stub = sinon.stub(CompanyModel, 'findOne').returns(stubValue);
      const companyRepository = new CompanyRepository();
      const company = await companyRepository.getByRUT('asdads');

      expect(stub.calledOnce).to.be.true;
      expect(company.id).to.equal(stubValue.id);
      expect(company.name).to.equal(stubValue.name);
      expect(company.last_name).to.equal(stubValue.last_name);
      expect(company.email).to.equal(stubValue.email); 
    });

    it("should return error", async function() { 
      sinon.restore();
      stub = sinon.stub(CompanyModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const companyRepository = new CompanyRepository(logRepository);
      const company = await companyRepository.getByRUT('asdads');

      expect(stub.calledOnce).to.be.true;
      expect(company).to.equal(null);
    });
  });

  describe("getByUser", function() {

    var stub;
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      last_name: 'Perez',
      status: 2,
      role: 2
    };
    it("should retrieve a user with specific User", async function() {
      sinon.restore();
      stub = sinon.stub(CompanyModel, 'findAll').returns([stubValue]);

      const companyRepository = new CompanyRepository();
      const company = await companyRepository.getByUser(1);

      expect(stub.calledOnce).to.be.true;
      expect(company[0].id).to.equal(stubValue.id);
      expect(company[0].name).to.equal(stubValue.name);
      expect(company[0].last_name).to.equal(stubValue.last_name);
      expect(company[0].email).to.equal(stubValue.email);
    });

    it("should return error", async function() { 
      sinon.restore();
      stub = sinon.stub(CompanyModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const companyRepository = new CompanyRepository(logRepository);
      const company = await companyRepository.getByUser(1);

      expect(stub.calledOnce).to.be.true;
      expect(company).to.equal(null);
    });
  });

  describe("get", function() {
    var stub;
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      last_name: 'Perez',
      status: 2,
      role: 2
    };

    it("should retrieve a user with specific id", async function() {

      sinon.restore();
      stub = sinon.stub(CompanyModel, 'findOne').returns(stubValue);

      const companyRepository = new CompanyRepository();
      const company = await companyRepository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(company.id).to.equal(stubValue.id);
      expect(company.name).to.equal(stubValue.name);
      expect(company.last_name).to.equal(stubValue.last_name);
      expect(company.email).to.equal(stubValue.email);
    });

    it("should return error", async function() {
      sinon.restore();
      stub = sinon.stub(CompanyModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const companyRepository = new CompanyRepository(logRepository);
      const company = await companyRepository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(company).to.equal(null);
    });
  });

  describe("getAll", function() {
    it("should retrieve all users", async function() {
      const stub = sinon.stub(CompanyModel, "findAll").returns([stubValue]);
      const companyRepository = new CompanyRepository();
      const companies = await companyRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(companies[0].id).to.equal(stubValue.id);
      expect(companies[0].name).to.equal(stubValue.name);
      expect(companies[0].last_name).to.equal(stubValue.last_name);
      expect(companies[0].email).to.equal(stubValue.email);
    });

    it("should return error", async function() {       
      sinon.restore();
      stub = sinon.stub(CompanyModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const companyRepository = new CompanyRepository(logRepository);
      const company = await companyRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(company).to.equal(null);
    });
  });
});
