const chai = require("chai");
const sinon = require("sinon");
const UserRepository = require("../repositories/user.repository");
const expect = chai.expect; 
const UserService = require("./user.service");
const LogRepository = require("../repositories/log.repository");
const MailService = require("./mail.service");;

describe("UserService", function() {
  describe("create", function() {
    it("should create a new user", async function() {
      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        last_name: 'Perez',
        status: 2,
        role: 2
      };

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubUserCreated = sinon.stub(userRepo, "create").returns(stubValue);
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "getUserByEmail").returns(null);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.create(stubValue.name, stubValue.last_name, stubValue.password, stubValue.email);
  
      const {hasError, message} = result;
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(stubUserCreated.calledOnce).to.be.true;
      expect(stubMailSent.calledOnce).to.be.true;
      expect(false).to.equal(hasError); 
      expect('User created successfully').to.equal(message); 
    });
  });

  describe("create", function() {
    it("should indincate email already in use", async function() {
      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        last_name: 'Perez',
        status: 2,
        role: 2
      };

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubUserCreated = sinon.stub(userRepo, "create").returns(stubValue);
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "getUserByEmail").returns(stubValue); 
 
      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.create(stubValue.name, stubValue.last_name, stubValue.password, stubValue.email);
      
      
      const {hasError, message} = result;
     
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(stubUserCreated.notCalled).to.be.true;
      expect(stubMailSent.notCalled).to.be.true;
      expect(true).to.equal(hasError); 
      expect('Email already in use').to.equal(message); 
    });
  });

  describe("getUser", function() {
    it("should return a user that matches the provided id", async function() {
      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        last_name: 'Perez',
        status: 2,
        role: 2
      };

      const userRepo = new UserRepository();
      const stub = sinon.stub(userRepo, "getUser").returns(stubValue); 

      const userService = new UserService(userRepo);
      const user = await userService.getUser(stubValue.id);
  
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);  
    });
  });

   
});
