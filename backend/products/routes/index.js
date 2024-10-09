const express = require('express')
const router = express.Router()
const { postProduct, getAllProducts } = require('../controllers')

router.post('/', postProduct)
router.get('/', getAllProducts)

module.exports = router 