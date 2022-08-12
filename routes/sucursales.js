const { Router } = require('express');
const router = Router();

//CONTROLLER
const sucursales = require('../controllers/sucursales.controller')

//MIddleware


//ROUTER

router.get('/', sucursales.getSucursales)



module.exports = router;