const fs = require('fs');
async function sendEmailCreatedClient(client) {
    
    const { email } = client;

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey('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')//Take from config
    
    const msg = {
        to: email, 
        from: 'romiareco@gmail.com', // Change to your verified sender
        subject: 'Welcome to WareUp',
        template_id: 'c4047597-e073-4b35-ba93-2c9724a3d1e5'
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}


module.exports = {
    sendEmailCreatedClient
  }