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
const DepositCalendarRepository = require("../repositories/depositCalendar.repository");
const DepositCalendarService = require("../services/depositCalendar.service");
const BookingRequestRepository = require("../repositories/bookingRequest.repository");
const BookingRequestService = require("../services/bookingRequest.service");

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
const depositCalendarRepository = new DepositCalendarRepository(logRepository);
const bookingRequestRepository = new BookingRequestRepository(logRepository);

const mailService = new MailService(logRepository);
const userService = new UserService(userRepository, logRepository, mailService); 
const authService = new AuthService(userRepository, logRepository);
const companyService = new CompanyService(companyRepository, logRepository, userRepository);
const depositRequestService = new DepositRequestService(depositRequestRepository, logRepository, companyRepository);
const depositService = new DepositService(depositRepository, logRepository, companyRepository, depositServiceRepository, depositImageRepository, cityRepository);
const serviceGroupService = new ServiceGroupService(serviceGroupRepository, logRepository);
const commonService = new CommonService(departmentRepository, cityRepository, logRepository);

const bookingRequestService = new BookingRequestService(bookingRequestRepository, logRepository);
const depositCalendarService = new DepositCalendarService(depositCalendarRepository, logRepository, depositRepository);

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
  bookingRequestRepository,
  depositRequestService,
  depositRequestRepository,
  depositServiceRepository,
  commonService,
  departmentRepository,
  cityRepository,
  depositCalendarService,
  depositCalendarRepository,
  bookingRequestService,
  depositImageRepository
};

