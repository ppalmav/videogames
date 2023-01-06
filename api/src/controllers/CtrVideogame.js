//COPY
require('dotenv').config();
const { APIKEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');



//TODO  ------> GET /videogame/:idVideoGame <-------
  function isUUID(str) {
    const pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
    return pattern.test(str);
  }

  function isInt(str) {
    const pattern = /^([1-9]\d*|0)$/i;
    return pattern.test(str);
  } //var regex = 

// consulto el detalle del juego por el ID
async function getDbDetail(idVideogame){
    let videogameDb = await Videogame.findOne({
        where: {
            id: idVideogame,
        },
        include: Genre
    })
    //validamos que exita en la BD
    if(!videogameDb)
        // res.status(404).json({idNotFound:'no encontrado'})
        throw {errorName:'Id no encontrado'}
    
    //Parseo el objeto
    videogameDb = JSON.stringify(videogameDb); //to JSON
    videogameDb = JSON.parse(videogameDb); //to object
    
    //el iterable lo dejo un array con los nombres de genero solamente
    videogameDb.genres = videogameDb.genres.map(g => g.name);
            //console.log(videogameDb)
    return videogameDb;
}

async function getApiDetail(idVideogame){
    const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`);
            // console.log(response.data.status)
            //validamos que exista en la api
            // if(response.data.status == 404)
            //     return res.status(404).json({idNotFound:'no encontrado'})
    
    let { id, name, background_image, genres, description, released: releaseDate, rating, platforms } = response.data;
    genres = genres.map(g => g.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
    platforms = platforms.map(p => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
    return {
        id,
        name,
        background_image,
        genres,
        description,
        releaseDate,
        rating,
        platforms
    }
}

module.exports = {isUUID,isInt,getDbDetail,getApiDetail};