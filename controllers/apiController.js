const {Series} = require('../models/series')
const axios = require('axios')

class ApiController {
    async getSeries (req, res)  {
        const list = await Series.find()
        res.status(200).json(list)
    }
    async postSeries  (req, res)  {
        try {
            const newSerie = new Series(req.body)
            await newSerie.save()
            res.status(201).json(newSerie)
        } catch(error) {
            res.status(400).json(error)
        }
    }

    async updateSeries (req,res) {    //es un metodo patch
        const updatingSerie = new Series(req.body);
        const existingSerie = await Series.findOne({nombre:updatingSerie.nombre});
        if (existingSerie == null){
            res.status(401).send('La serie no existe en la base de datos')   
        }
        else {
            await existingSerie.deleteOne();
            await updatingSerie.save();
            res.status(201).json(updatingSerie);
        }

    }
    async deleteSeries (req,res) { 
        const data = req.body;
        const deletingSeries = Series.findOne({nombre:data.nombre});
        if (deletingSeries == null){
            res.status(401).send('Error: La serie no existe en la base de datos')   
        }
        else {
            await deletingSeries.deleteOne();
            res.status(201).send('Serie removida con exito');
        }

    }
    async busquedaSeries  (req, res)  {
        try{
            const {data} = await axios.get('https://www.episodate.com/api/most-popular?page=1')
            res.json(data)
        } catch (error) {
            res.status(404).json({status: error.response.status, data: error.response.data})
        }
    }   
}

module.exports = new ApiController