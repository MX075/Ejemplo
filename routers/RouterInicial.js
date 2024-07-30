const express = require('express')

const router = express.Router()


// export controllers

const {
    home,

} = require('../controllers/home.js')

// rutas
router.get('/', home)


module.exports = router