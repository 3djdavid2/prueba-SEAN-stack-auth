const { Router } = require('express');
const router = Router();

const ctl = require('../controllers/excel.controller')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken,ctl.get)

module.exports = router;