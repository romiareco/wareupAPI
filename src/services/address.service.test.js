const chai = require("chai");
const sinon = require("sinon");
const AddressRepository = require("../repositories/address.repository");
const expect = chai.expect; 
const AddressService = require("./address.service");
const LogRepository = require("../repositories/log.repository");
const UserRepository = require("../repositories/user.repository");

describe("AddressService", function() {
  describe("create", function() {
    it("should create a new address", async function() {
      const stubValue = {
        id: 1,
        city: 'city1',
        street: 'av asdas ',
        postalCode: '11111',
        phone: '1234',
        type: 2,
        userId: 2
      };

      const stubUserValue = {
        id: 1,
        name: 'Juan',
        email: 'Juan@email.com',
        password: 'Pass123',
        last_name: 'Perez',
        status: 2,
        role: 2
      };

      const logRepository = new LogRepository();
      const userRepository = new UserRepository(logRepository); 
      
      const stubUser = sinon.stub(userRepository, "getUser").returns(stubUserValue); 
      const addressRepo = new AddressRepository(logRepository);
      const stubAddressCreated = sinon.stub(addressRepo, "create").returns(stubValue); 

      const addressService = new AddressService(addressRepo, logRepository, userRepository);
      const result = await addressService.create(stubValue.name, stubValue.last_name, stubValue.password, stubValue.email);
  
      const {hasError, message} = result; 
      expect(stubUser.calledOnce).to.be.true; 
      expect(stubAddressCreated.calledOnce).to.be.true; 
      expect(false).to.equal(hasError); 
      expect('Address created successfully').to.equal(message); 
    });
  }); 
   

  describe("getAddress", function() {
    it("should return a address that matches the provided id", async function() {
      const stubValue = {
        id: 1,
        city: 'city1',
        street: 'av asdas ',
        postalCode: '11111',
        phone: '1234',
        type: 2,
        userId: 2
      };

      const addressRepo = new AddressRepository();
      const stub = sinon.stub(addressRepo, "getAddress").returns(stubValue); 

      const addressService = new AddressService(addressRepo);
      const address = await addressService.getAddress(stubValue.id);
  
      expect(stub.calledOnce).to.be.true;
      expect(address.id).to.equal(stubValue.id);
      expect(address.name).to.equal(stubValue.name);
      expect(address.email).to.equal(stubValue.email);  
    });
  });
   
});
