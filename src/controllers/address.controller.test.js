const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect; 
const AddressController = require("./address.controller");
const AddressService = require("../services/address.service");
const AddressRepository = require("../repositories/address.repository");

describe("AddressController", function() {
  describe("register", function() {
    let status, json, res, userController, userService;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const addressRepo = sinon.spy();
      addressService = new AddressService(addressRepo);
    });
    it("should not register a address when name param is not provided", async function() {
      const req = { body: { street: 'aaaaa' } };

      await new AddressController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });  
  });

  describe("getAddress", function() {
    let req;
    let res;
    let addressService;
    beforeEach(() => {
      req = { params: { id: 1 } };
      res = { json: function() {} };
      const addressRepo = sinon.spy();
      addressService = new AddressService(addressRepo);
    });

    it("should return a address that matches the id param", async function() {
      const stubValue = {
        id: req.params.id, 
      };
      const mock = sinon.mock(res);
      mock
        .expects("json")
        .once()
        .withExactArgs({ data: stubValue });

      const stub = sinon.stub(addressService, "getAddress").returns(stubValue);
      addressController = new AddressController(addressService);
      const address = await addressController.getAddress(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(address.id).to.be.equal(stubValue.id);
      mock.verify();
    });
  });
});
