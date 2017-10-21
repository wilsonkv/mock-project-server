const nodemailer = require("nodemailer");

const serverParams = process.env.EMAIL_AUTH;
let auth;
if (serverParams) {
  auth = serverParams.split('|');
} else {
  auth = [];
}

const smtpTransport = nodemailer.createTransport({
    service: auth[0],
    host: auth[1],
    auth: {
        user: auth[2],
        pass: auth[3]
    }
});

module.exports = {
 sendMail: async email => {
    const mailOptions={
        to : email.to,
        subject : email.subject,
        html: email.body
     };
    
    const response = await smtpTransport.sendMail(mailOptions);
    return response;
    }
};