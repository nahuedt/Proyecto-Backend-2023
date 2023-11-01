const {validationResult} = require('express-validator');
const {Series} = require('../models/series')

class Validators {

    validarCampos (req,res,next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errores:errors.array()})
        }
        next();
    }

    async serieExiste (nombre) {
        const series = await await Series.findOne({nombre});
        if (series){
            throw new Error("La serie ya existe en la base de datos")
        }
    }

}


module.exports = new Validators