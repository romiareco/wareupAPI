const LogRepository = require("../repositories/log.repository");
const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");
const MailService = require("../services/mail.service");

const logRepository = new LogRepository();
const userRepository = new UserRepository(logRepository);
const mailService = new MailService(logRepository);
const userService = new UserService(userRepository, logRepository, mailService);

module.exports = {
  userRepository,
  userService,
  logRepository,
  mailService
};

