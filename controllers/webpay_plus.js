const WebpayPlus = require("transbank-sdk").WebpayPlus;
const asyncHandler = require("../utils/async_handler");
const moment = require('moment-timezone');
moment.tz("America/Santiago").format();
const User = require('../models/users')
//CREAR transaccion y enviar a webpay**-----------------------------------

exports.create = asyncHandler(async function (request, response) {
  console.log("comienzo del create", request.body, request.query, request.params)
  // console.log("el req para crear transaccion trae: ", request)

  let fechaActual = Date.now();

  let buyOrder = moment().format('DMMyyyy-HHmm')
  let sessionId = moment.tz(fechaActual, "America/Santiago").format();

  let socketId = request.query.skid
  let tokenLstrg = request.query.token

  let amount = +request.query.amount
  let costoenviame = +request.query.costoenviame

  // let returnUrl = request.protocol + "s://" + request.get("host") + "/api/webpay_plus/commit";
  let returnUrl = request.protocol + "://" + request.get("host") + "/api/webpay_plus/commit";


  const createResponse = await (new WebpayPlus.Transaction()).create(
    buyOrder,
    sessionId,
    amount,
    returnUrl
  );

  let token = createResponse.token;
  let url = createResponse.url;

  console.log("el token webpay creado es: ", token)
  await User.update(
    {
      socketId: socketId,
      token_ws: token
    },
    { where: { token: tokenLstrg } }
  )


  let viewData = {
    costoenviame,
    buyOrder,
    sessionId,
    amount,
    returnUrl,
    token,
    url,
  };
  response.status(200).json(viewData)//ok
});

exports.commit = async (request, response) => {

  response.render("webpay_plus/aviso-ok")
}


//todo solo ADMIN
exports.status = asyncHandler(async function (request, response, next) {
  let token = request.body.token;

  const statusResponse = await (new WebpayPlus.Transaction()).status(token);

  let viewData = {
    token,
    statusResponse,
  };

  response.render("webpay_plus/status", {
    step: "Estado de Transacción",
    stepDescription:
      "Puedes solicitar el estado de una transacción hasta 7 días despues de que haya sido" +
      " realizada. No hay limite de solicitudes de este tipo, sin embargo, una vez pasados los " +
      "7 días ya no podrás revisar su estado.",
    viewData,
  });

  // response.status(200).json(viewData)

});

exports.refund = asyncHandler(async function (request, response, next) {
  let { token, amount } = request.body;

  const refundResponse = await (new WebpayPlus.Transaction()).refund(token, amount);

  let viewData = {
    token,
    amount,
    refundResponse,
  };


  // response.status(200).json(viewData)

  response.render("webpay_plus/refund", {
    step: "Reembolso de Transacción",
    stepDescription:
      "Podrás pedir el reembolso del dinero al tarjeta habiente, dependiendo del monto " +
      "y el tiempo transacurrido será una Reversa, Anulación o Anulación parcial.",
    viewData,
  });
});
