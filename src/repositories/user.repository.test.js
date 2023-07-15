const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const UserModel = require("../models/user.model");
const UserRepository = require("./user.repository");

describe("UserRepository", function() {
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
    it("should add a new user to the db", async function() {
      const stubValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        last_name: 'Perez',
        status: 2,
        role: 2
      };
      const stub = sinon.stub(UserModel, "create").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.create(stubValue);

      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);
      expect(user.role).to.equal(stubValue.role);
      expect(user.status).to.equal(stubValue.status); 
    });
  });

  describe("get", function() {
    it("should retrieve a user with specific id", async function() {
      const stub = sinon.stub(UserModel, "findOne").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.get(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.last_name).to.equal(stubValue.last_name);
      expect(user.email).to.equal(stubValue.email);
    });
  });
});
