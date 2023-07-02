const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;  
const AddressModel = require("../models/address.model");
const AddressRepository = require("./address.repository");

describe("AddressRepository", function() {
   

  describe("create", function() {
    it("should add a new address to the db", async function() {
      const stubValue = {
        id: 1,
        city: 'city1',
        street: 'av asdas ',
        postalCode: '11111',
        phone: '1234',
        type: 2,
        userId: 2
      };
      const stub = sinon.stub(AddressModel, "create").returns(stubValue);
      const addressRepository = new AddressRepository();
      const addressCreated = await addressRepository.create(stubValue.city, stubValue.street, stubValue.postalCode, stubValue.phone, stubValue.type, stubValue.userId);

      expect(stub.calledOnce).to.be.true;
      expect(addressCreated.id).to.equal(stubValue.id);
      expect(addressCreated.city).to.equal(stubValue.city);
      expect(addressCreated.street).to.equal(stubValue.street);
      expect(addressCreated.postalCode).to.equal(stubValue.postalCode);
      expect(addressCreated.phone).to.equal(stubValue.phone); 
      expect(addressCreated.type).to.equal(stubValue.type);  
      expect(addressCreated.userId).to.equal(stubValue.userId); 
    });
  });

  describe("getAddress", function() {
    it("should retrieve the address with specific id", async function() {

      const stubValue = {
        id: 1,
        city: 'city1',
        street: 'av asdas ',
        postalCode: '11111',
        phone: '1234',
        type: 2,
        userId: 2
      };

      const stub = sinon.stub(AddressModel, "findOne").returns(stubValue);
      const addressRepository = new AddressRepository();
      const address = await addressRepository.getAddress(stubValue.id);

      expect(stub.calledOnce).to.be.true;   
      expect(address.id).to.equal(stubValue.id);
      expect(address.city).to.equal(stubValue.city);
      expect(address.street).to.equal(stubValue.street);
      expect(address.postalCode).to.equal(stubValue.postalCode);
      expect(address.phone).to.equal(stubValue.phone); 
      expect(address.type).to.equal(stubValue.type);  
      expect(address.userId).to.equal(stubValue.userId); 
    });
  });
});
