const { Router } = require('express');
const router = Router();

//CONTROLLER
const ctl = require('../controllers/users.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER


router.get('/', verifyToken, ctl.getAll)



module.exports = router;