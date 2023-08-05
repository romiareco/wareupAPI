const LogRepository = require("../repositories/log.repository");
const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");
const MailService = require("../services/mail.service");
const CompanyService = require("../services/company.service");
const CompanyRepository = require("../repositories/company.repository");
const DepositService = require("../services/deposit.service");
const DepositRepository = require("../repositories/deposit.repository");
const ServiceGroupService = require("../services/serviceGroup.service");
const ServiceGroupRepository = require("../repositories/serviceGroup.repository");
const AuthService = require("../services/auth.service");
const DepositRequestRepository = require("../repositories/depositRequest.repository");
const DepositRequestService = require("../services/depositRequest.service");
const DepositServiceRepository = require("../repositories/depositService.repository");
const DepartmentRepository = require("../repositories/department.repository");
const CityRepository = require("../repositories/city.repository");
const CommonService = require("../services/common.service");
const DepositImageRepository = require("../repositories/depositImage.repository");

const logRepository = new LogRepository();
const userRepository = new UserRepository(logRepository);
const companyRepository = new CompanyRepository(logRepository);
const depositRepository = new DepositRepository(logRepository);
const serviceGroupRepository = new ServiceGroupRepository(logRepository);
const depositRequestRepository = new DepositRequestRepository(logRepository);
const depositServiceRepository = new DepositServiceRepository(logRepository); 
const departmentRepository = new DepartmentRepository(logRepository);
const cityRepository = new CityRepository(logRepository);
const depositImageRepository = new DepositImageRepository(logRepository);

const mailService = new MailService(logRepository);
const userService = new UserService(userRepository, logRepository, mailService); 
const authService = new AuthService(userRepository, logRepository);
const companyService = new CompanyService(companyRepository, logRepository, userRepository);
const depositRequestService = new DepositRequestService(depositRequestRepository, logRepository, companyRepository);
const depositService = new DepositService(depositRepository, logRepository, companyRepository, depositServiceRepository, depositImageRepository);
const serviceGroupService = new ServiceGroupService(serviceGroupRepository, logRepository);
const commonService = new CommonService(departmentRepository, cityRepository, logRepository);

module.exports = {
  userRepository,
  userService,
  logRepository,
  mailService, 
  companyService,
  companyRepository,
  depositService,
  depositRepository,
  serviceGroupService,
  serviceGroupRepository,
  authService,
  depositRequestService,
  depositRequestRepository,
  depositServiceRepository,
  commonService,
  departmentRepository,
  cityRepository
};

