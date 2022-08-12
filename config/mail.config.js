const nodemailer = require('nodemailer');
require('dotenv').config();

const mail = {
    user: 'info@patronatotelas.cl',
    pass: process.env.PASS_MAIL
}

let transporter = nodemailer.createTransport({
    host: "mx.davidvivancowebapi.com",
    port: 465,
    tls: {
        rejectUnauthorized: false
    },
    secure: true, // true for 465, false for other ports
    auth: {
        user: mail.user, // generated ethereal user
        pass: mail.pass, // generated ethereal password
    },
});

const sendEmail = async (email, subject, html) => {
    try {

        await transporter.sendMail({
            from: `PatronatoTelas <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "https://www.patronatotelas.cl/", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}

const getTemplate = (email, token) => {
    return `
        <div>           
            <h2>Hola ${email}</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
                <a href="http://localhost:3000/api/auth/confirm/${token}"
                     target="_blank">
                        Confirmar Cuenta
                 </a>
        </div>
      `;
}

module.exports = {
    sendEmail,
    getTemplate
}