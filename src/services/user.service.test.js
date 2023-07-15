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
        lastName: 'Perez',
        status: 2,
        role: 2
      };

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubUserCreated = sinon.stub(userRepo, "create").returns(stubValue);
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").returns(null);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.create(stubValue);
  
      const {hasError, message} = result;
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(stubUserCreated.calledOnce).to.be.true;
      expect(stubMailSent.calledOnce).to.be.true;
      expect(false).to.equal(hasError);  
    });
  });

  describe("create", function() {
    it("should indincate email already in use", async function() {
      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        lastName: 'Perez',
        status: 2,
        role: 2
      };

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubUserCreated = sinon.stub(userRepo, "create").returns(stubValue);
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").returns(stubValue); 
 
      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.create(stubValue);
      
      
      const {hasError, message} = result;
     
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(stubUserCreated.notCalled).to.be.true;
      expect(stubMailSent.notCalled).to.be.true;
      expect(true).to.equal(hasError); 
      expect('El email ya se encuentra en uso.').to.equal(message); 
    });
  });

  describe("get", function() {
    it("should return a user that matches the provided id", async function() {
      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        lastName: 'Perez',
        status: 2,
        role: 2
      };

      const userRepo = new UserRepository();
      const stub = sinon.stub(userRepo, "get").returns(stubValue); 

      const userService = new UserService(userRepo);
      const user = await userService.get(stubValue.id);
  
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);  
    });
  });


  describe("recoverPassword", function() {
    it("should send password to email", async function() {
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
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").returns(stubValue);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.recoverPassword(stubValue.email);
      const {hasError, message} = result;
        
      expect('Contrasena enviada correctamente.').to.equal(message); 
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(false).to.equal(hasError); 
    });
  });
  describe("recoverPassword", function() {
    it("email not registered", async function() {
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
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").returns(null);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.recoverPassword(stubValue.email);
      const {hasError, message} = result;
        
      expect('El email no es valido.').to.equal(message); 
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(stubMailSent.notCalled).to.be.true;
      expect(true).to.equal(hasError); 
    });
  });

  it("email required", async function() {
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
    const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
    const stubCheckEmail = sinon.stub(userRepo, "getByEmail").returns(null);

    const userService = new UserService(userRepo, logRepository, mailService);
    const result = await userService.recoverPassword(null);
    const {hasError, message} = result;
      
    expect('El email es requerido.').to.equal(message); 
    expect(stubCheckEmail.notCalled).to.be.true;
    expect(stubMailSent.notCalled).to.be.true;
    expect(true).to.equal(hasError); 
  });
});
