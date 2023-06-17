const enums = require('../utils/enums');
const config = require('../../config');
 
class MailService {
    constructor(logRepository) {
      this.log = logRepository;
    }
  
    async sendEmailUserCreated(email) {
        try{  
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(config.sendgrid.apikey);
            
            const msg = {
                to: email, 
                from: config.sendgrid.from,
                subject: 'Welcome to WareUp',
                template_id: 'c4047597-e073-4b35-ba93-2c9724a3d1e5'
            };

            sgMail.send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                this.log.create('Error in sendEmailUserCreated: '+ error, enums.logsType.service); 
            })
        }
        catch (error) {
            this.log.create('Error in sendEmailUserCreated: '+ error, enums.logsType.service);
        }
    }


    async sendEmailPasswordRecovery(user) {
        try{
            const { email, password } = user;

            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(config.sendgrid.apikey);
            
            const msg = {
                to: email, 
                from: config.sendgrid.from,
                subject: 'Recuperacion de contraseña',
                template_id: 'd-ff8f6eee18964ab6a6bc704be3d4da37',
                dynamicTemplateData: {
                password: password
                }
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                this.log.create('Error in sendEmailPasswordRecovery: '+error, enums.logsType.service);
            })
        }
        catch (error) {
            this.log.create('Error in sendEmailPasswordRecovery: '+error, enums.logsType.service);
        }
    }
}
module.exports = MailService;