const express = require('express')
const router = express.Router()
const { postUser, logUser, signoutUser, getCurrentUser } = require('../controllers')

router.post('/', postUser)
router.post('/login', logUser)
router.post('/signout', signoutUser)
router.get('/', getCurrentUser)

module.exports = router 