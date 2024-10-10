const express = require('express')
const router = express.Router()
const { postReview, getAllReviews } = require('../controllers')
const { postReview, deleteReview} = require ('../controllers')

router.post('/', postReview)
router.get('/', getAllReviews)
router.delete('/:id', deleteReview)

module.exports = router 