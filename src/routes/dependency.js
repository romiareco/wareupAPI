const LogRepository = require("../repositories/log.repository");
const UserRepository = require("../repositories/user.repository");
const AddressRepository = require("../repositories/address.repository");
const UserService = require("../services/user.service");
const MailService = require("../services/mail.service");
const AddressService = require("../services/address.service");
const CompanyService = require("../services/company.service");
const CompanyRepository = require("../repositories/company.repository");
const DepositService = require("../services/deposit.service");
const DepositRepository = require("../repositories/deposit.repository");

const logRepository = new LogRepository();
const userRepository = new UserRepository(logRepository);
const companyRepository = new CompanyRepository(logRepository);
const addressRepository = new AddressRepository(logRepository);
const depositRepository = new DepositRepository(logRepository);

const mailService = new MailService(logRepository);
const userService = new UserService(userRepository, logRepository, mailService);
const companyService = new CompanyService(companyRepository, logRepository, userRepository);
const addressService = new AddressService(addressRepository, logRepository, companyRepository);
const depositService = new DepositService(depositRepository, logRepository, companyRepository);

module.exports = {
  userRepository,
  userService,
  logRepository,
  mailService, 
  addressService,
  addressRepository,
  companyService,
  companyRepository,
  depositService,
  depositRepository
};

