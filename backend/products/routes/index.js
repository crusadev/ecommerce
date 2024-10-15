const express = require('express')
const router = express.Router()
const {
    postProduct,
    getAllProducts,
    getOneProduct,
    deleteProduct,
    putProduct
} = require('../controllers')

router
    .post('/', postProduct)
    .get('/', getAllProducts)
router
    .get('/:id', getOneProduct)
    .delete('/:id', deleteProduct)
    .put('/:id', putProduct)

module.exports = router 