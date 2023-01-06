require('dotenv').config();
const { APIKEY, API_URL } = process.env;
const { Router } = require('express');
const getAllPlatforms = require('../controllers/CtrPlatforms');
const router = Router();
const axios = require('axios').default;

//TODO -----> GET a "/genres" <--------

router.get('/', async (req, res) => {
    try {
        return res.json(await getAllPlatforms());
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
})

module.exports = router;