const express = require('express')
const router = express.Router()
const { postOrder, getAllOrders, getOneOrder, deleteOrder } = require('../controllers')

router.post('/', postOrder)
router.get('/', getAllOrders)
router.get('/:id', getOneOrder)
router.delete('/:id', deleteOrder)

module.exports = router 