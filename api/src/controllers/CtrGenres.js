require('dotenv').config();
const { APIKEY, API_URL } = process.env;
const axios = require('axios').default;
const { Genre } = require('../db');

async function getGenres(){
    const genresDb = await Genre.findAll();
    //Si están en la DB, los devuelvo
    if (genresDb.length) return (genresDb);
    
    //si no los voy a buscar a la API
    const response = await axios.get(API_URL + `/genres?key=${APIKEY}`);
    const genres = response.data.results; 
    // recibo un array de objetos, con los juego filtrados por GENERO
    //los guardo en la DB filtrando solo el nombre
    // const genres = fetch(API_URL + `/genres?key=${API_KEY}`)
    // .then(gnrs => gnrs.json())
    
    genres.forEach(async g => {
        await Genre.findOrCreate({
            where: {
                id:g.id,
                name: g.name
            }
        })
    })
    // return genres.map(g => {
    //     return{
    //         id: g.id,
    //         name: g.name
    //     }
    // });
    return await Genre.findAll();
}

module.exports = getGenres;