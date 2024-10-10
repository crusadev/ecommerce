const express = require('express')
const router = express.Router()
const { postProduct, getAllProducts } = require('../controllers')
const { postProduct, getOneProduct} = require ('../controllers')
const { postProduct, deleteProduct} = require ('../controllers')

router.post('/', postProduct)
router.get('/', getAllProducts)
router.get('/:id', getOneProduct)
router.delete('/:id', deleteProduct)

module.exports = router 