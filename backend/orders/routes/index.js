const express = require('express')
const router = express.Router()
const { postOrder, getAllOrders, getOneOrder, deleteOrder } = require('../controllers')
const { currentUser } = require('../../middleware/currentUser')

router.post('/', currentUser, postOrder)
router.get('/', getAllOrders)
router.get('/:id', currentUser, getOneOrder)
router.delete('/:id', currentUser, deleteOrder)

module.exports = router 