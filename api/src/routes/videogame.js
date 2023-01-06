//COPY
require('dotenv').config();
const { APIKEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');
const {isUUID,isInt,getDbDetail,getApiDetail} = require('../controllers/CtrVideogame')

// consulto el detalle del juego por el ID
router.get('/:idVideogame', async (req, res) => {
    
    const { idVideogame } = req.params
    //verifico si es un juego creado y me trae el detalle de la DB
    // if (idVideogame.includes('-'))
    if (isUUID(idVideogame)) {
        try {
            res.json(await getDbDetail(idVideogame))
        } catch (err) {
            console.log(err)
            return res.status(404).json({errorMsg:'Id en Base de Datos no encontrado'});
            //return res.json(err)
            // return console.log(err)
        }
        
    } else if(isInt(idVideogame)){
        //else (si no es un juego creado, voy a buscar la info a la API)
        try {
            return res.json(await getApiDetail(idVideogame));
        } catch (err) {
            console.log(err)
            // return res.json(err)
            return res.status(404).json({errorMsg:'Id en API no encontrado'})
        }
    }
    else
    //Si el id no es formato valido
    return res.status(500).json({errorMsg:'Id con formato no valido'})  
})

module.exports = router;