const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();
require('dotenv').config();


router.post('/', (req, res) => {
    const { email, nombre, telefono, mensaje } = req.body

    const contentHtml = `
    <h2>Gracias por contactarse con nosotros, le damos un cordial saludo de parte de Patronato Telas</h2></br>
    <h2>Esta es su copia de respaldo de su formulario de contacto:</h2>
    <br></br>
        <p>Nombre: ${nombre}</p>
        <p>Email: ${email}</p>
        <p>Telefono: ${telefono}</p>
        <p>Mensaje: ${mensaje}</p></br>
        <br></br>
        <h2>En breve nos pondremos en contacto con ud para contestar su requerimiento.</h2>
        <br>
        <img src="https://patronatotelas.s3.amazonaws.com/patronatotelasmailenviame.png"></img>
        <h2>patronatotelas.cl</h2>        
    `


    async function sendMail() {
        try {

            const transporter = nodemailer.createTransport({
                host: "mx.davidvivancowebapi.com",
                port: 465,
                secure: true, // use TLS
                //ignoreTLS: true,
                auth: {
                    user: "info@patronatotelas.cl",
                    pass: process.env.PASS_MAIL,
                },
                tls: {
                    // do not fail on invalid certs
                    //   servername: "mx.davidvivancowebapi.com",
                    rejectUnauthorized: true,
                },
            });
            const mailOptions = {
                from: "info@patronatotelas.cl",
                to: email,
                bcc: process.env.BCC_MAIL,
                subject: "Formulario de Contacto",
                html: contentHtml,
            };

            const result = await transporter.sendMail(mailOptions);
            return result

        } catch (err) {
            console.error("El error es:", err)
        }
    }

    sendMail()
        .then(result => res.status(200).send({ message: 'Formulario Enviado' }))
        .catch(console.error)
});

module.exports = router;
