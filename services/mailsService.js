

async function sendEmailUserCreated(user) {
    try{
        const { email } = user;

        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey('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')//TODO: Take from config
        
        const msg = {
            to: email, 
            from: 'romiareco@gmail.com', //TODO: Change to your verified sender
            subject: 'Welcome to WareUp',
            template_id: 'c4047597-e073-4b35-ba93-2c9724a3d1e5'
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            logs.insert('Error in sendEmailUserCreated: '+error, enums.logsType.service); 
        })
    }
    catch (error) {
        logs.insert('Error in sendEmailUserCreated: '+error, enums.logsType.service);
    }
}


async function sendEmailPasswordRecovery(user) {
     try{
        const { email, password } = user;

        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey('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')//TODO: Take from config
        
        const msg = {
            to: email, 
            from: 'romiareco@gmail.com', //TODO: Change to your verified sender
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
            logs.insert('Error in sendEmailPasswordRecovery: '+error, enums.logsType.service);
        })
    }
    catch (error) {
        logs.insert('Error in sendEmailPasswordRecovery: '+error, enums.logsType.service);
    }
}


module.exports = {
    sendEmailUserCreated,
    sendEmailPasswordRecovery
  }