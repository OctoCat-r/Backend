const nodemailer = require("nodemailer");

const send_mail = require('@sendgrid/mail');

const API_KEY = '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';

send_mail.setApiKey(API_KEY);

const sendMail1 = async (req, res) => {
    let {text} = req.body;
    const message = {
        to:['anishant303@gmail.com', 'e21cseu0853@bennett.edu.in' ],
        from:'amangodha26@gmail.com',
        subject: 'Hello',
        text: 'Hello',
        html: `<h1>${text}</h1>`,
    };
    
    send_mail.send(message).then(res => console.log('email sent')).catch((err)=>console.log(err.message));
};

module.exports = sendMail1;