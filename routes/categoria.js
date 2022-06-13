const { Router } = require('express');
const router = Router();

//CONTROLLER
const categoriaCtrl = require('../controllers/categoria.controller')

//MIddleware


//ROUTER

router.get('/', categoriaCtrl.getCategoria)


module.exports = router;