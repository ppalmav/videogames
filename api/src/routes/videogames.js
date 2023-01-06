require('dotenv').config();
const {postCrearVG, getSearchOneVG, getAllVG} = require('../controllers/CtrVideogames');
// const { APIKEY } = process.env;
const { Router } = require('express');
// const {Op} = require('sequelize');
const router = Router();
// const axios = require('axios').default;
// const { Videogame, Genre } = require('../db');

//TODO  ------> POST /videogames <-------

router.post('/', async (req, res) => {
    try {
        
        res.send(await postCrearVG(req.body))
        } 
    catch (err) {
        res.status(500).send(err);
        console.log(err);
        //console.log(err.original.code)
        // console.log(err.code + err.detail);
        
    }
    
})

//TODO -----> GET a "/videogames" <--------

router.get('/', async (req, res) => {
       
   //Si llegan datos por ?name=<valor>
    if (req.query.name) {
        try {
            const result = await getSearchOneVG(req);
            // console.log(result);
            if(typeof result === 'string')
                res.status(204).json(result);
            else
                return res.json(result /*postSearchOneVG(req)*/);
        } catch (err) {
            return console.log(err)
        }
    } else {
        // Si no obtengo todos los vg
        try {
            return res.json(await getAllVG())
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
});

module.exports = router;