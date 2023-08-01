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
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      lastName: 'Perez',
      status: 2,
      role: 2
    };

    it("should indincate email already in use", async function() {

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

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const userRepo = new UserRepository();
      var stub = sinon.stub(userRepo, "get").throwsException();
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").throwsException();
      stub = sinon.stub(logRepository, "create").returns();

      const userService = new UserService(userRepo, logRepository);
      const result = await userService.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("update", function() {
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      lastName: 'Perez',
      status: 2,
      role: 2
    };

    it("should update user", async function() {

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubUserUpdated = sinon.stub(userRepo, "update").returns(stubValue); 
      const stubCheckUser = sinon.stub(userRepo, "get").returns(stubValue);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.update(stubValue);

      expect(stubCheckUser.calledTwice).to.be.true;
      expect(stubUserUpdated.calledOnce).to.be.true; 
      expect(result.hasError).to.equal(false);
    });

    it("should return error  : El usuario no existe.", async function() {

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubUserCreated = sinon.stub(userRepo, "update").returns(stubValue); 
      const stubCheckUser = sinon.stub(userRepo, "get").returns(null);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.update(stubValue);

      expect(stubCheckUser.calledOnce).to.be.true;
      expect(stubUserCreated.notCalled).to.be.true; 
      expect(result.hasError).to.equal(true);
      expect('El usuario no existe.').to.equal(result.message);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const userRepo = new UserRepository();
      var stub = sinon.stub(userRepo, "get").throwsException();
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").throwsException();
      stub = sinon.stub(logRepository, "create").returns();

      const userService = new UserService(userRepo, logRepository);
      const result = await userService.update(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });

  describe("get", function() {

    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      lastName: 'Perez',
      status: 2,
      role: 2
    };

    it("should return a user that matches the provided id", async function() {
      const userRepo = new UserRepository();
      const stub = sinon.stub(userRepo, "get").returns(stubValue);

      const userService = new UserService(userRepo);
      const result = await userService.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.user.id).to.equal(stubValue.id);
      expect(result.user.name).to.equal(stubValue.name);
      expect(result.user.email).to.equal(stubValue.email);
    });

    it("should return an error", async function() {
      sinon.restore();
      const logRepository = new LogRepository();
      const userRepo = new UserRepository();
      var stub = sinon.stub(userRepo, "get").throwsException();
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").throwsException();
      stub = sinon.stub(logRepository, "create").returns();

      const userService = new UserService(userRepo, logRepository);
      const result = await userService.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(result.hasError).to.equal(true);
    });
  });


  describe("recoverPassword", function() {
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      last_name: 'Perez',
      status: 2,
      role: 2
    };

    it("should send password to email", async function() {

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").returns(stubValue);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.recoverPassword(stubValue.email);
      const { hasError, message } = result;

      expect('Mail enviado correctamente.').to.equal(message);
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(false).to.equal(hasError);
    });

    it("email not registered", async function() {

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository); 
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "getByEmail").returns(null);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.recoverPassword(stubValue.email);
      const { hasError, message } = result;

      expect('El email no es valido.').to.equal(message);
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(stubMailSent.notCalled).to.be.true;
      expect(true).to.equal(hasError);
    });

    it("email required", async function() {

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


 /* describe("updatePassword", function() {
    const stubValue = {
      id: 1,
      name: 'Juan',
      email: 'Juan@email.com',
      password: 'Pass123',
      last_name: 'Perez',
      status: 2,
      role: 2
    };

    it("should send password to email", async function() {

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "get").returns(stubValue);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.updatePassword(stubValue.email);
      const { hasError, message } = result;

      expect('Mail enviado correctamente.').to.equal(message);
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(false).to.equal(hasError);
    });

    it("email not registered", async function() {

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);  
      const stubCheckEmail = sinon.stub(userRepo, "get").returns(null);

      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.updatePassword(stubValue.email);
      const { hasError, message } = result;

      expect('Error al actualizar la password del usuario.').to.equal(message);
      expect(stubCheckEmail.calledOnce).to.be.true;
      expect(stubMailSent.notCalled).to.be.true;
      expect(true).to.equal(hasError);
    });

    it("email required", async function() {

      const logRepository = new LogRepository();
      const mailService = new MailService();
      const userRepo = new UserRepository(logRepository);
      const stubMailSent = sinon.stub(mailService, "sendEmailUserCreated");
      const stubCheckEmail = sinon.stub(userRepo, "get").returns(null);
  
      const userService = new UserService(userRepo, logRepository, mailService);
      const result = await userService.updatePassword(null);
      const {hasError, message} = result;
  
      expect('El email es requerido.').to.equal(message);
      expect(stubCheckEmail.notCalled).to.be.true;
      expect(stubMailSent.notCalled).to.be.true;
      expect(true).to.equal(hasError);
    });
  }); */  
});
