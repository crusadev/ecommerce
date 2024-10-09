const reviewModel = require('../models')

const postReview = async (req, res) => {
    const { user, stars, title, body } = req.body
    try {
        const Review = await reviewModel.create({ user, stars, title, body })
        res.status(200).json(Review)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { postReview }