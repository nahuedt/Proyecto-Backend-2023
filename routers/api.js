const express = require('express')
const {check} = require('express-validator')
const router = express.Router();
const apiController = require('../controllers/apiController');
const Validators = require('../middlewares/validators');

router.get('/listaserie', apiController.getSeries)

router.post('/crearserie', 
[check('nombre').custom(Validators.serieExiste),
Validators.validarCampos],
apiController.postSeries)

router.patch('/editarserie', apiController.updateSeries)

router.delete('/borrarserie', apiController.deleteSeries)

router.get('/busquedaserie', apiController.busquedaSeries)

module.exports = router