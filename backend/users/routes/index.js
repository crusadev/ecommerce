const express = require('express')
const router = express.Router()
const {postUser, logUser} = require('../controllers')

router.post('/', postUser)
router.post('/login', logUser)

module.exports = router 