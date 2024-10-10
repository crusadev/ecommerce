const express = require('express')
const router = express.Router()
const { postReview, getAllReviews, deleteReview } = require('../controllers')

router.post('/', postReview)
router.get('/', getAllReviews)
router.delete('/:id', deleteReview)

module.exports = router 