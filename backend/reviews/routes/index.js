const express = require('express')
const router = express.Router()
const { postReview, getAllReviews, deleteReview } = require('../controllers')
const { currentUser } = require('../../middleware/currentUser')

router.post('/', currentUser, postReview)
router.get('/', getAllReviews)
router.delete('/:id', currentUser, deleteReview)

module.exports = router 