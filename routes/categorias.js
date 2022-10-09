const { Router } = require('express');
const router = Router();

//CONTROLLER
const categorias = require('../controllers/categorias.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.get('/', verifyToken, categorias.getCategorias)
router.post('/', verifyToken, categorias.createCategoria)
router.put('/:id', verifyToken, categorias.updateCategoria)
router.delete('/:id', verifyToken, categorias.deleteCategoria)


module.exports = router;