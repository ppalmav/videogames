require('dotenv').config();
// const { APIKEY, API_URL } = process.env;
const { Router } = require('express');
const router = Router();
// const axios = require('axios').default;
// const { Genre } = require('../db');
const getGenres = require('../controllers/CtrGenres')

//TODO -----> GET a "/genres" <--------

router.get('/', async (req, res) => {
    try {
        res.json(await getGenres());
    } catch (err) {
        return console.log(err)
    }
})

module.exports = router;