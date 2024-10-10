const express = require('express')
const router = express.Router()
const { postProduct, getAllProducts, getOneProduct, deleteProduct } = require('../controllers')

router.post('/', postProduct)
router.get('/', getAllProducts)
router.get('/:id', getOneProduct)
router.delete('/:id', deleteProduct)

module.exports = router 