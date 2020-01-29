var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'tasor.acc@gmail.com',
        pass: 'Parola_123'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;