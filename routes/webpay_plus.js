var express = require("express");
var router = express.Router();
require('dotenv').config();
const WebpayPlus = require("transbank-sdk").WebpayPlus;
var webpayPlusController = require("../controllers/webpay_plus");


router.use(function (req, res, next) {

  if (process.env.WPP_CC && process.env.WPP_KEY) {
    WebpayPlus.configureForProduction(process.env.WPP_CC, process.env.WPP_KEY);
  } else {
    WebpayPlus.configureForTesting();
  }
  next();
});


router.get("/create", webpayPlusController.create);
router.get("/commit",  webpayPlusController.commit);
router.post("/commit", webpayPlusController.commit);
router.post("/status", webpayPlusController.status);
router.post("/refund", webpayPlusController.refund);

module.exports = router;
