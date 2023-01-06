const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


const videogames = require('./videogames');
const videogame = require('./videogame');
const genres = require('./genres');
const platforms = require('./platforms')

router.use('/videogames', videogames);
router.use('/videogame', videogame);
router.use('/genres', genres);
router.use('/platforms', platforms);

// router.get('/videogames', (req,res) => {
//     try {
//         // const {}
//     } catch (error) {
        
//     }
// })

// router.get('/videogame/:idVideogame', (req,res) => {})

// router.post('/videogames', (req,res) => {})

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);

// router.get('/genres', async (req,res) => {}) //async traera info de bd

module.exports = router;
