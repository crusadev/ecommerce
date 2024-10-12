const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../../middleware/verifyToken')
const {
    postUser,
    logUser,
    signoutUser,
    getCurrentUser,
    deleteUser,
    getAllUsers
} = require('../controllers')

router
    .post('/', postUser)
    .get('/', /* verifyAccessToken */ getAllUsers)
router.post('/login', logUser)
router.post('/signout', signoutUser)
router.get('/current', verifyAccessToken, getCurrentUser)
router.delete('/:id', verifyAccessToken, deleteUser)

module.exports = router 