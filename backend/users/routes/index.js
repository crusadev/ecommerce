const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../../middleware/verifyToken')
const {
    postUser,
    logUser,
    signoutUser,
    getCurrentUser,
    deleteUser,
    getAllUsers,
    putUser,
    putAdmin
} = require('../controllers')
const { currentUser } = require('../../middleware/currentUser')

router
    .post('/', postUser)
    .get('/', /* verifyAccessToken */ getAllUsers)
router.put('/admin/:id', verifyAccessToken, currentUser, putAdmin)
router.post('/login', logUser)
router.post('/signout', signoutUser)
router.get('/current', verifyAccessToken, currentUser, getCurrentUser)
router
    .delete('/:id', verifyAccessToken, currentUser, deleteUser)
    .put('/:id', verifyAccessToken, currentUser, putUser)


module.exports = router 