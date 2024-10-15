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

router
    .post('/', postUser)
    .get('/', /* verifyAccessToken */ getAllUsers)
router.put('/admin/:id', putAdmin)
router.post('/login', logUser)
router.post('/signout', signoutUser)
router.get('/current', verifyAccessToken, getCurrentUser)
router
    .delete('/:id', verifyAccessToken, deleteUser)
    .put('/:id', verifyAccessToken, putUser)


module.exports = router 