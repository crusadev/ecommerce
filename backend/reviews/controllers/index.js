const reviewModel = require('../models')

const postReview= async (req, res) => {
    const { user, stars, titlereview, commentreview } = req.body
    try {
       const Review = await reviewModel.create({user, stars, title, body })
       res.json(Review)
    } catch (err) { console.log(err) }
}

module.exports = {postReview}