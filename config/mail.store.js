const nodemailer = require('nodemailer');

require('dotenv').config();
passEmailTienda1 = process.env.PASS_EMAIL_STORE1
passEmailTienda2 = process.env.PASS_EMAIL_STORE2
passEmailTienda3 = process.env.PASS_EMAIL_STORE3

const Carrito = require('../models/carrito')

//
const sendEmailStore = async (email, subject, html) => {

    try {

        var pass= ''
        
        switch (email) {
            case 'quilpue@patronatotelas.cl':
                pass = passEmailTienda1
                break;
            case 'vina@patronatotelas.cl':
                pass = passEmailTienda2
                break;
            case 'quillota@patronatotelas.cl':
                pass = passEmailTienda3
                break;


            default:
                console.log("error en pass email tienda", email)
                break;
        }
        //

        var mail = {
            user: email,
            pass: pass
        };

        var transporter = nodemailer.createTransport({
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


        //
        const { buy_order } = html.dataFA.datosCompra.commitResponse

        const productos = await Carrito.findAll({
            raw: true,
            where: { ordenPedido: buy_order }

        })

        // recorrer para anexar a myBody:
        let message = (
            '<table>' +
            '<thead>' +
            '<th> Codigo </th>' +
            '<th> Producto </th>' +
            '<th> Cantidad </th>' +
            '<th> Unitario </th>' +
            '<th> Descuento </th>' +
            '<th> Total </th>' +
            '</thead>'
        );

        for (const { codigo, producto, cantidad, precio, descuento, total } of productos) {
            message += (
                '<tr>' +

                '<td>' + codigo + '</td>' +
                '<td>' + producto + '</td>' +
                '<td>' + cantidad + '</td>' +
                '<td>' + precio + '</td>' +
                '<td>' + descuento + '</td>' +
                '<td>' + total + '</td>' +

                '</tr>'
            );
        };

        message += '</table>';

        const mybody = getTemplateStore(html) + ' ' + message


        transporter.sendMail({
            from: `Tienda <${mail.user}>`, // sender address
            to: 'gerencia@patronatotelas.cl', // list of receivers
            cc: 'contacto@davidvivancoweb.com',
            subject, // Subject line
            text: "Solicitud factura", // plain text body
            html: mybody, // html body
        }, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId)
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}


const fechaTZaNormal = (fechaTZ) => {

    var currentDate = new Date(fechaTZ);
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var hr = currentDate.getHours();
    var mn = currentDate.getMinutes();

    // return  year + '-' + pad(month + 1) + '-' + pad(date) + ' ' + pad(hr) + ':' + pad(mn);
    return pad(date) + '-' + pad(month + 1) + '-' + year + ' ' + pad(hr) + ':' + pad(mn);
}

const pad = (n) => {
    return n < 10 ? '0' + n : n;
};


const getTemplateStore = (data) => {

    const { buy_order, amount, transaction_date } = data.dataFA.datosCompra.commitResponse

    transaction_date_convertToNormalDate = fechaTZaNormal(transaction_date)

    const { tienda, tipoDatosFA, rutFA, razonFA, giroFA, telFA } = data.dataFA.detalleCompra
    const { email } = data.dataFA

    const { nombre, rut, telefono, direccion } = data.user
    //

    return `

        <style>
            table, th, td {
              border: 1px solid grey;
              border-collapse: collapse;
            }

            tr:nth-child(even) {
              background-color: rgba(150, 212, 212, 0.4);
            }

            th:nth-child(even),td:nth-child(even) {
              background-color: rgba(150, 212, 212, 0.4);
            }
        </style>

        <div>           
            <h2>Estimados</h2>

            <h1>Datos para Factura de compra web, cliente tienda</h1>

            <ul>
                <li>Nombre Cliente inscrito: ${nombre}</li>
                <li>rut ${rut}</li>
                <li>telefono ${telefono}</li>
                <li>direccion ${direccion}</li>
                <li>Email: ${email}</li>
            </ul>          
            
            <ul>
                <li>Orden: ${buy_order}</li>
                <li>Monto: ${amount}</li>
                <li>Fecha transaccion transbank: ${transaction_date_convertToNormalDate}</li>
          
            </ul>

            <ul>
                <li>Tienda id: ${tienda}</li>
                <li>Tipo de datos en factura: ${tipoDatosFA}</li>
                   
            </ul>
               
            <h3>Datos si la factura es a nombre de otro rut:</h3>
            <ul>
                <li>Rut: ${rutFA}</li>
                <li>Razon social: ${razonFA}</li>
                <li>Giro: ${giroFA}</li>
                <li>Teléfono: ${telFA}</li>             
            </ul>                         
        </div>         
        
      `;
}

module.exports = {
    sendEmailStore,
}