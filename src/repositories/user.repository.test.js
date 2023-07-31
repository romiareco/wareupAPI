const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const UserModel = require("../models/user.model");
const UserRepository = require("./user.repository");
const LogModel = require("../models/log.model"); 
const LogRepository = require("./log.repository");

describe("UserRepository", function() {
    
  describe("create", function() {

    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      last_name: 'Perez',
      status: 2,
      role: 2
    };

    it("should add a new user to the db", async function() {
       
      sinon.restore();
      var stub = sinon.stub(UserModel, "create").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);
      expect(user.role).to.equal(stubValue.role);
      expect(user.status).to.equal(stubValue.status); 
    });

    it("should return error", async function() { 
      
      sinon.restore();
      var stub = sinon.stub(UserModel, "create").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const userRepository = new UserRepository(logRepository);
      const user = await userRepository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.equal(null);
    });
  });

  describe("update", function() {

    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      last_name: 'Perez',
      status: 2,
      role: 2
    };

    it("should add a new user to the db", async function() {
       
      sinon.restore();
      var stub = sinon.stub(UserModel, "update").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.update(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);
      expect(user.role).to.equal(stubValue.role);
      expect(user.status).to.equal(stubValue.status); 
    });

    it("should return error", async function() { 
      
      sinon.restore();
      var stub = sinon.stub(UserModel, "update").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const userRepository = new UserRepository(logRepository);
      const user = await userRepository.update(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.equal(null);
    });
  });

  describe("get", function() {
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
      var stub = sinon.stub(UserModel, "findOne").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.last_name).to.equal(stubValue.last_name);
      expect(user.email).to.equal(stubValue.email);
    });

    it("should return error", async function() { 
      sinon.restore();
      var stub = sinon.stub(UserModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const userRepository = new UserRepository(logRepository);
      const user = await userRepository.get(1);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.equal(null);
    });
  });

  describe("getByEmail", function() {
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
      var stub = sinon.stub(UserModel, "findOne").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.getByEmail('dsfd');

      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.last_name).to.equal(stubValue.last_name);
      expect(user.email).to.equal(stubValue.email);
    });

    it("should return error", async function() { 
      sinon.restore();
      var stub = sinon.stub(UserModel, "findOne").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const userRepository = new UserRepository(logRepository);
      const user = await userRepository.getByEmail('dsfd');

      expect(stub.calledOnce).to.be.true;
      expect(user).to.equal(null);
    });
  });

  describe("getAll", function() {
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
      var stub = sinon.stub(UserModel, "findAll").returns([stubValue]);
      const userRepository = new UserRepository();
      const users = await userRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(users[0].id).to.equal(stubValue.id);
      expect(users[0].name).to.equal(stubValue.name);
      expect(users[0].last_name).to.equal(stubValue.last_name);
      expect(users[0].email).to.equal(stubValue.email);
    });

    it("should return error", async function() { 
      sinon.restore();
      var stub = sinon.stub(UserModel, "findAll").throwsException();
      stub = sinon.stub(LogModel, "create").returns();
      const logRepository = new LogRepository();

      const userRepository = new UserRepository(logRepository);
      const users = await userRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(users).to.equal(null);
    });
  });
});
