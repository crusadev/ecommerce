const express = require('express')
const router = express.Router()
const {postProduct} = require('../controllers')

router.post('/', postProduct)

module.exports = router 