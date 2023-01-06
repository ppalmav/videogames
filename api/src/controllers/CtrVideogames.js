
require('dotenv').config();
const { APIKEY } = process.env;
// const { Router } = require('express');
// const router = Router();
const {Op} = require('sequelize');
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

//TODO  ------> POST /videogames <-------

async function postCrearVG({ name, description, releaseDate, rating, genres, platforms }){
    
    platforms = platforms.join(', ')
        const gameCreated = await Videogame.findOrCreate({ //devuelvo un array (OJOOO!!!!)
            where: {
                //Nos aseguramos de capitalizar la primera letra del nombre del juego antes de guardarlo en la BD
                name : name.substring(0,1).toUpperCase().concat(name.substring(1)),
                description},
            defaults:{
                releaseDate,
                rating,
                platforms,
                }
        })
        console.log('juego creado?')
        console.log(gameCreated[1])
        // if(gameCreated[1]) return true 
        await gameCreated[0].setGenres(genres);//instancia creada
        return gameCreated[1]
         // ingreso las id de genres y videogames a la tabla de asociacion
};

async function getSearchOneVG(req){
    //busco si existe el juego en la API
    const nameToFind = req.query.name;
    let response = await axios.get(`https://api.rawg.io/api/games?search=${nameToFind}&key=${APIKEY}`);
    if (!response.data.count) return (`Game "${nameToFind}" was not found`);
    //filtro SOLO la data que necesito para enviarle al front
    const ftdGamesAPI = response.data.results.map(game => {
        return{
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres.map(g => g.name),
            platforms: game.platforms.map(p => p.name)
        }
    });

    //   //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
    //   const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(nameToFind.toLowerCase()));
    //   //doy prioridad a la DB, y sumo todos, y corto el array en 15
    //   const results = [...filteredGamesDb, ...gamesREADY.splice(0, 15)];


    let ftdGamesDb = await Videogame.findAll({
        where: {
            name:{
                [Op.iLike]: `%${nameToFind}%`
            }
        },
        include: Genre                
    });

    ftdGamesDb = JSON.stringify(ftdGamesDb);
    ftdGamesDb = JSON.parse(ftdGamesDb);
    ftdGamesDb = ftdGamesDb.reduce((acc, elem) => acc.concat({
        ...elem,
        genres: elem.genres.map(g => g.name)
    }), [])
    
    return [...ftdGamesDb, ...ftdGamesAPI];
}

async function getAllVG(){
      //busco en la DB si tengo juegos creados y me traigo todos
      let videogamesDb = await Videogame.findAll({
        include: Genre
    });
    //Parseo el objeto
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
    console.log(videogamesDb)
    //Aca dejo el arreglo de generos plano con solo los nombres de cada genero(llega array de objetos)
    videogamesDb = videogamesDb.reduce((acc, elem) => acc.concat({
        ...elem,
        genres: elem.genres.map(g => g.name)
    }), [])
    
    let pages = 0;
    // let allPlatforms = [];
    let results = [...videogamesDb]; //sumo lo que tengo en la DB
    let response = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);
    while (pages < 5) {
        pages++;
        //filtro solo la DATA que necesito enviar al FRONT
        const games = response.data.results.map(game => {
            //allPlataforms=allPlataforms.concat(game.platforms.map(p => p.platform.name))
            // allPlatforms=[...allPlatforms, ...game.platforms.map(p => p.platform.name)]
            return{
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                rating: game.rating,
                genres: game.genres.map(g => g.name),
                platforms: game.platforms.map(p => p.platform.name)
            }
        });
        results = [...results, ...games]
        if(pages<5) response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
    }
    // allPlataforms.flat(2)
    // const setPlatforms = Array.from(new Set(allPlatforms)).sort()
    // console.log(setPlatforms)
    // results = [...results, ...setPlatforms];
    return results;
}
module.exports = {postCrearVG, getSearchOneVG, getAllVG}
