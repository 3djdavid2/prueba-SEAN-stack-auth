const WebpayPlus = require("transbank-sdk").WebpayPlus;
const User = require('../models/users')

var { io } = require('../index.js')

const commit = async (request, response, next) => {

  //Flujos:
  //1. Flujo normal (OK): solo llega token_ws
  //2. Timeout (más de 10 minutos en el formulario de Transbank): llegan TBK_ID_SESION y TBK_ORDEN_COMPRA
  //3. Pago abortado (con botón anular compra en el formulario de Webpay): llegan TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
  //4. Caso atipico: llega todos token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA


  let params = request.method === 'GET' ? request.query : request.body;
  let token = params.token_ws;
  let tbkToken = params.TBK_TOKEN;
  let tbkOrdenCompra = params.TBK_ORDEN_COMPRA;
  let tbkIdSesion = params.TBK_ID_SESION;

  let viewData = {
    token,
    tbkToken,
    tbkOrdenCompra,
    tbkIdSesion
  };

  if (token && !tbkToken) {//Flujo 1    

    const commitResponse = await (new WebpayPlus.Transaction()).commit(token);

    viewData = {
      token,
      commitResponse,
    };


    if (commitResponse.response_code == 0) {
      console.log("AUTHORIZED ok 0");
      try {
        const user = await User.findAll({
          raw: true,
          where: { token_ws: token }
        });

       const socketId= user[0].socketId;

        io.to(socketId).emit('pagar', JSON.stringify(viewData));
        //io.emit('pagar', JSON.stringify(viewData));

      } catch (error) {
        console.log("fallo el emit del midlw")
      }

    }

    next();

  } else if (!token && !tbkToken) {//Flujo 2
    io.emit('anuladotiempoespera', JSON.stringify(viewData));
    // step = "El pago fue anulado por tiempo de espera.";
    // stepDescription = "En este paso luego de anulación por tiempo de espera (+10 minutos) no es necesario realizar la confirmación ";
  } else if (!token && tbkToken) {//Flujo 3
    io.emit('anuladoporusuario', JSON.stringify(viewData));
    // step = "El pago fue anulado por el usuario.";
    // stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
  } else if (token && tbkToken) {//Flujo 4
    io.emit('pagoinvalido', JSON.stringify(viewData));
    // step = "El pago es inválido.";
    // stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
  }

  return response.render("webpay_plus/commit-error");

}

module.exports = { commit };